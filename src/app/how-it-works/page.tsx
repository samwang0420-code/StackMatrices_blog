import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | StackMatrices",
  description: "Deploy enterprise-grade intelligence workflows in three simple steps. From skill selection to automated outcomes.",
};

const steps = [
  {
    number: "01",
    title: "Select Your Intelligence Skill",
    description: "Browse our arsenal of intelligence capabilities. Each skill is designed for specific business outcomes—competitor shadowing, review mining, inventory sentinel, and more.",
    details: [
      "Review detailed capability descriptions",
      "Understand use cases and business impact",
      "Compare features and pricing",
      "Read user testimonials"
    ]
  },
  {
    number: "02",
    title: "Connect Your Workflow",
    description: "One-click integration with your existing stack. No engineers required. Our skills plug directly into OpenClaw, Make, or your custom infrastructure.",
    details: [
      "Get your License Key instantly",
      "Configure environment variables",
      "Connect to your communication channels (Slack, Email)",
      "Test the integration"
    ]
  },
  {
    number: "03",
    title: "Receive Automated Outcomes",
    description: "Stop staring at raw data. Get AI-processed conclusions delivered directly to your workflows. Competitor moves, market shifts, opportunities—captured while you sleep.",
    details: [
      "Automated intelligence feeds",
      "Processed insights, not raw data",
      "Actionable recommendations",
      "Continuous optimization"
    ]
  }
];

const features = [
  {
    title: "No Subscription Required",
    description: "Pay only for what you use. No monthly fees, no hidden costs, no lock-in contracts.",
    icon: "💰"
  },
  {
    title: "Deploy Instantly",
    description: "Get your License Key immediately after payment verification. Start deploying within minutes.",
    icon: "⚡"
  },
  {
    title: "Enterprise Security",
    description: "All skills are security-audited. Data is encrypted in transit and at rest.",
    icon: "🔒"
  },
  {
    title: "Continuous Updates",
    description: "Our architecture team maintains and improves skills continuously based on market changes.",
    icon: "🔄"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            From Intelligence to{" "}
            <span className="text-emerald-400">Outcomes</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Three steps to deploy enterprise-grade intelligence workflows
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-emerald-400">{step.number}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
                <p className="text-slate-400 text-lg mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-1">→</span>
                      <span className="text-slate-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`bg-slate-900/50 border border-slate-800 rounded-2xl p-8 h-64 flex items-center justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{index === 0 ? '🎯' : index === 1 ? '⚡' : '📊'}</div>
                  <p className="text-slate-500">Step {step.number}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why StackMatrices
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Deploy Your First Skill?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join thousands of sellers using automated intelligence to outmaneuver competitors.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
            Browse Intelligence Skills
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
