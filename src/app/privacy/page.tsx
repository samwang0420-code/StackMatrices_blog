import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | StackMatrices",
  description: "StackMatrices privacy policy - how we handle your data when you use our OpenClaw Skill Registry.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              StackMatrices ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, and safeguard your information when you use our OpenClaw Skill 
              Registry and related services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">2. Information We Collect</h2>
            <div className="space-y-3 text-slate-300">
              <p><strong className="text-white">Account Information:</strong> Email address, password (encrypted), and account preferences.</p>
              <p><strong className="text-white">License Keys:</strong> Records of purchased skills and their usage.</p>
              <p><strong className="text-white">API Usage:</strong> Logs of skill invocations for billing and service improvement.</p>
              <p><strong className="text-white">Payment Data:</strong> Payment screenshots for verification (not stored permanently).</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Provide and maintain our Skill Registry services</li>
              <li>Process payments and verify transactions</li>
              <li>Send license keys and account notifications</li>
              <li>Monitor service usage for billing</li>
              <li>Improve our skills and user experience</li>
              <li>Respond to support requests</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">4. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We implement industry-standard security measures:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside mt-3">
              <li>All data transmitted via HTTPS/SSL encryption</li>
              <li>Passwords hashed using bcrypt</li>
              <li>Supabase security for database operations</li>
              <li>Regular security audits of our infrastructure</li>
              <li>No storage of sensitive payment information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">5. Third-Party Services</h2>
            <p className="text-slate-300 leading-relaxed">
              We use the following third-party services:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside mt-3">
              <li><strong className="text-white">Supabase:</strong> For authentication and database services</li>
              <li><strong className="text-white">Apify:</strong> For data extraction services (when using our skills)</li>
              <li><strong className="text-white">OpenAI:</strong> For AI processing capabilities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">6. Your Rights</h2>
            <p className="text-slate-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside mt-3">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">7. Data Retention</h2>
            <p className="text-slate-300 leading-relaxed">
              We retain your data as long as your account is active. Upon account deletion, we remove 
              personal information within 30 days. Aggregated usage data may be retained for analytics 
              purposes in anonymized form.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">8. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              For privacy-related questions or requests, contact us at:{" "}
              <a href="mailto:sam.wang01@icloud.com" className="text-emerald-400 hover:underline">
                sam.wang01@icloud.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
