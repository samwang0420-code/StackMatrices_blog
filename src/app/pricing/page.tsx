import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "数据服务市场",
  description: "跳过数据收集的繁琐工作，获取经过验证的用户洞察",
};

// 随机作者生成器
const authors = [
  { name: "陈明", avatar: "CM" },
  { name: "林小雨", avatar: "LX" },
  { name: "王浩然", avatar: "WH" },
  { name: "张思远", avatar: "ZS" },
  { name: "李雪", avatar: "LX" },
  { name: "周凯", avatar: "ZK" },
  { name: "吴静", avatar: "WJ" },
  { name: "刘洋", avatar: "LY" },
  { name: "赵欣", avatar: "ZX" },
  { name: "孙鹏", avatar: "SP" },
  { name: "徐雯", avatar: "XW" },
  { name: "杨帆", avatar: "YF" },
];

const services = [
  {
    id: "single-research",
    name: "单产品深度调研",
    description: "获取1个产品的多平台真实评论，包含用户痛点、好评、评分对比。适合快速了解竞品。",
    category: "调研分析",
    price: "¥19",
  },
  {
    id: "batch-compare",
    name: "批量竞品对比",
    description: "对比3-5个竞品，自动生成对比矩阵。包含功能对比、用户满意度、价格分析、优缺点总结。",
    category: "竞品分析",
    price: "¥49",
    popular: true,
  },
  {
    id: "content-material",
    name: "内容创作素材包",
    description: "获取真实用户痛点+好评金句，用于写评测文章、小红书、知乎回答。包含引用来源和截图。",
    category: "内容创作",
    price: "¥29",
  },
  {
    id: "tco-analysis",
    name: "TCO成本分析",
    description: "真实价格数据+隐藏成本分析。包含官方定价、用户反馈的实际花费、同类产品价格对比。",
    category: "成本分析",
    price: "¥39",
  },
  {
    id: "competitor-monitor",
    name: "竞品监控服务",
    description: "每周自动抓取指定产品的新评论，发现用户痛点变化、新功能反馈、价格变动提醒。",
    category: "长期监控",
    price: "¥99",
  },
  {
    id: "api-developer",
    name: "数据API套餐",
    description: "5000次数据调用额度+技术支持。适合集成到自己的工具/工作流中。包含完整文档和示例代码。",
    category: "开发者",
    price: "¥299",
    popular: true,
  },
];

// 为每个服务分配一个固定作者（通过id哈希确保一致性）
function getAuthorForService(id: string) {
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % authors.length;
  return authors[index];
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          跳过数据收集的繁琐工作。获取经过验证的用户洞察——包含真实痛点、好评金句、价格对比和来源链接。
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">✓</span>
            <span className="text-slate-600">即买即用</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">✓</span>
            <span className="text-slate-600">真实数据</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">✓</span>
            <span className="text-slate-600">多平台覆盖</span>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-slate-900">热门服务</h2>
          <Link 
            href="/services" 
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const author = getAuthorForService(service.id);
            return (
              <div
                key={service.id}
                className="group border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors"
              >
                {/* Price & Popular */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-slate-900">{service.price}</span>
                  {service.popular && (
                    <span className="text-xs text-emerald-600 font-medium">热门</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.name}</h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                {/* Author & Buy */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                      {author.avatar}
                    </div>
                    <span className="text-sm text-slate-500">{author.name}</span>
                  </div>
                  <Link
                    href={`/buy?service=${service.id}`}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded hover:bg-slate-800 transition-colors"
                  >
                    购买
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900 mb-8 text-center">常见问题</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-slate-900 mb-2">数据来源可靠吗？</h3>
            <p className="text-sm text-slate-600">数据来自G2、Reddit、Quora、Hacker News等真实平台，实时抓取，保证真实性。</p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 mb-2">多久能拿到结果？</h3>
            <p className="text-sm text-slate-600">单次调研通常5-10分钟完成。批量对比可能需要15-30分钟。</p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 mb-2">可以退款吗？</h3>
            <p className="text-sm text-slate-600">由于数据服务的特殊性，购买后不支持退款。建议先购买低价服务测试。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
