'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Integration {
  name: string;
  iconifySlug: string;
}

interface Skill {
  id: string;
  actionTitle: string;
  outcome: string;
  description: string;
  price: string;
  period: string;
  deployments: string;
  integrations: Integration[];
}

interface SkillCardProps {
  skill: Skill;
  compact?: boolean;
}

// Icon mapping to verified Iconify slugs
const iconifyMapping: Record<string, string> = {
  'amazon': 'logos:amazon',
  'openai': 'logos:openai-icon',
  'deepseek': 'simple-icons:deepseek',
  'googlesheets': 'logos:google-sheets',
  'shopify': 'logos:shopify',
  'slack': 'logos:slack-icon',
  'wechat': 'logos:wechat',
  'tiktok': 'logos:tiktok-icon',
  'apify': 'simple-icons:apify',
};

// Fallback Lucide Zap icon as SVG
const FallbackIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-white"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// Individual Icon with fallback
function IconBadge({ iconifySlug }: { iconifySlug: string }) {
  const [failed, setFailed] = useState(false);
  
  if (failed) {
    return (
      <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center p-2">
        <FallbackIcon />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center p-2 overflow-hidden">
      <img 
        src={`https://api.iconify.design/${iconifySlug}.svg?color=white`}
        alt=""
        className="w-full h-full object-contain filter brightness-0 invert"
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
}

// Duo Icons Container (Make-style overlapping)
function DuoIcons({ integrations }: { integrations: Integration[] }) {
  const displayIntegrations = integrations.slice(0, 2);
  
  return (
    <div className="flex -space-x-2">
      {displayIntegrations.map((integration, idx) => (
        <div key={idx} className="relative z-10 hover:z-20 transition-transform hover:scale-110">
          <IconBadge iconifySlug={integration.iconifySlug} />
        </div>
      ))}
    </div>
  );
}

export function SkillCard({ skill, compact = false }: SkillCardProps) {
  if (compact) {
    return (
      <Link 
        href={`/buy?skill=${skill.id}`}
        className="group block bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
      >
        {/* Duo Icons */}
        <div className="mb-4">
          <DuoIcons integrations={skill.integrations} />
        </div>

        {/* Action Title */}
        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-snug">
          {skill.actionTitle}
        </h3>

        {/* Outcome Tag */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            {skill.outcome}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-white">{skill.price}</span>
          <span className="text-slate-500 text-xs">/{skill.period}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-slate-800/80 rounded-lg p-4 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:bg-slate-800">
      {/* Duo Icons + Deployments */}
      <div className="flex items-center justify-between mb-3">
        <DuoIcons integrations={skill.integrations} />
        <div className="text-[10px] font-mono text-slate-500">
          {skill.deployments}
        </div>
      </div>

      {/* Action Title */}
      <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug line-clamp-2">
        {skill.actionTitle}
      </h3>

      {/* Outcome Tag */}
      <div className="mb-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
          {skill.outcome}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs mb-4 line-clamp-2 leading-relaxed">
        {skill.description}
      </p>

      {/* Price & Deploy */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-white">{skill.price}</span>
          <span className="text-slate-500 text-xs">/{skill.period}</span>
        </div>
        
        <Link
          href={`/buy?skill=${skill.id}`}
          className="px-3 py-1.5 border border-slate-600 text-slate-300 text-xs font-medium rounded hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all duration-200"
        >
          Deploy
        </Link>
      </div>
    </div>
  );
}

export default SkillCard;
