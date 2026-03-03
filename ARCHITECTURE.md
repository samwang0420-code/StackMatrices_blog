# StackMatrices 完整系统架构

## 📐 架构总览

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              STACKMATRICES PLATFORM                          │
│                    GEO Agency for Medical Practices                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐     ┌─────────────────────┐     ┌───────────────┐ │
│  │   WEB FRONTEND      │     │   CONTENT SYSTEM    │     │   MONITORING  │ │
│  │   (Next.js 14)      │◄────┤   (Blog + Cases)    │◄────┤   & ANALYTICS │ │
│  │                     │     │                     │     │               │ │
│  │  • React + TS       │     │  • Static Pages     │     │  • Industry   │ │
│  │  • Tailwind CSS     │     │  • Markdown         │     │    Monitor    │ │
│  │  • Static Export    │     │  • Pexels Images    │     │  • Supabase   │ │
│  └──────────┬──────────┘     └─────────────────────┘     └───────────────┘ │
│             │                                                               │
│             ▼                                                               │
│  ┌─────────────────────┐                                                    │
│  │   CLOUDFLARE        │                                                    │
│  │   PAGES (CDN)       │                                                    │
│  │                     │                                                    │
│  │  • Global Edge      │                                                    │
│  │  • Auto Deploy      │                                                    │
│  │  • SSL + HTTP/2     │                                                    │
│  └─────────────────────┘                                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                              DATA & STORAGE LAYER                            │
│                                                                             │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────┐ │
│  │    SUPABASE             │  │    GITHUB REPO          │  │   JSON API  │ │
│  │    POSTGRESQL           │  │    (Content + Config)   │  │   Endpoints │ │
│  │                         │  │                         │  │             │ │
│  │  • geo_implementation_  │  │  • Source Control       │  │  • tech-    │ │
│  │    iterations           │  │  • Version History      │  │    iterations│ │
│  │  • articles             │  │  • Collaborative        │  │  • articles │ │
│  │  • tech_iterations      │  │    Editing              │  │             │ │
│  └─────────────────────────┘  └─────────────────────────┘  └─────────────┘ │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                              TOOLS & AUTOMATION                              │
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐ │
│  │  KNOCK-DOOR-PDF     │  │  INDUSTRY MONITOR   │  │  SKILL SHARING      │ │
│  │  (Report Generator) │  │  (Content Scout)    │  │  (Agent Sync)       │ │
│  │                     │  │                     │  │                     │ │
│  │  • Dynamic Content  │  │  • 14 Sources       │  │  • Git Sync         │ │
│  │  • Dynamic Scores   │  │  • AI Analysis      │  │  • Cross-Agent      │ │
│  │  • Multi-Industry   │  │  • Auto-Generate    │  │    Collaboration    │ │
│  └─────────────────────┘  │    Iterations       │  │                     │ │
│                           └─────────────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ 技术栈详情

### 1. Web Frontend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | React framework with SSG |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Components** | Lucide React | Icon library |
| **Markdown** | react-markdown + remark-gfm | Blog content rendering |
| **Build** | Static Export | GitHub Pages deployment |

**Page Structure**:
```
src/app/
├── page.tsx                 # Homepage
├── layout.tsx               # Root layout + metadata
├── globals.css              # Global styles
├── services/page.tsx        # Services listing
├── pricing/page.tsx         # Pricing tiers
├── cases/
│   ├── page.tsx            # Case studies grid
│   └── [id]/
│       ├── page.tsx        # Dynamic case study
│       └── CaseStudyContent.tsx
├── blog/
│   ├── page.tsx            # Blog listing
│   └── [id]/
│       └── page.tsx        # Dynamic blog post
├── contact/page.tsx         # Contact form
├── about/page.tsx           # Company story
├── faq/page.tsx             # FAQ page
├── terms/page.tsx           # Terms of service
├── privacy/page.tsx         # Privacy policy
└── analysis-request/        # Lead capture form
    └── page.tsx
```

### 2. Content System

**Blog Architecture**:
```typescript
// src/app/blog/[id]/page.tsx
interface BlogPost {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;  // Markdown template literal
}

const BLOG_POSTS: Record<string, BlogPost> = {
  "ai-eating-seo-budget": { ... },
  "6-month-playbook": { ... },
  // ... 6 posts total
};
```

