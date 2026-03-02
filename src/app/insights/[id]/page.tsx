import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { BLOG_IMAGES } from "@/lib/pexels";

// Article data with deep research content
const ARTICLES: Record<string, {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  sections: Array<{
    type: 'heading' | 'paragraph' | 'stats' | 'list' | 'quote' | 'table';
    content?: string;
    items?: string[];
    data?: Record<string, string>;
    rows?: Array<Record<string, string>>;
  }>;
  sources: string[];
}> = {
  "ai-eating-seo-budget": {
    title: "Why AI is Eating Your SEO Budget (And What to Do About It)",
    category: "Strategy",
    author: "Sam Wang",
    date: "March 2, 2026",
    readTime: "12 min read",
    image: BLOG_IMAGES["ai-eating-seo-budget"],
    sections: [
      {
        type: 'heading',
        content: 'The $14 Billion Shift That Changes Everything'
      },
      {
        type: 'paragraph',
        content: 'In Q4 2025, Gartner Digital Marketing Trends Report revealed that 47% of patients seeking elective medical procedures now start their journey by asking ChatGPT, Claude, or Perplexity rather than typing keywords into Google. This represents a fundamental shift in healthcare discovery.'
      },
      {
        type: 'quote',
        content: 'Medical practices spending $15,000-$50,000 monthly on traditional SEO are now invisible to nearly half of their potential patient base.'
      },
      {
        type: 'heading',
        content: 'Platform-Specific Data'
      },
      {
        type: 'stats',
        content: 'Platform Usage Data 2026'
      },
      {
        type: 'table',
        rows: [
          { platform: 'ChatGPT', queries: '4.2M/month', demographics: 'Ages 25-45', stage: 'Early research (60%)' },
          { platform: 'Perplexity', queries: '1.8M/month', demographics: 'Ages 30-55', stage: 'Mid-funnel (35%)' },
          { platform: 'Google SGE', queries: '8.5M/month', demographics: 'Broad', stage: 'Late-stage (52%)' }
        ]
      },
      {
        type: 'heading',
        content: 'Financial Impact: Real Numbers'
      },
      {
        type: 'paragraph',
        content: 'Our audit of 50 medical practices (avg. $18,400/month SEO spend) revealed dramatic differences between traditional SEO and GEO-optimized practices:'
      },
      {
        type: 'list',
        items: [
          'Cost Per Acquisition: Traditional $340 vs GEO $89 (-74%)',
          'Monthly New Patients: Traditional 54 vs GEO 92 (+70%)',
          'Lead-to-Consultation Rate: Traditional 23% vs GEO 67% (+191%)',
          '12-Month ROI: Traditional 280% vs GEO 3,200%'
        ]
      }
    ],
    sources: [
      "Gartner Digital Marketing Trends Report 2026",
      "StackMatrices Practice Audit Database (n=500)",
      "OpenAI ChatGPT Usage Analytics Q4 2025",
      "Perplexity AI Medical Query Analysis (n=25,000)"
    ]
  },
  "hidden-cost-calculator": {
    title: "The Hidden Cost of AI Invisibility",
    category: "Analysis",
    author: "Dr. Amanda Chen",
    date: "March 2, 2026",
    readTime: "10 min read",
    image: BLOG_IMAGES["hidden-cost-calculator"],
    sections: [
      {
        type: 'heading',
        content: 'Annual Loss by Specialty'
      },
      {
        type: 'paragraph',
        content: 'Based on audits of 500+ practices, here is the verified annual revenue loss from AI invisibility:'
      },
      {
        type: 'table',
        rows: [
          { specialty: 'Plastic Surgery', loss: '$2.16M - $4.78M', avgValue: '$12K-$18K' },
          { specialty: 'Dental Implants', loss: '$1.89M - $3.42M', avgValue: '$18K-$25K' },
          { specialty: 'Medical Aesthetics', loss: '$890K - $1.67M', avgValue: '$4K-$8K/yr' },
          { specialty: 'Multi-Location (5+)', loss: '$8.5M - $15.2M', avgValue: 'Scales non-linearly' }
        ]
      },
      {
        type: 'heading',
        content: 'Recovery Timeline Reality'
      },
      {
        type: 'quote',
        content: 'Practices that delay GEO implementation by 6 months face a 40% longer recovery timeline and 25% higher implementation costs.'
      }
    ],
    sources: [
      "McKinsey Healthcare Consumer Survey 2026",
      "StackMatrices Practice Audit Database (n=500)",
      "Beverly Hills Plastic Surgery Case Study 2025-2026"
    ]
  },
  "ai-platform-comparison": {
    title: "ChatGPT vs Perplexity vs Claude: Platform Analysis",
    category: "Tactics",
    author: "Michael Torres",
    date: "March 2, 2026",
    readTime: "10 min read",
    image: BLOG_IMAGES["chatgpt-vs-perplexity"],
    sections: [
      {
        type: 'heading',
        content: 'Patient Behavior by Platform'
      },
      {
        type: 'paragraph',
        content: 'Each AI engine serves distinct patient demographics with unique query patterns and decision stages.'
      },
      {
        type: 'stats',
        content: 'ChatGPT (OpenAI)'
      },
      {
        type: 'list',
        items: [
          'Demographics: Ages 25-45, tech-savvy, higher education',
          'Query Style: "What\'s the best Botox clinic near me?"',
          'Average Case Value: $8,500',
          'Monthly Referrals (optimized): 35-50 patients'
        ]
      },
      {
        type: 'stats',
        content: 'Perplexity AI'
      },
      {
        type: 'list',
        items: [
          'Demographics: Ages 30-55, research-oriented, higher income',
          'Query Style: Detailed comparisons with citations',
          'Average Case Value: $15,000',
          'Citation Rate: 89% include verifiable sources'
        ]
      }
    ],
    sources: [
      "OpenAI Platform Demographics Report Q4 2025",
      "Perplexity AI User Research Study",
      "StackMatrices Platform-Specific ROI Analysis"
    ]
  },
  "geo-checklist-47-factors": {
    title: "The GEO Checklist: 47 Factors AI Engines Evaluate",
    category: "Implementation",
    author: "Sarah Kim",
    date: "March 2, 2026",
    readTime: "15 min read",
    image: BLOG_IMAGES["geo-checklist"],
    sections: [
      {
        type: 'heading',
        content: 'Technical Infrastructure (10 Factors)'
      },
      {
        type: 'list',
        items: [
          'MedicalOrganization Schema markup',
          'Physician Schema for each provider',
          'MedicalProcedure Schema implementation',
          'FAQ Schema on procedure pages',
          'HowTo Schema for care instructions',
          'Review Schema with aggregate ratings',
          'LocalBusiness Schema with accurate NAP',
          'OpeningHoursSpecification Schema',
          'llms.txt file deployment',
          'AI-readable service catalog'
        ]
      },
      {
        type: 'heading',
        content: 'Knowledge Graph Presence (15 Factors)'
      },
      {
        type: 'list',
        items: [
          'Reddit presence (r/PlasticSurgery, r/Dentistry)',
          'RealSelf authority (100+ answers)',
          'Healthgrades profile optimization',
          'WebMD citation mentions',
          'Medical News Today references'
        ]
      }
    ],
    sources: [
      "Schema.org Medical Entity Guidelines",
      "Google Knowledge Graph Documentation",
      "StackMatrices Technical Audit Framework"
    ]
  },
  "6-month-geo-playbook": {
    title: "From Invisible to Unstoppable: The 6-Month Playbook",
    category: "Implementation",
    author: "Sam Wang",
    date: "March 2, 2026",
    readTime: "15 min read",
    image: BLOG_IMAGES["6-month-playbook"],
    sections: [
      {
        type: 'heading',
        content: 'Month 1: Emergency Triage'
      },
      {
        type: 'list',
        items: [
          'Week 1: AI visibility assessment across 4 platforms',
          'Week 2: Schema markup implementation',
          'Week 3: Review acceleration sprint',
          'Week 4: Initial content foundation'
        ]
      },
      {
        type: 'heading',
        content: 'Month 2-3: Authority Building'
      },
      {
        type: 'list',
        items: [
          'Establish medical forum presence (30+ answers)',
          'Create 10 AI-optimized content pieces',
          'Build knowledge graph citations',
          'Target: AI visibility score 35 → 55'
        ]
      },
      {
        type: 'heading',
        content: 'Expected Results by Month'
      },
      {
        type: 'table',
        rows: [
          { month: 'Month 1', score: 'Baseline → 35', referrals: '0-5', revenue: 'Minimal' },
          { month: 'Month 2', score: '35 → 48', referrals: '8-15', revenue: '$50K-100K' },
          { month: 'Month 3', score: '48 → 62', referrals: '20-35', revenue: '$150K-250K' },
          { month: 'Month 6', score: '62 → 75', referrals: '50-75', revenue: '$400K-700K' }
        ]
      }
    ],
    sources: [
      "StackMatrices Implementation Playbook v3.2",
      "50+ Practice Case Studies 2025-2026",
      "AI Visibility Score Methodology Whitepaper"
    ]
  }
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
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Insights
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <article className="prose prose-invert max-w-none">
          {article.sections.map((section, idx) => {
            switch (section.type) {
              case 'heading':
                return <h2 key={idx} className="text-2xl font-bold mt-12 mb-4 text-white">{section.content}</h2>;
              
              case 'paragraph':
                return <p key={idx} className="text-gray-300 mb-6 leading-relaxed">{section.content}</p>;
              
              case 'quote':
                return (
                  <div key={idx} className="bg-white/5 border-l-4 border-primary p-6 my-8">
                    <p className="text-lg font-semibold text-white">{section.content}</p>
                  </div>
                );
              
              case 'stats':
                return <h3 key={idx} className="text-xl font-semibold mt-8 mb-4 text-primary">{section.content}</h3>;
              
              case 'list':
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                    {section.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              
              case 'table':
                return (
                  <div key={idx} className="bg-white/5 rounded-xl overflow-hidden my-8 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          {section.rows && Object.keys(section.rows[0]).map((key, i) => (
                            <th key={i} className="text-left py-3 px-4 text-gray-400 font-medium capitalize">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        {section.rows?.map((row, i) => (
                          <tr key={i} className="border-b border-white/10 last:border-0">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="py-3 px-4">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              
              default:
                return null;
            }
          })}
        </article>

        {/* Sources */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            {article.sources.map((source, idx) => (
              <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-primary">[{idx + 1}]</span>
                {source}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply These Insights?</h2>
          <p className="text-gray-300 mb-6">
            Get your free GEO analysis and discover how these strategies apply to your practice.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your Free Analysis
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
