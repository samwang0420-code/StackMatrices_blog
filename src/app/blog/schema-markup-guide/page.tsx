'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";
import { Menu, ChevronRight } from "lucide-react";
import { BLOG_IMAGES } from "@/lib/pexels";

const ARTICLE = {
  title: "The Complete Guide to Medical Schema Markup for AI Visibility",
  category: "Technical Implementation",
  author: "Michael Torres",
  date: "March 5, 2026",
  readTime: "18 min read",
};
const TABLE_OF_CONTENTS = [
  { id: "section1", title: "Section 1" },
  { id: "section2", title: "Section 2" },
  { id: "section3", title: "Section 3" },
];

export default function SchemaMarkupGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              {ARTICLE.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{ARTICLE.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {ARTICLE.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {ARTICLE.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {ARTICLE.readTime}
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={BLOG_IMAGES["geo-checklist"]}
              alt={ARTICLE.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Why Schema Markup Matters for AI</h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Schema markup is the language AI systems use to understand your medical practice. Without it, 
            you're speaking in riddles. With it, you're providing a clear, structured data feed that AI 
            engines can parse, understand, and cite with confidence.
          </p>

          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-8">
            <h3 className="text-lg font-semibold text-primary mb-4">The Impact of Schema on AI Visibility</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">+340%</p>
                <p className="text-xs text-gray-400">Increase in AI citations with proper schema</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">2.8x</p>
                <p className="text-xs text-gray-400">Better knowledge graph inclusion</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Essential Schema Types for Medical Practices</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">1. MedicalOrganization Schema</h3>
          
          <p className="text-gray-300 mb-4">This is the foundation. Every medical practice must have this schema type implemented:</p>

          <div className="bg-black/30 rounded-xl p-4 my-6 overflow-x-auto">
            <pre className="text-xs text-gray-300"><code>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Elite Aesthetic Center",
  "url": "https://eliteaesthetic.com",
  "logo": "https://eliteaesthetic.com/logo.png",
  "description": "Board-certified plastic surgery practice specializing in breast augmentation, facelifts, and body contouring.",
  "medicalSpecialty": [
    {
      "@type": "MedicalSpecialty",
      "name": "Plastic Surgery"
    },
    {
      "@type": "MedicalSpecialty", 
      "name": "Cosmetic Surgery"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Wilshire Blvd",
    "addressLocality": "Beverly Hills",
    "addressRegion": "CA",
    "postalCode": "90210",
    "addressCountry": "US"
  },
  "telephone": "+1-310-555-0123",
  "email": "info@eliteaesthetic.com",
  "openingHours": [
    "Mo-Fr 09:00-17:00",
    "Sa 10:00-14:00"
  ],
  "priceRange": "$$$$",
  "paymentAccepted": ["Cash", "Credit Card", "Financing"],
  "currenciesAccepted": "USD"
}
</script>
            `}</code></pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">2. Physician Schema</h3>
          
          <p className="text-gray-300 mb-4">Every doctor at your practice needs individual schema markup:</p>

          <div className="bg-black/30 rounded-xl p-4 my-6 overflow-x-auto">
            <pre className="text-xs text-gray-300"><code>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Sarah Chen, MD",
  "jobTitle": "Board Certified Plastic Surgeon",
  "description": "Specializing in breast augmentation, revision surgery, and mommy makeovers with 15+ years of experience.",
  "medicalSpecialty": "Plastic Surgery",
  "educationalCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Doctor of Medicine",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Harvard Medical School"
      }
    }
  ],
  "memberOf": [
    {
      "@type": "Organization",
      "name": "American Society of Plastic Surgeons"
    },
    {
      "@type": "Organization", 
      "name": "American Board of Plastic Surgery"
    }
  ],
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "Elite Aesthetic Center"
  },
  "image": "https://eliteaesthetic.com/dr-chen.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/drsarahchen",
    "https://www.realself.com/dr/sarah-chen"
  ]
}
</script>
            `}</code></pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-primary">3. MedicalProcedure Schema</h3>
          
          <p className="text-gray-300 mb-4">For each service you offer, implement procedure-specific schema:</p>

          <div className="bg-black/30 rounded-xl p-4 my-6 overflow-x-auto">
            <pre className="text-xs text-gray-300"><code>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "Breast Augmentation",
  "procedureType": "SurgicalProcedure",
  "bodyLocation": "Breast",
  "description": "Breast augmentation using silicone or saline implants to enhance size and shape.",
  "preparation": "Pre-operative consultation, medical clearance, smoking cessation",
  "followup": "Post-operative visits at 1 week, 1 month, 3 months, 6 months",
  "howPerformed": "Implants placed through inframammary incision in submuscular pocket",
  "procedureDuration": "PT2H",
  "recoveryTime": "P2W",
  "provider": {
    "@type": "MedicalOrganization",
    "name": "Elite Aesthetic Center"
  }
}
</script>
            `}</code></pre>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Advanced Schema: FAQ and HowTo</h2>

          <p className="text-gray-300 mb-4">These schema types dramatically increase your chances of appearing in AI-generated answers:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">FAQPage Schema</h3>

          <div className="bg-black/30 rounded-xl p-4 my-6 overflow-x-auto">
            <pre className="text-xs text-gray-300"><code>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long do dental implants last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With proper care, dental implants can last a lifetime. The implant itself (titanium post) is permanent. The crown typically lasts 10-15 years before needing replacement due to normal wear."
      }
    },
    {
      "@type": "Question", 
      "name": "Are dental implants painful?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most patients report minimal discomfort during the procedure due to local anesthesia. Post-operative pain is typically managed with over-the-counter pain relievers and subsides within 3-5 days."
      }
    }
  ]
}
</script>
            `}</code></pre>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Implementation Best Practices</h2>

          <div className="bg-white/5 rounded-xl p-6 my-6">
            <h4 className="font-semibold text-white mb-4">Testing Your Schema</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <p><strong className="text-white">1. Google Rich Results Test:</strong> Validate syntax and preview appearance</p>
              <p><strong className="text-white">2. Schema.org Validator:</strong> Check semantic correctness</p>
              <p><strong className="text-white">3. Google Search Console:</strong> Monitor structured data reports</p>
              <p><strong className="text-white">4. Chrome DevTools:</strong> Inspect rendered JSON-LD</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Common Schema Mistakes to Avoid</h2>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-danger/10 border border-danger/30 rounded-xl p-4">
              <h4 className="font-semibold text-danger mb-3">❌ Common Errors</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Missing required properties</li>
                <li>Incorrect @type declarations</li>
                <li>Mismatched NAP data</li>
                <li>Over-stuffed keywords</li>
                <li>Invalid JSON syntax</li>
              </ul>
            </div>
            
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
              <h4 className="font-semibold text-primary mb-3">✅ Best Practices</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Validate before deploying</li>
                <li>Keep data synchronized across platforms</li>
                <li>Update regularly (quarterly minimum)</li>
                <li>Use specific, accurate types</li>
                <li>Include all recommended properties</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border-l-4 border-primary p-4 my-8">
            <p className="text-gray-300">
              <strong className="text-white">Pro Tip:</strong> Schema markup isn't a one-time task. As your practice evolves—new doctors, 
              new procedures, new locations—your structured data must evolve too. Set quarterly reminders to audit 
              and update your schema implementation.
            </p>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Resources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              Schema.org MedicalEntity Documentation
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[2]</span>
              Google Search Central - Structured Data Guidelines
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[3]</span>
              StackMatrices Schema Implementation Study (n=200 practices)
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help with Schema Implementation?</h2>
          <p className="text-gray-300 mb-6">
            Get your free schema audit and discover exactly what structured data your practice is missing.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your Schema Audit
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
