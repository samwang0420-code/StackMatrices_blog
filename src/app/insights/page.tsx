import Link from "next/link";
import { ArrowRight, FileText, Clock, ArrowUpRight } from "lucide-react";

const INSIGHTS = [
  {
    id: "ai-eating-seo-budget",
    title: "Why AI is Eating Your SEO Budget",
    excerpt: "Traditional SEO is dying. Here's why 47% of your market is now invisible to your $50K/month SEO spend, and what successful practices are doing instead.",
    category: "Strategy",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "hidden-cost-calculator",
    title: "The Hidden Cost of AI Invisibility",
    excerpt: "Calculate exactly how much revenue your practice is losing to AI-referred competitor traffic. Real numbers from real practices.",
    category: "Analysis",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "ai-platform-comparison",
    title: "ChatGPT vs Perplexity vs Claude",
    excerpt: "Which AI engine sends you the most patients? Platform-specific strategies for each recommendation engine.",
    category: "Tactics",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "geo-checklist-47-factors",
    title: "The GEO Checklist: 47 Factors AI Engines Look For",
    excerpt: "The complete checklist of what ChatGPT, Perplexity, Claude, and Google SGE evaluate before recommending your practice.",
    category: "Implementation",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: "6-month-geo-playbook",
    title: "From Invisible to Unstoppable: The 6-Month Playbook",
    excerpt: "The exact week-by-week implementation plan we use to transform medical practices from AI-invisible to market-dominant.",
    category: "Implementation",
    readTime: "15 min read",
    featured: false,
  },
];

export default function InsightsPage() {
  const featured = INSIGHTS.filter(i => i.featured);
  const regular = INSIGHTS.filter(i => !i.featured);

  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            GEO Intelligence
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Insights & Research
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay ahead of the curve with our latest research on AI patient acquisition, 
            GEO strategies, and medical marketing best practices.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featured.map((article) => (
            <Link
              key={article.id}
              href={`/insights/${article.id}`}
              className="group bg-navy-light rounded-2xl p-8 border border-gray-800 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              
              <p className="text-gray-400 mb-6">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                Read Article
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* All Articles Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">All Articles</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {regular.map((article) => (
              <Link
                key={article.id}
                href={`/insights/${article.id}`}
                className="group bg-navy-light rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-xs text-gray-500">{article.category}</span>
                </div>

                <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-gray-400 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                  <ArrowUpRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-navy-light rounded-2xl p-8 border border-gray-800 text-center">
          <h2 className="text-2xl font-bold mb-4">Get GEO Insights Delivered</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Join medical practice leaders receiving weekly insights on AI patient acquisition 
            and GEO strategies.
          </p>
          
          <a
            href="mailto:sam.wang01@icloud.com?subject=Subscribe to GEO Insights"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-navy font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Subscribe via Email
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
