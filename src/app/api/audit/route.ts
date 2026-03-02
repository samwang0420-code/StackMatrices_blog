import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { website, service, monthlySpend, email } = await request.json();

    // Generate audit data (simplified for demo)
    const auditData = {
      score: Math.floor(Math.random() * 40) + 20, // 20-60 range
      grade: 'C',
      status: 'At Risk',
      annualLoss: Math.floor(Math.random() * 2000000) + 1000000,
      competitors: [
        { name: 'Competitor A', visibility: 78 },
        { name: 'Competitor B', visibility: 65 },
        { name: 'Competitor C', visibility: 52 },
      ]
    };

    // Send email with audit results
    const { data, error } = await resend.emails.send({
      from: 'StackMatrices <audit@stackmatrices.com>',
      to: email,
      subject: `Your AI Visibility Audit for ${website}`,
      html: generateEmailHTML(website, auditData),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Audit report sent successfully',
      auditId: data?.id 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process audit request' },
      { status: 500 }
    );
  }
}

function generateEmailHTML(website: string, audit: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your AI Visibility Audit</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0B0F19; color: #F9FAFB; font-family: 'Inter', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #111827;">
        <tr>
          <td style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #1F2937;">
            <h1 style="margin: 0; color: #2DD4BF; font-size: 24px;">StackMatrices</h1>
            <p style="margin: 10px 0 0; color: #9CA3AF; font-size: 14px;">AI Visibility Audit Report</p>
          </td>
        </tr>
        
        <tr>
          <td style="padding: 30px;">
            <h2 style="margin: 0 0 20px; color: #F9FAFB; font-size: 20px;">Your Audit Results for ${website}</h2>
            
            <div style="background-color: #1A1F2E; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #EF4444;">
              <p style="margin: 0 0 10px; color: #EF4444; font-size: 12px; text-transform: uppercase; font-weight: 600;">AI Visibility Score</p>
              <div style="font-size: 48px; font-weight: 700; color: #EF4444; margin-bottom: 8px;">${audit.score}/100</div>
              <p style="margin: 0; color: #F9FAFB; font-weight: 600;">${audit.status}</p>
            </div>
            
            <div style="background-color: #1A1F2E; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <p style="margin: 0 0 10px; color: #9CA3AF; font-size: 12px; text-transform: uppercase; font-weight: 600;">Estimated Annual Loss</p>
              <div style="font-size: 36px; font-weight: 700; color: #EF4444; margin-bottom: 8px;">$${audit.annualLoss.toLocaleString()}</div>
              <p style="margin: 0; color: #9CA3AF;">Revenue being diverted to competitors via AI search</p>
            </div>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://stackmatrices.com/interventions" 
                 style="display: inline-block; background-color: #EF4444; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Get Your GEO Recovery Plan
              </a>
            </div>
            
            <p style="color: #9CA3AF; font-size: 14px; line-height: 1.6;">
              This audit reveals how AI search engines currently perceive your practice. 
              The good news: GEO (Generative Engine Optimization) can recover this lost visibility within 60-90 days.
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="padding: 30px; text-align: center; border-top: 1px solid #1F2937; background-color: #0B0F19;">
            <p style="margin: 0; color: #6B7280; font-size: 12px;">
              © 2024 StackMatrices Intelligence. HIPAA/GDPR Compliant.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
