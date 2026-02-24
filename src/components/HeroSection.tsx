'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// OpenClaw Lobster Icon
const LobsterIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="currentColor">
    <path d="M24 8C20 8 17 11 17 15C17 19 20 22 24 22C28 22 31 19 31 15C31 11 28 8 24 8Z" opacity="0.9" />
    <path d="M20 22L18 30L24 34L30 30L28 22" opacity="0.8" />
    <path d="M18 30L16 38L24 42L32 38L30 30" opacity="0.7" />
    <path d="M17 14C12 12 8 15 6 20C4 25 7 30 12 32C15 33 18 31 19 28" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path d="M31 14C36 12 40 15 42 20C44 25 41 30 36 32C33 33 30 31 29 28" stroke="currentColor" strokeWidth="2.5" fill="none" />
  </svg>
);

// Simple Icons CDN
const getIconUrl = (name: string) => `https://api.iconify.design/${name}.svg?color=white`;

// Source Node Component
function SourceNode({ icon, name, delay }: { icon: string; name: string; delay: number }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center p-2 overflow-hidden"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      >
        <img src={getIconUrl(icon)} alt={name} className="w-full h-full object-contain filter brightness-0 invert" />
      </motion.div>
      <span className="text-[10px] text-slate-500 mt-1">{name}</span>
    </motion.div>
  );
}

// Delivery Node Component
function DeliveryNode({ icon, name, delay }: { icon: string; name: string; delay: number }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center p-2 overflow-hidden"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay + 0.5 }}
      >
        <img src={getIconUrl(icon)} alt={name} className="w-full h-full object-contain filter brightness-0 invert" />
      </motion.div>
      <span className="text-[10px] text-slate-500 mt-1">{name}</span>
    </motion.div>
  );
}

// Engine Core Component
function EngineCore() {
  return (
    <motion.div
      className="relative w-24 h-24 flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Rotating scanning ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-emerald-500/20"
        style={{ borderStyle: 'dashed' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Core with glow */}
      <motion.div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 border border-emerald-500/50 flex items-center justify-center"
        style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-emerald-400">
          <LobsterIcon />
        </div>
      </motion.div>
      
      <div className="absolute -bottom-6 text-[10px] text-emerald-400 font-mono">
        ENGINE
      </div>
    </motion.div>
  );
}

// Data Packet Component
function DataPacket({ path, delay, onReachEngine }: { path: string; delay: number; onReachEngine?: boolean }) {
  const [hasReached, setHasReached] = useState(false);
  
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        background: hasReached ? '#10b981' : '#ffffff',
        boxShadow: hasReached ? '0 0 8px #10b981' : '0 0 4px rgba(255,255,255,0.5)'
      }}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: '100%' }}
      transition={{ 
        duration: 2.5, 
        repeat: Infinity, 
        delay, 
        ease: "easeInOut" 
      }}
      onUpdate={(latest: any) => {
        if (latest.offsetDistance > 45 && latest.offsetDistance < 55 && !hasReached) {
          setHasReached(true);
        }
        if (latest.offsetDistance > 90 && hasReached) {
          setHasReached(false);
        }
      }}>
      <svg className="absolute w-0 h-0">
        <defs>
          <path id={`path-${delay}`} d={path} fill="none" />
        </defs>
      </svg>
      <style jsx>{`
        div {
          offset-path: path('${path}');
        }
      `}</style>
    </motion.div>
  );
}

// Connection Line SVG
function ConnectionLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Source to Engine paths */}
      <path
        d="M 80 80 Q 150 100 180 150"
        fill="none"
        stroke="rgba(63, 63, 70, 0.5)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M 80 220 Q 150 200 180 150"
        fill="none"
        stroke="rgba(63, 63, 70, 0.5)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      
      {/* Engine to Delivery paths */}
      <path
        d="M 220 150 Q 250 100 320 80"
        fill="none"
        stroke="rgba(63, 63, 70, 0.5)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M 220 150 Q 250 200 320 220"
        fill="none"
        stroke="rgba(63, 63, 70, 0.5)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

// Intelligence Pipeline Animation
function IntelligencePipeline() {
  return (
    <div className="relative w-full h-[300px] hidden lg:block">
      <ConnectionLines />
      
      
      {/* Source Zone - Left */}
      <SourceNode icon="logos:amazon" name="Amazon" delay={0} />
      <div className="absolute left-[15%] top-[65%]">
        <SourceNode icon="logos:shopify" name="Shopify" delay={0.2} />
      </div>
      
      
      {/* Engine Zone - Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <EngineCore />
      </div>
      
      
      {/* Delivery Zone - Right */}
      <div className="absolute right-[15%] top-[20%]">
        <DeliveryNode icon="logos:google-sheets" name="Sheets" delay={0.4} />
      </div>
      
      <div className="absolute right-[15%] top-[65%]">
        <DeliveryNode icon="logos:slack-icon" name="Slack" delay={0.6} />
      </div>
      
      
      {/* Animated Data Packets */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white"
          style={{ 
            left: '20%', 
            top: '27%',
            boxShadow: '0 0 6px rgba(255,255,255,0.8)'
          }}
          animate={{
            left: ['20%', '50%', '80%'],
            top: ['27%', '50%', '27%'],
            backgroundColor: ['#ffffff', '#10b981', '#10b981'],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white"
          style={{ 
            left: '20%', 
            top: '73%',
            boxShadow: '0 0 6px rgba(255,255,255,0.8)'
          }}
          animate={{
            left: ['20%', '50%', '80%'],
            top: ['73%', '50%', '73%'],
            backgroundColor: ['#ffffff', '#10b981', '#10b981'],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
          style={{ 
            left: '50%', 
            top: '50%',
            boxShadow: '0 0 8px #10b981'
          }}
          animate={{
            left: ['50%', '80%', '50%'],
            top: ['50%', '27%', '50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.75,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
          style={{ 
            left: '50%', 
            top: '50%',
            boxShadow: '0 0 8px #10b981'
          }}
          animate={{
            left: ['50%', '80%', '50%'],
            top: ['50%', '73%', '50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 2.25,
            ease: "easeInOut"
          }}
        />
      </div>
      
      
      {/* Labels */}
      <div className="absolute left-[10%] bottom-4 text-[10px] text-slate-600 font-mono">
        SOURCE
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 text-[10px] text-emerald-500/70 font-mono">
        ENGINE
      </div>
      <div className="absolute right-[10%] bottom-4 text-[10px] text-slate-600 font-mono">
        DELIVERY
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
