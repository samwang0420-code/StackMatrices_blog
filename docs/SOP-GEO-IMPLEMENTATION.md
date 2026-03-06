# StackMatrices GEO 实施方法论 (SOP)

**版本:** v1.0  
**创建日期:** 2026-03-06  
**适用对象:** StackMatrices Blog / 医疗营销网站

---

## 1. 项目概述

### 1.1 服务等级

| 等级 | 价格 | 交付内容 |
|------|------|----------|
| **基础版** | $300 | Schema标记 (4种) |
| **标准版** | $800 | Schema + 内容优化 |
| **完整版** | $1500 | Schema + 内容 + 转化 + AI专项 |
| **企业版** | $3000+ | 完整版 + 持续优化 |

### 1.2 本次实施 ($1500完整版)

- **客户:** StackMatrices Blog
- **网站:** https://stackmatrices.com/blog
- **行业:** GEO Agency / 医疗营销
- **实施周期:** 1天
- **交付日期:** 2026-03-06

---

## 2. 实施流程 (Step-by-Step)

### Phase 1: 基础诊断 (30分钟)

#### 2.1.1 技术审计
```bash
# 检查现有Schema
curl -s https://example.com | grep -o '"@type"[^}]*' | sort | uniq

# 检查技术基础
- 网站框架 (Next.js/Astro/WordPress)
- 当前SEO分数
- 现有内容质量
- 竞争对手分析
```

#### 2.1.2 关键词研究
```
目标关键词列表:
1. 主词: GEO marketing, Generative Engine Optimization
2. 长尾: medical practice marketing, plastic surgery SEO
3. 品牌: StackMatrices, AI search optimization
4. 竞品: healthcare SEO, dental marketing
```

#### 2.1.3 基线记录
```json
{
  "geo_score_before": 45,
  "seo_score_before": 60,
  "ai_citations_before": 0,
  "organic_traffic_before": "N/A"
}
```

---

### Phase 2: Schema实施 (2小时)

#### 2.2.1 Organization Schema
```typescript
// constants.ts
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "StackMatrices",
  "url": "https://stackmatrices.com",
  "logo": "https://stackmatrices.com/logo.svg",
  "sameAs": [
    "https://twitter.com/stackmatrices",
    "https://linkedin.com/company/stackmatrices"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@stackmatrices.com",
    "contactType": "sales"
  },
  "knowsAbout": [
    "GEO Marketing",
    "Medical Practice Marketing",
    "AI Search Optimization"
  ]
};
```

#### 2.2.2 WebSite Schema
```typescript
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "StackMatrices",
  "url": "https://stackmatrices.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://stackmatrices.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};
```

#### 2.2.3 FAQPage Schema
```typescript
// 每个FAQ页面
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

**关键要求:**
- 至少24个高质量FAQ
- 每个回答80-150词
- 覆盖核心关键词
- 使用 medical/health 相关术语

#### 2.2.4 Article Schema
```typescript
// 每篇博客文章
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "datePublished": article.date,
  "author": {
    "@type": "Organization",
    "name": "Stackmatrices"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stackmatrices",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stackmatrices.com/logo.svg"
    }
  }
};
```

#### 2.2.5 BreadcrumbList Schema
```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://stackmatrices.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://stackmatrices.com/blog" },
    { "@type": "ListItem", "position": 3, "name": article.title, "item": fullUrl }
  ]
};
```

---

### Phase 3: AI专项优化 (1小时)

#### 2.3.1 llms.txt 创建
```
# StackMatrices

## Domain
https://stackmatrices.com

## Description
StackMatrices is a specialized GEO (Generative Engine Optimization) agency...

## Services
- AI Visibility Audit
- GEO Implementation  
- Ongoing GEO Management

## Target Industries
- Plastic Surgery Practices
- Dental Practices
- Medical Spas (Medspas)

## Contact
- Email: contact@stackmatrices.com
- Website: https://stackmatrices.com

## Last Updated
2026-03-06
```

**放置位置:** `/public/llms.txt`

#### 2.3.2 robots.txt 优化
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://stackmatrices.com/sitemap.xml
```

---

### Phase 4: 内容创作 (4小时)

#### 2.4.1 权威文章结构
```markdown
# 文章标题 (包含主关键词)

## 引言 (200词)
- 痛点引入
- 数据支撑
- 解决方案预告

## 什么是XXX (500词)
- 定义解释
- 与传统方法对比
- 核心差异表格

## 为什么重要 (600词)
- 市场变化数据
- 真实案例
- ROI计算

## 如何实施 (800词)
- 分阶段框架
- 具体步骤
- 工具/资源

## 常见问题 (400词)
- 3-5个相关FAQ
- 简短回答

## 结论 + CTA (200词)
- 总结要点
- 行动号召
- 相关资源链接
```

