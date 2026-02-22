import Link from 'next/link';
import { Calculator, BarChart3, FileText, TrendingUp, CheckSquare, ArrowRight, HelpCircle, Clock, FileArchive } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SaaS Tools & Calculators | Stackmatrices',
  description: 'Free SaaS ROI calculators, TCO analysis tools, buying checklists, and industry benchmarks. Make smarter software purchasing decisions with our free tools.',
  keywords: 'SaaS calculator, ROI calculator, TCO calculator, software buying guide, SaaS benchmarks, free tools',
  openGraph: {
    title: 'Free SaaS Tools & Calculators',
    description: 'Calculate ROI, compare TCO, and make smarter SaaS buying decisions with our free tools.',
    url: 'https://stackmatrices.com/tools',
    type: 'website',
  },
};

const tools = [
  {
    icon: FileArchive,
    title: 'PDF Toolkit',
    description: '90+ free PDF tools: merge, split, compress, convert, edit. 100% browser-based, no uploads, maximum privacy.',
    href: 'https://pdfcraft.devtoolcafe.com/en/',
    color: 'bg-red-600',
    badge: 'New',
    external: true,
  },
  {
    icon: HelpCircle,
    title: 'Automation Tool Finder',
    description: 'Answer 4 simple questions and get personalized automation tool recommendations based on your team size, budget, and technical skills.',
    href: '/tools/automation-finder',
    color: 'bg-purple-500',
    badge: 'New',
  },
  {
    icon: Clock,
    title: 'Sync Time Calculator',
    description: 'Calculate how much time and money you waste on manual data sync. Compare ROI of automation tools with real numbers.',
    href: '/tools/sync-time-calculator',
    color: 'bg-orange-500',
    badge: 'New',
  },
  {
    icon: Calculator,
    title: 'ROI Calculator',
    description: 'Calculate the potential return on investment for any SaaS tool. Input your costs and time savings to see if it\'s worth it.',
    href: '/tools/roi-calculator',
    color: 'bg-blue-500',
  },
  {
    icon: BarChart3,
    title: 'TCO Calculator',
    description: 'Get the complete 3-year total cost of ownership analysis. Compare multiple tools side by side with hidden fees included.',
    href: '/tools/tco-calculator',
    color: 'bg-green-500',
  },
  {
    icon: TrendingUp,
    title: 'Migration Cost Calculator',
    description: 'Estimate the time and cost required to switch from one tool to another. Includes training and downtime costs.',
    href: '/tools/migration-calculator',
    color: 'bg-purple-500',
  },
  {
    icon: CheckSquare,
    title: 'Buying Checklist PDF',
    description: 'Download our comprehensive 20-point checklist. Never miss hidden fees or critical features during evaluation.',
    href: '/tools/buying-checklist',
    color: 'bg-orange-500',
  },
  {
    icon: FileText,
    title: 'Pricing Trends Report',
    description: 'Access our annual pricing trend analysis. See which categories are increasing and where to find deals.',
    href: '/tools/pricing-report',
    color: 'bg-red-500',
  },
  {
    icon: BarChart3,
    title: 'Industry Benchmarks',
    description: 'Compare your software spending against industry standards. Filter by company size and category.',
    href: '/tools/benchmarks',
    color: 'bg-indigo-500',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
            Free Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free SaaS Tools
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Make smarter software decisions with our free calculators, checklists, and industry data.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const LinkComponent = tool.external ? 'a' : Link;
            const linkProps = tool.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
            
            return (
              <LinkComponent
                key={tool.title}
                href={tool.href}
                {...linkProps}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-slate-200 overflow-hidden relative"
              >
                {tool.badge && (
                  <span className="absolute top-4 right-4 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                    {tool.badge}
                  </span>
                )}
                <div className="p-6">
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    {tool.external ? 'Open Tool' : 'Use Tool'}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </LinkComponent>
            );
          })}
        </div>
      </div>

      {/* Affiliate Banners */}
      <div className="bg-slate-100 py-12 px-4 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-700 mb-6 text-center">
            Recommended SEO Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {/* KWFinder */}
            <div 
              dangerouslySetInnerHTML={{
                __html: '<iframe src="https://mangools.com/affil-banners/kwfinder-ad.html?title=default&theme=default&version=domain&size=300x250#a6999f04c6aee089276eea91f" width="300" height="250" style="border: 0;"></iframe>'
              }}
            />
            {/* SERPChecker */}
            <div 
              dangerouslySetInnerHTML={{
                __html: '<iframe src="https://mangools.com/affil-banners/serpchecker-ad.html?title=default&theme=default&size=300x250#a6999f04c6aee089276eea91f" width="300" height="250" style="border: 0;"></iframe>'
              }}
            />
            {/* SERPWatcher */}
            <div 
              dangerouslySetInnerHTML={{
                __html: '<iframe src="https://mangools.com/affil-banners/serpwatcher-ad.html?title=default&theme=default&size=300x250#a6999f04c6aee089276eea91f" width="300" height="250" style="border: 0;"></iframe>'
              }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Affiliate links - We may earn a commission at no extra cost to you
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white border-t border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-slate-600 mb-6">
            Check out our detailed software reviews and comparisons.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Read Our Reviews
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
