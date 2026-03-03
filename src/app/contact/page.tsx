'use client';

import Link from "next/link";
import { Mail, ArrowRight, Send } from "lucide-react";

export default function ContactPage() {
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
            <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-gray-500 mb-6">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form 
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const subject = `Contact Form: ${formData.get('subject')}`;
                const body = `
Name: ${formData.get('name')}
Email: ${formData.get('email')}

Message:
${formData.get('message')}
                `.trim();
                window.location.href = `mailto:sam.wang01@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
            >
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
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Prefer to schedule?{" "}
              <Link href="/analysis-request" className="text-primary hover:underline">
                Request a free audit
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
