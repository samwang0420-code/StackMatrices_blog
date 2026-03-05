import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-light border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Compliance Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-800">
          <Shield size={16} className="text-primary" />
          Privacy-conscious data handling
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-navy" />
              </div>
              <span className="font-bold text-xl text-white">Stackmatrices</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm mb-4">
              Specialized GEO Agency for High-Value Medical Practices. 
              We secure your brand's citation at the exact moment of patient intent.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link href="/interventions" className="text-gray-400 hover:text-primary text-sm transition-colors">Strategic Interventions</Link></li>
              <li><Link href="/audit" className="text-gray-400 hover:text-primary text-sm transition-colors">AI Visibility Audit</Link></li>
              <li><Link href="/cases" className="text-gray-400 hover:text-primary text-sm transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          {/* Verticals */}
          <div>
            <h4 className="font-semibold text-white mb-4">Verticals</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400 text-sm">Medical Aesthetics</span></li>
              <li><span className="text-gray-400 text-sm">High-End Dentistry</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Stackmatrices Intelligence. All rights reserved.</p>
          <p className="text-gray-600 text-xs">
            We may earn a commission from referrals to third-party services, at no additional cost to your practice.
          </p>
        </div>
      </div>
    </footer>
  );
}
