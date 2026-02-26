import Link from "next/link";
import { Metadata } from "next";
import { SkillCard } from "@/components/SkillCard";
import { HeroSection } from "@/components/HeroSection";
import skillsData from "@/data/skills.json";
import { TrustBadges, TestimonialCard, LiveActivityFeed } from '@/components/social-proof';
import { generateOrganizationSchema, generateFAQSchema, JsonLd } from '@/components/schema-org';

export const metadata: Metadata = {
  title: "StackMatrices | Premier OpenClaw Skill Registry",
  description: "High-performance, ready-to-deploy Skills for the OpenClaw ecosystem. Transform your AI agent into a strategic business asset.",
};

// FAQ data for GEO
const HOME_FAQS = [
  {
    question: "What is StackMatrices?",
    answer: "StackMatrices is a registry of ready-to-deploy AI Skills for the OpenClaw ecosystem. Each Skill automates specific business tasks like competitor monitoring, data analysis, and workflow automation."
  },
  {
    question: "How do I deploy a Skill?",
    answer: "Simply purchase a Skill from our registry, then run the one-command deployment: 'npx stack-matrices deploy SKILL_ID --license=YOUR_LICENSE_KEY'. The Skill automatically configures itself."
  },
  {
    question: "Do I need coding skills?",
    answer: "No. StackMatrices Skills are designed for non-technical users. All configuration is handled automatically. You only need to provide your API keys when prompted."
  },
  {
    question: "What is the pricing model?",
    answer: "Skills use a Credits-based system. You purchase credits upfront, and each operation consumes credits based on resource usage. Credits never expire."
  }
];

// Skill Block for Categories
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
  const featuredSkills = skillsData.filter(skill => skill.featured).slice(0, 4);

  return (
    <>
      {/* Schema.org structured data for GEO */}
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateFAQSchema(HOME_FAQS)} />
      
      <div className="min-h-screen bg-slate-950 text-white">
      {/*  Hero with Animation  */}
      <HeroSection />

      {/*  Skill Categories  */}
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

      {/*  Featured Skills  */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-mono mb-4">FEATURED_SKILLS</p>
            <h2 className="text-3xl font-bold mb-4">Ready-to-Deploy Modules</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} compact />
            ))}
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

          {/* Trust Badges */}
          <TrustBadges />

          {/* Testimonials */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <p className="text-emerald-400 text-sm font-mono mb-2">TESTIMONIALS</p>
              <h3 className="text-2xl font-bold">What Users Say</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard
                quote="Saved me 10 hours/week on competitor monitoring. The insights are incredibly actionable."
                author="Sarah Chen"
                role="E-commerce Director"
                company="Nordic Goods"
                skill="Price Monitor"
                metric="10h/week saved"
              />
              <TestimonialCard
                quote="Best investment for my agency. Clients love the detailed competitor reports we deliver."
                author="Marcus Johnson"
                role="Marketing Lead"
                company="GrowthLab"
                skill="Competitor Tracker"
                metric="3x faster delivery"
              />
              <TestimonialCard
                quote="The Review Analyzer helped us identify product issues before they became negative trends."
                author="Lisa Park"
                role="Product Manager"
                company="TechGear"
                skill="Review Analyzer"
                metric="15% fewer returns"
              />
            </div>
          </div>
        </div>
      </section>

      {/*  CTA  */}
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

      {/* Live Activity Feed */}
      <LiveActivityFeed />
    </>
  );
}
