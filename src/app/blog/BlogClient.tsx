'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string[];
}

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const featuredPost = posts.find(p => p.featured) || posts[0];
  const otherPosts = posts.filter(p => p.id !== featuredPost?.id);

  if (!featuredPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">No Posts Yet</h1>
          <p className="text-gray-400">Check back soon for GEO insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GEO Intelligence</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Latest insights, strategies, and case studies on AI patient acquisition for medical practices.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button className="px-4 py-2 rounded-full text-sm transition-colors bg-primary text-white">
            All
          </button>
          <button className="px-4 py-2 rounded-full text-sm transition-colors bg-white/10 text-gray-300 hover:bg-white/20">
            Research
          </button>
          <button className="px-4 py-2 rounded-full text-sm transition-colors bg-white/10 text-gray-300 hover:bg-white/20">
            Industry Trends
          </button>
          <button className="px-4 py-2 rounded-full text-sm transition-colors bg-white/10 text-gray-300 hover:bg-white/20">
            Content Strategy
          </button>
          <button className="px-4 py-2 rounded-full text-sm transition-colors bg-white/10 text-gray-300 hover:bg-white/20">
            Strategy
          </button>
          <button className="px-4 py-2 rounded-full text-sm transition-colors bg-white/10 text-gray-300 hover:bg-white/20">
            Analysis
          </button>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${featuredPost.id}`} className="block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto relative overflow-hidden">
                <Image
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  src={featuredPost.image}
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                    {featuredPost.category}
                  </span>
                  {featuredPost.featured && (
                    <span className="text-sm text-gray-400">Featured</span>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Other Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  src={post.image}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary">{post.category}</span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to GEO Intelligence</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Get the latest insights on AI patient acquisition delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