**关键指标:**
- 字数: 2500-3000词
- 关键词密度: 1-2%
- 标题标签: H1 + 3-5个H2
- 图片: 2-3张带alt标签
- 内部链接: 3-5个

#### 2.4.2 文章元数据
```json
{
  "id": "what-is-geo",
  "title": "What is GEO and Why Medical Practices Need It in 2026",
  "description": "Discover why Generative Engine Optimization...",
  "date": "2026-03-06",
  "readTime": 12,
  "category": "GEO Fundamentals",
  "tags": ["GEO", "AI Search", "Medical Marketing"],
  "featured": true
}
```

---

### Phase 5: 转化优化 (2小时)

#### 2.5.1 NewsletterSignup 组件
```typescript
// 核心功能
- 邮箱验证
- 加载状态
- 成功反馈
- 隐私说明
- 防止重复提交

// 放置位置
- 博客文章底部
- 首页侧边栏
- 单独的订阅页面
```

#### 2.5.2 LeadMagnet 组件
```typescript
// 核心功能
- PDF下载引导
- 邮箱收集
- 价值展示清单
- 自动下载触发
- 邮件营销集成

// Lead Magnet内容
- GEO Starter Kit PDF
- Schema模板
- 实施检查清单
- 案例研究
```

#### 2.5.3 CTA优化
```
位置:
1. 首屏 Hero 区域
2. 文章内 (每1000词一个)
3. 侧边栏固定
4. 退出意图弹窗

文案:
- "Get Your Free GEO Audit →"
- "Download Free Starter Kit"
- "Subscribe for Weekly Insights"
```

---

### Phase 6: 技术部署 (1小时)

#### 2.6.1 构建流程
```bash
# 1. 本地构建
npm install
npm run build

# 2. 验证输出
ls dist/
# 确认包含: index.html, llms.txt, sitemap.xml

# 3. 本地测试
npm run preview
# 访问 http://localhost:4321

# 4. 提交Git
git add -A
git commit -m "feat: Complete GEO implementation"
git push origin main

# 5. 等待CI/CD
# Cloudflare Pages 自动部署
```

#### 2.6.2 部署验证
```bash
# 验证Schema
curl -s https://example.com | grep -c '"@type"'

# 验证llms.txt
curl -s https://example.com/llms.txt | head -5

# 验证FAQ Schema
curl -s https://example.com/faq | grep -c '"@type":"Question"'

# Google Rich Results Test
# https://search.google.com/test/rich-results
```

---

### Phase 7: Dashboard数据录入 (30分钟)

#### 2.7.1 客户信息
```javascript
const clientData = {
  id: 'stackmatrices-blog-001',
  business_name: 'StackMatrices Blog',
  website: 'https://stackmatrices.com/blog',
  industry: 'GEO Agency',
  city: 'Houston',
  state: 'TX',
  geo_score: 75,
  seo_score: 82,
  status: 'active'
};
```

#### 2.7.2 实施记录
```javascript
const implementationData = {
  client_id: 'stackmatrices-blog-001',
  title: 'Complete GEO Package ($1500)',
  description: 'Schema markup, llms.txt, content, Newsletter, LeadMagnet',
  type: 'technical',
  status: 'completed',
  geo_score_before: 45,
  seo_score_before: 60,
  geo_score_after: 75,
  seo_score_after: 82
};
```

#### 2.7.3 关键词
```javascript
const keywords = [
  { keyword: 'GEO marketing', search_volume: 1000, difficulty: 45 },
  { keyword: 'generative engine optimization', search_volume: 500, difficulty: 35 },
  { keyword: 'medical practice marketing', search_volume: 2000, difficulty: 55 }
];
```

#### 2.7.4 监控设置
```javascript
const monitoringData = {
  client_id: 'stackmatrices-blog-001',
  check_type: 'schema_validation',
  status: 'passed',
  details: {
    schemas: ['Organization', 'WebSite', 'FAQPage', 'Article'],
    llms_txt: 'deployed'
  }
};
```

---

## 3. 质量检查清单

### 3.1 Schema验证
- [ ] Organization Schema 包含logo和联系方式
- [ ] WebSite Schema 包含SearchAction
- [ ] FAQPage Schema 包含24+个问题
- [ ] Article Schema 包含author和publisher
- [ ] BreadcrumbList 层级正确
- [ ] 所有Schema通过Google Rich Results Test

### 3.2 内容检查
- [ ] 主文章2500+词
- [ ] 关键词密度1-2%
- [ ] 3-5个内部链接
- [ ] 2-3张图片带alt
- [ ] 至少3个H2标题
- [ ] 包含数据/案例/ROI计算

