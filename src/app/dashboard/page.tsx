'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { 
  Zap, 
  CreditCard, 
  Package, 
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface License {
  id: string;
  key: string;
  skill_id: string;
  skill_name: string;
  type: 'credits' | 'subscription';
  status: 'active' | 'expired' | 'revoked';
  credits_total: number | null;
  credits_used: number;
  credits_remaining: number | null;
  expires_at: string | null;
  created_at: string;
}

interface CreditsInfo {
  total_purchased: number;
  total_used: number;
  remaining: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.gspr-hub.site';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [credits, setCredits] = useState<CreditsInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch licenses from API
      const response = await fetch(`${API_BASE}/v1/user/licenses`, {
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLicenses(data.licenses || []);
        setCredits(data.credits || null);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAuthToken = async () => {
    // Get token from Supabase session
    // This is a placeholder - actual implementation depends on your auth setup
    return 'token';
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getUsagePercentage = (used: number, total: number) => {
    return Math.min((used / total) * 100, 100);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Please login to view your dashboard</p>
          <Link href="/login" className="py-2 px-4 bg-emerald-500 text-white rounded-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">{user.email}</p>
        </div>

        {/* Credits Overview */}
        {credits && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Available Credits</span>
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white">{credits.remaining.toLocaleString()}</div>
              <Link href="/buy/credits" className="text-emerald-400 text-sm hover:underline mt-2 inline-block">
                + Buy More
              </Link>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Total Purchased</span>
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">{credits.total_purchased.toLocaleString()}</div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Total Used</span>
                <Package className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-bold text-white">{credits.total_used.toLocaleString()}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Licenses Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">My License Keys</h2>
                <Link href="/skills" className="text-sm text-emerald-400 hover:text-emerald-300">
                  Browse Skills →
                </Link>
              </div>

              {licenses.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-slate-500" />
                  </div>
                  <p className="text-slate-400 mb-4">No licenses yet</p>
                  <Link
                    href="/skills"
                    className="inline-block py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
                  >
                    Deploy First Skill
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {licenses.map((license) => (
                    <div key={license.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">
                              {license.skill_name}
                            </span>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                              license.type === 'credits' 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'bg-purple-500/20 text-purple-400'
                            }`}>
                              {license.type === 'credits' ? 'Credits' : 'Subscription'}
                            </span>
                          </div>
                          <div className="font-mono text-emerald-400 text-sm">{license.key}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          license.status === 'active' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {license.status}
                        </span>
                      </div>

                      {/* Credits Progress (for credits type) */}
                      {license.type === 'credits' && license.credits_total && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Credits Used</span>
                            <span>{license.credits_used.toLocaleString()} / {license.credits_total.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full transition-all"
                              style={{ width: `${getUsagePercentage(license.credits_used, license.credits_total)}%` }}
                            />
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {license.credits_remaining?.toLocaleString()} credits remaining
                          </div>
                        </div>
                      )}

                      {/* Expiry (for subscription type) */}
                      {license.type === 'subscription' && license.expires_at && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                          <AlertCircle className="w-4 h-4" />
                          <span>Expires: {new Date(license.expires_at).toLocaleDateString()}</span>
                        </div>
                      )}

                      {/* Copy Button */}
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => copyToClipboard(license.key, license.id)}
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedKey === license.id ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Key</span>
                            </>
                          )}
                        </button>
                        <Link 
                          href={`/skills/${license.skill_id}`}
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Docs</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Usage Instructions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-6">
              <h2 className="text-xl font-bold text-white mb-4">How to Use</h2>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400 mb-2">1. Install the skill via OpenClaw CLI:</p>
                  <pre className="text-sm text-emerald-400 overflow-x-auto bg-slate-950 p-3 rounded">
{`$ openclaw skill install review-analyzer
Enter your license key: sm-review-analyzer-xxxxx
✓ Skill installed successfully`}
                  </pre>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400 mb-2">2. Use the skill directly in OpenClaw:</p>
                  <pre className="text-sm text-emerald-400 overflow-x-auto bg-slate-950 p-3 rounded">
{`You: Analyze reviews for https://amazon.com/dp/B08N5WRWNW

OpenClaw: Analyzing 100 reviews...
✓ Found 34 complaints about Battery Life
✓ Identified 5 product gaps
✓ Generated battlecard

Credits used: 157
Remaining: 843`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credits Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Credits</h3>
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {credits?.remaining.toLocaleString() || '0'}
              </div>
              <p className="text-slate-400 text-sm mb-4">Available credits</p>
              <Link
                href="/buy/credits"
                className="block w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-lg font-medium transition-colors"
              >
                Buy Credits
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/skills"
                  className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-center rounded-lg font-medium transition-colors"
                >
                  Browse Skills
                </Link>
                <a
                  href="https://api.gspr-hub.site/admin.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-center rounded-lg font-medium transition-colors"
                >
                  Admin Console →
                </a>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Support</h3>
              <p className="text-slate-400 text-sm mb-4">Need help with your deployment?</p>
              <a href="mailto:sam.wang01@icloud.com" className="text-emerald-400 hover:text-emerald-300 text-sm">
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
