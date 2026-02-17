-- Stackmatrices 博客数据库结构
-- 在 Supabase SQL Editor 中执行

-- ============================================
-- 1. 工具分类表 (categories)
-- ============================================
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入默认分类
INSERT INTO categories (name, slug, icon, description, sort_order) VALUES
('AI Writing', 'ai-writing', 'edit_note', 'AI-powered writing and content generation tools', 1),
('CRM', 'crm', 'group', 'Customer relationship management software', 2),
('Marketing', 'marketing', 'rss_feed', 'Marketing automation and email tools', 3),
('SEO Tools', 'seo', 'search', 'Search engine optimization tools', 4),
('Design', 'design', 'palette', 'Graphic design and creative tools', 5),
('Video Editing', 'video', 'videocam', 'Video production and editing software', 6),
('Security', 'security', 'security', 'Cybersecurity and privacy tools', 7);

-- ============================================
-- 2. SaaS 工具表 (tools)
-- ============================================
CREATE TABLE tools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    category_name VARCHAR(100), -- 冗余存储，方便查询
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    reviews_count INTEGER DEFAULT 0,
    logo_url TEXT,
    website_url TEXT,
    deal VARCHAR(200),
    has_free_trial BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    pricing_start DECIMAL(10,2), -- 起始价格
    pricing_unit VARCHAR(20), -- 如 'month', 'year', 'user/month'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_featured ON tools(featured) WHERE featured = true;
CREATE INDEX idx_tools_rating ON tools(rating DESC);
CREATE INDEX idx_tools_active ON tools(is_active) WHERE is_active = true;

-- ============================================
-- 3. 博客文章表 (articles)
-- ============================================
CREATE TABLE articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL, -- Markdown 或 HTML 内容
    author_name VARCHAR(100) NOT NULL,
    author_role VARCHAR(100),
    author_avatar TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time VARCHAR(20), -- 如 '15 min read'
    category VARCHAR(50) CHECK (category IN ('GUIDE', 'REVIEWS', 'STRATEGY', 'CASE STUDY', 'NEWS')),
    tags TEXT[], -- PostgreSQL 数组类型
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    meta_title VARCHAR(300),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_featured ON articles(featured) WHERE featured = true;
CREATE INDEX idx_articles_published ON articles(published, date DESC) WHERE published = true;
CREATE INDEX idx_articles_date ON articles(date DESC);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);

-- 全文搜索索引 (可选，用于搜索功能)
CREATE INDEX idx_articles_search ON articles USING gin(to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content, '')));

-- ============================================
-- 4. 插入示例数据 - 工具
-- ============================================
INSERT INTO tools (name, description, category_name, rating, reviews_count, logo_url, deal, has_free_trial, featured) VALUES
('CopyGenie AI', 'Advanced AI writing assistant that handles long-form content and SEO optimization effortlessly.', 'AI Writing', 4.8, 1240, 'https://placehold.co/64x64/3c3cf6/ffffff?text=CG', '20% OFF DEAL', true, true),
('ClientHub CRM', 'Manage your sales pipeline with ease. Features automated lead scoring and email tracking.', 'CRM', 5.0, 850, 'https://placehold.co/64x64/10b981/ffffff?text=CH', 'EXCLUSIVE', true, true),
('MailPulse', 'Omnichannel marketing automation platform for scaling e-commerce brands.', 'Marketing', 4.6, 2100, 'https://placehold.co/64x64/f59e0b/ffffff?text=MP', null, false, true),
('SearchRank Pro', 'Professional SEO tools including keyword research, site audits, and competitor analysis.', 'SEO Tools', 4.7, 1540, 'https://placehold.co/64x64/8b5cf6/ffffff?text=SR', null, true, true),
('CanvasCore', 'Collaborative design platform for teams to build marketing assets in minutes.', 'Design', 4.9, 3200, 'https://placehold.co/64x64/ec4899/ffffff?text=CC', 'LIFETIME DEAL', false, true),
('ClipStudio', 'Cloud-based video editing for fast social media content production.', 'Video Editing', 4.5, 920, 'https://placehold.co/64x64/06b6d4/ffffff?text=CS', null, true, true);

-- ============================================
-- 5. 插入示例数据 - 文章
-- ============================================
INSERT INTO articles (title, slug, excerpt, content, author_name, author_role, date, read_time, category, image_url, featured, published) VALUES
('The Ultimate Guide to Scaling SaaS Infrastructure in 2024', 
 'scaling-saas-infrastructure-2024',
 'An in-depth look at how top-tier dev teams manage technical debt and scale their systems for global demand without breaking their budget.',
 '# The Ultimate Guide to Scaling SaaS Infrastructure in 2024

## Introduction

Scaling a SaaS application is one of the most challenging aspects of building a successful software business...

## Key Strategies

1. **Horizontal Scaling**
2. **Database Optimization**
3. **Caching Strategies**
4. **CDN Implementation**',
 'Alex Chen', 'CTO, Stackmatrices', '2024-01-24', '15 min read', 'GUIDE', 
 'https://placehold.co/800x400/3c3cf6/ffffff?text=SaaS+Infrastructure', true, true),

('Top 10 CRM Reviews for 2024', 
 'top-10-crm-reviews-2024',
 'A comprehensive comparison of the leading CRM platforms designed for fast-growing B2B SaaS teams.',
 '# Top 10 CRM Reviews for 2024

## Overview

Choosing the right CRM is crucial for your sales process...',
 'Sarah Jenkins', 'Editor', '2024-01-22', '12 min read', 'REVIEWS',
 'https://placehold.co/800x400/10b981/ffffff?text=CRM+Reviews', false, true),

('Mastering Product-Led Growth', 
 'mastering-product-led-growth',
 'Learn how to drive sustainable growth through your product experience rather than heavy sales cycles.',
 '# Mastering Product-Led Growth

Product-led growth (PLG) is transforming how SaaS companies acquire and retain customers...',
 'David Miller', 'Growth Lead', '2024-01-20', '10 min read', 'STRATEGY',
 'https://placehold.co/800x400/f59e0b/ffffff?text=Product+Growth', false, true),

('Security Audits for Startups', 
 'security-audits-startups',
 'Essential security steps every early-stage startup must take to protect customer data and trust.',
 '# Security Audits for Startups

Security is not just for enterprise companies...',
 'Elena Rodriguez', 'Security Analyst', '2024-01-18', '15 min read', 'GUIDE',
 'https://placehold.co/800x400/ef4444/ffffff?text=Security', false, true);

-- ============================================
-- 6. 设置 Row Level Security (RLS)
-- ============================================

-- 启用 RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许匿名读取所有数据
CREATE POLICY "Allow anonymous read access" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read access" ON tools
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read access" ON articles
    FOR SELECT USING (true);

-- 注意：写入操作需要通过 API Key 或认证用户
-- 如需管理后台，可添加认证策略：

-- CREATE POLICY "Allow authenticated users to manage tools" ON tools
--     FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 7. 创建更新触发器 (自动更新 updated_at)
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. 创建视图 (可选)
-- ============================================

-- 精选工具视图
CREATE VIEW featured_tools AS
SELECT * FROM tools WHERE featured = true AND is_active = true ORDER BY rating DESC;

-- 已发布文章视图
CREATE VIEW published_articles AS
SELECT * FROM articles WHERE published = true ORDER BY date DESC;

-- ============================================
-- 完成！
-- ============================================
