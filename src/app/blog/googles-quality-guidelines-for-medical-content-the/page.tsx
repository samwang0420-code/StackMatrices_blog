'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";

const ARTICLE = {
  title: "Google's Quality Guidelines for Medical Content: The Complete Guide",
  category: "Technical Implementation",
  author: "StackMatrices Intelligence",
  date: "March 08, 2026",
  readTime: "10 min read",
};

export default function BlogPostPage() {
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

        <article className="prose prose-invert max-w-none">

          <h2>What are Google's Quality Evaluator Guidelines</h2>
          <p>
            Content about what are google's quality evaluator guidelines. This section covers the key aspects that medical practices 
            need to understand about this topic and how it impacts their GEO strategy.
          </p>

          <h2>Why YMYL content requires extra care</h2>
          <p>
            Content about why ymyl content requires extra care. This section covers the key aspects that medical practices 
            need to understand about this topic and how it impacts their GEO strategy.
          </p>

          <h2>E-E-A-T for medical practices</h2>
          <p>
            Content about e-e-a-t for medical practices. This section covers the key aspects that medical practices 
            need to understand about this topic and how it impacts their GEO strategy.
          </p>

          <h2>How to demonstrate expertise online</h2>
          <p>
            Content about how to demonstrate expertise online. This section covers the key aspects that medical practices 
            need to understand about this topic and how it impacts their GEO strategy.
          </p>

          <h2>Action checklist for compliance</h2>
          <p>
            Content about action checklist for compliance. This section covers the key aspects that medical practices 
            need to understand about this topic and how it impacts their GEO strategy.
          </p>

        </article>

        {/* Sources */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              Industry research and analysis
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply These Insights?</h2>
          <p className="text-gray-300 mb-6">
            Get your free GEO analysis and discover how these strategies can grow your practice.
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
