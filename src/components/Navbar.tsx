'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/cases', label: 'Cases' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="border-b border-gray-800 backdrop-blur-md fixed w-full z-50 bg-navy/90">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-navy" />
          </div>
          <span className="text-xl font-bold text-white">Stackmatrices</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href) 
                  ? 'text-primary' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <Link 
            href="/analysis-request" 
            className="bg-danger hover:bg-danger-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Free GEO Analysis
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-light border-t border-gray-800 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 text-sm ${
                isActive(item.href) 
                  ? 'text-primary' 
                  : 'text-gray-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="/audit" 
            className="block mt-4 bg-danger text-white px-4 py-2 rounded-lg text-sm font-semibold text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get My Clinic's AI Leakage Audit
          </Link>
        </div>
      )}
    </nav>
  );
}
