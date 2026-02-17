'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  category_name: string;
  rating: number;
  reviews_count: number;
  logo_url: string;
  website_url: string;
  deal?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface DirectoryClientProps {
  tools: Tool[];
  categories: Category[];
}

export default function DirectoryClient({ tools, categories }: DirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.slug || 'all');

  // 按分类筛选并按评分排序
  const filteredTools = useMemo(() => {
    let filtered = tools;
    
    // 筛选分类
    if (selectedCategory !== 'all') {
      filtered = tools.filter(tool => 
        tool.category_name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    // 按评分降序排序
    return filtered.sort((a, b) => b.rating - a.rating);
  }, [tools, selectedCategory]);

  // 获取每个分类的工具数量
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    categories.forEach(cat => {
      counts[cat.slug] = tools.filter(tool => 
        tool.category_name.toLowerCase().includes(cat.slug.toLowerCase())
      ).length;
    });
    return counts;
  }, [tools, categories]);

  return (
    <div className="bg-background-light py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            Explore Top-Rated SaaS Tools
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Discover the best software solutions for your business with exclusive Stackmatrices deals and verified reviews.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-4">
              <h2 className="font-bold text-slate-900 mb-4 px-2">Categories</h2>
              <nav className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Tools</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === 'all' ? 'bg-white/20' : 'bg-slate-100'
                  }`}>
                    {categoryCounts.all}
                  </span>
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
                      selectedCategory === category.slug
                        ? 'bg-primary text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.slug ? 'bg-white/20' : 'bg-slate-100'
                    }`}>
                      {categoryCounts[category.slug] || 0}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content - Tools Grid */}
          <main className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filteredTools.length}</span> tools
                {selectedCategory !== 'all' && (
                  <span> in <span className="font-semibold text-primary">{categories.find(c => c.slug === selectedCategory)?.name}</span></span>
                )}
              </p>
              <p className="text-sm text-slate-500">Sorted by rating: high to low</p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-12 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden p-2">
                      <img
                        src={tool.logo_url}
                        alt={tool.name}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    {tool.deal && (
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        {tool.deal}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${i < Math.floor(tool.rating) ? 'fill-current' : 'text-slate-200'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {tool.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({tool.reviews_count} reviews)
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">
                    {tool.description}
                  </p>
                  
                  <span className="inline-block text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full mb-4 self-start">
                    {tool.category_name}
                  </span>
                  
                  <Link
                    href={tool.website_url || '#'}
                    target="_blank"
                    className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTools.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500 text-lg">No tools found in this category.</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  View all tools
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
