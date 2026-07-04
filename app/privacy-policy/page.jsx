import Link from "next/link";

// FIX #4: set to a real review date when the policy is actually revised —
// same rule as the Terms page, not a live new Date() render.
const LAST_UPDATED_DATE = "2026-07-01";
const LAST_UPDATED_DISPLAY = "July 1, 2026";
const FIRST_PUBLISHED_DATE = "2025-01-15";

// FIX #2 / #10: single source string used in both metadata and JSON-LD.
const PAGE_DESCRIPTION =
  "Read the Worldlivingcost Privacy Policy covering personal data, cookies, analytics, GDPR rights and information security practices."
export const metadata = {
  // FIX #9: title format aligned with the Terms page.
  title: "Privacy Policy & Data Protection",
  description: PAGE_DESCRIPTION,
  other: {
  "article:published_time": FIRST_PUBLISHED_DATE,
  "article:modified_time": LAST_UPDATED_DATE,
},
  keywords: [
    // FIX #10 (keywords cleanup): consistent "Worldlivingcost" branding,
    // no "World living cost" spacing variants.
    "Worldlivingcost privacy policy",
    "Worldlivingcost privacy",
    "Worldlivingcost data protection",
    "Worldlivingcost GDPR",
    "Worldlivingcost cookie policy",
    "Worldlivingcost personal data",
    "Worldlivingcost data collection",
    "Worldlivingcost analytics data",
    "cost of living data privacy",
    "Worldlivingcost user data rights",
    "is Worldlivingcost GDPR compliant",
    "does Worldlivingcost sell data",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/privacy",
  },
  openGraph: {
    // FIX #2: legal/reference page — "website", not "article".
    type: "website",
    url: "https://worldlivingcost.com/privacy",
    title: "Privacy Policy | Worldlivingcost",
    description:
      "Read Worldlivingcost's Privacy Policy. Covers data collection, cookie usage, analytics, GDPR rights, data sharing, and security practices for worldlivingcost.com users.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Worldlivingcost",
    description:
      "Read Worldlivingcost's Privacy Policy covering data collection, cookie usage, GDPR rights, and how we protect your personal information.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    // FIX #8 (robots): brought in line with the fuller directive set used
    // on Terms/Rankings/country pages.
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
        text: "If you are located in the European Economic Area, you have the right to access, correct, or delete your personal data; the right to data portability; the right to object to processing; and the right to withdraw consent at any time. To exercise these rights, contact us at privacy@worldlivingcost.com.",
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
        text: "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@worldlivingcost.com or through our Contact page.",
      },
    ],
  },
];

// FIX #5: FAQ content targeting the highest-intent privacy/trust queries —
// mirrored 1:1 between visible content and FAQPage JSON-LD below.
const faqItems = [
  {
    q: "Is Worldlivingcost GDPR compliant?",
    a: "Yes. Worldlivingcost complies with GDPR for users in the European Economic Area, providing rights to access, correct, delete, and port personal data. See Section 5 (Your Rights) above.",
  },
  {
    q: "Does Worldlivingcost sell personal data?",
    a: "No. We do not sell, rent, or trade your personal information to third parties for marketing purposes. See Section 3 (Data Sharing) above.",
  },
  {
    q: "What information does Worldlivingcost collect?",
    a: "We collect information you provide directly (such as your email address or price submissions), information collected automatically (such as IP address and pages viewed), and cookie data. See Section 1 (Information We Collect) above.",
  },
  {
    q: "How do I delete my data?",
    a: "You can request deletion of your account and personal data at any time. We delete personal data within 30 days of a valid request, except where retention is required by law. See Section 4 (Data Retention) above.",
  },
  {
    q: "Can I disable cookies?",
    a: "Yes. Essential cookies are required for basic site functionality, but analytics cookies are used only with your consent and can be controlled through your browser settings. See Section 1 (Cookies) above.",
  },
  {
    q: "Does Worldlivingcost use analytics?",
    a: "Yes. We analyze aggregated, anonymized usage data to understand which features are most useful and to improve the overall experience. See Section 2 (How We Use Your Information) above.",
  },
];

