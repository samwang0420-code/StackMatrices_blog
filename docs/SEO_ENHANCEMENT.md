# Next.js SEO 增强方案推荐

## 🌟 方案 1: next-sitemap (最流行)

**GitHub:** https://github.com/iamvishnusankar/next-sitemap
**Stars:** 5,000+ ⭐
**最适合:** 自动生成 sitemap.xml 和 robots.txt

### 安装
```bash
npm install next-sitemap
```

### 配置
创建 `next-sitemap.config.js`:
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yourblog.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://yourblog.com/sitemap-tools.xml',
      'https://yourblog.com/sitemap-blog.xml',
    ],
  },
}
```

### 修改 package.json
```json
{
  "scripts": {
    "build": "next build && next-sitemap",
    "postbuild": "next-sitemap"
  }
}
```

**优点:**
- 自动生成 sitemap.xml
- 自动生成 robots.txt
- 支持动态路由
- 高度可配置

---

## 🌟 方案 2: 使用 Next.js 14 原生 Metadata API (已部分实现)

你的博客已经在使用这个，但可以增强：

### 1. 结构化数据 (JSON-LD)
创建 `src/lib/jsonld.ts`:
```typescript
export function generateArticleJsonLd(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.image_url,
    author: {
      '@type': 'Person',
      name: article.author_name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stackmatrices',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourblog.com/logo.png',
      },
    },
    datePublished: article.date,
    dateModified: article.updated_at,
    url: `https://yourblog.com/blog/${article.slug}`,
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stackmatrices',
    url: 'https://yourblog.com',
    logo: 'https://yourblog.com/logo.png',
    sameAs: [
      'https://twitter.com/stackmatrices',
    ],
  };
}
```

### 2. 在页面中使用
```tsx
// src/app/blog/[slug]/page.tsx
import Script from 'next/script';
import { generateArticleJsonLd } from '@/lib/jsonld';

export default async function BlogPostPage({ params }) {
  const article = await getArticleBySlug(params.slug);
  const jsonLd = generateArticleJsonLd(article);
  
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 页面内容 */}
    </>
  );
}
```

---

## 🌟 方案 3: @next/third-parties (Google Analytics)

**GitHub:** 官方包
**最适合:** Google Analytics, Google Tag Manager

### 安装
```bash
npm install @next/third-parties@latest next@latest
```

### 使用
```tsx
// layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
```

---

## 🌟 方案 4: next-seo (之前考虑过)

**GitHub:** https://github.com/garmeeh/next-seo
**Stars:** 8,000+ ⭐

虽然你的项目已经用原生 Metadata API 了，但 next-seo 提供更简单的默认配置。

不过既然已经用原生 API 了，建议继续用原生的，性能更好。

---

## 🎯 推荐集成方案

### 优先级 1: next-sitemap (必选)
自动生成 sitemap 和 robots.txt，SEO 基础必备。

### 优先级 2: JSON-LD 结构化数据
帮助搜索引擎理解内容，获得富媒体搜索结果。

### 优先级 3: Google Analytics
追踪访问数据，分析 SEO 效果。

---

## 📊 实施计划

1. **立即集成** next-sitemap (5分钟)
2. **今天完成** JSON-LD 结构化数据 (30分钟)
3. **稍后配置** Google Analytics (需要 GA ID)

需要我现在帮你集成哪个？