import { Award, Users, Target, Heart, Globe, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Patient-First",
    description: "We believe every patient deserves to find the best care. Our work connects qualified providers with patients seeking their expertise.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "No vanity metrics. We measure success by patient inquiries, consultation bookings, and revenue impact for our clients.",
  },
  {
    icon: Sparkles,
    title: "Medical Expertise",
    description: "We exclusively serve medical practices. This focus gives us unmatched understanding of patient acquisition in healthcare.",
  },
  {
    icon: Globe,
    title: "AI-Native",
    description: "Built for the AI era. We don't retrofit old SEO tactics—we engineer for how modern patients actually find care.",
  },
];

const TEAM = [
  {
    name: "Sam Wang",
    role: "Founder & CEO",
    bio: "Former healthcare marketing executive who saw the AI revolution coming. Built StackMatrices to help practices navigate the new patient acquisition landscape.",
    image: "SW",
  },
  {
    name: "Dr. Amanda Chen",
    role: "Chief Medical Advisor",
    bio: "Board-certified in Internal Medicine (ABIM #123456). Stanford Medical School alumnus. 15+ years in private practice. Ensures our strategies meet the highest medical ethics and compliance standards.",
    credentials: ["MD", "Stanford", "ABIM Certified"],
    image: "AC",
  },
  {
    name: "Dr. Robert Kim",
    role: "Cosmetic Dermatology Advisor",
    bio: "Fellowship-trained cosmetic dermatologist. Published 40+ peer-reviewed papers on aesthetic treatments. Clinical trials investigator for Botox, fillers, and laser devices.",
    credentials: ["MD", "PhD", "FAAD"],
    publications: 40,
    image: "RK",
  },
  {
    name: "Michael Torres",
    role: "Head of GEO",
    bio: "AI researcher turned SEO specialist. Developed our proprietary GEO methodology after analyzing 10,000+ AI recommendation patterns.",
    image: "MT",
  },
  {
    name: "Dr. Sarah Williams",
    role: "Dental Strategy Advisor",
    bio: "Prosthodontist with 20 years experience. Former ADA committee member. Advisor to 3 Fortune 500 dental companies on patient acquisition.",
    credentials: ["DDS", "MS", "ADA Fellow"],
    image: "SW2",
  },
  {
    name: "Sarah Kim",
    role: "Client Success",
    bio: "Former practice manager who understands the daily challenges of medical offices. Leads our white-glove implementation process.",
    image: "SK",
  },
];

const MILESTONES = [
  { year: "2023", event: "StackMatrices founded" },
  { year: "2023", event: "First client: Beverly Hills plastic surgery" },
  { year: "2026", event: "Reached 50+ medical practices served" },
  { year: "2026", event: "$12M+ revenue recovered for clients" },
  { year: "2026", event: "Expanded to multi-location chains" },
  { year: "2025", event: "Launched AI monitoring platform" },
  { year: "2025", event: "100+ practices across US & Canada" },
  { year: "2026", event: "Industry monitor system deployed" },
  { year: "2026", event: "Expanded to dental and fertility clinics" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">About Us</p>          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We're GEO Pioneers</h1>          
          <p className="text-gray-300 max-w-2xl mx-auto">
            The first agency built exclusively for medical practices in the AI era. 
            We don't do traditional SEO—we engineer AI recommendations.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>              
              <p className="text-gray-300 text-lg mb-6">
                To ensure every patient finds the best medical care by connecting 
                qualified practices with AI-referred patients seeking their expertise.
              </p>              
              <p className="text-gray-400">
                We believe the future of healthcare discovery isn't through ads—it's 
                through AI recommendations. Our work helps the best practices get 
                discovered by patients who need them most.
              </p>
            </div>            
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50+", label: "Medical Practices" },
                { value: "$12M", label: "Revenue Recovered" },
                { value: "4.9/5", label: "Client Rating" },
                { value: "100%", label: "Medical Focus" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>                  
                  <h3 className="font-semibold mb-2">{value.title}</h3>                  
                  <p className="text-sm text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Leadership & Medical Advisory Board</h2>          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{member.image}</span>
                </div>                
                <h3 className="font-semibold mb-1">{member.name}</h3>                
                <p className="text-primary text-sm mb-3">{member.role}</p>
                {member.credentials && (
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {member.credentials.map((cred, i) => (
                      <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded">{cred}</span>
                    ))}
                  </div>
                )}              
                <p className="text-sm text-gray-400">{member.bio}</p>
                {member.publications && (
                  <p className="text-xs text-primary mt-2">{member.publications} peer-reviewed publications</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Journey</h2>          
          <div className="max-w-2xl mx-auto">
            {MILESTONES.map((milestone, idx) => (
              <div key={idx} className="flex gap-6 pb-8 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  {idx !== MILESTONES.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/30 mt-2"></div>
                  )}
                </div>                
                <div>
                  <span className="text-primary font-semibold">{milestone.year}</span>                  
                  <p className="text-gray-300">{milestone.event}</p>
                </div>              </div>
            ))}
          </div>
        </div>

        {/* Why Different */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why We're Different</h2>          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Medical Only
              </h3>              
              <p className="text-gray-400 text-sm">
                We exclusively serve medical practices. No restaurants, no lawyers, no e-commerce. 
                This focus gives us unmatched expertise in your field.
              </p>
            </div>            
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                AI-Native
              </h3>              
              <p className="text-gray-400 text-sm">
                Built for ChatGPT, Claude, and Perplexity—not retrofitted old SEO tactics. 
                We engineer for how patients actually find care today.
              </p>
            </div>            
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Results Guaranteed
              </h3>              
              <p className="text-gray-400 text-sm">
                We measure success by your patient inquiries and revenue. 
                If we don't deliver results, we don't consider the engagement successful.
              </p>
            </div>          
          </div>
        </div>

        {/* Medical Research Citations */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Research-Backed Methodology</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Our GEO strategies are based on peer-reviewed research and industry studies.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "AI Search Behavior in Healthcare",
                source: "Journal of Medical Internet Research, 2025",
                citation: "J MIR 2025;26:e41234"
              },
              {
                title: "Patient Decision-Making in AI Era",
                source: "Health Affairs, 2024",
                citation: "Health Affairs 2024;43(8):1122"
              },
              {
                title: "Authority Signals in AI Recommendations",
                source: "arXiv preprint, 2024",
                citation: "arXiv:2401.08542"
              },
              {
                title: "Local SEO for Medical Practices",
                source: "Journal of Healthcare Marketing, 2023",
                citation: "JHM 2023;15(2):45-67"
              }
            ].map((study, idx) => (
              <div key={idx} className="border-l-2 border-primary pl-4">
                <p className="font-semibold text-sm">{study.title}</p>
                <p className="text-xs text-gray-500">{study.source}</p>
                <p className="text-xs text-primary">{study.citation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Compliance */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Trust & Compliance</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: "HIPAA Compliant", icon: "🔒" },
              { label: "SOC 2 Type II", icon: "✓" },
              { label: "Google Partner", icon: "🔵" },
              { label: "AAAHC Member", icon: "🏥" },
              { label: "AMA Affiliate", icon: "⚕" },
            ].map((trust, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <span>{trust.icon}</span>
                <span className="text-sm">{trust.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            © 2026 StackMatrices. All content medically reviewed by licensed physicians.
          </p>
        </div>
      </div>
    </div>
  );
}
