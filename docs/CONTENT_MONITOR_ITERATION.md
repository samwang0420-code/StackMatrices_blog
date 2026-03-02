# Content Monitor → Iteration Generator System

## 系统架构

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Authority      │     │  AI Analysis     │     │  Iteration      │
│  Sources        │────▶│  & Extraction    │────▶│  Database       │
│  (RSS/Scraping) │     │  (DeepSeek API)  │     │  (Supabase)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │                           │
                               ▼                           ▼
                        ┌──────────────┐          ┌──────────────┐
                        │  Smart       │          │  Other       │
                        │  Filtering   │          │  Projects    │
                        │  (Keywords)  │          │  (Read API)  │
                        └──────────────┘          └──────────────┘
```

## 功能说明

### 1. 内容监控
监控以下权威来源：

| 来源 | 类型 | 监控内容 |
|------|------|---------|
| Google Search Central | RSS | 算法更新、排名因素变化 |
| OpenAI Blog | RSS | AI能力更新、API变化 |
| Bing Webmaster | RSS | 搜索功能更新 |
| Perplexity Blog | RSS | 搜索创新、AI引用优化 |

### 2. 智能分析
使用 DeepSeek API 分析内容：
- 识别技术创新
- 提取规则变化
- 判断影响范围
- 生成分类标签

### 3. 自动创建迭代需求

每个检测到的变化自动生成：

```json
{
  "title": "[Algorithm] Google Core Update March 2024",
  "description": "详细说明变化内容、影响范围、应对策略",
  "category": "Algorithm|Technical|Content|Strategy",
  "priority": "critical|high|medium|low",
  "estimated_hours": 16,
  "affects": ["medical", "local", "ecommerce"],
  "source_type": "google_update",
  "source_url": "https://...",
  "implementation_steps": [
    "Review source documentation",
    "Analyze impact on current clients",
    "Update GEO playbooks",
    "Implement changes"
  ]
}
```

## 数据库表结构

### geo_implementation_iterations

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | TEXT | 需求标题 |
| description | TEXT | 详细描述 |
| category | TEXT | Algorithm/Technical/Content/Strategy |
| priority | TEXT | critical/high/medium/low |
| status | TEXT | backlog/planned/in_progress/completed |
| estimated_hours | INTEGER | 预计工时 |
| affects | TEXT[] | 影响范围 [medical, local, ecommerce, all] |
| source_type | TEXT | google_update/openai/industry_trend |
| source_url | TEXT | 来源链接 |
| acceptance_criteria | TEXT[] | 验收标准 |
| implementation_steps | TEXT[] | 实施步骤 |

## 使用方法

### 手动运行监控

```bash
# Set environment variables
export SUPABASE_SERVICE_ROLE_KEY=your_key
export DEEPSEEK_API_KEY=your_key

# Run monitor
python3 scripts/monitor_and_generate.py
```

### 添加到 Cron（每小时运行）

```bash
# crontab -e
0 * * * * cd /path/to/blog && python3 scripts/monitor_and_generate.py >> logs/monitor.log 2>&1
```

### 其他项目读取迭代需求

```python
import requests

# Fetch all pending iterations
url = f"{SUPABASE_URL}/rest/v1/geo_implementation_iterations"
headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
}
params = {
    "status": "eq.backlog",
    "priority": "in.(critical,high)",
    "order": "created_at.desc"
}

response = requests.get(url, headers=headers, params=params)
iterations = response.json()

for item in iterations:
    print(f"[{item['priority']}] {item['title']}")
    print(f"   Category: {item['category']} | Hours: {item['estimated_hours']}")
    print(f"   Affects: {', '.join(item['affects'])}")
```

## 迭代需求分类

### Algorithm（算法更新）
- Google Core Updates
- Helpful Content Updates
- Ranking Factor Changes
- Penalty Algorithm Changes

### Technical（技术变化）
- Schema.org Updates
- Crawl/Index Changes
- Page Experience Updates
- API Deprecations

### Content（内容策略）
- Content Quality Guidelines
- E-E-A-T Requirements
- AI-Generated Content Rules
- User Intent Shifts

### Strategy（策略调整）
- New Platform Features (SGE, AI Overviews)
- Competitive Landscape Changes
- Industry Best Practices
- Tool/Platform Recommendations

## 优先级定义

| 优先级 | 响应时间 | 触发条件 |
|--------|---------|---------|
| **Critical** | 24小时内 | 核心算法更新、大规模排名影响、服务中断 |
| **High** | 1周内 | 重要功能更新、新排名因素、合规要求 |
| **Medium** | 2周内 | 优化建议、新工具发布、最佳实践更新 |
| **Low** | 1月内 | 前瞻性研究、实验性功能、长期趋势 |

## 自动化规则

### 触发条件
1. 标题包含关键词：update, algorithm, ranking, core, deprecated
2. 内容涉及：schema changes, API updates, guideline updates
3. 来源：官方博客、开发者文档、产品更新

### 去重机制
- 基于标题相似度（Levenshtein距离）
- 相同URL不重复创建
- 7天内相同来源不重复

### 智能分类
- 算法更新 → Algorithm
- Schema/代码 → Technical
- 内容指南 → Content
- 平台功能 → Strategy

## 示例输出

运行后会生成类似这样的迭代需求：

```
✅ Saved to Supabase: [Algorithm] Google March 2024 Core Update...
✅ Saved to Supabase: [Strategy] AI Overview Optimization for Medical Queries...
✅ Saved to Supabase: [Technical] Schema.org 2024 MedicalEntity Types...
```

其他项目可以通过API读取这些需求并安排实施。

## 文件位置

| 文件 | 路径 | 用途 |
|------|------|------|
| 监控脚本 | `scripts/monitor_and_generate.py` | 主程序 |
| 建表SQL | `scripts/create_geo_iterations_table.sql` | 数据库初始化 |
| 日志输出 | `logs/monitor.log` | 运行日志 |
| JSON备份 | `data/auto_iterations.json` | 本地备份 |
