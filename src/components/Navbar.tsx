'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">OpenClaw</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                首页
              </Link>
              <Link 
                href="/skills" 
                className={`text-sm font-medium transition-colors ${isActive('/skills') ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                技能市场
              </Link>
              <Link 
                href="/how-it-works" 
                className={`text-sm font-medium transition-colors ${isActive('/how-it-works') ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                使用指南
              </Link>
              <Link 
                href="/faq" 
                className={`text-sm font-medium transition-colors ${isActive('/faq') ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                帮助
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600"
                >
                  {user.email}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-slate-500 hover:text-red-600"
                >
                  退出
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600"
                >
                  登录
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
