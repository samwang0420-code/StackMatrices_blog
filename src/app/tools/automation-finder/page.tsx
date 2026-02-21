'use client';

import { useState } from 'react';
import Head from 'next/head';
import { ArrowRight, ArrowLeft, RefreshCcw, CheckCircle, Zap, Users, DollarSign, Puzzle } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
    tools: string[];
  }[];
}

interface ToolRecommendation {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  pricing: string;
  affiliateLink: string; // 留空待填
  score: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "你的团队规模？",
    options: [
      { value: "solo", label: "个人/自由职业", icon: <Users className="w-5 h-5" />, tools: ["make", "n8n"] },
      { value: "small", label: "小团队 (2-10人)", icon: <Users className="w-5 h-5" />, tools: ["boost", "make", "zapier"] },
      { value: "medium", label: "中型团队 (11-50人)", icon: <Users className="w-5 h-5" />, tools: ["boost", "make"] },
      { value: "large", label: "大型企业 (50+人)", icon: <Users className="w-5 h-5" />, tools: ["boost", "zapier"] },
    ],
  },
  {
    id: 2,
    text: "你的技术能力？",
    options: [
      { value: "nocode", label: "完全无代码 - 只想点选配置", icon: <Zap className="w-5 h-5" />, tools: ["zapier", "boost"] },
      { value: "basic", label: "基础技术 - 能看懂API文档", icon: <Zap className="w-5 h-5" />, tools: ["make", "boost"] },
      { value: "advanced", label: "技术流 - 能写代码/自建", icon: <Zap className="w-5 h-5" />, tools: ["n8n", "make"] },
    ],
  },
  {
    id: 3,
    text: "预算范围？",
    options: [
      { value: "free", label: "免费/开源优先", icon: <DollarSign className="w-5 h-5" />, tools: ["n8n"] },
      { value: "low", label: "低预算 ($10-50/月)", icon: <DollarSign className="w-5 h-5" />, tools: ["make", "boost"] },
      { value: "medium", label: "中等预算 ($50-200/月)", icon: <DollarSign className="w-5 h-5" />, tools: ["boost", "make", "zapier"] },
      { value: "high", label: "预算充足 ($200+/月)", icon: <DollarSign className="w-5 h-5" />, tools: ["zapier", "boost"] },
    ],
  },
  {
    id: 4,
    text: "主要集成需求？",
    options: [
      { value: "database", label: "数据库/表格同步 (Airtable/Notion)", icon: <Puzzle className="w-5 h-5" />, tools: ["boost", "make"] },
      { value: "crm", label: "CRM/营销自动化 (HubSpot/Salesforce)", icon: <Puzzle className="w-5 h-5" />, tools: ["zapier", "boost", "make"] },
      { value: "ecommerce", label: "电商/支付 (Shopify/Stripe)", icon: <Puzzle className="w-5 h-5" />, tools: ["make", "zapier"] },
      { value: "custom", label: "自定义API/内部系统", icon: <Puzzle className="w-5 h-5" />, tools: ["n8n", "make"] },
    ],
  },
];

const toolDatabase: Record<string, ToolRecommendation> = {
  boost: {
    id: "boost",
    name: "Boost.space",
    tagline: "数据同步专用，双向实时同步首选",
    description: "专为数据同步设计，支持双向实时同步、冲突解决、版本控制。特别适合需要保持多个系统数据一致的团队。",
    bestFor: ["数据同步", "双向集成", "团队协作"],
    pricing: "$8-20/用户/月",
    affiliateLink: "", // TODO: 用户补充 affiliate 链接
    score: 0,
  },
  make: {
    id: "make",
    name: "Make (Integromat)",
    tagline: "可视化工作流，性价比之选",
    description: "强大的可视化工作流构建器，支持复杂逻辑、循环、条件分支。比Zapier便宜，比n8n易用。",
    bestFor: ["复杂工作流", "可视化编排", "中等预算"],
    pricing: "$9-16/月 (按操作数)",
    affiliateLink: "", // TODO: 用户补充 affiliate 链接
    score: 0,
  },
  zapier: {
    id: "zapier",
    name: "Zapier",
    tagline: "生态最全，适合非技术团队",
    description: "最大的集成平台，5000+应用支持。界面友好，但价格较高，适合追求稳定和全面集成的团队。",
    bestFor: ["非技术用户", "应用生态", "稳定性优先"],
    pricing: "$19-69/月",
    affiliateLink: "", // TODO: 用户补充 affiliate 链接
    score: 0,
  },
  n8n: {
    id: "n8n",
    name: "n8n",
    tagline: "开源免费，技术团队首选",
    description: "开源工作流自动化，可自托管完全免费。功能强大但需要技术能力，适合有开发资源的团队。",
    bestFor: ["开源免费", "自托管", "技术团队"],
    pricing: "免费 (自托管) / $20/月 (云版)",
    affiliateLink: "", // TODO: 用户补充 affiliate 链接
    score: 0,
  },
};

