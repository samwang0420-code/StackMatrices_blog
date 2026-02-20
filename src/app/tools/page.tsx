import Link from 'next/link';
import { Calculator, BarChart3, FileText, TrendingUp, CheckSquare, ArrowRight } from 'lucide-react';
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
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-slate-200 overflow-hidden"
            >
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
                  Use Tool
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
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
