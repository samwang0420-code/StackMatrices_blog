import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { fallbackTools } from "@/lib/fallback-data";
import DirectoryClient from "./DirectoryClient";

export const metadata: Metadata = {
  title: "Directory - Find Top SaaS Tools",
  description: "Explore our curated directory of the best SaaS tools for AI Writing, CRM, Marketing, SEO, Design, and Video Editing. Compare features, pricing, and reviews.",
  openGraph: {
    title: "Directory - Find Top SaaS Tools | Stackmatrices",
    description: "Explore our curated directory of the best SaaS tools. Compare features, pricing, and reviews.",
    url: "/directory",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-directory.jpg`,
        width: 1200,
        height: 630,
        alt: "SaaS Tools Directory",
      },
    ],
  },
};

async function getTools() {
  // 优先使用新的 product_hunt_tools 表
  try {
    const { data, error } = await supabase
      .from('product_hunt_tools')
      .select('*')
      .order('votes_count', { ascending: false });
    
    if (data && data.length > 0) {
      // 转换数据格式以兼容现有UI
      return data.map(tool => ({
        id: tool.id,
        name: tool.name,
        description: tool.tagline || tool.description,
        category_name: tool.category || 'Productivity',
        category_id: null,
        rating: tool.rating ? (tool.rating / 20 * 5) : Math.min(5, tool.votes_count / 50),
        reviews_count: tool.reviews_count || tool.votes_count,
        logo_url: tool.thumbnail_url || `https://placehold.co/64x64/3c3cf6/ffffff?text=${tool.name.charAt(0)}`,
        website_url: tool.url,
        deal: null,
        has_free_trial: false,
        featured: tool.featured,
        is_active: true,
        pricing_start: null,
        pricing_unit: null,
      }));
    }
  } catch (e) {
    console.log('Supabase error:', e);
  }
  
  // Fallback to old tools table
  try {
    const { data } = await supabase
      .from('tools')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (data && data.length > 0) {
      return data;
    }
  } catch (e) {
    console.log('Fallback error:', e);
  }
  
  return fallbackTools;
}

async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    return data || [];
  } catch (e) {
    console.error('Error:', e);
    return [];
  }
}

export default async function DirectoryPage() {
  const tools = await getTools();
  const categories = await getCategories();

  return <DirectoryClient tools={tools} categories={categories} />;
}
