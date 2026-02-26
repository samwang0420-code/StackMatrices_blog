// Schema.org structured data for GEO (Generative Engine Optimization)
// Helps AI understand content entities and relationships

export function generateSkillSchema(skill: {
  id: string;
  name: string;
  description: string;
  price: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": skill.name,
    "description": skill.description,
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": skill.price.replace('$', '').split('/')[0],
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": skill.rating ? {
      "@type": "AggregateRating",
      "ratingValue": skill.rating,
      "reviewCount": skill.reviewCount || 0
    } : undefined,
    "operatingSystem": "Any",
    "softwareVersion": "1.0"
  };
}

export function generateFAQSchema(faqs: Array<{question: string; answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StackMatrices",
    "url": "https://stackmatrices.com",
    "logo": "https://stackmatrices.com/logo.png",
    "description": "AI-powered automation skills for e-commerce and business operations",
    "sameAs": [
      "https://twitter.com/stackmatrices"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceRange": "$39 - $199",
      "availability": "https://schema.org/InStock"
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{name: string; url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "datePublished": article.datePublished,
    "author": article.author ? {
      "@type": "Person",
      "name": article.author
    } : undefined,
    "image": article.image
  };
}
