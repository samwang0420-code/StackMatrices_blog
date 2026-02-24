import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "常见问题解答 | OpenClaw 技能购买与安装支持",
  description: "OpenClaw 常见问题解答：技能购买、安装配置、使用方法、账户授权等问题的详细解答。如需帮助请联系客服。",
  keywords: "OpenClaw,FAQ,常见问题,技能购买,安装指南,技术支持,License Key",
};

const faqCategories = [
  {
    title: "购买与支付",
    questions: [
      {
        q: "如何购买 OpenClaw 技能？",
        a: "访问技能市场页面，选择你需要的技能，点击「购买」按钮。选择支付方式（支付宝或微信），完成支付后上传付款截图。我们会在审核通过后发送 License Key 到你的账户。"
      },
      {
        q: "支持哪些支付方式？",
        a: "目前支持支付宝和微信支付。所有支付都经过加密处理，安全可靠。"
      },
      {
        q: "购买后可以退款吗？",
        a: "由于数据服务的特殊性，购买后不支持退款。建议先购买低价服务测试，确认符合需求后再购买其他服务。"
      },
      {
        q: "License Key 有效期多久？",
        a: "按次购买的服务 License Key 长期有效，直到使用次数用完。按月订阅的服务在订阅期内有效，到期后需要续费。"
      }
    ]
  },
  {
    title: "安装与配置",
    questions: [
      {
        q: "如何安装技能？",
        a: "购买后获得 License Key，在 OpenClaw 的配置中添加环境变量 `SKILL_APIFY_LICENSE_KEY=你的key`。具体步骤请参考技能的安装文档。"
      },
      {
        q: "安装后提示 License 无效怎么办？",
        a: "请检查：1) License Key 是否正确复制，没有多余空格；2) 环境变量是否设置正确；3) 如果问题持续，请联系客服。"
      },
      {
        q: "可以在多台设备上使用吗？",
        a: "License Key 绑定账户，可以在同一账户下的多台设备使用。但请不要分享 License Key 给他人，这会导致账户被封禁。"
      },
      {
        q: "忘记 License Key 怎么办？",
        a: "登录你的 OpenClaw 账户，在「用户面板」-「我的技能」中可以查看所有已购买的 License Key。"
      }
    ]
  },
  {
    title: "使用与功能",
    questions: [
      {
        q: "数据来源于哪里？",
        a: "数据来自 G2、Reddit、Quora、Hacker News 等真实平台。我们通过合法方式实时抓取公开数据，确保数据的真实性和时效性。"
      },
      {
        q: "多久能拿到结果？",
        a: "单次调研通常 5-10 分钟完成。批量对比可能需要 15-30 分钟。监控服务会在每周固定时间自动更新。"
      },
      {
        q: "数据准确吗？",
        a: "所有数据来自真实用户评论，我们不做任何修改或过滤。你可以通过提供的链接查看原始数据源。"
      },
      {
        q: "支持哪些产品调研？",
        a: "支持大部分 SaaS 产品、软件工具、硬件设备等。只要产品在 G2、Reddit 等平台有讨论，我们就可以抓取分析。"
      }
    ]
  },
  {
    title: "账户与授权",
    questions: [
      {
        q: "如何注册账户？",
        a: "点击页面右上角的「注册」按钮，填写邮箱和密码即可注册。注册后需要验证邮箱才能购买服务。"
      },
      {
        q: "可以更改绑定的邮箱吗？",
        a: "目前不支持更改绑定邮箱。如需更换，请联系客服处理。"
      },
      {
        q: "账户安全如何保障？",
        a: "我们使用 Supabase Auth 进行身份验证，密码加密存储。建议设置强密码并定期更换。"
      },
      {
        q: "如何联系客服？",
        a: "可以通过以下方式联系我们：邮箱 sam.wang01@icloud.com，或者通过网站右下角的消息窗口留言。"
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">常见问题解答</h1>
          <p className="text-lg text-slate-300">
            找不到答案？请随时联系我们的客服团队
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
                {category.title}
              </h2>
              <div className="space-y-6">
                {category.questions.map((item, qIndex) => (
                  <div key={qIndex} className="bg-slate-50 rounded-lg p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">{item.q}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            还有其他问题？
          </h2>
          <p className="text-slate-600 mb-6">
            我们的客服团队随时为你提供帮助
          </p>
          <a
            href="mailto:sam.wang01@icloud.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            联系客服
          </a>
        </div>
      </section>
    </div>
  );
}
