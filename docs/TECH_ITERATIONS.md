# StackMatrices 技术迭代需求文档

> **项目**: StackMatrices GEO Agency Website  
> **版本**: v1.0  
> **生成日期**: 2026-03-02  
> **API端点**: `https://stackmatrices.com/api/tech-iterations`

---

## 📊 迭代概览

| 指标 | 数值 |
|------|------|
| **总迭代项** | 10 |
| **预计总工时** | 116 小时 |
| **进行中** | 2 项 |
| **计划阶段** | 5 项 |
| **待办事项** | 3 项 |

### 按优先级分布

| 优先级 | 数量 | 工时 |
|--------|------|------|
| 🔴 High | 3 | 26 小时 |
| 🟡 Medium | 4 | 56 小时 |
| 🟢 Low | 3 | 34 小时 |

### 按类别分布

| 类别 | 数量 |
|------|------|
| Backend | 2 |
| Frontend | 1 |
| Performance | 1 |
| Feature | 2 |
| Automation | 1 |
| Analytics | 1 |
| Growth | 1 |
| Mobile | 1 |

---

## 🔄 进行中 (In Progress)

### TECH-001: Blog System Database Migration

**优先级**: 🔴 High  
**类别**: Backend  
**预计工时**: 8 小时  
**标签**: `supabase`, `nextjs`, `database`, `migration`

**需求描述**:  
将静态博客页面迁移为数据库驱动的动态渲染。目前9篇文章是硬编码的.tsx文件，需要创建从Supabase articles表获取数据的动态路由。

**验收标准**:
- [ ] Blog列表页面从/api/articles获取数据
- [ ] 文章详情页使用slug动态路由
- [ ] Markdown渲染支持语法高亮
- [ ] 浏览量统计正常工作
- [ ] SEO meta标签从数据库填充

**技术备注**:  
使用 ReactMarkdown + remark-gfm 渲染内容。实现ISR静态重新生成。缓存API响应以提高性能。

---

### TECH-006: Content Monitoring System Enhancement

**优先级**: 🟡 Medium  
**类别**: Automation  
**预计工时**: 10 小时  
**标签**: `python`, `cron`, `scraping`, `automation`

**需求描述**:  
改进Python内容监控系统，添加更好的错误处理、多源聚合和自动发布工作流。

**验收标准**:
- [ ] 监控10+权威来源
- [ ] AI驱动的内容摘要
- [ ] 自动生成草稿文章
- [ ] Slack新内容通知
- [ ] 失败获取的重试逻辑

**技术备注**:  
当前脚本位于 scripts/content_monitor.py。添加指数退避。实现源优先级队列。使用GPT-4生成内容。

---

## 📅 计划阶段 (Planned)

### TECH-002: Case Studies Dynamic Rendering

**优先级**: 🔴 High  
**类别**: Backend  
**预计工时**: 6 小时  
**标签**: `database`, `schema`, `migration`, `cases`

**需求描述**:  
将案例研究从硬编码常量迁移到数据库。目前3个案例在page.tsx文件中。需要case_studies表结构。

**验收标准**:
- [ ] 创建case_studies表
- [ ] 迁移3个现有案例
- [ ] 动态案例详情页
- [ ] 结果指标作为JSON列
- [ ] 相关案例推荐

**技术备注**:  
表结构: id, title, slug, location, type, content, results(JSON), testimonial, image_url

---

### TECH-003: Performance Optimization Bundle

**优先级**: 🔴 High  
**类别**: Performance  
**预计工时**: 12 小时  
**标签**: `performance`, `cwv`, `bundle`, `optimization`

**需求描述**:  
解决Core Web Vitals和加载性能问题。当前bundle体积较大，LCP需要改进。

**验收标准**:
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle size减少30%
- [ ] 图片使用WebP优化

**技术备注**:  
对重型组件实现代码分割。使用next/image优先加载。懒加载首屏以下内容。添加service worker缓存。

---

### TECH-004: Search Functionality Implementation

**优先级**: 🟡 Medium  
**类别**: Feature  
**预计工时**: 10 小时  
**标签**: `search`, `fulltext`, `algolia`, `postgres`

**需求描述**:  
添加博客文章和案例研究的全文搜索功能。目前没有搜索能力。

**验收标准**:
- [ ] 导航栏搜索输入框
- [ ] 实时搜索建议
- [ ] 带过滤器的搜索结果页
- [ ] 高亮匹配项
- [ ] 搜索分析跟踪

**技术备注**:  
选项1: 使用Postgres全文搜索(tsvector)。选项2: Algolia获得更好的相关性。实现防抖搜索输入。

---

### TECH-005: Content Management Dashboard

**优先级**: 🟡 Medium  
**类别**: Frontend  
**预计工时**: 16 小时  
**标签**: `admin`, `cms`, `dashboard`, `crud`

