import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API 服务 - 按业务流程购买",
  description: "选择适合你的数据服务，按实际业务需求付费",
};

const services = [
  {
    id: "single-research",
    name: "单产品调研",
    description: "获取 1 个产品的多平台真实评论（G2/Reddit/Quora/HN），包含用户痛点、好评、评分对比。适合快速竞品分析。",
    category: "调研分析",
    provider: "Apify Black Box",
    price: "¥19",
    unit: "次",
    popular: false,
  },
  {
    id: "batch-compare",
    name: "批量产品对比",
    description: "对比 3-5 个竞品，自动生成对比矩阵。包含功能对比表、用户满意度、价格分析、优缺点总结。",
    category: "竞品分析",
    provider: "Apify Black Box",
    price: "¥49",
    unit: "次",
    popular: true,
  },
  {
    id: "content-material",
    name: "内容创作素材",
    description: "获取真实用户痛点 + 好评金句，用于写评测文章、小红书、知乎回答。包含引用来源。",
    category: "内容创作",
    provider: "Apify Black Box",
    price: "¥29",
    unit: "次",
    popular: false,
  },
  {
    id: "tco-analysis",
    name: "TCO 计算器",
    description: "真实价格数据 + 隐藏成本分析。包含官方定价、用户反馈的实际花费、同类产品价格对比。",
    category: "成本分析",
    provider: "Apify Black Box",
    price: "¥39",
    unit: "次",
    popular: false,
  },
  {
    id: "competitor-monitor",
    name: "竞品监控",
    description: "每周自动抓取指定产品的新评论，发现用户痛点变化、新功能反馈、价格变动提醒。",
    category: "长期监控",
    provider: "Apify Black Box",
    price: "¥99",
    unit: "月",
    popular: false,
  },
  {
    id: "api-developer",
    name: "API 开发者包",
    description: "5000 次 API 调用额度 + 技术支持。适合集成到自己的工具/工作流中。包含文档和示例代码。",
    category: "开发者",
    provider: "Apify Black Box",
    price: "¥299",
    unit: "月",
    popular: true,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            选择你的数据服务
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            按实际业务场景购买，无需订阅。获取真实用户评论、竞品数据、内容素材。
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group bg-white rounded-xl border p-6 hover:shadow-lg transition-all ${
                service.popular 
                  ? 'border-primary ring-2 ring-primary/10' 
                  : 'border-slate-200 hover:border-primary/50'
              }`}
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {service.category}
                </span>
                {service.popular && (
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    热门
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-6 leading-relaxed min-h-[80px]">
                {service.description}
              </p>

              {/* Provider */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <span className="text-sm text-slate-500">{service.provider}</span>
              </div>

              {/* Price & Buy */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-2xl font-bold text-slate-900">{service.price}</span>
                  <span className="text-slate-500 text-sm">/{service.unit}</span>
                </div>
                <Link
                  href={`/buy?service=${service.id}`}
                  className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Buy
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">如何使用购买的服务？</h3>
              <p className="text-slate-600 text-sm">
                购买后会获得 License Key，在 Skill 中配置后即可使用。也支持通过 API 直接调用。
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">数据准确吗？</h3>
              <p className="text-slate-600 text-sm">
                数据来自 G2、Reddit、Quora、Hacker News 等真实平台，实时抓取，保证真实性。
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">可以退款吗？</h3>
              <p className="text-slate-600 text-sm">
                由于数据服务的特殊性，购买后不支持退款。建议先购买低价服务测试。
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-12">
          <p className="text-slate-600">
            需要定制方案？{' '}
            <a href="mailto:sam.wang01@icloud.com" className="text-primary font-medium hover:underline">
              联系我们
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
