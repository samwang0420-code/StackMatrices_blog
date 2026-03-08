import Link from "next/link";
import { Metadata } from "next";
import { 
  Shield, Activity, TrendingUp, ArrowRight,
  Brain, Search, Users, BarChart3, FileText, ArrowUpRight, Quote,
  Stethoscope, Building2, Sparkles, HeartPulse, Microscope,
  Award, Clock, ShieldCheck
} from "lucide-react";
import { AIChatDemoAnimated } from "@/components/AIChatDemo";

export const metadata: Metadata = {
  title: "StackMatrices | GEO Agency for Medical Practices",
  description: "Local SEO meets AI search. We make your medical practice visible to patients in your city when they use ChatGPT, Perplexity, or Google.",
};

// Clean Medical Card Component
function MedicalCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}

// Medical Stats
function MedicalStats() {
  const stats = [
    { value: "47%", label: "Patients start with AI", icon: Brain },
    { value: "$3.4M", label: "Avg. annual loss", icon: TrendingUp },
    { value: "89%", label: "Visibility improvement", icon: Activity },
    { value: "24hr", label: "Audit delivery", icon: Clock },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-300">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// Trust Badges
function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, text: "HIPAA Compliant" },
    { icon: Award, text: "Medical Grade" },
    { icon: HeartPulse, text: "Patient Focused" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <div key={idx} className="flex items-center gap-2 text-gray-300">
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-sm">{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-200">GEO Agency for Medical Practices</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Your Patients Are
                <br />
                <span className="text-primary">Asking AI</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl mb-8">
                In the age of ChatGPT and Perplexity, medical practices that master 
                <span className="text-white font-semibold">Generative Engine Optimization</span> capture 
                high-intent patients before competitors even know they exist.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link 
                  href="/analysis-request" 
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-primary/25"
                >
                  Get Free AI Audit
                  <ArrowRight size={20} />
                </Link>
                
                <Link 
                  href="/cases" 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/20"
                >
                  View Case Studies
                </Link>
              </div>

              <TrustBadges />
            </div>
            
            {/* Right Content - AI Demo */}
            <div className="hidden lg:block">
              <AIChatDemoAnimated />
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-16">
            <MedicalStats />
          </div>
        </div>
      </section>

      {/* Medical Expertise Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Stethoscope className="w-5 h-5 text-primary" />
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Medical Specialties</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Leading Medical Practices</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We specialize in helping high-value medical practices dominate AI recommendations 
              across all major platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MedicalCard 
              icon={Sparkles}
              title="Medical Aesthetics"
              description="Botox, fillers, and non-surgical treatments"
            />
            <MedicalCard 
              icon={HeartPulse}
              title="Plastic Surgery"
              description="Breast, body, and facial procedures"
            />
            <MedicalCard 
              icon={Microscope}
              title="Dental Implants"
              description="Full mouth reconstruction and cosmetics"
            />
            <MedicalCard 
              icon={Building2}
              title="MedSpa Chains"
              description="Multi-location wellness brands"
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-danger" />
                <span className="text-danger text-sm font-semibold uppercase tracking-wider">The Problem</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                47% of High-Intent Patients 
                <span className="text-danger">Never Find You</span>
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  While you invest $15K-$50K/month in traditional SEO and Google Ads, 
                  nearly half of your potential patients are asking AI engines for recommendations.
                </p>
                
                <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r-lg">
                  <p className="text-danger font-semibold mb-1">The Hidden Cost:</p>
                  <p className="text-sm">
                    15 high-value patients/month × $12,000 avg procedure × 12 months = 
                    <span className="text-danger font-bold">$2.16M annual loss</span>
                  </p>
                </div>
                
                <p>
                  AI engines don't show search results—they give direct recommendations. 
                  If your practice isn't in that answer, you're invisible.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Traditional SEO vs AI Era</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Traditional Search</p>
                    <p className="text-sm text-gray-500">Patient sees 10 results → clicks yours → browses → maybe books</p>
                    <p className="text-xs text-gray-400 mt-1">53% of market (declining)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">AI Recommendations</p>
                    <p className="text-sm text-gray-600">Patient asks AI → gets 2-3 recommendations → books directly</p>
                    <p className="text-xs text-primary mt-1">47% of market (growing)</p>
                  </div>
                </div>
              </div>            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
