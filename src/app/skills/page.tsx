import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skill Registry | StackMatrices",
  description: "Ready-to-deploy OpenClaw skills. Pre-built integrations for Amazon, Shopify, Slack, and more.",
};

// Official brand SVG icons
const AmazonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#FF9900" d="M13.762 17.246c-1.627 1.202-3.982 1.844-6.01 1.844-2.847 0-5.41-1.053-7.35-2.805-.152-.137-.016-.325.167-.218 2.096 1.224 4.686 1.96 7.36 1.96 1.804 0 3.79-.376 5.617-1.152.275-.116.506.182.216.371zm.68-.774c-.208-.265-1.377-.127-1.898-.063-.16.02-.185-.12-.04-.22.93-.654 2.455-.465 2.632-.246.18.22-.047 1.755-.92 2.49-.135.114-.264.053-.204-.097.2-.496.64-1.606.43-1.864zM19.86 17.5c-.47.41-1.396.484-2.047.253-.11-.04-.146.084-.03.156.628.386 1.86.346 2.264-.12.4-.464.056-1.514-.59-2.02-.112-.087-.226-.04-.17.082.23.51.688 1.15.573 1.65zM21.35 5.8c0-2.2-1.65-3.5-4.05-3.5H6.7C4.3 2.3 2.65 3.6 2.65 5.8v12.4c0 2.2 1.65 3.5 4.05 3.5h10.6c2.4 0 4.05-1.3 4.05-3.5V5.8zm-2.35 8.5c-.75 0-1.35-.6-1.35-1.35V7.5c0-.75.6-1.35 1.35-1.35s1.35.6 1.35 1.35v5.45c0 .75-.6 1.35-1.35 1.35z" />
  </svg>
);

const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#10A37F">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-6.02 4.173-2.02-1.164a.08.08 0 0 1-.038-.057V6.075l-2.513 1.45a.782.782 0 0 0-.389.68v6.933a.773.773 0 0 0 .385.678l5.82 3.354v-2.332a.08.08 0 0 0-.035-.06z" />
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const ShopifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#96BF48">
    <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.058-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.787-.424c-1.452 0-1.519.911-1.519 1.139 0 1.252 3.25 1.733 3.25 4.683 0 2.315-1.472 3.806-3.456 3.806-2.382 0-3.592-1.484-3.592-1.484l.636-2.116s1.252 1.073 2.31 1.073c.692 0 .975-.543.975-.938 0-1.649-2.67-1.729-2.67-4.48 0-2.274 1.634-4.484 4.938-4.484 1.268 0 1.896.365 1.896.365l-.971 2.86zM12.415 4.93l-1.067-.036s-.098-.659-.445-.659c-.375 0-.465.333-.465.545 0 .56.988.778 1.647 1.646.519.682.459 1.5.459 1.541 0 .024-.045.042-.09.042-.045 0-.546-.042-1.003-.042-.465 0-.878.036-.878.036l-.084-3.163c0-.024.021-.06.06-.06.135 0 1.095-.114 1.095-1.239 0-.26-.063-.327-.315-.327-.204 0-.277.183-.277.348 0 .222.135.276.135.276l.067.06c.09.075.078.213-.021.258-.021.012-.048.018-.075.018-.093 0-.315-.066-.471-.246-.234-.27-.273-.684-.273-.891 0-.75.549-1.29 1.269-1.29.765 0 1.428.624 1.428 1.623 0 .759-.327 1.311-.393 1.386z" />
  </svg>
);

const GoogleSheetsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#34A853" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const ApifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FF6B6B">
    <circle cx="12" cy="12" r="10" />
    <path fill="white" d="M8 12l4-4 4 4-4 4z" />
  </svg>
);

// Plus badge for complexity indicator
const PlusBadge = ({ count }: { count: number }) => (
  <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
    +{count}
  </div>
);

