'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { api, ApifyAPIError } from '@/lib/api';

const services: Record<string, { name: string; price: string; description: string }> = {
  'single-research': {
    name: '单产品调研',
    price: '¥19',
    description: '获取 1 个产品的多平台真实评论',
  },
  'batch-compare': {
    name: '批量产品对比',
    price: '¥49',
    description: '对比 3-5 个竞品，自动生成对比报告',
  },
  'content-material': {
    name: '内容创作素材',
    price: '¥29',
    description: '获取真实用户痛点 + 好评金句',
  },
  'tco-analysis': {
    name: 'TCO 计算器',
    price: '¥39',
    description: '真实价格数据 + 隐藏成本分析',
  },
  'competitor-monitor': {
    name: '竞品监控',
    price: '¥99',
    description: '每周自动抓取指定产品新评论',
  },
  'api-developer': {
    name: 'API 开发者包',
    price: '¥299',
    description: '5000 次 API 调用额度 + 技术支持',
  },
};

export default function BuyPageContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service') || 'single-research';
  const service = services[serviceId] || services['single-research'];
  
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      setError('请上传付款截图');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const screenshotUrl = `https://placeholder.com/screenshot/${Date.now()}`;
      // 这里应该调用创建订单的 API，传入 serviceId
      // await api.createOrder(serviceId, screenshotUrl);
      setSubmitted(true);
    } catch (err) {
      console.error('Error creating order:', err);
      if (err instanceof ApifyAPIError) {
        setError(err.message);
      } else {
        setError('提交订单失败，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">请先登录</h1>
          <p className="text-slate-600 mb-6">购买服务需要先登录账号</p>
          <Link
            href={`/login?redirect=${encodeURIComponent(`/buy?service=${serviceId}`)}`}
            className="inline-block py-3 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors"
          >
            去登录
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">订单已提交！</h1>
          <p className="text-slate-600 mb-4">
            我们会尽快审核你的付款截图，审核通过后你将在用户面板看到 License Key。
          </p>
          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-slate-600">服务: {service.name}</p>
            <p className="text-sm text-slate-600">金额: {service.price}</p>
            <p className="text-sm text-slate-600">状态: 等待审核</p>
          </div>
          <Link
            href="/dashboard"
            className="block w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors"
          >
            查看订单
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-primary p-6 text-white">
            <h1 className="text-2xl font-bold">购买服务</h1>
            <p className="text-white/80">{service.name}</p>
          </div>

          {error && (
            <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Service Info */}
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-slate-600 mb-2">{service.description}</p>
              <p className="text-2xl font-bold text-primary">{service.price}</p>
            </div>

            {/* Payment QR Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">扫码支付</label>
              <div className="bg-slate-50 rounded-lg p-6 text-center">
                <p className="text-slate-600 mb-4">
                  请支付 <span className="font-bold text-primary text-xl">{service.price}</span>
                </p>
                
                <div className="flex justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-40 h-40 bg-slate-200 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-slate-400 text-sm">支付宝二维码</span>
                    </div>
                    <p className="text-sm text-slate-600">支付宝</p>
                  </div>
                  <div className="text-center">
                    <div className="w-40 h-40 bg-slate-200 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-slate-400 text-sm">微信二维码</span>
                    </div>
                    <p className="text-sm text-slate-600">微信支付</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  请使用支付宝或微信扫码支付上方金额
                </p>
              </div>
            </div>

            {/* Screenshot Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">上传付款截图</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  className="hidden"
                  id="screenshot"
                />
                <label htmlFor="screenshot" className="cursor-pointer">
                  {screenshot ? (
                    <div className="text-green-600">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p>已选择: {screenshot.name}</p>
                    </div>
                  ) : (
                    <div className="text-slate-500">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>点击上传付款截图</p>
                      <p className="text-xs">支持 JPG、PNG 格式</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !screenshot}
              className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {loading ? '提交中...' : '提交订单'}
            </button>

            <p className="text-center text-sm text-slate-500">
              提交后请等待审核，审核通过后你将在用户面板看到 License Key
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
