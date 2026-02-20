import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  DollarSign, 
  Users, 
  Database, 
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

// Types
interface CostBreakdown {
  exportCost: number;
  importCost: number;
  trainingCost: number;
  productivityLoss: number;
  riskBuffer: number;
  total: number;
}

interface CalculationResult {
  breakdown: CostBreakdown;
  paybackMonths: number;
  isWorthIt: boolean;
  recommendation: string;
  monthlySavingsNeeded: number;
}

type ComplexityLevel = 'low' | 'medium' | 'high';

// Constants for cost calculation
const COMPLEXITY_MULTIPLIERS: Record<ComplexityLevel, number> = {
  low: 1,
  medium: 1.5,
  high: 2.5
};

const COMPLEXITY_LABELS: Record<ComplexityLevel, string> = {
  low: 'Low - Simple data structure',
  medium: 'Medium - Moderate relationships',
  high: 'High - Complex dependencies'
};

const BASE_EXPORT_COST = 500; // Base cost for data export
const BASE_IMPORT_COST = 800; // Base cost for data import and setup
const TRAINING_HOURS_PER_PERSON = 8; // Hours of training per person
const PRODUCTIVITY_LOSS_WEEKS = 1.5; // Average weeks of reduced productivity
const PRODUCTIVITY_LOSS_PERCENTAGE = 0.3; // 30% productivity loss during transition
const RISK_BUFFER_PERCENTAGE = 0.1; // 10% risk buffer

// Predefined tools with typical monthly costs (for ROI calculation context)
const COMMON_TOOLS: Record<string, { monthlyCost: number; category: string }> = {
  'Salesforce': { monthlyCost: 75, category: 'CRM' },
  'HubSpot': { monthlyCost: 45, category: 'CRM' },
  'Zoho CRM': { monthlyCost: 14, category: 'CRM' },
  'Pipedrive': { monthlyCost: 15, category: 'CRM' },
  'Jira': { monthlyCost: 7.75, category: 'Project Management' },
  'Asana': { monthlyCost: 10.99, category: 'Project Management' },
  'Monday': { monthlyCost: 8, category: 'Project Management' },
  'ClickUp': { monthlyCost: 5, category: 'Project Management' },
  'Notion': { monthlyCost: 8, category: 'Knowledge Base' },
  'Confluence': { monthlyCost: 5.75, category: 'Knowledge Base' },
  'Zendesk': { monthlyCost: 19, category: 'Support' },
  'Freshdesk': { monthlyCost: 15, category: 'Support' },
  'Intercom': { monthlyCost: 74, category: 'Support' },
  'Slack': { monthlyCost: 7.25, category: 'Communication' },
  'Microsoft Teams': { monthlyCost: 4, category: 'Communication' },
  'Discord': { monthlyCost: 0, category: 'Communication' },
  'MySQL': { monthlyCost: 0, category: 'Database' },
  'PostgreSQL': { monthlyCost: 0, category: 'Database' },
  'MongoDB': { monthlyCost: 0, category: 'Database' },
  'Custom': { monthlyCost: 0, category: 'Other' },
};

const TOOL_OPTIONS = Object.keys(COMMON_TOOLS);

