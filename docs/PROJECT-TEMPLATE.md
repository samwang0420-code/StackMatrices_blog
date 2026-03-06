# GEO 实施项目模板

**项目代号:** {{PROJECT_CODE}}  
**客户名称:** {{CLIENT_NAME}}  
**网站:** {{WEBSITE_URL}}  
**行业:** {{INDUSTRY}}  
**服务等级:** {{SERVICE_TIER}} ($300/$800/$1500/$3000)

---

## 1. 项目启动

### 1.1 客户信息
```yaml
客户名称: {{CLIENT_NAME}}
联系人: {{CONTACT_NAME}}
邮箱: {{CONTACT_EMAIL}}
电话: {{CONTACT_PHONE}}
时区: {{TIMEZONE}}

网站信息:
  主域名: {{WEBSITE_URL}}
  框架: {{FRAMEWORK}} # Next.js/Astro/WordPress/etc
  托管: {{HOSTING}} # Cloudflare/Vercel/Netlify/etc
  CMS: {{CMS}} # Contentful/Sanity/WordPress/etc

业务信息:
  行业: {{INDUSTRY}}
  服务区域: {{SERVICE_AREA}}
  目标客户: {{TARGET_AUDIENCE}}
  主要服务: {{MAIN_SERVICES}}
  竞争对手: {{COMPETITORS}}
```

### 1.2 基线数据
```yaml
实施前:
  GEO Score: {{GEO_SCORE_BEFORE}}
  SEO Score: {{SEO_SCORE_BEFORE}}
  有机流量: {{ORGANIC_TRAFFIC_BEFORE}}
  AI引用: {{AI_CITATIONS_BEFORE}}
  关键词排名: {{KEYWORD_RANKINGS_BEFORE}}

目标:
  GEO Score: {{GEO_SCORE_TARGET}}
  SEO Score: {{SEO_SCORE_TARGET}}
  有机流量增长: {{TRAFFIC_GROWTH_TARGET}}%
  AI引用: {{AI_CITATIONS_TARGET}}
  关键词首页: {{KEYWORDS_FIRST_PAGE_TARGET}}
```

---

## 2. 关键词策略

### 2.1 目标关键词
```json
{
  "primary_keywords": [
    {"keyword": "{{PRIMARY_KEYWORD_1}}", "volume": {{VOLUME_1}}, "difficulty": {{DIFFICULTY_1}}},
    {"keyword": "{{PRIMARY_KEYWORD_2}}", "volume": {{VOLUME_2}}, "difficulty": {{DIFFICULTY_2}}}
  ],
  "long_tail_keywords": [
    {"keyword": "{{LONG_TAIL_1}}", "volume": {{LT_VOLUME_1}}, "difficulty": {{LT_DIFFICULTY_1}}},
    {"keyword": "{{LONG_TAIL_2}}", "volume": {{LT_VOLUME_2}}, "difficulty": {{LT_DIFFICULTY_2}}}
  ],
  "brand_keywords": [
    "{{BRAND_KEYWORD_1}}",
    "{{BRAND_KEYWORD_2}}"
  ],
  "competitor_keywords": [
    "{{COMP_KEYWORD_1}}",
    "{{COMP_KEYWORD_2}}"
  ]
}
```

### 2.2 内容计划
```yaml
文章清单:
  - id: {{ARTICLE_ID_1}}
    title: "{{ARTICLE_TITLE_1}}"
    target_keyword: "{{TARGET_KW_1}}"
    word_count: {{WORD_COUNT_1}}
    priority: high/medium/low
    
  - id: {{ARTICLE_ID_2}}
    title: "{{ARTICLE_TITLE_2}}"
    target_keyword: "{{TARGET_KW_2}}"
    word_count: {{WORD_COUNT_2}}
    priority: high/medium/low
```

---

## 3. Schema策略

### 3.1 需要的Schema类型
根据服务等级选择:

**基础版 ($300):**
- [ ] Organization
- [ ] WebSite
- [ ] LocalBusiness (如适用)

**标准版 ($800):**
- [ ] Organization
- [ ] WebSite
- [ ] LocalBusiness
- [ ] Service
- [ ] FAQPage

**完整版 ($1500):**
- [ ] Organization
- [ ] WebSite
- [ ] LocalBusiness
- [ ] Service
- [ ] FAQPage (24+问题)
- [ ] Article (所有文章)
- [ ] BreadcrumbList
- [ ] HowTo (如适用)

