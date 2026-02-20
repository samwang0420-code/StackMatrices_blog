'use client';

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Question {
  id: number;
  question: string;
  explanation: string;
}

interface Category {
  name: string;
  questions: Question[];
}

interface RedFlag {
  flag: string;
  why: string;
}

const checklistData: Category[] = [
  {
    name: '💰 Pricing',
    questions: [
      {
        id: 1,
        question: 'Is the pricing based on users, usage, or features?',
        explanation: 'Understanding the pricing model helps you predict costs as you scale. Per-user pricing can become expensive quickly, while usage-based might be unpredictable.'
      },
      {
        id: 2,
        question: 'Are there any hidden fees (setup, implementation, overages)?',
        explanation: 'Many SaaS vendors charge additional fees for implementation, training, data migration, or going over usage limits. Clarify all costs upfront.'
      },
      {
        id: 3,
        question: 'What\'s the total cost of ownership for 3 years?',
        explanation: 'Look beyond the first-year price. Calculate costs including integrations, add-ons, potential upgrades, and maintenance over a 3-year period.'
      },
      {
        id: 4,
        question: 'Is there a discount for annual payment or multi-year commitment?',
        explanation: 'Annual payments often offer 15-20% savings. However, only commit annually if you\'re confident in the product after thorough testing.'
      },
      {
        id: 5,
        question: 'How does pricing scale as our team/usage grows?',
        explanation: 'Request a pricing chart for different tiers. Ensure the jump between tiers is reasonable and won\'t create budget shock as you grow.'
      }
    ]
  },
  {
    name: '🔒 Security',
    questions: [
      {
        id: 6,
        question: 'What security certifications do you have (SOC 2, ISO 27001, GDPR)?',
        explanation: 'Certifications demonstrate that the vendor follows industry-standard security practices. They\'re often required for compliance in regulated industries.'
      },
      {
        id: 7,
        question: 'Where is data stored and is it encrypted at rest and in transit?',
        explanation: 'Data residency may be required for compliance (GDPR, data sovereignty). Encryption protects your data from unauthorized access.'
      },
      {
        id: 8,
        question: 'What\'s your data backup and disaster recovery plan?',
        explanation: 'Ensure the vendor has robust backup procedures, regular testing, and defined RTO/RPO (Recovery Time/Point Objectives) for business continuity.'
      },
      {
        id: 9,
        question: 'Can we conduct a security assessment or penetration test?',
        explanation: 'For critical systems, you may need to verify security independently. Check if the vendor allows security audits or provides audit reports.'
      }
    ]
  },
  {
    name: '🔌 Integration',
    questions: [
      {
        id: 10,
        question: 'What native integrations are available with our existing tools?',
        explanation: 'Native integrations save development time and maintenance costs. Check if they integrate with your CRM, ERP, identity provider, and other critical tools.'
      },
      {
        id: 11,
        question: 'Is there a well-documented API for custom integrations?',
        explanation: 'Even with native integrations, you\'ll likely need custom connections. A mature API with good documentation is essential for flexibility.'
      },
      {
        id: 12,
        question: 'Can data be easily imported from and exported to our current systems?',
        explanation: 'Data portability prevents vendor lock-in. Verify the formats supported and whether the vendor assists with data migration.'
      },
      {
        id: 13,
        question: 'Do you support SSO (Single Sign-On) with SAML/OAuth?',
        explanation: 'SSO improves security and user experience by allowing employees to use their existing corporate credentials instead of separate passwords.'
      }
    ]
  },
  {
    name: '🎧 Support',
    questions: [
      {
        id: 14,
        question: 'What are the support hours and response time SLAs?',
        explanation: '24/7 support is crucial for mission-critical systems. Understand response times for different severity levels and whether phone support is available.'
      },
      {
        id: 15,
        question: 'Is there a dedicated account manager or customer success manager?',
        explanation: 'A dedicated contact ensures someone understands your business context and can escalate issues effectively. This is typically included in enterprise plans.'
      },
      {
        id: 16,
        question: 'What\'s the average resolution time for critical issues?',
        explanation: 'Response time is different from resolution time. Ask for metrics on how quickly they actually resolve critical problems, not just acknowledge them.'
      },
      {
        id: 17,
        question: 'Is there comprehensive documentation, training, and a user community?',
        explanation: 'Self-service resources reduce dependency on support. Check for video tutorials, knowledge bases, forums, and regular training webinars.'
      }
    ]
  },
  {
    name: '🚪 Exit Strategy',
    questions: [
      {
        id: 18,
        question: 'What happens to our data if we cancel or don\'t renew?',
        explanation: 'Understand data retention policies post-cancellation. How long do they keep your data? In what format can you retrieve it? Is there an export fee?'
      },
      {
        id: 19,
        question: 'Is there a data portability clause in the contract?',
        explanation: 'Ensure the contract guarantees your right to extract data in a standard format. This prevents vendor lock-in and ensures business continuity.'
      },
      {
        id: 20,
        question: 'What\'s the notice period for cancellation and are there any termination fees?',
        explanation: 'Check for auto-renewal clauses and required notice periods. Some vendors charge early termination fees that can be substantial.'
      }
    ]
  }
];

