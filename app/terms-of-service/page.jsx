import Link from "next/link";
import Script from "next/script";

// FIX #6: bump this whenever the terms actually change, not automatically —
// legal pages should reflect a real review date, not a live render date.
const LAST_UPDATED_DATE = "2026-07-01";
const LAST_UPDATED_DISPLAY = "July 1, 2026";
// FIX #3: original publish date of this document (kept separate from the
// "last updated" date so both can be surfaced correctly in schema).
const FIRST_PUBLISHED_DATE = "2025-01-15";

const PAGE_DESCRIPTION =
"Read Worldlivingcost's Terms of Service covering website usage, intellectual property, API access, user responsibilities, and legal policies."

export const metadata = {
  title: "Terms of Service | Legal Policies & User Agreement",
  description: PAGE_DESCRIPTION,
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
    "is Worldlivingcost free",
    "can I use Worldlivingcost data",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/terms",
  },
  openGraph: {
    // FIX #9: legal/reference pages read better as "website" than "article".
    type: "website",
    url: "https://worldlivingcost.com/terms",
    title: "Terms of Service | Worldlivingcost",
      modifiedTime: LAST_UPDATED_DATE,

    description:
      "Read Worldlivingcost's Terms of Service covering data usage, contributor guidelines, intellectual property, API access, and legal disclaimers for Worldlivingcost.com.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Worldlivingcost",
    description:
      "Read Worldlivingcost's Terms of Service covering data usage, contributor guidelines, API access, and legal disclaimers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    // FIX #10: brought in line with the advanced directives already used on
    // the rankings/country pages instead of the shorter max-snippet-only set.
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
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Worldlivingcost (worldlivingcost.com), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.",
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
      "For questions about these Terms of Service, please contact us at legal@worldlivingcost.com or through our Contact page.",
  },
];

// FIX #5: FAQ content targeting the highest-intent legal/trust queries for
// this page — visible FAQ items are mirrored 1:1 into FAQPage JSON-LD below.
const faqItems = [
  {
    q: "Is Worldlivingcost free to use?",
    a: "Yes. Browsing cost of living data, city rankings, and country pages on Worldlivingcost is free. Separate terms and rate limits apply to API access — see Section 6 above.",
  },
  {
    q: "Can I reuse Worldlivingcost's data or rankings?",
    a: "Limited personal use is permitted, but you may not reproduce, redistribute, or create derivative works from our indices, rankings, or content without prior written permission. See Section 5 (Intellectual Property) above.",
  },
  {
    q: "Can I scrape or crawl Worldlivingcost?",
    a: "No. Systematic scraping, crawling, or automated downloading of our data is not permitted under these Terms. See Section 3 (Use of the Service) above.",
  },
  {
    q: "Who owns the content and rankings on Worldlivingcost?",
    a: "All indices, rankings, design, and software on Worldlivingcost are owned by Worldlivingcost or its licensors and are protected by intellectual property laws. See Section 5 above.",
  },
  {
    q: "What happens to data I contribute to Worldlivingcost?",
    a: "By submitting price data or other information, you grant Worldlivingcost a non-exclusive, worldwide, royalty-free license to use, reproduce, and display that data as part of the service. See Section 4 (Data Contributions) above.",
  },
  {
    q: "Which law governs these Terms of Service?",
    a: "These Terms are governed by the laws of Germany, with disputes subject to the exclusive jurisdiction of the courts of Berlin, Germany. See Section 9 above.",
  },
];

// FIX #1: Organization referenced consistently via @id instead of an inline
// duplicate Organization object, so it consolidates with the single
// Organization entity defined in the root layout.
// FIX #2: all .world references replaced with the canonical .com domain.
// FIX #3: datePublished added alongside dateModified.
// FIX #4: speakable schema added, pointing at the .legal-summary section.
const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://worldlivingcost.com/terms",
  name: "Terms of Service | Worldlivingcost",
  description: PAGE_DESCRIPTION,
  "mainEntity": {
  "@type": "CreativeWork",
  "name": "Terms of Service"
},
"lastReviewed": "2026-07-01",
  url: "https://worldlivingcost.com/terms",
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
  about: {
    "@id": "https://worldlivingcost.com/#organization",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".legal-summary"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldlivingcost.com" },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://worldlivingcost.com/terms-of-service" },
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

export default function TermsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
              <span className="font-medium text-slate-700">{LAST_UPDATED_DISPLAY}</span>
            </p>

            {/* FIX #8: short search-intent / site-context section — helps AI
                systems and search engines understand what Worldlivingcost is
                even when they land directly on the terms page. Also the
                target for the speakable selector above. */}
            <div className="legal-summary mt-6 text-sm text-slate-600 leading-relaxed">
              <p>
                Worldlivingcost.com provides cost of living comparisons, city rankings, country cost
                indexes, affordability analysis, quality of life scores, rent comparisons, and
                relocation tools for users worldwide. These Terms of Service govern your use of
                worldlivingcost.com, including browsing city and country data, contributing price
                submissions, and accessing our API.
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
                <a
                  href="#faq"
                  className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-0.5"
                >
                  FAQ
                </a>
              </nav>

              {/* FIX #7: internal link hub — was previously almost absent. */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Related Pages
                </p>
                <Link href="/privacy-policy" className="block text-sm text-blue-600 hover:underline py-0.5">
                  Privacy Policy
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
              </div>
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

            {/* Visible FAQ section, mirrors faqJsonLd above */}
            <div id="faq" className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-display font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.q}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom internal link hub for users who read the full page */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-display font-bold text-slate-900 mb-3">Related Pages</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/privacy-policy" className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  Privacy Policy
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}