**企业版 ($3000+):**
- 完整版全部 +
- [ ] VideoObject
- [ ] Event
- [ ] Product
- [ ] JobPosting
- [ ] 自定义Schema

### 3.2 Schema模板

#### Organization
```json
{
  "@context": "https://schema.org",
  "@type": "{{ORG_TYPE}}",
  "name": "{{CLIENT_NAME}}",
  "alternateName": "{{ALTERNATE_NAME}}",
  "url": "{{WEBSITE_URL}}",
  "logo": "{{LOGO_URL}}",
  "description": "{{ORG_DESCRIPTION}}",
  "sameAs": [
    "{{SOCIAL_URL_1}}",
    "{{SOCIAL_URL_2}}"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "{{PHONE}}",
    "email": "{{EMAIL}}",
    "contactType": "{{CONTACT_TYPE}}"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{STREET}}",
    "addressLocality": "{{CITY}}",
    "addressRegion": "{{STATE}}",
    "postalCode": "{{ZIP}}",
    "addressCountry": "{{COUNTRY}}"
  }
}
```

#### LocalBusiness (如适用)
```json
{
  "@context": "https://schema.org",
  "@type": "{{BUSINESS_TYPE}}",
  "name": "{{CLIENT_NAME}}",
  "image": "{{IMAGE_URL}}",
  "@id": "{{WEBSITE_URL}}/#localbusiness",
  "url": "{{WEBSITE_URL}}",
  "telephone": "{{PHONE}}",
  "priceRange": "{{PRICE_RANGE}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{STREET}}",
    "addressLocality": "{{CITY}}",
    "addressRegion": "{{STATE}}",
    "postalCode": "{{ZIP}}",
    "addressCountry": "{{COUNTRY}}"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": {{LATITUDE}},
    "longitude": {{LONGITUDE}}
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "{{OPEN_TIME}}",
      "closes": "{{CLOSE_TIME}}"
    }
  ]
}
```

---

## 4. 内容模板

### 4.1 主文章模板
```markdown
# {{ARTICLE_TITLE}}

## 引言
{{INTRODUCTION}}
- 痛点: {{PAIN_POINT}}
- 数据: {{STATISTICS}}
- 解决方案预告: {{SOLUTION_PREVIEW}}

## 什么是{{TOPIC}}
{{DEFINITION}}
{{EXPLANATION}}

| 传统方法 | {{TOPIC}} |
|---------|-----------|
| {{TRADITIONAL_1}} | {{NEW_1}} |
| {{TRADITIONAL_2}} | {{NEW_2}} |

## 为什么{{TOPIC}}很重要
{{IMPORTANCE_SECTION}}

### 数据支撑
- {{STAT_1}}
- {{STAT_2}}
- {{STAT_3}}

### 真实案例
{{CASE_STUDY}}

### ROI计算
{{ROI_CALCULATION}}

## 如何实施{{TOPIC}}
### Phase 1: {{PHASE_1_NAME}}
{{PHASE_1_CONTENT}}

### Phase 2: {{PHASE_2_NAME}}
{{PHASE_2_CONTENT}}

### Phase 3: {{PHASE_3_NAME}}
{{PHASE_3_CONTENT}}

## 常见问题
### Q: {{FAQ_1_QUESTION}}
A: {{FAQ_1_ANSWER}}

### Q: {{FAQ_2_QUESTION}}
A: {{FAQ_2_ANSWER}}

### Q: {{FAQ_3_QUESTION}}
A: {{FAQ_3_ANSWER}}

## 结论
{{CONCLUSION}}

**准备好开始了吗?** [{{CTA_TEXT}}]({{CTA_LINK}})

---
*Last updated: {{DATE}}*
```

### 4.2 FAQ模板
```yaml
faq_categories:
  - name: "关于{{TOPIC}}"
    questions:
      - q: "{{FAQ_Q_1}}"
        a: "{{FAQ_A_1}}"
      - q: "{{FAQ_Q_2}}"
        a: "{{FAQ_A_2}}"
        
  - name: "实施相关"
    questions:
      - q: "{{FAQ_Q_3}}"
        a: "{{FAQ_A_3}}"
      - q: "{{FAQ_Q_4}}"
        a: "{{FAQ_A_4}}"
        
  - name: "技术问题"
    questions:
      - q: "{{FAQ_Q_5}}"
        a: "{{FAQ_A_5}}"
      - q: "{{FAQ_Q_6}}"
        a: "{{FAQ_A_6}}"
```

