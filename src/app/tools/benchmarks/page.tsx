'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown,
  TrendingUp,
  AlertCircle,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  ShieldCheck,
  Calendar
} from 'lucide-react';

// Types
interface BenchmarkData {
  id: string;
  category: string;
  icon: string;
  description: string;
  avgPricePerSeat: number;
  priceRange: {
    low: number;
    high: number;
  };
  avgContractLength: number; // in months
  hiddenFeesFrequency: number; // percentage
  customerSatisfaction: number; // 1-10
  marketLeader: string;
  topAlternatives: string[];
  hiddenFeesDetails: string[];
  satisfactionFactors: {
    positive: string[];
    negative: string[];
  };
  pricingModel: string;
  contractTerms: string;
}

interface SortConfig {
  key: keyof BenchmarkData | null;
  direction: 'asc' | 'desc';
}

// Mock Data - 10 SaaS Categories
const benchmarkData: BenchmarkData[] = [
  {
    id: '1',
    category: 'CRM',
    icon: '👥',
    description: 'Customer Relationship Management tools for sales and support teams',
    avgPricePerSeat: 89,
    priceRange: { low: 25, high: 300 },
    avgContractLength: 12,
    hiddenFeesFrequency: 35,
    customerSatisfaction: 7.2,
    marketLeader: 'Salesforce',
    topAlternatives: ['HubSpot', 'Pipedrive', 'Zoho CRM'],
    hiddenFeesDetails: [
      'API call overages ($0.05-0.10 per 1000 calls)',
      'Storage limits exceeded ($10/GB/month)',
      'Advanced reporting modules ($50/user/month)',
      'Sandbox environment fees ($200/month)'
    ],
    satisfactionFactors: {
      positive: ['Comprehensive features', 'Strong integrations', 'Mobile apps'],
      negative: ['Steep learning curve', 'Expensive for small teams', 'Complex setup']
    },
    pricingModel: 'Per user/month with tiered feature access',
    contractTerms: 'Annual contracts with 15-20% discount; month-to-month available at premium'
  },
  {
    id: '2',
    category: 'Project Management',
    icon: '📋',
    description: 'Tools for task tracking, collaboration, and project planning',
    avgPricePerSeat: 18,
    priceRange: { low: 0, high: 45 },
    avgContractLength: 8,
    hiddenFeesFrequency: 22,
    customerSatisfaction: 8.1,
    marketLeader: 'Asana',
    topAlternatives: ['Monday.com', 'ClickUp', 'Notion'],
    hiddenFeesDetails: [
      'Guest user fees ($5-10/guest/month)',
      'Advanced automation limits',
      'Premium support tiers ($500/month)',
      'Enterprise SSO add-ons ($4/user/month)'
    ],
    satisfactionFactors: {
      positive: ['Intuitive interface', 'Flexible workflows', 'Good free tier'],
      negative: ['Notification overload', 'Limited offline functionality', 'Gantt charts in premium only']
    },
    pricingModel: 'Freemium model with per-seat paid tiers',
    contractTerms: 'Monthly billing standard; annual plans offer 15-18% savings'
  },
  {
    id: '3',
    category: 'Email Marketing',
    icon: '📧',
    description: 'Email campaign management, automation, and analytics platforms',
    avgPricePerSeat: 52,
    priceRange: { low: 15, high: 159 },
    avgContractLength: 6,
    hiddenFeesFrequency: 45,
    customerSatisfaction: 7.6,
    marketLeader: 'Mailchimp',
    topAlternatives: ['Klaviyo', 'ConvertKit', 'ActiveCampaign'],
    hiddenFeesDetails: [
      'Contact list overages ($0.005-0.01 per contact over limit)',
      'Email send limits exceeded ($0.001 per additional email)',
      'Advanced segmentation features ($50/month)',
      'Dedicated IP address ($250 setup + $50/month)'
    ],
    satisfactionFactors: {
      positive: ['Easy template creation', 'Good deliverability rates', 'Detailed analytics'],
      negative: ['Price jumps with list growth', 'Limited automation in lower tiers', 'Support wait times']
    },
    pricingModel: 'Based on contact count; unlimited seats typically',
    contractTerms: 'Monthly billing; annual discounts vary by contact volume (10-20%)'
  },
  {
    id: '4',
    category: 'Accounting/ERP',
    icon: '💰',
    description: 'Financial management, invoicing, and enterprise resource planning',
    avgPricePerSeat: 45,
    priceRange: { low: 15, high: 199 },
    avgContractLength: 18,
    hiddenFeesFrequency: 52,
    customerSatisfaction: 6.9,
    marketLeader: 'QuickBooks Online',
    topAlternatives: ['Xero', 'FreshBooks', 'Sage Intacct'],
    hiddenFeesDetails: [
      'Payroll processing fees ($35-125/month + $4-10/employee)',
      'Payment processing (2.9% + $0.30 per transaction)',
      'Multi-currency features ($30/month)',
      'Advanced reporting ($40/month)',
      '1099 filing fees ($15-25 per form)'
    ],
    satisfactionFactors: {
      positive: ['Comprehensive tax features', 'Bank reconciliation', 'Accountant access'],
      negative: ['Unexpected fee increases', 'Limited customization', 'Slow customer support']
    },
    pricingModel: 'Tiered by feature set; add-ons for payroll and payments',
    contractTerms: 'Annual contracts typical for mid-market; monthly for SMBs'
  },
  {
    id: '5',
    category: 'Customer Support',
    icon: '🎧',
    description: 'Help desk, ticketing, and live chat solutions',
    avgPricePerSeat: 65,
    priceRange: { low: 19, high: 199 },
    avgContractLength: 10,
    hiddenFeesFrequency: 28,
    customerSatisfaction: 7.8,
    marketLeader: 'Zendesk',
    topAlternatives: ['Freshdesk', 'Intercom', 'Help Scout'],
    hiddenFeesDetails: [
      'Chatbot conversations overage ($0.05-0.10 per conversation)',
      'AI features add-on ($50/agent/month)',
      'Custom integrations ($2000+ setup)',
      'Knowledge base overages ($10/1000 articles)'
    ],
    satisfactionFactors: {
      positive: ['Omnichannel support', 'Robust ticketing', 'Extensive integrations'],
      negative: ['Complex pricing tiers', 'Learning curve for admins', 'Chat widget performance issues']
    },
    pricingModel: 'Per agent/month with feature-based tiers',
    contractTerms: 'Annual contracts preferred; 20-25% discount vs monthly'
  },
  {
    id: '6',
    category: 'Video Conferencing',
    icon: '📹',
    description: 'Virtual meeting, webinar, and collaboration platforms',
    avgPricePerSeat: 16,
    priceRange: { low: 0, high: 30 },
    avgContractLength: 12,
    hiddenFeesFrequency: 15,
    customerSatisfaction: 8.3,
    marketLeader: 'Zoom',
    topAlternatives: ['Microsoft Teams', 'Google Meet', 'Cisco Webex'],
    hiddenFeesDetails: [
      'Cloud recording storage overage ($10/GB/month)',
      'Large meeting add-ons ($50-200/month)',
      'Webinar platform fees ($79-799/month)',
      'Phone number provisioning ($10-25/month)'
    ],
    satisfactionFactors: {
      positive: ['Reliable connection quality', 'Easy to join meetings', 'Good screen sharing'],
      negative: ['40-minute limit on free tier', 'Privacy concerns', 'Resource-intensive app']
    },
    pricingModel: 'Per host/license model; free tier with limitations',
    contractTerms: 'Monthly or annual; annual typically saves 15-20%'
  },
  {
    id: '7',
    category: 'HR/People Ops',
    icon: '👔',
    description: 'Human resources, payroll, and talent management platforms',
    avgPricePerSeat: 12,
    priceRange: { low: 6, high: 40 },
    avgContractLength: 14,
    hiddenFeesFrequency: 48,
    customerSatisfaction: 7.0,
    marketLeader: 'Gusto',
    topAlternatives: ['BambooHR', 'Rippling', 'Workday'],
    hiddenFeesDetails: [
      'Per-employee fees beyond base ($6-12/employee/month)',
      'Benefits administration (1-3% of premiums)',
      'State tax registration fees ($50-200 per state)',
      'Time tracking add-ons ($4/user/month)',
      'Off-cycle payroll runs ($25-50 each)'
    ],
    satisfactionFactors: {
      positive: ['Automated compliance', 'Employee self-service', 'Direct deposit reliability'],
      negative: ['Limited customization', 'Reporting limitations', 'Integration gaps']
    },
    pricingModel: 'Base fee + per-employee pricing; tiered by features',
    contractTerms: 'Annual agreements common; setup fees for complex implementations'
  },
  {
    id: '8',
    category: 'Analytics/Business Intelligence',
    icon: '📊',
    description: 'Data visualization, reporting, and business intelligence tools',
    avgPricePerSeat: 38,
    priceRange: { low: 0, high: 125 },
    avgContractLength: 16,
    hiddenFeesFrequency: 41,
    customerSatisfaction: 7.4,
    marketLeader: 'Tableau',
    topAlternatives: ['Power BI', 'Looker', 'Metabase'],
    hiddenFeesDetails: [
      'Data processing overages ($10-25 per GB over limit)',
      'Premium connectors ($500-2000/year each)',
      'Advanced analytics modules ($50/user/month)',
      'Embedded analytics licensing (custom pricing)',
      'Training and certification ($500-2000 per person)'
    ],
    satisfactionFactors: {
      positive: ['Powerful visualizations', 'Data source flexibility', 'Drill-down capabilities'],
      negative: ['Steep learning curve', 'Expensive for small teams', 'Performance with large datasets']
    },
    pricingModel: 'Per user/month or per-viewer pricing models',
    contractTerms: 'Multi-year contracts common; annual minimum commitments'
  },
  {
    id: '9',
    category: 'Cloud Storage',
    icon: '☁️',
    description: 'File storage, sync, and collaboration platforms',
    avgPricePerSeat: 15,
    priceRange: { low: 0, high: 35 },
    avgContractLength: 12,
    hiddenFeesFrequency: 20,
    customerSatisfaction: 8.0,
    marketLeader: 'Dropbox Business',
    topAlternatives: ['Google Drive', 'Box', 'OneDrive'],
    hiddenFeesDetails: [
      'Storage overage ($0.10-0.25 per GB over limit)',
      'Advanced security features ($5-10/user/month)',
      'eDiscovery and legal hold ($10/user/month)',
      'API access fees for heavy usage'
    ],
    satisfactionFactors: {
      positive: ['Reliable sync', 'Cross-platform support', 'File versioning'],
      negative: ['Storage limits feel restrictive', 'Sync conflicts', 'Search limitations']
    },
    pricingModel: 'Per user with storage tiers; unlimited plans available',
    contractTerms: 'Annual billing typical; 2-3 year deals for enterprise'
  },
  {
    id: '10',
    category: 'Development/DevOps',
    icon: '⚙️',
    description: 'Code repositories, CI/CD, and developer productivity tools',
    avgPricePerSeat: 24,
    priceRange: { low: 0, high: 84 },
    avgContractLength: 8,
    hiddenFeesFrequency: 18,
    customerSatisfaction: 8.2,
    marketLeader: 'GitHub',
    topAlternatives: ['GitLab', 'Bitbucket', 'Azure DevOps'],
    hiddenFeesDetails: [
      'CI/CD minute overages ($0.008-0.016 per minute)',
      'Large file storage ($5 per 50GB pack)',
      'Advanced security scanning ($20/user/month)',
      'Copilot AI assistant ($10/user/month)',
      'Codespaces compute ($0.18-2.88 per hour)'
    ],
    satisfactionFactors: {
      positive: ['Excellent collaboration features', 'Vast ecosystem', 'Reliable hosting'],
      negative: ['Microsoft integration concerns', 'Pricing complexity', 'Enterprise lock-in']
    },
    pricingModel: 'Free for open source; per-user pricing for teams',
    contractTerms: 'Monthly billing standard; enterprise annual contracts available'
  }
];

