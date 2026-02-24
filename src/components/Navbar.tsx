'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

// Monochrome OpenClaw Lobster Icon
function OpenClawLobster({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lobster body - stylized geometric design */}
      <path 
        d="M24 8C20 8 17 11 17 15C17 19 20 22 24 22C28 22 31 19 31 15C31 11 28 8 24 8Z" 
        fill="currentColor" 
        opacity="0.9"
      />
      {/* Tail segments */}
      <path 
        d="M20 22L18 30L24 34L30 30L28 22" 
        fill="currentColor" 
        opacity="0.8"
      />
      <path 
        d="M18 30L16 38L24 42L32 38L30 30" 
        fill="currentColor" 
        opacity="0.7"
      />
      {/* Claws */}
      <path 
        d="M17 14C12 12 8 15 6 20C4 25 7 30 12 32C15 33 18 31 19 28" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      <path 
        d="M31 14C36 12 40 15 42 20C44 25 41 30 36 32C33 33 30 31 29 28" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      {/* Claw pincers */}
      <path 
        d="M6 20C4 18 3 15 4 12C5 9 8 8 11 9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
      />
      <path 
        d="M42 20C44 18 45 15 44 12C43 9 40 8 37 9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
      />
      {/* Antennae */}
      <path 
        d="M22 8C21 5 19 3 16 2" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.6"
      />
      <path 
        d="M26 8C27 5 29 3 32 2" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.6"
      />
      {/* Eyes */}
      <circle cx="21" cy="13" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="27" cy="13" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <nav className="border-b border-slate-800/50 backdrop-blur-md fixed w-full z-50 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Dual-Branding Header */}
        <div className="flex items-center">
          {/* StackMatrices Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">StackMatrices</span>
          </Link>
          
          {/* Vertical Separator */}
          <div className="hidden sm:flex items-center mx-4">
            <div className="w-px h-6 bg-slate-600"></div>
          </div>
          
          {/* OpenClaw Ecosystem Badge */}
          <Link 
            href="/how-it-works" 
            className="hidden sm:flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase leading-tight">
                Official Skill Provider
              </span>
              <div className="flex items-center gap-1.5">
                <OpenClawLobster className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm font-medium text-slate-400 group-hover:text-emerald-400 transition-colors">
                  OpenClaw
                </span>
              </div>
            </div>
          </Link>
          
          {/* Mobile: Compact Version */}
          <Link 
            href="/how-it-works" 
            className="sm:hidden flex items-center gap-1.5 ml-3"
          >
            <span className="text-slate-600">|</span>
            <OpenClawLobster className="w-5 h-5 text-slate-400" />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            Home
          </Link>
          <Link 
            href="/skills" 
            className={`text-sm font-medium transition-colors ${isActive('/skills') ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            Skills
          </Link>
          <Link 
            href="/how-it-works" 
            className={`text-sm font-medium transition-colors ${isActive('/how-it-works') ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            How It Works
          </Link>
          <Link 
            href="/faq" 
            className={`text-sm font-medium transition-colors ${isActive('/faq') ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            FAQ
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard"
                className="text-sm font-medium text-slate-400 hover:text-emerald-400"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-slate-500 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login"
                className="text-sm font-medium text-slate-400 hover:text-emerald-400"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
