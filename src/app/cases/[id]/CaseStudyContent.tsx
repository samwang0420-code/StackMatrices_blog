'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Building2, Stethoscope, TrendingUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Map icon names to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Stethoscope,
  TrendingUp,
};

interface CaseStudy {
  title: string;
  location: string;
  type: string;
  iconName: string;
  image: string;
  results: Array<{
    label: string;
    from: string;
    to: string;
    change: string;
  }>;
  content: string;
}

export default function CaseStudyContent({ study }: { study: CaseStudy }) {
  const Icon = ICON_MAP[study.iconName] || Building2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Case Studies
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-primary text-sm font-medium">{study.type}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{study.title}</h1>
          <p className="text-gray-400">{study.location}</p>

          <div className="relative aspect-video w-full rounded-xl overflow-hidden mt-8">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {study.results.map((result, idx) => (
            <div key={idx} className="bg-navy-light rounded-xl p-6 border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">{result.label}</p>
              <div className="text-2xl font-bold text-primary mb-1">{result.to}</div>
              <div className="text-xs text-gray-500">From {result.from} • {result.change}</div>
            </div>
          ))}
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-12 mb-4 text-white" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-8 mb-3 text-primary" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-300 mb-6 leading-relaxed" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-white/5" {...props} />,
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm border-collapse" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="border-b border-white/10" {...props} />,
              th: ({node, ...props}) => <th className="text-left py-3 px-4 text-gray-400 font-medium" {...props} />,
              td: ({node, ...props}) => <td className="py-3 px-4 text-gray-300 border-b border-white/10" {...props} />,
              hr: ({node, ...props}) => <hr className="my-8 border-white/10" {...props} />,
            }}
          >
            {study.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 bg-navy-light rounded-2xl p-8 border border-gray-800 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Similar Results?</h2>
          <p className="text-gray-400 mb-6">
            Get your free AI visibility audit and discover your practice's transformation potential.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get Your Free Audit
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
