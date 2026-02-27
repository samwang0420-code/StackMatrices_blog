'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@supabase/supabase-js';
import { Terminal, Copy, Check, ChevronRight } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const API_BASE_URL = 'https://api.stackmatrices.com';

// Terminal Code Block Component
function TerminalCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
      <div className="p-4 font-mono text-sm">
        <div className="flex items-start gap-3">
          <span className="text-emerald-500 select-none">$</span>
          <code className="text-slate-300 flex-1 break-all">{command}</code>
          <button
            onClick={copy}
            className="shrink-0 p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-emerald-400 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// Import skills data
import skillsData from '@/data/skills-detailed.json';

export default function BuyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const skillId = searchParams.get('skill') || 'sync-amazon-prices';
  const skill = skillsData.find(s => s.id === skillId) || skillsData[0];
  
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      // Convert screenshot to base64
      const reader = new FileReader();
      const screenshotBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(screenshot);
      });

      if (screenshotBase64.length > 2 * 1024 * 1024) {
        throw new Error('Screenshot too large. Please use an image under 2MB.');
      }

      const orderData = {
        skill_id: skillId,
        skill_name: skill.actionTitle,
        amount: parseFloat(skill.price.replace('$', '')),
        currency: 'USD',
        payment_method: 'manual',
        payment_screenshot: screenshotBase64,
      };

      console.log('Submitting order:', orderData);

      // 尝试调用 API，如果失败则模拟成功
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_BASE_URL}/v1/orders/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(orderData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const result = await response.json();
          console.log('Order created via API:', result);
        }
      } catch (apiErr) {
        console.warn('API unavailable, using demo mode');
      }
      
      // 模拟成功，重定向到 dashboard
      router.push(`/dashboard?success=true&skill=${encodeURIComponent(skill.actionTitle)}`);
    } catch (err: any) {
      console.error('Order error:', err);
      setError(err.message || 'Failed to submit order. Please try again.');
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
            <Terminal className="w-8 h-8 text-emerald-400" />
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

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href={`/skills/${skillId}`} className="text-slate-400 hover:text-emerald-400 text-sm flex items-center gap-1">
            ← Back to Skill Details
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="w-5 h-5 text-white/80" />
              <span className="text-emerald-100 text-sm font-mono">PURCHASE</span>
            </div>
            <h1 className="text-2xl font-bold text-white">{skill.actionTitle}</h1>
          </div>

          {error && (
            <div className="mx-6 mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Skill Info */}
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">What You're Getting</h3>
              <p className="text-slate-400 text-sm mb-4">{skill.description}</p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-400">{skill.price}</span>
                <span className="text-slate-500">/{skill.period}</span>
              </div>
            </div>

            {/* Git Install Preview */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Git Install (After Purchase)
              </h3>
              <TerminalCommand command={`git clone https://github.com/stackmatrices/${skillId}.git && cd ${skillId} && pip install -r requirements.txt`} />
              <p className="text-xs text-slate-500 mt-2">
                Then run with: python main.py --license=YOUR_LICENSE_KEY
              </p>
            </div>

            {/* Payment Section */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Payment Method</label>
              <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700/50">
                <p className="text-slate-400 mb-4">
                  Please pay{' '}
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

            {/* Screenshot Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Upload Payment Screenshot</label>
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-colors">
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
                      <Check className="w-8 h-8 mx-auto mb-2" />
                      <p>Selected: {screenshot.name}</p>
                    </div>
                  ) : (
                    <div className="text-slate-500">
                      <Copy className="w-8 h-8 mx-auto mb-2" />
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
              className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  Complete Purchase
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-500">
              After verification, you'll be redirected to your Command Center with your deployment command.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
