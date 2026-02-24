import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenClaw 如何工作 | AI Agent 技能安装指南",
  description: "了解 OpenClaw 技能市场的完整使用流程：浏览技能、购买授权、安装配置到使用激活。三步即可扩展你的 AI Agent 能力。",
  keywords: "OpenClaw,AI Agent,技能安装,使用指南,Agent扩展,License Key",
};

const steps = [
  {
    number: "01",
    title: "浏览并选择技能",
    description: "在 OpenClaw 技能市场浏览各种 AI Agent 扩展能力。每个技能都有详细的功能介绍、使用场景和用户评价，帮助你找到最适合的工具。",
    details: [
      "查看技能详细介绍和功能列表",
      "了解适用场景和使用案例",
      "对比不同技能的特点和价格",
      "阅读其他用户的评价和反馈"
    ]
  },
  {
    number: "02",
    title: "购买并获取授权",
    description: "选择所需的技能后，通过安全的支付流程完成购买。我们支持支付宝、微信等主流支付方式，购买后立即获得 License Key。",
    details: [
      "选择适合的服务套餐（按次或按月）",
      "使用支付宝或微信完成支付",
      "上传付款截图进行验证",
      "审核通过后获得 License Key"
    ]
  },
  {
    number: "03",
    title: "安装并配置技能",
    description: "在 OpenClaw 中配置 License Key，激活技能。每个技能都有详细的安装文档和配置说明，确保你能快速上手。",
    details: [
      "在 OpenClaw 配置中添加 License Key",
      "根据文档配置环境变量",
      "测试技能是否正常工作",
      "开始使用新能力处理任务"
    ]
  }
];

const features = [
  {
    title: "无需订阅",
    description: "按需购买，用多少付多少。没有月度订阅费，没有隐藏费用。",
    icon: "💰"
  },
  {
    title: "即买即用",
    description: "购买后立即获得 License Key，无需等待，即刻激活使用。",
    icon: "⚡"
  },
  {
    title: "安全可靠",
    description: "所有技能经过审核，数据传输加密，保障你的隐私和安全。",
    icon: "🔒"
  },
  {
    title: "持续更新",
    description: "技能由开发者社区维护，持续优化和更新，不断增加新功能。",
    icon: "🔄"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            OpenClaw 如何工作
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            三步即可扩展你的 AI Agent 能力，从浏览到使用只需几分钟
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">{step.number}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{step.description}</p>
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span className="text-slate-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            为什么选择 OpenClaw
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-slate-600 mb-8">
            浏览技能市场，发现适合你的 AI Agent 扩展能力
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/skills"
              className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
            >
              浏览技能市场
            </Link>
            <Link
              href="/faq"
              className="px-8 py-4 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              查看常见问题
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
