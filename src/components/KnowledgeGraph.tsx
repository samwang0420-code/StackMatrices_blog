import fs from 'fs';
import path from 'path';

/**
 * Knowledge Graph SEO Component
 * Outputs JSON-LD structured data for entity understanding
 */

interface Entity {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  url?: string;
  image?: string;
  priceRange?: string;
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
  };
  address?: {
    '@type': string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
}

interface KnowledgeGraphData {
  '@context': string;
  '@graph': Entity[];
}

// Load knowledge graph data
function getKnowledgeGraph(): KnowledgeGraphData | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'knowledge-graph.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('Error loading knowledge graph:', e);
  }
  return null;
}

// Generate Knowledge Graph JSON-LD
export function generateKnowledgeGraphJsonLd(): string | null {
  const kg = getKnowledgeGraph();
  if (!kg) return null;
  
  return JSON.stringify(kg);
}

// Generate Entity-specific JSON-LD for a page
export function generateEntityJsonLd(entityType: string, entityId: string): string | null {
  const kg = getKnowledgeGraph();
  if (!kg) return null;
  
  const entity = kg['@graph'].find(
    e => e['@type'] === entityType || e.name.toLowerCase().includes(entityId.toLowerCase())
  );
  
  if (!entity) return null;
  
  return JSON.stringify({
    "@context": "https://schema.org",
    ...entity
  });
}

export default function KnowledgeGraphSchema() {
  const jsonLd = generateKnowledgeGraphJsonLd();
  
  if (!jsonLd) return null;
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
