'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  Shield, 
  Zap,
  Code,
  Play,
  FileJson,
  CheckCircle,
  ExternalLink,
  Brain,
  Filter,
  Database,
  Search,
  ListChecks,
  Tags,
  Sheet,
  Sparkles
} from 'lucide-react';

// Skill data interfaces
interface SkillInput {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: any;
  example?: any;
}

interface SkillOutput {
  name: string;
  type: string;
  description: string;
  example?: any;
}

interface SkillFeature {
  title: string;
  description: string;
  icon: string;
}

interface SkillExample {
  title: string;
  description: string;
  input: Record<string, any>;
  output: any;
}

interface SkillIntegration {
  platform: string;
  description: string;
  setupSteps: string[];
}

interface Skill {
  id: string;
  slug: string;
  actionTitle: string;
  outcome: string;
  description: string;
  shortDescription: string;
  category: string;
  price: string;
  period: string;
  deployments: string;
  featured: boolean;
  inputIcon: string;
  outputIcon: string;
  outputType: 'sheet' | 'message' | 'ai';
  aiPowered: boolean;
  version: string;
  author: string;
  updatedAt: string;
  estimatedTime: string;
  rateLimit?: string;
  tags: string[];
  inputs: SkillInput[];
  outputs: SkillOutput[];
  features: SkillFeature[];
  examples: SkillExample[];
  integrations: SkillIntegration[];
}

interface SkillDetailClientProps {
  skill: Skill;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  Filter,
  Sheet: Database,
  Brain,
  Tags,
  Search,
  Checklist: ListChecks,
};

