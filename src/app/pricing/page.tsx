import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Pricing - Get Your License Key",
  description: "Get access to G2, Reddit, Quora, and Hacker News data via API. Choose the plan that fits your needs.",
};

const tiers = [
  {
    name: "探索版",
    nameEn: "Explorer",
    price: "¥29",
    period: "/月",
    description: "适合个人尝鲜",
    features: [
      "每月 100 次 API 调用",
      "支持 G2 / Reddit / Quora / HN",
      "标准响应时间",
      "邮件支持",
    ],
    cta: "选择探索版",
    popular: false,
  },
  {
    name: "创作者版",
    nameEn: "Creator",
    price: "¥99",
    period: "/月",
    description: "适合内容创作者",
    features: [
      "每月 500 次 API 调用",
      "支持 G2 / Reddit / Quora / HN",
      "批量查询功能",
      "优先响应时间",
      "邮件 + 微信支持",
    ],
    cta: "选择创作者版",
    popular: true,
  },
  {
    name: "团队版",
    nameEn: "Team",
    price: "¥299",
    period: "/月",
    description: "适合小团队/工作室",
    features: [
      "每月 2000 次 API 调用",
      "支持 G2 / Reddit / Quora / HN",
      "批量查询功能",
      "最快响应时间",
      "优先技术支持",
      "用量预警通知",
    ],
    cta: "选择团队版",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            获取 API 访问权限
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            一站式获取 G2、Reddit、Quora、Hacker News 的真实用户评论和讨论数据
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.nameEn}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? "bg-primary text-white shadow-xl scale-105"
                  : "bg-slate-50 text-slate-900 border border-slate-200"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-1 rounded-full">
                  最受欢迎
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className={`text-sm ${tier.popular ? "text-white/80" : "text-slate-500"}`}>
                  {tier.nameEn}
                </p>
                <p className={`mt-2 text-sm ${tier.popular ? "text-white/80" : "text-slate-500"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-black">{tier.price}</span>
                <span className={tier.popular ? "text-white/80" : "text-slate-500"}>{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg
                      className={`h-5 w-5 ${tier.popular ? "text-white" : "text-primary"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={tier.popular ? "text-white/90" : "text-slate-600"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/buy?tier=${tier.nameEn.toLowerCase()}`}
                className={`block w-full py-3 px-4 rounded-lg font-bold text-center transition-colors ${
                  tier.popular
                    ? "bg-white text-primary hover:bg-slate-100"
                    : "bg-primary text-white hover:bg-primary-hover"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">如何获取 License Key？</h3>
              <p className="text-slate-600">
                选择套餐后完成支付，上传付款截图，审核通过后即可在用户面板查看 License Key。
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">支持哪些支付方式？</h3>
              <p className="text-slate-600">
                目前支持支付宝和微信支付。海外用户请联系客服。
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">可以退款吗？</h3>
              <p className="text-slate-600">
                由于 API 调用的特殊性，购买后不支持退款。建议先选择探索版试用。
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">用量用完了怎么办？</h3>
              <p className="text-slate-600">
                可以随时升级到更高套餐，或等待下月重置。团队版支持用量预警。
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-12">
          <p className="text-slate-600">
            需要定制方案？{" "}
            <a href="mailto:sam.wang01@icloud.com" className="text-primary font-medium hover:underline">
              联系客服
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
