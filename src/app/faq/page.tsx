import { Metadata } from 'next';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Deep FAQ - Medical Aesthetics & Dental Questions Answered',
  description: 'Comprehensive answers to questions about Botox, dermal fillers, dental implants, and more. Expert-reviewed medical aesthetics and dental FAQs.',
  keywords: ['FAQ', 'Botox FAQ', 'Dental Implants FAQ', 'Medical Aesthetics Questions', 'Cosmetic Dentistry FAQ'],
};

// Deep FAQ data with structured categories
const FAQ_CATEGORIES = [
  {
    category: "Botox Treatments",
    questions: [
      {
        q: "How much does Botox cost in California?",
        a: "Botox costs in California range from $300-500 for basic treatment to $800-1,500 for premium areas. Prices vary by provider experience, location, and number of units needed. On average, most patients spend $400-600 per treatment session.",
        sources: ["ASPS Annual Report", "RealSelf Pricing Data"]
      },
      {
        q: "How long does Botox last?",
        a: "Botox results typically last 3-6 months. Duration depends on metabolism, treatment area, and dosage. First-time patients may notice results fading around 3 months, while regular users sometimes see effects lasting up to 6 months with consistent treatments.",
        sources: ["FDA Botox Guidelines", "ASPS"]
      },
      {
        q: "Is Botox safe?",
        a: "When administered by a licensed medical professional, Botox is FDA-approved and generally safe. Common side effects include mild swelling, bruising, or headache. Serious complications are rare when proper dosing and technique are used. Always choose a board-certified provider.",
        sources: ["FDA", "American Board of Medical Specialties"]
      },
      {
        q: "What is the difference between Botox and dermal fillers?",
        a: "Botox relaxes muscles to reduce dynamic wrinkles (expression lines), while fillers add volume to static wrinkles and areas lacking volume. Botox targets forehead lines, crow's feet, and frown lines. Fillers address cheeks, lips, nasolabial folds, and under-eye areas.",
        sources: ["ASDS", "RealSelf"]
      },
      {
        q: "How many Botox units do I need?",
        a: "Typical units: Forehead (10-20 units), Glabellar (10-20 units), Crow's feet (10-15 units per side), Jawline (40-60 units). Exact numbers depend on muscle strength and desired results. Consultation with a qualified provider is essential.",
        sources: ["ASPS Guidelines"]
      }
    ]
  },
  {
    category: "Dental Implants",
    questions: [
      {
        q: "How much do dental implants cost in Los Angeles?",
        a: "Dental implants in Los Angeles range from $3,000-4,000 for a single implant (including crown) to $4,000-5,000 for standard quality. Premium full-arch solutions like All-on-4 cost $20,000-30,000 per arch. Prices include consultation, surgery, abutment, and crown.",
        sources: ["ADA Dental Fees Survey", "Local Dental Offices"]
      },
      {
        q: "How long do dental implants last?",
        a: "With proper care, dental implants can last a lifetime. The titanium implant itself rarely fails, but the crown may need replacement after 10-15 years due to normal wear. Success rates are 95%+ for healthy patients with good oral hygiene.",
        sources: ["Journal of Oral Implantology", "ADA"]
      },
      {
        q: "What is the dental implant procedure timeline?",
        a: "Traditional timeline: Consultation (1-2 weeks) → Implant placement (1-2 hours) → Healing period (3-6 months) → Abtothment & Crown (2-3 weeks). Same-day implants are available for eligible patients but require thorough evaluation.",
        sources: ["AAID", "ICOI"]
      },
      {
        q: "Are dental implants covered by insurance?",
        a: "Coverage varies by plan. Medical insurance may cover part of implant surgery if related to accident or medical condition. Dental insurance typically covers 50-80% of crowns but may limit implant coverage. Flexible spending accounts (FSA) and payment plans can help manage costs.",
        sources: ["National Association of Dental Plans"]
      }
    ]
  },
  {
    category: "Invisalign",
    questions: [
      {
        q: "How much does Invisalign cost in California?",
        a: "Invisalign in California costs $3,000-4,000 for mild cases, $4,000-6,000 for moderate, and $6,000-9,000 for complex cases. Includes consultation, aligners, attachments, and retainers. Many providers offer 0% financing.",
        sources: ["Invisalign Official", "Consumer Guide"]
      },
      {
        q: "How long does Invisalign take?",
        a: "Treatment time ranges from 6-12 months for mild cases to 12-18 months for complex corrections. Compliance (wearing aligners 20-22 hours daily) is critical. Weekly aligner changes accelerate treatment for some patients.",
        sources: ["Invisalign Clinical Studies"]
      },
      {
        q: "Does insurance cover Invisalign?",
        a: "Many dental insurance plans cover Invisalign similar to traditional braces, typically 50-80% up to lifetime maximums of $1,500-2,500. HSA and FSA accounts can also be used for tax savings.",
        sources: ["Dental Insurance Guide"]
      }
    ]
  },
  {
    category: "CoolSculpting",
    questions: [
      {
        q: "How much does CoolSculpting cost?",
        a: "CoolSculpting costs $700-1,000 per treatment area for small areas (chin) to $1,500-2,500 for larger areas (abdomen). Most patients need 1-3 sessions per area. Package deals can reduce per-session costs by 15-25%.",
        sources: ["ASAPS", "CoolSculpting Official"]
      },
      {
        q: "How long does CoolSculpting results last?",
        a: "CoolSculpting permanently eliminates treated fat cells. Results are seen within 1-3 months post-treatment, with final results at 6 months. Maintaining stable weight preserves results indefinitely. New fat cells can form with weight gain.",
        sources: ["ASAPS", "FDA Clearance Data"]
      }
    ]
  },
  {
    category: "Medical Practice SEO",
    questions: [
      {
        q: "How does GEO differ from traditional SEO?",
        a: "GEO (Generative Engine Optimization) optimizes for AI search engines (ChatGPT, Perplexity, Claude) rather than just Google. Focus areas: structured data, E-E-A-T signals, comprehensive answers, FAQ schema, and authority building. Traditional SEO still matters but AI optimization requires additional strategies.",
        sources: ["Industry Research"]
      },
      {
        q: "Why is my medical practice not appearing in AI recommendations?",
        a: "Common reasons: weak E-E-A-T signals, missing structured data, insufficient content depth, no patient reviews, and poor authority signals. AI systems prioritize sources with demonstrated expertise, author credentials, and comprehensive topic coverage.",
        sources: ["GEO Best Practices"]
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* SEO Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Expert Answers</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Deep FAQ</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive, expert-reviewed answers to the most common questions about medical aesthetics, 
            dental procedures, and healthcare SEO. All content medically reviewed.
          </p>
        </div>

        {/* Categories */}
        {FAQ_CATEGORIES.map((cat, idx) => (
          <FAQSection 
            key={idx} 
            category={cat.category} 
            questions={cat.questions} 
          />
        ))}

        {/* CTA */}
        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Have More Questions?</h2>
          <p className="text-gray-400 mb-6">
            Contact our team for personalized answers to your specific questions.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-lg"
          >
            Get in Touch
          </a>
        </div>

        {/* SEO: FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQ_CATEGORIES.flatMap(cat => 
                cat.questions.map(q => ({
                  "@type": "Question",
                  "name": q.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.a
                  }
                }))
              )
            })
          }}
        />
      </div>
    </div>
  );
}