**Image Pipeline**:
```
Pexels API → Static URLs → Next.js Image (unoptimized)
     ↓
src/lib/pexels.ts (URL mapping)
```

### 3. Database Layer (Supabase)

**Table Schema**:

```sql
-- Primary: Industry monitor generated requirements
CREATE TABLE geo_implementation_iterations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Algorithm', 'Technical', 'Content', 'Strategy')),
    priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    status TEXT NOT NULL DEFAULT 'backlog',
    estimated_hours INTEGER,
    actual_hours INTEGER,
    tags TEXT[] DEFAULT '{}',
    affects TEXT[] DEFAULT '{}',
    source_type TEXT,
    source_url TEXT,
    acceptance_criteria TEXT[] DEFAULT '{}',
    implementation_steps TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Secondary: Blog articles (for future dynamic use)
CREATE TABLE articles (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0
);

-- Tertiary: Internal tech debt
CREATE TABLE tech_iterations (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT DEFAULT 'backlog'
);
```

**Indexes**:
- `idx_geo_iterations_priority_status` (composite)
- `idx_geo_iterations_affects` (GIN for arrays)
- `idx_geo_iterations_tags` (GIN for arrays)

### 4. PDF Generation System (knock-door-pdf)

```
┌─────────────────────────────────────────┐
│         KNOCK-DOOR-PDF SKILL            │
│                                         │
│  Input:                                 │
│  ├── assessment_data (scores)           │
│  └── content (dynamic copy)             │
│                                         │
│  Process:                               │
│  ├── PDFReportGenerator                 │
│  │   ├── generate_cover()              │
│  │   ├── generate_pain_points()        │
│  │   ├── generate_competitor_table()   │
│  │   ├── generate_revenue_calc()       │
│  │   ├── generate_radar_chart()        │
│  │   └── generate_action_plan()        │
│  │                                       │
│  └── ReportLab (PDF output)            │
│                                         │
│  Output: 6-page PDF report             │
└─────────────────────────────────────────┘
```

**Dynamic Parameters**:
```python
# Fully customizable
content = {
    'industry_name': 'Plastic Surgery',
    'pain_points': ['...', '...', '...'],
    'competitors': ['Name A', 'Name B', 'Name C'],
    'metrics': {
        'monthly_traffic': 25000,
        'avg_deal': 18500,
        'conversion_rate': 0.025
    }
}

# Dynamic competitor scores
assessment_data = {
    'scores': {'ai_visibility': {'score': 28}},
    'competitors': [
        {'name': 'Comp A', 'ai_visibility': 82, ...},
        {'name': 'Comp B', 'ai_visibility': 76, ...}
    ]
}
```

### 5. Industry Monitor System

```
┌─────────────────────────────────────────┐
│       INDUSTRY MONITOR SYSTEM           │
│                                         │
│  Sources (14):                          │
│  ├── Google Search Central (RSS)        │
│  ├── Google Search Status (API)         │
│  ├── OpenAI Blog (RSS)                  │
│  ├── Anthropic Blog (RSS)               │
│  ├── Perplexity Blog (Scraping)         │
│  ├── Bing Webmaster (RSS)               │
│  └── ... (8 more)                       │
│                                         │
│  Analysis Pipeline:                     │
│  ├── Fetch Content                      │
│  ├── Pattern Matching                   │
│  │   ├── algorithm_update               │
│  │   ├── breaking_change                │
│  │   ├── feature_release                │
│  │   └── best_practice                  │
│  ├── AI Analysis (DeepSeek)             │
│  └── Generate Iteration                 │
│                                         │
│  Storage: Supabase / JSON               │
└─────────────────────────────────────────┘
```

**Change Detection Patterns**:
```python
CHANGE_PATTERNS = {
    "algorithm_update": [
        r"core\s+update", r"algorithm\s+change", ...
    ],
    "breaking_change": [
        r"deprecated", r"sunset", ...
    ],
    ...
}
```

### 6. Skill Sharing Architecture

