'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Globe, 
  ShoppingCart, 
  Table, 
  MessageSquare, 
  Cpu,
  Zap
} from 'lucide-react';

// Source Node with Lucide Icon
function SourceNode({ 
  icon: Icon, 
  name, 
  delay,
  position
}: { 
  icon: React.ElementType;
  name: string; 
  delay: number;
  position: { left: string; top: string };
}) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-600 flex items-center justify-center shadow-lg shadow-black/20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
      >
        <Icon className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
      </motion.div>
      <span className="text-[10px] text-slate-400 mt-2 font-mono uppercase tracking-wider">{name}</span>
    </motion.div>
  );
}

// Delivery Node with Lucide Icon
function DeliveryNode({ 
  icon: Icon, 
  name, 
  delay,
  position
}: { 
  icon: React.ElementType;
  name: string; 
  delay: number;
  position: { right: string; top: string };
}) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-600 flex items-center justify-center shadow-lg shadow-black/20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: delay + 1, ease: "easeInOut" }}
      >
        <Icon className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
      </motion.div>
      <span className="text-[10px] text-slate-400 mt-2 font-mono uppercase tracking-wider">{name}</span>
    </motion.div>
  );
}

// Engine Core with CPU/Lobster Icon
function EngineCore() {
  return (
    <motion.div
      className="relative w-28 h-28 flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Rotating scanning ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-emerald-500/20"
        style={{ borderStyle: 'dashed' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Core with glow */}
      <motion.div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-900/50 border border-emerald-400/50 flex items-center justify-center"
        style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(16, 185, 129, 0.2)' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Cpu className="w-8 h-8 text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" strokeWidth={1.5} />
      </motion.div>
      
      <div className="absolute -bottom-7 text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
        ENGINE
      </div>
    </motion.div>
  );
}

// Connection Lines SVG
function ConnectionLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Source to Engine paths */}
      <path
        d="M 70 90 Q 130 120 160 150"
        fill="none"
        stroke="url(#gradient-left)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        opacity="0.4"
      />
      <path
        d="M 70 210 Q 130 180 160 150"
        fill="none"
        stroke="url(#gradient-left)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        opacity="0.4"
      />
      
      {/* Engine to Delivery paths */}
      <path
        d="M 240 150 Q 270 120 330 90"
        fill="none"
        stroke="url(#gradient-right)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        opacity="0.4"
      />
      <path
        d="M 240 150 Q 270 180 330 210"
        fill="none"
        stroke="url(#gradient-right)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        opacity="0.4"
      />
      
      <defs>
        <linearGradient id="gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Data Particle
function DataParticle({ 
  startPos, 
  viaPos, 
  endPos, 
  delay 
}: { 
  startPos: { x: string; y: string };
  viaPos: { x: string; y: string };
  endPos: { x: string; y: string };
  delay: number;
}) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: startPos.x,
        top: startPos.y,
        background: 'radial-gradient(circle, #10b981 0%, #059669 100%)',
        boxShadow: '0 0 10px #10b981, 0 0 20px #10b981'
      }}
      animate={{
        left: [startPos.x, viaPos.x, endPos.x],
        top: [startPos.y, viaPos.y, endPos.y],
        scale: [0.8, 1.2, 0.8],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );
}

// Intelligence Pipeline Animation
function IntelligencePipeline() {
  return (
    <div className="relative w-full h-[320px]">
      <ConnectionLines />
      
      
      {/* Source Zone - Left */}
      <SourceNode 
        icon={Globe} 
        name="Source" 
        delay={0} 
        position={{ left: '12%', top: '22%' }}
      />
      
      <SourceNode 
        icon={ShoppingCart} 
        name="Store" 
        delay={0.2} 
        position={{ left: '12%', top: '62%' }}
      />
      
      
      {/* Engine Zone - Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <EngineCore />
      </div>
      
      
      {/* Delivery Zone - Right */}
      <DeliveryNode 
        icon={Table} 
        name="Sheets" 
        delay={0.4} 
        position={{ right: '12%', top: '22%' }}
      />
      
      <DeliveryNode 
        icon={MessageSquare} 
        name="Alerts" 
        delay={0.6} 
        position={{ right: '12%', top: '62%' }}
      />
      
      
      {/* Data Particles - Flow Animation */}
      <DataParticle 
        startPos={{ x: '18%', y: '30%' }}
        viaPos={{ x: '50%', y: '50%' }}
        endPos={{ x: '82%', y: '30%' }}
        delay={0}
      />
      
      <DataParticle 
        startPos={{ x: '18%', y: '70%' }}
        viaPos={{ x: '50%', y: '50%' }}
        endPos={{ x: '82%', y: '70%' }}
        delay={1.5}
      />
      
      <DataParticle 
        startPos={{ x: '18%', y: '30%' }}
        viaPos={{ x: '50%', y: '50%' }}
        endPos={{ x: '82%', y: '70%' }}
        delay={0.75}
      />
      
      <DataParticle 
        startPos={{ x: '18%', y: '70%' }}
        viaPos={{ x: '50%', y: '50%' }}
        endPos={{ x: '82%', y: '30%' }}
        delay={2.25}
      />
      
      
      {/* Labels */}
      <div className="absolute left-[8%] bottom-2 text-[9px] text-slate-500 font-mono uppercase tracking-widest">
        INPUT
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] text-emerald-500/60 font-mono uppercase tracking-widest">
        PROCESS
      </div>
      <div className="absolute right-[8%] bottom-2 text-[9px] text-slate-500 font-mono uppercase tracking-widest">
        OUTPUT
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), radial-gradient(circle at 75% 75%, #10b981 0%, transparent 50%)'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              OPENCLAW_SKILL_REGISTRY
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Premier{" "}
              <span className="text-emerald-400">OpenClaw Skill</span>
              <br />
              Registry for Global Intelligence
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
              We design high-performance, ready-to-deploy Skills for the OpenClaw ecosystem. 
              Transform your AI agent into a strategic business asset.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/skills" 
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Browse Skill Registry
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/how-it-works" 
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Deployment Guide
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Zero-Code Deployment
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                MCP Server Integration
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                24/7 Autonomous Operation
              </div>
            </div>
          </div>
          
          
          {/* Right Column - Intelligence Pipeline Animation */}
          <div className="hidden lg:flex items-center justify-center">
            <IntelligencePipeline />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
