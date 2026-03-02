'use client';

import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}

export function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-primary',
    white: 'text-white',
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="60"
          strokeDashoffset="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-navy z-50 flex flex-col items-center justify-center">
      <div className="w-64">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">S</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-full h-1 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          Loading StackMatrices...
        </p>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/10"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-white/10 rounded w-1/4"></div>
        <div className="h-6 bg-white/10 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded"></div>
          <div className="h-3 bg-white/10 rounded w-5/6"></div>
        </div>
        <div className="h-4 bg-white/10 rounded w-1/3 pt-4"></div>
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-white/10 rounded w-1/4"></div>
        <div className="h-10 bg-white/10 rounded w-3/4"></div>
        <div className="flex gap-4">
          <div className="h-4 bg-white/10 rounded w-24"></div>
          <div className="h-4 bg-white/10 rounded w-24"></div>
        </div>
      </div>

      <div className="aspect-video bg-white/10 rounded-xl"></div>

      <div className="space-y-4">
        <div className="h-6 bg-white/10 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-6 bg-white/10 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}
