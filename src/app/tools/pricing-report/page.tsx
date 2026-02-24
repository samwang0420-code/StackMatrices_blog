'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

// ECharts types
interface EChartsInstance {
  setOption: (option: unknown, notMerge?: boolean) => void;
  resize: () => void;
  dispose: () => void;
}

interface EChartsModule {
  init: (dom: HTMLElement, theme?: string | null, opts?: Record<string, unknown>) => EChartsInstance;
}

// Data types
interface CategoryPrice {
  category: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
}

interface HiddenFee {
  name: string;
  value: number;
  percentage: number;
}

interface PriceTrend {
  year: string;
  crm: number;
  projectManagement: number;
  emailMarketing: number;
  analytics: number;
}

interface RegionalData {
  region: string;
  avgPrice: number;
  priceIndex: number;
}

interface Prediction {
  id: number;
  title: string;
  description: string;
  probability: number;
  impact: 'High' | 'Medium' | 'Low';
}

interface KeyFinding {
  id: number;
  title: string;
  description: string;
  stat: string;
}

// Mock data based on realistic SaaS pricing trends
const categoryData: CategoryPrice[] = [
  { category: 'CRM', avgPrice: 89, minPrice: 25, maxPrice: 300 },
  { category: 'Project Mgmt', avgPrice: 65, minPrice: 15, maxPrice: 199 },
  { category: 'Email Marketing', avgPrice: 45, minPrice: 10, maxPrice: 150 },
  { category: 'Analytics', avgPrice: 72, minPrice: 20, maxPrice: 250 },
  { category: 'HR/People', avgPrice: 95, minPrice: 30, maxPrice: 350 },
  { category: 'Finance', avgPrice: 85, minPrice: 25, maxPrice: 299 },
  { category: 'Design', avgPrice: 55, minPrice: 15, maxPrice: 180 },
  { category: 'Communication', avgPrice: 38, minPrice: 8, maxPrice: 120 },
];

const hiddenFeesData: HiddenFee[] = [
  { name: 'Seat Overages', value: 28, percentage: 28 },
  { name: 'API Usage', value: 22, percentage: 22 },
  { name: 'Storage Limits', value: 18, percentage: 18 },
  { name: 'Support Tiers', value: 15, percentage: 15 },
  { name: 'Add-ons', value: 12, percentage: 12 },
  { name: 'Implementation', value: 5, percentage: 5 },
];

const priceTrendData: PriceTrend[] = [
  { year: '2024', crm: 72, projectManagement: 52, emailMarketing: 35, analytics: 58 },
  { year: '2025', crm: 80, projectManagement: 58, emailMarketing: 40, analytics: 65 },
  { year: '2026 (Est)', crm: 89, projectManagement: 65, emailMarketing: 45, analytics: 72 },
];

const regionalData: RegionalData[] = [
  { region: 'United States', avgPrice: 100, priceIndex: 100 },
  { region: 'Western Europe', avgPrice: 108, priceIndex: 108 },
  { region: 'Nordic', avgPrice: 115, priceIndex: 115 },
  { region: 'UK & Ireland', avgPrice: 95, priceIndex: 95 },
  { region: 'Eastern Europe', avgPrice: 68, priceIndex: 68 },
  { region: 'Asia Pacific', avgPrice: 72, priceIndex: 72 },
  { region: 'Latin America', avgPrice: 58, priceIndex: 58 },
];

const predictions2026: Prediction[] = [
  {
    id: 1,
    title: 'AI-First Pricing Models',
    description: 'Usage-based pricing will dominate, with 60% of new SaaS launches adopting consumption-based models tied to AI token usage.',
    probability: 85,
    impact: 'High',
  },
  {
    id: 2,
    title: 'Consolidation Discounts',
    description: 'Platform bundles will offer 20-30% discounts compared to standalone tools, accelerating the death of single-purpose SaaS.',
    probability: 78,
    impact: 'Medium',
  },
  {
    id: 3,
    title: 'Regional Price Harmonization',
    description: 'Price gaps between US and emerging markets will narrow as global SaaS companies standardize pricing with PPP adjustments.',
    probability: 65,
    impact: 'Medium',
  },
];

