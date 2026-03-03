import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Resend API configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Get client IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save to Supabase
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          subject,
          message,
          ip_address: ip,
          user_agent: userAgent,
          source: 'website',
          status: 'new'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Send email notification via Resend
    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'StackMatrices Contact <contact@stackmatrices.com>',
            to: 'sam.wang01@icloud.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p><small>Submitted at: ${new Date().toISOString()}</small></p>
              <p><small>View in dashboard: https://fixemvsckapejyfwphft.supabase.co</small></p>
            `,
            reply_to: email,
          }),
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails, just log it
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.',
      id: submission.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
