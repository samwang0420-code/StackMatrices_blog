'use client';

import { useState, useMemo } from 'react';
import Head from 'next/head';
import { Calculator, ArrowRight, Loader2, CheckCircle, XCircle, AlertTriangle, Zap, Server, Image as ImageIcon, Code, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface ResourceItem {
  name: string;
  type: 'script' | 'stylesheet' | 'image' | 'font' | 'xhr' | 'document' | 'other';
  startTime: number;
  endTime: number;
  duration: number;
  size: number;
  priority: 'high' | 'medium' | 'low';
}

interface PageSpeedResult {
  url: string;
  score: number;
  metrics: {
    lcp: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' };
    fid: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' };
    cls: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' };
    fcp: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' };
    ttfb: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' };
  };
  resources: ResourceItem[];
  opportunities: Array<{
    id: string;
    title: string;
    description: string;
    savings: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  diagnostics: {
    totalRequests: number;
    totalSize: string;
    mainThreadTime: string;
    bootupTime: string;
  };
}

interface SmartRecommendation {
  tool: string;
  category: 'CDN' | 'Caching' | 'Image Optimization' | 'Hosting' | 'All-in-One';
  matchScore: number;
  why: string;
  impact: string;
  estimatedImprovement: string;
}

export default function WebsiteSpeedAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PageSpeedResult | null>(null);
  const [error, setError] = useState('');
  const [showWaterfall, setShowWaterfall] = useState(false);
  const [expandedOpps, setExpandedOpps] = useState<string[]>([]);

  const analyzeSpeed = async () => {
    if (!url) return;
    
    setLoading(true);
    setError('');
    setShowWaterfall(false);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY || '';
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&category=PERFORMANCE`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const lighthouse = data.lighthouseResult;
      const score = Math.round(lighthouse.categories.performance.score * 100);
      const audits = lighthouse.audits;

      // Parse metrics with ratings
      const parseMetric = (auditId: string, thresholds: { good: number; poor: number }) => {
        const audit = audits[auditId];
        const value = audit?.numericValue || 0;
        let rating: 'good' | 'needs-improvement' | 'poor' = 'poor';
        if (value <= thresholds.good) rating = 'good';
        else if (value <= thresholds.poor) rating = 'needs-improvement';
        
        return {
          value,
          display: audit?.displayValue || 'N/A',
          rating
        };
      };

      // Generate simulated waterfall data from network requests
      const resources: ResourceItem[] = generateWaterfallData(audits);

      // Parse opportunities
      const opportunities = lighthouse.categories.performance.auditRefs
        ?.filter((ref: any) => ref.weight > 0 && audits[ref.id]?.details)
        .slice(0, 6)
        .map((ref: any) => ({
          id: ref.id,
          title: audits[ref.id].title,
          description: audits[ref.id].description,
          savings: audits[ref.id].displayValue || '',
          priority: getPriorityFromScore(audits[ref.id].score)
        })) || [];

      setResult({
        url,
        score,
        metrics: {
          lcp: parseMetric('largest-contentful-paint', { good: 2500, poor: 4000 }),
          fid: parseMetric('max-potential-fid', { good: 100, poor: 300 }),
          cls: parseMetric('cumulative-layout-shift', { good: 0.1, poor: 0.25 }),
          fcp: parseMetric('first-contentful-paint', { good: 1800, poor: 3000 }),
          ttfb: parseMetric('server-response-time', { good: 200, poor: 600 }),
        },
        resources,
        opportunities,
        diagnostics: {
          totalRequests: resources.length,
          totalSize: formatBytes(resources.reduce((acc, r) => acc + r.size, 0)),
          mainThreadTime: audits['mainthread-work-breakdown']?.displayValue || 'N/A',
          bootupTime: audits['bootup-time']?.displayValue || 'N/A',
        }
      });
    } catch (err) {
      setError('Failed to analyze. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Smart matching algorithm
  const smartRecommendations = useMemo((): SmartRecommendation[] => {
    if (!result) return [];

    const recs: SmartRecommendation[] = [];
    const metrics = result.metrics;

    // CDN Recommendation
    if (metrics.ttfb.rating !== 'good' || metrics.lcp.rating !== 'good') {
      const ttfbScore = metrics.ttfb.value > 600 ? 100 : metrics.ttfb.value > 400 ? 80 : 60;
      recs.push({
        tool: 'Cloudflare Pro',
        category: 'CDN',
        matchScore: ttfbScore,
        why: `Your TTFB is ${metrics.ttfb.display} - CDN can reduce this by 50-70%`,
        impact: 'High',
        estimatedImprovement: `${Math.round(metrics.ttfb.value * 0.6)}ms reduction`
      });
    }

    // Image Optimization
    const imageOpps = result.opportunities.filter(o => 
      o.id.includes('image') || o.id.includes('modern-format')
    );
    if (imageOpps.length > 0 || result.diagnostics.totalSize.includes('MB')) {
      const imageScore = imageOpps.length > 2 ? 95 : imageOpps.length > 0 ? 80 : 60;
      recs.push({
        tool: 'ShortPixel',
        category: 'Image Optimization',
        matchScore: imageScore,
        why: `Found ${imageOpps.length} image optimization opportunities`,
        impact: 'Medium-High',
        estimatedImprovement: '40-60% size reduction'
      });
    }

    // Caching
    const cacheOpp = result.opportunities.find(o => o.id.includes('uses-long-cache'));
    if (cacheOpp || metrics.fcp.rating !== 'good') {
      recs.push({
        tool: 'WP Rocket',
        category: 'Caching',
        matchScore: cacheOpp ? 90 : 70,
        why: cacheOpp ? 'Cache policy needs improvement' : 'FCP can be improved with caching',
        impact: 'High',
        estimatedImprovement: '30-50% faster repeat visits'
      });
    }

    // Hosting (if TTFB is really bad)
    if (metrics.ttfb.value > 800) {
      recs.push({
        tool: 'SiteGround',
        category: 'Hosting',
        matchScore: 85,
        why: `TTFB of ${metrics.ttfb.display} suggests server-side issues`,
        impact: 'Very High',
        estimatedImprovement: '200-400ms TTFB improvement'
      });
    }

    // All-in-One (for poor overall scores)
    if (result.score < 70) {
      recs.push({
        tool: 'NitroPack',
        category: 'All-in-One',
        matchScore: result.score < 50 ? 95 : 80,
        why: `Overall score of ${result.score}/100 needs comprehensive optimization`,
        impact: 'Very High',
        estimatedImprovement: '+20-40 performance points'
      });
    }

    return recs.sort((a, b) => b.matchScore - a.matchScore);
  }, [result]);

  // Waterfall chart option
  const waterfallOption = useMemo(() => {
    if (!result?.resources) return {};

    const categories = result.resources.map(r => r.name.substring(0, 30));
    const data = result.resources.map(r => ({
      value: [r.startTime, r.endTime],
      itemStyle: {
        color: getResourceColor(r.type)
      }
    }));

    return {
      tooltip: {
        formatter: (params: any) => {
          const resource = result.resources[params.dataIndex];
          return `${resource.name}<br/>Type: ${resource.type}<br/>Duration: ${resource.duration}ms<br/>Size: ${formatBytes(resource.size)}`;
        }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'value',
        name: 'Time (ms)',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'category',
        data: categories,
        inverse: true,
        axisLabel: {
          formatter: (value: string) => value.length > 25 ? value.substring(0, 25) + '...' : value
        }
      },
      series: [{
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = api.size([0, 1])[1] * 0.6;
          
          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height
            },
            style: api.style()
          };
        },
        data: result.resources.map(r => [r.name, r.startTime, r.endTime])
      }]
    };
  }, [result]);

  // Helper functions
  function generateWaterfallData(audits: any): ResourceItem[] {
    // Simulated based on real opportunities
    const items: ResourceItem[] = [];
    const baseTime = 0;
    
    // Document
    items.push({
      name: 'HTML Document',
      type: 'document',
      startTime: baseTime,
      endTime: audits['server-response-time']?.numericValue || 200,
      duration: audits['server-response-time']?.numericValue || 200,
      size: 15000,
      priority: 'high'
    });

    // Scripts
    const scriptOpp = audits['render-blocking-resources'];
    if (scriptOpp?.details?.items) {
      scriptOpp.details.items.slice(0, 5).forEach((item: any, idx: number) => {
        items.push({
          name: item.url || `Script ${idx + 1}`,
          type: 'script',
          startTime: baseTime + 100 + idx * 50,
          endTime: baseTime + 300 + idx * 100,
          duration: 200 + idx * 50,
          size: item.totalBytes || 50000 + idx * 20000,
          priority: idx < 2 ? 'high' : 'medium'
        });
      });
    }

    // Images
    const imageOpp = audits['uses-optimized-images'] || audits['modern-image-formats'];
    if (imageOpp?.details?.items) {
      imageOpp.details.items.slice(0, 4).forEach((item: any, idx: number) => {
        items.push({
          name: item.url || `Image ${idx + 1}`,
          type: 'image',
          startTime: baseTime + 200 + idx * 100,
          endTime: baseTime + 500 + idx * 150,
          duration: 300 + idx * 50,
          size: item.totalBytes || 100000 + idx * 50000,
          priority: 'low'
        });
      });
    }

    return items.sort((a, b) => a.startTime - b.startTime);
  }

  function getPriorityFromScore(score: number): 'high' | 'medium' | 'low' {
    if (score < 0.3) return 'high';
    if (score < 0.7) return 'medium';
    return 'low';
  }

  function getResourceColor(type: string): string {
    const colors: Record<string, string> = {
      'document': '#3b82f6',
      'script': '#f59e0b',
      'stylesheet': '#10b981',
      'image': '#8b5cf6',
      'font': '#ec4899',
      'xhr': '#06b6d4',
      'other': '#6b7280'
    };
    return colors[type] || colors['other'];
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function getRatingColor(rating: string) {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  }

  function getScoreColor(score: number) {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  }

  function getScoreBg(score: number) {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  }

  const toggleOpp = (id: string) => {
    setExpandedOpps(prev => 
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Head>
        <title>Website Speed Analyzer Pro | Advanced Page Speed Test | Stackmatrices</title>
        <meta name="description" content="Professional website speed analysis with waterfall charts, Core Web Vitals, and smart optimization recommendations powered by Google PageSpeed Insights." />
        <meta name="keywords" content="website speed test, page speed analyzer, Core Web Vitals, waterfall chart, Google PageSpeed, performance optimization" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <div className="bg-slate-900 py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              Pro Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Website Speed Analyzer Pro
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Advanced performance analysis with waterfall visualization and AI-powered optimization recommendations.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="Enter website URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeSpeed()}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={analyzeSpeed}
                disabled={loading || !url}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
                ) : (
                  <><Calculator className="w-5 h-5" /> Analyze</>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                <XCircle className="w-5 h-5" /> {error}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            {/* Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Score */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBg(result.score)} mb-4`}>
                  <span className={`text-5xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Performance Score</h2>
                <p className="text-slate-600">
                  {result.score >= 90 ? '🎉 Excellent! Your site is well-optimized.' :
                   result.score >= 70 ? '⚠️ Good, but there\'s room for improvement.' :
                   '🔴 Needs significant optimization.'}
                </p>
              </div>

              {/* Core Web Vitals */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Core Web Vitals</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(result.metrics).map(([key, metric]) => (
                    <div key={key} className={`p-4 rounded-lg ${getRatingColor(metric.rating)}`}>
                      <div className="text-xs uppercase font-semibold mb-1 opacity-70">{key.toUpperCase()}</div>
                      <div className="text-2xl font-bold">{metric.display}</div>
                      <div className="text-xs mt-1 capitalize">{metric.rating.replace(/-/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Recommendations */}
            {smartRecommendations.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-900">Smart Recommendations</h3>
                  <span className="text-sm text-slate-500">AI-matched based on your metrics</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {smartRecommendations.slice(0, 4).map((rec, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{rec.category}</span>
                          <h4 className="font-bold text-slate-900 mt-2">{rec.tool}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{rec.matchScore}%</div>
                          <div className="text-xs text-slate-500">Match Score</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{rec.why}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600 font-medium">{rec.estimatedImprovement}</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-600">Impact: {rec.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Waterfall Chart */}
            {result.resources.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <button 
                  onClick={() => setShowWaterfall(!showWaterfall)}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <div className="flex items-center gap-3">
                    <Server className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-900">Resource Waterfall</h3>
                    <span className="text-sm text-slate-500">({result.diagnostics.totalRequests} requests, {result.diagnostics.totalSize})</span>
                  </div>
                  {showWaterfall ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {showWaterfall && (
                  <div className="h-96 mt-4">
                    <ReactECharts option={waterfallOption} style={{ height: '100%' }} />
                  </div>
                )}
                
                {/* Resource Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-200">
                  {[
                    { type: 'document', color: '#3b82f6', label: 'Document' },
                    { type: 'script', color: '#f59e0b', label: 'Script' },
                    { type: 'stylesheet', color: '#10b981', label: 'CSS' },
                    { type: 'image', color: '#8b5cf6', label: 'Image' },
                    { type: 'font', color: '#ec4899', label: 'Font' },
                    { type: 'xhr', color: '#06b6d4', label: 'XHR' },
                  ].map(item => (
                    <div key={item.type} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opportunities */}
            {result.opportunities.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  Optimization Opportunities
                </h3>
                <div className="space-y-3">
                  {result.opportunities.map((opp) => (
                    <div key={opp.id} className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleOpp(opp.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            opp.priority === 'high' ? 'bg-red-100 text-red-700' :
                            opp.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {opp.priority.toUpperCase()}
                          </span>
                          <span className="font-medium text-slate-900">{opp.title}</span>
                          {opp.savings && (
                            <span className="text-sm text-green-600 font-medium">Save {opp.savings}</span>
                          )}
                        </div>
                        {expandedOpps.includes(opp.id) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      {expandedOpps.includes(opp.id) && (
                        <div className="px-4 pb-4 pt-2 bg-slate-50">
                          <p className="text-sm text-slate-600">{opp.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="text-center">
              <Link 
                href="/tools"
                className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Explore More Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        )}

        {/* Features */}
        {!result && (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
              Professional Performance Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Server className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Waterfall Visualization</h3>
                <p className="text-slate-600 text-sm">See exactly how each resource loads with interactive timeline charts.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Smart Matching</h3>
                <p className="text-slate-600 text-sm">AI-powered tool recommendations based on your specific metrics.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Globe className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Core Web Vitals</h3>
                <p className="text-slate-600 text-sm">Complete LCP, FID, CLS analysis with Google\'s official thresholds.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Code className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Actionable Insights</h3>
                <p className="text-slate-600 text-sm">Specific optimization opportunities prioritized by impact.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
