# Daily GEO SEO Health Report

**Date:** Friday, April 24th, 2026 - 8:00 AM (UTC)  
**Checker:** cron:daily-geo-checker-001

---

## Summary

| Metric | Status | Notes |
|--------|--------|-------|
| Blog Articles | ✅ 86 | In content/blog/ |
| Live Pages | ✅ +80 | In dist/ |
| FAQ Schema (front-matter) | ✅ 1/86 | botox-cost-face-2026.md has FAQ |
| JSON-LD Infrastructure | ✅ Active | jsonld.ts + constants.ts in src/ |
| Entity Optimization | ⚠️ Partial | Medical keywords in content |
| Schema Markup in HTML | ❌ Missing | Not implemented in templates |

---

## Detailed Findings

### ✅ 1. Blog Content Ready
- **86 articles** in `content/blog/`
- Topics: Botox, Dental Implants, PRP Therapy, Invisalign, etc.
- Medical/ GEO keywords present in front-matter

### ⚠️ 2. FAQ Schema (Front-Matter)
Only **1 of 86** articles has structured FAQ in front-matter:
- ✅ `botox-cost-face-2026.md` - has `faq:` block
- ❌ Others - no front-matter FAQ structured data

### ✅ 3. JSON-LD Infrastructure
Code infrastructure exists:
```
src/lib/constants.ts  - Schema.org @context
src/lib/jsonld.ts    - JSON-LD generator
```
But NOT applied in article templates (needs implementation).

### ⚠️ 4. Entity Optimization (Medical Keywords)
Content contains medical keywords:
- "Botox", "Dermal Fillers", "Dental Implant"
- "Invisalign", "PRP Therapy"
- US city names (Fresno, Sacramento, San Diego, etc.)

But no explicit Entity schema (@type: MedicalClinic, etc.)

---

## Issues Found

### Issue 1: JSON-LD Not Rendered in Output
**Files:** `src/pages/blog/[slug].tsx` (or similar)
**Problem:** jsonld.ts exists but not imported in page templates
**Fix:** Import and inject JSON-LD script tags in article pages

### Issue 2: FAQ Schema Only in 1 Article
**Current:** 1/86 has front-matter FAQ
**Fix:** Add FAQ front-matter to top 20 articles for GEO boost

### Issue 3: No ArticleIndex Schema
**Problem:** No `schema.org/ArticleIndex` for paginated pages
**Fix:** Add ArticleIndex schema for /blog/ page

---

## Recommendations

| Priority | Action | Impact |
|----------|--------|--------|
| 🔴 High | Implement JSON-LD in article template | SEO direct |
| 🟡 Medium | Add FAQ to top 20 articles | SERP feature |
| 🟢 Low | Add ArticleIndex schema | Internal SEO |

---

## Next Check

**Scheduled:** Saturday, April 25th, 2026 - 8:00 AM (UTC)