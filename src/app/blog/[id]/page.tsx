import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Calendar } from "lucide-react";
import articlesData from "../../../../content/articles/index.json";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  const { id } = await Promise.resolve(params);
  const article = articlesData.articles.find(a => a.id === id);
  if (!article) notFound();
  const articleModule = await import(`../../../../content/articles/${id}.md`);
  const Content = articleModule.default;
  const fullUrl = `https://stackmatrices.com/blog/${id}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Stackmatrices", url: "https://stackmatrices.com" },
    publisher: { "@type": "Organization", name: "Stackmatrices", logo: { "@type": "ImageObject", url: "https://stackmatrices.com/logo.svg" } }
  };

  return (
    <>
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="min-h-screen bg-navy">
        <header className="bg-navy-light border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{article.title}</h1>
            <p className="text-xl text-gray-400">{article.description}</p>
          </div>
        </header>
        <article className="max-w-5xl mx-auto px-6 py-12">
          <div className="prose prose-invert max-w-none">
            <Content />
          </div>
        </article>
      </div>
    </>
  );
}