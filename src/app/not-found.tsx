import Link from 'next/link';
import { Home, Search, ArrowRight, Shield, CheckCircle, Clock, Users, Stethoscope, Sparkles, Heart } from 'lucide-react';

export default function NotFound() {
  // Popular blog posts - real articles from the blog
  const popularPosts = [
    { title: 'Botox in Los Angeles', slug: 'botox-in-los-angeles-complete-guide-2026', category: 'Medical Aesthetics' },
    { title: 'Dental Implants Sacramento', slug: 'dental_implants-in-sacramento-complete-guide-2026', category: 'Dentistry' },
    { title: 'CoolSculpting San Diego', slug: 'coolsculpting-in-san-diego-complete-guide-2026', category: 'Medical Aesthetics' },
    { title: 'Invisalign vs Braces', slug: 'invisalign-vs-traditional-braces', category: 'Dentistry' },
    { title: 'Emergency Plumber Guide', slug: 'emergency-plumber-guide-2026', category: 'Home Services' },
    { title: 'Botox vs Dermal Fillers', slug: 'botox-vs-dermal-fillers', category: 'Medical Aesthetics' },
    { title: 'PRP Therapy SF', slug: 'prp_therapy-in-san-francisco-complete-guide-2026', category: 'Medical Aesthetics' },
    { title: 'Dental Implants Cost Guide', slug: 'dental-implants-cost-2026', category: 'Dentistry' },
  ];

  const services = [
    { name: 'GEO Analysis', desc: 'AI Visibility Audit', href: '/audit' },
    { name: 'Case Studies', desc: 'Success Stories', href: '/cases' },
    { name: 'Our Services', desc: 'What We Do', href: '/services' },
    { name: 'Contact', desc: 'Get in Touch', href: '/contact' },
  ];

  const categories = [
    { name: 'Botox & Dermal Fillers', slug: 'botox', icon: Sparkles },
    { title: 'Dental Implants', slug: 'dental-implants', icon: Stethoscope },
    { name: 'Invisalign & Braces', slug: 'invisalign', icon: CheckCircle },
    { name: 'CoolSculpting', slug: 'coolsculpting', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* SEO: Hidden but accessible to crawlers */}
        <div className="hidden">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist. Browse our popular medical aesthetic and dental content below.</p>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/20 rounded-full mb-6">
            <Search className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-lg">
            Oops! The page you're looking for seems to have wandered off. 
            Let us help you find what you need.
          </p>
        </div>

        {/* Quick Links - Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {services.map((service, idx) => (
            <Link
              key={idx}
              href={service.href}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all group text-center"
            >
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-gray-400">{service.desc}</p>
            </Link>
          ))}
        </div>

        {/* Search Box - SEO friendly */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg">Search Our Guides</span>
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
              Search
            </button>
          </form>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/blog?category=${cat.slug}`}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/50 transition-all group flex items-center gap-3"
              >
                <cat.icon className="w-6 h-6 text-primary" />
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Articles - Real links */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6">Popular Guides</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {popularPosts.map((post, idx) => (
              <Link
                key={idx}
                href={`/blog/${post.slug}`}
                className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-primary uppercase tracking-wide">{post.category}</span>
                    <h4 className="font-medium group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* More Articles Link */}
        <div className="text-center mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
          >
            <span>View All Blog Posts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Need Help Finding Something?</h3>
          </div>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Our team can help you find the right information or answer your questions about AI visibility for medical practices.
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
              className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-gray-400">AI Recommendations Analyzed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">12+</div>
            <div className="text-sm text-gray-400">Markets Tracked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-gray-400">Monitoring Active</div>
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