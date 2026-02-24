'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Skill {
  id: string;
  actionTitle: string;
  outcome: string;
  description: string;
  price: string;
  period: string;
  deployments: string;
  inputIcon: string;
  outputIcon: string;
  outputType: 'sheet' | 'message' | 'ai';
  aiPowered: boolean;
}

interface SkillCardProps {
  skill: Skill;
  compact?: boolean;
}

// Lucide Sparkles icon (AI output)
const SparklesIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-amber-400"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

// Lucide Brain Circuit icon (AI output alternative)
const BrainCircuitIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-emerald-400"
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M9 13h6" />
    <path d="M9 17h3" />
    <path d="M9 9h6" />
  </svg>
);

// Fallback icon
const FallbackIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
  </svg>
);

// Input Icon (Data Source)
function InputIconBadge({ slug }: { slug: string }) {
  const [failed, setFailed] = useState(false);
  
  if (failed) {
    return (
      <div className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
        <FallbackIcon />
      </div>
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center p-1.5 overflow-hidden">
      <img 
        src={`https://api.iconify.design/${slug}.svg?color=white`}
        alt=""
        className="w-full h-full object-contain filter brightness-0 invert"
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
}

// Output Icon (Destination or AI)
function OutputIconBadge({ type, icon }: { type: string; icon: string }) {
  const [failed, setFailed] = useState(false);
  
  // AI output - use Lucide icon, not brand
  if (type === 'ai') {
    return (
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-900/50 to-amber-900/30 border-2 border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
        {icon === 'brain-circuit' ? <BrainCircuitIcon /> : <SparklesIcon />}
      </div>
    );
  }
  
  // Sheet or Message output - use brand icon
  if (failed) {
    return (
      <div className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
        <FallbackIcon />
      </div>
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center p-1.5 overflow-hidden">
      <img 
        src={`https://api.iconify.design/${icon}.svg`}
        alt=""
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
}

// Input ➔ Output Icons with arrow
function InputOutputIcons({ inputSlug, outputType, outputIcon }: { 
  inputSlug: string; 
  outputType: string;
  outputIcon: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        <InputIconBadge slug={inputSlug} />
        
        {/* Arrow */}
        <div className="text-slate-600 px-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <OutputIconBadge type={outputType} icon={outputIcon} />
      </div>
    </div>
  );
}

// AI Badge
function AIBadge({ aiPowered }: { aiPowered: boolean }) {
  if (!aiPowered) return null;
  
  return (
    <div className="mt-2 flex justify-center">
      <span className="text-[8px] font-medium text-emerald-400/70 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full tracking-wide">
        AI-INTEGRATED
      </span>
    </div>
  );
}

export function SkillCard({ skill, compact = false }: SkillCardProps) {
  if (compact) {
    return (
      <Link 
        href={`/buy?skill=${skill.id}`}
        className="group block bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
      >
        {/* Input ➔ Output Icons */}
        <div className="mb-3">
          <InputOutputIcons 
            inputSlug={skill.inputIcon} 
            outputType={skill.outputType}
            outputIcon={skill.outputIcon}
          />
          <AIBadge aiPowered={skill.aiPowered} />
        </div>

        {/* Action Title */}
        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-snug">
          {skill.actionTitle}
        </h3>

        {/* Outcome Tag */}
        <div className="mb-2">
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
      {/* Icons + Deployments */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <InputOutputIcons 
            inputSlug={skill.inputIcon} 
            outputType={skill.outputType}
            outputIcon={skill.outputIcon}
          />
          <AIBadge aiPowered={skill.aiPowered} />
        </div>
        
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
