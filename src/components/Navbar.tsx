'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <nav className="border-b border-slate-800/50 backdrop-blur-md fixed w-full z-50 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">StackMatrices</span>
        </Link>
        
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
            Intel Skills
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