**需求描述**:  
创建管理界面，无需代码更改即可管理博客文章。需要带富文本编辑器的文章CRUD操作。

**验收标准**:
- [ ] 登录保护的管理面板
- [ ] 文章内容的WYSIWYG编辑器
- [ ] 存储桶图片上传
- [ ] 发布前预览
- [ ] 草稿/发布状态管理

**技术备注**:  
使用TipTap或Slate.js编辑器。使用Supabase Auth实现JWT认证。图片存储在Supabase Storage。

---

### TECH-007: Analytics Dashboard v2

**优先级**: 🟡 Medium  
**类别**: Analytics  
**预计工时**: 20 小时  
**标签**: `analytics`, `dashboard`, `metrics`, `visualization`

**需求描述**:  
构建全面的分析仪表板，显示AI可见性指标、转化漏斗和内容性能。

**验收标准**:
- [ ] 实时访客跟踪
- [ ] AI推荐来源细分
- [ ] 内容性能排名
- [ ] 转化漏斗可视化
- [ ] 导出CSV/PDF报告

**技术备注**:  
使用Recharts或Tremor进行可视化。聚合多个来源的数据。实现基于角色的访问控制。

---

## 📝 待办事项 (Backlog)

### TECH-008: Newsletter Subscription System

**优先级**: 🟢 Low  
**类别**: Feature  
**预计工时**: 14 小时  
**标签**: `newsletter`, `email`, `marketing`, `automation`

**需求描述**:  
为博客订阅者构建电子邮件通讯系统。捕获潜在客户并发送自动摘要邮件。

**验收标准**:
- [ ] 博客文章中的邮件捕获表单
- [ ] 双重选择加入验证
- [ ] 每周摘要邮件模板
- [ ] 退订管理
- [ ] 订阅者分析仪表板

**技术备注**:  
使用Resend API发送邮件。订阅者存储在Supabase。创建edge function处理定时摘要。

---

### TECH-009: A/B Testing Framework

**优先级**: 🟢 Low  
**类别**: Growth  
**预计工时**: 12 小时  
**标签**: `ab-testing`, `growth`, `analytics`, `experimentation`

**需求描述**:  
为落地页和CTA实现A/B测试。需要优化analysis-request表单的转化率。

**验收标准**:
- [ ] 实验配置UI
- [ ] 50/50流量分割
- [ ] 每变体的转化跟踪
- [ ] 统计显著性计算器
- [ ] 优胜者自动部署

**技术备注**:  
使用PostHog或GrowthBook进行实验。实验存储在数据库中。使用Segment跟踪事件。

---

### TECH-010: Mobile App PWA Features

**优先级**: 🟢 Low  
**类别**: Mobile  
**预计工时**: 8 小时  
**标签**: `pwa`, `mobile`, `offline`, `notifications`

**需求描述**:  
增强PWA功能，支持离线阅读和推送通知。

**验收标准**:
- [ ] 添加到主屏幕提示
- [ ] 离线文章阅读
- [ ] 新文章推送通知
- [ ] 评论后台同步
- [ ] 类似应用的导航

**技术备注**:  
使用Workbox实现service worker。使用next-pwa包。添加web app manifest。

---

## 🔌 数据访问方式

### 方式1: JSON文件 (推荐)

```bash
GET https://stackmatrices.com/tech-iterations.json
```

**响应格式**:
```json
{
  "iterations": [...],
  "summary": {
    "total": 10,
    "total_hours": 116,
    "by_status": { "in_progress": 2, "planned": 5, "backlog": 3 },
    "by_priority": { "high": 3, "medium": 4, "low": 3 }
  }
}
```

### 方式2: Python读取

```python
import requests

# Fetch iterations
url = "https://stackmatrices.com/tech-iterations.json"
response = requests.get(url)
data = response.json()

# Filter by status
in_progress = [i for i in data["iterations"] if i["status"] == "in_progress"]
high_priority = [i for i in data["iterations"] if i["priority"] == "high"]

print(f"Total hours: {data['summary']['total_hours']}")
```

### 方式3: JavaScript/Fetch

```javascript
fetch('https://stackmatrices.com/tech-iterations.json')
  .then(r => r.json())
  .then(data => {
    const backendTasks = data.iterations.filter(i => i.category === 'Backend');
    console.log('Backend work:', backendTasks);
  });
```

---

## 📁 相关文件

| 文件 | 路径 | 说明 |
|------|------|------|
| Tech Iterations API | `src/app/api/tech-iterations/route.ts` | API端点 |
| Export Script | `scripts/export_tech_iterations.py` | 数据导出 |
| JSON Export | `scripts/tech_iterations_export.json` | JSON数据 |
| Create Table SQL | `scripts/create_tech_iterations_table.sql` | 建表脚本 |

---

*此文档由 StackMatrices 系统自动生成*
