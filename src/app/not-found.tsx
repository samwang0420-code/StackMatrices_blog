import Link from 'next/link';
import { Home, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  // Popular blog posts for 404 page SEO
  const popularPosts = [
    { title: 'Botox in Los Angeles', slug: 'best-botox-in-los-angeles-top-rated-2026' },
    { title: 'Dental Implants Sacramento', slug: 'best-dental-implants-in-sacramento-top-rated-2026' },
    { title: 'CoolSculpting San Diego', slug: 'coolsculpting-in-san-diego-complete-guide-2026' },
    { title: 'Invisalign vs Braces', slug: 'invisalign-vs-traditional-braces' },
    { title: 'Emergency Plumber Guide', slug: 'how-to-choose-the-best-emergency-plumber-in-2026' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* SEO: Hidden but accessible to crawlers */}
        <div className="hidden">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist. Browse our popular medical aesthetic and dental content below.</p>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Oops! The page you're looking for seems to have wandered off. 
            Let us help you find what you need.
          </p>
        </div>

        {/* Search Box - SEO friendly */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-primary" />
            <span className="font-semibold">Search Our Guides</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Find expert guides on Botox, Dental Implants, CoolSculpting, and more
          </p>
          <form action="/blog" method="GET" className="flex gap-2">
            <input
              type="text"
              name="q"
              placeholder="Search treatments..."
              className="flex-1 bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Popular Articles - Internal linking for SEO */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6">Popular Guides</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {popularPosts.map((post, idx) => (
              <Link
                key={idx}
                href={`/blog/${post.slug}`}
                className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {post.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">Need Help Finding Something?</h3>
          <p className="text-gray-400 mb-6">
            Browse our complete collection of medical aesthetic and dental guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-primary hover:bg-primary-hover px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              All Blog Posts
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* SEO: Structured Data for 404 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "404 - Page Not Found",
              "description": "Page not found on StackMatrices - Browse our medical aesthetic and dental guides",
              "url": "https://stackmatrices.com/404"
            })
          }}
        />
      </div>
    </div>
  );
}
