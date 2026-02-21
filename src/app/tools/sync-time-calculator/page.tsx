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
    affiliateLink: string; // 留空待填
  }[];
}

const tools = [
  {
    name: "Boost.space",
    monthlyPrice: 15,
    setupHours: 4,
    affiliateLink: "", // TODO: 用户补充
  },
  {
    name: "Make (Integromat)",
    monthlyPrice: 12,
    setupHours: 6,
    affiliateLink: "", // TODO: 用户补充
  },
  {
    name: "Zapier",
    monthlyPrice: 30,
    setupHours: 2,
    affiliateLink: "", // TODO: 用户补充
  },
  {
    name: "n8n (自托管)",
    monthlyPrice: 0,
    setupHours: 15,
    affiliateLink: "", // TODO: 用户补充
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
          <title>数据同步成本分析结果 | Stackmatrices</title>
          <meta name="description" content="计算手动数据同步的真实成本" />
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              你正在浪费 {result.hoursPerYear} 小时/年
            </h1>
            <p className="text-xl text-red-600 font-bold">
              = ${result.costPerYear.toLocaleString()} 年成本
            </p>
          </div>

          {/* 成本对比 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">自动化工具 ROI 对比</h2>
            
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
                        ${tool.monthlyPrice}/月 · 初始设置 {tool.setupHours} 小时
                      </p>
                    </div>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                        最佳ROI
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-slate-500">年费用</div>
                      <div className="font-bold text-slate-900">${tool.yearlyPrice}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">ROI</div>
                      <div className={`font-bold ${tool.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tool.roi > 900 ? '999%+' : `${tool.roi}%`}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">回本周期</div>
                      <div className="font-bold text-slate-900">
                        {tool.paybackMonths > 100 ? '首月' : `${tool.paybackMonths} 个月`}
                      </div>
                    </div>
                  </div>

                  <a
                    href={tool.affiliateLink || `#`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2 rounded-lg font-medium text-center block transition-colors ${
                      tool.affiliateLink
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {tool.affiliateLink ? '开始自动化' : '链接待补充'}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 隐藏成本提醒 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              手动同步的隐藏成本
            </h3>
            <ul className="text-amber-800 text-sm space-y-2">
              <li>• 数据不一致导致的决策失误</li>
              <li>• 员工因重复工作产生的倦怠</li>
              <li>• 手动操作出错后的返工时间</li>
              <li>• 无法实时同步导致的业务延迟</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-blue-600 rounded-xl p-6 text-center text-white mb-8">
            <h3 className="text-xl font-bold mb-2">不确定选哪个工具？</h3>
            <p className="text-blue-100 mb-4">
              使用我们的选型助手，3分钟找到最适合你的工具
            </p>
            <Link
              href="/tools/automation-finder"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              工具选型助手
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            重新计算
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>数据同步时间成本计算器 | Stackmatrices</title>
        <meta name="description" content="计算手动数据同步浪费的时间和金钱" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            手动数据同步成本计算器
          </h1>
          <p className="text-slate-600">
            输入你的时间成本，看看自动化能帮你省多少钱
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                每周手动同步数据花费几小时？
              </label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                placeholder="例如：5"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-slate-500 mt-1">
                包括：复制粘贴、核对数据、处理错误、沟通确认
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                你的时薪是多少？（美元）
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="例如：50"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-slate-500 mt-1">
                如果算团队成本，用平均工资；如果算机会成本，用你自己的费率
              </p>
            </div>

            <button
              onClick={calculate}
              disabled={!hoursPerWeek || !hourlyRate}
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              计算浪费成本
            </button>
          </div>
        </div>

        {/* 示例数据 */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">5小时</div>
            <div className="text-sm text-slate-500">每周平均浪费</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">260小时</div>
            <div className="text-sm text-slate-500">每年浪费</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">$13,000</div>
            <div className="text-sm text-slate-500">年成本 ($50/时)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
