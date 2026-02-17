// 备用文章数据，用于构建时 Supabase 不可用的情况
export const fallbackArticles = [
  {
    id: '1',
    title: 'Notion vs Evernote: 深度对比评测 (2024)',
    slug: 'notion-vs-evernote-深度对比评测-2024-4a39638a',
    excerpt: 'Notion 和 Evernote 都是优秀的笔记工具，但适合不同的使用场景。本文深度对比两者在功能、价格和用户体验上的差异。',
    content: `# Notion vs Evernote: 深度对比评测

## 快速总结

Notion 是现代化的全能工作空间，Evernote 是传统的笔记工具...

## 核心对比

1. Notion 功能更全面，支持数据库和协作
2. Evernote 剪藏功能更成熟
3. Notion 定价更灵活
4. Evernote 搜索功能更强大

## 详细分析

...`,
    author_name: 'StackMatrices AI',
    author_role: 'Automated Analysis',
    date: '2024-01-20',
    read_time: '12 min read',
    category: 'REVIEWS',
    tags: ['Notion', 'Evernote', 'comparison', 'productivity'],
    image_url: 'https://placehold.co/800x400/3c3cf6/ffffff?text=Notion+vs+Evernote',
    featured: true,
    published: true,
  },
  {
    id: '2',
    title: 'Linear vs Jira: 哪个更适合你的团队？',
    slug: 'linear-vs-jira-团队工具对比',
    excerpt: 'Linear 以简洁快速著称，适合小型敏捷团队；Jira 功能全面可定制，适合大型企业的复杂需求。',
    content: `# Linear vs Jira

## 简介

选择正确的项目管理工具对团队效率至关重要...

## 对比维度

...`,
    author_name: 'StackMatrices AI',
    author_role: 'Automated Analysis',
    date: '2024-01-18',
    read_time: '15 min read',
    category: 'REVIEWS',
    tags: ['Linear', 'Jira', 'project management'],
    image_url: 'https://placehold.co/800x400/10b981/ffffff?text=Linear+vs+Jira',
    featured: false,
    published: true,
  },
  {
    id: '3',
    title: 'SaaS 产品选型指南：如何选择适合团队的项目管理工具',
    slug: 'saas-pm-tools-guide',
    excerpt: '深入对比 Linear、Jira、Asana、Monday 和 ClickUp，从功能、定价、用户体验三个维度帮你做出明智选择。',
    content: `# SaaS 产品选型指南

## 核心对比维度

...`,
    author_name: 'StackMatrices Team',
    author_role: 'Editor',
    date: '2024-02-17',
    read_time: '15 min read',
    category: 'GUIDE',
    tags: ['SaaS', '项目管理', '选型指南'],
    image_url: 'https://placehold.co/800x400/f59e0b/ffffff?text=SaaS+Guide',
    featured: false,
    published: true,
  },
];

// 备用工具数据
export const fallbackTools = [
  {
    id: '1',
    name: 'CopyGenie AI',
    description: 'Advanced AI writing assistant that handles long-form content and SEO optimization effortlessly.',
    category_name: 'AI Writing',
    rating: 4.8,
    reviews_count: 1240,
    logo_url: 'https://placehold.co/64x64/3c3cf6/ffffff?text=CG',
    deal: '20% OFF DEAL',
    has_free_trial: true,
    featured: true,
  },
  {
    id: '2',
    name: 'ClientHub CRM',
    description: 'Manage your sales pipeline with ease. Features automated lead scoring and email tracking.',
    category_name: 'CRM',
    rating: 5.0,
    reviews_count: 850,
    logo_url: 'https://placehold.co/64x64/10b981/ffffff?text=CH',
    deal: 'EXCLUSIVE',
    has_free_trial: true,
    featured: true,
  },
  {
    id: '3',
    name: 'MailPulse',
    description: 'Omnichannel marketing automation platform for scaling e-commerce brands.',
    category_name: 'Marketing',
    rating: 4.6,
    reviews_count: 2100,
    logo_url: 'https://placehold.co/64x64/f59e0b/ffffff?text=MP',
    has_free_trial: false,
    featured: true,
  },
];
