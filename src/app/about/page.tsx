// About Us page
export const metadata = {
  title: 'About Us | StackMatrices',
  description: 'Learn about StackMatrices - The AI-powered SaaS comparison platform built for teams who ship'
};

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About StackMatrices</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4 text-lg leading-relaxed">
            StackMatrices was built on a simple realization: most teams are overpaying for software 
            that doesn't actually help them ship work. We've spent thousands of dollars and countless 
            hours testing tools that promised productivity but delivered only complexity.
          </p>
          <p className="text-lg leading-relaxed">
            Our mission is to cut through the marketing noise and give teams the real data they need 
            to make informed decisions about their tech stack.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          
          <p className="mb-6">
            StackMatrices is an AI-powered SaaS comparison platform that combines:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🔍 Multi-Source Reviews</h3>
              <p className="text-gray-700">
                We aggregate real user experiences from Reddit, G2, Hacker News, and Quora 
                to give you the unfiltered truth about each tool.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">📊 Data-Driven Analysis</h3>
              <p className="text-gray-700">
                8-axis battlecards, TCO calculations, and ROI projections—no fluff, just 
                numbers that matter for your decision.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">✍️ Honest Reviews</h3>
              <p className="text-gray-700">
                Every comparison is written by AI trained on thousands of real reviews, 
                with full disclosure of affiliate relationships.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
          
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Data Collection:</strong> We pull pricing, features, and real user 
              reviews from multiple sources to build a comprehensive picture.
            </li>
            <li>
              <strong>Analysis:</strong> Our AI engine processes this data to identify 
              patterns, pain points, and hidden costs that most reviews miss.
            </li>
            <li>
              <strong>Content Generation:</strong> We create detailed comparisons with 
              8-axis battlecards, TCO breakdowns, and ROI projections.
            </li>
            <li>
              <strong>Human Review:</strong> Every piece of content is reviewed to ensure 
              accuracy and honesty before publication.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Affiliate Disclosure</h2>
          
          <p className="mb-4">
            StackMatrices participates in affiliate marketing programs. When you click on 
            links to products we recommend and make a purchase, we may earn a commission. 
            This comes at no additional cost to you.
          </p>
          
          <p className="mb-4">
            However, this does not influence our reviews or comparisons. Our AI and editorial 
            team evaluate products based on:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Actual feature comparisons</li>
            <li>Real user experiences and pain points</li>
            <li>Total cost of ownership analysis</li>
            <li>Workflow impact for different team sizes</li>
          </ul>
          
          <p>
            We only recommend products we've analyzed extensively and believe provide genuine value.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          
          <p className="mb-4">
            StackMatrices started as a side project born out of frustration. Our founder 
            spent $5,000 over two years on a project management tool that promised to 
            "revolutionize team productivity" but actually made things slower. The kicker? 
            The real cost was closer to $12,000 when you factored in hidden fees, training, 
            and time wasted on workarounds.
          </p>
          
          <p className="mb-4">
            We built StackMatrices to solve this problem: give teams the real data they need 
            to choose tools that actually help them ship work, not just argue about it.
          </p>
          
          <p>
            Today, StackMatrices processes reviews from thousands of real users and helps 
            teams make informed decisions about their tech stack—saving time, money, and 
            frustration in the process.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          
          <p className="mb-4">
            Have questions, suggestions, or want to partner with us? We'd love to hear from you.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@stackmatrices.com" className="text-blue-600 hover:underline">
                hello@stackmatrices.com
              </a>
            </p>
            <p>
              <strong>Twitter/X:</strong> @StackMatrices
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