const categories = Array.from(new Set(benchmarkData.map(d => d.category)));

export default function BenchmarkDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  // Toggle row expansion
  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  // Handle sorting
  const handleSort = (key: keyof BenchmarkData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = [...benchmarkData];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(item =>
        item.category.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.marketLeader.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      data = data.filter(item => selectedCategories.includes(item.category));
    }

    // Sort
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return data;
  }, [searchTerm, selectedCategories, sortConfig]);

  // Get satisfaction color
  const getSatisfactionColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  // Get hidden fees warning level
  const getHiddenFeesWarning = (freq: number) => {
    if (freq >= 40) return { color: 'text-red-600', label: 'High' };
    if (freq >= 25) return { color: 'text-yellow-600', label: 'Medium' };
    return { color: 'text-green-600', label: 'Low' };
  };

  const lastUpdated = 'February 20, 2026';

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Industry Benchmark Database
              </h1>
              <p className="mt-2 text-gray-600">
                Compare SaaS pricing, contracts, and customer satisfaction across categories
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories, descriptions, or market leaders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Category Tags */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategories.includes(category)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
              {(searchTerm || selectedCategories.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-full text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{filteredData.length}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${Math.round(filteredData.reduce((acc, d) => acc + d.avgPricePerSeat, 0) / filteredData.length || 0)}
              </div>
              <div className="text-sm text-gray-500">Avg Price/Seat</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(filteredData.reduce((acc, d) => acc + d.avgContractLength, 0) / filteredData.length || 0)} mo
              </div>
              <div className="text-sm text-gray-500">Avg Contract</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(filteredData.reduce((acc, d) => acc + d.customerSatisfaction, 0) / filteredData.length || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">Avg Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white w-10"></th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center gap-2">
                      Category
                      <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('avgPricePerSeat')}
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Avg Price/Month
                      <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Price Range
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('avgContractLength')}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Avg Contract
                      <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('hiddenFeesFrequency')}
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Hidden Fees
                      <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('customerSatisfaction')}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Satisfaction
                      <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => {
                  const isExpanded = expandedRows.has(item.id);
                  const satisfactionClass = getSatisfactionColor(item.customerSatisfaction);
                  const hiddenFeesWarning = getHiddenFeesWarning(item.hiddenFeesFrequency);

                  return (
                    <React.Fragment key={item.id}>
                      <tr 
                        className="hover:bg-slate-950 transition-colors cursor-pointer"
                        onClick={() => toggleRow(item.id)}
                      >
                        <td className="px-6 py-4">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <div className="font-semibold text-white">{item.category}</div>
                              <div className="text-sm text-gray-500">Leader: {item.marketLeader}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">${item.avgPricePerSeat}</div>
                          <div className="text-sm text-gray-500">per seat/month</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white">${item.priceRange.low} - ${item.priceRange.high}</div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ 
                                width: `${((item.avgPricePerSeat - item.priceRange.low) / (item.priceRange.high - item.priceRange.low)) * 100}%` 
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{item.avgContractLength} months</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${hiddenFeesWarning.color}`}>
                            <span className="font-semibold">{item.hiddenFeesFrequency}%</span>
                            <span className="text-sm">({hiddenFeesWarning.label})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${satisfactionClass}`}>
                            {item.customerSatisfaction.toFixed(1)}/10
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Details */}
                      {isExpanded && (
                        <tr className="bg-slate-950">
                          <td colSpan={7} className="px-6 py-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Left Column */}
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-white mb-2">About</h4>
                                  <p className="text-gray-600">{item.description}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Market Leaders
                                  </h4>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                      {item.marketLeader}
                                    </span>
                                    <span className="text-sm text-gray-500">(Leader)</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {item.topAlternatives.map((alt) => (
                                      <span 
                                        key={alt}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                                      >
                                        {alt}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-white mb-2">Pricing Model</h4>
                                  <p className="text-gray-600 text-sm">{item.pricingModel}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-white mb-2">Contract Terms</h4>
                                  <p className="text-gray-600 text-sm">{item.contractTerms}</p>
                                </div>
                              </div>

                              {/* Right Column */}
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2 text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    Common Hidden Fees
                                  </h4>
                                  <ul className="space-y-2">
                                    {item.hiddenFeesDetails.map((fee, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-red-400 mt-1">•</span>
                                        {fee}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Satisfaction Factors
                                  </h4>
                                  <div className="space-y-3">
                                    <div>
                                      <span className="text-sm font-medium text-green-600">Positive:</span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {item.satisfactionFactors.positive.map((factor) => (
                                          <span 
                                            key={factor}
                                            className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                                          >
                                            {factor}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium text-red-600">Negative:</span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {item.satisfactionFactors.negative.map((factor) => (
                                          <span 
                                            key={factor}
                                            className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs"
                                          >
                                            {factor}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4">
                                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Negotiation Tips
                                  </h4>
                                  <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Annual payments typically save 15-25%</li>
                                    <li>• Ask for waived implementation fees</li>
                                    <li>• Request price caps for multi-year deals</li>
                                    <li>• Bundle multiple products for discounts</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Data compiled from public sources, user reviews, and vendor pricing pages.</p>
          <p className="mt-1">Prices are estimates and may vary based on specific requirements and negotiations.</p>
        </div>
      </div>
    </div>
  );
}