```
┌─────────────────────────────────────────┐
│        SKILL SHARING SYSTEM             │
│                                         │
│  Agent A (This Machine)                 │
│  ├── skills/knock-door-pdf/             │
│  │   ├── SKILL.md                       │
│  │   ├── core/pdf_generator.py          │
│  │   └── examples/                      │
│  └── changes pushed to shared dir       │
│                                         │
│              │                          │
│              ▼                          │
│  /workspace-geo-arch/skills/            │
│  (Git-synced shared directory)          │
│                                         │
│              │                          │
│              ▼                          │
│  Agent B (Other Machine)                │
│  ├── reads from shared dir              │
│  └── auto-syncs via cron                │
│                                         │
│  Sync: Hourly Git pull/push             │
└─────────────────────────────────────────┘
```

---

## 📦 部署架构

### Cloudflare Pages (Static Hosting)

```
GitHub Repository
       │
       ▼ (Push to main)
Cloudflare Pages
├── Build: next build
├── Output: /dist (static)
├── CDN: Global edge network
└── URL: https://stackmatrices.com
```

**Build Configuration**:
```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true  // Required for static export
  }
};
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://fixemvsckapejyfwphft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***
DEEPSEEK_API_KEY=***
```

---

## 🔄 数据流

### User Journey

```
1. DISCOVERY
   └── Google / X / LinkedIn / YouTube
       ↓
2. LANDING
   └── Homepage (Value proposition)
       ↓
3. EDUCATION
   └── Blog / Case Studies / Insights
       ↓
4. CONVERSION
   └── /analysis-request (Form submission)
       ↓
5. FOLLOW-UP
   └── Email (sam.wang01@icloud.com)
```

### Content Creation Flow

```
Industry Monitor
       │
       ├── Detects Change
       ├── Analyzes Impact
       └── Generates Iteration
               ↓
       Supabase / JSON Storage
               ↓
       Other Agents Consume
       └── Implement Changes
```

---

## 📊 监控与指标

### Key Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Build Success | 100% | ✅ 100% |
| Page Load (LCP) | <2.5s | 🟡 ~3s |
| SEO Score | >90 | 🟡 ~85 |
| Type Errors | 0 | 🟡 18 warnings |

### Health Checks

```bash
# Hourly cron
0 * * * * python3 scripts/industry_monitor.py

# Daily
0 0 * * * python3 scripts/generate_report.py
```

---

## 🛡️ 安全架构

### Data Protection
- **Supabase RLS**: Public read, authenticated write
- **Env Variables**: Service role key protected
- **No PHI**: HIPAA-aware, no patient data stored

### Access Control
```sql
-- Public can read
CREATE POLICY "Allow public read" FOR SELECT;

-- Only authenticated can write
CREATE POLICY "Allow authenticated write" FOR ALL
  USING (auth.role() = 'authenticated');
```

---

## 🚀 扩展路线图

### Phase 1: Foundation ✅
- [x] Website with 6 blog posts
- [x] PDF skill with dynamic content
- [x] Database schema
- [x] Industry monitor

### Phase 2: Growth 🔄
- [ ] 20+ blog posts
- [ ] Email newsletter system
- [ ] Free tools (AI Visibility Checker)
- [ ] YouTube content integration

### Phase 3: Automation 📝
- [ ] Auto-deploy from content monitor
- [ ] AI-generated blog posts
- [ ] Predictive iteration suggestions
- [ ] Multi-language support

---

## 📁 项目结构

```
/root/.openclaw/workspace/blog/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # Shared components
│   ├── lib/                    # Utilities & configs
│   │   ├── constants.ts       # Site config
│   │   ├── pexels.ts          # Image URLs
│   │   └── ...
│   └── data/                   # Static data (JSON)
├── scripts/                    # Automation scripts
│   ├── industry_monitor.py    # Content monitoring
│   ├── generate_report.py     # Analytics
│   └── *.sql                  # Database schemas
├── skills/                     # Agent skills
│   └── knock-door-pdf/        # PDF generator
├── docs/                       # Documentation
├── dist/                       # Build output
├── public/                     # Static assets
└── next.config.mjs            # Build config
```

---

*Last Updated: 2026-03-03*
*Version: 1.0*
