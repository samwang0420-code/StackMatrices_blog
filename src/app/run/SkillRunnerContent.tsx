'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Play, 
  CheckCircle, 
  AlertCircle,
  Download,
  ExternalLink
} from 'lucide-react';
import skillsData from '@/data/skills-detailed.json';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'code' | 'result' | 'error';
  data?: any;
}

// 模拟 Skill 运行（实际应该调用后端 API）
async function runSkill(skillId: string, input: any): Promise<any> {
  // 模拟延迟
  await new Promise(r => setTimeout(r, 2000));
  
  // 模拟返回结果
  return {
    status: 'success',
    summary: {
      totalReviews: 127,
      averageRating: 4.2,
      analyzedAt: new Date().toISOString()
    },
    insights: [
      "Most positive reviews mention fast shipping",
      "Negative reviews focus on packaging issues",
      "3-star reviews mention price concerns"
    ],
    topComplaints: [
      { issue: "Packaging damaged", count: 12, percentage: 9.4 },
      { issue: "Slow delivery", count: 8, percentage: 6.3 },
      { issue: "Missing accessories", count: 5, percentage: 3.9 }
    ],
    actionItems: [
      "Improve packaging quality",
      "Consider price adjustment",
      "Add FAQ about accessories"
    ]
  };
}

export default function SkillRunnerContent() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get('skill') || 'review-analyzer';
  const skill = skillsData.find(s => s.id === skillId);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始化欢迎消息
  useEffect(() => {
    if (skill && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Hi! I'm your **${skill.actionTitle}** assistant.\n\nI can help you ${skill.description.toLowerCase()}.\n\nJust tell me what you want to analyze - paste a product URL or describe what you need!`,
          type: 'text'
        }
      ]);
    }
  }, [skill]);

  // 自动滚动
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isRunning) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsRunning(true);

    // 分析用户输入
    const userInput = input.toLowerCase();
    
    // 检测 URL
    const urlMatch = userInput.match(/(https?:\/\/[^\s]+)/);
    
    if (urlMatch) {
      // 用户提供了 URL，开始分析
      const url = urlMatch[0];
      
      setMessages(prev => [...prev, {
        id: 'thinking-' + Date.now(),
        role: 'assistant',
        content: `🔍 Analyzing reviews from ${url}...`,
        type: 'text'
      }]);

      try {
        const result = await runSkill(skillId, { url });
        
        setMessages(prev => prev.filter(m => !m.id.startsWith('thinking-')));
        
        setMessages(prev => [...prev, {
          id: 'result-' + Date.now(),
          role: 'assistant',
          content: `✅ Analysis complete! Here's what I found:`,
          type: 'result',
          data: result
        }]);
      } catch (err: any) {
        setMessages(prev => [...prev, {
          id: 'error-' + Date.now(),
          role: 'assistant',
          content: `❌ Error: ${err.message || 'Failed to analyze'}`,
          type: 'error'
        }]);
      }
    } else {
      // 用户没有提供 URL，提示需要 URL
      setMessages(prev => [...prev, {
        id: 'ask-url-' + Date.now(),
        role: 'assistant',
        content: `I'd be happy to help! To analyze reviews, I need a product URL.\n\nPlease paste the link to the product page (Amazon, Shopify, etc.)\n\nExample: https://amazon.com/dp/B08N5WRWNW`,
        type: 'text'
      }]);
    }

    setIsRunning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!skill) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Skill Not Found</h1>
          <p className="text-slate-400">The skill you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
              <Play className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-bold">{skill.actionTitle}</h1>
              <p className="text-xs text-slate-400">v{skill.version} • Web Runner</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isInstalled ? (
              <button 
                onClick={() => setIsInstalled(true)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Install to OpenClaw
              </button>
            ) : (
              <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Installed
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === 'assistant' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {message.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Content */}
                <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl text-left ${
                    message.role === 'assistant'
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {message.type === 'result' ? (
                      <ResultCard data={message.data} />
                    ) : (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isRunning && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-800 px-4 py-3 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span className="text-slate-400 text-sm">Processing...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-800 p-4 bg-slate-900/50">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste a product URL or describe what you want to analyze..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none h-14"
                disabled={isRunning}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isRunning}
                className="px-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center"
              >
                {isRunning ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction 
            icon="🔗" 
            label="Paste Amazon URL"
            onClick={() => setInput('https://www.amazon.com/dp/B08N5WRWNW')}
          />
          <QuickAction 
            icon="📊" 
            label="Analyze Competitor"
            onClick={() => setInput('Compare reviews with competitor product')}
          />
          <QuickAction 
            icon="💡" 
            label="Find Pain Points"
            onClick={() => setInput('What are the main complaints in reviews?')}
          />
          <QuickAction 
            icon="📥" 
            label="Export Report"
            onClick={() => alert('Export feature coming soon!')}
          />
        </div>
      </div>
    </div>
  );
}

// 结果卡片组件
function ResultCard({ data }: { data: any }) {
  return (
    <div className="space-y-4 min-w-[300px]">
      {/* 概览 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-emerald-400">{data.summary.totalReviews}</div>
          <div className="text-xs text-slate-500">Reviews</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-emerald-400">{data.summary.averageRating}</div>
          <div className="text-xs text-slate-500">Avg Rating</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-emerald-400">{data.topComplaints.length}</div>
          <div className="text-xs text-slate-500">Issues Found</div>
        </div>
      </div>

      {/* 主要发现 */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Insights</h4>
        <ul className="space-y-1">
          {data.insights.map((insight: string, i: number) => (
            <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      {/* 主要问题 */}
      {data.topComplaints.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Top Issues</h4>
          <div className="space-y-2">
            {data.topComplaints.slice(0, 3).map((complaint: any, i: number) => (
              <div key={i} className="flex items-center justify-between bg-slate-900/30 rounded-lg px-3 py-2">
                <span className="text-sm text-slate-400">{complaint.issue}</span>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                  {complaint.count} ({complaint.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 行动建议 */}
      {data.actionItems && (
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Recommended Actions</h4>
          <ul className="space-y-1">
            {data.actionItems.map((action: string, i: number) => (
              <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                <span className="text-amber-500">→</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-2 pt-2">
        <button className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download Full Report
        </button>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 快速操作按钮
function QuickAction({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all text-left group"
    >
      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-xs text-slate-400 group-hover:text-emerald-400">{label}</div>
    </button>
  );
}
