'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">
          Something went wrong
        </h1>
        
        <p className="text-slate-400 mb-6">
          We encountered an error while loading this page. Our team has been notified.
        </p>
        
        {error.message && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs text-slate-500 mb-1">Error details:</p>
            <code className="text-sm text-red-400 break-all">{error.message}</code>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// API Error Handler
export function APIError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
      <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-white mb-2">Connection Error</h3>
      <p className="text-slate-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      
      <p className="text-slate-400 mb-6 max-w-md mx-auto">{description}</p>
      
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