export default function MigrationCostCalculator() {
  // Form state
  const [sourceTool, setSourceTool] = useState<string>('');
  const [targetTool, setTargetTool] = useState<string>('');
  const [customSourceTool, setCustomSourceTool] = useState<string>('');
  const [customTargetTool, setCustomTargetTool] = useState<string>('');
  const [recordCount, setRecordCount] = useState<number>(1000);
  const [complexity, setComplexity] = useState<ComplexityLevel>('medium');
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [sourceMonthlyCost, setSourceMonthlyCost] = useState<number>(0);
  const [targetMonthlyCost, setTargetMonthlyCost] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Calculate costs
  const calculateCosts = useMemo((): CalculationResult => {
    const complexityMultiplier = COMPLEXITY_MULTIPLIERS[complexity];
    
    // Data export cost: base + per-record fee scaled by complexity
    const perRecordExportCost = 0.05 * complexityMultiplier;
    const exportCost = BASE_EXPORT_COST + (recordCount * perRecordExportCost);
    
    // Data import/setup cost: base + per-record fee scaled by complexity
    const perRecordImportCost = 0.08 * complexityMultiplier;
    const importCost = BASE_IMPORT_COST + (recordCount * perRecordImportCost);
    
    // Training cost: hours × team size × hourly rate
    const trainingCost = TRAINING_HOURS_PER_PERSON * teamSize * hourlyRate;
    
    // Productivity loss: weeks × team size × hours per week × hourly rate × loss percentage
    const hoursPerWeek = 40;
    const productivityLoss = PRODUCTIVITY_LOSS_WEEKS * teamSize * hoursPerWeek * hourlyRate * PRODUCTIVITY_LOSS_PERCENTAGE;
    
    // Subtotal before risk buffer
    const subtotal = exportCost + importCost + trainingCost + productivityLoss;
    
    // Risk buffer (10%)
    const riskBuffer = subtotal * RISK_BUFFER_PERCENTAGE;
    
    // Total migration cost
    const total = subtotal + riskBuffer;
    
    // Monthly savings (if target is cheaper)
    const monthlySavings = Math.max(0, sourceMonthlyCost - targetMonthlyCost) * teamSize;
    
    // Payback period (in months)
    const paybackMonths = monthlySavings > 0 ? total / monthlySavings : Infinity;
    
    // Determine if it's worth it
    let isWorthIt = false;
    let recommendation = '';
    
    if (monthlySavings === 0) {
      isWorthIt = total < 5000; // Arbitrary threshold for non-cost-saving migrations
      recommendation = isWorthIt 
        ? 'The migration cost is reasonable for the expected benefits.'
        : 'Consider if the non-financial benefits justify this investment.';
    } else if (paybackMonths <= 6) {
      isWorthIt = true;
      recommendation = 'Excellent ROI! The migration pays for itself in under 6 months.';
    } else if (paybackMonths <= 12) {
      isWorthIt = true;
      recommendation = 'Good investment. You\'ll break even within a year.';
    } else if (paybackMonths <= 24) {
      isWorthIt = true;
      recommendation = 'Reasonable payback period. Consider the non-financial benefits too.';
    } else {
      isWorthIt = false;
      recommendation = 'Long payback period. Ensure there are significant non-financial benefits.';
    }
    
    return {
      breakdown: {
        exportCost: Math.round(exportCost),
        importCost: Math.round(importCost),
        trainingCost: Math.round(trainingCost),
        productivityLoss: Math.round(productivityLoss),
        riskBuffer: Math.round(riskBuffer),
        total: Math.round(total)
      },
      paybackMonths: paybackMonths === Infinity ? Infinity : Math.round(paybackMonths * 10) / 10,
      isWorthIt,
      recommendation,
      monthlySavings: Math.round(monthlySavings)
    };
  }, [recordCount, complexity, teamSize, hourlyRate, sourceMonthlyCost, targetMonthlyCost]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getSourceToolName = () => sourceTool === 'Custom' ? customSourceTool || 'Custom Tool' : sourceTool;
  const getTargetToolName = () => targetTool === 'Custom' ? customTargetTool || 'Custom Tool' : targetTool;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
          <Calculator className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Migration Cost Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate the real cost of migrating from one tool to another. 
          Make informed decisions with a complete breakdown of visible and hidden costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Migration Details
          </h2>

          <div className="space-y-5">
            {/* Source Tool */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source Tool (Current)
              </label>
              <select
                value={sourceTool}
                onChange={(e) => {
                  setSourceTool(e.target.value);
                  const tool = COMMON_TOOLS[e.target.value];
                  if (tool) {
                    setSourceMonthlyCost(tool.monthlyCost);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="">Select current tool...</option>
                {TOOL_OPTIONS.map(tool => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </select>
              {sourceTool === 'Custom' && (
                <input
                  type="text"
                  placeholder="Enter tool name"
                  value={customSourceTool}
                  onChange={(e) => setCustomSourceTool(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              )}
            </div>

            {/* Target Tool */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Tool (Destination)
              </label>
              <select
                value={targetTool}
                onChange={(e) => {
                  setTargetTool(e.target.value);
                  const tool = COMMON_TOOLS[e.target.value];
                  if (tool) {
                    setTargetMonthlyCost(tool.monthlyCost);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="">Select target tool...</option>
                {TOOL_OPTIONS.map(tool => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </select>
              {targetTool === 'Custom' && (
                <input
                  type="text"
                  placeholder="Enter tool name"
                  value={customTargetTool}
                  onChange={(e) => setCustomTargetTool(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              )}
            </div>

            {/* Monthly Cost Inputs (for custom tools or adjustment) */}
            {(sourceTool === 'Custom' || targetTool === 'Custom') && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Monthly Cost ($/user)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={sourceMonthlyCost}
                    onChange={(e) => setSourceMonthlyCost(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Monthly Cost ($/user)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={targetMonthlyCost}
                    onChange={(e) => setTargetMonthlyCost(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Record Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Records to Migrate
              </label>
              <input
                type="number"
                min="1"
                max="10000000"
                value={recordCount}
                onChange={(e) => setRecordCount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Records, documents, contacts, or data entries to be migrated
              </p>
            </div>

            {/* Data Complexity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Complexity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as ComplexityLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setComplexity(level)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      complexity === level
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <div className="capitalize mb-1">{level}</div>
                    <div className="text-xs opacity-75">
                      {level === 'low' && 'Simple'}
                      {level === 'medium' && 'Moderate'}
                      {level === 'high' && 'Complex'}
                    </div>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {COMPLEXITY_LABELS[complexity]}
              </p>
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Size (People Requiring Training)
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Average Hourly Rate ($)
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Average fully-loaded hourly cost per team member
              </p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate Migration Cost
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            {/* Total Cost Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-medium opacity-90 mb-2">Total Migration Cost</h3>
              <div className="text-5xl font-bold mb-4">
                {formatCurrency(calculateCosts.breakdown.total)}
              </div>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <ArrowRight className="w-4 h-4" />
                <span>
                  From {getSourceToolName() || 'Current Tool'} to {getTargetToolName() || 'New Tool'}
                </span>
              </div>
            </div>

            {/* Cost Breakdown Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Cost Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Database className="w-4 h-4" />
                    <span>Data Export</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculateCosts.breakdown.exportCost)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Database className="w-4 h-4" />
                    <span>Data Import & Setup</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculateCosts.breakdown.importCost)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Training ({TRAINING_HOURS_PER_PERSON}h × {teamSize} people)</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculateCosts.breakdown.trainingCost)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Productivity Loss (~{PRODUCTIVITY_LOSS_WEEKS} weeks)</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculateCosts.breakdown.productivityLoss)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Risk Buffer ({(RISK_BUFFER_PERCENTAGE * 100).toFixed(0)}%)</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculateCosts.breakdown.riskBuffer)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-blue-600">
                    {formatCurrency(calculateCosts.breakdown.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payback Analysis */}
            {calculateCosts.monthlySavings > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Payback Analysis
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-green-700 mb-1">Monthly Savings</div>
                    <div className="text-2xl font-bold text-green-800">
                      {formatCurrency(calculateCosts.monthlySavings)}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-700 mb-1">Payback Period</div>
                    <div className="text-2xl font-bold text-blue-800">
                      {calculateCosts.paybackMonths === Infinity 
                        ? '∞' 
                        : `${calculateCosts.paybackMonths} months`}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  Based on {formatCurrency(sourceMonthlyCost)}/user → {formatCurrency(targetMonthlyCost)}/user
                </div>
              </div>
            )}

            {/* Recommendation */}
            <div className={`rounded-xl shadow-lg p-6 ${
              calculateCosts.isWorthIt 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' 
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200'
            }`}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                {calculateCosts.isWorthIt ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <span className="text-green-900">Is it worth it? Yes!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-6 h-6 text-amber-600" />
                    <span className="text-amber-900">Is it worth it? Maybe...</span>
                  </>
                )}
              </h3>
              <p className={`text-sm ${
                calculateCosts.isWorthIt ? 'text-green-800' : 'text-amber-800'
              }`}>
                {calculateCosts.recommendation}
              </p>
              
              {!calculateCosts.isWorthIt && calculateCosts.paybackMonths > 24 && (
                <div className="mt-4 p-3 bg-white/50 rounded-lg text-sm text-amber-800">
                  <strong>Consider:</strong> Are there productivity improvements, better features, 
                  or reduced maintenance that justify this migration beyond pure cost savings?
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-600" />
                Tips to Reduce Migration Costs
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Clean and deduplicate data before migration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Use phased migration for large datasets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Train power users first, let them train others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Plan migration during slower business periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Consider hiring migration specialists for complex data</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showResults && (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8">
            <Calculator className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
            <p className="text-gray-500 text-center max-w-sm">
              Fill in the migration details and click "Calculate Migration Cost" 
              to see a complete cost breakdown and ROI analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
