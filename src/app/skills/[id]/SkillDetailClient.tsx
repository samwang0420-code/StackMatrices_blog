'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Zap, 
  CheckCircle, 
  Server, 
  Clock, 
  Database,
  ArrowLeft,
  Copy,
  Check,
  Shield,
  Cpu
} from 'lucide-react';

// Lucide Sparkles icon (AI output)
const SparklesIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className="text-amber-400"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

// Lucide Brain Circuit icon
const BrainCircuitIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className="text-emerald-400"
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M9 13h6" />
    <path d="M9 17h3" />
    <path d="M9 9h6" />
  </svg>
);

// Input Icon (Data Source)
function InputIconBadge({ slug }: { slug: string }) {
  const [failed, setFailed] = useState(false);
  
  if (failed) {
    return (
      <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
        <Server className="w-7 h-7 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center p-2 overflow-hidden">
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
  
  if (type === 'ai') {
    return (
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-900/50 to-amber-900/30 border-2 border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
        {icon === 'brain-circuit' ? <BrainCircuitIcon /> : <SparklesIcon />}
      </div>
    );
  }
  
  if (failed) {
    return (
      <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
        <Database className="w-7 h-7 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center p-2 overflow-hidden">
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

// AI Badge
function AIBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
      <Zap className="w-3 h-3" />
      AI-Powered
    </span>
  );
}

interface Skill {
  id: string;
  actionTitle: string;
  outcome: string;
  description: string;
  longDescription?: string;
  price: string;
  period: string;
  inputIcon: string;
  outputIcon: string;
  outputType: 'sheet' | 'message' | 'ai';
  aiPowered: boolean;
  features: string[];
  deploymentSpecs: {
    requirements: string[];
    setupTime: string;
    runtime: string;
    dataStorage: string;
  };
}

export default function SkillDetailClient({ skill }: { skill: Skill }) {
  const [copied, setCopied] = useState(false);
  
  const copyCommand = () => {
    const cmd = `npx stack-matrices deploy ${skill.id} --license=YOUR_LICENSE_KEY`;
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <Link 
            href="/skills" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Skills
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Icons */}
            <div className="flex items-center gap-3 shrink-0">
              <InputIconBadge slug={skill.inputIcon} />
              <div className="text-slate-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <OutputIconBadge type={skill.outputType} icon={skill.outputIcon} />
            </div>
            
            {/* Title */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  {skill.outcome}
                </span>
                {skill.aiPowered && <AIBadge />}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {skill.actionTitle}
              </h1>
              
              <p className="text-lg text-slate-400 mb-6">
                {skill.longDescription || skill.description}
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{skill.price}</span>
                  <span className="text-slate-500">/{skill.period}</span>
                </div>
                
                <Link
                  href={`/buy?skill=${skill.id}`}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Deploy Now
                </Link>
              </div>            
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                What It Automates
              </h2>
              
              <ul className="space-y-4">
                {skill.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">▸</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-400" />
                Deployment Specs
              </h2>
              
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Shield className="w-4 h-4" />
                    Requirements
                  </div>
                  <ul className="space-y-1">
                    {skill.deploymentSpecs.requirements.map((req, idx) => (
                      <li key={idx} className="text-slate-300 text-sm">
                        • {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                      <Clock className="w-4 h-4" />
                      Setup Time
                    </div>
                    <div className="text-slate-300 font-medium">{skill.deploymentSpecs.setupTime}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                      <Cpu className="w-4 h-4" />
                      Runtime
                    </div>
                    <div className="text-slate-300 font-medium">{skill.deploymentSpecs.runtime}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                    <Database className="w-4 h-4" />
                    Data Storage
                  </div>
                  <div className="text-slate-300 font-medium">{skill.deploymentSpecs.dataStorage}</div>
                </div>
              </div>              
            </div>
          </div>        
        </div>
      </section>
      
      {/* One-Command Install Preview */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">One-Command Deployment</h2>
            <p className="text-slate-400 mb-6">
              After purchase, deploy instantly with a single command. No coding required.
            </p>
            
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500">Terminal</span>
                <button
                  onClick={copyCommand}
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="text-emerald-400">
                $ npx stack-matrices deploy {skill.id} --license=<span className="text-amber-400">YOUR_LICENSE_KEY</span>
              </div>
            </div>            
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/buy?skill=${skill.id}`}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors text-center"
              >
                Get License Key →
              </Link>
              
              <a
                href="#"
                className="px-6 py-3 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 rounded-lg transition-colors text-center"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
