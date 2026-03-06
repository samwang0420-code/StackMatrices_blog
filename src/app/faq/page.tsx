import Link from "next/link";
import Script from "next/script";
import { ArrowRight, HelpCircle, Mail } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    title: "About AI Visibility & GEO",
    questions: [
      {
        q: "What is GEO (Generative Engine Optimization)?",
        a: "GEO is the practice of optimizing your medical practice for AI recommendation engines like ChatGPT, Claude, Perplexity, and Google's Search Generative Experience (SGE). Unlike traditional SEO which focuses on search rankings, GEO ensures AI engines recommend your practice when patients ask for recommendations."
      },
      {
        q: "How is GEO different from SEO?",
        a: "SEO targets search algorithms and focuses on keyword rankings, while GEO targets AI reasoning engines and focuses on recommendation frequency. SEO success means ranking #1 on Google; GEO success means AI engines recommend you when patients ask for the 'best' in your specialty."
      },
      {
        q: "Why do I need GEO if I already rank #1 on Google?",
        a: "47% of high-intent medical queries now start with AI engines, not traditional search. Even if you rank #1 on Google, you can be completely invisible to patients asking ChatGPT or Perplexity for recommendations. GEO captures that 47% of the market traditional SEO misses."
      },
      {
        q: "How long does GEO take to show results?",
        a: "Most practices see meaningful results within 90 days and substantial impact within 6 months. Month 1-2 focuses on foundation building with minimal visible results. Month 3 sees first AI referrals. Month 4-6 brings significant referral volume."
      }
    ]
  },
  {
    title: "The Audit & Implementation",
    questions: [
      {
        q: "What does the AI Visibility Audit include?",
        a: "Our comprehensive audit analyzes your current AI visibility score (0-100), competitor AI recommendation frequency, technical infrastructure gaps, content authority assessment, knowledge graph presence, review & trust signal analysis, and provides a revenue loss calculation. You receive a 6-page detailed report with specific recommendations."
      },
      {
        q: "Is the audit really free?",
        a: "Yes. The AI Visibility Audit is completely free with no obligation. We believe in demonstrating value before asking for investment."
      },
      {
        q: "How much does GEO implementation cost?",
        a: "DIY Implementation costs approximately $3,000 + 20-30 hours/week of time over 6 months. Agency partnership typically runs $75K initial + $8K/month ($123K total for 6 months). Typical ROI ranges from 1,200% to 5,000% within 12 months."
      },
      {
        q: "What happens after I request an audit?",
        a: "You submit your practice information, we run comprehensive AI visibility tests across 4 platforms, analyze your competitive landscape, and you receive your detailed 6-page report within 24 hours. Optional: Schedule a consultation to discuss findings."
      }
    ]
  },
  {
    title: "Technical Questions",
    questions: [
      {
        q: "What is schema markup and why does it matter?",
        a: "Schema markup is structured data that helps AI engines understand your practice. Medical-specific schema (MedicalOrganization, Physician, MedicalProcedure) tells AI engines what services you offer, your credentials and specialties, your locations and contact information, and your reviews and ratings. Without schema, AI engines struggle to accurately represent your practice."
      },
      {
        q: "What is llms.txt?",
        a: "llms.txt is a documentation file that helps AI engines understand your services. Think of it as a 'readme' file for AI crawlers. It documents your services and specializations, physicians and credentials, locations and contact information, and key differentiators."
      },
      {
        q: "Do I need to change my website design?",
        a: "Generally no. Most GEO improvements are technical (schema markup, content structure) rather than visual. However, we may recommend content additions or structural changes to improve AI readability."
      },
      {
        q: "Will GEO affect my existing SEO?",
        a: "GEO complements and enhances traditional SEO. Many GEO improvements (schema markup, content depth, authority building) also improve search rankings. You typically see improvements in both channels."
      }
    ]
  },
  {
    title: "Content & Authority",
    questions: [
      {
        q: "What kind of content do I need to create?",
        a: "GEO-optimized content includes procedure deep-dives (2,000+ words), FAQ expansions (50+ questions per specialty), comparison content ('Option A vs. Option B'), case studies with documented outcomes, and educational resources. All content should be structured for AI readability with clear headings, semantic markup, and direct answers."
      },
      {
        q: "How much content do I need?",
        a: "Minimum viable: 10 procedure deep-dives (2,000+ words each), 100 FAQ answers, 20 comparison articles, and 25 case studies. This provides sufficient authority signals for AI engines to recognize your expertise."
      },
      {
        q: "Do I need to blog regularly?",
        a: "Not necessarily. GEO focuses on comprehensive, evergreen content rather than frequent blogging. Quality and depth matter more than frequency. Many successful practices update content quarterly rather than weekly."
      },
      {
        q: "Can AI write my content?",
        a: "AI can assist with drafting, but human expertise is essential for medical accuracy and compliance, personal voice and perspective, patient-specific considerations, and regulatory requirements. We recommend AI-assisted drafting with expert review and editing."
      }
    ]
  },
  {
    title: "Reviews & Reputation",
    questions: [
      {
        q: "How important are reviews for GEO?",
        a: "Critical. AI engines heavily weight review volume, recency, and sentiment when making recommendations. Practices with 200+ recent reviews significantly outperform those with fewer reviews."
      },
      {
        q: "Which review platforms matter most?",
        a: "Priority order: Google Business Profile (most important), RealSelf (critical for aesthetics/plastic surgery), Healthgrades (important for all medical), Facebook (secondary but valuable), and industry-specific platforms like RateMDs and Vitals."
      },
      {
        q: "Should I respond to negative reviews?",
        a: "Yes, professionally and promptly. AI engines analyze review responses as trust signals. A thoughtful response to a negative review often carries more weight than the negative review itself."
      },
      {
        q: "Can I ask patients for reviews?",
        a: "Yes, with important caveats: Never offer incentives (violates most platform policies), ask at the right time (post-procedure when satisfaction is highest), make it easy (provide direct links), and follow up once gently."
      }
    ]
  },
  {
    title: "Results & ROI",
    questions: [
      {
        q: "How do I know GEO is working?",
        a: "Key metrics include AI Visibility Score (our proprietary 0-100 measurement), AI Referral Volume (ask patients 'How did you hear about us?'), Consultation Booking Rate (AI-referred patients typically book 2-3x more often), and Revenue Attribution (track cases back to AI recommendation source)."
      },
      {
        q: "What's a typical ROI for GEO?",
        a: "Conservative estimates show Investment of $75K initial + $8K/month = $123K (6 months) generating Return of $3-5M additional annual revenue, yielding ROI of 1,200% - 4,000% with payback period of 2-4 months."
      },
      {
        q: "What if I don't see results?",
        a: "Our implementation includes monthly performance reviews, continuous optimization based on AI response patterns, strategy pivots if certain approaches underperform, and full transparency on what's working. If you're not seeing progress, we identify why and adjust at no additional cost."
      },
      {
        q: "How long do results last?",
        a: "Unlike paid advertising where results stop when you stop paying, GEO builds lasting authority. However, AI engines evolve continuously. We recommend ongoing monitoring and quarterly optimization to maintain dominance."
      }
    ]
  }
];

// Generate FAQPage Schema
const faqSchema = {
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
};

export default function FAQPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-navy text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about AI visibility, GEO, and transforming 
              your medical practice&apos;s patient acquisition.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-16">
            {FAQ_CATEGORIES.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-800">
                  {category.title}
                </h2>
                
                <div className="space-y-6">
                  {category.questions.map((item, qIdx) => (
                    <div 
                      key={qIdx}
                      className="bg-navy-light rounded-xl p-6 border border-gray-800"
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <h3 
                        className="font-semibold text-lg mb-3 text-white"
                        itemProp="name"
                      >
                        {item.q}
                      </h3>
                      <div 
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p className="text-gray-400 leading-relaxed" itemProp="text">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-danger/10 rounded-2xl p-8 border border-gray-800 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Get in touch and we&apos;ll answer 
              your specific questions about GEO for your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:sam.wang01@icloud.com?subject=GEO Question"
                className="inline-flex items-center justify-center gap-2 bg-navy-light hover:bg-navy-lighter text-white px-6 py-3 rounded-lg border border-gray-800 transition-colors"
              >
                <Mail size={16} />
                Email Us
              </a>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 bg-danger hover:bg-danger-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Your Free Audit
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
