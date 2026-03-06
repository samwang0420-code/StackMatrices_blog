import Link from 'next/link';

const blogPosts = [
  {
    slug: 'ai-optimized-content',
    title: 'AI-Optimized Content Strategy',
    excerpt: 'How to create content that AI systems recommend',
    date: '2026-03-01'
  },
  {
    slug: 'predictions-2026',
    title: 'GEO Predictions 2026',
    excerpt: 'The future of search optimization',
    date: '2026-01-15'
  },
  {
    slug: 'schema-markup-guide',
    title: 'Complete Schema Markup Guide',
    excerpt: 'Technical implementation guide',
    date: '2026-01-10'
  },
  {
    slug: 'seo-geo-trends-2025',
    title: 'SEO vs GEO Trends 2025',
    excerpt: 'Understanding the shift from SEO to GEO',
    date: '2025-12-20'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">GEO Insights</h1>
        
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-navy-light rounded-xl hover:bg-navy-dark transition-colors"
            >
              <p className="text-primary text-sm mb-2">{post.date}</p>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-400">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
