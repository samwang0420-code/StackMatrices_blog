import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | StackMatrices - OpenClaw Skill Registry",
  description: "StackMatrices is the premier OpenClaw Skill Registry. We design high-performance intelligence engines for the OpenClaw ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono mb-6">
            ABOUT_STACKMATRICES
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Architect of{" "}
            <span className="text-emerald-400">Intelligence</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We don't build AI agents. We build the skills that make them intelligent.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              StackMatrices was founded on a simple belief: AI agents are only as smart as the skills they possess. 
              While others focus on building better agents, we focus on building better skills.
            </p>
            <p>
              As the premier OpenClaw Skill Registry, we design high-performance, ready-to-deploy intelligence 
              engines for the OpenClaw ecosystem. Each skill is a battle-tested module that transforms raw 
              AI capabilities into strategic business outcomes.
            </p>
            <p>
              We don't sell tools. We deliver automated intelligence infrastructure. From competitor monitoring 
              to profit analysis, from inventory sync to market forecasting—our skills turn data into decisions.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Build</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligence Skills</h3>
              <p className="text-slate-400">
                Market spying, competitor tracking, sentiment analysis. 
                Know what your competitors know—before they know it.
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 border border-cyan-500/20">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Operational Skills</h3>
              <p className="text-slate-400">
                Workflow automation, data synchronization, inventory management. 
                Automate the boring so you can focus on the strategic.
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 border border-purple-500/20">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Decision Skills</h3>
              <p className="text-slate-400">
                AI-driven reporting, profit analysis, trend forecasting. 
                Get conclusions, not just data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why OpenClaw */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">The OpenClaw Ecosystem</h2>
          
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              OpenClaw is revolutionizing how AI agents are built and deployed. As an Official Skill Provider, 
              StackMatrices extends the OpenClaw ecosystem with production-ready intelligence modules.
            </p>
            <p>
              Our skills integrate seamlessly via the MCP (Model Context Protocol) Server, enabling zero-code 
              deployment into any OpenClaw agent. One configuration, instant intelligence.
            </p>
            <p>
              Whether you're monitoring Amazon competitors, syncing Shopify inventory, or analyzing market trends—
              our skills provide the intelligence layer that separates amateur agents from strategic assets.
            </p>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <span className="text-emerald-400 font-mono text-sm">Official Skill Provider</span>
            </div>
            <Link 
              href="/how-it-works"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Learn about deployment →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Upgrade Your Agent?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Browse our skill registry and deploy your first intelligence module in minutes.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Explore Skills
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
