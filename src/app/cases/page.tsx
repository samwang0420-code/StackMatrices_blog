import Link from "next/link";
import { ArrowRight, TrendingUp, Building2, Stethoscope } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "beverly-hills",
    title: "Elite Aesthetic Center",
    location: "Beverly Hills, CA",
    type: "Plastic Surgery",
    metric: "+340%",
    metricLabel: "AI Visibility",
    description: "How a premier Beverly Hills plastic surgery practice achieved AI recommendation dominance in 90 days, transforming from invisible to market leader.",
    icon: Building2,
    color: "primary",
  },
  {
    id: "miami-dental",
    title: "Miami Implant Specialists",
    location: "Miami, FL",
    type: "Dental Implants",
    metric: "$3.4M",
    metricLabel: "Loss Prevented",
    description: "A high-end dental implant center recovered $3.4M in annual revenue by capturing AI-referred patients previously diverted to competitors.",
    icon: Stethoscope,
    color: "danger",
  },
  {
    id: "california-medspa",
    title: "Radiance MedSpa Network",
    location: "California (6 locations)",
    type: "Medical Aesthetics",
    metric: "400%",
    metricLabel: "ROI Achieved",
    description: "Multi-location MedSpa chain leveraged coordinated GEO strategy to dominate AI recommendations across all California markets.",
    icon: TrendingUp,
    color: "primary",
  },
];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Case Studies</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Real Results from Real Practices</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how medical practices across the country have transformed their patient acquisition 
            through strategic GEO implementation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "50+", label: "Practices Served" },
            { value: "$12M+", label: "Revenue Recovered" },
            { value: "89%", label: "Avg Improvement" },
            { value: "4.9/5", label: "Client Rating" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-navy-light rounded-xl p-6 text-center border border-gray-800">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {CASE_STUDIES.map((study) => {
            const Icon = study.icon;
            return (
              <Link
                key={study.id}
                href={`/cases/${study.id}`}
                className="group bg-navy-light rounded-2xl p-8 border border-gray-800 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-${study.color}/10`}>
                    <Icon className={`w-6 h-6 text-${study.color}`} />
                  </div>
                  <span className="text-sm text-gray-400">{study.type}</span>
                </div>

                <div className="mb-4">
                  <div className="text-4xl font-bold text-primary mb-1">{study.metric}</div>
                  <div className="text-sm text-gray-400">{study.metricLabel}</div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{study.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{study.location}</p>
                <p className="text-gray-500 text-sm mb-6">{study.description}</p>

                <div className="flex items-center gap-2 text-primary text-sm font-medium"
                >
                  Read Full Case Study
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-danger/10 rounded-2xl p-8 md:p-12 text-center border border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join These Success Stories?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get your free AI visibility audit and discover exactly how much revenue 
            your practice is losing to AI-referred competitor traffic.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get Your Free Audit
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
