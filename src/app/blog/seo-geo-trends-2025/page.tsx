'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";
import { Menu, ChevronRight } from "lucide-react";

const ARTICLE = {
  title: "SEO and GEO Trends 2025: Data-Driven Analysis for Medical Practices",
  category: "Research",
  author: "StackMatrices Intelligence",
  date: "March 2, 2026",
  readTime: "15 min read",
};
const TABLE_OF_CONTENTS = [
  { id: "section1", title: "Section 1" },
  { id: "section2", title: "Section 2" },
  { id: "section3", title: "Section 3" },
];

export default function SEOTrends2025Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              {ARTICLE.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{ARTICLE.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {ARTICLE.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {ARTICLE.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {ARTICLE.readTime}
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <Menu size={16} />
            Table of Contents
          </div>
          <nav className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TABLE_OF_CONTENTS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <ChevronRight size={12} />
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {/*  Executive Summary */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Executive Summary</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The search industry is undergoing its biggest shift since the launch of Google. Traditional SEO 
            remains critical, but Generative Engine Optimization (GEO) has emerged as a parallel discipline. 
            This report examines current data on both fields, providing actionable insights for medical practices 
            seeking to capture AI-referred patients.
          </p>

          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Key Findings</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Google processes 8.5 billion searches daily but faces growing competition from AI-native search platforms</li>
              <li>58-60% of searches now end without a click, forcing brands to optimize for visibility within search results</li>
              <li>The GEO market is projected to grow from $886 million in 2026 to $7.3 billion by 2031</li>
              <li>ChatGPT holds 59.7% of the AI search market, with Perplexity reaching 153 million monthly visits</li>
              <li>86% of SEO professionals now use AI tools in their workflow</li>
            </ul>
          </div>

          {/*  SEO Current State */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">SEO Current State</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Market Share and Search Volume</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Google continues to dominate the search market with 89.74% global market share as of early 2025. 
            The platform processes approximately 8.5 billion searches per day, maintaining its position as the 
            primary gateway to online information.
          </p>

          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">8.5B</p>
              <p className="text-xs text-gray-400">Daily Google Searches</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">89.74%</p>
              <p className="text-xs text-gray-400">Google Market Share</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">86%</p>
              <p className="text-xs text-gray-400">SEOs Using AI Tools</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Click-Through Rate Data</h3>
          <p className="text-gray-300 mb-4">First-page rankings remain valuable, but the distribution of clicks has shifted:</p>

          <div className="bg-white/5 rounded-xl overflow-hidden my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Position</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">CTR</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">#1</td>
                  <td className="py-3 px-4">39.8%</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">Backlinko</span></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">#2</td>
                  <td className="py-3 px-4">18.7%</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">Backlinko</span></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">#3</td>
                  <td className="py-3 px-4">10.2%</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">Backlinko</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">#4-10</td>
                  <td className="py-3 px-4">2-7%</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">Ahrefs</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Zero-Click Search Trends</h3>
          <p className="text-gray-300 mb-4">
            Research from SparkToro and Semrush shows that 58-60% of Google searches now end without a user 
            clicking any result. This trend is driven by featured snippets, knowledge panels, and AI Overviews.
          </p>

          <div className="bg-white/5 border-l-4 border-primary p-4 my-6">
            <p className="text-gray-300">
              <strong className="text-white">Implication:</strong> Brands must optimize for visibility within SERP features, 
              not just traditional blue links. Content that earns featured snippets and knowledge graph placements 
              generates brand awareness even without clicks.
            </p>
          </div>

          {/*  GEO Rise */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">The Rise of Generative Engine Optimization (GEO)</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">What is GEO?</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Generative Engine Optimization is the practice of optimizing content to appear in AI-generated 
            responses from tools like ChatGPT, Perplexity, Claude, and Gemini. Unlike traditional SEO, which 
            targets search engine algorithms, GEO focuses on how AI models select, process, and cite source material.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Market Size and Growth</h3>
          
          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">$886M</p>
              <p className="text-xs text-gray-400">GEO Market 2026</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">$7.3B</p>
              <p className="text-xs text-gray-400">Projected 2031</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">34%</p>
              <p className="text-xs text-gray-400">Annual Growth (CAGR)</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">Source: Industry analysis, Statista projections</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">AI Search Platform Comparison</h3>

          <div className="bg-white/5 rounded-xl overflow-hidden my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Platform</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Market Share</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Key Features</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">ChatGPT</td>
                  <td className="py-3 px-4">59.7%</td>
                  <td className="py-3 px-4">Conversational search, browsing capability, custom GPTs</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Perplexity</td>
                  <td className="py-3 px-4">Growing</td>
                  <td className="py-3 px-4">Real-time citations, source transparency, 153M monthly visits</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Google Gemini</td>
                  <td className="py-3 px-4">Integrated</td>
                  <td className="py-3 px-4">Native Google integration, multimodal capabilities</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Claude (Anthropic)</td>
                  <td className="py-3 px-4">Niche</td>
                  <td className="py-3 px-4">Long context window, reasoning focus</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/*  AI Impact */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">AI Impact on Search Behavior</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Traffic Growth from AI Platforms</h3>
          <p className="text-gray-300 mb-4">
            Websites receiving traffic from AI search platforms have seen growth rates of up to 7,000% year-over-year. 
            While absolute numbers remain small compared to Google, the growth trajectory signals a fundamental shift.
          </p>

          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">7,000%</p>
              <p className="text-xs text-gray-400">AI Traffic Growth Rate</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">153M</p>
              <p className="text-xs text-gray-400">Perplexity Monthly Visits</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">59.7%</p>
              <p className="text-xs text-gray-400">ChatGPT AI Search Share</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Google AI Overviews Impact</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
            <li>AI Overviews reduce click-through rates for informational queries by 15-30%</li>
            <li>Websites cited in AI Overviews see increased brand visibility but variable traffic impact</li>
            <li>Transactional and navigational queries remain less affected</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Citation Patterns in AI Responses</h3>
          <p className="text-gray-300 mb-4">Princeton University research analyzing AI citation patterns found that authoritative, well-structured content is more likely to be referenced:</p>

          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
            <li>Clear attribution and sourcing</li>
            <li>Structured data and markup</li>
            <li>Domain authority and topical expertise</li>
            <li>Content freshness and accuracy</li>
          </ul>

          {/*  Core Data Insights */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Core Data Insights</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Content Quality and AI Assistance</h3>
          
          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">7.5/10</p>
              <p className="text-xs text-gray-400">AI-Assisted Content Score</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-danger mb-1">3.6/10</p>
              <p className="text-xs text-gray-400">Pure AI Content Score</p>
            </div>
          </div>

          <div className="bg-white/5 border-l-4 border-primary p-4 my-6">
            <p className="text-gray-300">
              <strong className="text-white">Key Insight:</strong> Content created with AI assistance but human oversight scores 
              more than twice as high as fully automated content. Human editing, fact-checking, and strategic input remain essential.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Search Behavior Shifts</h3>

          <div className="bg-white/5 rounded-xl overflow-hidden my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Metric</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Value</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Zero-click searches</td>
                  <td className="py-3 px-4">58-60%</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">SparkToro</span></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Mobile search share</td>
                  <td className="py-3 px-4">63%</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">Statista</span></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Voice search growth</td>
                  <td className="py-3 px-4">+35% YoY</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">HubSpot</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Long-tail query increase</td>
                  <td className="py-3 px-4">+28%</td>
                  <td className="py-3 px-4"><span className="text-xs text-primary">Ahrefs</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/*  Optimization Strategies */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Optimization Strategies for 2025</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">Traditional SEO Tactics</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
            <li><strong className="text-white">Content depth:</strong> Comprehensive content outperforming thin pages in rankings</li>
            <li><strong className="text-white">User intent matching:</strong> Aligning content type with search intent</li>
            <li><strong className="text-white">E-E-A-T signals:</strong> Experience, Expertise, Authoritativeness, and Trustworthiness markers</li>
            <li><strong className="text-white">Technical foundation:</strong> Fast loading, mobile-optimized, crawlable sites</li>
            <li><strong className="text-white">Link building:</strong> Quality over quantity; relevance and authority matter most</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">GEO-Specific Tactics</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
            <li><strong className="text-white">Structured content:</strong> Clear headings, bullet points, and summaries that AI can parse</li>
            <li><strong className="text-white">FAQ optimization:</strong> Question-answer formats that match conversational queries</li>
            <li><strong className="text-white">Source transparency:</strong> Clear citations and references within content</li>
            <li><strong className="text-white">Entity optimization:</strong> Establishing topical authority through comprehensive coverage</li>
            <li><strong className="text-white">Freshness signals:</strong> Regular updates to maintain relevance</li>
          </ul>

          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Integrated Approach</h3>
            <p className="text-gray-300 mb-4">The most effective strategy combines both disciplines:</p>
            
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Create content that satisfies user intent and ranks well in traditional search</li>
              <li>Structure that content so AI systems can easily extract and cite key information</li>
              <li>Build topical authority through comprehensive coverage of subject areas</li>
              <li>Maintain technical excellence for crawlability and user experience</li>
              <li>Monitor performance across both traditional and AI-driven search platforms</li>
            </ol>
          </div>

          {/*  Conclusion */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Conclusion</h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            The search industry is not being replaced by AI; it is being expanded. Traditional SEO remains 
            essential for reaching the 8.5 billion daily Google searches, while GEO addresses the growing 
            segment of AI-assisted discovery.
          </p>

          <p className="text-gray-300 mb-4"><strong className="text-white">Key takeaways for medical practices:</strong></p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
            <li>Continue investing in solid SEO fundamentals: technical excellence, quality content, and authority building</li>
            <li>Add GEO considerations to content strategy: structure, citations, and entity optimization</li>
            <li>Use AI tools to improve efficiency, but maintain human oversight for quality</li>
            <li>Monitor performance across both traditional and AI search platforms</li>
            <li>Prepare for continued change as the technology evolves</li>
          </ul>

          <div className="bg-white/5 border-l-4 border-primary p-4 my-8">
            <p className="text-gray-300">
              <strong className="text-white">Bottom line:</strong> Medical practices that adapt to both SEO and GEO requirements 
              will capture the full spectrum of patient acquisition in 2025 and beyond.
            </p>
          </div>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "Medical SEO Content",
              "author": {"@type": "Organization", "name": "StackMatrices Intelligence"},
              "publisher": {"@type": "Organization", "name": "StackMatrices"}
            })
          }}
        /></article>

        {/*  Sources */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              Statista - Search Market Share Data 2025
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[2]</span>
              HubSpot - State of Marketing Report 2025
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[3]</span>
              Semrush - Zero-Click Search Study
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[4]</span>
              Ahrefs - CTR Benchmarks by Position
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[5]</span>
              Backlinko - Google CTR Statistics
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[6]</span>
              SparkToro - Search Behavior Analysis
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[7]</span>
              Search Engine Land - AI Overviews Impact Study
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[8]</span>
              Neil Patel - AI Content Quality Research
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[9]</span>
              Princeton University - AI Citation Patterns Study
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[10]</span>
              Industry Analysis - GEO Market Projections
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply These Insights?</h2>
          <p className="text-gray-300 mb-6">
            Get your free GEO analysis and discover how these trends impact your medical practice's patient acquisition strategy.
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
