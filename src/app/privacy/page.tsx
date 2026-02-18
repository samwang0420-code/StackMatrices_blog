// Privacy Policy page
export const metadata = {
  title: 'Privacy Policy | StackMatrices',
  description: 'Privacy Policy for StackMatrices - How we collect, use, and protect your data'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Last updated: February 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            StackMatrices is committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you visit our 
            website and use our SaaS comparison platform.
          </p>
          <p>
            By using StackMatrices, you consent to the data practices described in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-medium mb-2 mt-4">2.1 Automatically Collected Information</h3>
          <p className="mb-4">
            When you visit StackMatrices, we may automatically collect certain information about 
            your device and usage, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address and browser type</li>
            <li>Pages viewed and time spent on site</li>
            <li>Referring website and search terms</li>
            <li>Device information (screen resolution, OS)</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-4">2.2 Cookies and Tracking</h3>
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience, 
            analyze site traffic, and understand user preferences. You can control cookies through 
            your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and improve our SaaS comparison services</li>
            <li>Analyze usage patterns and optimize site performance</li>
            <li>Personalize content and recommendations</li>
            <li>Communicate updates and respond to inquiries</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Affiliate Links and Third Parties</h2>
          <p className="mb-4">
            StackMatrices uses affiliate links to SaaS products. When you click these links, 
            third-party services may set cookies or track your activity. These third parties 
            have their own privacy policies:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Affiliate networks (for commission tracking)</li>
            <li>Analytics providers (Google Analytics, etc.)</li>
            <li>SaaS vendors (when you visit their sites)</li>
          </ul>
          <p>
            We recommend reviewing the privacy policies of any third-party sites you visit 
            through our links.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your 
            information against unauthorized access, alteration, disclosure, or destruction. 
            However, no internet transmission is completely secure, and we cannot guarantee 
            absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of certain data collection practices</li>
          </ul>
          <p>
            To exercise these rights, contact us at{' '}
            <a href="mailto:privacy@stackmatrices.com" className="text-blue-600 hover:underline">
              privacy@stackmatrices.com
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p>
            StackMatrices is not intended for use by children under 13. We do not knowingly 
            collect personal information from children under 13. If you believe we have 
            collected such information, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on this 
            page with an updated revision date. We encourage you to review this policy regularly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please 
            contact us at:{' '}
            <a href="mailto:privacy@stackmatrices.com" className="text-blue-600 hover:underline">
              privacy@stackmatrices.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
