import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { notFound } from "next/navigation";

const BLOG_POSTS: Record<string, {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "ai-eating-seo-budget": {
    title: "Why AI is Eating Your SEO Budget (And What to Do About It)",
    category: "Strategy",
    author: "Sam Wang",
    date: "March 1, 2026",
    readTime: "8 min read",
    content: `
## The $14 Billion Shift Nobody's Talking About

In 2024, something fundamental changed about how patients find medical practices. It wasn't a Google algorithm update. It wasn't a new advertising platform. It was the rise of AI answer engines.

ChatGPT, Claude, Perplexity, and Google's Search Generative Experience (SGE) are now the first stop for an estimated 47% of high-intent medical queries.

## The SEO-to-GEO Migration

### Traditional SEO Logic:
1. Patient searches Google
2. Your website ranks #1-3
3. Patient clicks, browses, converts

### AI Era Reality:
1. Patient asks ChatGPT
2. AI generates an answer with 2-3 recommended providers
3. Patient books directly—never visiting your website

**Your $15,000/month SEO budget is now invisible to 47% of your market.**

## Why Medical Practices Are Especially Vulnerable

Medical procedures carry significant financial investment ($5K-$50K+ per procedure), physical risk, irreversibility, and social visibility. Patients need more than a search result—they need a recommendation they can trust.

AI engines provide that recommendation layer that traditional search lacks.

## Real Numbers: The SEO Waste Crisis

We analyzed 50 medical practices spending an average of $18,000/month on traditional SEO:

- Google Rankings: Strong (avg position 2.4)
- Organic Traffic: Steady
- **AI Visibility: 8/100 average**
- **AI Referrals: Near zero**

These practices were winning the SEO game but losing the patient acquisition war.

## The 4 Pillars of Medical GEO

### 1. Technical Infrastructure
- Comprehensive medical schema markup
- AI-readable service catalogs (llms.txt)
- Semantic content architecture
- Structured review data

### 2. Content Authority
- Question-answer formatted content
- Evidence-based procedure guides
- Comparison content
- Real patient outcome documentation

### 3. Knowledge Graph Presence
- Medical forum participation
- Authority citations
- Board certification verification
- Professional directory optimization

### 4. Trust Signal Amplification
- Verified patient reviews with outcomes
- Before/after galleries with metadata
- Credential transparency
- Educational content with citations

## Case Study: The $3.4M Recovery

A Miami dental implant practice was spending $35K/month on Google Ads and SEO. After 120 days of GEO implementation:

- AI visibility: 18 → 74 (+311%)
- Monthly AI referrals: 89 patients
- Prevented revenue loss: $3.4M annually

## The Bottom Line

SEO isn't dead. But SEO alone is no longer enough. The question isn't whether to invest in GEO—it's whether you can afford not to.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((id) => ({ id }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = BLOG_POSTS[params.id];
  
  if (!post) {
    notFound();
  }

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, idx) => {
        const trimmed = paragraph.trim();
        if (!trimmed) return '';
        
        if (trimmed.startsWith('## ')) {
          return `\u003ch2 class="text-2xl font-bold mt-12 mb-6 text-white"\u003e${trimmed.replace('## ', '')}\u003c/h2\u003e`;
        }
        if (trimmed.startsWith('### ')) {
          return `\u003ch3 class="text-xl font-semibold mt-8 mb-4 text-white"\u003e${trimmed.replace('### ', '')}\u003c/h3\u003e`;
        }
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return `\u003cp class="text-lg font-semibold text-primary my-6"\u003e${trimmed.replace(/\*\*/g, '')}\u003c/p\u003e`;
        }
        if (trimmed.match(/^\d+\./)) {
          const items = trimmed.split('\n').filter(line => line.trim().match(/^\d+\./));
          return `\u003col class="list-decimal list-inside space-y-2 text-gray-300 my-6 pl-4"\u003e${items.map(item => `\u003cli\u003e${item.replace(/^\d+\.\s*/, '')}\u003c/li\u003e`).join('')}\u003c/ol\u003e`;
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
          return `\u003cul class="list-disc list-inside space-y-2 text-gray-300 my-6 pl-4"\u003e${items.map(item => `\u003cli\u003e${item.replace('- ', '')}\u003c/li\u003e`).join('')}\u003c/ul\u003e`;
        }
        const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '\u003cstrong class="text-white"\u003e$1\u003c/strong\u003e');
        return `\u003cp class="text-gray-300 mb-6 leading-relaxed"\u003e${formatted}\u003c/p\u003e`;
      })
      .join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              {post.category}
            </span>          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />              {post.author}
            </div>            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />              {post.date}
            </div>            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />              {post.readTime}
            </div>          </div>        </div>

        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-10">
          <span className="text-8xl">📝</span>        </div>

        {/* Content */}
        <article 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-gray-400" />              <span className="text-sm text-gray-400">Share this article</span>            </div>            
            <div className="flex gap-2">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />              </button>              
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4" />              </button>              
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />              </button>            </div>          </div>        </div>

        {/* CTA */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply These Insights?</h2>          
          <p className="text-gray-300 mb-6">
            Get your free GEO analysis and discover how these strategies apply 
            to your specific practice.
          </p>          
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your Free Analysis
            <ArrowLeft className="w-4 h-4 rotate-180" />          </Link>        </div>      </div>    </div>
  );
}
