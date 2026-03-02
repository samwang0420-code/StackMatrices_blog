import { Metadata } from "next";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | StackMatrices",
  description: "Real results from medical practices that went from AI-invisible to market-dominant",
};

const CASES = [
  {
    industry: "Medical Aesthetics",
    title: "From Invisible to #1: Breast Augmentation Market Capture",
    client: "Elite Aesthetic Center, Beverly Hills",
    challenge: "Despite 15+ years of experience, Elite Aesthetic was invisible in AI search. Competitors were consistently recommended.",
    results: [
      { label: "AI Visibility Score", value: "28 → 82", change: "+193%" },
      { label: "Monthly AI Referrals", value: "0 → 47", change: "NEW" },
      { label: "Consultation Bookings", value: "+156%", change: "vs Q3" },
      { label: "Revenue from AI", value: "$1.2M", change: "6 months" },
    ],
    timeline: "90 Days",
  },
  {
    industry: "High-End Dentistry",
    title: "Implant Empire: Capturing High-LTV Dental Patients",
    client: "Miami Implant Specialists",
    challenge: "Premier implant practice losing high-value patients to competitors with better AI visibility.",
    results: [
      { label: "AI Visibility Score", value: "18 → 74", change: "+311%" },
      { label: "Monthly AI Referrals", value: "0 → 89", change: "NEW" },
      { label: "Implant Consultations", value: "+234%", change: "vs YOY" },
      { label: "Prevented Loss", value: "$3.4M", change: "annually" },
    ],
    timeline: "120 Days",
  },
];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Case Studies</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Clinics We've Transformed</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real results from real medical practices that went from AI-invisible to market-dominant
          </p>
        </div>

        {/* Cases */}
        <div className="space-y-8">
          {CASES.map((caseStudy, idx) => (
            <div key={idx} className="bg-navy-light rounded-2xl border border-gray-800 overflow-hidden">
              <div className="p-8 border-b border-gray-800">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
                  {caseStudy.industry}
                </span>
                <h2 className="text-2xl font-bold mb-2">{caseStudy.title}</h2>
                <p className="text-primary font-medium">{caseStudy.client}</p>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <p className="text-gray-500 text-xs uppercase mb-2">The Challenge</p>
                  <p className="text-gray-400">{caseStudy.challenge}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {caseStudy.results.map((result, ridx) => (
                    <div key={ridx} className="bg-navy rounded-xl p-4 text-center">
                      <p className="text-gray-500 text-xs uppercase mb-1">{result.label}</p>
                      <p className="text-2xl font-bold text-primary font-mono">{result.value}</p>
                      <p className="text-gray-500 text-xs">{result.change}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <TrendingUp size={16} className="text-primary" />
                  <span className="text-sm">{caseStudy.timeline} to Market Leadership</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join These Success Stories?</h2>
          <a
            href="/audit"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-navy font-bold px-8 py-4 rounded-lg transition-colors"
          >
            Start Your Transformation
            <TrendingUp size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
