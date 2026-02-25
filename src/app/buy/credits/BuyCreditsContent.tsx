'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { 
  Check, 
  Zap, 
  Shield, 
  CreditCard,
  Package,
  Clock,
  Copy,
  ExternalLink
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  credits: number;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for trying out",
    price: 9,
    credits: 200
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for regular use",
    price: 49,
    credits: 1000,
    popular: true
  },
  {
    id: "business",
    name: "Business",
    description: "For power users",
    price: 199,
    credits: 5000
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.stackmatrices.com';

export default function BuyCreditsContent() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get('skill') || 'review-analyzer';
  
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedPlanData = pricingPlans.find(p => p.id === selectedPlan);

  const handlePurchase = async () => {
    if (!user) {
      setError("Please login first");
      return;
    }

    if (!selectedPlanData) {
      setError("Please select a plan");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const requestBody = {
        user_id: user.id || 'anonymous',
        skill_id: skillId,
        plan_id: selectedPlan,
        credits: selectedPlanData.credits,
        amount: selectedPlanData.price,
        currency: 'USD'
      };

      console.log('Creating order:', requestBody);

      const orderResponse = await fetch(`${API_BASE}/v1/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        console.error('Order creation failed:', errorData);
        throw new Error(errorData.detail || `Failed to create order: ${orderResponse.status}`);
      }

      const order = await orderResponse.json();
      console.log('Order created:', order);

      const confirmResponse = await fetch(`${API_BASE}/v1/orders/${order.order_id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method: 'demo',
          transaction_id: 'txn_' + Date.now()
        })
      });

      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json().catch(() => ({}));
        console.error('Payment confirmation failed:', errorData);
        throw new Error(errorData.detail || `Payment failed: ${confirmResponse.status}`);
      }

      const result = await confirmResponse.json();
      console.log('Payment confirmed:', result);
      
      if (!result.license_key) {
        throw new Error('No license key returned from server');
      }
      
      setLicenseKey(result.license_key);
      setSuccess(true);

    } catch (err: any) {
      console.error('Purchase error:', err);
      setError(err.message || 'Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyLicense = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success && licenseKey) {
    return (
      <div className="min-h-screen bg-slate-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h1>
            <p className="text-slate-400 mb-6">Your License Key has been generated</p>
            
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-400 mb-2">Your License Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-lg font-mono text-emerald-400 break-all bg-slate-950 p-2 rounded">
                  {licenseKey}
                </code>
                <button
                  onClick={copyLicense}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 text-slate-400" />}
                </button>
              </div>
              {copied && <p className="text-emerald-400 text-sm mt-2">Copied to clipboard!</p>}
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-white mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Skill</span>
                  <span className="text-white">Review Analyzer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Plan</span>
                  <span className="text-white">{selectedPlanData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Credits</span>
                  <span className="text-emerald-400">{selectedPlanData?.credits.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-700 pt-2 flex justify-between">
                  <span className="text-slate-400">Total Paid</span>
                  <span className="text-white font-medium">${selectedPlanData?.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-emerald-400 mb-3">Next Steps</h3>
              <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
                <li>Copy your License Key above</li>
                <li>Run: <code className="text-emerald-400 bg-slate-950 px-1 rounded">openclaw skill install {skillId}</code></li>
                <li>Paste your License Key when prompted</li>
                <li>Start using: <code className="text-emerald-400 bg-slate-950 px-1 rounded">&quot;Analyze reviews for https://amazon.com/dp/xxx&quot;</code></li>
              </ol>
            </div>
            
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors text-center font-medium"
              >
                Go to Dashboard
              </Link>
              <a
                href={`/skills/${skillId}`}
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-center font-medium inline-flex items-center justify-center gap-2"
              >
                View Documentation
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm mb-4">
            <Zap className="w-4 h-4" />
            For: Review Analyzer Skill
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Purchase Credits</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Credits are used when running skills. Each operation consumes credits 
            based on resource usage (data collection, AI processing, etc.)
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'bg-emerald-500/10 border-2 border-emerald-500'
                  : 'bg-slate-900 border-2 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-6">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-2xl font-bold">{plan.credits.toLocaleString()}</span>
                  <span className="text-slate-400 text-sm">credits</span>
                </div>
                
                <div className="text-sm text-slate-500">
                  ≈ {Math.floor(plan.credits / 155)} product analyses
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">What&apos;s Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Zap, text: "AI-powered review analysis" },
              { icon: Shield, text: "Local execution - data stays private" },
              { icon: Clock, text: "Credits never expire" },
              { icon: Package, text: "Access to all skill features" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <feature.icon className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Credit Usage Guide</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-800">
                <th className="pb-3 text-slate-400 font-medium">Operation</th>
                <th className="pb-3 text-slate-400 font-medium">Resource</th>
                <th className="pb-3 text-slate-400 font-medium text-right">Credits</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-800/50">
                <td className="py-3 text-white">Fetch 100 reviews</td>
                <td className="py-3 text-slate-400">Data Collection</td>
                <td className="py-3 text-emerald-400 text-right">~150</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 text-white">AI analysis</td>
                <td className="py-3 text-slate-400">AI Processing</td>
                <td className="py-3 text-emerald-400 text-right">~5</td>
              </tr>
              <tr>
                <td className="py-3 text-white">Generate report</td>
                <td className="py-3 text-slate-400">AI Processing</td>
                <td className="py-3 text-emerald-400 text-right">~2</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-slate-500 mt-4">
            Example: Analyzing 100 reviews ≈ 157 credits total
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Selected Plan</p>
              <p className="text-white font-semibold">
                {selectedPlanData?.name} - {selectedPlanData?.credits.toLocaleString()} credits
              </p>
            </div>
            
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full md:w-auto py-3 px-8 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Purchase for ${selectedPlanData?.price}
                </>
              )}
            </button>
          </div>
          
          {!user && (
            <p className="text-center text-sm text-amber-400 mt-4">
              Please <Link href="/login" className="underline">login</Link> to purchase
            </p>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            Questions?{' '}
            <Link href="/faq" className="text-emerald-400 hover:underline">
              Check our FAQ
            </Link>
            {' '}or{' '}
            <Link href="mailto:sam.wang01@icloud.com" className="text-emerald-400 hover:underline">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
