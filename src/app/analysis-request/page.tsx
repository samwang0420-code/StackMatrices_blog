'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Building2, Globe, Mail, User, Target, Users, 
  Search, Send, CheckCircle, Loader2, MapPin, Phone, MessageCircle,
  Briefcase, Stethoscope
} from 'lucide-react';

const INDUSTRIES = [
  { value: 'medical-aesthetics', label: 'Medical Aesthetics' },
  { value: 'plastic-surgery', label: 'Plastic Surgery' },
  { value: 'dental', label: 'Dental / Implants' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'medspa', label: 'MedSpa' },
  { value: 'wellness', label: 'Wellness / Anti-aging' },
  { value: 'ophthalmology', label: 'Ophthalmology / LASIK' },
  { value: 'other', label: 'Other Medical Practice' },
];

export default function AnalysisRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    const keywordsStr = formData.get('keywords') as string;
    const competitorsStr = formData.get('competitors') as string;
    
    const payload = {
      website: formData.get('website'),
      businessName: formData.get('businessName'),
      address: formData.get('address'),
      industry: formData.get('industry'),
      keywords: keywordsStr.split(',').map(k => k.trim()).filter(k => k),
      competitors: competitorsStr ? competitorsStr.split(',').map(c => c.trim()).filter(c => c) : [],
      contactName: formData.get('contactName'),
      jobTitle: formData.get('jobTitle'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp'),
      notes: formData.get('notes'),
    };

    try {
      const response = await fetch('https://dashboard.gspr-hub.site/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'geo-internal-samwang0420',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo(0, 0);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-navy text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Analysis Request Submitted!</h1>          
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Thank you for your submission. Our team will analyze your website and 
            send your comprehensive GEO report within 24 hours.
          </p>
          
          <div className="bg-navy-light rounded-xl p-6 border border-gray-800 mb-8">
            <h2 className="text-lg font-semibold mb-4">What Happens Next?</h2>            
            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">AI Visibility Scan</p>
                  <p className="text-sm text-gray-400">We analyze your presence across ChatGPT, Perplexity, Claude, and Google SGE</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Competitor Analysis</p>
                  <p className="text-sm text-gray-400">We compare your AI visibility against your top competitors</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium">Report Delivery</p>
                  <p className="text-sm text-gray-400">Receive your 6-page detailed report with actionable recommendations</p>
                </div>
              </div>
            </div>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-navy-light hover:bg-navy-lighter text-white px-6 py-3 rounded-lg border border-gray-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">GEO Analysis Request</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Your Free GEO Analysis</h1>          
          <p className="text-gray-400">
            Get a comprehensive analysis of your practice's AI visibility across ChatGPT, 
            Perplexity, Claude, and Google SGE.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Business Info */}
          <div className="bg-navy-light rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Business Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <input
                    type="url"
                    id="website"
                    name="website"
                    required
                    placeholder="https://www.yourclinic.com"
                    className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                  Business / Practice Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    placeholder="Elite Aesthetic Center"
                    className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="123 Main St, Beverly Hills, CA 90210"
                    className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select your industry...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Keywords & Competitors */}
          <div className="bg-navy-light rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Keywords & Competitors
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">
                  Target Keywords (3-5) *
                </label>
                <div className="relative">
                  <Target className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <textarea
                    id="keywords"
                    name="keywords"
                    required
                    rows={2}
                    placeholder="botox in miami, best plastic surgeon, dental implants..."
                    className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
              </div>

              <div>
                <label htmlFor="competitors" className="block text-sm font-medium text-gray-300 mb-2">
                  Main Competitors
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <textarea
                    id="competitors"
                    name="competitors"
                    rows={2}
                    placeholder="competitor1.com, competitor2.com..."
                    className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Optional. Separate competitor websites with commas.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="bg-navy-light rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      placeholder="Dr. John Smith"
                      className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      required
                      placeholder="Medical Director"
                      className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@yourclinic.com"
                      className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
                  WeChat / WhatsApp
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="Your WeChat ID or WhatsApp number"
                    className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Notes
                </label>
                <div className="relative">
                  <Stethoscope className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Any specific concerns, goals, or information you'd like us to know..."
                    className="w-full bg-navy border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 text-danger">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-danger hover:bg-danger-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Request Free GEO Analysis
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Your information is secure and will never be shared. 
            Report delivered within 24 hours.
          </p>
        </form>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-4 gap-4">
          {[
            { value: '4 AI', label: 'Platforms' },
            { value: '24hr', label: 'Delivery' },
            { value: 'Free', label: 'Analysis' },
            { value: 'HIPAA', label: 'Compliant' },
          ].map((badge, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg font-bold text-primary">{badge.value}</div>
              <div className="text-xs text-gray-500">{badge.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
