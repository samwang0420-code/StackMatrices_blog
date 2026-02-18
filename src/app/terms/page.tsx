// Terms of Service page
export const metadata = {
  title: 'Terms of Service | StackMatrices',
  description: 'Terms of Service for StackMatrices - SaaS comparison and review platform'
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Last updated: February 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
          <p className="mb-4">
            StackMatrices is a SaaS comparison and review platform that helps teams make informed 
            decisions about productivity tools. We use AI-powered analysis combined with real user 
            reviews from Reddit, G2, Hacker News, and other sources to provide unbiased comparisons.
          </p>
          <p>
            By accessing or using StackMatrices, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Affiliate Disclosure</h2>
          <p className="mb-4">
            StackMatrices participates in affiliate marketing programs. This means we may earn 
            commissions when you click on links or make purchases through our recommendations. 
            However, this does not influence our reviews or comparisons.
          </p>
          <p>
            Our content is based on:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Real user reviews and experiences</li>
            <li>Independent testing and analysis</li>
            <li>Objective feature comparisons</li>
            <li>Transparent TCO (Total Cost of Ownership) calculations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Content Accuracy</h2>
          <p className="mb-4">
            We strive to provide accurate and up-to-date information. However, SaaS products change 
            frequently, and we cannot guarantee that all information is current at all times. 
            Prices, features, and availability may change without notice.
          </p>
          <p>
            Always verify critical information directly with the service provider before making 
            purchasing decisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
          <p>When using StackMatrices, you agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use automated systems to scrape or copy our content</li>
            <li>Attempt to manipulate reviews or ratings</li>
            <li>Use our platform for illegal purposes</li>
            <li>Impersonate other users or organizations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="mb-4">
            All content on StackMatrices, including text, graphics, logos, and software, is owned 
            by StackMatrices or its content suppliers and is protected by copyright and other 
            intellectual property laws.
          </p>
          <p>
            You may share our content with proper attribution, but you may not reproduce, 
            distribute, or create derivative works without explicit permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            StackMatrices provides information for educational and comparison purposes only. 
            We are not responsible for any decisions you make based on our content, including 
            software purchases or business decisions.
          </p>
          <p>
            To the maximum extent permitted by law, StackMatrices shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Changes will be posted on 
            this page with an updated revision date. Continued use of the platform after changes 
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at:{' '}
            <a href="mailto:legal@stackmatrices.com" className="text-blue-600 hover:underline">
              legal@stackmatrices.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
