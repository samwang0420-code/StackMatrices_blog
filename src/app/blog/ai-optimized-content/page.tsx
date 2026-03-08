'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";
import { Menu, ChevronRight } from "lucide-react";
import { BLOG_IMAGES } from "@/lib/pexels";

const ARTICLE = {
  title: "How to Write AI-Optimized Content That Gets Cited by ChatGPT",
  category: "Content Strategy",
  author: "Sarah Kim",
  date: "March 3, 2026",
  readTime: "12 min read",
};
const TABLE_OF_CONTENTS = [
  { id: "section1", title: "Section 1" },
  { id: "section2", title: "Section 2" },
  { id: "section3", title: "Section 3" },
];

export default function AIOptimizedContentPage() {
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

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
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

          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={BLOG_IMAGES["6-month-playbook"]}
              alt={ARTICLE.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">The Anatomy of AI-Cited Content</h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            When ChatGPT recommends a medical practice, it's not random. The AI has analyzed thousands of 
            sources and selected the most authoritative, well-structured, and relevant content. Understanding 
            how to create content that AI systems cite is now a critical skill for medical marketers.
          </p>

          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-8">
            <h3 className="text-lg font-semibold text-primary mb-4">What AI Engines Look For</h3>
            <ul className="space-y-2 text-gray-300">
              <li><strong className="text-white">Clear structure:</strong> Headings, subheadings, and bullet points</li>
              <li><strong className="text-white">Direct answers:</strong> Immediate response to specific questions</li>
              <li><strong className="text-white">Credible sources:</strong> Citations, references, and authority signals</li>
              <li><strong className="text-white">Fresh content:</strong> Regularly updated information</li>
              <li><strong className="text-white">Comprehensive coverage:</strong> In-depth exploration of topics</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">The 5-Paragraph Framework</h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Our research of 1,000+ AI-cited medical articles reveals a consistent pattern. The most frequently 
            referenced content follows a specific structure:
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">1. The Direct Answer (Paragraph 1)</h3>
          <p className="text-gray-300 mb-4">
            Start with a clear, concise answer to the primary question. AI systems extract this for featured 
            responses. Example:
          </p>
          <div className="bg-white/5 border-l-4 border-primary p-4 my-6">
            <p className="text-gray-300 italic">
              "The best candidates for dental implants are adults with healthy gums, adequate bone density, 
              and good overall health. Ideal patients are non-smokers committed to oral hygiene."
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">2. The Evidence Base (Paragraph 2)</h3>
          <p className="text-gray-300 mb-4">
            Support your answer with specific data, statistics, or research findings. Include credible sources 
            that AI can verify.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">3. The Nuanced Explanation (Paragraph 3-4)</h3>
          <p className="text-gray-300 mb-4">
            Provide context, exceptions, and detailed explanations. Use subheadings, bullet points, and 
            numbered lists to improve parseability.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">4. The Action Step (Paragraph 5)</h3>
          <p className="text-gray-300 mb-4">
            End with clear next steps. For medical practices, this often means inviting consultation bookings 
            or providing contact information.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Keyword Optimization for AI</h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional keyword stuffing doesn't work with AI. Instead, focus on:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-3">❌ Avoid</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Keyword stuffing</li>
                <li>Unnatural phrasing</li>
                <li>Duplicate content</li>
                <li>Hidden text</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-3">✅ Embrace</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Natural language</li>
                <li>Question-based headings</li>
                <li>Semantic variations</li>
                <li>Conversational tone</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Technical Formatting for AI Parseability</h2>
          
          <p className="text-gray-300 mb-4">Structure matters. AI systems parse content more effectively when you use:</p>

          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
            <li><strong className="text-white">H2 and H3 tags:</strong> Clear hierarchical structure</li>
            <li><strong className="text-white">Bullet and numbered lists:</strong> Easy extraction of key points</li>
            <li><strong className="text-white">Bold text:</strong> Highlights important terms and concepts</li>
            <li><strong className="text-white">Tables:</strong> Comparative data presentation</li>
            <li><strong className="text-white">Schema markup:</strong> Structured data for enhanced understanding</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Real-World Example: Dental Implant Content</h2>
          
          <p className="text-gray-300 mb-4">Here's how we rewrote a client's dental implant page to optimize for AI citation:</p>

          <div className="bg-white/5 rounded-xl p-6 my-6">
            <h4 className="font-semibold text-primary mb-3">Before (Traditional SEO)</h4>
            <p className="text-gray-400 text-sm italic">
              "Our dental implant services are the best in Miami. We use state-of-the-art technology and 
              have years of experience. Contact us today for a consultation."
            </p>
          </div>

          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-6">
            <h4 className="font-semibold text-primary mb-3">After (AI-Optimized)</h4>
            <p className="text-gray-300 text-sm mb-3">
              <strong className="text-white">What are dental implants?</strong> Dental implants are titanium 
              posts surgically placed into the jawbone to replace missing teeth. According to the American 
              Academy of Implant Dentistry, over 3 million Americans have implants, with 500,000 new procedures 
              annually.
            </p>
            <p className="text-gray-300 text-sm mb-3">
              <strong className="text-white">Who is a good candidate?</strong> Ideal candidates have:
            </p>
            <ul className="list-disc list-inside text-gray-300 text-sm ml-4">
              <li>Healthy gums and adequate bone density</li>
              <li>Good overall health (no uncontrolled diabetes)</li>
              <li>Non-smoker or willing to quit during healing</li>
              <li>Commitment to oral hygiene and regular checkups</li>
            </ul>
            <p className="text-gray-300 text-sm mt-3">
              <strong className="text-white">Success rates:</strong> Research published in the Journal of 
              Dental Research shows 95-98% success rates for dental implants when performed by qualified 
              specialists.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Measuring AI Citation Success</h2>
          
          <p className="text-gray-300 mb-4">How do you know if your content is being cited by AI? Track these metrics:</p>

          <div className="bg-white/5 rounded-xl overflow-hidden my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Metric</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">How to Track</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Good Benchmark</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">AI Referral Traffic</td>
                  <td className="py-3 px-4">UTM parameters + analytics</td>
                  <td className="py-3 px-4">5-15% of total traffic</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Brand Mention Queries</td>
                  <td className="py-3 px-4">Google Search Console</td>
                  <td className="py-3 px-4">Growing trend</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Direct Traffic Increase</td>
                  <td className="py-3 px-4">Analytics dashboard</td>
                  <td className="py-3 px-4">10-25% month-over-month</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">The Content Audit Checklist</h2>
          
          <p className="text-gray-300 mb-4">Before publishing, ensure your content meets these AI-optimization criteria:</p>

          <div className="space-y-3 mb-8">
            {[
              "Does the first paragraph directly answer the target question?",
              "Are all claims supported by credible sources?",
              "Is the content structured with clear headings and lists?",
              "Does it include specific data and statistics?",
              "Is the language natural and conversational?",
              "Are there clear next steps for the reader?",
              "Is the content medically accurate and up-to-date?",
              "Have you included relevant schema markup?"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-primary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border-l-4 border-primary p-4 my-8">
            <p className="text-gray-300">
              <strong className="text-white">Bottom line:</strong> AI-optimized content isn't about gaming the system—it's 
              about creating genuinely helpful, well-structured information that serves patient needs. When you 
              focus on clarity, accuracy, and value, AI citations naturally follow.
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

        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              StackMatrices Content Analysis Database (n=1,000+ articles)
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[2]</span>
              American Academy of Implant Dentistry Statistics
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[3]</span>
              Journal of Dental Research - Implant Success Rate Studies
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[4]</span>
              OpenAI GPT-4 Citation Pattern Research
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Create AI-Optimized Content?</h2>
          <p className="text-gray-300 mb-6">
            Get your free content audit and discover how to transform your existing articles into 
            AI-cited authority pieces.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your Free Audit
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
