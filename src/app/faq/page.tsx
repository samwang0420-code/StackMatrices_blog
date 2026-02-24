import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | StackMatrices - Intelligence Automation vs Fiverr",
  description: "Why StackMatrices beats Fiverr, Upwork, and traditional agencies for Amazon/Shopify intelligence automation. Get enterprise-grade workflows without hiring freelancers.",
};

const faqCategories = [
  {
    title: "StackMatrices vs Fiverr & Freelancers",
    questions: [
      {
        q: "Why should I choose StackMatrices over hiring on Fiverr?",
        a: "Fiverr freelancers charge $50-200 for one-time scrapes that break when Amazon changes their HTML. StackMatrices provides maintained, API-backed intelligence workflows that auto-adapt to platform changes. One Shadow Monitor deployment ($99/month) replaces $2,000+ in freelancer costs for continuous monitoring."
      },
      {
        q: "How is this different from Upwork data scraping freelancers?",
        a: "Upwork developers bill $40-100/hour for custom scrapers. A typical competitor monitoring script takes 10-20 hours to build ($400-2000 upfront), then breaks when the target site updates. Our skills are production-tested, continuously maintained, and deploy in minutes—not weeks."
      },
      {
        q: "Can't I just hire a VA on Fiverr to monitor competitors manually?",
        a: "A VA costs $5-15/hour and works 40 hours/week. That's $800-2400/month for limited coverage. Shadow Monitor tracks unlimited ASINs 24/7, sends instant alerts, and never misses a price change. ROI: 24x-240x return on investment."
      },
      {
        q: "What about Fiverr 'Amazon experts' who offer similar services?",
        a: "Most Fiverr 'Amazon experts' use the same free tools you can download. StackMatrices provides proprietary intelligence infrastructure: real-time data pipelines, AI-powered synthesis, and enterprise-grade reliability. We don't just scrape—we deliver actionable conclusions."
      }
    ]
  },
  {
    title: "StackMatrices vs Agencies",
    questions: [
      {
        q: "How does this compare to hiring an automation agency?",
        a: "Agencies charge $5,000-50,000 for custom automation projects. StackMatrices provides pre-built, battle-tested intelligence workflows starting at $49. Get 80% of agency results at 1% of the cost—with deployment in minutes, not months."
      },
      {
        q: "Why not just work with a business intelligence consulting firm?",
        a: "BI consultants charge $200-500/hour and deliver PowerPoint decks weeks later. StackMatrices delivers live intelligence feeds directly to your Slack/Discord in real-time. Actionable data beats stale reports."
      },
      {
        q: "Is this enterprise-grade or just for small sellers?",
        a: "Our architecture serves individual sellers to 8-figure operations. The same Shadow Monitor tracking 10 ASINs for a solo seller tracks 10,000 ASINs for enterprise clients. Scale without switching platforms."
      }
    ]
  },
  {
    title: "Purchase & Getting Started",
    questions: [
      {
        q: "How do I purchase a skill?",
        a: "Browse the Intelligence Arsenal, select your capability (Shadow Monitor, Review Pulse, etc.), and click 'Deploy'. Pay via Alipay or WeChat, upload your receipt, and receive your License Key within hours."
      },
      {
        q: "Do you offer a free trial?",
        a: "We don't do limited free trials that expire. Instead, we offer affordable entry-level skills ($39-49) so you can test our quality before scaling. No credit card required—just purchase and deploy."
      },
      {
        q: "What's the refund policy?",
        a: "Due to the digital nature of intelligence services, we don't offer refunds. However, our skills are priced so you can test with minimal risk—a $49 Review Pulse analysis is cheaper than one hour of Fiverr developer time."
      }
    ]
  },
  {
    title: "Technical & Integration",
    questions: [
      {
        q: "Do I need technical skills to use StackMatrices?",
        a: "If you can copy-paste a License Key, you can deploy our skills. No coding required for standard deployments. Advanced users can customize workflows via our Python SDK and API."
      },
      {
        q: "How does the License Key system work?",
        a: "Each skill requires a unique License Key (format: XXXXX-XXXXX-XXXXX). Add it as an environment variable: SKILL_LICENSE_KEY=your-key-here. The skill activates immediately and begins delivering intelligence."
      },
      {
        q: "What platforms are supported?",
        a: "Skills deploy on OpenClaw, Make (Integromat), n8n, or any Python environment. Data outputs to Slack, Discord, Email, Notion, Airtable, Google Sheets, and 500+ integrations via webhooks."
      },
      {
        q: "Where does the data come from?",
        a: "Real-time scraping from Amazon, Shopify, G2, Capterra, Reddit, Quora, and Hacker News. We extract public data using proprietary techniques that adapt to platform changes—no brittle XPath selectors."
      },
      {
        q: "Is the data accurate and up-to-date?",
        a: "Shadow Monitor checks every 6-24 hours depending on competitor activity. Review Pulse analyzes the latest 100-500 reviews. All data includes source URLs for verification. Freshness beats Fiverr's stale spreadsheets."
      }
    ]
  },
  {
    title: "Results & ROI",
    questions: [
      {
        q: "What kind of ROI can I expect?",
        a: "Shadow Monitor users report 15-30% revenue increases from faster competitive response. Review Pulse clients identify 3-5 product improvement opportunities per analysis. Fee Auditor recovers 2-5% of revenue lost to Amazon errors. Typical payback: 2-4 weeks."
      },
      {
        q: "How quickly will I see results?",
        a: "Most skills deliver first intelligence within 5-30 minutes of deployment. Shadow Monitor begins tracking immediately. Review Pulse completes analysis in 10-15 minutes. No waiting for freelancers to 'start work.'"
      },
      {
        q: "Can I customize the skills for my specific needs?",
        a: "Yes. Enterprise clients can request custom intelligence architectures starting at $2,000. Our team builds bespoke workflows for complex multi-marketplace operations, custom data sources, and unique business logic."
      }
    ]
  },
  {
    title: "Support & Custom Solutions",
    questions: [
      {
        q: "What support is included?",
        a: "All skills include email support (24-48h response). Enterprise packages include Slack support and priority handling. We don't outsource support to random freelancers—you get direct access to the architecture team."
      },
      {
        q: "I need something not in your skill catalog. Can you build it?",
        a: "Absolutely. Our Custom Architecture service ($2,000+) builds end-to-end automation systems for unique requirements. Book a Strategy Session to discuss your specific intelligence needs."
      },
      {
        q: "How do I contact support?",
        a: "Email sam.wang01@icloud.com or use the contact form. For urgent issues, mention your License Key and skill name in the subject line."
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Why StackMatrices Beats{" "}
            <span className="text-emerald-400">Fiverr</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Get enterprise-grade intelligence automation without hiring unreliable freelancers or overpaying agencies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-slate-800/50 px-6 py-3 rounded-lg">
              <p className="text-emerald-400 font-bold">10x Faster</p>
              <p className="text-slate-500 text-sm">Deploy in minutes</p>
            </div>
            <div className="bg-slate-800/50 px-6 py-3 rounded-lg">
              <p className="text-emerald-400 font-bold">100x Cheaper</p>
              <p className="text-slate-500 text-sm">Than hiring agencies</p>
            </div>
            <div className="bg-slate-800/50 px-6 py-3 rounded-lg">
              <p className="text-emerald-400 font-bold">Always On</p>
              <p className="text-slate-500 text-sm">24/7 intelligence</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-slate-800">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => (
                  <div key={qIndex} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-500/30 transition-colors">
                    <h3 className="font-semibold text-emerald-400 mb-3">{item.q}</h3>
                    <p className="text-slate-300 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">StackMatrices vs The Alternatives</h2>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800/50">
                    <th className="text-left p-4 text-slate-400 font-medium">Factor</th>
                    <th className="text-center p-4 text-emerald-400 font-bold">StackMatrices</th>
                    <th className="text-center p-4 text-slate-400 font-medium">Fiverr</th>
                    <th className="text-center p-4 text-slate-400 font-medium">Agency</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-slate-800">
                    <td className="p-4 text-slate-300">Deployment Time</td>
                    <td className="p-4 text-center text-emerald-400">5 minutes</td>
                    <td className="p-4 text-center text-slate-500">1-2 weeks</td>
                    <td className="p-4 text-center text-slate-500">2-3 months</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-4 text-slate-300">Monthly Cost</td>
                    <td className="p-4 text-center text-emerald-400">$49-299</td>
                    <td className="p-4 text-center text-slate-500">$800-2400</td>
                    <td className="p-4 text-center text-slate-500">$5,000-50,000</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-4 text-slate-300">Maintenance</td>
                    <td className="p-4 text-center text-emerald-400">Included</td>
                    <td className="p-4 text-center text-slate-500">Extra fees</td>
                    <td className="p-4 text-center text-slate-500">Retainer required</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-4 text-slate-300">Uptime</td>
                    <td className="p-4 text-center text-emerald-400">99.9%</td>
                    <td className="p-4 text-center text-slate-500">Unreliable</td>
                    <td className="p-4 text-center text-slate-500">Varies</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-4 text-slate-300">Data Freshness</td>
                    <td className="p-4 text-center text-emerald-400">Real-time</td>
                    <td className="p-4 text-center text-slate-500">When they feel like it</td>
                    <td className="p-4 text-center text-slate-500">Weekly reports</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stop Overpaying for Intelligence</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of sellers who replaced Fiverr freelancers and expensive agencies with StackMatrices automation.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Browse Intelligence Skills
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <p className="text-slate-500 text-sm mt-6">
            Still have questions? Email sam.wang01@icloud.com
          </p>
        </div>
      </section>
    </div>
  );
}
