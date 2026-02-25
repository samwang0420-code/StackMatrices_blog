import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SkillDetailClient from './SkillDetailClient';
import reviewAnalyzer from '@/data/skills/review-analyzer.json';

// 所有可用的 skills
const skillsData = [reviewAnalyzer];

// Generate static params for all skills
export async function generateStaticParams() {
  return skillsData.map((skill: any) => ({
    slug: skill.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const skill = skillsData.find((s: any) => s.slug === params.slug);
  
  if (!skill) {
    return {
      title: 'Skill Not Found | StackMatrices',
    };
  }

  return {
    title: `${skill.actionTitle} | StackMatrices Skills`,
    description: skill.shortDescription,
    openGraph: {
      title: skill.actionTitle,
      description: skill.shortDescription,
      type: 'article',
    },
  };
}

// Main page component
export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skill = skillsData.find((s: any) => s.slug === params.slug);

  if (!skill) {
    notFound();
  }

  return <SkillDetailClient skill={skill as any} />;
}
