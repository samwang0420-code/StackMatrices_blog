/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

module.exports = {
  siteUrl: 'https://stackmatrices.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin', '/api/*', '/_next/*'],
  
  // Generate URLs from blog content
  additionalPaths: async (config) => {
    const results = [];
    
    // Add blog listing
    results.push({ loc: '/blog', changefreq: 'daily', priority: 0.9 });
    results.push({ loc: '/faq', changefreq: 'weekly', priority: 0.8 });
    results.push({ loc: '/compliance', changefreq: 'weekly', priority: 0.8 });
    
    // Read blog content directory
    const blogDir = path.join(process.cwd(), 'content/blog');
    try {
      if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
        for (const file of files) {
          const slug = file.replace('.md', '');
          results.push({ 
            loc: `/blog/${slug}`, 
            changefreq: 'weekly', 
            priority: 0.7 
          });
        }
      }
    } catch (e) {
      console.log('Error reading blog directory:', e);
    }
    
    return results;
  },
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/_next'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://stackmatrices.com/sitemap.xml',
    ],
  },
}
