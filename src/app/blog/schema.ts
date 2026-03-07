// Blog post schema markup
export const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "",
  "description": "",
  "author": {
    "@type": "Organization",
    "name": "StackMatrices Intelligence"
  },
  "publisher": {
    "@type": "Organization",
    "name": "StackMatrices",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stackmatrices.com/logo.svg"
    }
  },
  "datePublished": "",
  "dateModified": "",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": ""
  },
  "image": "",
  "keywords": "",
  "articleSection": "",
  "wordCount": 0
};

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": []
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "StackMatrices",
  "url": "https://stackmatrices.com",
  "logo": "https://stackmatrices.com/logo.svg",
  "description": "GEO Agency for Medical Practices",
  "sameAs": [
    "https://twitter.com/stackmatrices",
    "https://linkedin.com/company/stackmatrices"
  ]
};
