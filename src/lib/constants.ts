import { Tool, Article, Category } from './types';

export const SITE_CONFIG = {
  name: 'Stackmatrices',
  description: 'GEO Agency for Medical Practices | Recover patients lost to AI. We help plastic surgeons, dentists, and medspas get recommended by ChatGPT, Perplexity, and Google AI. Stop losing $300K+/year to AI-diverted patients.',
  url: 'https://stackmatrices.com',
  twitter: '@stackmatrices',
  image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
  author: 'Stackmatrices Team',
  keywords: ['GEO', 'Generative Engine Optimization', 'AI Search', 'Medical Marketing', 'Plastic Surgery SEO', 'Dental Marketing', 'Medspa Marketing'],
};

// Schema.org Organization Data
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stackmatrices',
  alternateName: 'Stackmatrices GEO Agency',
  url: 'https://stackmatrices.com',
  logo: 'https://stackmatrices.com/logo.svg',
  description: SITE_CONFIG.description,
  sameAs: [
    'https://twitter.com/stackmatrices',
    'https://linkedin.com/company/stackmatrices',
    'https://github.com/samwang0420-code',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@stackmatrices.com',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
  knowsAbout: [
    'GEO Marketing',
    'Generative Engine Optimization',
    'AI Search Optimization',
    'Medical Practice Marketing',
    'Plastic Surgery SEO',
    'Dental Marketing',
    'Medspa Marketing',
  ],
};

// Schema.org WebSite Data
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stackmatrices',
  url: 'https://stackmatrices.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://stackmatrices.com/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/insights', label: 'Insights' },
  { href: '/blog', label: 'Blog' },
  { href: '/cases', label: 'Case Studies' },
  { href: '/faq', label: 'FAQ' },
];

export const MOCK_TOOLS: Tool[] = [];

export const MOCK_ARTICLES: Article[] = [];