const redFlags: RedFlag[] = [
  { flag: 'Auto-renewal without notice', why: 'You may be locked into another term without realizing it. Look for 30-60 day notice requirements.' },
  { flag: 'No data portability guarantee', why: 'You could lose access to your data or face expensive extraction fees when switching vendors.' },
  { flag: 'Unlimited liability waiver for vendor', why: 'The vendor takes no responsibility for damages caused by their service failures.' },
  { flag: 'No SLA or penalty for downtime', why: 'Vendor has no incentive to maintain high availability. Your business bears all the risk.' },
  { flag: 'Price increase caps not defined', why: 'Vendor could dramatically increase prices at renewal, forcing you to pay or face expensive migration.' },
  { flag: 'No clear data deletion protocol', why: 'Your data may remain on their servers indefinitely after cancellation, creating security risks.' },
  { flag: 'Proprietary data formats only', why: 'Makes it difficult or impossible to migrate to competing solutions without data loss.' },
  { flag: 'Governing law in unfavorable jurisdiction', why: 'Disputes may need to be resolved in the vendor\'s home state/country, increasing your legal costs.' }
];

const BuyingChecklist: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const element = pdfRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      let heightLeft = imgHeight * ratio;
      let position = 0;
      let pageCount = 0;
      
      while (heightLeft > 0) {
        if (pageCount > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData,
          'PNG',
          0,
          position,
          pdfWidth,
          imgHeight * ratio
        );
        
        heightLeft -= pdfHeight;
        position -= pdfHeight;
        pageCount++;
      }
      
      pdf.save('SaaS-Buying-Checklist.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* UI Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-3">🛒 SaaS Buying Checklist</h1>
        <p className="text-blue-100 text-lg mb-6">
          20 essential questions to ask before purchasing any SaaS product
        </p>
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Checklist
            </>
          )}
        </button>
      </div>

      {/* Interactive Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
        <div className="space-y-6">
          {checklistData.map((category, idx) => (
            <div key={category.name} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
              <ul className="space-y-2">
                {category.questions.map((q) => (
                  <li key={q.id} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{q.question}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden PDF Content */}
      <div ref={pdfRef} className="absolute -left-[9999px] bg-white" style={{ width: '210mm' }}>
        <div className="p-8">
          {/* Title Page */}
          <div className="text-center py-12 border-b-4 border-blue-600 mb-8">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SaaS Buying Checklist</h1>
            <p className="text-xl text-gray-600">20 Essential Questions Before You Buy</p>
            <p className="text-sm text-gray-400 mt-8">Generated with ❤️ | {new Date().toLocaleDateString()}</p>
          </div>

          {/* Questions by Category */}
          {checklistData.map((category) => (
            <div key={category.name} className="mb-8 page-break-inside-avoid">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">
                {category.name}
              </h2>
              <div className="space-y-4">
                {category.questions.map((q) => (
                  <div key={q.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex gap-3 mb-2">
                      <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {q.id}
                      </span>
                      <h3 className="font-semibold text-gray-800">{q.question}</h3>
                    </div>
                    <p className="text-gray-600 text-sm ml-10">{q.explanation}</p>
                    <div className="mt-3 ml-10 flex gap-4 text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-gray-500">Asked</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-gray-500">Satisfied</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contract Red Flags Page */}
          <div className="mt-12 pt-8 border-t-4 border-red-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🚩</span>
              <h2 className="text-2xl font-bold text-red-700">Contract Red Flags Checklist</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Watch out for these dangerous clauses in your SaaS contract. Each could cost your company significantly.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {redFlags.map((item, idx) => (
                <div key={idx} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-800">{item.flag}</h4>
                      <p className="text-red-600 text-sm mt-1">{item.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 Notes</h3>
            <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[200px]">
              <p className="text-gray-400 text-sm">Use this space to jot down vendor responses and your thoughts...</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-400">
            <p>SaaS Buying Checklist • Use this for every software purchase decision</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyingChecklist;
