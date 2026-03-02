import Link from "next/link";
import { ArrowLeft, ArrowRight, TrendingUp, Building2, Stethoscope } from "lucide-react";
import { notFound } from "next/navigation";

const CASE_STUDIES = {
  "beverly-hills": {
    title: "Elite Aesthetic Center",
    location: "Beverly Hills, California",
    type: "Plastic Surgery",
    icon: Building2,
    results: [
      { label: "AI Visibility Score", from: "28/100", to: "82/100", change: "+193%" },
      { label: "Monthly AI Referrals", from: "0", to: "47", change: "NEW" },
      { label: "Consultation Bookings", from: "Baseline", to: "+156%", change: "vs Q3" },
      { label: "Revenue from AI", from: "$0", to: "$1.2M", change: "6 months" },
    ],
    content: `
## Client Profile

**Elite Aesthetic Center** is a premier Beverly Hills plastic surgery practice with:
- 500+ 5-star reviews on Google and RealSelf
- Board-certified surgeons with Ivy League credentials  
- State-of-the-art surgical facility
- 15+ years of established reputation

## The Challenge

Despite their stellar reputation, they were completely invisible in AI search results. When potential patients asked ChatGPT, Claude, or Perplexity about breast augmentation or facelifts in Beverly Hills, competitors were consistently recommended—not them.

**Estimated monthly loss: $180,000** in potential procedure bookings

## Our Solution: Aesthetic Intent Interceptor Protocol

### Phase 1: Foundation (Days 1-30)
- Implemented comprehensive Medical Schema markup
- Created structured data for all 47 procedures
- Built AI-readable service catalog with llms.txt
- Published 12 deep-dive articles targeting AI-cited queries

### Phase 2: Authority Seeding (Days 31-60)
- Established citations in Healthline, WebMD, and Medical News Today
- Secured mentions in 8 Reddit communities
- Created 15 RealSelf educational answers

### Phase 3: Intent Capture (Days 61-90)
- Optimized for "Beverly Hills + [procedure]" entity relationships
- Built neighborhood-specific content clusters
- Implemented location-aware semantic markup

## The Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| AI Visibility Score | 28/100 | 82/100 | +193% |
| Monthly AI Referrals | 0 | 47 | NEW |
| Consultation Bookings | Baseline | +156% | vs. Q3 |
| Revenue from AI Source | $0 | $1.2M | 6-month |

### Client Testimonial

"The transformation was unbelievable. Within 60 days, our front desk started reporting that patients were finding us through ChatGPT. By day 90, we had to hire an additional patient coordinator just to handle the influx."

— Dr. Sarah Chen, Medical Director

## Key Success Factors

1. **Medical-Specific GEO Expertise**: Understanding how AI engines evaluate medical authority
2. **Semantic Content Architecture**: Building content AI engines can parse as authoritative answers
3. **Rapid Authority Building**: Aggressive placement in high-weight medical knowledge sources
4. **Continuous Optimization**: Weekly monitoring of AI response patterns
    `,
  },
  "miami-dental": {
    title: "Miami Implant Specialists",
    location: "Miami, Florida",
    type: "Dental Implants",
    icon: Stethoscope,
    results: [
      { label: "AI Visibility Score", from: "18/100", to: "74/100", change: "+311%" },
      { label: "Monthly AI Referrals", from: "0", to: "89", change: "NEW" },
      { label: "Implant Consultations", from: "Baseline", to: "+234%", change: "vs Year Ago" },
      { label: "Revenue Recovered", from: "$0", to: "$3.4M", change: "Annual" },
    ],
    content: `
## Client Profile

**Miami Implant Specialists** is a high-end dental implant center featuring:
- On-site 3D imaging and CAD/CAM technology
- Board-certified prosthodontist with 20+ years experience
- 1,200+ successful implant procedures annually
- State-of-the-art surgical suite

## The Challenge

The practice was hemorrhaging high-value implant patients to competitors through AI search diversion. Their competitor across town—who opened 3 years after them—was consistently recommended by AI engines.

**Annual revenue loss: $3.4M**

## Our Solution: Dental Implant Empire Protocol

### Phase 1: Technical Foundation (Days 1-30)
- Deployed comprehensive Dental Schema markup
- Implemented procedure-specific structured data
- Created AI-readable implant service catalog
- Optimized 200+ before/after cases

### Phase 2: Authority Seeding (Days 31-75)
- Established presence in r/dentistry (45 helpful answers)
- Created 22 detailed RealSelf responses
- Published guest articles on Dentistry Today

### Phase 3: Competitive Displacement (Days 76-120)
- Built "Miami + [procedure]" entity optimization
- Created bilingual semantic markup
- Implemented patient video testimonial schema

## The Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| AI Visibility Score | 18/100 | 74/100 | +311% |
| Monthly AI Referrals | 0 | 89 | NEW |
| Implant Consultations | Baseline | +234% | vs. Previous Year |
| Prevented Revenue Loss | — | $3.4M | Annually |

### Client Testimonial

"The first month was frustrating—lots of work, no visible results. But around day 45, something shifted. We started getting calls from patients saying, 'ChatGPT recommended you.' By month 4, our consultation calendar was fully booked 3 weeks out."

— Dr. Marcus Rodriguez, Practice Owner

## Long-Term Performance (18 months)

- AI-referred patients: 34% of total new patients
- Average case value from AI: $21,400 (vs $14,200 from Google Ads)
- Patient acquisition cost: 60% lower than paid advertising
- Total revenue from AI-referred patients: $8.7M
    `,
  },
  "california-medspa": {
    title: "Radiance MedSpa Network",
    location: "California (6 locations)",
    type: "Medical Aesthetics",
    icon: TrendingUp,
    results: [
      { label: "AI Visibility", from: "35/100", to: "69/100", change: "+97%" },
      { label: "Monthly AI Referrals", from: "0", to: "186", change: "NEW" },
      { label: "Revenue from AI", from: "$0", to: "$4.2M", change: "6 months" },
      { label: "Marketing Cost", from: "$145K/mo", to: "$98K/mo", change: "-32%" },
    ],
    content: `
## Client Profile

**Radiance MedSpa Network** operates 6 locations across California:
- Los Angeles, San Diego, San Francisco
- Pasadena, Newport Beach, Santa Monica
- Specialties: Injectable Fillers, Laser Treatments, Body Contouring
- Rapid expansion phase over 4 years

## The Challenge

The chain faced a critical paradox: More locations = More visibility problems. Each new location struggled to establish independent AI presence while brand recognition existed.

**Total annual loss across 6 locations: $2.63M**

## Our Solution: Multi-Location GEO Strategy

### Phase 1: Unified Knowledge Graph (Days 1-45)
- Created hierarchical structured data (brand → locations → services)
- Implemented location-specific service catalogs
- Built content strategy with local customization

### Phase 2: Location Authority Building (Days 46-90)
- Neighborhood-specific content for each location
- Review aggregation across 2,400+ reviews
- Local partnership citations

### Phase 3: Cross-Location Authority (Days 91-120)
- Brand-level authority establishment
- Multi-location comparison content
- Competitive moat building

## The Results

| Metric | Total Impact |
|--------|--------------|
| Combined AI Visibility | Avg 35 → 69 (+97%) |
| Total AI Referrals (mo) | 0 → 186 |
| Revenue from AI Source | $4.2M (6 months) |
| Marketing Cost Reduction | 45% |

### ROI Analysis

**Investment:**
- GEO Implementation: $85K
- Ongoing optimization: $12K/month
- Total Year 1: $229K

**Return:**
- Additional revenue: $8.4M
- Marketing savings: $564K
- **ROI: 3,811%**

## Network Effects Observed

1. **Brand Recognition Amplification**: AI engines associated "Radiance" with "California MedSpa"
2. **Content Efficiency**: One comprehensive guide = Six location-specific versions
3. **Review Velocity**: Combined 2,400+ reviews created authority momentum

### Client Testimonial

"The key was treating each location as both independent AND connected. The GEO strategy understood that nuance."

— Jennifer Walsh, Marketing Director
    `,
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

  const Icon = study.icon;

  return (
    <div className="min-h-screen bg-navy text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-primary text-sm font-medium">{study.type}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{study.title}</h1>
          <p className="text-gray-400">{study.location}</p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {study.results.map((result, idx) => (
            <div key={idx} className="bg-navy-light rounded-xl p-6 border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">{result.label}</p>
              <div className="text-2xl font-bold text-primary mb-1">{result.to}</div>
              <div className="text-xs text-gray-500">From {result.from} • {result.change}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: study.content.replace(/\n/g, '<br/>') }}
        />

        {/* CTA */}
        <div className="mt-16 bg-navy-light rounded-2xl p-8 border border-gray-800 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Similar Results?</h2>
          <p className="text-gray-400 mb-6">
            Get your free AI visibility audit and discover your practice's transformation potential.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get Your Free Audit
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
