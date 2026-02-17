import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
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
  try {
    const { data } = await supabase
      .from('product_hunt_tools')
      .select('*')
      .order('votes_count', { ascending: false });
    
    if (data && data.length > 0) {
      // 直接返回原始数据，保留 Product Hunt 分类
      return data.map(tool => ({
        id: tool.id,
        name: tool.name,
        description: tool.tagline || tool.description,
        category: tool.category || 'Other',
        topics: tool.topics || [],
        rating: tool.rating || 0,
        reviews_count: tool.reviews_count || 0,
        votes_count: tool.votes_count || 0,
        logo_url: tool.thumbnail_url || `https://placehold.co/64x64/3c3cf6/ffffff?text=${tool.name.charAt(0)}`,
        website_url: tool.url,
      }));
    }
  } catch (e) {
    console.error('Error fetching tools:', e);
  }
  
  return [];
}

export default async function DirectoryPage() {
  const tools = await getTools();

  return <DirectoryClient tools={tools} />;
}
