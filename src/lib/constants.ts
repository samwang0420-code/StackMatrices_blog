import { Tool, Article, Category } from './types';

export const SITE_CONFIG = {
  name: 'Stackmatrices',
  description: 'Find the Best SaaS Tools to Grow Your Business. Honest reviews, comparisons, and exclusive deals for marketers, creators, and entrepreneurs.',
  url: 'https://stackmatrices.com',
  twitter: '@stackmatrices',
  image: 'https://stackmatrices.com/og-image.jpg',
};

export const MOCK_TOOLS: Tool[] = [
  {
    id: '1',
    name: 'CopyGenie AI',
    description: 'Advanced AI writing assistant that handles long-form content and SEO optimization effortlessly.',
    category: Category.AI_WRITING,
    rating: 4.8,
    reviewsCount: 1240,
    logoUrl: 'https://placehold.co/64x64/3c3cf6/ffffff?text=CG',
    deal: '20% OFF DEAL',
    hasFreeTrial: true,
    featured: true
  },
  {
    id: '2',
    name: 'ClientHub CRM',
    description: 'Manage your sales pipeline with ease. Features automated lead scoring and email tracking.',
    category: Category.CRM,
    rating: 5.0,
    reviewsCount: 850,
    logoUrl: 'https://placehold.co/64x64/10b981/ffffff?text=CH',
    deal: 'EXCLUSIVE',
    hasFreeTrial: true,
    featured: true
  },
  {
    id: '3',
    name: 'MailPulse',
    description: 'Omnichannel marketing automation platform for scaling e-commerce brands.',
    category: Category.MARKETING,
    rating: 4.6,
    reviewsCount: 2100,
    logoUrl: 'https://placehold.co/64x64/f59e0b/ffffff?text=MP',
    hasFreeTrial: false,
    featured: true
  },
  {
    id: '4',
    name: 'SearchRank Pro',
    description: 'Professional SEO tools including keyword research, site audits, and competitor analysis.',
    category: Category.SEO,
    rating: 4.7,
    reviewsCount: 1540,
    logoUrl: 'https://placehold.co/64x64/8b5cf6/ffffff?text=SR',
    hasFreeTrial: true,
    featured: true
  },
  {
    id: '5',
    name: 'CanvasCore',
    description: 'Collaborative design platform for teams to build marketing assets in minutes.',
    category: Category.DESIGN,
    rating: 4.9,
    reviewsCount: 3200,
    logoUrl: 'https://placehold.co/64x64/ec4899/ffffff?text=CC',
    deal: 'LIFETIME DEAL',
    hasFreeTrial: false,
    featured: true
  },
  {
    id: '6',
    name: 'ClipStudio',
    description: 'Cloud-based video editing for fast social media content production.',
    category: Category.VIDEO,
    rating: 4.5,
    reviewsCount: 920,
    logoUrl: 'https://placehold.co/64x64/06b6d4/ffffff?text=CS',
    hasFreeTrial: true,
    featured: true
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'The Ultimate Guide to Scaling SaaS Infrastructure in 2024',
    excerpt: 'An in-depth look at how top-tier dev teams manage technical debt and scale their systems for global demand without breaking their budget.',
    author: { name: 'Alex Chen', role: 'CTO, Stackmatrices' },
    date: 'Jan 24, 2024',
    readTime: '15 min read',
    category: 'GUIDE',
    imageUrl: 'https://placehold.co/800x400/3c3cf6/ffffff?text=SaaS+Infrastructure',
    featured: true
  },
  {
    id: 'a2',
    title: 'Top 10 CRM Reviews for 2024',
    excerpt: 'A comprehensive comparison of the leading CRM platforms designed for fast-growing B2B SaaS teams.',
    author: { name: 'Sarah Jenkins', role: 'Editor' },
    date: 'Jan 22, 2024',
    readTime: '12 min read',
    category: 'REVIEWS',
    imageUrl: 'https://placehold.co/800x400/10b981/ffffff?text=CRM+Reviews'
  },
  {
    id: 'a3',
    title: 'Mastering Product-Led Growth',
    excerpt: 'Learn how to drive sustainable growth through your product experience rather than heavy sales cycles.',
    author: { name: 'David Miller', role: 'Growth Lead' },
    date: 'Jan 20, 2024',
    readTime: '10 min read',
    category: 'STRATEGY',
    imageUrl: 'https://placehold.co/800x400/f59e0b/ffffff?text=Product+Growth'
  },
  {
    id: 'a4',
    title: 'Security Audits for Startups',
    excerpt: 'Essential security steps every early-stage startup must take to protect customer data and trust.',
    author: { name: 'Elena Rodriguez', role: 'Security Analyst' },
    date: 'Jan 18, 2024',
    readTime: '15 min read',
    category: 'GUIDE',
    imageUrl: 'https://placehold.co/800x400/ef4444/ffffff?text=Security'
  }
];
