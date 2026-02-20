import React, { useState, useMemo } from 'react';

interface CalculatorInputs {
  hoursPerWeek: string;
  hourlyCost: string;
  toolMonthlyCost: string;
}

interface CalculationResult {
  monthlySavings: number;
  roiPercentage: number;
  paybackMonths: number;
  isProfitable: boolean;
}

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    hoursPerWeek: '',
    hourlyCost: '',
    toolMonthlyCost: '',
  });

  const [showResults, setShowResults] = useState(false);

  const calculateROI = useMemo((): CalculationResult | null => {
    const hours = parseFloat(inputs.hoursPerWeek);
    const hourlyRate = parseFloat(inputs.hourlyCost);
    const toolCost = parseFloat(inputs.toolMonthlyCost);

    if (isNaN(hours) || isNaN(hourlyRate) || isNaN(toolCost) || hours <= 0 || hourlyRate <= 0 || toolCost <= 0) {
      return null;
    }

    // Formula: monthly_savings = (hours_per_week * 4.3 * hourly_cost) - tool_monthly_cost
    const monthlyLaborCost = hours * 4.3 * hourlyRate;
    const monthlySavings = monthlyLaborCost - toolCost;

    // Formula: roi = (monthly_savings / tool_monthly_cost) * 100
    const roiPercentage = toolCost > 0 ? (monthlySavings / toolCost) * 100 : 0;

    // Formula: payback = tool_monthly_cost / monthly_savings
    const paybackMonths = monthlySavings > 0 ? toolCost / monthlySavings : Infinity;

    return {
      monthlySavings,
      roiPercentage,
      paybackMonths,
      isProfitable: monthlySavings > 0,
    };
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Allow only positive numbers and decimals
    if (value === '' || /^(\d*\.?\d*)$/.test(value)) {
      setInputs((prev) => ({ ...prev, [field]: value }));
      setShowResults(false);
    }
  };

  const handleCalculate = () => {
    if (calculateROI) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setInputs({
      hoursPerWeek: '',
      hourlyCost: '',
      toolMonthlyCost: '',
    });
    setShowResults(false);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };

  const allInputsFilled = inputs.hoursPerWeek && inputs.hourlyCost && inputs.toolMonthlyCost;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">SaaS ROI Calculator</h2>
        <p className="text-blue-100 mt-1 text-sm">
          Calculate your potential savings and return on investment
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 3.666V14m-6.118 4.134l5.296-5.296a3 3 0 00-4.242-4.242l-5.296 5.296a3 3 0 104.242 4.242z" />
            </svg>
            Input Your Data
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Hours per week */}
            <div className="space-y-2">
              <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700">
                Manual Hours/Week
              </label>
              <div className="relative">
                <input
                  id="hoursPerWeek"
                  type="text"
                  inputMode="decimal"
                  value={inputs.hoursPerWeek}
                  onChange={handleInputChange('hoursPerWeek')}
                  placeholder="e.g. 10"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">hrs</span>
              </div>
            </div>

            {/* Hourly cost */}
            <div className="space-y-2">
              <label htmlFor="hourlyCost" className="block text-sm font-medium text-gray-700">
                Hourly Labor Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="hourlyCost"
                  type="text"
                  inputMode="decimal"
                  value={inputs.hourlyCost}
                  onChange={handleInputChange('hourlyCost')}
                  placeholder="e.g. 50"
                  className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Tool monthly cost */}
            <div className="space-y-2">
              <label htmlFor="toolMonthlyCost" className="block text-sm font-medium text-gray-700">
                Tool Monthly Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="toolMonthlyCost"
                  type="text"
                  inputMode="decimal"
                  value={inputs.toolMonthlyCost}
                  onChange={handleInputChange('toolMonthlyCost')}
                  placeholder="e.g. 99"
                  className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            disabled={!allInputsFilled}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
              allInputsFilled
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Calculate ROI
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Reset
          </button>
        </div>

        {/* Results Section */}
        {showResults && calculateROI && (
          <div className="space-y-4 animate-fadeIn">
            <div className="h-px bg-gray-200" />
            
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your Results
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Monthly Savings */}
              <div className={`p-4 rounded-lg border-2 ${
                calculateROI.isProfitable 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
                <p className={`text-2xl font-bold ${
                  calculateROI.isProfitable ? 'text-green-700' : 'text-red-700'
                }`}>
                  {formatCurrency(calculateROI.monthlySavings)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {calculateROI.isProfitable ? 'You save money!' : 'Review costs'}
                </p>
              </div>

              {/* ROI Percentage */}
              <div className={`p-4 rounded-lg border-2 ${
                calculateROI.roiPercentage > 0
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <p className="text-sm text-gray-600 mb-1">ROI</p>
                <p className={`text-2xl font-bold ${
                  calculateROI.roiPercentage > 0 ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {formatNumber(calculateROI.roiPercentage)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Return on investment
                </p>
              </div>

              {/* Payback Period */}
              <div className="p-4 rounded-lg border-2 bg-purple-50 border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Payback Period</p>
                <p className="text-2xl font-bold text-purple-700">
                  {isFinite(calculateROI.paybackMonths) 
                    ? `${formatNumber(calculateROI.paybackMonths)} mo`
                    : '∞'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isFinite(calculateROI.paybackMonths) && calculateROI.paybackMonths <= 3
                    ? 'Quick payback!'
                    : 'Time to break even'}
                </p>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-2">How we calculated:</p>
              <ul className="space-y-1">
                <li>• Monthly labor cost: {inputs.hoursPerWeek} hrs × 4.3 weeks × ${inputs.hourlyCost} = {formatCurrency(parseFloat(inputs.hoursPerWeek) * 4.3 * parseFloat(inputs.hourlyCost))}</li>
                <li>• Monthly savings: {formatCurrency(parseFloat(inputs.hoursPerWeek) * 4.3 * parseFloat(inputs.hourlyCost))} - ${inputs.toolMonthlyCost} = {formatCurrency(calculateROI.monthlySavings)}</li>
                <li>• ROI: ({formatCurrency(calculateROI.monthlySavings)} / ${inputs.toolMonthlyCost}) × 100 = {formatNumber(calculateROI.roiPercentage)}%</li>
              </ul>
            </div>

            {/* Affiliate Link Placeholder */}
            <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-amber-800">Compare top alternatives</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Find similar tools with better pricing or features. 
                    <a href="#" className="underline hover:text-amber-900 ml-1 font-medium">
                      View comparison →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State Hint */}
        {!showResults && (
          <div className="text-center py-6 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 3.666V14m-6.118 4.134l5.296-5.296a3 3 0 00-4.242-4.242l-5.296 5.296a3 3 0 104.242 4.242z" />
            </svg>
            <p className="text-sm">Fill in all fields above to see your ROI calculation</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}

export default ROICalculator;
