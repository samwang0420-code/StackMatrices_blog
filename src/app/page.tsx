import Link from "next/link";
import { Metadata } from "next";
import { Shield, Activity, TrendingUp, ArrowRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "StackMatrices | GEO Agency for Medical Practices",
  description: "Your Patients are Asking AI. Are they Finding You or Your Competitor? We secure your brand's citation at the exact moment of patient intent.",
};

// Medical Industry Data
const INDUSTRIES = [
  {
    id: "medical-aesthetics",
    name: "Medical Aesthetics",
    headline: "Dominate queries for 'Best Botox near me' or 'Top-rated skin clinics'",
    painPoints: [
      "AI searches for 'nearby aesthetic clinics' bypass your practice",
      "Prospects asking 'best hyaluronic acid brand' get competitor recommendations",
      "High-intent beauty seekers find your competitors on Perplexity",
    ],
    avgDeal: 8000,
    monthlyTraffic: 30000,
    services: ["Botox", "Fillers", "Thermage", "Ultherapy"],
  },
  {
    id: "dentistry",
    name: "High-End Dentistry",
    headline: "Capture high-LTV patients for Dental Implants and Invisalign",
    painPoints: [
      "Patients searching 'dental implants near me' never see your practice",
      "AI recommends competitors when asked 'best dentist in [city]'",
      "High-value implant patients diverted to competing practices",
    ],
    avgDeal: 15000,
    monthlyTraffic: 25000,
    services: ["Implants", "Invisalign", "Veneers", "Whitening"],
  },
];

// Interventions
const INTERVENTIONS = [
  {
    title: "Aesthetic Intent Interceptor",
    subtitle: "Local AI Dominance Protocol",
    outcome: "Ensure your clinic is the #1 recommendation when AI is asked about local aesthetic procedures",
    icon: Activity,
    category: "Local AI Dominance",
  },
  {
    title: "Medical Trust Architect",
    subtitle: "Clinical Reputation Seeding",
    outcome: "Deploy authoritative data points and patient success semantics to high-weight AI training sources",
    icon: Shield,
    category: "Clinical Reputation",
  },
  {
    title: "Intent-to-Treatment Linkage",
    subtitle: "Real-time Patient Lead Radar",
    outcome: "Instant notification when high-intent patients are discussing procedures in local digital circles",
    icon: TrendingUp,
    category: "Lead Intelligence",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">
            AI Patient Intent Capture Systems
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Patients are Asking AI.
            <br />
            <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              Are they Finding You or Your Competitor?
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Traditional SEO is dying. In the age of ChatGPT and Perplexity, 
            invisibility is the new death penalty for clinics. We secure your brand's 
            citation at the exact moment of patient intent.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Get My Clinic's AI Leakage Audit
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Revenue Leakage Section */}
      <section className="py-16 px-6 bg-navy-light border-y border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-danger text-sm font-semibold tracking-widest uppercase mb-4">
            Annual Revenue Leakage
          </p>
          <div className="text-6xl font-bold text-danger font-mono mb-2">
            $1,200,000
          </div>
          <p className="text-gray-400 mb-8">
            A typical high-end dental practice loses $1.2M annually to AI traffic hijacking.
            See how much you are leaving on the table.
          </p>
          
          {/* Simple Calculator */}
          <div className="bg-navy-lighter rounded-xl p-6 border border-gray-800 max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-left">
                <label className="text-xs text-gray-500 uppercase">Practice Type</label>
                <select className="w-full bg-navy border border-gray-700 rounded px-3 py-2 text-white mt-1">
                  <option>Dentistry ($15K avg)</option>
                  <option>Medical Aesthetics ($8K avg)</option>
                </select>
              </div>
              <div className="text-left">
                <label className="text-xs text-gray-500 uppercase">AI Visibility Score</label>
                <input 
                  type="number" 
                  defaultValue={28}
                  className="w-full bg-navy border border-gray-700 rounded px-3 py-2 text-white mt-1"
                />
              </div>
            </div>
            <div className="bg-danger/10 border border-danger/30 rounded-lg p-4">
              <p className="text-danger text-sm font-semibold uppercase">Estimated Annual Loss</p>
              <p className="text-3xl font-bold text-danger font-mono">$1,814,400</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Focus Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vertical Specialization</h2>
            <p className="text-gray-400">
              Precision-engineered GEO protocols for high-value medical practices
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {INDUSTRIES.map((industry) => (
              <div 
                key={industry.id}
                className="bg-navy-lighter rounded-2xl p-8 border border-gray-800 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{industry.name}</h3>
                    <p className="text-primary text-sm">Avg: ${industry.avgDeal.toLocaleString()}/client</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{industry.headline}</p>
                
                <div className="space-y-2 mb-4">
                  {industry.painPoints.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {industry.services.map((service) => (
                    <span 
                      key={service}
                      className="px-3 py-1 bg-navy rounded-full text-xs text-gray-400 border border-gray-800"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/interventions#${industry.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Explore Protocol
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interventions Section */}
      <section className="py-20 px-6 bg-navy-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Interventions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These are not "tools" but precision-engineered protocols for patient intent capture.
              Each intervention is designed specifically for high-value medical practices.
            </p>
          </div>
          
          <div className="space-y-6">
            {INTERVENTIONS.map((intervention, idx) => {
              const Icon = intervention.icon;
              return (
                <div 
                  key={idx}
                  className="bg-navy-lighter rounded-2xl p-8 border border-gray-800"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 flex-shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                        {intervention.category}
                      </p>
                      <h3 className="text-2xl font-bold mb-1">{intervention.title}</h3>
                      <p className="text-gray-400">{intervention.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="bg-navy rounded-lg p-4 border-l-4 border-primary mb-4">
                    <p className="text-xs text-gray-500 uppercase mb-1">Outcome</p>
                    <p className="text-white font-medium">{intervention.outcome}</p>
                  </div>
                  
                  <Link 
                    href="/interventions"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                  >
                    Deploy Protocol
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Stop Losing Patients to AI?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Every day you wait, your competitors capture more high-intent patients. 
            Get your complete AI visibility audit and recovery roadmap.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Get My AI Leakage Audit
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-8 px-6 bg-navy-lighter border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-sm text-gray-500">
          <Shield size={16} className="text-primary" />
          Fully Compliant with Healthcare Privacy Standards (HIPAA/GDPR Equivalent Semantic Handling)
        </div>
      </section>
    </div>
  );
}
