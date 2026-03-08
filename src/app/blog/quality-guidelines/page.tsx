'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";
import { Menu, ChevronRight } from "lucide-react";

const ARTICLE = {
  title: "Google's Quality Guidelines for Medical Content: The Complete Guide",
  category: "Technical Implementation",
  author: "StackMatrices Intelligence",
  date: "March 7, 2026",
  readTime: "8 min read",
};
const TABLE_OF_CONTENTS = [
  { id: "section1", title: "Section 1" },
  { id: "section2", title: "Section 2" },
  { id: "section3", title: "Section 3" },
];

export default function QualityGuidelinesPage() {
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
          <h2 id="section1">What Are Google's Quality Evaluator Guidelines?</h2>
          <p>
            Google's Search Quality Evaluator Guidelines are the secret manual that determines how human evaluators 
            assess website quality. While these guidelines don&apos;t directly control rankings, they influence the 
            algorithms that do. For medical practices, understanding these guidelines is essential for AI visibility.
          </p>

          <h2>Why YMYL Content Requires Extra Care</h2>
          <p>
            YMYL (Your Money or Your Life) content—including medical information—faces stricter standards. 
            Google considers this content &quot;potentially impacting the future happiness, health, or financial stability 
            of users.&quot; This means your practice&apos;s content must meet elevated standards.
          </p>

          <h3>Key YMYL Requirements:</h3>
          <ul>
            <li><strong>Expertise:</strong> Content must be written by qualified professionals</li>
            <li><strong>Accuracy:</strong> Facts must be verifiable and sourced</li>
            <li><strong>Trustworthiness:</strong> Site must demonstrate credibility</li>
            <li><strong>Transparency:</strong> Clear author credentials and citations</li>
          </ul>

          <h2>E-E-A-T for Medical Practices</h2>
          <p>
            E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) forms the foundation of Google's 
            quality assessment. For aesthetic medical practices, demonstrating these qualities is critical.
          </p>

          <h3>How to Build E-E-A-T:</h3>
          <ol>
            <li><strong>Experience:</strong> Share first-hand patient experiences, before/after results, and real case studies.</li>
            <li><strong>Expertise:</strong> Highlight physician credentials, board certifications, training.</li>
            <li><strong>Authoritativeness:</strong> Build citations from other medical authorities.</li>
            <li><strong>Trustworthiness:</strong> Maintain consistent business information, display real patient reviews.</li>
          </ol>

          <h2>Action Checklist for Compliance</h2>
          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Technical Requirements:</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✅ Add author bio pages with credentials</li>
              <li>✅ Implement Schema markup for medical professionals</li>
              <li>✅ Link to authoritative medical sources</li>
              <li>✅ Display licensing and certification information</li>
            </ul>
          </div>

          <h2>Conclusion</h2>
          <p>
            Understanding and implementing Google's Quality Guidelines is about providing genuine value to potential patients. 
            Practices that prioritize quality content and demonstrate real expertise will thrive in AI-powered search.
          </p>
        
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

        {/* Sources */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              Google Search Quality Evaluator Guidelines
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[2]</span>
              Google's YMYL Classification
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Medical Content?</h2>
          <p className="text-gray-300 mb-6">
            Get your free GEO analysis and discover how to align your practice content with Google's quality standards.
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
