'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Stackmatrices</span>
            </Link>
            <p className="text-slate-500 max-w-xs mb-6">
              Empowering modern entrepreneurs to build and scale their digital empires through data-driven tool reviews.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.78 1.89 3.55-.7 0-1.35-.2-1.94-.53v.05c0 2.07 1.47 3.8 3.43 4.19-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.54 1.69 2.11 2.93 3.97 2.96-1.46 1.14-3.3 1.82-5.3 1.82-.34 0-.68-.02-1.01-.06 1.89 1.21 4.13 1.92 6.54 1.92 7.85 0 12.13-6.5 12.13-12.13 0-.18 0-.37-.01-.55.83-.6 1.56-1.35 2.13-2.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Directory</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Marketing Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sales & CRM</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Content Creation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Developer Tools</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-4">Get exclusive SaaS deals delivered to your inbox.</p>
            <div className="flex gap-2">
              <input className="flex-1 bg-slate-50 border-slate-200 rounded-lg text-sm px-4 py-2 focus:ring-1 focus:ring-primary" placeholder="Your email" type="email" />
              <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary-hover">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400">© 2024 Stackmatrices. All rights reserved.</p>
          <p className="text-[10px] md:text-xs text-slate-400 max-w-lg text-center md:text-right uppercase tracking-wider leading-relaxed">
            Trust Statement: I may earn a commission if you sign up through these links, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
