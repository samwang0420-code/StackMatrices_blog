import { Metadata } from "next";
import { ArrowRight, Activity, Shield, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Strategic Interventions | StackMatrices",
  description: "Medical-Grade Intelligence Systems for Patient Intent Capture",
};

const INTERVENTIONS = [
  {
    title: "Aesthetic Intent Interceptor",
    subtitle: "Local AI Dominance Protocol",
    outcome: "Ensure your clinic is the #1 recommendation when AI is asked about local aesthetic procedures",
    description: "Deploy semantic seeding across high-weight AI training sources to capture patient intent at the exact moment of query.",
    icon: Activity,
    category: "Local AI Dominance",
    features: [
      "llms.txt deployment for medical service catalogs",
      "Treatment-specific schema markup",
      "Local entity graph construction",
      "Review sentiment optimization",
    ],
  },
  {
    title: "Medical Trust Architect",
    subtitle: "Clinical Reputation Seeding",
    outcome: "Deploy authoritative data points to high-weight AI training sources",
    description: "Strategic placement of clinical credentials and patient outcomes across Reddit, RealSelf, and medical forums.",
    icon: Shield,
    category: "Clinical Reputation",
    features: [
      "Authority citation in medical knowledge graphs",
      "Before/after semantic markup",
      "Doctor profile optimization",
      "Patient journey narrative seeding",
    ],
  },
  {
    title: "Intent-to-Treatment Linkage",
    subtitle: "Real-time Patient Lead Radar",
    outcome: "Instant notification when high-intent patients discuss procedures",
    description: "AI-powered monitoring of local digital conversations to identify prospects before competitors.",
    icon: TrendingUp,
    category: "Lead Intelligence",
    features: [
      "Social listening across medical forums",
      "Intent signal detection",
      "Competitor mention alerts",
      "Automated response protocols",
    ],
  },
];

export default function InterventionsPage() {
  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Strategic Interventions</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical-Grade Intelligence Systems</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            These are not "tools" but precision-engineered protocols for patient intent capture.
          </p>
        </div>

        {/* Interventions */}
        <div className="space-y-6">
          {INTERVENTIONS.map((intervention, idx) => {
            const Icon = intervention.icon;
            return (
              <div key={idx} className="bg-navy-light rounded-2xl p-8 border border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 flex-shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">{intervention.category}</p>
                    <h2 className="text-2xl font-bold mb-1">{intervention.title}</h2>
                    <p className="text-gray-400">{intervention.subtitle}</p>
                  </div>
                </div>

                <div className="bg-navy rounded-lg p-4 border-l-4 border-primary mb-4">
                  <p className="text-gray-500 text-xs uppercase mb-1">Outcome</p>
                  <p className="text-white font-medium">{intervention.outcome}</p>
                </div>

                <p className="text-gray-400 mb-4">{intervention.description}</p>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  {intervention.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <a href="/audit" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                  Deploy Protocol
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
