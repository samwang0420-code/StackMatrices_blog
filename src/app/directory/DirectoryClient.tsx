'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  topics: string[];
  rating: number;
  reviews_count: number;
  logo_url: string;
  website_url: string;
  votes_count: number;
  deal?: string;
}

interface DirectoryClientProps {
  tools: Tool[];
}

export default function DirectoryClient({ tools }: DirectoryClientProps) {
  // 从所有工具的 topics 中提取分类（更精细）
  const categories = useMemo(() => {
    const topicSet = new Set<string>();
    tools.forEach(tool => {
      if (tool.topics && Array.isArray(tool.topics)) {
        tool.topics.forEach(topic => topicSet.add(topic));
      }
    });
    
    // 按工具数量排序
    const sortedTopics = Array.from(topicSet).sort((a, b) => {
      const countA = tools.filter(t => t.topics?.includes(a)).length;
      const countB = tools.filter(t => t.topics?.includes(b)).length;
      return countB - countA;
    });
    
    return ['All', ...sortedTopics];
  }, [tools]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // 按 topic 筛选并按投票数排序
  const filteredTools = useMemo(() => {
    let filtered = tools;
    
    // 筛选包含选中 topic 的工具
    if (selectedCategory !== 'All') {
      filtered = tools.filter(tool => 
        tool.topics?.includes(selectedCategory)
      );
    }
    
    // 按投票数降序排序
    return filtered.sort((a, b) => b.votes_count - a.votes_count);
  }, [tools, selectedCategory]);

  // 获取每个分类的工具数量
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: tools.length };
    categories.forEach(cat => {
      if (cat !== 'All') {
        counts[cat] = tools.filter(tool => tool.topics?.includes(cat)).length;
      }
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
              <h2 className="font-bold text-slate-900 mb-4 px-2">
                Categories ({categories.length - 1})
              </h2>
              <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                      selectedCategory === category ? 'bg-white/20' : 'bg-slate-100'
                    }`}>
                      {categoryCounts[category] || 0}
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
                {selectedCategory !== 'All' && (
                  <span> in <span className="font-semibold text-primary">{selectedCategory}</span></span>
                )}
              </p>
              <p className="text-sm text-slate-500">Sorted by votes: high to low</p>
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
                    <span className="text-xs text-slate-400">
                      {tool.votes_count} votes
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">
                    {tool.description}
                  </p>
                  
                  {/* Topics */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.topics?.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className={`text-xs px-2 py-1 rounded-full ${
                          topic === selectedCategory
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                    {tool.topics?.length > 3 && (
                      <span className="text-xs text-slate-400 px-1">
                        +{tool.topics.length - 3}
                      </span>
                    )}
                  </div>
                  
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
                  onClick={() => setSelectedCategory('All')}
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
