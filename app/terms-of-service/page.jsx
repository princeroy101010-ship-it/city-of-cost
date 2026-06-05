export const metadata = {
  title: "Terms of Service Worldlivingcost",
  description:
    "Read Worldlivingcost's Terms of Service. Understand the rules, data usage guidelines, intellectual property rights, API access terms, and legal disclaimer governing your use of Worldlivingcost.world.",
  keywords: [
    "Worldlivingcost terms of service",
    "Worldlivingcost terms",
    "Worldlivingcost user agreement",
    "Worldlivingcost legal terms",
    "cost of living data usage policy",
    "Worldlivingcost data license",
    "Worldlivingcost API terms",
    "Worldlivingcost contributor terms",
    "Worldlivingcost disclaimer",
    "Worldlivingcost intellectual property",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/terms",
  },
  openGraph: {
    type: "article",
    url: "https://worldlivingcost.com/terms",
    title: "Terms of Service Worldlivingcost",
    description:
      "Read Worldlivingcost's Terms of Service covering data usage, contributor guidelines, intellectual property, API access, and legal disclaimers for Worldlivingcost.world.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost Terms of Service Worldlivingcost.world",
      },
    ],
    article: {
      modifiedTime: "2025-01-15T00:00:00.000Z",
      authors: ["https://worldlivingcost.com"],
    },
  },
  twitter: {
    card: "summary",
    title: "Terms of Service Worldlivingcost",
    description:
      "Read Worldlivingcost Terms of Service covering data usage, contributor guidelines, API access, and legal disclaimers.",
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
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Worldlivingcost (Worldlivingcost.world), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.",
  },
  {
    title: "2. Description of Service",
    content:
      "Worldlivingcost provides a platform for accessing, comparing, and contributing cost of living data for cities worldwide. Our data is compiled from contributor submissions, government statistical agencies, and trusted institutional sources. The service is provided 'as is' and we make no guarantees about the completeness or accuracy of any data.",
  },
  {
    title: "3. Use of the Service",
    content:
      "You may use Worldlivingcost for personal, non-commercial purposes. You agree not to scrape, crawl, or systematically download our data; attempt to gain unauthorized access to our systems; use our service to transmit harmful or illegal content; impersonate any person or entity; or use the service in any way that violates applicable laws or regulations.",
  },
  {
    title: "4. Data Contributions",
    content:
      "When you submit price data or other information to Worldlivingcost, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display that data as part of our service. You warrant that your submissions are accurate to the best of your knowledge and do not violate any third-party rights. We reserve the right to reject or remove any submission at our discretion.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content on Worldlivingcost, including our indices, rankings, design, and software, is owned by Worldlivingcost or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written permission, except for limited personal use.",
  },
  {
    title: "6. API Access",
    content:
      "Access to our API is subject to separate API terms and rate limits. Unauthorized use of our API, including circumventing rate limits or accessing non-public endpoints, is strictly prohibited and may result in immediate termination of access and potential legal action.",
  },
  {
    title: "7. Disclaimer of Warranties",
    content:
      "Worldlivingcost is provided on an 'as is' and 'as available' basis without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or that the data will be accurate, complete, or current. Cost of living data is informational only and should not be the sole basis for financial or relocation decisions.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "To the fullest extent permitted by law, Worldlivingcost shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data, arising from your use of or inability to use the service, even if we have been advised of the possibility of such damages.",
  },
  {
    title: "9. Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of Germany, without regard to conflict of law principles. Any disputes arising from these terms or your use of Worldlivingcost shall be subject to the exclusive jurisdiction of the courts of Berlin, Germany.",
  },
  {
    title: "10. Contact",
    content:
      "For questions about these Terms of Service, please contact us at legal@Worldlivingcost.world or through our Contact page.",
  },
];

// WebPage JSON-LD — correct schema type for a legal/terms document
const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://worldlivingcost.com/terms",
  name: "Terms of Service Worldlivingcost",
  description:
    "Worldlivingcost's Terms of Service covering data usage policies, contributor guidelines, intellectual property rights, API access terms, disclaimer of warranties, and governing law.",
  url: "https://worldlivingcost.com/terms",
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
    email: "legal@Worldlivingcost.world",
  },
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
        name: "Terms of Service",
        item: "https://worldlivingcost.com/terms",
      },
    ],
  },
};

export default function TermsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Legal
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Terms of Service
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
          <div className="lg:col-span-3 space-y-4">
            {/* Notice */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                <path d="M10 2l8 14H2L10 2z" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 8v4M10 14v.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-slate-700 leading-relaxed">
                Please read these terms carefully before using Worldlivingcost. By using
                our service, you agree to be bound by these terms.
              </p>
            </div>

            {sections.map((section) => (
              <div
                key={section.title}
                id={section.title.replace(/\s+/g, "-").toLowerCase()}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <h2 className="font-display font-bold text-slate-900 mb-3 pb-3 border-b border-slate-100">
                  {section.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}