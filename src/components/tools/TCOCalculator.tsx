'use client';

import React, { useState, useMemo } from 'react';

interface ToolData {
  id: string;
  name: string;
  basePricePerMonth: number;
  numberOfUsers: number;
  overageFees: number;
  implementationCost: number;
  trainingTime: number;
  hourlyRate: number;
  color: string;
}

interface CostBreakdown {
  subscriptionCost: number;
  overageCost: number;
  implementationCost: number;
  trainingCost: number;
  totalCost: number;
  costPerUser: number;
}

const DEFAULT_TOOLS: ToolData[] = [
  {
    id: 'tool1',
    name: 'Notion Enterprise',
    basePricePerMonth: 15,
    numberOfUsers: 50,
    overageFees: 200,
    implementationCost: 5000,
    trainingTime: 40,
    hourlyRate: 50,
    color: '#000000',
  },
  {
    id: 'tool2',
    name: 'ClickUp Business',
    basePricePerMonth: 19,
    numberOfUsers: 50,
    overageFees: 150,
    implementationCost: 3000,
    trainingTime: 30,
    hourlyRate: 50,
    color: '#7B68EE',
  },
  {
    id: 'tool3',
    name: 'Asana Advanced',
    basePricePerMonth: 24,
    numberOfUsers: 50,
    overageFees: 100,
    implementationCost: 4000,
    trainingTime: 35,
    hourlyRate: 50,
    color: '#F06A6A',
  },
];

const YEARS = 3;
const MONTHS_PER_YEAR = 12;

