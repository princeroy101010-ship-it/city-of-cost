export const metadata = {
  title: "Privacy Policy Worldlivingcost",
  description:
    "Read Worldlivingcost's Privacy Policy. Learn how we collect, use, store, and protect your personal data. Covers cookies, analytics, GDPR rights, data sharing practices, and how to contact us about your data.",
  keywords: [
    "World living cost privacy policy",
    "World living cost privacy",
    "World living cost data protection",
    "World living cost GDPR",
    "World living cost cookie policy",
    "World living cost personal data",
    "World living cost data collection",
    "World living cost analytics data",
    "cost of living data privacy",
    "World living cost user data rights",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/privacy",
  },
  openGraph: {
    type: "article",
    url: "https://worldlivingcost.com/privacy",
    title: "Privacy Policy Worldlivingcost",
    description:
      "Read Worldlivingcost Privacy Policy. Covers data collection, cookie usage, analytics, GDPR rights, data sharing, and security practices for Worldlivingcost.world users.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost Privacy Policy Worldlivingcost",
      },
    ],
    article: {
      modifiedTime: "2025-01-15T00:00:00.000Z",
      authors: ["https://worldlivingcost.com"],
    },
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy Worldlivingcost",
    description:
      "Read Worldlivingcost's Privacy Policy covering data collection, cookie usage, GDPR rights, and how we protect your personal information.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
};

const lastUpdated = "January 15, 2025";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information you provide",
        text: "When you use Worldlivingcost, you may provide us with information such as your email address (if you subscribe to updates or create an account), price submissions you contribute to our database, and messages you send via our contact form.",
      },
      {
        subtitle: "Information collected automatically",
        text: "We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the date and time of your visit. This data is used to improve our service and is not linked to any personally identifiable information.",
      },
      {
        subtitle: "Cookies",
        text: "We use essential cookies to maintain basic functionality and analytics cookies (with your consent) to understand how visitors interact with our website. You can control cookie preferences through your browser settings.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "Service operation",
        text: "We use your information to provide, maintain, and improve Worldlivingcost, to process your data contributions, and to respond to your inquiries.",
      },
      {
        subtitle: "Analytics",
        text: "We analyze aggregated, anonymized usage data to understand which features are most useful, identify errors, and improve the overall experience.",
      },
      {
        subtitle: "Communications",
        text: "If you subscribe to our newsletter or create an account, we may send you updates about new features and data. You can unsubscribe at any time.",
      },
    ],
  },
  {
    title: "3. Data Sharing",
    content: [
      {
        subtitle: "We do not sell your data",
        text: "We will never sell, rent, or trade your personal information to third parties for marketing purposes.",
      },
      {
        subtitle: "Service providers",
        text: "We may share data with trusted third-party service providers (such as hosting and analytics providers) who assist us in operating our website, subject to strict confidentiality obligations.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose your information if required by law or if we believe that such disclosure is necessary to protect our rights or comply with a judicial proceeding, court order, or legal process.",
      },
    ],
  },
  {
    title: "4. Data Retention",
    content: [
      {
        subtitle: "Retention period",
        text: "We retain your personal information for as long as necessary to provide our services and comply with our legal obligations. If you request deletion of your account, we will delete your personal data within 30 days, except where retention is required by law.",
      },
    ],
  },
  {
    title: "5. Your Rights (GDPR)",
    content: [
      {
        subtitle: "Rights you have",
        text: "If you are located in the European Economic Area, you have the right to access, correct, or delete your personal data; the right to data portability; the right to object to processing; and the right to withdraw consent at any time. To exercise these rights, contact us at privacy@Worldlivingcost.world.",
      },
    ],
  },
  {
    title: "6. Security",
    content: [
      {
        subtitle: "How we protect your data",
        text: "We implement industry-standard security measures including TLS encryption for data in transit, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    title: "7. Children's Privacy",
    content: [
      {
        subtitle: "Age restriction",
        text: "Worldlivingcost is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.",
      },
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      {
        subtitle: "Updates",
        text: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the 'Last Updated' date. Your continued use of Worldlivingcost after changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "9. Contact",
    content: [
      {
        subtitle: "Questions?",
        text: "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@Worldlivingcost.world or through our Contact page.",
      },
    ],
  },
];

// WebPage JSON-LD — correct schema for a privacy/legal document page
const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://worldlivingcost.com/privacy",
  name: "Privacy Policy Worldlivingcost",
  description:
    "Worldlivingcost's Privacy Policy covering personal data collection, cookie usage, analytics, GDPR user rights, data sharing practices, security measures, and contact information for privacy inquiries.",
  url: "https://worldlivingcost.com/privacy",
  dateModified: "2025-01-15",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
  },
  about: {
    "@type": "Organization",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
    email: "privacy@Worldlivingcost.world",
    description:
      "Worldlivingcost is committed to protecting user privacy and complying with GDPR and applicable data protection regulations.",
  },
  mentions: [
    {
      "@type": "Thing",
      name: "General Data Protection Regulation (GDPR)",
      description:
        "Worldlivingcost complies with GDPR, providing EEA users rights to access, correct, delete, and port their personal data.",
    },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://worldlivingcost.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: "https://worldlivingcost.com/privacy",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Legal
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-500">
              Last updated:{" "}
              <span className="font-medium text-slate-700">{lastUpdated}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar TOC */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-24">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Contents
              </p>
              <nav className="space-y-1.5">
                {sections.map((s) => (
                  <a
                    key={s.title}
                    href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
                    className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-0.5"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Intro */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <p className="text-sm text-slate-700 leading-relaxed">
                At Worldlivingcost, we take your privacy seriously. This policy explains
                what information we collect, how we use it, and your rights regarding
                your data. We follow GDPR guidelines and are committed to being
                transparent about our data practices.
              </p>
            </div>

            {/* Sections */}
            {sections.map((section) => (
              <div
                key={section.title}
                id={section.title.replace(/\s+/g, "-").toLowerCase()}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <h2 className="font-display font-bold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((item) => (
                    <div key={item.subtitle}>
                      <h3 className="font-semibold text-sm text-slate-800 mb-1.5">
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}