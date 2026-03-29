# GEO SEO Health Report
**Date:** Sunday, March 29th, 2026 — 8:00 AM (UTC)  
**Blog:** https://stackmatrices.com  
**Cron:** daily-geo-checker-001

---

## 📊 Summary

| Category | Status | Notes |
|---|---|---|
| Blog Articles | ✅ 10 published | Active blog structure |
| JSON-LD Library | ✅ Complete | `jsonld.ts` + `schema-org.tsx` both functional |
| FAQ Schema | ⚠️ Partial | Only active on `[slug]` dynamic route |
| Live JSON-LD Tags | ❌ Missing | No `<script type="application/ld+json">` in rendered pages |
| Medical Keywords | ✅ Strong | 144 mentions across 10 articles |
| Entity Optimization | ✅ Present | Medical/dental content well-covered |
| Experiment Tracker | ⚠️ Stale | Week 4 report: 0 posts published in 3 weeks |

---

## 🔍 Detailed Findings

### 1. Blog Articles (10 Total)

| Article | Medical Keywords | Schema | Notes |
|---|---|---|---|
| predictions-2026 | 11 | ❌ No live tag | Medical marketing focus |
| ai-optimized-content | 9 | ❌ No live tag | Dental implants used as example |
| ai-evaluates-medical-content | 15 | ❌ No live tag | Medical content AI eval |
| entity-seo-medical-practices | 18 | ❌ No live tag | Entity SEO focus |
| quality-guidelines | 8 | ❌ No live tag | Google quality guidelines |
| schema-markup-guide | 27 | ❌ No live tag | **Has FAQ in content, no live tag** |
| seo-geo-trends-2025 | 7 | ❌ No live tag | Research report |
| google-ai-overviews-2026 | 7 | ❌ No live tag | AI overviews focus |
| google-ai-mode-12-percent | 14 | ❌ No live tag | AI mode stats |
| enterprise-seo-transformation-2026 | 0 | ❌ No live tag | Generic enterprise |
| [slug] dynamic route | 3 | ✅ FAQPage + Article | **Only page with live JSON-LD** |

### 2. JSON-LD Library Analysis

**`src/lib/jsonld.ts`** ✅ Excellent
- `generateArticleJsonLd()` — BlogPosting schema
- `generateSoftwareApplicationJsonLd()` — with AggregateRating
- `generateOrganizationJsonLd()` — Organization + sameAs
- `generateWebsiteJsonLd()` — with SearchAction
- `generateBreadcrumbJsonLd()` — BreadcrumbList
- `generateFaqJsonLd()` — FAQPage with Question/Answer

**`src/components/schema-org.tsx`** ✅ Good
- `generateSkillSchema()` — SoftwareApplication
- `generateFAQSchema()` — FAQPage
- `generateOrganizationSchema()` — Organization
- `generateBreadcrumbSchema()` — BreadcrumbList
- `generateArticleSchema()` — Article

**`src/app/blog/schema.ts`** ✅ Available
- ARTICLE_SCHEMA, FAQ_SCHEMA, ORGANIZATION_SCHEMA templates

**Problem:** These schemas exist in code but are **not rendered** into `<script type="application/ld+json">` tags on any static article page.

### 3. FAQ Schema Status

- **Schema library:** ✅ `generateFaqJsonLd()` ready
- **FAQSection component:** ✅ Interactive accordion exists
- **`schema-markup-guide` article:** Contains FAQ examples in content
- **Live rendering:** ❌ No `<script type="application/ld+json">` on any blog page except `[slug]`
- **Root layout:** ❌ No global FAQ schema

### 4. Entity & Medical Keyword Optimization

**Strong coverage:**
- 144 medical keyword mentions across articles
- Dental implant content (impressive detail with Academy of Implant Dentistry stats, 95-98% success rates)
- Medical practice entity SEO deeply covered
- Schema markup guide has 27 medical keyword mentions

**Entity types covered:**
- Organization (StackMatrices branding)
- WebSite (site-level)
- Article/BlogPosting (article-level)
- FAQPage (dynamic route)
- BreadcrumbList (navigation)

### 5. JSON-LD Implementation Gap

**Only page with live JSON-LD tags:** `[slug]/page.tsx`
- Renders Article JSON-LD
- Renders FAQPage JSON-LD (when FAQ data present)
- Renders Organization JSON-LD
- Uses `<Script id="schema-org" strategy="beforeInteractive">`

**All other 9 static pages:** ❌ Missing live JSON-LD
- Hardcoded content in `page.tsx` files
- No schema markup rendered
- No FAQ schema despite FAQ content existing

### 6. Experiment Tracker

**Week 4 Report (Mar 08 - Mar 29):**
- Posts published: **0** ❌
- Schema markup added: **0** ❌
- Stale — no new content since early March

---

## 🚨 Critical Issues

### Issue 1: Missing JSON-LD on Static Pages
**Impact:** HIGH — AI search engines can't read article metadata
**Fix:** Add `Script` components to each static blog page rendering `generateArticleJsonLd()` + `generateOrganizationJsonLd()`

### Issue 2: FAQ Schema Not Live
**Impact:** MEDIUM — Lost FAQ rich result opportunities
**Fix:** Add FAQPage JSON-LD to `schema-markup-guide` and other content-heavy pages. The FAQSection component exists but isn't paired with JSON-LD script tags.

### Issue 3: No Schema on Root Layout
**Impact:** MEDIUM — Missing Organization + WebSite schema at site level
**Fix:** Add Organization + WebSite JSON-LD to `src/app/layout.tsx` (already has imports, just not rendered)

### Issue 4: Content Pipeline Stalled
**Impact:** HIGH — 0 posts in 3 weeks
**Fix:** Resume content generation pipeline

---

## ✅ What's Working

1. **Library infrastructure is solid** — jsonld.ts and schema-org.tsx are well-built
2. **Dynamic route [slug] has proper schema** — proof of concept exists
3. **Medical keyword density is strong** — 144 mentions show topical authority
4. **FAQSection component is polished** — interactive, sourced, well-designed
5. **Schema markup guide has detailed examples** — education layer exists

---

## 🛠 Recommended Actions

| Priority | Action | Effort |
|---|---|---|
| 🔴 HIGH | Add JSON-LD script tags to all 9 static blog pages | Medium |
| 🔴 HIGH | Resume content publication (0 in 3 weeks) | High |
| 🟡 MED | Add FAQPage JSON-LD to schema-markup-guide | Low |
| 🟡 MED | Add Organization+WebSite schema to root layout | Low |
| 🟢 LOW | Add MedicalOrganization schema for industry authority | Medium |
| 🟢 LOW | Add LocalBusiness schema for geo-targeted pages | Medium |

---

*Report generated by daily-geo-checker-001 cron job*