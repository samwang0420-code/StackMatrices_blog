# Blog Database Schema

## Option 1: Keep Static (Recommended)

当前方案：文章作为 Next.js 页面组件
- 路径：`src/app/blog/[slug]/page.tsx`
- 优点：SSG静态生成，SEO最优，无数据库依赖
- 适合：内容不频繁更新，单作者

## Option 2: Supabase Database

### 1. Create Table
```sql
CREATE TABLE articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT,
    author TEXT,
    read_time TEXT,
    excerpt TEXT,
    cover_image TEXT,
    content TEXT, -- Markdown or HTML
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_articles_published ON articles(published);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_featured ON articles(featured);
```

### 2. Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://fixemvsckapejyfwphft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Migration Strategy
```typescript
// Fetch articles from Supabase
async function getArticles() {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  return data;
}
```

## Current Articles Inventory

| Slug | Title | Category | Status |
|------|-------|----------|--------|
| seo-geo-trends-2025 | SEO and GEO Trends 2025 | Analysis | ✅ Published |
| ai-eating-seo-budget | AI Is Quietly Eating Your SEO Budget | Analysis | ✅ Published |
| hidden-cost-calculator | The Hidden Cost Calculator | Tools | ✅ Published |
| chatgpt-vs-perplexity | ChatGPT vs Perplexity | Comparison | ✅ Published |
| geo-checklist | The Medical GEO Checklist | Implementation | ✅ Published |
| 6-month-playbook | 6-Month GEO Transformation Playbook | Strategy | ✅ Published |
| ai-optimized-content | How to Write AI-Optimized Content | Content Strategy | ✅ Published |
| predictions-2026 | 2026 Medical Marketing Predictions | Industry Trends | ✅ Published |
| schema-markup-guide | Medical Schema Markup Guide | Implementation | ✅ Published |

**Total: 9 articles**

## Recommendation

保持**静态页面方案**：
1. 当前10篇文章已经部署运行
2. 无需数据库维护成本
3. Next.js SSG提供最佳性能
4. 内容变更时重新构建即可

如需改为数据库驱动，请告知，我提供完整迁移脚本。
