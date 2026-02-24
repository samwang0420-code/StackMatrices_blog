'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { api, ApifyAPIError } from '@/lib/api';

interface License {
  id: string;
  key: string;
  tier: string;
  status: string;
  monthly_requests: number;
  expires_at: string;
}

interface Order {
  id: string;
  tier: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    
    async function fetchData() {
      try {
        setLoading(true);
        setError('');
        
        // Fetch licenses and orders in parallel
        const [licensesData, ordersData] = await Promise.all([
          api.getMyLicenses().catch(() => ({ licenses: [] })),
          api.getMyOrders().catch(() => ({ orders: [] })),
        ]);
        
        setLicenses(licensesData.licenses || []);
        setOrders(ordersData.orders || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (err instanceof ApifyAPIError && err.status === 401) {
          setError('登录已过期，请重新登录');
        } else {
          setError('加载数据失败，请稍后重试');
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">请先登录</p>
          <Link
            href="/login"
            className="py-2 px-4 bg-primary text-white rounded-lg"
          >
            去登录
          </Link>
        </div>
      </div>
    );
  }

  const getTierLimit = (tier: string) => {
    const limits: Record<string, number> = {
      explorer: 100,
      creator: 500,
      team: 2000,
    };
    return limits[tier] || 0;
  };

  const getTierName = (tier: string) => {
    const names: Record<string, string> = {
      explorer: '探索版',
      creator: '创作者版',
      team: '团队版',
    };
    return names[tier] || tier;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">用户面板</h1>
          <p className="text-slate-600">{user.email}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
            <button 
              onClick={() => window.location.reload()}
              className="ml-4 text-sm underline"
            >
              重试
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Licenses Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">我的 License</h2>
                <Link
                  href="/pricing"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  购买新 License
                </Link>
              </div>

              {licenses.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                  <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <p className="text-slate-500 mb-4">还没有 License</p>
                  <Link
                    href="/pricing"
                    className="inline-block py-2 px-4 bg-primary text-white rounded-lg font-medium"
                  >
                    去购买
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {licenses.map((license) => {
                    const limit = getTierLimit(license.tier);
                    const used = license.monthly_requests;
                    const remaining = Math.max(0, limit - used);
                    const percentage = limit > 0 ? (used / limit) * 100 : 0;

                    return (
                      <div key={license.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded mb-2">
                              {getTierName(license.tier)}
                            </span>
                            <div className="flex items-center gap-2">
                              <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                                {license.key}
                              </code>
                              <button
                                onClick={() => copyToClipboard(license.key)}
                                className="text-slate-400 hover:text-primary"
                                title="复制"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            license.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {license.status === 'active' ? '有效' : '已过期'}
                          </span>
                        </div>

                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">本月用量</span>
                            <span className="font-medium">{used} / {limit}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-primary'
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">剩余 {remaining} 次调用</p>
                        </div>

                        <p className="text-xs text-slate-500">
                          到期时间: {new Date(license.expires_at).toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Usage Instructions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold mb-4">使用说明</h2>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400">{`# 设置环境变量
export SKILL_APIFY_LICENSE_KEY=你的-License-Key

# Python 中使用
from skill_apify_black_box import get_reviews

reviews = get_reviews("Notion", source="g2", limit=10)`}</pre>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                详细文档请参考{" "}
                <a href="https://api.gspr-hub.site/docs" className="text-primary hover:underline" target="_blank" rel="noopener">
                  API 文档
                </a>
              </p>
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold mb-6">我的订单</h2>

              {orders.length === 0 ? (
                <p className="text-slate-500 text-center py-8">暂无订单</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{getTierName(order.tier)}</p>
                          <p className="text-sm text-slate-500">
                            {order.created_at ? new Date(order.created_at).toLocaleDateString('zh-CN') : 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">¥{order.amount / 100}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            order.status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                          >
                            {order.status === 'paid' ? '已完成' : order.status === 'pending' ? '审核中' : '已取消'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
