'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Stackmatrices</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
              >
                Home
              </Link>
              <Link 
                href="/directory" 
                className={`text-sm font-medium transition-colors ${isActive('/directory') ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
              >
                Directory
              </Link>
              <Link 
                href="/blog" 
                className={`text-sm font-medium transition-colors ${isActive('/blog') ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
              >
                Blog
              </Link>
              <Link 
                href="/tools" 
                className={`text-sm font-medium transition-colors ${isActive('/tools') ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
              >
                Quick Tools
              </Link>
              <Link 
                href="/pricing" 
                className={`text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
              >
                API Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 w-64" 
                placeholder="Search tools..." 
                type="text"
              />
            </div>
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-primary"
                >
                  {user.email}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-slate-500 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-primary"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Get API Key
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