---

## 5. 转化组件

### 5.1 Newsletter配置
```yaml
newsletter:
  title: "{{NEWSLETTER_TITLE}}"
  description: "{{NEWSLETTER_DESCRIPTION}}"
  button_text: "{{BUTTON_TEXT}}"
  success_message: "{{SUCCESS_MESSAGE}}"
  
  placement:
    - blog_header: {{HEADER_PLACEMENT}}
    - blog_footer: {{FOOTER_PLACEMENT}}
    - article_inline: {{INLINE_PLACEMENT}}
    - sidebar: {{SIDEBAR_PLACEMENT}}
    
  integration: {{EMAIL_PLATFORM}} # Mailchimp/ConvertKit/etc
```

### 5.2 Lead Magnet配置
```yaml
lead_magnet:
  title: "{{LEAD_MAGNET_TITLE}}"
  description: "{{LEAD_MAGNET_DESCRIPTION}}"
  file_name: "{{FILE_NAME}}.pdf"
  file_size: "{{FILE_SIZE}}"
  
  content_sections:
    - {{SECTION_1}}
    - {{SECTION_2}}
    - {{SECTION_3}}
    - {{SECTION_4}}
    
  cta_text: "{{CTA_TEXT}}"
  email_template: {{EMAIL_TEMPLATE_ID}}
```

### 5.3 CTA配置
```yaml
ctas:
  - name: "Hero CTA"
    text: "{{HERO_CTA_TEXT}}"
    link: "{{HERO_CTA_LINK}}"
    style: "primary"
    
  - name: "Article Inline"
    text: "{{INLINE_CTA_TEXT}}"
    link: "{{INLINE_CTA_LINK}}"
    style: "secondary"
    frequency: "every_1000_words"
    
  - name: "Sidebar"
    text: "{{SIDEBAR_CTA_TEXT}}"
    link: "{{SIDEBAR_CTA_LINK}}"
    style: "compact"
    
  - name: "Exit Intent"
    text: "{{EXIT_CTA_TEXT}}"
    link: "{{EXIT_CTA_LINK}}"
    style: "popup"
    delay: "{{EXIT_DELAY}}"
```

---

## 6. AI专项

### 6.1 llms.txt模板
```
# {{CLIENT_NAME}}

## Domain
{{WEBSITE_URL}}

## Description
{{AI_DESCRIPTION}}

## Services
{{#SERVICES}}
- {{SERVICE_NAME}}: {{SERVICE_DESCRIPTION}}
{{/SERVICES}}

## Target Industries
{{#INDUSTRIES}}
- {{INDUSTRY_NAME}}
{{/INDUSTRIES}}

## Key Differentiators
{{#DIFFERENTIATORS}}
1. {{DIFFERENTIATOR_1}}
2. {{DIFFERENTIATOR_2}}
3. {{DIFFERENTIATOR_3}}
{{/DIFFERENTIATORS}}

## Content Resources
{{#RESOURCES}}
- {{RESOURCE_NAME}}: {{RESOURCE_URL}}
{{/RESOURCES}}

## Contact
- Email: {{CONTACT_EMAIL}}
- Website: {{WEBSITE_URL}}
- Phone: {{CONTACT_PHONE}}

## Last Updated
{{CURRENT_DATE}}
```

### 6.2 AI优化要点
```yaml
ai_optimization:
  platforms:
    - ChatGPT
    - Claude
    - Perplexity
    - Google SGE
    - Gemini
    
  content_requirements:
    - answer_length: "80-150_words"
    - structure: "clear_headings"
    - citations: "data_backed"
    - tone: "professional_authoritative"
    
  monitoring_queries:
    - "{{MONITOR_QUERY_1}}"
    - "{{MONITOR_QUERY_2}}"
    - "{{MONITOR_QUERY_3}}"
```

---

## 7. 技术配置

### 7.1 环境变量
```bash
# .env.local
NEXT_PUBLIC_SITE_URL={{WEBSITE_URL}}
NEXT_PUBLIC_GA_ID={{GOOGLE_ANALYTICS_ID}}
NEXT_PUBLIC_SUPABASE_URL={{SUPABASE_URL}}
NEXT_PUBLIC_SUPABASE_ANON_KEY={{SUPABASE_KEY}}

# API Keys (server only)
APIFY_API_KEY={{APIFY_KEY}}
SERP_API_KEY={{SERP_KEY}}
OPENAI_API_KEY={{OPENAI_KEY}}
```

