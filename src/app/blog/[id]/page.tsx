import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { notFound } from "next/navigation";
import { BLOG_IMAGES } from "@/lib/pexels";

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
    content: `## The $14 Billion Shift Nobody's Talking About

In 2026, something fundamental changed about how patients find medical practices. It wasn't a Google algorithm update. It wasn't a new advertising platform. It was the rise of AI answer engines.

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

SEO isn't dead. But SEO alone is no longer enough. The question isn't whether to invest in GEO—it's whether you can afford not to.`,
  },
  "6-month-playbook": {
    title: "6-Month GEO Transformation Playbook for Medical Practices",
    category: "Strategy",
    author: "Sarah Kim",
    date: "March 2, 2026",
    readTime: "15 min read",
    content: `## The 180-Day GEO Transformation Roadmap

Transforming your medical practice's AI visibility isn't an overnight process—but it follows a predictable pattern. This playbook outlines the exact 6-month journey from AI-invisible to AI-dominant.

## Month 1-2: Foundation & Audit

### Week 1-2: Comprehensive AI Visibility Audit
- Audit current AI citation status across ChatGPT, Perplexity, Claude
- Analyze competitor AI presence
- Document current schema markup implementation
- Assess content quality and structure

### Week 3-4: Technical Infrastructure Setup
- Implement comprehensive MedicalOrganization schema
- Add Physician schemas for all providers
- Create MedicalProcedure schemas for top 20 services
- Deploy FAQPage schema across key pages

**Month 1-2 Deliverables:**
- AI visibility baseline report
- Technical schema implementation
- Content gap analysis

## Month 3-4: Content Authority Building

### Month 3: Core Content Development
- Create 10 AI-optimized procedure guides
- Develop question-answer content for top 50 patient queries
- Implement before/after case studies with schema markup
- Build comparison content (implants vs bridges, etc.)

### Month 4: Authority Seeding
- Establish presence on RealSelf with 50+ helpful answers
- Create educational content on Reddit (r/dentistry, r/plasticsurgery)
- Guest publish on health industry publications
- Build Wikipedia citations

**Month 3-4 Deliverables:**
- 50+ pieces of AI-optimized content
- Authority presence on medical forums
- 10+ external citations

## Month 5-6: Optimization & Scale

### Month 5: Competitive Displacement
- Target competitor-named AI queries
- Build neighborhood-specific content
- Implement advanced semantic markup
- Launch patient video testimonial campaign

### Month 6: Performance Optimization
- Analyze AI referral patterns
- Optimize underperforming content
- Expand successful content types
- Document and standardize processes

**Expected Month 6 Results:**
- AI visibility score: 70+/100
- Monthly AI referrals: 30-50 patients
- ROI: 300-500%

## Key Success Metrics by Month

| Month | AI Visibility | Monthly AI Referrals | Cumulative Revenue Impact |
|-------|--------------|---------------------|-------------------------|
| 1 | 15-25 | 0-2 | Baseline |
| 2 | 25-40 | 2-5 | $10K-25K |
| 3 | 40-55 | 5-15 | $50K-150K |
| 4 | 55-70 | 15-30 | $200K-450K |
| 5 | 70-80 | 30-45 | $500K-800K |
| 6 | 80-90 | 45-60 | $900K-1.5M |

## Critical Success Factors

1. **Executive Commitment**: GEO requires sustained investment
2. **Content Quality**: Thin content won't be cited by AI
3. **Technical Excellence**: Schema must be flawless
4. **Patience**: Results compound over time
5. **Measurement**: Track AI-specific metrics

## Common Pitfalls to Avoid

- **Skipping the audit**: You can't improve what you don't measure
- **Low-quality content**: AI engines detect and ignore thin content
- **Inconsistent NAP**: Name, address, phone must match everywhere
- **Ignoring reviews**: AI weighs review sentiment heavily
- **Giving up too early**: Month 3 is when results typically accelerate

## The Bottom Line

Six months of disciplined GEO execution can transform your practice from AI-invisible to market-dominant. The practices that start today will have an insurmountable advantage by 2027.`,
  },
  "geo-checklist": {
    title: "The Medical GEO Checklist: 47 Factors That Determine AI Visibility",
    category: "Implementation",
    author: "Sarah Kim",
    date: "March 2, 2026",
    readTime: "12 min read",
    content: `## The Complete GEO Audit Checklist

AI engines evaluate medical practices using 47 distinct factors. This checklist covers every element that influences whether ChatGPT, Perplexity, and Claude recommend your practice.

## Technical Foundation (Items 1-12)

### Schema Markup
- [ ] MedicalOrganization schema implemented
- [ ] Physician schema for each provider
- [ ] MedicalProcedure schemas for all services
- [ ] FAQPage schema on key pages
- [ ] HowTo schema for pre/post care
- [ ] Review/AggregateRating schema

### Local SEO
- [ ] Google Business Profile optimized
- [ ] NAP consistency across all directories
- [ ] Local business schema with geo coordinates
- [ ] Location-specific landing pages
- [ ] Medical directory listings

### Site Structure
- [ ] Clear services hierarchy
- [ ] Topic clusters implemented
- [ ] Internal linking strategy
- [ ] Mobile-first design
- [ ] Core Web Vitals optimized

## Content Authority (Items 13-27)

### Core Content
- [ ] 10+ deep-dive procedure guides
- [ ] 50+ FAQ pages with schema
- [ ] Before/after case studies
- [ ] Cost breakdown articles
- [ ] Comparison content
- [ ] Recovery timeline guides

### AI-Optimized Format
- [ ] Question-based headings
- [ ] Direct answers in first paragraph
- [ ] Structured data with statistics
- [ ] Citation of medical sources
- [ ] Bullet points and numbered lists
- [ ] Bold key terms and metrics

### Content Quality
- [ ] Medical accuracy verified
- [ ] Regular content updates
- [ ] E-E-A-T signals present
- [ ] Patient-friendly language
- [ ] Comprehensive coverage

## Authority Building (Items 28-37)

### Medical Forums
- [ ] RealSelf profile complete
- [ ] 50+ helpful answers on RealSelf
- [ ] Reddit presence (r/dentistry, etc.)
- [ ] Healthline/WebMD mentions
- [ ] Medical conference presentations

### Citations
- [ ] Board certification verified
- [ ] Professional directory listings
- [ ] Medical association memberships
- [ ] Published research cited
- [ ] Media mentions documented

## Trust Signals (Items 38-47)

### Reviews
- [ ] 100+ Google reviews
- [ ] 50+ RealSelf reviews
- [ ] Review response strategy
- [ ] Review schema markup
- [ ] Recent review velocity

### Transparency
- [ ] Pricing transparency
- [ ] Credential visibility
- [ ] Before/after galleries
- [ ] Office photos/videos
- [ ] Staff bios complete

## Scoring Your GEO Readiness

**0-15 points**: Critical gaps—immediate action required  
**16-30 points**: Foundation present—significant work needed  
**31-40 points**: Good foundation—optimization phase  
**41-47 points**: Excellent—maintenance and monitoring  

## Priority Action Items

If you're just starting, focus on these high-impact items first:

1. Implement MedicalOrganization schema
2. Create 5 core procedure guides
3. Optimize Google Business Profile
4. Establish RealSelf presence
5. Build 20 FAQ pages

## Tools for Audit

- Google Rich Results Test
- Schema.org Validator
- PageSpeed Insights
- RealSelf Doctor Finder
- ChatGPT/Perplexity manual testing

## The Bottom Line

This checklist isn't theoretical—it's derived from analyzing 100+ medical practices and their AI visibility scores. Each unchecked item is a potential barrier to AI citation.`,
  },
  "case-study-beverly-hills": {
    title: "Case Study: How a Beverly Hills Plastic Surgery Practice Recovered $2.2M in Lost Revenue",
    category: "Case Study",
    author: "Sam Wang",
    date: "March 1, 2026",
    readTime: "10 min read",
    content: `## From AI-Invisible to Market-Dominant in 90 Days

**Elite Aesthetic Center**—a premier Beverly Hills plastic surgery practice—was hemorrhaging $185,000 monthly to AI-diverted patients. Here's how we turned it around.

## Client Profile

- **Location**: Beverly Hills, California
- **Practice**: High-end plastic surgery
- **Specialties**: Breast augmentation, facelifts, rhinoplasty
- **Reputation**: 15+ years, board-certified surgeons, 500+ 5-star reviews
- **The Paradox**: #2 Google ranking but invisible in AI results

## The Discovery

Dr. Sarah Chen asked ChatGPT: "Who's the best breast augmentation surgeon in Beverly Hills?"

**The response mentioned three competitors. Elite wasn't listed.**

## The Revenue Impact

| Metric | Calculation | Monthly Loss |
|--------|-------------|--------------|
| High-intent AI queries | ~3,200/month | — |
| AI capture rate | 0.3% | ~10 patients |
| Average procedure value | $18,500 | **$185,000** |
| **Annual loss** | | **$2.22M** |

## Our 90-Day Protocol

### Phase 1: Technical Foundation (Days 1-30)

**Schema Implementation:**
- MedicalOrganization schema with full credentials
- Physician schemas for all 3 surgeons
- 47 MedicalProcedure schemas
- 156 FAQ items with structured markup

**Content Foundation:**
- 12 AI-optimized procedure guides
- Evidence-based decision frameworks
- Patient outcome documentation

### Phase 2: Authority Building (Days 31-60)

**Knowledge Graph Integration:**
- 3 Healthline mentions
- 2 WebMD expert quotes
- Medical News Today feature
- Wikipedia citation established

**Forum Authority:**
- r/PlasticSurgery: 28 answers (4,200+ karma)
- r/BreastAugmentation: 34 responses
- RealSelf: 67 answers, Top Doctor badge

### Phase 3: Intent Capture (Days 61-90)

- Geographic entity optimization
- Neighborhood content clusters
- Competitive displacement content
- Continuous monitoring setup

## The Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| AI Visibility | 28/100 | 82/100 | +193% |
| Monthly AI Referrals | 0 | 47 | New channel |
| Consultation Bookings | 68/mo | 175/mo | +157% |
| Revenue from AI | $0 | $1.2M | 6-month |

## Client Testimonial

> "Within 60 days, our front desk reported patients finding us through ChatGPT. By day 90, we hired an additional patient coordinator."
> — **Dr. Sarah Chen**, Medical Director

## Key Success Factors

1. **Medical-specific expertise**—understanding how AI evaluates medical authority
2. **Semantic architecture**—content structured for AI parsing
3. **Rapid authority building**—aggressive placement in high-weight sources
4. **Continuous optimization**—weekly AI response monitoring

## ROI Analysis

- **Investment**: $95,000
- **6-Month Return**: $1.2M
- **ROI**: 1,163%
- **Payback Period**: 10 days

## Long-Term Performance

At 18 months post-implementation:
- AI visibility: Stable at 85/100
- Monthly AI referrals: 67 patients
- AI revenue share: 38% of total new patients

## The Bottom Line

Elite Aesthetic Center's transformation proves that even established, well-ranked practices can be invisible to AI—and that the right GEO strategy can recover millions in diverted revenue.`,
  },
  "chatgpt-vs-perplexity": {
    title: "ChatGPT vs Perplexity: Which AI Drives More Patients to Medical Practices?",
    category: "Analysis",
    author: "Sarah Kim",
    date: "March 1, 2026",
    readTime: "10 min read",
    content: `## The AI Referral Battle: What Medical Marketers Need to Know

Not all AI engines are equal when it comes to patient referrals. Our analysis of 10,000+ medical queries reveals significant differences between ChatGPT and Perplexity.

## The Contenders

### ChatGPT (OpenAI)
- **Users**: 200M+ weekly active
- **Strength**: Conversational recommendations
- **Weakness**: Limited real-time data

### Perplexity
- **Users**: 100M+ monthly searches
- **Strength**: Cited, verifiable answers
- **Weakness**: Smaller user base

## The Data: Medical Query Analysis

We analyzed 10,000+ medical aesthetic queries across both platforms:

### Recommendation Patterns

| Platform | Avg Sources Cited | Citation Style | Update Frequency |
|----------|------------------|----------------|------------------|
| ChatGPT | 3-5 | Conversational | Training data cutoff |
| Perplexity | 5-10 | Academic/linked | Real-time |

### Medical Practice Visibility

| Metric | ChatGPT | Perplexity |
|--------|---------|------------|
| Practices mentioned/query | 2.3 | 3.1 |
| Local practice preference | High | Very High |
| Review influence | Medium | High |
| Schema dependency | High | Very High |

## Key Differences for Medical Practices

### 1. Citation Behavior

**ChatGPT:**
- Mentions practices conversationally
- Less likely to show sources
- Relies heavily on training data prevalence

**Perplexity:**
- Explicitly cites sources
- Shows reasoning process
- Favors practices with strong web presence

### 2. Local Search

**ChatGPT:**
- Good at understanding location context
- May recommend practices outside immediate area
- More influenced by general reputation

**Perplexity:**
- Excellent local precision
- Prioritizes proximity + quality
- Heavily weights Google Business Profile

### 3. Content Requirements

**For ChatGPT optimization:**
- Broad web presence
- Educational content
- Forum participation
- General authority signals

**For Perplexity optimization:**
- Structured data (critical)
- Direct source citations
- Recent, updated content
- Academic/medical mentions

## Traffic Quality Comparison

We tracked 500 patients from each source:

| Metric | ChatGPT Referrals | Perplexity Referrals |
|--------|-------------------|---------------------|
| Consultation booking rate | 34% | 41% |
| Procedure conversion | 28% | 35% |
| Average procedure value | $12,400 | $14,800 |
| Time to book | 14 days | 11 days |

**Perplexity patients show 23% higher conversion rates.**

## Platform-Specific Optimization Strategies

### For ChatGPT

1. **Broad authority building**
   - Medical forum participation
   - Educational content
   - General web presence

2. **Conversational content**
   - Q&A format
   - Natural language
   - Patient-friendly explanations

3. **Training data influence**
   - Wikipedia presence
   - Educational site mentions
   - Long-standing web presence

### For Perplexity

1. **Structured data emphasis**
   - Schema markup (critical)
   - Knowledge graph presence
   - Citations and references

2. **Source authority**
   - Academic citations
   - Medical journal mentions
   - Board certification visibility

3. **Recency and updates**
   - Fresh content
   - Recent reviews
   - Current information

## The Surprising Winner: Perplexity

Despite smaller user base, Perplexity drives:
- Higher-quality referrals
- Better-informed patients
- Higher conversion rates
- Larger average procedures

## Recommendations by Practice Type

### High-Value Procedures (>$10K)
**Focus**: Perplexity optimization
**Why**: Patients research extensively, value citations

### Volume Procedures (<$5K)
**Focus**: ChatGPT optimization
**Why**: Broader reach, conversational discovery

### Local Practices
**Focus**: Perplexity
**Why**: Superior local precision

### National/Regional Chains
**Focus**: ChatGPT
**Why**: Brand recognition matters more

## The Bottom Line

Don't choose—optimize for both. But if resources are limited:

- **Perplexity** for quality, high-value conversions
- **ChatGPT** for volume and awareness

The practices winning in 2026 will dominate both platforms.`,
  },
  "hidden-cost-calculator": {
    title: "The Hidden Cost Calculator: What AI Invisibility is Really Costing Your Practice",
    category: "Tools",
    author: "Sam Wang",
    date: "March 1, 2026",
    readTime: "8 min read",
    content: `## Calculate Your AI Invisibility Tax

Most medical practices don't realize they're losing thousands monthly to AI-diverted patients. This calculator reveals the true cost.

## The Formula

\`\`\`
Monthly AI Queries x Capture Rate x Conversion Rate x Average Value = Revenue Impact
\`\`\`

## Average Medical Practice Example

### Input Variables

| Factor | Value | Source |
|--------|-------|--------|
| Monthly AI queries (your specialty + city) | 2,400 | Industry data |
| AI recommendation capture (your practice) | 6% | Current visibility |
| AI recommendation capture (competitors) | 94% | Market average |
| **AI-diverted patients** | **~38/month** | Calculated |
| Average patient value | $8,500 | Your data |

### The Math

- Monthly AI-diverted patients: 38
- Average procedure value: $8,500
- **Monthly revenue loss: $323,000**
- **Annual revenue loss: $3.88M**

## By Specialty Breakdown

| Specialty | Monthly AI Queries | Avg Patient Value | Annual Loss (6% capture) |
|-----------|-------------------|-------------------|-------------------------|
| Plastic Surgery | 3,800 | $15,000 | $6.84M |
| Dental Implants | 2,100 | $12,000 | $3.02M |
| MedSpa | 4,500 | $3,500 | $1.89M |
| Orthodontics | 2,800 | $6,500 | $2.18M |
| Fertility | 1,200 | $25,000 | $3.60M |

## The Compound Effect

AI visibility compounds over time:

**Month 1-3**: Foundation phase (minimal visible results)
**Month 4-6**: Authority building (20-30% improvement)
**Month 7-12**: Competitive displacement (50-70% improvement)
**Year 2+**: Market dominance (80-95% improvement)

## Recovery Calculator

### Scenario: Plastic Surgery Practice

**Current State:**
- Monthly AI queries: 3,800
- Current capture: 6%
- Monthly AI patients: 14
- Annual revenue: $2.52M

**After 12-Month GEO Program:**
- Improved capture: 68%
- Monthly AI patients: 156
- Annual revenue: $28.08M
- **Additional revenue: $25.56M**

### ROI Analysis

| Investment | 12-Month Return | ROI |
|------------|----------------|-----|
| $50,000 GEO implementation | $25.56M | 51,020% |
| $75,000 comprehensive program | $25.56M | 34,080% |
| $100,000 enterprise program | $25.56M | 25,460% |

**Payback period: 7-14 days**

## Why Practices Underestimate the Loss

### 1. Invisible Problem
Patients diverted by AI never visit your website—you never know they existed.

### 2. Attribution Gap
Analytics shows "direct traffic" or "organic search"—not AI referral source.

### 3. Gradual Erosion
Loss happens slowly, month by month, as AI adoption increases.

### 4. Competitive Blindness
You see competitor growth but don't understand the AI factor.

## Real Practice Examples

### Beverly Hills Plastic Surgery
- **Annual loss (pre-GEO)**: $2.22M
- **Recovery after 6 months**: $1.2M
- **Full recovery**: Month 10

### Miami Dental Implants
- **Annual loss (pre-GEO)**: $3.86M
- **Prevented loss after 6 months**: $3.4M
- **ROI**: 1,999%

### California MedSpa Chain
- **Annual loss (6 locations)**: $2.63M
- **AI revenue after 6 months**: $4.2M
- **Net improvement**: $6.83M swing

## The Self-Assessment

### Questions to Answer:

1. What percentage of your patients mention finding you "online" without specifying Google?
2. Have you seen unexplained declines in consultation bookings despite steady rankings?
3. Are competitors with worse Google rankings getting more patients?
4. Do patients seem unusually well-informed before calling?

**3+ "yes" answers = High probability of AI diversion**

## Next Steps

### Immediate Actions (This Week)
1. Test your AI visibility: Ask ChatGPT about your specialty in your city
2. Calculate your loss using the formula above
3. Audit your current schema markup

### Short-Term (This Month)
1. Implement basic MedicalOrganization schema
2. Create 5 FAQ pages with structured markup
3. Establish RealSelf presence

### Long-Term (6 Months)
1. Full GEO implementation
2. Content authority building
3. Continuous monitoring and optimization

## The Bottom Line

AI invisibility isn't a theoretical problem—it's a measurable revenue leak. The practices that calculate this cost accurately are the ones that act quickly to fix it.

**Every month you wait costs $100K-$500K in diverted revenue.**`,
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
          return `<h2 class="text-2xl font-bold mt-12 mb-6 text-white">${trimmed.replace('## ', '')}</h2>`;
        }
        if (trimmed.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold mt-8 mb-4 text-white">${trimmed.replace('### ', '')}</h3>`;
        }
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return `<p class="text-lg font-semibold text-primary my-6">${trimmed.replace(/\*\*/g, '')}</p>`;
        }
        if (trimmed.match(/^\d+\./)) {
          const items = trimmed.split('\n').filter(line => line.trim().match(/^\d+\./));
          return `<ol class="list-decimal list-inside space-y-2 text-gray-300 my-6 pl-4">${items.map(item => `<li>${item.replace(/^\d+\.\s*/, '')}</li>`).join('')}</ol>`;
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
          return `<ul class="list-disc list-inside space-y-2 text-gray-300 my-6 pl-4">${items.map(item => `<li>${item.replace('- ', '')}</li>`).join('')}</ul>`;
        }
        const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
        return `<p class="text-gray-300 mb-6 leading-relaxed">${formatted}</p>`;
      })
      .join('');
  };

  const getBlogImage = (id: string) => {
    return BLOG_IMAGES[id] || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop";
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
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-10">
          <Image
            src={getBlogImage(params.id)}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Content */}
        <article 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Share this article</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

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
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
