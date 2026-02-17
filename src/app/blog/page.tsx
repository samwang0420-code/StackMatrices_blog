import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { fallbackArticles } from "@/lib/fallback-data";

export const metadata: Metadata = {
  title: "Blog - SaaS Reviews & Guides",
  description: "Deep-dive reviews, strategic guides, and the latest insights on SaaS tools and digital growth strategies.",
  openGraph: {
    title: "Blog - SaaS Reviews & Guides | Stackmatrices",
    description: "Deep-dive reviews, strategic guides, and the latest insights on SaaS tools.",
    url: "/blog",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: "Stackmatrices Blog",
      },
    ],
  },
};

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_role?: string;
  date: string;
  read_time?: string;
  category?: string;
  tags?: string[];
  image_url?: string;
  featured?: boolean;
  updated_at?: string;
}

async function getArticles(): Promise<Article[]> {
  // 优先使用备用数据
  if (fallbackArticles && fallbackArticles.length > 0) {
    return fallbackArticles;
  }
  
  // 备用数据不可用时尝试 Supabase
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });
    
    if (error || !data || data.length === 0) {
      console.log('Using fallback articles data');
      return fallbackArticles;
    }
    
    return (data as Article[]) || [];
  } catch (e) {
    console.log('Supabase error, using fallback:', e);
    return fallbackArticles;
  }
}

export default async function BlogPage() {
  const articles = await getArticles();
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const listArticles = articles.filter(a => a.id !== featuredArticle?.id);

  if (!featuredArticle) {
    return <div className="py-20 text-center">No articles found</div>;
  }

  return (
    <div className="bg-background-light py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Post Hero */}
        <section className="mb-16">
          <div className="relative group overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200 flex flex-col lg:flex-row">
            <Link href={`/blog/${featuredArticle.slug}`} className="lg:w-3/5 overflow-hidden block">
              <img
                src={featuredArticle.image_url || 'https://placehold.co/800x400/3c3cf6/ffffff?text=Featured'}
                alt={featuredArticle.title}
                className="w-full h-full min-h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">Featured Guide</span>
                <span className="text-slate-500 text-xs font-medium">{featuredArticle.date}</span>
              </div>
              <Link href={`/blog/${featuredArticle.slug}`}>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4 text-slate-900 hover:text-primary transition-colors">{featuredArticle.title}</h1>
              </Link>
              <p className="text-slate-500 text-lg mb-8 line-clamp-3">{featuredArticle.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{featuredArticle.author_name}</p>
                    <p className="text-xs text-slate-500">{featuredArticle.author_role}</p>
                  </div>
                </div>
                <Link 
                  href={`/blog/${featuredArticle.slug}`}
                  className="flex items-center gap-2 text-primary font-bold text-sm group/btn"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-200 pb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold whitespace-nowrap">All Insights</button>
            <button className="px-5 py-2 rounded-full bg-white text-slate-500 hover:bg-slate-100 text-sm font-semibold whitespace-nowrap transition-colors">Guides</button>
            <button className="px-5 py-2 rounded-full bg-white text-slate-500 hover:bg-slate-100 text-sm font-semibold whitespace-nowrap transition-colors">Reviews</button>
            <button className="px-5 py-2 rounded-full bg-white text-slate-500 hover:bg-slate-100 text-sm font-semibold whitespace-nowrap transition-colors">Strategy</button>
            <button className="px-5 py-2 rounded-full bg-white text-slate-500 hover:bg-slate-100 text-sm font-semibold whitespace-nowrap transition-colors">Case Studies</button>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Sort by:</span>
            <select className="bg-transparent border-none text-sm font-bold p-0 pr-6 focus:ring-0 cursor-pointer text-slate-900">
              <option>Newest First</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {listArticles.map((article) => (
            <article key={article.id} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image_url || 'https://placehold.co/800x400/3c3cf6/ffffff?text=Article'}
                    alt={article.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider">{article.category}</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.read_time}
                  </span>
                </div>
                <Link href={`/blog/${article.slug}`} className="block">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-slate-900">{article.title}</h3>
                </Link>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-slate-900">{article.author_name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <section className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden mb-20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay ahead of the curve</h2>
            <p className="text-white/80 mb-8 text-lg">Get the latest SaaS strategies and reviews delivered straight to your inbox twice a week. No spam, just value.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                className="flex-1 px-5 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none"
                placeholder="Enter your work email"
                type="email"
                required
              />
              <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-all shadow-xl">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
