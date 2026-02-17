/**
 * JSON-LD 结构化数据生成器
 * 帮助搜索引擎理解页面内容，获得富媒体搜索结果
 */

import { SITE_CONFIG } from "./constants";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author_name: string;
  author_role?: string;
  date: string;
  updated_at?: string;
  slug: string;
  image_url?: string;
  category?: string;
  tags?: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  rating?: number;
  reviews_count?: number;
  logo_url?: string;
  website_url?: string;
  category_name?: string;
}

/**
 * 生成博客文章的 JSON-LD
 */
export function generateArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.image_url || `${SITE_CONFIG.url}/og-image.jpg`,
    author: {
      "@type": "Person",
      name: article.author_name,
      jobTitle: article.author_role || "Writer",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    datePublished: article.date,
    dateModified: article.updated_at || article.date,
    url: `${SITE_CONFIG.url}/blog/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${article.slug}`,
    },
    keywords: article.tags?.join(", ") || "SaaS, reviews",
    articleSection: article.category || "Reviews",
  };
}

/**
 * 生成软件应用的 JSON-LD (用于工具页面)
 */
export function generateSoftwareApplicationJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category_name || "BusinessApplication",
    aggregateRating: tool.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          ratingCount: tool.reviews_count || 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    image: tool.logo_url,
    url: tool.website_url,
    operatingSystem: "Web, Windows, macOS, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/**
 * 生成组织的 JSON-LD
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: [
      // 社交媒体链接
      "https://twitter.com/stackmatrices",
    ],
    description: SITE_CONFIG.description,
  };
}

/**
 * 生成网站的 JSON-LD
 */
export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * 生成面包屑导航的 JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * 生成常见问题 FAQ 的 JSON-LD
 */
export function generateFaqJsonLd(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