export default function AutomationFinder() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [recommendations, setRecommendations] = useState<ToolRecommendation[]>([]);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRecommendations(newAnswers);
      setShowResult(true);
    }
  };

  const calculateRecommendations = (finalAnswers: Record<number, string>) => {
    const toolScores: Record<string, number> = {};

    // 初始化分数
    Object.keys(toolDatabase).forEach((tool) => {
      toolScores[tool] = 0;
    });

    // 根据答案计算分数
    Object.entries(finalAnswers).forEach(([questionId, answerValue]) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question) {
        const option = question.options.find((o) => o.value === answerValue);
        if (option) {
          option.tools.forEach((tool) => {
            toolScores[tool] = (toolScores[tool] || 0) + 1;
          });
        }
      }
    });

    // 排序并生成推荐
    const sortedTools = Object.entries(toolScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([toolId, score]) => ({
        ...toolDatabase[toolId],
        score,
      }));

    setRecommendations(sortedTools);
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setRecommendations([]);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Head>
          <title>你的自动化工具推荐 | Stackmatrices</title>
          <meta name="description" content="基于你的需求，推荐最适合的自动化工具" />
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              为你推荐的最佳工具
            </h1>
            <p className="text-slate-600">
              基于你的团队规模、技术能力和预算，这些工具最适合你
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {recommendations.map((tool, index) => (
              <div
                key={tool.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                  index === 0 ? 'border-blue-500 ring-4 ring-blue-100' : 'border-slate-200'
                }`}
              >
                {index === 0 && (
                  <div className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full mb-3">
                    🏆 最佳推荐
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2>
                    <p className="text-blue-600 font-medium">{tool.tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{tool.pricing}</div>
                    <div className="text-sm text-slate-500">起价</div>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={tool.affiliateLink || `#`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 text-center py-3 rounded-lg font-medium transition-colors ${
                      tool.affiliateLink
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {tool.affiliateLink ? '免费试用' : '链接待补充'}
                  </a>
                  <Link
                    href={`/blog/${tool.id}-review`}
                    className="flex-1 text-center py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    查看详细测评
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2">💡 专业建议</h3>
            <p className="text-slate-600 text-sm">
              选择工具时，除了功能和价格，还要考虑长期的数据迁移成本。
              建议先试用免费版，确认能满足核心需求后再付费。
              查看我们的
              <Link href="/blog/migration-cost-guide" className="text-blue-600 hover:underline">
                迁移成本指南
              </Link>
              了解详情。
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            重新测试
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>自动化工具选型助手 | Stackmatrices</title>
        <meta name="description" content="3分钟找到最适合你团队的自动化工具" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              问题 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {currentQuestion > 0 && (
            <button
              onClick={goBack}
              className="mb-4 text-slate-500 hover:text-slate-700 flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              返回上一题
            </button>
          )}

          <h1 className="text-2xl font-bold text-slate-900 mb-6">
            {question.text}
          </h1>

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {option.icon}
                </div>
                <span className="font-medium text-slate-900">{option.label}</span>
                <ArrowRight className="w-5 h-5 ml-auto text-slate-400 group-hover:text-blue-500" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          基于 Stackmatrices 团队实测数据推荐
        </p>
      </div>
    </div>
  );
}
