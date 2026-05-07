import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  image: string;
  faq?: { question: string; answer: string }[];
  content?: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const contentDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(contentDir, `${slug}.md`);

  const defaults = {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    description: `Article about ${slug.replace(/-/g, ' ')} - GEO strategy guide`,
  };

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      const title = data.title || defaults.title;
      const description = data.description || defaults.description;
      const canonicalUrl = `https://stackmatrices.com/blog/${slug}`;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'article',
          url: canonicalUrl,
          images: data.image ? [{ url: data.image }] : [],
        },
        alternates: {
          canonical: canonicalUrl,
        },
      };
    }
  } catch (e) {
    console.error('Error reading blog post for metadata:', e);
  }

  return {
    title: defaults.title,
    description: defaults.description,
  };
}

export function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/blog');
  
  try {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
    return files.map(file => ({
      slug: file.replace('.md', '')
    }));
  } catch {
    return [];
  }
}

function parseMarkdownContent(content: string): string {
  // Simple markdown to HTML conversion
  let html = content;
  
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Paragraphs - split by double newlines
  html = html.split(/\n\n+/).map(p => {
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol')) return p;
    return `<p>${p}</p>`;
  }).join('\n');
  
  // Lists
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  return html;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const contentDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(contentDir, `${slug}.md`);
  
  let post: BlogPost = {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: `Article about ${slug.replace(/-/g, ' ')} - Local SEO guide`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    tags: ['Local SEO', 'California'],
    author: 'StackMatrices Team',
    image: 'https://placehold.co/1200x630/3b82f6/ffffff?text=SEO'
  };
  
  let contentHtml = '';
  
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      post = {
        ...post,
        title: data.title || post.title,
        description: data.description || post.description,
        date: data.date || post.date,
        tags: data.tags || post.tags,
        author: data.author || post.author,
        faq: data.faq || [],
        image: data.image || post.image
      };
      
      contentHtml = parseMarkdownContent(content);
    }
  } catch (e) {
    console.error('Error reading blog post:', e);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="mb-8">
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#07C160]/20 text-[#07C160] text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-400">{post.description}</p>
        </div>

        {/* Article Content */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8 prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        {/* FAQ Section */}
        {post.faq && post.faq.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faq.map((item, idx) => (
                <div key={idx} className="border-b border-white/10 pb-4">
                  <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500">
          Date: {post.date} | Author: {post.author}
        </p>

        {/* GEO: FAQ Schema for AI Search */}
        {post.faq && post.faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": post.faq.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />
        )}

        {/* GEO: Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Stackmatrices",
              "url": "https://stackmatrices.com",
              "description": "Local SEO and GEO optimization services"
            })
          }}
        />

        {/* GEO: Knowledge Graph Entity Reference */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "StackMatrices Blog",
              "url": "https://stackmatrices.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://stackmatrices.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* GEO: Review Schema for Medical Content - Fixed */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "StackMatrices Blog",
              "url": "https://stackmatrices.com",
              "description": "Local SEO and GEO optimization services",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5"
              }
            })
          }}
        />
      </div>
    </div>
  );
}
