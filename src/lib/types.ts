export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewsCount: number;
  logoUrl: string;
  deal?: string;
  hasFreeTrial: boolean;
  featured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  category: 'GUIDE' | 'REVIEWS' | 'STRATEGY' | 'CASE STUDY';
  imageUrl: string;
  featured?: boolean;
}

export enum Category {
  AI_WRITING = 'AI Writing',
  CRM = 'CRM',
  MARKETING = 'Marketing',
  SEO = 'SEO Tools',
  DESIGN = 'Design',
  VIDEO = 'Video Editing',
  SECURITY = 'Security'
}
