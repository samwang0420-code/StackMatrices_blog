import Link from "next/link";
import { Check, ArrowRight, Sparkles, Building2, Stethoscope } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    description: "For single-location practices starting their GEO journey",
    price: "$4,500",
    period: "one-time",
    icon: Stethoscope,
    features: [
      "Complete AI visibility audit",
      "Technical SEO foundation",
      "Schema markup implementation",
      "llms.txt configuration",
      "5 AI-optimized content pieces",
      "Google Business Profile optimization",
      "30-day support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "For established practices ready to dominate AI recommendations",
    price: "$12,500",
    period: "one-time",
    icon: Building2,
    features: [
      "Everything in Starter, plus:",
      "Advanced AI visibility strategy",
      "20 AI-optimized content pieces",
      "Knowledge graph authority building",
      "Medical forum presence setup",
      "Competitor displacement campaign",
      "RealSelf & Healthgrades optimization",
      "3-month ongoing optimization",
      "Monthly performance reports",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For multi-location chains and premium practices",
    price: "Custom",
    period: "",
    icon: Sparkles,
    features: [
      "Everything in Professional, plus:",
      "Multi-location strategy",
      "Unlimited content creation",
      "Dedicated account manager",
      "White-glove implementation",
      "AI response monitoring",
      "Crisis management",
      "12-month partnership",
      "Quarterly strategy reviews",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const ADD_ONS = [
  {
    name: "Content Acceleration",
    description: "10 additional AI-optimized articles per month",
    price: "$2,500/mo",
  },
  {
    name: "Review Management",
    description: "Automated review generation & response system",
    price: "$800/mo",
  },
  {
    name: "Video Production",
    description: "Professional procedure videos with AI metadata",
    price: "From $3,500",
  },
  {
    name: "Crisis Recovery",
    description: "Emergency reputation & visibility restoration",
    price: "From $8,500",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Investment in Your Practice Growth
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your practice. All plans include our core GEO methodology 
            and are designed to deliver measurable ROI within 90 days.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {PLANS.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.price === "Custom" ? "mailto:sam.wang01@icloud.com" : "/analysis-request"}
                  className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary hover:bg-primary-hover text-white"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Add-ons */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">Add-On Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADD_ONS.map((addon, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold mb-2">{addon.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
                <p className="text-primary font-semibold">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Typical ROI</h2>
              <p className="text-gray-300 mb-6">
                Our Professional plan clients see an average 3,200% ROI within 12 months. 
                Here's how the math works:
              </p>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Investment</span>
                  <span className="font-semibold">$12,500</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">New AI-referred patients (year 1)</span>
                  <span className="font-semibold">~65/month</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Avg. patient value</span>
                  <span className="font-semibold">$12,000</span>
                </div>
                <div className="flex justify-between py-2 text-primary">
                  <span className="font-semibold">Annual revenue impact</span>
                  <span className="font-bold text-xl">$4.68M</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 text-center">
              <p className="text-gray-400 mb-2">12-Month ROI</p>
              <p className="text-6xl font-bold text-primary mb-2">3,200%</p>
              <p className="text-gray-300">Payback period: 2.1 months</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Not Sure Which Plan?</h2>
          <p className="text-gray-400 mb-6">
            Get a free consultation to determine the best approach for your practice.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Schedule Free Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
