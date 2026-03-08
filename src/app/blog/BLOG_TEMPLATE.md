// Blog Post Template
// Copy this structure for new blog posts

'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ExternalLink, Menu, ChevronRight } from "lucide-react";

const ARTICLE = {
  title: "YOUR TITLE HERE",
  category: "YOUR CATEGORY",
  author: "StackMatrices Intelligence",
  date: "March 8, 2026",
  readTime: "10 min read",
};

// Update this Table of Contents for each post
const TABLE_OF_CONTENTS = [
  { id: "intro", title: "Introduction" },
  { id: "section1", title: "Section 1 Title" },
  { id: "section2", title: "Section 2 Title" },
  { id: "action", title: "What to Do Now" },
  { id: "conclusion", title: "Conclusion" },
];

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-navy/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">StackMatrices</span>
          </Link>
          <Link 
            href="/analysis-request" 
            className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Get Free Audit
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar TOC - optional, remove if not needed */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
                <Menu size={16} />
                Table of Contents
              </div>
              <nav className="space-y-2">
                {TABLE_OF_CONTENTS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-400 hover:text-white py-1 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-9">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                  {ARTICLE.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {ARTICLE.title}
              </h1>

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
            </header>

            {/* Table of Contents - Inline version */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
                <Menu size={16} />
                Table of Contents
              </div>
              <nav className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TABLE_OF_CONTENTS.map((item) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`} 
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ChevronRight size={12} />
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Article Body */}
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Your intro paragraph here. Make it engaging and to the point.
              </p>

              <h2 id="intro">Introduction</h2>
              <p>Your content here...</p>

              <h2 id="section1">Section 1 Title</h2>
              <p>Your content here...</p>

              <h2 id="section2">Section 2 Title</h2>
              <p>Your content here...</p>

              {/* Use this for numbered lists */}
              <h2 id="action">What to Do Now</h2>
              <div className="space-y-6 my-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary text-navy w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                    <h3 className="text-xl font-semibold">Action Title</h3>
                  </div>
                  <p className="text-gray-300">Description...</p>
                </div>
              </div>

              <h2 id="conclusion">Conclusion</h2>
              <p>Your conclusion here...</p>
            </div>

            {/* Sources */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-primary" />
                Data Sources
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-primary">[1]</span>
                  Source name
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-6">
                Your CTA text here.
              </p>
              <Link
                href="/analysis-request"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Take Action
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
