import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | StackMatrices",
  description: "StackMatrices Terms of Service - GEO optimization services for medical practices.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using StackMatrices ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services. The Service includes our 
              GEO optimization services, AI visibility audits, and related consulting for medical practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">2. Description of Service</h2>
            <p className="text-gray-300 leading-relaxed">
              StackMatrices is a specialized GEO (Generative Engine Optimization) agency for high-value medical practices. 
              Our services include:
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside mt-3">
              <li>AI visibility audits and assessment</li>
              <li>GEO strategy development and implementation</li>
              <li>Schema markup and technical optimization</li>
              <li>Content strategy for AI search engines</li>
              <li>Ongoing monitoring and reporting</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">3. Client Obligations</h2>
            <div className="space-y-3 text-gray-300">
              <p>As a client, you agree to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide accurate and complete information about your practice</li>
                <li>Grant necessary access to website and analytics platforms</li>
                <li>Respond to requests for approval or feedback in a timely manner</li>
                <li>Maintain confidentiality of any proprietary strategies provided</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">4. Service Delivery</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Timeline:</strong> Project timelines are estimates based on typical implementations. 
              Actual timelines may vary depending on client responsiveness and complexity.</p>
              
              <p><strong className="text-white">Deliverables:</strong> All deliverables will be provided as specified in the project agreement. 
              Changes to scope may require additional fees.</p>
              
              <p><strong className="text-white">Results:</strong> While we use proven methodologies, we cannot guarantee specific rankings, 
              traffic levels, or patient acquisition numbers. Results vary based on competition, market conditions, and other factors.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">5. Payments and Refunds</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Pricing:</strong> All project fees are specified in the project proposal and are due as follows: 
              50% upfront to begin work, 50% upon completion or as otherwise agreed.</p>
              
              <p><strong className="text-white">Payment Methods:</strong> We accept bank transfer and major credit cards.</p>
              
              <p><strong className="text-white">Refund Policy:</strong> Due to the professional nature of our services,{" "}
              <span className="text-danger font-semibold">refunds are not provided once work has commenced</span>. 
              We encourage thorough discussion during the consultation phase before committing to a project.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">6. Intellectual Property</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Our IP:</strong> All methodologies, frameworks, and proprietary tools remain the property of StackMatrices.</p>
              
              <p><strong className="text-white">Your IP:</strong> You retain ownership of your brand, content, and any pre-existing materials. 
              Improvements and optimizations we make become your property upon full payment.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">7. Confidentiality</h2>
            <p className="text-gray-300 leading-relaxed">
              We maintain strict confidentiality regarding your practice information, patient data, and business strategies. 
              All team members are bound by confidentiality agreements. We do not share client information with third parties 
              without explicit consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">8. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              StackMatrices shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use the service. Our total 
              liability shall not exceed the total amount paid for the specific project.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">9. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              Either party may terminate the agreement with 30 days written notice. Upon termination, 
              all completed work will be delivered to the client. Outstanding payments for completed 
              work remain due.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">10. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these terms from time to time. Continued use of the service after changes 
              constitutes acceptance of the new terms. We will notify clients of significant changes via email.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">11. Contact Information</h2>
            <p className="text-gray-300 leading-relaxed">
              For questions about these terms, contact us at:{" "}
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
