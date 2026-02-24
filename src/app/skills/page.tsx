import { Metadata } from "next";
import Link from "next/link";
import { SkillCard } from "@/components/SkillCard";
import skillsData from "@/data/skills.json";

export const metadata: Metadata = {
  title: "Skill Registry | StackMatrices",
  description: "Ready-to-deploy OpenClaw skills. Pre-built integrations for Amazon, Shopify, Slack, and more.",
};

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
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
            PRE-BUILT INTEGRATIONS
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ready-to-Deploy{" "}
            <span className="text-emerald-400">Skills</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connect your stack. Automate your workflow. Scale your business.
          </p>
        </div>
      </section>

      {/* Skills Grid - 4 columns on large screens */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skillsData.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
          <p className="text-slate-400 mb-6">Our architects build custom skills for your specific stack.</p>
          
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Book Custom Build
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 StackMatrices. Strategic Intelligence & Automation Architecture.</p>
        </div>
      </footer>
    </div>
  );
}
