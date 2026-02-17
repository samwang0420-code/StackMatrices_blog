import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find the Best SaaS Tools",
  description: SITE_CONFIG.description,
  openGraph: {
    title: `Find the Best SaaS Tools | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    url: "/",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
};

async function getFeaturedTools() {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('featured', true)
    .eq('is_active', true)
    .order('rating', { ascending: false })
    .limit(4);
  
  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
  
  return data || [];
}

async function getFeaturedArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })
    .limit(3);
  
  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  
  return data || [];
}

export default async function Home() {
  const featuredTools = await getFeaturedTools();
  const featuredArticles = await getFeaturedArticles();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 blur-3xl bg-gradient-to-l from-primary to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New Tools Added Daily
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6 max-w-4xl">
            Find the Best <span className="text-primary">SaaS Tools</span> to Grow Your Business
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Honest reviews, comparisons, and exclusive deals for marketers, creators, and entrepreneurs. Level up your stack today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/directory"
              className="px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-hover hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              Browse Top Tools
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
            >
              View Comparisons
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Recommended Tools</h2>
            <p className="text-slate-500">Hand-picked software solutions curated for maximum ROI.</p>
          </div>
          <Link href="/directory" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All Directory
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool) => (
            <div key={tool.id} className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-xl mb-6 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <img 
                  src={tool.logo_url || `https://placehold.co/64x64/3c3cf6/ffffff?text=${tool.name.charAt(0)}`} 
                  alt={tool.name} 
                  className="w-8 h-8 object-contain rounded" 
                />
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400' : 'text-slate-200'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-1">{tool.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{tool.category_name}</p>
              {tool.deal && (
                <div className="bg-primary/5 border border-primary/20 rounded px-3 py-2 mb-6">
                  <p className="text-xs font-bold text-primary uppercase mb-1">Exclusive Deal</p>
                  <p className="text-sm font-medium">{tool.deal}</p>
                </div>
              )}
              {!tool.deal && <div className="h-[60px] mb-6" />}
              <button className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-lg bg-primary/5 text-primary font-bold hover:bg-primary hover:text-white transition-all">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Reviews & Guides */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">Latest Reviews & Guides</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Deep-dives into the latest software releases and strategic guides to help you scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article key={article.id} className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={article.image_url || 'https://placehold.co/800x400/3c3cf6/ffffff?text=Article'} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-2 py-1 rounded tracking-wider uppercase">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 font-medium uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.read_time}
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link href={`/blog/${article.slug}`} className="mt-auto font-bold text-sm text-primary flex items-center gap-1 group/btn">
                    Read Full Review
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
