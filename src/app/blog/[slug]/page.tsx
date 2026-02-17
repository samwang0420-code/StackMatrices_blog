import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { supabase } from "@/lib/supabase";
import { SITE_CONFIG } from "@/lib/constants";
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/jsonld";
import { fallbackArticles } from "@/lib/fallback-data";
import Link from "next/link";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

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
  updated_at?: string;
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  // 首先尝试从 Supabase 获取
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (data) {
      return data as Article;
    }
  } catch (e) {
    console.log('Supabase error, using fallback');
  }
  
  // 如果 Supabase 失败，使用备用数据
  const fallbackArticle = fallbackArticles.find(a => a.slug === slug);
  return fallbackArticle || null;
}

async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  // 尝试从 Supabase 获取
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('slug')
      .eq('published', true);
    
    if (data && data.length > 0) {
      return data.map((article: { slug: string }) => ({ slug: article.slug }));
    }
  } catch (e) {
    console.log('Supabase error, using fallback slugs');
  }
  
  // 返回备用数据的 slug
  return fallbackArticles.map(a => ({ slug: a.slug }));
}

export async function generateStaticParams() {
  // 使用备用数据生成静态页面
  return fallbackArticles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image_url ? [article.image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  // 将换行符转换为 HTML
  const formattedContent = article.content
    .split('\n')
    .map((line: string) => {
      if (line.startsWith('# ')) {
        return `<h1 class="text-4xl font-bold mb-6 mt-8">${line.replace('# ', '')}</h1>`;
      } else if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold mb-4 mt-6">${line.replace('## ', '')}</h2>`;
      } else if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-bold mb-3 mt-4">${line.replace('### ', '')}</h3>`;
      } else if (line.startsWith('- ')) {
        return `<li class="ml-6 mb-2">${line.replace('- ', '')}</li>`;
      } else if (line.match(/^\d+\./)) {
        return `<li class="ml-6 mb-2">${line.replace(/^\d+\.\s*/, '')}</li>`;
      } else if (line.startsWith('---')) {
        return '<hr class="my-8 border-slate-200" />';
      } else if (line.trim() === '') {
        return '<br />';
      } else {
        return `<p class="mb-4 leading-relaxed">${line}</p>`;
      }
    })
    .join('');

  // 生成 JSON-LD 结构化数据
  const articleJsonLd = generateArticleJsonLd(article);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: article.title, url: `${SITE_CONFIG.url}/blog/${article.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
          <img
            src={article.image_url || 'https://placehold.co/1200x400/3c3cf6/ffffff?text=Article'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded">
                {article.category}
              </span>
              <span className="text-white/80 text-sm">{article.date}</span>
              <span className="text-white/60 text-sm">•</span>
              <span className="text-white/80 text-sm">{article.read_time}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Author */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-slate-900">{article.author_name}</p>
              <p className="text-sm text-slate-500">{article.author_role}</p>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-slate-600 mb-8 italic border-l-4 border-primary pl-4">
            {article.excerpt}
          </p>

          {/* Main Content */}
          <div 
            className="prose prose-lg max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
