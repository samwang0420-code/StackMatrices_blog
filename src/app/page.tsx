import Link from "next/link";
import { Metadata } from "next";
import { 
  Shield, Activity, TrendingUp, ArrowRight, AlertTriangle, Bot, CheckCircle2,
  Brain, Search, Users, BarChart3, FileText, ArrowUpRight, Quote
} from "lucide-react";

export const metadata: Metadata = {
  title: "StackMatrices | GEO Agency for Medical Practices",
  description: "Your Patients are Asking AI. Are they Finding You or Your Competitor? We help medical practices capture AI-referred patients before competitors do.",
};

// AI Chat Demo Component
function AIChatDemo() {
  return (
    <div className="bg-navy-lighter rounded-2xl border border-gray-800 p-6 shadow-2xl">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
        <Bot className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium text-white">ChatGPT</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-white">U</span>
          </div>
          <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-white">
            What is the best dental implant clinic in Miami?
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300 mb-2">Here are the top-rated dental implant clinics in Miami:</p>
            <div className="space-y-2">
              <div className="bg-navy rounded-lg p-3 border border-primary/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm text-white">Competitor A Dental Group</span>
                </div>
              </div>
              <div className="bg-navy rounded-lg p-3 border border-primary/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm text-white">Competitor B Smile Center</span>
                </div>
              </div>
              <div className="bg-navy rounded-lg p-3 border border-gray-700 opacity-50">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-500">Your Clinic (Invisible)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Component
function StatsSection() {
  const stats = [
    { value: "47%", label: "of patients now start with AI search", icon: Brain },
    { value: "$3.4M", label: "avg annual loss for invisible practices", icon: AlertTriangle },
    { value: "89%", label: "visibility improvement with GEO", icon: TrendingUp },
    { value: "6mo", label: "to market dominance", icon: Activity },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-navy-light rounded-xl p-6 border border-gray-800 text-center">
            <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// Problem Section
function ProblemSection() {
  return (
    <div className="bg-navy-light rounded-2xl p-8 md:p-12 border border-gray-800">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-danger" />
            <span className="text-danger text-sm font-semibold uppercase tracking-wider">The Hidden Crisis</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI is Stealing Your Patients—
            <span className="text-danger">Before They Even Know You Exist</span>
          </h2>
          
          <div className="space-y-4 text-gray-400">
            <p>
              While you're investing $15K-$50K/month in SEO and Google Ads, 
              <strong className="text-white">47% of high-intent patients</strong> are now 
              asking ChatGPT, Perplexity, and Claude for recommendations.
            </p>
            <p>
              And here's the brutal truth: <strong className="text-white">AI engines don't show search results.</strong> 
              They give answers. If your practice isn't in that answer, you're invisible.
            </p>
            
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r-lg">
              <p className="text-danger font-semibold mb-1">The Math is Devastating:</p>
              <p className="text-sm">
                15 high-value patients/month × $12,000 avg procedure × 12 months = 
                <span className="text-danger font-bold">$2.16M annual loss</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-navy rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-6 text-center">Traditional Search vs AI Era</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-400">Traditional SEO Era</p>
                <p className="text-sm text-gray-500">Patient searches → sees 10 results → clicks yours → browses → maybe books</p>
                <p className="text-xs text-gray-600 mt-1">53% of market (shrinking)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">AI Recommendation Era</p>
                <p className="text-sm text-gray-400">Patient asks AI → gets 2-3 recommendations → books directly</p>
                <p className="text-xs text-primary mt-1">47% of market (growing fast)</p>
              </div>
            </div>
          </div>        </div>
      </div>
    </div>
  );
}

// Solution Section
function SolutionSection() {
  const steps = [
    {
      icon: BarChart3,
      title: "AI Visibility Audit",
      description: "Discover exactly how much revenue you're losing to AI-referred competitors.",
    },
    {
      icon: Shield,
      title: "Authority Building",
      description: "Establish your practice in AI training data and medical knowledge graphs.",
    },
    {
      icon: TrendingUp,
      title: "Intent Capture",
      description: "Optimize for conversational queries patients ask AI engines.",
    },
    {
      icon: Users,
      title: "Patient Acquisition",
      description: "Convert AI recommendations into high-intent consultations and procedures.",
    },
  ];

  return (
    <div className="text-center">
      <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Solution</p>      
      <h2 className="text-3xl md:text-4xl font-bold mb-4">GEO: The New Standard for Medical Marketing</h2>      
      <p className="text-gray-400 max-w-2xl mx-auto mb-12">
        Generative Engine Optimization ensures AI engines recommend your practice 
        when patients ask for the "best" in your specialty.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="bg-navy-light rounded-xl p-6 border border-gray-800 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>          );
        })}
      </div>
      
      <Link
        href="/interventions"
        className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
      >
        Explore Our Strategic Interventions
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

// Case Studies Preview
function CasesPreview() {
  const cases = [
    {
      title: "Elite Aesthetic Center",
      location: "Beverly Hills, CA",
      metric: "+340%",
      label: "AI Visibility",
      quote: "Within 60 days, patients started finding us through ChatGPT. We had to hire an additional coordinator.",
    },
    {
      title: "Miami Implant Specialists",
      location: "Miami, FL",
      metric: "$3.4M",
      label: "Loss Prevented",
      quote: "Our consultation calendar was fully booked 3 weeks out. The ROI has been over 800%.",
    },
    {
      title: "Radiance MedSpa Network",
      location: "California (6 locations)",
      metric: "400%",
      label: "ROI Achieved",
      quote: "AI-referred patients now represent 34% of our new consultations with highest conversion rates.",
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Success Stories</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results from Real Practices</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          See how medical practices across the country have transformed their patient acquisition 
          through strategic GEO implementation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {cases.map((study, idx) => (
          <Link
            key={idx}
            href="/cases"
            className="group bg-navy-light rounded-xl p-6 border border-gray-800 hover:border-primary transition-colors"
          >
            <div className="mb-4">
              <div className="text-3xl font-bold text-primary mb-1">{study.metric}</div>
              <div className="text-sm text-gray-400">{study.label}</div>
            </div>
            
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{study.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{study.location}</p>
            
            <div className="flex gap-2">
              <Quote className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-400 italic">"{study.quote}"...</p>
            </div>          
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 bg-navy-light hover:bg-navy-lighter text-white px-6 py-3 rounded-lg border border-gray-800 transition-colors"
        >
          View All Case Studies
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// Insights Preview
function InsightsPreview() {
  const articles = [
    {
      id: "ai-eating-seo-budget",
      title: "Why AI is Eating Your SEO Budget",
      excerpt: "Traditional SEO is dying. Here's why 47% of your market is now invisible to your $50K/month SEO spend.",
      category: "Strategy",
    },
    {
      id: "hidden-cost-calculator",
      title: "The Hidden Cost of AI Invisibility",
      excerpt: "Calculate exactly how much revenue your practice is losing to AI-referred competitor traffic.",
      category: "Analysis",
    },
    {
      id: "ai-platform-comparison",
      title: "ChatGPT vs Perplexity vs Claude",
      excerpt: "Which AI engine sends you the most patients? Platform-specific strategies for each.",
      category: "Tactics",
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Latest Insights</p>        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">GEO Intelligence</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stay ahead of the curve with our latest research on AI patient acquisition 
          and GEO best practices.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/insights/${article.id}`}
            className="group bg-navy-light rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs text-gray-500 uppercase">{article.category}</span>
            </div>
            
            <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            
            <p className="text-sm text-gray-400 mb-4">{article.excerpt}</p>
            
            <div className="flex items-center gap-1 text-primary text-sm">
              Read More
              <ArrowUpRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link 
          href="/insights" 
          className="inline-flex items-center gap-2 bg-navy-light hover:bg-navy-lighter text-white px-6 py-3 rounded-lg border border-gray-800 transition-colors"
        >
          View All Insights
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// Trust Badges
function TrustSection() {
  return (
    <div className="text-center">
      <p className="text-gray-500 text-sm mb-6">Trusted by leading medical practices across the country</p>
      
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
        {["Medical Aesthetics", "Plastic Surgery", "Dental Implants", "MedSpa Chains", "Dermatology"].map((industry, idx) => (
          <span key={idx} className="text-gray-400 text-sm">{industry}</span>
        ))}
      </div>
    </div>
  );
}

// Final CTA
function FinalCTA() {
  return (
    <div className="bg-gradient-to-r from-primary/20 via-navy-light to-danger/20 rounded-2xl p-8 md:p-12 border border-gray-800 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Stop Losing Patients to AI?</h2>      
      <p className="text-gray-400 max-w-2xl mx-auto mb-8">
        Get your free AI visibility audit and discover exactly how much revenue 
        your practice is losing—and how to recover it.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/analysis-request"
          className="inline-flex items-center justify-center gap-2 bg-danger hover:bg-danger-hover text-white px-8 py-4 rounded-lg font-semibold transition-colors"
        >
          Get My Free Audit
          <ArrowRight size={20} />
        </Link>
        
        <Link
          href="/cases"
          className="inline-flex items-center justify-center gap-2 bg-navy-light hover:bg-navy-lighter text-white px-8 py-4 rounded-lg border border-gray-800 transition-colors"
        >
          See Case Studies
        </Link>
      </div>
      
      <p className="text-xs text-gray-500 mt-6">
        Free audit delivered within 24 hours. No obligation. HIPAA compliant.
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center lg:text-left">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">GEO Agency for Medical Practices</p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Patients are Asking AI.
                <br />
                <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Are they Finding You?</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-xl mb-8">
                Traditional SEO is dying. In the age of ChatGPT and Perplexity, 
                invisibility is the new death penalty for medical practices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/analysis-request" 
                  className="inline-flex items-center justify-center gap-2 bg-danger hover:bg-danger-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Get My AI Leakage Audit
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <AIChatDemo />
            </div>
          </div>
          
          <StatsSection />
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-navy-light/50">
        <div className="max-w-6xl mx-auto">
          <ProblemSection />
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SolutionSection />
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-navy-light/50">
        <div className="max-w-6xl mx-auto">
          <CasesPreview />
        </div>
      </section>

      {/* Insights */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <InsightsPreview />
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 px-6 bg-navy-light/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-gray-400 mb-6">
            Browse our comprehensive FAQ or reach out directly.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
          >
            View FAQ
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 px-6 bg-navy-light/50">
        <div className="max-w-6xl mx-auto">
          <TrustSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}
