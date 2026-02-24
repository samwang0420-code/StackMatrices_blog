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
  affiliateLink: string;
  score: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What's your team size?",
    options: [
      { value: "solo", label: "Solo / Freelancer", icon: <Users className="w-5 h-5" />, tools: ["make", "n8n"] },
      { value: "small", label: "Small Team (2-10)", icon: <Users className="w-5 h-5" />, tools: ["boost", "make", "zapier"] },
      { value: "medium", label: "Medium Team (11-50)", icon: <Users className="w-5 h-5" />, tools: ["boost", "make"] },
      { value: "large", label: "Enterprise (50+)", icon: <Users className="w-5 h-5" />, tools: ["boost", "zapier"] },
    ],
  },
  {
    id: 2,
    text: "What's your technical level?",
    options: [
      { value: "nocode", label: "No-code only - Point and click", icon: <Zap className="w-5 h-5" />, tools: ["zapier", "boost"] },
      { value: "basic", label: "Basic tech - Can read API docs", icon: <Zap className="w-5 h-5" />, tools: ["make", "boost"] },
      { value: "advanced", label: "Technical - Can write code", icon: <Zap className="w-5 h-5" />, tools: ["n8n", "make"] },
    ],
  },
  {
    id: 3,
    text: "What's your budget range?",
    options: [
      { value: "free", label: "Free / Open source", icon: <DollarSign className="w-5 h-5" />, tools: ["n8n"] },
      { value: "low", label: "Low budget ($10-50/mo)", icon: <DollarSign className="w-5 h-5" />, tools: ["make", "boost"] },
      { value: "medium", label: "Medium budget ($50-200/mo)", icon: <DollarSign className="w-5 h-5" />, tools: ["boost", "make", "zapier"] },
      { value: "high", label: "Budget flexible ($200+/mo)", icon: <DollarSign className="w-5 h-5" />, tools: ["zapier", "boost"] },
    ],
  },
  {
    id: 4,
    text: "What's your main integration need?",
    options: [
      { value: "database", label: "Database sync (Airtable/Notion)", icon: <Puzzle className="w-5 h-5" />, tools: ["boost", "make"] },
      { value: "crm", label: "CRM automation (HubSpot/Salesforce)", icon: <Puzzle className="w-5 h-5" />, tools: ["zapier", "boost", "make"] },
      { value: "ecommerce", label: "E-commerce (Shopify/Stripe)", icon: <Puzzle className="w-5 h-5" />, tools: ["make", "zapier"] },
      { value: "custom", label: "Custom API / Internal systems", icon: <Puzzle className="w-5 h-5" />, tools: ["n8n", "make"] },
    ],
  },
];

const toolDatabase: Record<string, ToolRecommendation> = {
  boost: {
    id: "boost",
    name: "Boost.space",
    tagline: "Two-way sync specialist - Best for real-time data sync",
    description: "Purpose-built for data synchronization. Supports bidirectional real-time sync, conflict resolution, and version control. Ideal for teams that need multiple systems to stay in sync.",
    bestFor: ["Data Sync", "Two-way Integration", "Team Collaboration"],
    pricing: "$8-20/user/month",
    affiliateLink: "https://boost.space/?fpr=stackmatrices",
    score: 0,
  },
  make: {
    id: "make",
    name: "Make (Integromat)",
    tagline: "Visual workflow builder - Best value for complex automation",
    description: "Powerful visual workflow builder with complex logic, loops, and conditional branches. More affordable than Zapier, easier than n8n.",
    bestFor: ["Complex Workflows", "Visual Building", "Mid-range Budget"],
    pricing: "$9-16/month (per operations)",
    affiliateLink: "https://www.make.com/en/register?pc=stackmatrices",
    score: 0,
  },
  zapier: {
    id: "zapier",
    name: "Zapier",
    tagline: "Largest ecosystem - Best for non-technical teams",
    description: "The biggest integration platform with 5000+ apps. User-friendly interface but higher price. Best for teams prioritizing ease-of-use and stability.",
    bestFor: ["Non-technical Users", "App Ecosystem", "Stability"],
    pricing: "$19-69/month",
    affiliateLink: "",
    score: 0,
  },
  n8n: {
    id: "n8n",
    name: "n8n",
    tagline: "Open source - Best for technical teams",
    description: "Open-source workflow automation. Fully free if self-hosted. Powerful but requires technical skills. Ideal for teams with development resources.",
    bestFor: ["Open Source", "Self-hosted", "Technical Teams"],
    pricing: "Free (self-hosted) / $20/month (cloud)",
    affiliateLink: "",
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

    Object.keys(toolDatabase).forEach((tool) => {
      toolScores[tool] = 0;
    });

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
      <div className="min-h-screen bg-slate-950">
        <Head>
          <title>Your Automation Tool Recommendation | Stackmatrices</title>
          <meta name="description" content="Get personalized automation tool recommendations based on your needs" />
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Best Tools for You
            </h1>
            <p className="text-slate-600">
              Based on your team size, technical skills, and budget
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {recommendations.map((tool, index) => (
              <div
                key={tool.id}
                className={`bg-slate-900 rounded-xl shadow-sm border-2 p-6 ${
                  index === 0 ? 'border-blue-500 ring-4 ring-blue-100' : 'border-slate-200'
                }`}
              >
                {index === 0 && (
                  <div className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full mb-3">
                    🏆 Best Match
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
                    <p className="text-blue-600 font-medium">{tool.tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{tool.pricing}</div>
                    <div className="text-sm text-slate-500">starting</div>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={tool.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Free Trial
                  </a>
                  <Link
                    href={`/blog/${tool.id}-review`}
                    className="flex-1 text-center py-3 border border-slate-300 rounded-lg font-medium text-slate-300 hover:bg-slate-950 transition-colors"
                  >
                    Read Full Review
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-white mb-2">💡 Pro Tip</h3>
            <p className="text-slate-600 text-sm">
              Consider long-term migration costs when choosing tools.
              Test with free trials before committing.
              Check our{' '}
              <Link href="/blog/migration-cost-guide" className="text-blue-600 hover:underline">
                Migration Cost Guide
              </Link>{' '}
              for details.
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 border border-slate-300 rounded-lg font-medium text-slate-300 hover:bg-slate-950 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>Automation Tool Finder | Stackmatrices</title>
        <meta name="description" content="Find the best automation tool for your team in 3 minutes" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
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

        <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-200 p-8">
          {currentQuestion > 0 && (
            <button
              onClick={goBack}
              className="mb-4 text-slate-500 hover:text-slate-300 flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          <h1 className="text-2xl font-bold text-white mb-6">
            {question.text}
          </h1>

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-slate-800 transition-all text-left flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {option.icon}
                </div>
                <span className="font-medium text-white">{option.label}</span>
                <ArrowRight className="w-5 h-5 ml-auto text-slate-400 group-hover:text-blue-500" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Powered by Stackmatrices real user data
        </p>
      </div>
    </div>
  );
}
