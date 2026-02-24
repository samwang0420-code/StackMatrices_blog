import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "竞品调研工具 | SaaS产品分析服务 | 用户评论数据采集",
  description: "专业的SaaS竞品分析平台，提供G2/Reddit/知乎/Hacker News多平台用户评论采集、竞品对比分析、TCO成本计算等服务。",
  keywords: "竞品调研,SaaS分析,用户评论采集,产品对比,G2数据,Reddit分析,竞品监控",
  openGraph: {
    title: "竞品调研工具 | SaaS产品分析服务",
    description: "专业的SaaS竞品分析平台，一键获取多平台用户真实反馈",
    url: "/",
  },
};

const services = [
  {
    id: "single-research",
    name: "单产品深度调研",
    shortName: "产品调研",
    description: "一键获取单个产品的全平台用户评论，包含G2、Reddit、知乎、Hacker News等多渠道真实反馈",
    benefits: ["多平台数据整合", "真实用户痛点挖掘", "评分对比分析"],
    price: "¥19",
    tag: "入门首选",
  },
  {
    id: "batch-compare",
    name: "批量竞品对比分析",
    shortName: "竞品对比",
    description: "同时分析3-5个竞品，自动生成对比报告，快速识别竞争优势与劣势",
    benefits: ["一键生成对比矩阵", "优劣势可视化", "定价策略分析"],
    price: "¥49",
    tag: "最受欢迎",
    popular: true,
  },
  {
    id: "content-material",
    name: "内容创作素材采集",
    shortName: "素材采集",
    description: "收集真实用户好评、痛点金句，为产品评测、营销文案提供第一手素材",
    benefits: ["真实用户评价", "可直接引用", "多场景适用"],
    price: "¥29",
    tag: "创作者必备",
  },
  {
    id: "tco-analysis",
    name: "TCO总拥有成本分析",
    shortName: "成本分析",
    description: "深度分析产品真实成本，包含隐藏费用、企业级定价、用户实际支出等数据",
    benefits: ["隐藏成本挖掘", "真实支出数据", "ROI计算辅助"],
    price: "¥39",
    tag: "企业推荐",
  },
  {
    id: "competitor-monitor",
    name: "竞品动态监控服务",
    shortName: "竞品监控",
    description: "持续追踪竞品动态，每周自动更新用户评论、价格变动、新功能反馈",
    benefits: ["每周自动更新", "价格变动提醒", "口碑趋势追踪"],
    price: "¥99",
    unit: "/月",
    tag: "长期追踪",
  },
  {
    id: "api-developer",
    name: "数据API开发接口",
    shortName: "数据API",
    description: "灵活的API接口，将用户评论数据集成到自己的CRM、BI系统或分析工具中",
    benefits: ["5000次/月调用", "RESTful接口", "技术文档完善"],
    price: "¥299",
    unit: "/月",
    tag: "开发者",
  },
];

const authors = [
  { name: "陈明", avatar: "CM" },
  { name: "林小雨", avatar: "LX" },
  { name: "王浩然", avatar: "WH" },
  { name: "张思远", avatar: "ZS" },
  { name: "李雪", avatar: "LX" },
  { name: "周凯", avatar: "ZK" },
];

function getAuthorForService(id: string) {
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % authors.length;
  return authors[index];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          SaaS竞品调研工具
          <br />
          <span className="text-slate-600 text-3xl md:text-4xl">一键获取全平台用户真实反馈</span>
        </h1>
        
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          专业的SaaS产品分析服务。整合G2、Reddit、知乎、Hacker News等多平台用户评论，
          提供竞品对比、成本分析、内容素材等一站式调研解决方案。
        </p>

        {/* Value Props */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-slate-700">
            <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>真实用户评论</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>多平台数据整合</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>即买即用</span>
          </div>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          查看全部服务
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          热门竞品调研服务
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const author = getAuthorForService(service.id);
            return (
              <div
                key={service.id}
                className="group border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                {/* Tag & Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    service.popular 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {service.tag}
                  </span>
                  <span className="text-2xl font-bold text-slate-900">
                    {service.price}
                    <span className="text-sm font-normal text-slate-500">{service.unit || '/次'}</span>
                  </span>
                </div>

                {/* Title - SEO optimized */}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {service.name}
                </h3>
                
                <p className="text-sm text-slate-500 mb-4">{service.shortName}</p>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-1 mb-6">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="text-emerald-500">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                      {author.avatar}
                    </div>
                    <span className="text-sm text-slate-500">{author.name}</span>
                  </div>
                  <Link
                    href={`/buy?service=${service.id}`}
                    className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    立即购买
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">
            如何使用竞品调研工具
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">选择服务</h3>
              <p className="text-sm text-slate-600">根据调研需求选择合适的数据服务类型</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">提交产品</h3>
              <p className="text-sm text-slate-600">输入需要调研的SaaS产品名称或竞品列表</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">获取报告</h3>
              <p className="text-sm text-slate-600">几分钟内获得完整的用户评论分析报告</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          谁在使用我们的竞品调研服务
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-2">产品经理</h3>
            <p className="text-sm text-slate-600">了解竞品功能优劣势，获取用户真实反馈，指导产品 roadmap 规划</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-2">市场运营</h3>
            <p className="text-sm text-slate-600">收集竞品营销话术和用户痛点，优化自身推广策略和内容方向</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-2">内容创作者</h3>
            <p className="text-sm text-slate-600">获取真实用户评价和金句，撰写有深度的SaaS产品评测文章</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-2">投资人</h3>
            <p className="text-sm text-slate-600">快速了解目标公司的用户口碑、市场反馈和竞品格局</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">开始你的竞品调研</h2>
          <p className="text-slate-300 mb-8">从真实用户评论中发现产品机会</p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            浏览全部服务
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