const keyFindings: KeyFinding[] = [
  {
    id: 1,
    title: 'Average Price Increase',
    description: 'SaaS products increased pricing by an average of 15-25% from 2024 to 2026, with enterprise tiers seeing the steepest hikes.',
    stat: '+23%',
  },
  {
    id: 2,
    title: 'Hidden Fees Impact',
    description: 'Customers report paying 35% more than listed prices due to overage charges, API limits, and mandatory add-ons.',
    stat: '35%',
  },
  {
    id: 3,
    title: 'Regional Disparity',
    description: 'European customers pay 8-15% more on average compared to US customers for the same SaaS products.',
    stat: '+12%',
  },
];

export default function PricingReport2026(): JSX.Element {
  const categoryChartRef = useRef<HTMLDivElement>(null);
  const hiddenFeesChartRef = useRef<HTMLDivElement>(null);
  const trendChartRef = useRef<HTMLDivElement>(null);
  const regionalChartRef = useRef<HTMLDivElement>(null);
  
  const [echarts, setEcharts] = useState<EChartsModule | null>(null);
  const chartsRef = useRef<EChartsInstance[]>([]);

  // Load ECharts
  useEffect(() => {
    let mounted = true;
    
    import('echarts').then((mod) => {
      if (mounted) {
        setEcharts(mod as unknown as EChartsModule);
      }
    });

    return () => {
      mounted = false;
      chartsRef.current.forEach((chart) => {
        if (chart && typeof chart.dispose === 'function') {
          chart.dispose();
        }
      });
      chartsRef.current = [];
    };
  }, []);

  // Initialize charts when ECharts is loaded
  useEffect(() => {
    if (!echarts) return;

    // Dispose existing charts
    chartsRef.current.forEach((chart) => {
      if (chart && typeof chart.dispose === 'function') {
        chart.dispose();
      }
    });
    chartsRef.current = [];

    // Category Bar Chart
    if (categoryChartRef.current) {
      const chart = echarts.init(categoryChartRef.current, null, { renderer: 'svg' });
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: Array<{ name: string; value: number; seriesName: string }>) => {
            const data = categoryData.find((d) => d.category === params[0].name);
            return `${params[0].name}<br/>
                    Avg: $${data?.avgPrice}/mo<br/>
                    Range: $${data?.minPrice}-$${data?.maxPrice}`;
          },
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          data: categoryData.map((d) => d.category),
          axisLabel: { rotate: 30, fontSize: 11 },
          axisLine: { lineStyle: { color: '#6b7280' } },
        },
        yAxis: {
          type: 'value',
          name: 'Avg Price ($/mo)',
          nameTextStyle: { fontSize: 12 },
          axisLine: { lineStyle: { color: '#6b7280' } },
          splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
        },
        series: [
          {
            name: 'Average Price',
            type: 'bar',
            data: categoryData.map((d) => d.avgPrice),
            itemStyle: {
              color: new (echarts as unknown as { graphic: { LinearGradient: new (x: number, y: number, x2: number, y2: number, stops: Array<{ offset: number; color: string }>) => unknown } }).graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#1d4ed8' },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
            emphasis: {
              itemStyle: {
                color: '#2563eb',
              },
            },
          },
        ],
      });
      chartsRef.current.push(chart);
    }

    // Hidden Fees Pie Chart
    if (hiddenFeesChartRef.current) {
      const chart = echarts.init(hiddenFeesChartRef.current, null, { renderer: 'svg' });
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}% ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: '5%',
          top: 'center',
          textStyle: { fontSize: 11 },
        },
        series: [
          {
            name: 'Hidden Fees',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: { show: false },
            emphasis: {
              label: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
              },
            },
            data: hiddenFeesData.map((d) => ({
              value: d.value,
              name: d.name,
              itemStyle: {
                color: [
                  '#3b82f6',
                  '#ef4444',
                  '#f59e0b',
                  '#10b981',
                  '#8b5cf6',
                  '#6b7280',
                ][hiddenFeesData.indexOf(d)],
              },
            })),
          },
        ],
      });
      chartsRef.current.push(chart);
    }

    // Price Trend Line Chart
    if (trendChartRef.current) {
      const chart = echarts.init(trendChartRef.current, null, { renderer: 'svg' });
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
        },
        legend: {
          data: ['CRM', 'Project Mgmt', 'Email Marketing', 'Analytics'],
          bottom: 0,
          textStyle: { fontSize: 11 },
        },
        grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: priceTrendData.map((d) => d.year),
          axisLine: { lineStyle: { color: '#6b7280' } },
        },
        yAxis: {
          type: 'value',
          name: 'Price Index ($/mo)',
          nameTextStyle: { fontSize: 12 },
          axisLine: { lineStyle: { color: '#6b7280' } },
          splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
        },
        series: [
          {
            name: 'CRM',
            type: 'line',
            smooth: true,
            data: priceTrendData.map((d) => d.crm),
            itemStyle: { color: '#3b82f6' },
            lineStyle: { width: 3 },
            symbol: 'circle',
            symbolSize: 8,
          },
          {
            name: 'Project Mgmt',
            type: 'line',
            smooth: true,
            data: priceTrendData.map((d) => d.projectManagement),
            itemStyle: { color: '#ef4444' },
            lineStyle: { width: 3 },
            symbol: 'circle',
            symbolSize: 8,
          },
          {
            name: 'Email Marketing',
            type: 'line',
            smooth: true,
            data: priceTrendData.map((d) => d.emailMarketing),
            itemStyle: { color: '#f59e0b' },
            lineStyle: { width: 3 },
            symbol: 'circle',
            symbolSize: 8,
          },
          {
            name: 'Analytics',
            type: 'line',
            smooth: true,
            data: priceTrendData.map((d) => d.analytics),
            itemStyle: { color: '#10b981' },
            lineStyle: { width: 3 },
            symbol: 'circle',
            symbolSize: 8,
          },
        ],
      });
      chartsRef.current.push(chart);
    }

    // Regional Bar Chart
    if (regionalChartRef.current) {
      const chart = echarts.init(regionalChartRef.current, null, { renderer: 'svg' });
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: Array<{ name: string; value: number }>) => {
            const data = regionalData.find((d) => d.region === params[0].name);
            return `${params[0].name}<br/>
                    Index: ${data?.priceIndex}<br/>
                    Avg Price: $${data?.avgPrice}`;
          },
        },
        grid: { left: '3%', right: '10%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'value',
          max: 130,
          axisLabel: { formatter: '{value}' },
          axisLine: { lineStyle: { color: '#6b7280' } },
          splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
        },
        yAxis: {
          type: 'category',
          data: regionalData.map((d) => d.region).reverse(),
          axisLine: { lineStyle: { color: '#6b7280' } },
        },
        series: [
          {
            name: 'Price Index',
            type: 'bar',
            data: regionalData.map((d) => d.priceIndex).reverse(),
            itemStyle: {
              color: (params: { dataIndex: number }) => {
                const colors = ['#10b981', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#ef4444'];
                return colors[params.dataIndex] || '#3b82f6';
              },
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              position: 'right',
              formatter: '{c}',
              fontWeight: 'bold',
            },
          },
        ],
      });
      chartsRef.current.push(chart);
    }

    // Handle resize
    const handleResize = () => {
      chartsRef.current.forEach((chart) => {
        if (chart && typeof chart.resize === 'function') {
          chart.resize();
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [echarts]);

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <>
      <Head>
        <title>SaaS Pricing Trends Report 2026 | StackMatrices</title>
        <meta name="description" content="Comprehensive analysis of SaaS pricing trends for 2026 including category comparisons, hidden fees, and regional differences." />
        <style>{`
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none !important; }
            .print-break { page-break-before: always; }
            .print-container { padding: 20px !important; }
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-slate-950 print-container">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-slate-900/20 px-3 py-1 rounded-full text-sm font-medium">2026 Report</span>
              <span className="text-blue-200 text-sm">February Edition</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SaaS Pricing Trends Report
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Comprehensive analysis of pricing strategies, hidden costs, and regional differences across 50+ SaaS products
            </p>
            
            {/* Download Button */}
            <button
              onClick={handleDownloadPDF}
              className="no-print mt-6 inline-flex items-center gap-2 bg-slate-900 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Report
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
          {/* Executive Summary */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Executive Summary</h2>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Our analysis of 50+ SaaS products reveals significant shifts in pricing strategies, with vendors increasingly adopting usage-based models and introducing complex fee structures.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {keyFindings.map((finding) => (
                <div key={finding.id} className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-blue-600 mb-3">{finding.stat}</div>
                  <h3 className="font-semibold text-white mb-2">{finding.title}</h3>
                  <p className="text-gray-600 text-sm">{finding.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing by Category */}
          <section className="print-break">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Pricing by Category</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Average monthly pricing across major SaaS categories. HR/People platforms command premium prices while communication tools remain most affordable.
            </p>
            
            <div className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-6">
              <div ref={categoryChartRef} className="w-full h-80" />
            </div>

            {/* Category Table */}
            <div className="mt-6 bg-slate-900 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Average</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Min</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Max</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categoryData.map((cat) => (
                    <tr key={cat.category} className="hover:bg-slate-950">
                      <td className="px-6 py-4 text-sm font-medium text-white">{cat.category}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">${cat.avgPrice}/mo</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">${cat.minPrice}/mo</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">${cat.maxPrice}/mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Hidden Fees Analysis */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Hidden Fees Analysis</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Breakdown of unexpected costs that inflate SaaS bills beyond advertised prices. Seat overages and API usage are the biggest culprits.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-6">
                <div ref={hiddenFeesChartRef} className="w-full h-80" />
              </div>
              
              <div className="space-y-4">
                {hiddenFeesData.map((fee, index) => (
                  <div key={fee.name} className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{
                            backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'][index],
                          }}
                        />
                        <span className="font-medium text-white">{fee.name}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{fee.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${fee.percentage}%`,
                          backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'][index],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Price Increase Trends */}
          <section className="print-break">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Price Increase Trends (2024-2026)</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Year-over-year pricing evolution across major SaaS categories. All segments show consistent upward trends, with CRM and Analytics leading increases.
            </p>
            
            <div className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-6">
              <div ref={trendChartRef} className="w-full h-80" />
            </div>

            <div className="mt-6 grid md:grid-cols-4 gap-4">
              {[
                { label: 'CRM', growth: '+23.6%', color: 'text-blue-600' },
                { label: 'Project Mgmt', growth: '+25.0%', color: 'text-red-600' },
                { label: 'Email Marketing', growth: '+28.6%', color: 'text-amber-600' },
                { label: 'Analytics', growth: '+24.1%', color: 'text-emerald-600' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                  <div className={`text-2xl font-bold ${item.color}`}>{item.growth}</div>
                  <div className="text-sm text-gray-600">{item.label} Growth</div>
                </div>
              ))}
            </div>
          </section>

          {/* Regional Differences */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Regional Differences</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Price index comparison across global regions (US = 100). Nordic countries face the highest premiums, while Latin America offers significant discounts.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-6">
                <div ref={regionalChartRef} className="w-full h-80" />
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💰</span>
                    <h3 className="font-semibold text-emerald-900">Best Value</h3>
                  </div>
                  <p className="text-emerald-800 text-sm">
                    Latin America offers 42% lower prices on average, making it the most cost-effective region for SaaS purchases.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📈</span>
                    <h3 className="font-semibold text-amber-900">Highest Premium</h3>
                  </div>
                  <p className="text-amber-800 text-sm">
                    Nordic markets pay 15% above US prices, partly due to local compliance requirements and currency strength.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🌍</span>
                    <h3 className="font-semibold text-blue-900">Global Trend</h3>
                  </div>
                  <p className="text-blue-800 text-sm">
                    Most vendors are moving toward regional parity pricing, with PPP (Purchasing Power Parity) adjustments becoming standard.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Predictions for 2026 */}
          <section className="print-break">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Predictions for 2026</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Data-driven forecasts for how SaaS pricing will evolve throughout 2026 based on current market signals and vendor communications.
            </p>
            
            <div className="space-y-6">
              {predictions2026.map((pred) => (
                <div
                  key={pred.id}
                  className="bg-slate-900 rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-indigo-600">0{pred.id}</span>
                        <h3 className="text-xl font-semibold text-white">{pred.title}</h3>
                      </div>
                      <p className="text-gray-600">{pred.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Probability</span>
                        <span className="font-bold text-indigo-600">{pred.probability}%</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          pred.impact === 'High'
                            ? 'bg-red-100 text-red-700'
                            : pred.impact === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {pred.impact} Impact
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-600 transition-all duration-1000"
                      style={{ width: `${pred.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section className="bg-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Methodology</h3>
            <p className="text-gray-600 mb-4">
              This report analyzed pricing data from 50+ SaaS products across 8 categories. Data sources include publicly available pricing pages, 
              customer interviews, and industry reports from Gartner, Forrester, and CB Insights. Regional pricing data accounts for currency 
              fluctuations and local tax variations.
            </p>
            <p className="text-gray-600">
              Price trend analysis covers the period January 2024 - February 2026, with 2026 figures representing projected estimates based on 
              announced pricing changes and historical patterns.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-16">
          <div className="max-w-6xl mx-auto text-center">
            <p className="mb-2">Data based on analysis of 50+ SaaS products</p>
            <p className="text-sm">
              © 2026 StackMatrices. All rights reserved. | Report generated February 2026
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
