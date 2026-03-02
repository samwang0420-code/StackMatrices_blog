import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";

const ARTICLES: Record<string, { title: string; category: string; readTime: string }> = {
  "ai-eating-seo-budget": {
    title: "Why AI is Eating Your SEO Budget (And What to Do About It)",
    category: "Strategy",
    readTime: "8 min read",
  },
  "hidden-cost-calculator": {
    title: "The Hidden Cost of AI Invisibility: A Revenue Calculator",
    category: "Analysis",
    readTime: "6 min read",
  },
  "ai-platform-comparison": {
    title: "ChatGPT vs Perplexity vs Claude",
    category: "Tactics",
    readTime: "10 min read",
  },
  "geo-checklist-47-factors": {
    title: "The GEO Checklist: 47 Things AI Engines Look For",
    category: "Implementation",
    readTime: "12 min read",
  },
  "6-month-geo-playbook": {
    title: "From Invisible to Unstoppable: The 6-Month Playbook",
    category: "Implementation",
    readTime: "15 min read",
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((id) => ({ id }));
}

export default function InsightPage({ params }: { params: { id: string } }) {
  const article = ARTICLES[params.id];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Insights
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
        </div>

        {/* Content Placeholder */}
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-6">
            This article is currently being prepared. For immediate access to our complete 
            GEO insights and strategies, please request your free AI visibility audit.
          </p>

          <div className="bg-navy-light rounded-xl p-6 border border-gray-800 my-8">
            <h2 className="text-xl font-semibold mb-4">Key Topics Covered:</h2>
            <ul className="space-y-2 text-gray-400">
              {params.id === "ai-eating-seo-budget" && (
                <>
                  <li>The $14 billion shift to AI answer engines</li>
                  <li>Why traditional SEO is no longer enough</li>
                  <li>The 4 pillars of medical GEO</li>
                  <li>Case study: $3.4M recovery story</li>
                </>
              )}
              {params.id === "hidden-cost-calculator" && (
                <>
                  <li>How to calculate your AI invisibility cost</li>
                  <li>Real practice examples and losses</li>
                  <li>The revenue loss formula</li>
                  <li>ROI expectations and timeline</li>
                </>
              )}
              {params.id === "ai-platform-comparison" && (
                <>
                  <li>ChatGPT patient behavior patterns</li>
                  <li>Perplexity vs Claude differences</li>
                  <li>Platform-specific GEO strategies</li>
                  <li>ROI by platform analysis</li>
                </>
              )}
              {params.id === "geo-checklist-47-factors" && (
                <>
                  <li>Technical infrastructure requirements</li>
                  <li>Content authority signals</li>
                  <li>Knowledge graph presence</li>
                  <li>Review and trust indicators</li>
                </>
              )}
              {params.id === "6-month-geo-playbook" && (
                <>
                  <li>Week-by-week implementation plan</li>
                  <li>Month 1: Emergency triage</li>
                  <li>Months 2-3: Authority building</li>
                  <li>Months 4-6: Optimization and scale</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-navy-light rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply These Insights?</h2>
          <p className="text-gray-400 mb-6">
            Get your free AI visibility audit and discover exactly how these strategies 
            apply to your specific practice situation.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your Free Audit
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