// FIX #3: Organization referenced via @id (consolidates with the single
// Organization entity defined once in the root layout) instead of an inline
// duplicate Organization object.
// FIX #1: all .world references replaced with the canonical .com domain.
// FIX #4: datePublished added alongside dateModified.
// FIX #7: speakable schema added, pointing at the .privacy-summary section.
const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://worldlivingcost.com/privacy",
  name: "Privacy Policy | Worldlivingcost",
  description: PAGE_DESCRIPTION,
  mainEntity: {
  "@id": "https://worldlivingcost.com/privacy-policy#policy"
},
mainEntity: {
  "@id": "https://worldlivingcost.com/privacy-policy#policy"
},
  url: "https://worldlivingcost.com/privacy",
  datePublished: FIRST_PUBLISHED_DATE,
  dateModified: LAST_UPDATED_DATE,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
  },
  publisher: {
    "@id": "https://worldlivingcost.com/#organization",
  },
 about: [
  {
    "@id":"https://worldlivingcost.com/#organization"
  },
  {
    "@type":"DefinedTerm",
    name:"General Data Protection Regulation",
    alternateName:"GDPR"
  }
],
  mentions: [
    {
      "@type": "Thing",
      name: "General Data Protection Regulation (GDPR)",
      description:
        "Worldlivingcost complies with GDPR, providing EEA users rights to access, correct, delete, and port their personal data.",
    },
  ],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".privacy-summary"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldlivingcost.com" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://worldlivingcost.com/privacy" },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Legal
            </div>
         <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">
  Worldlivingcost Privacy Policy
</h1>
            <p className="text-slate-500">
              Last updated:{" "}
              <span className="font-medium text-slate-700">{LAST_UPDATED_DISPLAY}</span>
            </p>

            {/* FIX #6: search-intent / site-context summary, also the target
                for the speakable selector above — same pattern as the Terms
                page's .legal-summary block. */}
            <div className="privacy-summary mt-6 text-sm text-slate-600 leading-relaxed">
              <p>
                Worldlivingcost provides cost of living comparisons, city rankings, country cost
                indexes, rent comparisons, affordability analysis, and relocation tools for users
                worldwide. This Privacy Policy explains how we collect, process, store, and
                protect user data while you use worldlivingcost.com.
              </p>
            </div>
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
                <a href="#faq" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-0.5">
                  FAQ
                </a>
              </nav>

              {/* FIX #6 (internal link hub) */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Related Pages
                </p>
                <Link href="/terms-of-service" className="block text-sm text-blue-600 hover:underline py-0.5">
                  Terms of Service
                </Link>
                <Link href="/contact" className="block text-sm text-blue-600 hover:underline py-0.5">
                  Contact Us
                </Link>
                <Link href="/about-us" className="block text-sm text-blue-600 hover:underline py-0.5">
                  About Worldlivingcost
                </Link>
                <Link href="/rankings" className="block text-sm text-blue-600 hover:underline py-0.5">
                  Cost of Living Rankings
                </Link>
                <Link href="/cost-of-living-calculator" className="block text-sm text-blue-600 hover:underline py-0.5">
                  Cost of Living Calculator
                </Link>
                <Link href="/country" className="block text-sm text-blue-600 hover:underline py-0.5">
                  Countries
                </Link>
              </div>
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

            {/* Visible FAQ section, mirrors faqJsonLd above */}
            <div id="faq" className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-display font-bold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-semibold text-sm text-slate-800 mb-1">{item.q}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom internal link hub */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-display font-bold text-slate-900 mb-3">Related Pages</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/terms-of-service" className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
                <Link href="/about-us" className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  About Worldlivingcost
                </Link>
                <Link href="/rankings" className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  Cost of Living Rankings
                </Link>
                <Link href="/cost-of-living-calculator" className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  Cost of Living Calculator
                </Link>
                <Link href="/country" className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  Countries
                </Link>
                <Link href="/terms-of-service">Terms of Service</Link>
                <Link href="/contact">Contact Page</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}