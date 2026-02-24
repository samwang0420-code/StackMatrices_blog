'use client';

import Link from 'next/link';

interface Integration {
  name: string;
  color: string;
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

// Simple Icons CDN URL builder
function getSimpleIconUrl(name: string, color: string = 'white'): string {
  return `https://cdn.simpleicons.org/${name.toLowerCase()}/${color}`;
}

// Integration Badge with Simple Icons
function IntegrationBadge({ name, color }: { name: string; color: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 overflow-hidden flex-shrink-0 shadow-md hover:scale-110 transition-transform">
      <img 
        src={getSimpleIconUrl(name, color)} 
        alt={name}
        className="w-full h-full object-contain p-1"
        onError={(e) => {
          // Fallback to placeholder if icon fails to load
          (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${name.toLowerCase()}/10b981`;
        }}
      />
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
        {/* Integration Icons */}
        <div className="flex items-center mb-3">
          <div className="flex -space-x-2">
            {skill.integrations.slice(0, 3).map((integration, idx) => (
              <div key={idx} className="relative z-10 hover:z-20">
                <IntegrationBadge name={integration.name} color={integration.color} />
              </div>
            ))}
          </div>
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
      {/* Integration Icons Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex -space-x-1.5">
          {skill.integrations.map((integration, idx) => (
            <div key={idx} className="relative z-10 hover:z-20">
              <IntegrationBadge name={integration.name} color={integration.color} />
            </div>
          ))}
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
