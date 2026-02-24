import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenClaw - AI Agent 技能市场 | 扩展你的智能助手能力",
  description: "OpenClaw 技能市场提供各种 AI Agent 扩展技能，包括数据调研、内容创作、自动化工具等，一键安装即刻使用。",
  keywords: "OpenClaw,AI Agent,技能市场,AI扩展,智能助手,Agent技能",
  openGraph: {
    title: "OpenClaw - AI Agent 技能市场",
    description: "扩展你的智能助手能力，一键安装即刻使用",
    url: "/",
  },
};

const skills = [
  {
    id: "competitor-research",
    name: "竞品调研助手",
    shortName: "Competitor Research",
    description: "一键获取竞品的多平台用户评论，整合G2、Reddit、知乎、Hacker News等渠道的真实反馈",
    benefits: ["多平台数据整合", "真实用户痛点挖掘", "自动化报告生成"],
    price: "¥19",
    installs: "2.3k",
    author: "陈明",
    avatar: "CM",
    tag: "热门",
  },
  {
    id: "content-generator",
    name: "内容创作大师",
    shortName: "Content Master",
    description: "AI驱动的内容创作助手，支持文章、社交媒体、营销文案等多种格式，提升创作效率10倍",
    benefits: ["多平台适配", "SEO优化", "一键发布"],
    price: "¥29",
    installs: "1.8k",
    author: "林小雨",
    avatar: "LX",
    tag: "推荐",
    popular: true,
  },
  {
    id: "data-analyzer",
    name: "数据分析专家",
    shortName: "Data Analyzer",
    description: "自动分析业务数据，生成可视化报表和洞察建议，支持Excel、CSV、数据库等多种数据源",
    benefits: ["自动可视化", "智能洞察", "多源接入"],
    price: "¥39",
    installs: "956",
    author: "王浩然",
    avatar: "WH",
  },
  {
    id: "auto-scheduler",
    name: "智能日程管家",
    shortName: "Auto Scheduler",
    description: "智能管理日程安排，自动协调会议时间，发送提醒，整合多个日历平台",
    benefits: ["智能冲突检测", "自动协调", "多平台同步"],
    price: "¥15",
    installs: "3.1k",
    author: "张思远",
    avatar: "ZS",
    tag: "免费试用",
  },
  {
    id: "email-assistant",
    name: "邮件处理助手",
    shortName: "Email Assistant",
    description: "智能分类、摘要和回复邮件，支持多语言，大幅提升邮件处理效率",
    benefits: ["智能分类", "自动摘要", "快速回复"],
    price: "¥25",
    installs: "1.2k",
    author: "李雪",
    avatar: "LX",
  },
  {
    id: "research-assistant",
    name: "深度研究助手",
    shortName: "Research Assistant",
    description: "自动化信息收集和整理，支持学术搜索、新闻追踪、竞品监控等多种研究场景",
    benefits: ["自动追踪", "知识管理", "报告导出"],
    price: "¥49",
    installs: "687",
    author: "周凯",
    avatar: "ZK",
    tag: "企业版",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - OpenClaw Branding */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-3xl font-bold">OpenClaw</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              扩展你的 AI Agent
              <br />
              <span className="text-emerald-400">无限可能</span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              OpenClaw 技能市场提供各种 AI Agent 扩展能力。
              一键安装，即刻使用，让你的智能助手更强大。
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
              >
                浏览技能市场
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
              >
                查看文档
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400">50+</div>
              <div className="text-sm text-slate-400">可用技能</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">10k+</div>
              <div className="text-sm text-slate-400">活跃用户</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">99.9%</div>
              <div className="text-sm text-slate-400">可用性</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">热门 OpenClaw 技能</h2>
            <p className="text-slate-600">精选最受欢迎的 Agent 扩展能力</p>
          </div>
          <Link 
            href="/skills" 
            className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group border border-slate-200 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg font-bold text-slate-600">
                    {skill.avatar}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{skill.shortName}</div>
                    <div className="font-semibold text-slate-900">{skill.name}</div>
                  </div>
                </div>
                {skill.tag && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    skill.popular 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {skill.tag}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {skill.description}
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap gap-2 mb-6">
                {skill.benefits.map((benefit, idx) => (
                  <span key={idx} className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded">
                    {benefit}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-slate-900">{skill.price}</span>
                  <span className="text-xs text-slate-400">{skill.installs} 次安装</span>
                </div>
                <Link
                  href={`/buy?skill=${skill.id}`}
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  安装
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How OpenClaw Works */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            OpenClaw 如何工作
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            三步即可扩展你的 AI Agent 能力
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">选择技能</h3>
              <p className="text-sm text-slate-600">
                在 OpenClaw 技能市场浏览并选择你需要的 Agent 扩展能力
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">一键安装</h3>
              <p className="text-sm text-slate-600">
                获取 License Key，在 OpenClaw 配置中激活技能
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">即刻使用</h3>
              <p className="text-sm text-slate-600">
                你的 AI Agent 立即获得新能力，开始高效工作
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why OpenClaw */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          为什么选择 OpenClaw
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">即插即用</h3>
            <p className="text-sm text-slate-600">一键安装，无需复杂配置，即刻扩展 Agent 能力</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">安全可靠</h3>
            <p className="text-sm text-slate-600">所有技能经过审核，数据加密传输，保障隐私安全</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">社区驱动</h3>
            <p className="text-sm text-slate-600">由开发者社区贡献，持续更新，不断丰富技能生态</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">按需付费</h3>
            <p className="text-sm text-slate-600">只为你需要的技能付费，无订阅，无隐藏费用</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">OpenClaw</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">开始扩展你的 AI Agent</h2>
          <p className="text-slate-400 mb-8 text-lg">
            加入 10,000+ 用户，发现 Agent 的无限可能
          </p>
          
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
          >
            探索技能市场
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
