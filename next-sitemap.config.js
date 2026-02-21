/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://stackmatrices.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin', '/api/*', '/_next/*'],
  
  // 动态路由配置
  additionalPaths: async (config) => {
    // 这里可以从 Supabase 获取所有文章和工具的 URL
    const result = [
      { loc: '/blog', changefreq: 'daily', priority: 0.8 },
      { loc: '/directory', changefreq: 'daily', priority: 0.9 },
    ];
    
    return result;
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
    ],
    additionalSitemaps: [],
  },
}
