import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StackMatrices | Premier OpenClaw Skill Registry",
  description: "High-performance, ready-to-deploy Skills for the OpenClaw ecosystem. Transform your AI agent into a strategic business asset with our Intelligence, Operational, and Decision Skills.",
};

// Skill Block SVG Component
function SkillBlock({ icon, title, category }: { icon: string; title: string; category: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-xs font-mono text-slate-500">.SKILL</div>
      </div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-emerald-400 font-mono">{category}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), radial-gradient(circle at 75% 75%, #10b981 0%, transparent 50%)'
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              OPENCLAW_SKILL_REGISTRY
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The Premier{" "}
              <span className="text-emerald-400">OpenClaw Skill</span>
              <br />
              Registry for Global Intelligence
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl leading-relaxed">
              We design high-performance, ready-to-deploy Skills for the OpenClaw ecosystem. 
              Transform your AI agent into a strategic business asset.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/skills" 
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Browse Skill Registry
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/how-it-works" 
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all"
            >
                Deployment Guide
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Zero-Code Deployment
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                MCP Server Integration
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                24/7 Autonomous Operation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-24 px-6 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-mono mb-4">SKILL_LIBRARY</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Skill Categories</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Each Skill is a pre-built intelligence engine, engineered for the OpenClaw runtime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligence Skills</h3>
              <p className="text-slate-400 mb-6">
                Market spying and data extraction engines. Monitor competitors, track prices, analyze sentiment.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-500">▸</span> Amazon Price Spy
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-500">▸</span> Review Sentiment Analyzer
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-500">▸</span> Competitor Tracker
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 border border-cyan-500/20">
                <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Operational Skills</h3>
              <p className="text-slate-400 mb-6">
                Workflow automation and synchronization engines. Keep data flowing between platforms.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-cyan-500">▸</span> Inventory Sync
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-cyan-500">▸</span> Order Processor
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-cyan-500">▸</span> Data Pipeline
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
                <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Decision Skills</h3>
              <p className="text-slate-400 mb-6">
                AI-driven business reporting engines. Transform raw data into executive decisions.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-purple-500">▸</span> Profit Analyzer
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-purple-500">▸</span> Market Report
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-purple-500">▸</span> Trend Forecast
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Blocks Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-mono mb-4">FEATURED_SKILLS</p>
            <h2 className="text-3xl font-bold mb-4">Ready-to-Deploy Modules</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkillBlock icon="🎯" title="Shadow Monitor" category="INTELLIGENCE" />
            <SkillBlock icon="💬" title="Review Pulse" category="INTELLIGENCE" />
            <SkillBlock icon="📦" title="Inventory Watch" category="OPERATIONAL" />
            <SkillBlock icon="💰" title="Margin Guard" category="DECISION" />
            <SkillBlock icon="📝" title="Copy Commander" category="INTELLIGENCE" />
            <SkillBlock icon="🔗" title="Sync Bridge" category="OPERATIONAL" />
            <SkillBlock icon="📊" title="Profit Lens" category="DECISION" />
            <SkillBlock icon="🔍" title="Listing Hawk" category="INTELLIGENCE" />
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              View All Skills
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Integration Architecture */}
      <section className="py-24 px-6 border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-mono mb-4">INTEGRATION_ARCHITECTURE</p>
            <h2 className="text-3xl font-bold mb-4">How Skills Integrate</h2>
            <p className="text-slate-400">Seamless connection with your existing stack</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="grid grid-cols-7 gap-2 items-center text-center">
              <div className="col-span-1">
                <div className="bg-slate-800 rounded p-3 text-xs font-mono text-slate-400">APIFY</div>
              </div>
              <div className="text-slate-600">+</div>
              <div className="col-span-1">
                <div className="bg-slate-800 rounded p-3 text-xs font-mono text-slate-400">MAKE</div>
              </div>
              <div className="text-slate-600">+</div>
              <div className="col-span-1">
                <div className="bg-slate-800 rounded p-3 text-xs font-mono text-slate-400">OPENAI</div>
              </div>
              <div className="text-slate-600">→</div>
              <div className="col-span-2">
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded p-4">
                  <div className="text-emerald-400 font-mono text-sm font-bold">MCP_SERVER</div>
                  <div className="text-emerald-500/70 text-xs">SKILL_RUNTIME</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <div className="text-slate-600">↓</div>
            </div>
            
            <div className="mt-4 bg-slate-800 rounded-lg p-4 text-center">
              <div className="text-white font-medium mb-2">Your OpenClaw Agent</div>
              <div className="text-slate-400 text-sm">Autonomous intelligence execution</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Building Your Intelligence Stack
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Deploy your first skill in under 5 minutes. No credit card required.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Explore Skill Registry
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
