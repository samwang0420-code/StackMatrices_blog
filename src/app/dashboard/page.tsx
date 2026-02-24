'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

interface License {
  id: string;
  key: string;
  skill: string;
  status: string;
  expires_at: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching licenses
    setTimeout(() => {
      setLicenses([]);
      setLoading(false);
    }, 500);
  }, []);

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
          <Link
            href="/login"
            className="py-2 px-4 bg-emerald-500 text-white rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Licenses Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">My License Keys</h2>
                <Link
                  href="/skills"
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Browse Skills →
                </Link>
              </div>

              {licenses.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
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
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded mb-2">
                            {license.skill}
                          </span>
                          <div className="font-mono text-emerald-400 text-sm">{license.key}</div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Usage Instructions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-6">
              <h2 className="text-xl font-bold text-white mb-4">How to Use</h2>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <pre className="text-sm text-emerald-400 overflow-x-auto">{`# Add to your OpenClaw environment
export SKILL_LICENSE_KEY=your-license-key-here

# Use in your workflow
from openclaw_skills import deploy_skill
deploy_skill("shadow-monitor")`}</pre>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                View full documentation in the{' '}
                <a href="/docs" className="text-emerald-400 hover:underline">Docs</a>
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/skills"
                  className="block w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-lg font-medium transition-colors"
                >
                  Browse Skills
                </Link>
                <Link
                  href="/how-it-works"
                  className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-center rounded-lg font-medium transition-colors"
                >
                  View Documentation
                </Link>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Support</h3>
              <p className="text-slate-400 text-sm mb-4">Need help with your deployment?</p>
              <a
                href="mailto:sam.wang01@icloud.com"
                className="text-emerald-400 hover:text-emerald-300 text-sm"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