### 3.3 转化组件
- [ ] Newsletter表单正常工作
- [ ] LeadMagnet能下载PDF
- [ ] 至少3个CTA位置
- [ ] 表单有成功状态反馈
- [ ] 移动端适配正常

### 3.4 AI优化
- [ ] llms.txt可访问
- [ ] robots.txt允许AI爬虫
- [ ] 回答长度适合AI引用(80-150词)
- [ ] 包含医疗专业术语

### 3.5 技术部署
- [ ] Git提交成功
- [ ] CI/CD构建通过
- [ ] 网站可访问
- [ ] 无console错误
- [ ] 移动端正常

---

## 4. 测试方法

### 4.1 Schema测试
```bash
# 测试工具
1. Google Rich Results Test
   https://search.google.com/test/rich-results

2. Schema.org Validator
   https://validator.schema.org/

3. 命令行验证
curl -s https://example.com | python -m json.tool
```

### 4.2 AI引用测试
```
测试查询 (30天后):
1. "What is GEO marketing for medical practices?"
2. "How does AI affect medical practice marketing?"
3. "StackMatrices GEO services"

验证:
- AI是否推荐stackmatrices.com
- 引用内容是否准确
- 首次引用时间记录
```

### 4.3 转化测试
```
测试场景:
1. 填写Newsletter表单 → 检查邮件接收
2. 点击LeadMagnet → 检查PDF下载
3. 点击CTA按钮 → 检查跳转正确

指标:
- 表单提交成功率 > 95%
- PDF下载成功率 > 90%
- 页面加载时间 < 3s
```

---

## 5. 交付物清单

### 5.1 代码文件
```
src/
├── lib/
│   └── constants.ts          # Schema数据
├── components/
│   ├── NewsletterSignup.tsx  # 邮件订阅
│   └── LeadMagnet.tsx        # PDF下载
├── app/
│   ├── layout.tsx            # 全局Schema注入
│   ├── faq/
│   │   └── page.tsx          # FAQPage Schema
│   └── blog/
│       ├── page.tsx          # 博客首页
│       └── [id]/
│           └── page.tsx      # Article Schema
public/
├── llms.txt                  # AI爬虫文档
└── robots.txt                # 爬虫规则
content/
└── articles/
    ├── index.json            # 文章索引
    └── what-is-geo.md        # 权威文章
```

### 5.2 文档文件
```
docs/
├── SOP.md                    # 本文件
├── IMPLEMENTATION-REPORT.md  # 实施报告
├── TRACKING-REPORT.md        # 跟踪报告
└── DELIVERY-SUMMARY.md       # 交付清单
```

### 5.3 Dashboard数据
- 客户信息 ✅
- 实施记录 ✅
- 关键词列表 ✅
- AI排名跟踪 ✅
- 监控检查 ✅
- 分数历史 ✅
- 竞争对手 ✅
- 引用记录 ✅

---

## 6. 跟踪计划

### 6.1 短期 (1-4周)
- [ ] Day 1: Schema索引检查
- [ ] Day 7: Google Rich Results验证
- [ ] Day 14: 首次AI引用测试
- [ ] Day 30: 转化率基线记录

### 6.2 中期 (1-3月)
- [ ] Month 1: AI引用频率统计
- [ ] Month 2: 关键词排名检查
- [ ] Month 3: ROI计算和报告

### 6.3 长期 (3-12月)
- [ ] 季度内容更新
- [ ] 竞争对手策略调整
- [ ] 新AI平台适配
- [ ] 年度效果总结

---

## 7. 常见问题 (FAQ)

### Q: Schema标记多久生效?
A: Google通常7-14天索引新Schema，AI引用可能需要30-60天。

### Q: 为什么需要llms.txt?
A: 这是告诉AI爬虫"你是谁"的专用文件，比Schema更直接被AI读取。

### Q: 文章字数有要求吗?
A: AI引用最佳长度是80-150词的回答，但权威文章需要2500+词展示专业性。

### Q: 多久更新一次内容?
A: 建议每月2-4篇新文章，每季度更新旧文章。

---

## 8. 工具清单

### 8.1 开发工具
- VS Code / Cursor
- Node.js + npm
- Git + GitHub
- Chrome DevTools

### 8.2 验证工具
- Google Rich Results Test
- Schema.org Validator
- GTmetrix (速度测试)
- Mobile-Friendly Test

### 8.3 AI测试工具
- ChatGPT (OpenAI)
- Claude (Anthropic)
- Perplexity
- Google SGE

### 8.4 监控工具
- Google Search Console
- Google Analytics 4
- Dashboard (自建)
- Uptime监控

---

## 9. 更新记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-03-06 | 初始版本，StackMatrices Blog实施 |

---

**文档维护:** GEO-Arch  
**下次更新:** 2026-04-06 (基于实施效果)
