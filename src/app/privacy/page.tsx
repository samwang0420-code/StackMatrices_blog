import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | StackMatrices",
  description: "StackMatrices privacy policy - how we handle your data when you use our GEO optimization services.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              StackMatrices ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, and safeguard your information when you use our GEO optimization 
              services for medical practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">2. Information We Collect</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Practice Information:</strong> Practice name, website URL, 
              location, services offered, and contact details.</p>
              
              <p><strong className="text-white">Website Data:</strong> Access credentials for website platforms 
              (WordPress, hosting, etc.) to implement technical optimizations.</p>
              
              <p><strong className="text-white">Analytics Data:</strong> Google Analytics, Search Console, and other 
              performance data to assess current visibility and track improvements.</p>
              
              <p><strong className="text-white">Communication Records:</strong> Emails, meeting notes, and 
              other correspondence related to your project.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Deliver GEO optimization services as outlined in our agreement</li>
              <li>Implement technical changes to your website and online presence</li>
              <li>Monitor and report on AI visibility improvements</li>
              <li>Communicate project updates and request necessary approvals</li>
              <li>Maintain accurate records for billing and accounting</li>
              <li>Improve our services based on anonymized aggregate data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">4. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside mt-3">
              <li>Encrypted storage for all credentials and sensitive data</li>
              <li>Access limited to authorized team members only</li>
              <li>Regular security audits and updates</li>
              <li>Secure communication channels for all client interactions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">5. Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the following third-party services to deliver our services:
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside mt-3">
              <li><strong className="text-white">Supabase:</strong> For secure data storage and project management</li>
              <li><strong className="text-white">Vercel:</strong> For hosting and deployment</li>
              <li><strong className="text-white">Google Analytics:</strong> For website performance analysis</li>
            </ul>
            <p className="text-gray-300 mt-3">
              These services have their own privacy policies and security measures.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">6. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your information for the duration of our working relationship and for a reasonable 
              period thereafter (typically 2 years) for legal and business purposes. You may request deletion 
              of your data at any time after project completion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">7. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">You have the right to:</p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside mt-3">
              <li>Access the personal information we hold about you</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">8. HIPAA and Healthcare Compliance</h2>
            <p className="text-gray-300 leading-relaxed">
              While we work with medical practices, we do not handle Protected Health Information (PHI) as 
              defined by HIPAA. Our services focus on public-facing marketing and visibility optimization. 
              We maintain appropriate safeguards for all client data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">9. Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any significant 
              changes via email. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">10. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              For privacy-related questions or requests, contact us at:{" "}
              <a href="mailto:sam.wang01@icloud.com" className="text-primary hover:underline">
                sam.wang01@icloud.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
