import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | StackMatrices",
  description: "StackMatrices Terms of Service - rules and guidelines for using our OpenClaw Skill Registry.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-slate-400">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">1. Acceptance of Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing or using StackMatrices ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services. The Service includes our 
              OpenClaw Skill Registry, all associated skills, and related functionality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">2. Description of Service</h2>
            <p className="text-slate-300 leading-relaxed">
              StackMatrices provides a Skill Registry for the OpenClaw ecosystem. Our services include:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside mt-3">
              <li>Pre-built intelligence skills for OpenClaw agents</li>
              <li>License key management and distribution</li>
              <li>API access for skill deployment</li>
              <li>Documentation and support services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">3. Account Registration</h2>
            <div className="space-y-3 text-slate-300">
              <p>To purchase skills, you must create an account. You agree to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not share your License Keys with third parties</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">4. License and Usage</h2>
            <div className="space-y-3 text-slate-300">
              <p><strong className="text-white">Grant of License:</strong> Upon purchase, you receive a non-exclusive, 
              non-transferable license to use the purchased skill(s) according to the terms specified at purchase.</p>
              
              <p><strong className="text-white">Permitted Uses:</strong></p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Deploy skills within your own OpenClaw agents</li>
                <li>Use skills for your own business operations</li>
                <li>Modify configuration parameters as documented</li>
              </ul>
              
              <p><strong className="text-white">Prohibited Uses:</strong></p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Reselling or redistributing License Keys</li>
                <li>Reverse engineering our skills</li>
                <li>Using skills for illegal activities</li>
                <li>Exceeding API rate limits or circumventing usage restrictions</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">5. Payments and Refunds</h2>
            <div className="space-y-3 text-slate-300">
              <p><strong className="text-white">Pricing:</strong> All prices are listed in USD and are subject to change. 
              Current pricing is available on our Skills page.</p>
              
              <p><strong className="text-white">Payment Methods:</strong> We accept Alipay and WeChat Pay. Payment verification 
              requires uploading a screenshot of your transaction.</p>
              
              <p><strong className="text-white">Refund Policy:</strong> Due to the digital nature of our services,{" "}
              <span className="text-red-400 font-semibold">all sales are final and no refunds will be issued</span>. 
              We recommend testing with lower-priced skills before making larger purchases.</p>
              
              <p><strong className="text-white">License Delivery:</strong> License Keys are delivered to your dashboard after 
              payment verification, typically within 24 hours.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">6. Service Availability</h2>
            <p className="text-slate-300 leading-relaxed">
              We strive for 99.9% uptime but do not guarantee uninterrupted service. Skills depend on 
              third-party APIs (Amazon, Shopify, Apify, etc.) which may experience downtime beyond our control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">7. Intellectual Property</h2>
            <p className="text-slate-300 leading-relaxed">
              All skills, code, documentation, and branding are the intellectual property of StackMatrices. 
              Your purchase grants you a license to use the service, not ownership of the underlying technology.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">8. Termination</h2>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to terminate or suspend your account for violations of these terms, 
              including but not limited to: sharing License Keys, reverse engineering, or using skills 
              for illegal purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">9. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed">
              StackMatrices shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use the service. Our total 
              liability shall not exceed the amount you paid for the specific skill in question.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">10. Changes to Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update these terms from time to time. Continued use of the service after changes 
              constitutes acceptance of the new terms. We will notify users of significant changes via email.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">11. Contact Information</h2>
            <p className="text-slate-300 leading-relaxed">
              For questions about these terms, contact us at:{" "}
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