// Integration Badge Component
function IntegrationBadge({ icon: Icon, bgColor }: { icon: React.FC; bgColor: string }) {
  return (
    <div 
      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-slate-800 shadow-md ${bgColor}`}
    >
      <div className="w-5 h-5">
        <Icon />
      </div>
    </div>
  );
}

// Skill Card Component
function SkillCard({ 
  skill 
}: { 
  skill: typeof skills[0];
}) {
  return (
    <div className="group bg-slate-800/80 rounded-lg p-4 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:bg-slate-800">
      {/* Integration Icons Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex -space-x-1.5">
          {skill.integrations.map((integration, idx) => (
            <div key={idx} className="relative z-10 hover:z-20 transition-transform hover:scale-110">
              <IntegrationBadge icon={integration.icon} bgColor={integration.bgColor} />
            </div>
          ))}
          {skill.additionalSteps > 0 && (
            <div className="relative z-10">
              <PlusBadge count={skill.additionalSteps} />
            </div>
          )}
        </div>
        <div className="text-[10px] font-mono text-slate-500">
          {skill.deployments}
        </div>
      </div>

      {/* Action Title - Verb First */}
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

const skills = [
  {
    id: "sync-amazon-prices",
    actionTitle: "Sync Amazon Competitor Price Drops to Google Sheets",
    outcome: "First-mover alerts",
    description: "Monitor competitor pricing 24/7 and auto-sync drops to your spreadsheet for immediate action.",
    price: "$99",
    period: "mo",
    deployments: "2.4k",
    additionalSteps: 2,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: ApifyIcon, bgColor: "bg-slate-700" },
      { icon: GoogleSheetsIcon, bgColor: "bg-white" },
    ]
  },
  {
    id: "extract-review-insights",
    actionTitle: "Extract Competitor Weaknesses from Reviews via AI",
    outcome: "Exploit defects",
    description: "AI analyzes last 100 competitor reviews, categorizes complaints, identifies product gaps.",
    price: "$49",
    period: "analysis",
    deployments: "1.8k",
    additionalSteps: 0,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: OpenAIIcon, bgColor: "bg-slate-700" },
      { icon: SlackIcon, bgColor: "bg-white" },
    ]
  },
  {
    id: "track-listing-changes",
    actionTitle: "Track Amazon Listing Changes & Alert via Slack",
    outcome: "SEO intelligence",
    description: "Monitors title, bullets, images, backend keywords. Alerts on any competitor SEO changes.",
    price: "$79",
    period: "mo",
    deployments: "980",
    additionalSteps: 1,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: ApifyIcon, bgColor: "bg-slate-700" },
      { icon: SlackIcon, bgColor: "bg-white" },
    ]
  },
  {
    id: "sync-multi-inventory",
    actionTitle: "Sync Multi-Channel Inventory Levels in Real-Time",
    outcome: "Zero stockouts",
    description: "Unifies Amazon, Shopify, warehouse stock. Alerts before you hit zero inventory.",
    price: "$129",
    period: "mo",
    deployments: "3.1k",
    additionalSteps: 3,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: ShopifyIcon, bgColor: "bg-white" },
      { icon: SlackIcon, bgColor: "bg-white" },
    ]
  },
  {
    id: "calculate-true-margins",
    actionTitle: "Calculate True Profit Margins Across All SKUs",
    outcome: "Hidden cost detection",
    description: "Factors in Amazon fees, COGS, shipping, PPC. Real profitability per SKU.",
    price: "$89",
    period: "mo",
    deployments: "1.5k",
    additionalSteps: 0,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: OpenAIIcon, bgColor: "bg-slate-700" },
      { icon: GoogleSheetsIcon, bgColor: "bg-white" },
    ]
  },
  {
    id: "generate-ai-listings",
    actionTitle: "Generate AI-Optimized Listings from Competitor Data",
    outcome: "Higher CTR & CVR",
    description: "Analyzes top performers + buyer psychology. Creates SEO-optimized listings.",
    price: "$39",
    period: "listing",
    deployments: "4.2k",
    additionalSteps: 1,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: OpenAIIcon, bgColor: "bg-slate-700" },
    ]
  },
  {
    id: "forecast-replenishment",
    actionTitle: "Forecast Replenishment Needs with ML Models",
    outcome: "Optimal stock levels",
    description: "ML-powered demand forecasting based on velocity, seasonality, lead times.",
    price: "$199",
    period: "mo",
    deployments: "720",
    additionalSteps: 2,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: ShopifyIcon, bgColor: "bg-white" },
      { icon: OpenAIIcon, bgColor: "bg-slate-700" },
    ]
  },
  {
    id: "audit-amazon-fees",
    actionTitle: "Audit Amazon FBA & Storage Fee Errors",
    outcome: "Recover 2-5% revenue",
    description: "Automated detection of incorrect FBA, storage, referral fee charges.",
    price: "$149",
    period: "mo",
    deployments: "890",
    additionalSteps: 0,
    integrations: [
      { icon: AmazonIcon, bgColor: "bg-white" },
      { icon: GoogleSheetsIcon, bgColor: "bg-white" },
    ]
  },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md fixed w-full z-50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">StackMatrices</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
            PRE-BUILT INTEGRATIONS
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ready-to-Deploy{" "}
            <span className="text-emerald-400">Skills</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connect your stack. Automate your workflow. Scale your business.
          </p>
        </div>
      </section>

      {/* Skills Grid - 4 columns on large screens */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
          <p className="text-slate-400 mb-6">Our architects build custom skills for your specific stack.</p>
          
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Book Custom Build
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 StackMatrices. Strategic Intelligence & Automation Architecture.</p>
        </div>
      </footer>
    </div>
  );
}
