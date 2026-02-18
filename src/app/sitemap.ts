import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URLs
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/directory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Fetch all tools
  try {
    const { data: tools } = await supabase
      .from('product_hunt_tools')
      .select('id, name, updated_at')
      .order('votes_count', { ascending: false });

    if (tools) {
      tools.forEach((tool) => {
        routes.push({
          url: `${SITE_CONFIG.url}/tools/${tool.id}`,
          lastModified: tool.updated_at ? new Date(tool.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }
  } catch (e) {
    console.error('Error fetching tools for sitemap:', e);
  }

  // Fetch all articles
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('published', true);

    if (articles) {
      articles.forEach((article) => {
        routes.push({
          url: `${SITE_CONFIG.url}/blog/${article.slug}`,
          lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }
  } catch (e) {
    console.error('Error fetching articles for sitemap:', e);
  }

  return routes;
}
