import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles, Target, Zap, Shield } from "lucide-react";

const SERVICES = [
  {
    icon: Target,
    title: "AI Visibility Audit",
    description: "Comprehensive analysis of your practice's presence across ChatGPT, Perplexity, Claude, and Google SGE.",
    features: [
      "Complete AI platform assessment",
      "Competitor visibility analysis",
      "Revenue loss calculation",
      "6-page detailed report",
    ],
    price: "Free",
    cta: "Request Audit",
    link: "/analysis-request",
  },
  {
    icon: Zap,
    title: "GEO Implementation",
    description: "Full-stack optimization to capture AI-referred patients before your competitors.",
    features: [
      "Technical schema markup",
      "AI-optimized content strategy",
      "Knowledge graph authority building",
      "Ongoing optimization",
    ],
    price: "From $4,500",
    cta: "Learn More",
    link: "/pricing",
  },
  {
    icon: Sparkles,
    title: "Content Creation",
    description: "AI-answerable content that positions your practice as the authority in your market.",
    features: [
      "Procedure deep-dives",
      "FAQ expansions",
      "Comparison content",
      "Case study documentation",
    ],
    price: "Custom",
    cta: "Contact Us",
    link: "/contact",
  },
  {
    icon: Shield,
    title: "Reputation Management",
    description: "Comprehensive review strategy and trust signal amplification.",
    features: [
      "Review generation system",
      "Response management",
      "Platform optimization",
      "Trust signal building",
    ],
    price: "From $800/mo",
    cta: "Learn More",
    link: "/contact",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    description: "We analyze your current AI visibility, competitors, and market opportunities.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Custom GEO roadmap designed for your specialty and market.",
  },
  {
    step: "03",
    title: "Implementation",
    description: "Technical foundation, content creation, and authority building.",
  },
  {
    step: "04",
    title: "Optimization",
    description: "Continuous monitoring and refinement based on AI response patterns.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Services</p>          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h1>          
          <p className="text-gray-300 max-w-2xl mx-auto">
            End-to-end GEO services designed specifically for medical practices. 
            From audit to implementation, we help you capture AI-referred patients.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />                </div>                
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>                
                <p className="text-gray-300 mb-6">{service.description}</p>                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />                      {feature}
                    </li>                  ))}
                </ul>                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{service.price}</span>                  
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />                  </Link>                </div>              </div>            );
          })}
        </div>

        {/* Process */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">Our Process</h2>          
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl font-bold text-white/10 mb-4">{item.step}</div>                
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>                
                <p className="text-gray-400 text-sm">{item.description}</p>              </div>            ))}
          </div>        </div>

        {/* CTA */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>          
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Start with a free AI visibility audit and discover exactly how we can help 
            your practice capture more AI-referred patients.
          </p>          
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Request Free Audit
            <ArrowRight className="w-5 h-5" />          </Link>        </div>      </div>    </div>
  );
}
