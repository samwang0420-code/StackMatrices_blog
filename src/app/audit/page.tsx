import { Metadata } from "next";
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Visibility Audit | StackMatrices",
  description: "Discover how much revenue AI is stealing from your practice. Get your complete 6-page AI visibility audit.",
};

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
  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-danger text-sm font-semibold tracking-widest uppercase mb-4">
            AI Visibility Audit
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover How Much Revenue AI is Stealing From Your Practice
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our proprietary audit reveals your clinic's AI visibility score, 
            competitor capture rates, and exact revenue leakage.
          </p>
        </div>

        {/* Score Gauge */}
        <div className="bg-navy-light rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* SVG Gauge */}
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
                <div className="text-6xl font-bold text-danger font-mono">
                  {AUDIT_DATA.score}
                </div>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-danger mb-2">{AUDIT_DATA.status}</div>
            <p className="text-gray-400">
              Grade {AUDIT_DATA.grade} — Critical intervention required
            </p>
          </div>
        </div>

        {/* Competitor Table */}
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
                    {comp.chatgpt ? (
                      <span className="inline-flex items-center gap-1 text-primary">
                        <CheckCircle size={16} /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-danger">
                        <XCircle size={16} /> No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {comp.claude ? (
                      <span className="inline-flex items-center gap-1 text-primary">
                        <CheckCircle size={16} /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-danger">
                        <XCircle size={16} /> No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {comp.perplexity ? (
                      <span className="inline-flex items-center gap-1 text-primary">
                        <CheckCircle size={16} /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-danger">
                        <XCircle size={16} /> No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-danger/10">
                <td className="p-4 font-bold text-danger">YOU</td>
                <td className="p-4 text-center font-bold">{AUDIT_DATA.score}/100</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 text-danger">
                    <XCircle size={16} /> No
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 text-danger">
                    <XCircle size={16} /> No
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 text-primary">
                    <CheckCircle size={16} /> Yes
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Revenue Loss */}
        <div className="bg-danger/10 border-2 border-danger rounded-2xl p-8 text-center mb-8">
          <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-4" />
          <p className="text-danger font-semibold uppercase tracking-wider mb-2">
            Estimated Annual Revenue Loss
          </p>
          <div className="text-5xl md:text-6xl font-bold text-danger font-mono mb-2">
            ${AUDIT_DATA.annualLoss.toLocaleString()}
          </div>
          <p className="text-gray-400">
            (${AUDIT_DATA.monthlyLoss.toLocaleString()} monthly)
          </p>
        </div>

        {/* Form */}
        <div className="bg-navy-light rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-2">Get Your Complete AI Visibility Audit</h2>
          <p className="text-gray-400 mb-6">
            Receive a comprehensive 6-page report with actionable recovery protocols
          </p>
          
          <form className="space-y-4">
            <input
              type="url"
              placeholder="Clinic Website (https://...)"
              className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
              required
            />
            
            <select 
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
              className="w-full bg-danger hover:bg-danger-hover text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Get My Clinic's AI Leakage Audit
              <ArrowRight size={20} />
            </button>
          </form>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield size={14} className="text-primary" />
            HIPAA/GDPR Compliant Data Handling
          </div>
        </div>
      </div>
    </div>
  );
}
