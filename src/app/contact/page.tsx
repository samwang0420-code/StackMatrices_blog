'use client';

import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, MessageCircle } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email",
    value: "sam.wang01@icloud.com",
    description: "For general inquiries and support",
    link: "mailto:sam.wang01@icloud.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm PT",
    link: "tel:+15551234567",
  },
  {
    icon: MessageCircle,
    title: "WeChat/WhatsApp",
    value: "StackMatrices",
    description: "Quick responses during business hours",
    link: "#",
  },
];

const OFFICE_HOURS = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PT" },
  { day: "Saturday", hours: "10:00 AM - 2:00 PM PT" },
  { day: "Sunday", hours: "Closed" },
];

const FAQS = [
  {
    q: "How quickly can you start?",
    a: "We can begin your audit within 24 hours of receiving your request. Implementation typically starts within one week.",
  },
  {
    q: "Do you work with practices outside the US?",
    a: "Currently we focus on US and Canadian medical practices. Contact us for other regions.",
  },
  {
    q: "What's your success rate?",
    a: "94% of our clients see measurable AI visibility improvements within 90 days.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
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
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              {CONTACT_METHODS.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <a
                    key={idx}
                    href={method.link}
                    className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>                      
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">{method.title}</p>                        
                        <p className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                          {method.value}
                        </p>                        
                        <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                      </div>                      
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                    </div>                  </a>
                );
              })}
            </div>

            {/* Office Hours */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />                <h2 className="font-semibold">Office Hours</h2>
              </div>              
              <div className="space-y-2">
                {OFFICE_HOURS.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-gray-300">{item.day}</span>                    
                    <span className="text-white">{item.hours}</span>
                  </div>
                ))}
              </div>            </div>

            {/* Quick FAQ */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="font-semibold mb-4">Quick Answers</h2>              
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx}>
                    <p className="font-medium text-sm mb-1">{faq.q}</p>                    
                    <p className="text-sm text-gray-400">{faq.a}</p>
                  </div>
                ))}
              </div>            </div>          </div>

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
Phone: ${formData.get('phone')}

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
                </div>              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>                  
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
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
                    <option value="Support">Support</option>                  </select>
                </div>              </div>

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
                <Send className="w-5 h-5" />                Send Message
              </button>            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Prefer to schedule?{" "}
              <Link href="/analysis-request" className="text-primary hover:underline">
                Request a free audit
              </Link>
            </p>          </div>        </div>      </div>    </div>
  );
}
