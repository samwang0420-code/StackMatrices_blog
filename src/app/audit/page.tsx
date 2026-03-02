'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, Shield } from "lucide-react";

// Sample audit data
const AUDIT_DATA = {
  score: 28,
  grade: "C",
  status: "At Risk",
  competitors: [
    { name: "Competitor A", visibility: 78, chatgpt: true, claude: true, perplexity: true },
    { name: "Competitor B", visibility: 65, chatgpt: true, claude: true, perplexity: true },
    { name: "Competitor C", visibility: 52, chatgpt: false, claude: true, perplexity: true },
  ],
  annualLoss: 18144000,
  monthlyLoss: 1512000,
};

export default function AuditPage() {
  const [formData, setFormData] = useState({
    website: '',
    service: '',
    monthlySpend: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-danger text-sm font-semibold tracking-widest uppercase mb-4">AI Visibility Audit</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover How Much Revenue AI is Stealing From Your Practice</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our proprietary audit reveals your clinic's AI visibility score, competitor capture rates, and exact revenue leakage.
          </p>
        </div>

        {/* Score Gauge */}
        <div className="bg-navy-light rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#1f2937" strokeWidth="20" />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="70" 
                  fill="none" 
                  stroke="#EF4444" 
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={`${(AUDIT_DATA.score / 100) * 440} 440`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-danger font-mono">{AUDIT_DATA.score}</div>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-danger mb-2">{AUDIT_DATA.status}</div>
            <p className="text-gray-400">Grade {AUDIT_DATA.grade} — Critical intervention required</p>
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="bg-navy-light rounded-2xl border border-gray-800 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold">Competitor AI Capture Analysis</h2>
          </div>
          
          <table className="w-full">
            <thead>
              <tr className="bg-navy">
                <th className="text-left p-4 text-sm font-semibold text-gray-400">Brand</th>
                <th className="text-center p-4 text-sm font-semibold text-gray-400">AI Visibility</th>
                <th className="text-center p-4 text-sm font-semibold text-gray-400">ChatGPT</th>
                <th className="text-center p-4 text-sm font-semibold text-gray-400">Claude</th>
                <th className="text-center p-4 text-sm font-semibold text-gray-400">Perplexity</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_DATA.competitors.map((comp, idx) => (
                <tr key={idx} className="border-b border-gray-800">
                  <td className="p-4">{comp.name}</td>
                  <td className="p-4 text-center">{comp.visibility}/100</td>
                  <td className="p-4 text-center">
                    <span className={comp.chatgpt ? 'text-primary' : 'text-danger'}>
                      {comp.chatgpt ? <><CheckCircle className="w-4 h-4 inline" /></> : <><XCircle className="w-4 h-4 inline" /></>}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={comp.claude ? 'text-primary' : 'text-danger'}>
                      {comp.claude ? <><CheckCircle className="w-4 h-4 inline" /></> : <><XCircle className="w-4 h-4 inline" /></>}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={comp.perplexity ? 'text-primary' : 'text-danger'}>
                      {comp.perplexity ? <><CheckCircle className="w-4 h-4 inline" /></> : <><XCircle className="w-4 h-4 inline" /></>}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-danger/10">
                <td className="p-4 font-bold text-danger">YOU</td>
                <td className="p-4 text-center font-bold">{AUDIT_DATA.score}/100</td>
                <td className="p-4 text-center"><XCircle className="w-4 h-4 inline text-danger" /></td>
                <td className="p-4 text-center"><XCircle className="w-4 h-4 inline text-danger" /></td>
                <td className="p-4 text-center"><CheckCircle className="w-4 h-4 inline text-primary" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Revenue Loss */}
        <div className="bg-danger/10 border-2 border-danger rounded-2xl p-8 text-center mb-8">
          <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-4" />
          <div className="text-danger font-semibold uppercase tracking-wider mb-2">Estimated Annual Revenue Loss</div>
          <div className="text-5xl md:text-6xl font-bold text-danger font-mono mb-2">${AUDIT_DATA.annualLoss.toLocaleString()}</div>
          <p className="text-gray-400">(${AUDIT_DATA.monthlyLoss.toLocaleString()} monthly)</p>
        </div>

        {/* Form */}
        <div className="bg-navy-light rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-2">Get Your Complete AI Visibility Audit</h2>
          <p className="text-gray-400 mb-6">Receive a comprehensive 6-page report with actionable recovery protocols</p>
          
          {submitStatus === 'success' ? (
            <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Audit Report Sent!</h3>
              <p className="text-gray-400">Check your email for your complete AI visibility audit and GEO recovery roadmap.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="url"
                placeholder="Clinic Website (https://...)"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                required
              />
              
              <select 
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                required
              >
                <option value="">Main Service (Implants / Botox / etc.)</option>
                <optgroup label="Medical Aesthetics">
                  <option value="botox">Botox / Neuromodulators</option>
                  <option value="fillers">Dermal Fillers</option>
                  <option value="thermage">Thermage / RF Treatments</option>
                </optgroup>
                <optgroup label="Dentistry">
                  <option value="implants">Dental Implants</option>
                  <option value="invisalign">Invisalign / Orthodontics</option>
                  <option value="veneers">Porcelain Veneers</option>
                </optgroup>
              </select>
              
              <select 
                value={formData.monthlySpend}
                onChange={(e) => setFormData({...formData, monthlySpend: e.target.value})}
                className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                required
              >
                <option value="">Monthly Marketing Spend</option>
                <option value="5000">$1,000 - $5,000</option>
                <option value="15000">$5,000 - $15,000</option>
                <option value="30000">$15,000 - $30,000</option>
                <option value="50000">$30,000+</option>
              </select>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-danger hover:bg-danger-hover disabled:opacity-50 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isSubmitting ? 'Sending...' : "Get My Clinic's AI Leakage Audit"}
                <ArrowRight size={20} />
              </button>
            </form>
          )}
          
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield size={14} className="text-primary" />
            HIPAA/GDPR Compliant Data Handling
          </div>
        </div>
      </div>
    </div>
  );
}
