import Link from "next/link";
import { Metadata } from "next";
import { Shield, Activity, TrendingUp, ArrowRight, AlertTriangle, Bot, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "StackMatrices | GEO Agency for Medical Practices",
  description: "Your Patients are Asking AI. Are they Finding You or Your Competitor?",
};

// AI Chat Demo Component
function AIChatDemo() {
  return (
    <div className="bg-navy-lighter rounded-2xl border border-gray-800 p-6 max-w-md mx-auto shadow-2xl">
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">AI Patient Intent Capture Systems</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Patients are Asking AI.
                <br />
                <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Are they Finding You?</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-xl mb-8">Traditional SEO is dying. In the age of ChatGPT and Perplexity, invisibility is the new death penalty for clinics.</p>
              <Link href="/audit" className="inline-flex items-center gap-2 bg-danger hover:bg-danger-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Get My AI Leakage Audit
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="hidden lg:block">
              <AIChatDemo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
