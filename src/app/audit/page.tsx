'use client';

import Link from "next/link";
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, Shield, FileText } from "lucide-react";

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
  annualLoss: 1814400,
  monthlyLoss: 151200,
};

export default function AuditPage() {
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

        {/* Sample Score Card */}
        <div className="bg-navy-light rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary" />
            <span className="text-gray-400 text-sm">Sample Report Preview</span>
          </div>
          
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
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
                <div className="text-5xl font-bold text-danger font-mono">{AUDIT_DATA.score}</div>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-danger mb-2">{AUDIT_DATA.status}</div>
            <p className="text-gray-400">Grade {AUDIT_DATA.grade} — Critical intervention required</p>
          </div>
        </div>

        {/* Sample Competitor Comparison */}
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

        {/* Sample Revenue Loss */}
        <div className="bg-danger/10 border-2 border-danger rounded-2xl p-8 text-center mb-12">
          <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-4" />
          <div className="text-danger font-semibold uppercase tracking-wider mb-2">Estimated Annual Revenue Loss</div>
          <div className="text-5xl md:text-6xl font-bold text-danger font-mono mb-2">${AUDIT_DATA.annualLoss.toLocaleString()}</div>
          <p className="text-gray-400">(${AUDIT_DATA.monthlyLoss.toLocaleString()} monthly)</p>
        </div>

        {/* CTA Section */}
        <div className="bg-navy-light rounded-2xl p-8 border border-gray-800 text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Get Your Complete AI Visibility Audit</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Receive a comprehensive 6-page report analyzing your practice's AI visibility, 
            competitor landscape, and revenue impact.
          </p>
          
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Request Your Free Audit
            <ArrowRight size={20} />
          </Link>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-primary" />
              24-hour turnaround
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-primary" />
              No obligation
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-primary" />
              HIPAA compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
