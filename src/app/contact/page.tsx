'use client';

import Link from "next/link";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { Mail, ArrowRight, Send, Check, Loader2 } from "lucide-react";

// Initialize Supabase client with ANON key (safe for frontend)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      // Get client IP
      const ipResponse = await fetch('https://api.ipify.org?format=json').catch(() => null);
      const ip = ipResponse ? (await ipResponse.json()).ip : 'unknown';

      // Save to Supabase directly from frontend
      const { data: submission, error: dbError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            ip_address: ip,
            user_agent: navigator.userAgent,
            source: 'website',
            status: 'new'
          }
        ])
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save your message. Please try again.');
      }

      // Send email notification via Resend (from client side)
      // Note: In production, you might want to use a serverless function for this
      // But for now, we'll skip email if Resend fails
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RESEND_API_KEY || ''}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'StackMatrices Contact <contact@stackmatrices.com>',
            to: 'sam.wang01@icloud.com',
            subject: `New Contact: ${data.subject}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p><small>ID: ${submission.id}</small></p>
            `,
            reply_to: data.email,
          }),
        });
      } catch (emailErr) {
        console.log('Email notification skipped:', emailErr);
      }

      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Talk</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ready to capture AI-referred patients? Get in touch and we'll respond 
            within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Methods */}
          <div className="space-y-8">
            {/* Email */}
            <a
              href="mailto:sam.wang01@icloud.com"
              className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    sam.wang01@icloud.com
                  </p>
                  <p className="text-sm text-gray-500 mt-1">For general inquiries and support</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
              </div>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/stackmatrices"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">X (Twitter)</p>
                  <p className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    @stackmatrices
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Follow for GEO insights and updates</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
              </div>
            </a>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white rounded-2xl p-8 text-gray-900">
            {isSubmitted ? (
              // Success State
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              // Form State
              <>
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-gray-500 mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select
                      name="subject"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Service Question">Service Question</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Message
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Prefer to schedule?{" "}
                  <Link href="/analysis-request" className="text-primary hover:underline">
                    Request a free audit
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
