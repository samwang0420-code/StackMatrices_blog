'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";
import { BLOG_IMAGES } from "@/lib/pexels";

const BLOG_POSTS = [
  {
    id: "google-ai-overviews-2026",
    title: "How to Optimize for Google AI Overviews in 2026",
    excerpt: "The rules have changed. We analyzed 247 AI Overview citations and found 3 factors that determine 78% of what gets cited.",
    category: "SEO Strategy",
    author: "StackMatrices Intelligence",
    date: "March 9, 2026",
    readTime: "7 min read",
    featured: true,
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "google-ai-mode-12-percent",
    title: "The 12% Reality Check: What Google's AI Mode Really Means for Medical Practices",
    excerpt: "Moz's Tom Capper analyzed 40,000 keywords. The result: only 12% overlap between AI Mode and traditional rankings.",
    category: "Industry Data",
    author: "StackMatrices Intelligence",
    date: "March 8, 2026",
    readTime: "10 min read",
    featured: true,
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "entity-seo-medical-practices",
    title: "Entity SEO for Medical Practices: The Foundation Nobody Talks About",
    excerpt: "Everyone talks keywords. Nobody talks entities. Here's why entity optimization is the difference between invisible and obvious.",
    category: "Technical Implementation",
    author: "StackMatrices Intelligence",
    date: "March 8, 2026",
    readTime: "14 min read",
    featured: false,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "ai-evaluates-medical-content",
    title: "How AI Actually Evaluates Medical Content: What No One Tells You",
    excerpt: "Most practices optimize for dead search engines. Here's how AI really evaluates medical content—and what actually gets cited.",
    category: "AI Search Trends",
    author: "StackMatrices Intelligence",
    date: "March 8, 2026",
    readTime: "12 min read",
    featured: false,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "quality-guidelines",
    title: "Google's Quality Guidelines for Medical Content: The Complete Guide",
    excerpt: "Learn how Google's official quality standards can transform your practice's online visibility in AI search results.",
    category: "Technical Implementation",
    author: "StackMatrices Intelligence",
    date: "March 7, 2026",
    readTime: "8 min read",
    featured: false,
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "seo-geo-trends-2025",
    title: "SEO and GEO Trends 2025: Data-Driven Analysis for Medical Practices",
    excerpt: "Comprehensive analysis of search engine and generative engine optimization trends for medical practices.",
    category: "Research",
    author: "StackMatrices Intelligence",
    date: "March 2, 2026",
    readTime: "15 min read",
    featured: false,
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "schema-markup-guide",
    title: "The Complete Guide to Medical Schema Markup for AI Visibility",
    excerpt: "Step-by-step implementation guide for MedicalOrganization, Physician, and Procedure schema.",
    category: "Implementation",
    author: "Michael Torres",
    date: "March 5, 2026",
    readTime: "18 min read",
    featured: false,
    image: "https://images.pexels.com/photos/8435692/pexels-photo-8435692.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "predictions-2026",
    title: "2026 Medical Marketing Predictions: The Year of AI-First Patient Acquisition",
    excerpt: "Five key predictions that will reshape medical marketing in 2026.",
    category: "Industry Trends",
    author: "Sam Wang",
    date: "March 4, 2026",
    readTime: "10 min read",
    featured: false,
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "ai-optimized-content",
    title: "How to Write AI-Optimized Content That Gets Cited by ChatGPT",
    excerpt: "The 5-paragraph framework for creating content that AI systems cite.",
    category: "Content Strategy",
    author: "Sarah Kim",
    date: "March 3, 2026",
    readTime: "12 min read",
    featured: false,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const CATEGORIES = [
  "All",
  "Research",
  "Industry Trends",
  "Content Strategy",
  "Strategy",
  "Analysis",
  "Tactics",
  "Implementation",
  "Case Study",
];

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured);
  const posts = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Blog</p>          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GEO Intelligence</h1>          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Latest insights, strategies, and case studies on AI patient acquisition 
            for medical practices.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                idx === 0
                  ? "bg-primary text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>          ))}
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="mb-12">
            <Link
              href={`/blog/${featured.id}`}
              className="block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto relative overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>                
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                      {featured.category}
                    </span>                    
                    <span className="text-sm text-gray-400">Featured</span>                  </div>                  
                  <h2 className="text-2xl font-bold mb-3">{featured.title}</h2>                  
                  <p className="text-gray-300 mb-6">{featured.excerpt}</p>                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />                      {featured.author}
                    </div>                    
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />                      {featured.date}
                    </div>                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />                      {featured.readTime}
                    </div>                  </div>                </div>              </div>            </Link>          </div>        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-primary" />                  
                  <span className="text-xs text-primary">{post.category}</span>                </div>                
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>                
                <p className="text-sm text-gray-400 mb-4">{post.excerpt.slice(0, 100)}...</p>                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author}</span>                  <span>{post.readTime}</span>                </div>              </div>            </Link>          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to GEO Intelligence</h2>          
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Get the latest insights on AI patient acquisition delivered to your inbox. 
            No spam, unsubscribe anytime.
          </p>          
          <form 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const email = new FormData(e.currentTarget).get('email');
              window.location.href = `mailto:sam.wang01@icloud.com?subject=Blog Newsletter Subscription&body=Please subscribe me to the GEO Intelligence newsletter. Email: ${email}`;
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
            />            
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />            </button>          </form>        </div>      </div>    </div>
  );
}
