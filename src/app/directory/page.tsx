import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { fallbackTools } from "@/lib/fallback-data";
import { Category } from "@/lib/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Directory - Find Top SaaS Tools",
  description: "Explore our curated directory of the best SaaS tools for AI Writing, CRM, Marketing, SEO, Design, and Video Editing. Compare features, pricing, and reviews.",
  openGraph: {
    title: "Directory - Find Top SaaS Tools | Stackmatrices",
    description: "Explore our curated directory of the best SaaS tools. Compare features, pricing, and reviews.",
    url: "/directory",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-directory.jpg`,
        width: 1200,
        height: 630,
        alt: "SaaS Tools Directory",
      },
    ],
  },
};

async function getTools() {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (data && data.length > 0) {
      return data;
    }
  } catch (e) {
    console.log('Supabase error, using fallback tools');
  }
  
  return fallbackTools;
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

export default async function DirectoryPage() {
  const tools = await getTools();
  const categories = await getCategories();

  return (
    <div className="bg-background-light py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Explore Top-Rated SaaS Tools</h1>
          <p className="text-slate-600 text-lg max-w-2xl">Discover the best software solutions for your business with exclusive Stackmatrices deals and verified reviews.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="size-12 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden p-2">
                  <img 
                    src={tool.logo_url || `https://placehold.co/64x64/3c3cf6/ffffff?text=${tool.name.charAt(0)}`} 
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
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
              <div className="flex items-center gap-1 mb-3">
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
                <span className="text-xs font-semibold text-slate-500">({tool.rating})</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 mb-6 flex-grow">{tool.description}</p>
              <button className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/directory?category=${category.slug}`}
                className="bg-white rounded-lg border border-slate-200 p-4 text-center hover:border-primary/50 hover:shadow-md transition-all"
              >
                <span className="font-medium text-slate-700">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
