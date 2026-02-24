import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">StackMatrices</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mb-4">
              Strategic Intelligence & Automation Architecture. 
              We don't sell AI tools. We deliver automated business outcomes.
            </p>
            <p className="text-slate-500 text-xs">
              "AI can write code. We write results."
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/skills" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Intel Skills</Link></li>
              <li><Link href="/how-it-works" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Custom Architecture</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/docs" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Documentation</Link></li>
              <li><a href="mailto:sam.wang01@icloud.com" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2026 StackMatrices. Strategic Intelligence & Automation Architecture.
          </p>
          <p className="text-slate-600 text-xs">
            Powered by Strategic Intelligence. Data is the new oil. We are the refinery.
          </p>
        </div>
      </div>
    </footer>
  );
}
