import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deploy in 3 Steps | StackMatrices Skill Registry",
  description: "Deploy enterprise-grade OpenClaw skills in 3 steps: Discover, Integrate, Automate. Pre-built intelligence engines for your AI agent.",
};

const phases = [
  {
    number: "01",
    title: "Discover & Select Skill",
    subtitle: "Browse the Skill Registry",
    description: "Each skill is a pre-built intelligence engine engineered for OpenClaw. From Amazon Price Spy to Review Sentiment Analyzer—every skill is battle-tested and production-ready.",
    features: [
      "Pre-built intelligence engines",
      "OpenClaw-native architecture",
      "Production-tested workflows",
      "Clear capability documentation"
    ]
  },
  {
    number: "02",
    title: "One-Click Integration",
    subtitle: "Connect via MCP Server",
    description: "Copy our proprietary Skill JSON or connect via MCP Server. Simply plug in your API keys—Apify, Make, OpenAI. No coding, just configuration. Your agent gains superpowers in minutes.",
    features: [
      "Proprietary Skill JSON format",
      "MCP Server integration",
      "API key configuration only",
      "Zero code deployment"
    ]
  },
  {
    number: "03",
    title: "Automated Output",
    subtitle: "Intelligence Delivered",
    description: "The skill runs in your local or cloud environment. Insights flow directly to your dashboard, Slack, or Email. You own the workflow; we provide the brain. 24/7 autonomous intelligence.",
    features: [
      "Local or cloud execution",
      "Multi-channel delivery",
      "You own the workflow",
      "24/7 autonomous operation"
    ]
  }
];

// Abstract SVG Node Diagram Component
function NodeDiagram({ phase }: { phase: number }) {
  const configs = [
    { nodes: 3, connections: [[0,1], [1,2]], labels: ["SKILL", "SELECT", "DEPLOY"] },
    { nodes: 4, connections: [[0,1], [1,2], [2,3], [0,2]], labels: ["JSON", "MCP", "API", "AGENT"] },
    { nodes: 5, connections: [[0,1], [1,2], [2,3], [3,4], [1,3]], labels: ["DATA", "PROCESS", "AI", "OUTPUT", "ALERT"] }
  ];
  const config = configs[phase];
  
  return (
    <div className="w-full h-64 relative">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Grid Background */}
        <pattern id={`grid-${phase}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
        </pattern>
        <rect width="400" height="200" fill={`url(#grid-${phase})`} />
        
        {/* Connection Lines */}
        {config.connections.map(([from, to], i) => {
          const positions = [
            [60, 100], [140, 60], [220, 100], [300, 60], [340, 140]
          ];
          const [x1, y1] = positions[from];
          const [x2, y2] = positions[to];
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="20"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
          );
        })}
        
        {/* Nodes */}
        {config.labels.map((label, i) => {
          const positions = [
            [60, 100], [140, 60], [220, 100], [300, 60], [340, 140]
          ];
          const [x, y] = positions[i];
          const isActive = i === 1 || i === 2;
          return (
            <g key={i}>
              <circle
                cx={x} cy={y} r="24"
                fill={isActive ? "#10b981" : "#0f172a"}
                stroke="#10b981"
                strokeWidth="2"
              />
              <text
                x={x} y={y + 4}
                textAnchor="middle"
                fill={isActive ? "#000" : "#10b981"}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {label}
              </text>
              {/* Pulse Animation */}
              {isActive && (
                <circle cx={x} cy={y} r="24" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5">
                  <animate
                    attributeName="r"
                    from="24"
                    to="40"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
        
        {/* Phase Label */}
        <text
          x="200" y="180"
          textAnchor="middle"
          fill="#475569"
          fontSize="12"
          fontFamily="monospace"
        >
          PHASE 0{phase + 1} // DEPLOYMENT SEQUENCE
        </text>
      </svg>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            DEPLOYMENT PROTOCOL
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            3 Steps to Deploy{" "}
            <span className="text-emerald-400">Top-Tier Intelligence</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-mono">
            From registry selection to autonomous operation.
            No coding. Just configuration.
          </p>
        </div>
      </section>

      {/* Phases */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="space-y-32">
          {phases.map((phase, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-400 font-mono">{phase.number}</span>
                  </div>
                  <div className="px-3 py-1 bg-slate-800 rounded text-emerald-400 text-xs font-mono border border-slate-700">
                    PHASE_{phase.number}
                  </div>
                </div>
                
                <p className="text-emerald-400 text-sm font-mono mb-2 tracking-wider">{phase.subtitle.toUpperCase()}</p>
                <h2 className="text-3xl font-bold mb-4">{phase.title}</h2>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">{phase.description}</p>
                
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {phase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-emerald-500">▸</span>
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <NodeDiagram phase={index} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-24 px-6 border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Skill Architecture</h2>
            <p className="text-slate-400 font-mono">How OpenClaw Skills integrate with your stack</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="grid grid-cols-5 gap-4 items-center">
              {/* Data Sources */}
              <div className="text-center">
                <div className="bg-slate-800 rounded-lg p-4 mb-2 border border-slate-700">
                  <div className="text-xs font-mono text-slate-400 mb-2">DATA_SOURCES</div>
                  <div className="space-y-1">
                    <div className="text-xs bg-slate-700 rounded px-2 py-1">Amazon</div>
                    <div className="text-xs bg-slate-700 rounded px-2 py-1">Shopify</div>
                    <div className="text-xs bg-slate-700 rounded px-2 py-1">G2</div>
                  </div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center">
                <div className="text-emerald-500 text-2xl">→</div>
              </div>
              
              {/* Skill Engine */}
              <div className="text-center">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-2">
                  <div className="text-xs font-mono text-emerald-400 mb-2">SKILL_ENGINE</div>
                  <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center">
                <div className="text-emerald-500 text-2xl">→</div>
              </div>
              
              {/* Output */}
              <div className="text-center">
                <div className="bg-slate-800 rounded-lg p-4 mb-2 border border-slate-700">
                  <div className="text-xs font-mono text-slate-400 mb-2">OUTPUT</div>
                  <div className="space-y-1">
                    <div className="text-xs bg-slate-700 rounded px-2 py-1">Slack</div>
                    <div className="text-xs bg-slate-700 rounded px-2 py-1">Email</div>
                    <div className="text-xs bg-slate-700 rounded px-2 py-1">Dashboard</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-slate-300 font-mono">MCP_SERVER // OPENCLAW_RUNTIME</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Deploy?
          </h2>
          <p className="text-slate-400 text-lg mb-8 font-mono">
            Select your first skill from the registry.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Browse Skill Registry
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
