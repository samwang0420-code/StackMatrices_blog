import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Intelligence Arsenal | StackMatrices",
  description: "Outcome-driven intelligence skills for Amazon and Shopify operations. Deploy enterprise-grade automation workflows.",
};

const categories = [
  {
    name: "Market Intelligence",
    description: "Know your competitors better than they know themselves",
    skills: [
      {
        id: "shadow-monitor",
        name: "Shadow Monitor",
        tagline: "Amazon Edition",
        description: "24/7 surveillance of competitor BSR, pricing, and Buybox movements across all major categories.",
        outcome: "First-mover pricing alerts. Never miss a competitor price drop.",
        price: "$99",
        period: "month",
        popular: true,
      },
      {
        id: "review-pulse",
        name: "Review Pulse Analyst",
        tagline: "Competitor Weakness Scanner",
        description: "AI-synthesized insights from competitor's last 100 negative reviews. Automatically categorized by pain point.",
        outcome: "Exploit competitor weaknesses. Their failure is your roadmap.",
        price: "$49",
        period: "analysis",
      },
      {
        id: "listing-hawk",
        name: "Listing Hawk",
        tagline: "SEO Change Tracker",
        description: "Monitor competitor listing changes—title, bullets, images, backend keywords. Track SEO evolution over time.",
        outcome: "Reverse-engineer winning listing strategies.",
        price: "$79",
        period: "month",
      },
      {
        id: "market-mapper",
        name: "Market Mapper",
        tagline: "Category Landscape Analysis",
        description: "Complete category overview—top sellers, price distribution, review velocity, and saturation metrics.",
        outcome: "Enter markets with data-backed confidence.",
        price: "$149",
        period: "report",
      },
    ],
  },
  {
    name: "Operational Efficiency",
    description: "Automate the operations that drain your time",
    skills: [
      {
        id: "inventory-watchdog",
        name: "Inventory Watchdog",
        tagline: "Cross-Store Reconciliation",
        description: "Automated inventory sync across Amazon, Shopify, and warehouses. Low-stock alerts before you hit zero.",
        outcome: "Zero OOS disasters. Protect your Best Seller Rank.",
        price: "$129",
        period: "month",
        popular: true,
      },
      {
        id: "margin-guardian",
        name: "Margin Guardian",
        tagline: "Real-Time Profit Calculator",
        description: "Live profit calculations across all SKUs, factoring in Amazon fees, COGS, shipping, and PPC spend.",
        outcome: "Hidden cost detection. Know true profitability per SKU.",
        price: "$89",
        period: "month",
      },
      {
        id: "replenishment-ai",
        name: "Replenishment AI",
        tagline: "Smart Restock Forecasting",
        description: "ML-powered demand forecasting based on velocity trends, seasonality, and lead times.",
        outcome: "Optimal inventory levels. No more overstock or stockouts.",
        price: "$199",
        period: "month",
      },
      {
        id: "fee-auditor",
        name: "Fee Auditor",
        tagline: "Amazon Fee Reconciliation",
        description: "Automated detection of incorrect Amazon fees—FBA, storage, and referral fee errors.",
        outcome: "Recover 2-5% of revenue lost to fee errors.",
        price: "$149",
        period: "month",
      },
    ],
  },
  {
    name: "Content Intelligence",
    description: "Words and images that convert",
    skills: [
      {
        id: "copy-commander",
        name: "Copy Commander",
        tagline: "AI Listing Optimizer",
        description: "Generate SEO-optimized listings using top-performing competitor analysis + buyer psychology triggers.",
        outcome: "Higher CTR and CVR. Index for keywords that sell.",
        price: "$39",
        period: "listing",
      },
      {
        id: "review-responder",
        name: "Review Responder",
        tagline: "AI-Powered Review Management",
        description: "Auto-generate professional responses to negative reviews. Sentiment analysis across your review base.",
        outcome: "Improved seller rating. Turn critics into advocates.",
        price: "$59",
        period: "month",
      },
      {
        id: "image-analyst",
        name: "Image Analyst",
        tagline: "Visual Conversion Optimizer",
        description: "Analyze top-performing listing images in your category. Get specific recommendations for your hero shots.",
        outcome: "Image A/B testing strategy that converts.",
        price: "$79",
        period: "analysis",
      },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md fixed w-full z-50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">StackMatrices</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Intelligence <span className="text-emerald-400">Arsenal</span>
          </h1>
          <p className="text-xl text-slate-400">
            Outcome-driven skills. Not technical toys.
          </p>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-slate-400">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`bg-slate-900 border rounded-2xl p-6 hover:border-emerald-500/50 transition-all ${
                      skill.popular ? 'border-emerald-500/30' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{skill.name}</h3>
                          {skill.popular && (
                            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">POPULAR</span>
                          )}
                        </div>
                        <span className="text-emerald-400 text-sm">{skill.tagline}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">{skill.price}</div>
                        <div className="text-xs text-slate-500">/{skill.period}</div>
                      </div>
                    </div>

                    <p className="text-slate-400 mb-4 leading-relaxed">{skill.description}</p>

                    <div className="bg-slate-950/50 rounded-lg p-4 mb-6">
                      <span className="text-emerald-400 text-sm font-medium">Outcome: </span>
                      <span className="text-slate-300 text-sm">{skill.outcome}</span>
                    </div>

                    <Link
                      href={`/buy?skill=${skill.id}`}
                      className="block w-full bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-500 text-white text-center py-3 rounded-xl font-medium transition-all"
                    >
                      Deploy This Skill
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Architecture CTA */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-sm mb-6">
            Enterprise Grade
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Need a Private Arsenal?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Our architects build custom, end-to-end automation systems for 7-figure sellers. 
            If you need something that doesn't exist yet—we'll build it.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mb-10">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-2xl mb-1">Custom</div>
              <div className="text-slate-500 text-sm">Built for your exact workflow</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-2xl mb-1">Dedicated</div>
              <div className="text-slate-500 text-sm">Personal architect assignment</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-2xl mb-1">Scalable</div>
              <div className="text-slate-500 text-sm">Grows with your operation</div>
            </div>
          </div>
          
          <Link href="/contact" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all">
            Book a Strategy Session
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <p className="text-slate-500 text-sm mt-6">Starting at $2,000. ROI-focused architecture for serious sellers.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            "Don't work for your tools. Make your tools work for your bank account."
          </p>
          <p className="text-slate-600 text-xs mt-4">© 2026 StackMatrices. Strategic Intelligence & Automation Architecture.</p>
        </div>
      </footer>
    </div>
  );
}
