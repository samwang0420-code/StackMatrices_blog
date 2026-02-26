'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { 
  Zap, 
  CreditCard, 
  Package, 
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Terminal,
  Play,
  ChevronRight,
  Check,
  Download
} from 'lucide-react';
import { APIError, EmptyState } from '@/components/error-handling';
import skillsData from '@/data/skills-detailed.json';

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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.stackmatrices.com';

// Toast Component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-6 z-50 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">×</button>
    </div>
  );
}

// Terminal Code Block Component
function TerminalCommand({ command, label }: { command: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
      {label && (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
          <Terminal className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-500 font-mono">{label}</span>
        </div>
      )}
      <div className="p-4 font-mono text-sm">
        <div className="flex items-start gap-3">
          <span className="text-emerald-500 select-none">$</span>
          <code className="text-slate-300 flex-1 break-all">{command}</code>
          <button
            onClick={copy}
            className="shrink-0 p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-emerald-400 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// Deployment Card Component
function DeploymentCard({ license }: { license: License }) {
  const skill = skillsData.find(s => s.id === license.skill_id);
  const [showSetup, setShowSetup] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const installCommand = `npx stack-matrices deploy ${license.skill_id} --license=${license.key}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // 调用本地打包服务器生成并下载
      const response = await fetch('http://localhost:8765/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill_id: license.skill_id,
          name: user?.email || 'User',
          api_keys: {}
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate package');
      
      const data = await response.json();
      
      // 触发下载
      window.location.href = `http://localhost:8765${data.download_url}`;
      
    } catch (err) {
      // 如果服务器不可用，直接下载预生成的包
      const link = document.createElement('a');
      link.href = `/packages/${license.skill_id}_v1.0.zip`;
      link.download = `${license.skill_id}_v1.0.zip`;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
      {/* Card Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                {license.status === 'active' ? 'Ready to Deploy' : license.status}
              </span>
              {license.type === 'credits' && (
                <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                  {license.credits_remaining?.toLocaleString()} credits
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white">{license.skill_name}</h3>
            <p className="text-slate-400 text-sm mt-1">{skill?.description?.slice(0, 100)}...</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-500">License Key</span>
            <div className="font-mono text-emerald-400 text-xs mt-1">{license.key.slice(0, 16)}...</div>
          </div>
          <div>
            <span className="text-slate-500">Purchased</span>
            <div className="text-white mt-1">{new Date(license.created_at).toLocaleDateString()}</div>
          </div>
          <div>
            <span className="text-slate-500">{license.type === 'credits' ? 'Credits Used' : 'Expires'}</span>
            <div className="text-white mt-1">
              {license.type === 'credits' 
                ? `${license.credits_used} / ${license.credits_total}`
                : license.expires_at 
                  ? new Date(license.expires_at).toLocaleDateString()
                  : 'Never'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Quick Install Section */}
      <div className="p-6 bg-slate-950/50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            Install via Git
          </h4>
        </div>

        {/* Git URL */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-4">
          <div className="text-xs text-slate-400 mb-2">Git Repository URL</div>
          <code className="text-sm text-emerald-400 font-mono block">
            https://github.com/stackmatrices/{license.skill_id}.git
          </code>
        </div>

        {/* 安装方式 */}
        <div className="space-y-3">
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
            <div className="text-xs text-slate-400 mb-2">Method 1: Git Clone</div>
            <TerminalCommand command={`git clone https://github.com/stackmatrices/${license.skill_id}.git`} />
          </div>

          <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
            <div className="text-xs text-slate-400 mb-2">Method 2: One-line Installer</div>
            <TerminalCommand command={`curl -fsSL https://install.stackmatrices.com | python3 - ${license.skill_id}`} />
          </div>

          <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
            <div className="text-xs text-slate-400 mb-2">Method 3: OpenClaw (Paste in chat)</div>
            <div className="bg-slate-950 rounded p-2 text-sm text-slate-300 font-mono">
              Install https://github.com/stackmatrices/{license.skill_id}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <p className="text-xs text-emerald-400">
            💡 <strong>Simplest way:</strong> Just paste the Git URL in your OpenClaw chat to install and run instantly.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white text-sm font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-2"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Preparing...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download Package
            </>
          )}
        </button>
        
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const copy = () => {
              navigator.clipboard.writeText(installCommand);
              // 可以添加 toast 提示
            };
            copy();
          }}
          className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy Command
        </a>
      </div>
        
        <div className="mt-3 text-xs text-slate-500 text-center">
          💡 <span className="text-slate-400">Download and double-click run.bat (Windows) or run.sh (Mac/Linux)</span>
        </div>
            className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Deploy Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [credits, setCredits] = useState<CreditsInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Check for success redirect from payment
  useEffect(() => {
    const success = searchParams.get('success');
    const skillName = searchParams.get('skill');
    if (success === 'true') {
      setToast(`Payment Successful! ${skillName ? `${skillName} is` : 'Your skill is'} ready for deployment below.`);
      // Clean URL
      router.replace('/dashboard', { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/v1/user/licenses`, {
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status}`);
      }
      
      const data = await response.json();
      setLicenses(data.licenses || []);
      setCredits(data.credits || null);
    } catch (err: any) {
      console.error('Failed to fetch data:', err);
      setError(err.message || 'Failed to load your dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getAuthToken = async () => {
    return 'token';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading Command Center...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Please login to access your Command Center</p>
          <Link href="/login" className="py-2 px-4 bg-emerald-500 text-white rounded-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-6 h-6 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">Command Center</h1>
          </div>
          <p className="text-slate-400">Deploy and manage your StackMatrices skills</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8">
            <APIError 
              message={error} 
              onRetry={() => {
                setLoading(true);
                fetchData();
              }} 
            />
          </div>
        )}

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
                <span className="text-slate-400 text-sm">Active Skills</span>
                <Package className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">{licenses.length}</div>
              <Link href="/skills" className="text-blue-400 text-sm hover:underline mt-2 inline-block">
                Browse More
              </Link>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Total Deployed</span>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                {licenses.filter(l => l.status === 'active').length}
              </div>
              <span className="text-slate-500 text-sm mt-2 inline-block">Ready to use</span>
            </div>
          </div>
        )}

        {/* Deployment Cards Grid */}
        {licenses.length === 0 ? (
          <EmptyState 
            icon={<Terminal className="w-8 h-8 text-slate-500" />}
            title="No Skills Deployed Yet"
            description="Browse our skill registry and deploy your first automation in minutes."
            action={{ label: "Browse Skills", href: "/skills" }}
          />
        ) : (
          <div className="grid gap-6">
            {licenses.map((license) => (
              <DeploymentCard key={license.id} license={license} />
            ))}
          </div>
        )}

        {/* Pro Tips */}
        {licenses.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900/20 to-slate-900 border border-emerald-500/20 rounded-xl">
            <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Pro Tip
            </h3>
            <p className="text-slate-300 text-sm">
              Copy the install command above and paste it in your terminal. The skill will automatically 
              configure itself and prompt you for any required API keys.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
