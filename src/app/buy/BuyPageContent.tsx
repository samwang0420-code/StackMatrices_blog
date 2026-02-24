'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const API_BASE_URL = 'https://api.stackmatrices.com';

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const skills: Record<string, { name: string; price: string; description: string; period: string }> = {
  'shadow-monitor': {
    name: 'Shadow Monitor',
    price: '$99',
    description: '24/7 surveillance of competitor BSR, pricing, and Buybox movements',
    period: 'month',
  },
  'review-pulse': {
    name: 'Review Pulse Analyst',
    price: '$49',
    description: 'AI-synthesized insights from competitor negative reviews',
    period: 'analysis',
  },
  'inventory-watchdog': {
    name: 'Inventory Watchdog',
    price: '$129',
    description: 'Cross-store reconciliation and automated low-stock alerts',
    period: 'month',
  },
  'margin-guardian': {
    name: 'Margin Guardian',
    price: '$89',
    description: 'Real-time profit calculations across all SKUs',
    period: 'month',
  },
  'copy-commander': {
    name: 'Copy Commander',
    price: '$39',
    description: 'Generate SEO-optimized listings using AI',
    period: 'listing',
  },
  'api-developer': {
    name: 'Data API Package',
    price: '$299',
    description: '5000 API calls per month + technical support',
    period: 'month',
  },
};

export default function BuyPageContent() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get('skill') || 'shadow-monitor';
  const skill = skills[skillId] || skills['shadow-monitor'];
  
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      setError('Please upload payment screenshot');
      return;
    }
    if (!user) {
      setError('Please login first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Get current session for auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      // 2. Convert screenshot to base64
      let screenshotBase64 = '';
      try {
        screenshotBase64 = await fileToBase64(screenshot);
        // Limit size to avoid request too large
        if (screenshotBase64.length > 2 * 1024 * 1024) {
          throw new Error('Screenshot too large. Please use an image under 2MB.');
        }
      } catch (err) {
        throw new Error('Failed to process screenshot. Please try again.');
      }

      // 3. Create order via API with base64 screenshot
      const orderData = {
        skill_id: skillId,
        skill_name: skill.name,
        amount: parseFloat(skill.price.replace('$', '')),
        currency: 'USD',
        payment_method: 'manual',
        payment_screenshot: screenshotBase64,
      };

      const response = await fetch(`${API_BASE_URL}/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create order');
      }

      const result = await response.json();
      console.log('Order created:', result);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Order error:', err);
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-slate-400 mb-6">Please login to purchase skills</p>
          <Link
            href={`/login?redirect=${encodeURIComponent(`/buy?skill=${skillId}`)}`}
            className="inline-block py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Order Submitted!</h1>
            <p className="text-slate-400 mb-6">
              We will verify your payment and send your License Key to your dashboard shortly.
            </p>
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-slate-300"><span className="text-slate-500">Skill:</span> {skill.name}</p>
              <p className="text-sm text-slate-300"><span className="text-slate-500">Amount:</span> {skill.price}</p>
              <p className="text-sm text-emerald-400">Status: Pending Verification</p>
            </div>
            <Link
              href="/dashboard"
              className="block w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6">
            <h1 className="text-2xl font-bold text-white">Deploy Skill</h1>
            <p className="text-emerald-100">{skill.name}</p>
          </div>

          {error && (
            <div className="mx-6 mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-300 mb-2">{skill.description}</p>
              <p className="text-2xl font-bold text-emerald-400">{skill.price}<span className="text-sm text-slate-500 font-normal">/{skill.period}</span></p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Payment Method</label>
              <div className="bg-slate-800/50 rounded-lg p-6 text-center">
                <p className="text-slate-400 mb-4">Please pay{' '}
                  <span className="font-bold text-emerald-400 text-xl">{skill.price}</span>
                </p>
                
                <div className="flex justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-40 h-40 bg-slate-700 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-slate-500 text-sm">Alipay QR</span>
                    </div>
                    <p className="text-sm text-slate-400">Alipay</p>
                  </div>
                  <div className="text-center">
                    <div className="w-40 h-40 bg-slate-700 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-slate-500 text-sm">WeChat QR</span>
                    </div>
                    <p className="text-sm text-slate-400">WeChat Pay</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  Scan with Alipay or WeChat to complete payment
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Upload Payment Screenshot</label>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  className="hidden"
                  id="screenshot"
                />
                <label htmlFor="screenshot" className="cursor-pointer">
                  {screenshot ? (
                    <div className="text-emerald-400">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p>Selected: {screenshot.name}</p>
                    </div>
                  ) : (
                    <div className="text-slate-500">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>Click to upload payment screenshot</p>
                      <p className="text-xs">Supports JPG, PNG</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !screenshot}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Order'}
            </button>

            <p className="text-center text-sm text-slate-500">
              Your License Key will be sent to your dashboard after verification
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
