import Link from 'next/link';
import { Terminal, Download, Key, Rocket, CheckCircle, Clock, Zap, Shield } from 'lucide-react';

export default function DeploymentGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Quick Start Guide
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Deploy Your First <span className="text-emerald-400">Skill</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl">
            From purchase to production in 5 minutes. No coding required.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-6 text-slate-400">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> <span>5 min setup</span></div>
            <div className="flex items-center gap-2"><Terminal className="w-4 h-4" /> <span>One command</span></div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> <span>Local execution</span></div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">5-Step Deployment Process</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Purchase a Skill</h3>
                <p className="text-slate-400">Browse the <Link href="/skills" className="text-emerald-400 hover:underline">Skill Registry</Link> and purchase the Skill that fits your needs. After payment, you will receive a License Key.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Install CLI (One-time)</h3>
                <p className="text-slate-400 mb-3">Install our CLI tool globally using npx:</p>
                <pre className="bg-slate-900 p-3 rounded-lg font-mono text-sm text-emerald-400">npm install -g stack-matrices</pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Deploy the Skill</h3>
                <p className="text-slate-400 mb-3">Run the deployment command with your License Key:</p>
                <pre className="bg-slate-900 p-3 rounded-lg font-mono text-sm text-emerald-400">npx stack-matrices deploy SKILL_ID --license=YOUR_LICENSE_KEY</pre>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Configure API Keys (First Time)</h3>
                <p className="text-slate-400">The Skill will prompt you for required API keys (e.g., Apify, OpenAI). Enter them once and they are saved securely for future use.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">5</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Start Using</h3>
                <p className="text-slate-400">The Skill is now ready! Use it via the CLI or integrate into your workflow. Run with --help to see available commands.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Deploy?</h2>
          <p className="text-slate-400 mb-8">Get your first Skill from the registry and deploy in minutes.</p>
          
          <div className="flex justify-center gap-4">
            <Link href="/skills" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors">
              Browse Skills
            </Link>
            <Link href="/dashboard" className="px-6 py-3 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 rounded-lg transition-colors">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