// Input/Output Icon Components (from SkillCard)
function InputIconBadge({ slug }: { slug: string }) {
  const [failed, setFailed] = useState(false);
  
  if (failed) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
        <Zap className="w-5 h-5 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center p-2 overflow-hidden">
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

function OutputIconBadge({ type, icon }: { type: string; icon: string }) {
  if (type === 'ai') {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-900/50 to-amber-900/30 border-2 border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
        <Sparkles className="w-5 h-5 text-amber-400" />
      </div>
    );
  }
  
  const [failed, setFailed] = useState(false);
  
  if (failed) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
        <Zap className="w-5 h-5 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center p-2 overflow-hidden">
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

export default function SkillDetailClient({ skill }: SkillDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'api' | 'examples'>('overview');
  const [selectedExample, setSelectedExample] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link 
            href="/skills" 
            className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Skills
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Category & Version */}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {skill.category}
                </span>
                <span className="text-sm text-slate-500">v{skill.version}</span>
                {skill.aiPowered && (
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <Sparkles className="w-3 h-3" />
                    AI-Powered
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                {skill.actionTitle}
              </h1>

              {/* Outcome Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {skill.outcome}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-slate-400 max-w-2xl">
                {skill.description}
              </p>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{skill.price}</span>
                <span className="text-slate-500">/{skill.period}</span>
              </div>
              <div className="text-sm text-slate-500">
                {skill.deployments} deployments
              </div>
              <Link
                href={`/buy?skill=${skill.id}`}
                className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all duration-200"
              >
                <Zap className="w-4 h-4 mr-2" />
                Deploy This Skill
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Zap },
              { id: 'api', label: 'API Reference', icon: Code },
              { id: 'examples', label: 'Examples', icon: Play },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Data Flow Visualization */}
              <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Data Flow</h2>
                <div className="flex items-center justify-center gap-8 py-8">
                  <div className="text-center">
                    <InputIconBadge slug={skill.inputIcon} />
                    <p className="mt-3 text-sm text-slate-400">Input Source</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-500/30 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-emerald-400" />
                    </div>
                    <p className="mt-3 text-sm text-emerald-400 font-medium">StackMatrices</p>
                  </div>
                  <div className="text-center">
                    <OutputIconBadge type={skill.outputType} icon={skill.outputIcon} />
                    <p className="mt-3 text-sm text-slate-400">Output Destination</p>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skill.features.map((feature, idx) => {
                    const IconComponent = iconMap[feature.icon] || Zap;
                    return (
                      <div key={idx} className="flex items-start p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-emerald-400" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-white">{feature.title}</h3>
                          <p className="mt-1 text-sm text-slate-400">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Integrations */}
              <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Integrations</h2>
                <div className="space-y-4">
                  {skill.integrations.map((integration, idx) => (
                    <div key={idx} className="border border-slate-700/50 rounded-lg p-4 bg-slate-800/30">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white">{integration.platform}</h3>
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{integration.description}</p>
                      <ol className="text-sm text-slate-500 space-y-1 ml-4">
                        {integration.setupSteps.map((step, stepIdx) => (
                          <li key={stepIdx} className="list-decimal">{step}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Specs */}
              <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-medium text-white mb-4">Technical Specs</h3>
                <dl className="space-y-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center text-sm text-slate-400">
                      <Clock className="w-4 h-4 mr-2" />
                      Processing Time
                    </dt>
                    <dd className="text-sm font-medium text-white">{skill.estimatedTime}</dd>
                  </div>
                  {skill.rateLimit && (
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center text-sm text-slate-400">
                        <Shield className="w-4 h-4 mr-2" />
                        Rate Limit
                      </dt>
                      <dd className="text-sm font-medium text-white">{skill.rateLimit}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center text-sm text-slate-400">
                      <Code className="w-4 h-4 mr-2" />
                      Version
                    </dt>
                    <dd className="text-sm font-medium text-white">{skill.version}</dd>
                  </div>
                </dl>
              </section>

              {/* Tags */}
              <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-medium text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* Meta Info */}
              <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-medium text-white mb-3">Meta</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Author</span>
                    <span className="text-white">{skill.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Updated</span>
                    <span className="text-white">{skill.updatedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deployments</span>
                    <span className="text-white">{skill.deployments}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileJson className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Input Parameters</h2>
              </div>
              <div className="space-y-4">
                {skill.inputs.map((input, idx) => (
                  <div key={idx} className="border-l-2 border-emerald-500/50 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-semibold text-white">{input.name}</code>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        input.required 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {input.required ? 'required' : 'optional'}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{input.type}</span>
                    </div>
                    <p className="text-sm text-slate-400">{input.description}</p>
                    {input.default !== undefined && (
                      <p className="text-xs text-slate-500 mt-1">
                        Default: <code className="bg-slate-800 px-1 rounded">{JSON.stringify(input.default)}</code>
                      </p>
                    )}
                    {input.example !== undefined && (
                      <p className="text-xs text-slate-500 mt-1">
                        Example: <code className="bg-slate-800 px-1 rounded">{JSON.stringify(input.example)}</code>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Outputs */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileJson className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Response Format</h2>
              </div>
              <div className="space-y-4">
                {skill.outputs.map((output, idx) => (
                  <div key={idx} className="border-l-2 border-emerald-500/50 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-semibold text-white">{output.name}</code>
                      <span className="text-xs text-slate-500 font-mono">{output.type}</span>
                    </div>
                    <p className="text-sm text-slate-400">{output.description}</p>
                    {output.example !== undefined && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-500 mb-1">Example:</p>
                        <pre className="text-xs bg-slate-950 text-slate-300 p-2 rounded overflow-x-auto">
                          {JSON.stringify(output.example, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* API Endpoint */}
            <section className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">API Endpoint</h2>
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-400">POST</span>
                  <button
                    onClick={() => copyToClipboard(`https://api.stackmatrices.com/v1/skills/${skill.slug}/run`)}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="text-slate-300">
                  https://api.stackmatrices.com/v1/skills/{skill.slug}/run
                </code>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Example Selector */}
            <div className="lg:col-span-1">
              <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <h2 className="text-sm font-medium text-white mb-3">Choose Example</h2>
                <div className="space-y-2">
                  {skill.examples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedExample(idx)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                        selectedExample === idx
                          ? 'bg-emerald-500/10 border border-emerald-500/30'
                          : 'hover:bg-slate-800 border border-transparent'
                      }`}
                    >
                      <div className="font-medium text-white">{example.title}</div>
                      <div className="text-slate-500 text-xs mt-1">{example.description}</div>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Example Detail */}
            <div className="lg:col-span-2">
              {skill.examples[selectedExample] && (
                <section className="space-y-6">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-white">Request</h3>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(skill.examples[selectedExample].input, null, 2))}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Copy JSON
                      </button>
                    </div>
                    <pre className="text-sm bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
                      {JSON.stringify(skill.examples[selectedExample].input, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <ArrowLeft className="w-4 h-4 text-emerald-400 rotate-90" />
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-white">Response</h3>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(skill.examples[selectedExample].output, null, 2))}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Copy JSON
                      </button>
                    </div>
                    <pre className="text-sm bg-slate-950 text-emerald-300 p-4 rounded-lg overflow-x-auto">
                      {JSON.stringify(skill.examples[selectedExample].output, null, 2)}
                    </pre>
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
