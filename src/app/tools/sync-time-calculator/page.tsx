'use client';

import { useState } from 'react';
import Head from 'next/head';
import { Calculator, Clock, DollarSign, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CalculationResult {
  hoursPerYear: number;
  costPerYear: number;
  toolComparisons: {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    setupHours: number;
    roi: number;
    paybackMonths: number;
    affiliateLink: string;
  }[];
}

const tools = [
  {
    name: "Boost.space",
    monthlyPrice: 15,
    setupHours: 4,
    affiliateLink: "",
  },
  {
    name: "Make (Integromat)",
    monthlyPrice: 12,
    setupHours: 6,
    affiliateLink: "",
  },
  {
    name: "Zapier",
    monthlyPrice: 30,
    setupHours: 2,
    affiliateLink: "",
  },
  {
    name: "n8n (Self-hosted)",
    monthlyPrice: 0,
    setupHours: 15,
    affiliateLink: "",
  },
];

export default function SyncTimeCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('');
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    const hours = parseFloat(hoursPerWeek) || 0;
    const rate = parseFloat(hourlyRate) || 0;

    const hoursPerYear = hours * 52;
    const costPerYear = hoursPerYear * rate;

    const toolComparisons = tools.map((tool) => {
      const yearlyPrice = tool.monthlyPrice * 12;
      const setupCost = tool.setupHours * rate;
      const totalFirstYearCost = yearlyPrice + setupCost;
      const savings = costPerYear - totalFirstYearCost;
      const roi = totalFirstYearCost > 0 ? (savings / totalFirstYearCost) * 100 : 999;
      const paybackMonths = savings > 0 ? (totalFirstYearCost / (savings / 12)) : 999;

      return {
        ...tool,
        yearlyPrice,
        roi: Math.round(roi),
        paybackMonths: Math.round(paybackMonths * 10) / 10,
      };
    }).sort((a, b) => b.roi - a.roi);

    setResult({
      hoursPerYear,
      costPerYear,
      toolComparisons,
    });
    setShowResult(true);
  };

  const reset = () => {
    setHoursPerWeek('');
    setHourlyRate('');
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Head>
          <title>Data Sync Cost Analysis | Stackmatrices</title>
          <meta name="description" content="Calculate the real cost of manual data synchronization" />
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              You're Losing {result.hoursPerYear} Hours/Year
            </h1>
            <p className="text-xl text-red-600 font-bold">
              = ${result.costPerYear.toLocaleString()} Annual Cost
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Automation Tool ROI Comparison</h2>
            
            <div className="space-y-4">
              {result.toolComparisons.map((tool, index) => (
                <div
                  key={tool.name}
                  className={`p-4 rounded-lg border-2 ${
                    index === 0 ? 'border-green-500 bg-green-50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{tool.name}</h3>
                      <p className="text-sm text-slate-600">
                        ${tool.monthlyPrice}/mo · {tool.setupHours}h setup
                      </p>
                    </div>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                        Best ROI
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-slate-500">Yearly Cost</div>
                      <div className="font-bold text-slate-900">${tool.yearlyPrice}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">ROI</div>
                      <div className={`font-bold ${tool.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tool.roi > 900 ? '999%+' : `${tool.roi}%`}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Payback</div>
                      <div className="font-bold text-slate-900">
                        {tool.paybackMonths > 100 ? 'First month' : `${tool.paybackMonths} months`}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-review`}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium text-center block hover:bg-blue-700 transition-colors"
                  >
                    Read Full Review
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Hidden Costs of Manual Sync
            </h3>
            <ul className="text-amber-800 text-sm space-y-2">
              <li>• Decision errors from inconsistent data</li>
              <li>• Employee burnout from repetitive work</li>
              <li>• Rework time from manual errors</li>
              <li>• Business delays from non-real-time sync</li>
            </ul>
          </div>

          <div className="bg-blue-600 rounded-xl p-6 text-center text-white mb-8">
            <h3 className="text-xl font-bold mb-2">Not sure which tool to choose?</h3>
            <p className="text-blue-100 mb-4">
              Use our tool finder to get personalized recommendations
            </p>
            <Link
              href="/tools/automation-finder"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Tool Finder
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Recalculate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Data Sync Time Cost Calculator | Stackmatrices</title>
        <meta name="description" content="Calculate time and money wasted on manual data sync" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Manual Data Sync Cost Calculator
          </h1>
          <p className="text-slate-600">
            Calculate how much time and money manual data entry costs you
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Hours per week on manual data sync?
              </label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                placeholder="e.g., 5"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-slate-500 mt-1">
                Include: copy-paste, data checking, error handling, communication
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Your hourly rate? (USD)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="e.g., 50"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-slate-500 mt-1">
                Use team average for opportunity cost, or your personal rate
              </p>
            </div>

            <button
              onClick={calculate}
              disabled={!hoursPerWeek || !hourlyRate}
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Calculate Wasted Cost
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">5 hrs</div>
            <div className="text-sm text-slate-500">Avg wasted/week</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">260 hrs</div>
            <div className="text-sm text-slate-500">Per year</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">$13,000</div>
            <div className="text-sm text-slate-500">Annual cost ($50/hr)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
