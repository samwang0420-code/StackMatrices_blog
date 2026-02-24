import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "StackMatrices | Strategic Intelligence & Automation Architecture",
  description: "We don't sell AI tools. We deliver automated business outcomes. Deploy enterprise-grade intelligence workflows for Amazon & Shopify in minutes.",
  keywords: "Amazon automation, Shopify intelligence, competitor monitoring, market intelligence, automation architecture",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">StackMatrices</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/skills" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Intel Skills</Link>
            <Link href="/how-it-works" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">How It Works</Link>
            <Link href="/faq" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors text-sm">Login</Link>
            <Link href="/skills" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Explore Skills
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-sm mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Strategic Intelligence & Automation Architecture
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Digital Moat
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Your Competitors Can't Cross
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4 leading-relaxed">
            We don't sell AI tools. We deliver automated business outcomes.
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            Deploy enterprise-grade intelligence workflows for Amazon & Shopify in minutes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/skills" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2">
              Explore Intel Skills
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all">
              Request Custom Architecture
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-16 border-t border-slate-800">
            <div>
              <div className="text-3xl font-bold text-emerald-400">$2.4M+</div>
              <div className="text-sm text-slate-500 mt-1">Revenue Protected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">12,000+</div>
              <div className="text-sm text-slate-500 mt-1">Intelligence Flows</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">99.9%</div>
              <div className="text-sm text-slate-500 mt-1">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-20 px-6 border-y border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-light text-slate-300 mb-8 italic">
            "AI is everywhere, but why are you still staring at Excel?"
          </blockquote>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Stop guessing. Start knowing. Every price drop, every stock change, every competitor move—
            <span className="text-emerald-400"> captured and analyzed while you sleep.</span>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            From Intelligence to <span className="text-emerald-400">Outcomes</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-emerald-400">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pick Your Skill</h3>
              <p className="text-slate-400">
                Choose your intelligence capability—competitor shadowing, review mining, or inventory sentinel.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-emerald-400">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Your Flow</h3>
              <p className="text-slate-400">
                One-click integration with your existing stack. No engineers required.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-emerald-400">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Outcomes</h3>
              <p className="text-slate-400">
                Get AI-processed conclusions delivered to Slack, Email, or Sheets. Not raw data—decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Intelligence Arsenal</h2>
              <p className="text-slate-400">Outcome-driven skills, not technical toys</p>
            </div>
            <Link href="/skills" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              View All Skills <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Market Intelligence */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-sm text-emerald-400 font-medium">MARKET INTELLIGENCE</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Shadow Monitor</h3>
              <p className="text-slate-400 mb-4">24/7 surveillance of competitor BSR, pricing, and Buybox movements.</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Outcome: First-mover pricing alerts</span>
                <Link href="/skills" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">Deploy →</Link>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <span className="text-sm text-emerald-400 font-medium">MARKET INTELLIGENCE</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Review Pulse Analyst</h3>
              <p className="text-slate-400 mb-4">AI-synthesized insights from competitor's last 100 negative reviews.</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Outcome: Exploit competitor weaknesses</span>
                <Link href="/skills" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">Deploy →</Link>
              </div>
            </div>

            {/* Operational Efficiency */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm text-cyan-400 font-medium">OPERATIONAL EFFICIENCY</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Inventory Watchdog</h3>
              <p className="text-slate-400 mb-4">Cross-store reconciliation and automated low-stock alerts.</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Outcome: Zero OOS disasters</span>
                <Link href="/skills" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">Deploy →</Link>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-sm text-cyan-400 font-medium">OPERATIONAL EFFICIENCY</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Margin Guardian</h3>
              <p className="text-slate-400 mb-4">Real-time profit calculations across all SKUs and marketplaces.</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Outcome: Hidden cost detection</span>
                <Link href="/skills" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">Deploy →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slogan Banner */}
      <section className="py-16 px-6 border-y border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light text-slate-300 italic">
            "Data is the new oil. <span className="text-emerald-400">We are the refinery.</span>"
          </p>
        </div>
      </section>

      {/* Private Arsenal CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Private Arsenal?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              If our standard intelligence skills aren't enough, our architects will build a custom, 
              end-to-end automation system for your specific scale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all">
                Book a Strategy Session
              </Link>
            </div>
            <p className="text-slate-500 text-sm mt-6">Starting at $2,000+ for custom architecture</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-lg">StackMatrices</span>
            </div>
            <p className="text-slate-500 text-sm">
              AI can write code. We write results.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
              <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-600 text-xs">
            Powered by Strategic Intelligence. © 2026 StackMatrices. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