export const TCOCalculator: React.FC = () => {
  const [tools, setTools] = useState<ToolData[]>(DEFAULT_TOOLS);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  const calculateCosts = (tool: ToolData): CostBreakdown => {
    const subscriptionCost = tool.basePricePerMonth * tool.numberOfUsers * MONTHS_PER_YEAR * YEARS;
    const overageCost = tool.overageFees * MONTHS_PER_YEAR * YEARS;
    const trainingCost = tool.trainingTime * tool.hourlyRate;
    const totalCost = subscriptionCost + overageCost + tool.implementationCost + trainingCost;
    const costPerUser = totalCost / tool.numberOfUsers;

    return {
      subscriptionCost,
      overageCost,
      implementationCost: tool.implementationCost,
      trainingCost,
      totalCost,
      costPerUser,
    };
  };

  const costs = useMemo(() => {
    return tools.map((tool) => ({
      tool,
      breakdown: calculateCosts(tool),
    }));
  }, [tools]);

  const rankedTools = useMemo(() => {
    return [...costs].sort((a, b) => a.breakdown.totalCost - b.breakdown.totalCost);
  }, [costs]);

  const hiddenCosts = useMemo(() => {
    const result: Record<string, string[]> = {};
    
    tools.forEach((tool) => {
      const toolHiddenCosts: string[] = [];
      const breakdown = calculateCosts(tool);
      
      // Check for high overage fees
      if (tool.overageFees > tool.basePricePerMonth * tool.numberOfUsers * 0.2) {
        toolHiddenCosts.push(`Overage fees (${tool.overageFees}/month) are more than 20% of base subscription`);
      }
      
      // Check for expensive training
      const trainingCostRatio = breakdown.trainingCost / breakdown.totalCost;
      if (trainingCostRatio > 0.1) {
        toolHiddenCosts.push(`Training costs represent ${(trainingCostRatio * 100).toFixed(1)}% of total TCO`);
      }
      
      // Check for high implementation cost
      const implCostRatio = tool.implementationCost / breakdown.totalCost;
      if (implCostRatio > 0.15) {
        toolHiddenCosts.push(`Implementation is ${(implCostRatio * 100).toFixed(1)}% of total cost - consider phased rollout`);
      }
      
      // Check price per user
      if (tool.basePricePerMonth > 20) {
        toolHiddenCosts.push(`Premium pricing at $${tool.basePricePerMonth}/user/month - enterprise features may be underutilized`);
      }
      
      result[tool.id] = toolHiddenCosts;
    });
    
    return result;
  }, [tools]);

  const updateTool = (id: string, field: keyof ToolData, value: string | number) => {
    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id
          ? { ...tool, [field]: typeof value === 'string' && field !== 'name' ? parseFloat(value) || 0 : value }
          : tool
      )
    );
  };

  const toggleDetails = (id: string) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">TCO Calculator</h2>
        <p className="text-gray-600">Total Cost of Ownership Comparison ({YEARS}-Year Projection)</p>
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">1</span>
          Tool Configuration
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center mb-4">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: tool.color }}
                />
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => updateTool(tool.id, 'name', e.target.value)}
                  className="font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none flex-1"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Base Price / User / Month ($)</label>
                  <input
                    type="number"
                    value={tool.basePricePerMonth}
                    onChange={(e) => updateTool(tool.id, 'basePricePerMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Number of Users</label>
                  <input
                    type="number"
                    value={tool.numberOfUsers}
                    onChange={(e) => updateTool(tool.id, 'numberOfUsers', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Overage Fees / Month ($)</label>
                  <input
                    type="number"
                    value={tool.overageFees}
                    onChange={(e) => updateTool(tool.id, 'overageFees', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Implementation Cost ($)</label>
                  <input
                    type="number"
                    value={tool.implementationCost}
                    onChange={(e) => updateTool(tool.id, 'implementationCost', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Training (hrs)</label>
                    <input
                      type="number"
                      value={tool.trainingTime}
                      onChange={(e) => updateTool(tool.id, 'trainingTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Hourly Rate ($)</label>
                    <input
                      type="number"
                      value={tool.hourlyRate}
                      onChange={(e) => updateTool(tool.id, 'hourlyRate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">2</span>
          {YEARS}-Year TCO Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 text-sm font-semibold text-gray-700 border-b">Tool</th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 border-b">Subscription</th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 border-b">Overage</th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 border-b">Implementation</th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 border-b">Training</th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 border-b bg-blue-50">Total TCO</th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 border-b">Cost/User</th>
              </tr>
            </thead>
            <tbody>
              {costs.map(({ tool, breakdown }) => (
                <tr key={tool.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-b">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: tool.color }}
                      />
                      <span className="font-medium text-gray-900">{tool.name}</span>
                    </div>
                  </td>
                  <td className="p-3 border-b text-right text-gray-700">
                    {formatCurrency(breakdown.subscriptionCost)}
                  </td>
                  <td className="p-3 border-b text-right text-gray-700">
                    {formatCurrency(breakdown.overageCost)}
                  </td>
                  <td className="p-3 border-b text-right text-gray-700">
                    {formatCurrency(breakdown.implementationCost)}
                  </td>
                  <td className="p-3 border-b text-right text-gray-700">
                    {formatCurrency(breakdown.trainingCost)}
                  </td>
                  <td className="p-3 border-b text-right bg-blue-50">
                    <span className="font-bold text-blue-700 text-lg">
                      {formatCurrency(breakdown.totalCost)}
                    </span>
                  </td>
                  <td className="p-3 border-b text-right text-gray-600">
                    {formatCurrency(breakdown.costPerUser)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Value Ranking */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">3</span>
          Value Ranking
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankedTools.map(({ tool, breakdown }, index) => {
            const savings = index === 0 ? 0 : breakdown.totalCost - rankedTools[0].breakdown.totalCost;
            const isBest = index === 0;
            
            return (
              <div
                key={tool.id}
                className={`rounded-lg p-4 border-2 transition-all ${
                  isBest
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2 ${
                        isBest ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-semibold text-gray-900">{tool.name}</span>
                  </div>
                  {isBest && (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                      Best Value
                    </span>
                  )}
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(breakdown.totalCost)}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {formatCurrency(breakdown.costPerUser)} per user
                </div>
                
                {!isBest && (
                  <div className="text-sm text-red-600 font-medium">
                    +{formatCurrency(savings)} vs best option
                  </div>
                )}
                
                {isBest && (
                  <div className="text-sm text-green-700 font-medium">
                    Lowest total cost of ownership
                  </div>
                )}

                {/* Progress bar showing relative cost */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(breakdown.totalCost / rankedTools[rankedTools.length - 1].breakdown.totalCost) * 100}%`,
                        backgroundColor: tool.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hidden Costs Alerts */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">4</span>
          Hidden Costs Alert
        </h3>

        <div className="space-y-4">
          {tools.map((tool) => {
            const toolHiddenCosts = hiddenCosts[tool.id] || [];
            if (toolHiddenCosts.length === 0) return null;

            return (
              <div key={tool.id} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: tool.color }}
                  />
                  <span className="font-semibold text-amber-900">{tool.name}</span>
                  <span className="ml-2 text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                    {toolHiddenCosts.length} warning{toolHiddenCosts.length > 1 ? 's' : ''}
                  </span>
                </div>
                <ul className="space-y-1">
                  {toolHiddenCosts.map((cost, idx) => (
                    <li key={idx} className="text-sm text-amber-800 flex items-start">
                      <span className="mr-2">⚠️</span>
                      {cost}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          
          {Object.values(hiddenCosts).every((arr) => arr.length === 0) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <span className="text-green-700">✅ No major hidden cost concerns detected</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          * TCO calculation includes subscription fees, overage charges, implementation costs, 
          and training expenses over a {YEARS}-year period. Additional factors like support costs, 
          integration fees, and productivity impact are not included.
        </p>
      </div>
    </div>
  );
};

export default TCOCalculator;