### 7.2 构建设置
```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  siteUrl: '{{WEBSITE_URL}}',
  generateRobotsTxt: true,
  generateSitemap: true
}
```

### 7.3 CI/CD配置
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - name: Deploy to {{PLATFORM}}
        run: {{DEPLOY_COMMAND}}
```

---

## 8. Dashboard数据

### 8.1 客户数据模板
```javascript
const clientData = {
  id: "{{PROJECT_CODE}}",
  business_name: "{{CLIENT_NAME}}",
  website: "{{WEBSITE_URL}}",
  industry: "{{INDUSTRY}}",
  city: "{{CITY}}",
  state: "{{STATE}}",
  country: "{{COUNTRY}}",
  
  // 分数
  geo_score: {{GEO_SCORE_BEFORE}},
  seo_score: {{SEO_SCORE_BEFORE}},
  tech_seo_score: {{TECH_SCORE_BEFORE}},
  content_seo_score: {{CONTENT_SCORE_BEFORE}},
  authority_seo_score: {{AUTHORITY_SCORE_BEFORE}},
  ai_citation_score: {{AI_SCORE_BEFORE}},
  knowledge_graph_score: {{KG_SCORE_BEFORE}},
  brand_mentions_score: {{BRAND_SCORE_BEFORE}},
  
  status: "active"
};
```

### 8.2 实施记录模板
```javascript
const implementationData = {
  client_id: "{{PROJECT_CODE}}",
  title: "{{SERVICE_TIER}} GEO Package",
  description: "{{IMPLEMENTATION_DESCRIPTION}}",
  type: "{{TYPE}}", // technical/content/strategy
  status: "completed",
  
  geo_score_before: {{GEO_SCORE_BEFORE}},
  seo_score_before: {{SEO_SCORE_BEFORE}},
  geo_score_after: {{GEO_SCORE_AFTER}},
  seo_score_after: {{SEO_SCORE_AFTER}},
  
  completed_tasks: [
    "{{TASK_1}}",
    "{{TASK_2}}",
    "{{TASK_3}}"
  ]
};
```

---

## 9. 跟踪计划

### 9.1 监测指标
```yaml
monitoring:
  frequency: weekly
  
  metrics:
    - schema_health
    - ai_citations
    - keyword_rankings
    - organic_traffic
    - conversion_rate
    - page_speed
    
  alerts:
    - schema_errors
    - ranking_drops
    - traffic_spikes
    - conversion_drops
```

### 9.2 报告周期
```yaml
reports:
  weekly:
    - traffic_overview
    - keyword_movements
    - technical_health
    
  monthly:
    - comprehensive_audit
    - competitor_analysis
    - content_performance
    - roi_calculation
    
  quarterly:
    - strategy_review
    - goal_assessment
    - roadmap_update
```

---

## 10. 交付清单

### 10.1 代码交付
- [ ] GitHub仓库更新
- [ ] 所有Schema实现
- [ ] 内容创作
- [ ] 转化组件
- [ ] AI专项优化

### 10.2 文档交付
- [ ] 实施报告
- [ ] SOP文档
- [ ] 跟踪指南
- [ ] 维护手册

### 10.3 Dashboard交付
- [ ] 客户信息
- [ ] 实施记录
- [ ] 关键词设置
- [ ] AI排名跟踪
- [ ] 监控配置

### 10.4 培训交付
- [ ] 操作培训
- [ ] Dashboard使用
- [ ] 内容更新指南
- [ ] 问题排查

---

## 11. 变量替换表

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `{{PROJECT_CODE}}` | 项目唯一标识 | stackmatrices-blog-001 |
| `{{CLIENT_NAME}}` | 客户名称 | StackMatrices Blog |
| `{{WEBSITE_URL}}` | 网站地址 | https://stackmatrices.com |
| `{{INDUSTRY}}` | 行业 | GEO Agency |
| `{{SERVICE_TIER}}` | 服务等级 | Complete ($1500) |

---

**模板版本:** v1.0  
**最后更新:** 2026-03-06  
**维护者:** GEO-Arch
