import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | StackMatrices",
  description: "Frequently asked questions about deploying intelligence skills, purchasing licenses, and getting support.",
};

const faqCategories = [
  {
    title: "Purchase & Payment",
    questions: [
      {
        q: "How do I purchase a skill?",
        a: "Browse the Skills Marketplace, select the intelligence capability you need, and click 'Deploy'. Choose your payment method (Alipay or WeChat Pay), complete the payment, and upload the payment screenshot. We'll verify and send your License Key to your dashboard."
      },
      {
        q: "What payment methods are accepted?",
        a: "We currently accept Alipay and WeChat Pay. All transactions are encrypted and secure."
      },
      {
        q: "Can I get a refund?",
        a: "Due to the nature of digital intelligence services, we do not offer refunds after purchase. We recommend starting with lower-priced skills to test before committing to larger purchases."
      },
      {
        q: "How long is the License Key valid?",
        a: "Pay-per-use licenses are valid indefinitely until credits are exhausted. Monthly subscriptions are valid for the subscription period and require renewal."
      }
    ]
  },
  {
    title: "Installation & Setup",
    questions: [
      {
        q: "How do I install a skill?",
        a: "After purchase, you'll receive a License Key. Add it to your OpenClaw environment as SKILL_LICENSE_KEY=your-key. Each skill includes detailed installation documentation."
      },
      {
        q: "Why does my License say invalid?",
        a: "Please check: 1) The License Key is copied correctly without extra spaces; 2) Environment variables are set properly; 3) If issues persist, contact support."
      },
      {
        q: "Can I use the License on multiple devices?",
        a: "Licenses are tied to your account and can be used across multiple devices under the same account. Do not share your License Key with others as this may result in account suspension."
      },
      {
        q: "I forgot my License Key",
        a: "Login to your StackMatrices account and navigate to Dashboard > My Skills to view all your purchased License Keys."
      }
    ]
  },
  {
    title: "Usage & Features",
    questions: [
      {
        q: "Where does the data come from?",
        a: "Data is sourced from real platforms including G2, Reddit, Quora, and Hacker News. We scrape publicly available data in real-time to ensure authenticity and freshness."
      },
      {
        q: "How quickly can I get results?",
        a: "Single research tasks typically complete in 5-10 minutes. Batch comparisons may take 15-30 minutes. Monitoring services update on a weekly schedule."
      },
      {
        q: "Is the data accurate?",
        a: "All data comes from real user reviews without modification. Source links are provided so you can verify the original data."
      },
      {
        q: "What products can I research?",
        a: "We support most SaaS products, software tools, and hardware devices. As long as the product has discussions on G2, Reddit, or similar platforms, we can analyze it."
      }
    ]
  },
  {
    title: "Account & Security",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click the 'Get Started' button in the top right, enter your email and password to register. Email verification is required before purchasing."
      },
      {
        q: "Can I change my email address?",
        a: "Currently, email addresses cannot be changed after registration. Please contact support if you need to update your email."
      },
      {
        q: "How is my account secured?",
        a: "We use Supabase Auth with encrypted password storage. We recommend using strong, unique passwords and enabling any available security features."
      },
      {
        q: "How do I contact support?",
        a: "Email us at sam.wang01@icloud.com or use the contact form on the website. We typically respond within 24 hours."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-400">
            Everything you need to know about deploying intelligence workflows
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-slate-800">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => (
                  <div key={qIndex} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                    <h3 className="font-semibold text-emerald-400 mb-3">{item.q}</h3>
                    <p className="text-slate-300 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-slate-400 mb-6">Our support team is here to help</p>
          <a
            href="mailto:sam.wang01@icloud.com"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
