import skillsData from '@/data/skills-detailed.json';
import SkillDetailClient from './SkillDetailClient';

// Generate static paths for all skills at build time
export function generateStaticParams() {
  return skillsData.map((skill) => ({
    id: skill.id,
  }));
}

// Generate metadata for each skill page
export function generateMetadata({ params }: { params: { id: string } }) {
  const skill = skillsData.find(s => s.id === params.id);
  
  if (!skill) {
    return {
      title: 'Skill Not Found | StackMatrices',
    };
  }

  return {
    title: `${skill.actionTitle} | StackMatrices Skills`,
    description: skill.longDescription || skill.description,
  };
}

export default function SkillDetailPage({ params }: { params: { id: string } }) {
  const skill = skillsData.find(s => s.id === params.id);

  if (!skill) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Skill Not Found</h1>
          <a href="/skills" className="text-emerald-400 hover:underline">
            ← Back to Skills
          </a>
        </div>
      </div>
    );
  }

  return <SkillDetailClient skill={skill} />;
}
