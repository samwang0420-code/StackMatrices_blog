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
      {/* Hero - Synced with How It Works style */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            PRE-BUILT INTEGRATIONS
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ready-to-Deploy{" "}
            <span className="text-emerald-400">Skills</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-mono">
            Connect your stack. Automate your workflow. Scale your business.
          </p>
        </div>
      </section>

      {/* Skills Grid - 4 columns on large screens */}
      <section className="pb-20 px-6 pt-12">
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
