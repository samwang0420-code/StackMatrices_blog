import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Aesthetics Compliance Standards | StackMatrices',
  description: 'Comprehensive compliance guidelines for medical aesthetics practices. FDA regulations, state licensing requirements, and best practices.',
};

const COMPLIANCE_ARTICLES = [
  {
    category: "FDA Regulations",
    articles: [
      {
        title: "FDA-Approved Dermal Fillers: Complete List 2026",
        description: "Current FDA-approved dermal fillers including Juvederm, Restylane, Radiesse, and Belotero. Indications, approved uses, and safety profiles.",
        href: "/compliance/fda-approved-fillers"
      },
      {
        title: "Botox Safety: FDA Guidelines & Best Practices",
        description: "Official FDA guidelines for Botox cosmetic treatments. Dosing, contraindications, and safety protocols.",
        href: "/compliance/botox-safety"
      },
      {
        title: "Laser Device Regulations",
        description: "FDA classification and regulations for aesthetic laser devices. Requirements for IPL, CO2, and diode lasers.",
        href: "/compliance/laser-regulations"
      }
    ]
  },
  {
    category: "State Licensing",
    articles: [
      {
        title: "California Medical Spa Licensing Requirements",
        description: "Comprehensive guide to California Medical Board requirements for aesthetic practices. Physician supervision, delegation, and facility requirements.",
        href: "/compliance/ca-medical-spa"
      },
      {
        title: "Nurse Practitioner Scope of Practice",
        description: "State-by-state guide to NP authority in aesthetic medicine. Supervision requirements and prescriptive authority.",
        href: "/compliance/np-scope"
      }
    ]
  },
  {
    category: "HIPAA & Privacy",
    articles: [
      {
        title: "HIPAA Compliance for Aesthetic Practices",
        description: "Essential HIPAA requirements for medical spas. Patient data protection, consent forms, and security measures.",
        href: "/compliance/hipaa-aesthetics"
      },
      {
        title: "Before/After Photo Privacy Guidelines",
        description: "Proper protocols for patient photography. Consent, storage, and marketing use of patient images.",
        href: "/compliance/photo-privacy"
      }
    ]
  },
  {
    category: "Practice Standards",
    articles: [
      {
        title: "Informed Consent for Cosmetic Procedures",
        description: "Best practices for cosmetic procedure consent forms. Required disclosures, risks, and documentation.",
        href: "/compliance/informed-consent"
      },
      {
        title: "Emergency Protocols for Medical Spas",
        description: "Required emergency equipment, protocols, and staff training for aesthetic practices.",
        href: "/compliance/emergency-protocols"
      }
    ]
  }
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Authoritative Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Compliance & Standards</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive regulatory guidelines and compliance standards for medical aesthetics 
            and dental practices. Authoritative reference for practitioners and patients.
          </p>
        </div>

        {/* Categories */}
        {COMPLIANCE_ARTICLES.map((cat, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">
              {cat.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cat.articles.map((article, i) => (
                <a
                  key={i}
                  href={article.href}
                  className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-2 text-lg">{article.title}</h3>
                  <p className="text-gray-400 text-sm">{article.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400">
            <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal or medical advice. 
            Practices should consult with qualified legal and medical professionals for specific compliance requirements.
          </p>
        </div>

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Medical Aesthetics Compliance Standards",
              "description": "Regulatory guidelines for medical aesthetics practices",
              "url": "https://stackmatrices.com/compliance"
            })
          }}
        />
      </div>
    </div>
  );
}
