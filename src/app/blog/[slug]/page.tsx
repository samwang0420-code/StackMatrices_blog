import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import fs from 'fs';
import path from 'path';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  image: string;
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  // Parse slug to title
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const post: BlogPost = {
    title: title,
    description: `Article about ${title} - Local SEO guide for California businesses`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    tags: ['Local SEO', 'California', slug.includes('plumber') ? 'Plumbing' : 'Roof Repair'],
    author: 'Stackmatrices Team',
    image: 'https://placehold.co/1200x630/3b82f6/ffffff?text=' + encodeURIComponent(title)
  };

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

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <p className="text-gray-300 mb-4">
            This article was generated automatically using our PSEO system.
          </p>
          <p className="text-gray-300 mb-4">
            Full optimization tips and local SEO strategies for {post.title.toLowerCase()} in California.
          </p>
          <p className="text-sm text-gray-500">
            Date: {post.date} | Author: {post.author}
          </p>
        </div>
      </div>
    </div>
  );
}
