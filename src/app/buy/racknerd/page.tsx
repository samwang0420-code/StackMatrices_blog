export const metadata = {
  title: 'RackNerd VPS Deals - StackMatrices',
  description: 'Exclusive RackNerd VPS deals starting at $11.29/year. High-performance KVM VPS with generous bandwidth.',
};

export default function RackNerdPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            RackNerd <span className="text-emerald-400">VPS Deals</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            High-performance KVM VPS starting at just $11.29/year. 
            Perfect for hosting your projects, VPNs, or development environments.
          </p>
        </div>

        {/* Banner */}
        <div className="flex justify-center mb-12">
          <a 
            href="https://my.racknerd.com/aff.php?aff=18521" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all"
          >
            <img 
              src="https://racknerd.com/banners/728x90.gif" 
              alt="RackNerd VPS Deals" 
              width="728" 
              height="90"
              className="block"
            />
          </a>
        </div>

        {/* VPS Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 1GB Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all group">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-800">
              <div className="text-sm text-emerald-400 font-mono mb-2">STARTER</div>
              <h2 className="text-xl font-bold text-white">1 GB RAM KVM</h2>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-6">$11.29<span className="text-lg text-slate-500 font-normal">/year</span></div>
              <ul className="space-y-3 text-slate-400 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  1x vCPU Core
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  1 GB RAM
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  24 GB SSD Storage
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  2 TB Bandwidth
                </li>
              </ul>
              <a
                href="https://my.racknerd.com/aff.php?aff=18521&pid=903"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-slate-800 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all text-center group-hover:bg-emerald-500"
              >
                Get This Deal
              </a>
            </div>
          </div>

          {/* 2GB Plan - Popular */}
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              BEST VALUE
            </div>
            <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 p-6 border-b border-emerald-500/30">
              <div className="text-sm text-emerald-400 font-mono mb-2">POPULAR</div>
              <h2 className="text-xl font-bold text-white">2 GB RAM KVM</h2>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-6">$18.29<span className="text-lg text-slate-500 font-normal">/year</span></div>
              <ul className="space-y-3 text-slate-400 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  1x vCPU Core
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  2 GB RAM
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  40 GB SSD Storage
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  3.5 TB Bandwidth
                </li>
              </ul>
              <a
                href="https://my.racknerd.com/aff.php?aff=18521&pid=904"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all text-center"
              >
                Get This Deal
              </a>
            </div>
          </div>

          {/* 3.5GB Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all group">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-800">
              <div className="text-sm text-emerald-400 font-mono mb-2">GROWTH</div>
              <h2 className="text-xl font-bold text-white">3.5 GB RAM KVM</h2>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-6">$32.49<span className="text-lg text-slate-500 font-normal">/year</span></div>
              <ul className="space-y-3 text-slate-400 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  2x vCPU Cores
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  3.5 GB RAM
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  65 GB SSD Storage
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  7 TB Bandwidth
                </li>
              </ul>
              <a
                href="https://my.racknerd.com/aff.php?aff=18521&pid=905"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-slate-800 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all text-center group-hover:bg-emerald-500"
              >
                Get This Deal
              </a>
            </div>
          </div>

          {/* 4GB Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all group">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-800">
              <div className="text-sm text-emerald-400 font-mono mb-2">POWER</div>
              <h2 className="text-xl font-bold text-white">4 GB RAM KVM</h2>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-6">$43.88<span className="text-lg text-slate-500 font-normal">/year</span></div>
              <ul className="space-y-3 text-slate-400 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  3x vCPU Cores
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  4 GB RAM
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  105 GB SSD Storage
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  9 TB Bandwidth
                </li>
              </ul>
              <a
                href="https://my.racknerd.com/aff.php?aff=18521&pid=906"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-slate-800 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all text-center group-hover:bg-emerald-500"
              >
                Get This Deal
              </a>
            </div>
          </div>

          {/* 6GB Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all group">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-800">
              <div className="text-sm text-emerald-400 font-mono mb-2">PRO</div>
              <h2 className="text-xl font-bold text-white">6 GB RAM KVM</h2>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-6">$59.99<span className="text-lg text-slate-500 font-normal">/year</span></div>
              <ul className="space-y-3 text-slate-400 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  4x vCPU Cores
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  6 GB RAM
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  140 GB SSD Storage
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  12 TB Bandwidth
                </li>
              </ul>
              <a
                href="https://my.racknerd.com/aff.php?aff=18521&pid=907"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-slate-800 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all text-center group-hover:bg-emerald-500"
              >
                Get This Deal
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-4">Why RackNerd?</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Affordable yearly pricing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Multiple US datacenters</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>KVM virtualization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Generous bandwidth allocation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>24/7 support</span>
              </li>
            </ul>
            <a
              href="https://my.racknerd.com/aff.php?aff=18521"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              View all products →
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-slate-500 text-sm">
          <p>Links are affiliate links. Thanks for supporting StackMatrices!</p>
        </div>
      </div>
    </div>
  );
}
