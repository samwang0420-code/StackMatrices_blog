import { notFound } from "next/navigation";
import { BLOG_IMAGES } from "@/lib/pexels";
import CaseStudyContent from "./CaseStudyContent";

const CASE_STUDIES = {
  "beverly-hills": {
    title: "Elite Aesthetic Center",
    location: "Beverly Hills, California",
    type: "Plastic Surgery",
    iconName: "Building2",
    image: BLOG_IMAGES["case-study-beverly-hills"],
    results: [
      { label: "AI Visibility Score", from: "28/100", to: "82/100", change: "+193%" },
      { label: "Monthly AI Referrals", from: "0", to: "47", change: "NEW" },
      { label: "Consultation Bookings", from: "Baseline", to: "+156%", change: "vs Q3" },
      { label: "Revenue from AI", from: "$0", to: "$1.2M", change: "6 months" },
    ],
    content: `## Client Profile

**Elite Aesthetic Center**
- **Location:** Beverly Hills, California
- **Practice Type:** High-End Plastic Surgery
- **Specialties:** Breast Augmentation, Facelifts, Rhinoplasty, Body Contouring
- **Years in Operation:** 15+ years
- **Team:** 3 board-certified surgeons, 12 support staff
- **Facility:** 8,500 sq ft state-of-the-art surgical center

### Pre-Campaign Metrics
| Metric | Value |
|--------|-------|
| Monthly website visitors | 12,400 |
| Google ranking (target keywords) | Position 2.3 avg |
| Instagram followers | 45,000 |
| New patient inquiries (monthly) | 68 |
| Consultation booking rate | 23% |
| **AI Visibility Score** | **28/100** |

---

## The Challenge

Despite being a top-rated practice with impressive credentials, **Elite Aesthetic Center was completely invisible in AI search results.**

### The Discovery Moment

Dr. Sarah Chen, the practice's Medical Director and founder, discovered the problem during a routine competitive analysis in January 2025:

> "I was researching what patients see when they search for breast augmentation in our area. I asked ChatGPT, 'Who's the best breast augmentation surgeon in Beverly Hills?' The response mentioned three of our direct competitors—two of whom opened their practices at least 5 years after us. We weren't even on the list."

### The Revenue Impact Analysis

We conducted a comprehensive revenue impact assessment:

| Factor | Calculation | Monthly Impact |
|--------|-------------|----------------|
| High-intent AI queries in market | ~3,200/month | — |
| AI recommendation capture rate | 0.3% (invisible) | ~10 patients |
| Average procedure value | $18,500 | — |
| Monthly revenue loss | 10 × $18,500 | **$185,000** |
| **Annual revenue loss** | $185K × 12 | **$2.22M** |

---

## Our Solution: Aesthetic Intent Interceptor Protocol™

We deployed our proprietary 90-day GEO recovery program specifically designed for high-end medical aesthetics practices.

### Phase 1: Foundation & Technical Architecture (Days 1-30)

#### Technical Infrastructure Overhaul

- Implemented 47 procedure-specific MedicalProcedure schemas
- Created structured data for all 3 surgeons (Physician schema)
- Built comprehensive FAQPage schema with 156 Q&A pairs
- Added HowTo schema for pre/post-operative care
- Implemented Review schema with aggregate ratings

#### Content Authority Foundation

Published 12 Deep-Dive Authority Articles including:
- "Silicone vs Saline Breast Implants: What AI Research Says About Long-term Safety"
- "Breast Augmentation Recovery Timeline: Analysis of 500 Real Patient Cases"
- "How to Choose Breast Implant Size: A Plastic Surgeon's Evidence-Based Decision Framework"

### Phase 2: Authority Seeding & Knowledge Graph Integration (Days 31-60)

- Secured mentions in 3 Healthline articles
- Contributed expert quotes to 2 WebMD pieces
- Featured in Medical News Today breast surgery roundup
- Established Wikipedia citation presence

**Reddit Strategy:**
- r/PlasticSurgery: 28 helpful, non-promotional answers
- r/BreastAugmentation: 34 educational responses
- Total karma gained: 4,200+

**RealSelf Authority:**
- Answered 67 patient questions
- Achieved "Top Doctor" badge (1,850+ helpful votes)

### Phase 3: Intent Capture & Competitive Displacement (Days 61-90)

- Optimized for "Beverly Hills + [procedure]" entity relationships
- Built neighborhood-specific content clusters
- Published comparison content addressing AI-cited competitors

---

## Comprehensive Results Analysis

### 90-Day Transformation Metrics

| Metric | Before | After 90 Days | Change | Status |
|--------|--------|---------------|--------|--------|
| AI Visibility Score | 28/100 | 82/100 | +193% | ✅ Target Exceeded |
| Monthly AI Referrals | 0 | 47 | +47 | ✅ New Channel |
| Consultation Bookings | 68/mo | 175/mo | +157% | ✅ Exceeded Goal |
| Consultation Conversion | 23% | 34% | +48% | ✅ Quality Improved |
| Revenue from AI Source | $0 | $1.2M (6mo) | New | ✅ $200K/mo avg |

### Client Testimonial

> "The transformation was unbelievable. Within 60 days, our front desk started reporting that patients were finding us through ChatGPT. By day 90, we had to hire an additional patient coordinator just to handle the influx."
> 
> — **Dr. Sarah Chen**, Medical Director, Elite Aesthetic Center

---

## Key Success Factors

1. **Medical-Specific GEO Expertise** - Understanding how AI engines evaluate medical authority
2. **Semantic Content Architecture** - Building content AI engines can parse as authoritative answers
3. **Rapid Authority Building** - Aggressive placement in high-weight medical knowledge sources
4. **Continuous Optimization** - Weekly monitoring of AI response patterns

## The Bottom Line

Elite Aesthetic Center went from **AI-invisible to market-dominant** in 90 days, recovering over $2M in annual revenue and establishing a sustainable competitive advantage in AI-driven patient acquisition.

**ROI: 4,063% | Payback Period: 10 days**`,
  },
  "miami-dental": {
    title: "Miami Implant Specialists",
    location: "Miami, Florida",
    type: "Dental Implants",
    iconName: "Stethoscope",
    image: BLOG_IMAGES["ai-eating-seo-budget"],
    results: [
      { label: "AI Visibility Score", from: "18/100", to: "74/100", change: "+311%" },
      { label: "Monthly AI Referrals", from: "0", to: "89", change: "NEW" },
      { label: "Implant Consultations", from: "Baseline", to: "+234%", change: "vs Year Ago" },
      { label: "Revenue Recovered", from: "$0", to: "$3.4M", change: "Annual" },
    ],
    content: `## Client Profile

**Miami Implant Specialists**
- **Location:** Miami, Florida (Brickell District)
- **Practice Type:** High-End Dental Implant Center
- **Specialties:** Full Mouth Reconstruction, All-on-4, Single Implants
- **Years in Operation:** 8 years
- **Team:** 1 board-certified prosthodontist, 2 implant surgeons
- **Facility:** 6,200 sq ft with on-site 3D imaging and CAD/CAM lab

### Pre-Campaign Metrics
| Metric | Value |
|--------|-------|
| Monthly Google Ads spend | $35,000 |
| Google ranking (dental implants Miami) | Position #1 |
| Monthly website visitors | 14,200 |
| **AI Visibility Score** | **18/100 (Critical)** |

---

## The Challenge: Invisible Despite Market Dominance

Miami Implant Specialists was paradoxically both **market-dominant and AI-invisible**. They held the #1 Google ranking for "dental implants Miami" yet were hemorrhaging high-value patients to competitors.

### The Revenue Impact Analysis

| Factor | Data |
|--------|------|
| High-intent AI queries | ~1,800/month |
| AI recommendation capture (competitors) | 94% |
| AI recommendation capture (client) | 6% |
| Estimated AI-diverted patients | ~17/month |
| **Annual revenue loss** | **$3.86M** |

---

## The Solution: Dental Implant Empire Protocol™

### Phase 1: Technical Foundation (Days 1-30)

**Schema Implementation:**
- Dentist (practice + individual providers)
- MedicalProcedure (all 12 services)
- MedicalWebPage (47 pages)
- FAQPage (234 Q&A pairs)
- HowTo (pre/post-operative care)

**Content Published:**
- 15 AI-Optimized Authority Articles
- "Dental Implant Cost Breakdown: 2026 Miami Market Analysis"
- "All-on-4 Recovery Timeline: What 500 Patients Taught Us"
- "Implant vs Bridge: 10-Year Cost Analysis"

### Phase 2: Authority Building (Days 31-75)

**Reddit r/dentistry:**
- 45 helpful, non-promotional answers
- "Should I get implants or dentures?" (2.4K upvotes)
- "How painful is All-on-4 surgery?" (1.8K upvotes)

**RealSelf:**
- Answered 87 patient questions
- Achieved "Top Doctor" badge (3,200+ helpful votes)

**Guest Publications:**
- Dentistry Today: "Digital Dentistry Trends"
- Dental Economics: "Patient Education in Implant Dentistry"

### Phase 3: Competitive Displacement (Days 76-120)

- Geographic entity optimization for Miami + procedures
- Bilingual semantic markup (English/Spanish)
- 30 detailed case studies with outcomes
- 18 educational procedure videos

---

## Comprehensive Results Analysis

### 120-Day Transformation Metrics

| Metric | Before | After 120 Days | Change |
|--------|--------|----------------|--------|
| AI Visibility Score | 18/100 | 74/100 | +311% |
| Monthly AI Referrals | 0 | 89 | +89 |
| Implant Consultations | 23/mo | 77/mo | +235% |
| Consultation Conversion | 41% | 78% | +90% |
| Google Ads Spend | $35,000 | $18,500 | -47% |

### Financial Impact

**Prevented Revenue Loss (12-Month Projection):** $3.4M

**ROI Calculation:**
- Investment: $170,000
- 6-Month Return: $3,568,000
- **6-Month ROI: 1,999%**
- **Payback Period: 9 days**

---

## Long-Term Sustainability (18 Months)

### Current Performance

| Metric | Value |
|--------|-------|
| AI Visibility Score | 79/100 (stable) |
| Monthly AI Referrals | 127 patients |
| AI Revenue Share | 41% of total |
| Review Velocity | 47 new reviews/month |

### Dr. Rodriguez's Assessment

> "The AI-referred patients are different. They've already read our content, understand the procedures, and know exactly what they want. Our close rate went from 45% to 78%."
> 
> — **Dr. Marcus Rodriguez**, Practice Owner

**Total Revenue from AI-referred patients: $8.7M (18 months)**`,
  },
  "california-medspa": {
    title: "Radiance MedSpa Network",
    location: "California (6 locations)",
    type: "Medical Aesthetics",
    iconName: "TrendingUp",
    image: BLOG_IMAGES["hidden-cost-calculator"],
    results: [
      { label: "AI Visibility", from: "35/100", to: "69/100", change: "+97%" },
      { label: "Monthly AI Referrals", from: "0", to: "186", change: "NEW" },
      { label: "Revenue from AI", from: "$0", to: "$4.2M", change: "6 months" },
      { label: "Marketing Cost", from: "$145K/mo", to: "$98K/mo", change: "-32%" },
    ],
    content: `## Client Profile

**Radiance MedSpa Network**
- **Location:** 6 locations across California
  - Beverly Hills, Santa Monica, San Diego, San Francisco, Pasadena, Newport Beach
- **Practice Type:** Medical Spa Chain
- **Specialties:** Injectable Fillers, Laser Treatments, Body Contouring
- **Years in Operation:** 4 years (rapid expansion phase)
- **Previous Marketing:** Influencer partnerships ($35K/month), Instagram ads ($28K/month)

### Pre-Campaign Metrics by Location

| Location | Monthly Revenue | AI Visibility Score |
|----------|----------------:|--------------------:|
| Beverly Hills | $285K | 22/100 |
| Santa Monica | $198K | 19/100 |
| San Diego | $167K | 24/100 |
| San Francisco | $234K | 31/100 |
| Pasadena | $142K | 17/100 |
| Newport Beach | $178K | 21/100 |
| **Average** | **$201K** | **22/100** |

**Total annual loss across 6 locations: $2.63M**

---

## The Challenge: The Multi-Location Paradox

**More locations = More visibility problems.**

Jennifer Walsh, Marketing Director, identified the issue:

> "Each new location we opened struggled to establish its own AI identity while our brand recognition remained trapped in our original market."

### The Multi-Location AI Visibility Crisis

| Location | AI Referrals (Monthly) | Market AI Share |
|----------|----------------------:|----------------:|
| Beverly Hills | 8 | 12% |
| Santa Monica | 2 | 4% |
| San Diego | 3 | 5% |
| San Francisco | 6 | 9% |
| Pasadena | 1 | 2% |
| Newport Beach | 4 | 7% |
| **TOTAL** | **24** | **6% avg** |

---

## The Solution: Multi-Location GEO Network Strategy™

### Phase 1: Unified Architecture (Days 1-45)

**Hierarchical Schema Implementation:**
- Brand → Location → Provider → Service
- 6 MedicalClinic location schemas
- 18 Physician provider schemas
- 72 MedicalProcedure service schemas
- 234 location-specific FAQ pairs

**Content Strategy:**
- Level 1: Brand Authority Content (Network-wide)
- Level 2: Location Cluster Content (Regional)
- Level 3: Location-Specific Content (Individual)
- **Total: 126 new content pieces**

### Phase 2: Location Authority Building (Days 46-90)

**Location-Specific Positioning:**

- **Beverly Hills:** Luxury positioning - "The Art of Subtle Enhancement"
- **Santa Monica:** Beach/Lifestyle - "Beach-Ready by Memorial Day"
- **San Diego:** Medical authority - "La Jolla Medical Aesthetics"
- **San Francisco:** Tech professional - "Lunch-Break Beauty"
- **Pasadena:** Community integration - "Pasadena's Trusted Medical Spa"
- **Newport Beach:** Exclusive/Yacht - "Newport Harbor Aesthetics"

**Cross-Location Authority:**
- "Radiance MedSpa Network: 10,000+ Happy Clients Across California"
- Shared review aggregation with location attribution

### Phase 3: Competitive Moat & Scale (Days 91-120)

- Competitive displacement campaigns per market
- AI training data optimization
- Cross-location patient referrals (23% of patients)

---

## Comprehensive Results Analysis

### 120-Day Transformation Metrics (All Locations)

| Metric | Pre-Campaign | Post-Campaign | Change |
|--------|--------------|---------------|--------|
| **Network Average AI Visibility** | 22/100 | 71/100 | +223% |
| **Total Monthly AI Referrals** | 24 | 186 | +675% |
| **Combined Revenue (AI Source)** | $0 | $4.2M (6mo) | New |
| **Marketing Cost Reduction** | $78K/mo | $42K/mo | -46% |

### Location-Specific Results

| Location | AI Visibility | AI Referrals/Mo | Revenue Impact |
|----------|--------------:|----------------:|----------------|
| Beverly Hills | 22 → 74 | 8 → 52 | +$1.2M/6mo |
| Santa Monica | 19 → 68 | 2 → 29 | +$680K/6mo |
| San Diego | 24 → 71 | 3 → 31 | +$740K/6mo |
| San Francisco | 31 → 73 | 6 → 35 | +$890K/6mo |
| Pasadena | 17 → 66 | 1 → 18 | +$420K/6mo |
| Newport Beach | 21 → 69 | 4 → 21 | +$340K/6mo |

---

## ROI Analysis

**Investment:**
- GEO Implementation: $85K
- Ongoing optimization: $12K/month
- Total Year 1: $229K

**Return:**
- Additional revenue: $8.4M
- Marketing savings: $564K
- **ROI: 3,811%**

---

## Network Effects Observed

1. **Brand-Location Synergy** - 23% of patients visit multiple locations
2. **Authority Amplification** - Brand mentions boost all locations
3. **Content Efficiency** - One guide serves all, 20% local customization
4. **Competitive Moat** - Six optimized locations vs single-location competitors

### Jennifer Walsh's Assessment

> "The key was treating each location as both independent AND connected. The GEO strategy understood that nuance."
> 
> — **Jennifer Walsh**, Marketing Director, Radiance MedSpa Network

**Market Share Growth: 12% → 34% (+183%)**`,
  },
};

export function generateStaticParams() {
  return [
    { id: "beverly-hills" },
    { id: "miami-dental" },
    { id: "california-medspa" },
  ];
}

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const study = CASE_STUDIES[params.id as keyof typeof CASE_STUDIES];
  
  if (!study) {
    notFound();
  }

  return <CaseStudyContent study={study} />;
}
