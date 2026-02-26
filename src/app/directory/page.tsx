import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import skillsData from "@/data/skills-detailed.json";
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

// Static export - use skills data
function getTools() {
  return skillsData.map(skill => ({
    id: skill.id,
    name: skill.actionTitle,
    description: skill.description,
    category: skill.category || 'Automation',
    topics: skill.tags || [],
    rating: 4.8,
    reviews_count: 100,
    votes_count: parseInt(skill.deployments.replace('k', '00')) || 500,
    logo_url: skill.logo || `https://placehold.co/64x64/3c3cf6/ffffff?text=${skill.actionTitle.charAt(0)}`,
    website_url: `/skills/${skill.id}`,
  }));
}

export default function DirectoryPage() {
  const tools = getTools();

  return <DirectoryClient tools={tools} />;
}
