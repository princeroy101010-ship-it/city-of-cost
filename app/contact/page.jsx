// app/contact/page.jsx  ← SERVER COMPONENT (no client hooks are used, so metadata can live here directly)
import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "Contact Worldlivingcost | Support, API & Data Corrections",
  description:
    "Contact Worldlivingcost for support, data corrections, API access, partnerships, media inquiries and business licensing.",
  alternates: {
    canonical: "https://worldlivingcost.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/contact",
    title: "Contact Worldlivingcost | Support, Data Corrections & API Partnerships",
    description:
      "Contact Worldlivingcost for support, data corrections, API access, partnerships, media inquiries, and business licensing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Worldlivingcost",
      },
    ],
    twitter: {
 card: "summary_large_image",
 title:
   "Contact Worldlivingcost | Support, Data Corrections & API Partnerships",
 description:
   "Contact Worldlivingcost for support, data corrections, API access, partnerships, media inquiries, and business licensing.",
 images: ["/og-image.png"],
},
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const contactCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "General Inquiries",
    value: "hello@worldlivingcost.com",
    sub: "For general questions and feedback",
    href: "mailto:hello@worldlivingcost.com",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Data Corrections",
    value: "data@worldlivingcost.com",
    sub: "Report incorrect prices or indices",
    href: "mailto:data@worldlivingcost.com",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Partnerships & API",
    value: "api@worldlivingcost.com",
    sub: "Business, data licensing & API access",
    href: "mailto:api@worldlivingcost.com",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Press & Media",
    value: "press@worldlivingcost.com",
    sub: "Media kits, interviews, and press requests",
    href: "mailto:press@worldlivingcost.com",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Legal",
    value: "legal@worldlivingcost.com",
    sub: "Privacy, terms, and compliance",
    href: "mailto:legal@worldlivingcost.com",
  },
];

const quickLinks = [
  { label: "Browse FAQ", href: "/faq", desc: "Most questions answered here" },
  { label: "Our Methodology", href: "/methodology", desc: "How we calculate our indices" },
  { label: "About Us", href: "/about-us", desc: "Learn about our team and mission" },
];

// Bottom internal link hub — contact pages don't naturally accumulate
// inbound links, so this passes authority back into the key site sections.
const relatedLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about-us", label: "About Us" },
  { href: "/compare", label: "Compare Cities" },
  { href: "/rankings", label: "City Rankings" },
  { href: "/country", label: "Countries" },
  { href: "/cost-of-living-calculator", label: "calculator" },
  { href: "/terms-of-service", label: "term service" },
];

const officeInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C6.24 2 4 4.24 4 7c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="9" cy="7" r="1.5" stroke="#2563eb" strokeWidth="1.5" />
      </svg>
    ),
    label: "Headquarters",
    value: "Berlin, Germany",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M9 5v4l3 2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Response Time",
    value: "Within 24 hours (Mon–Fri)",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="12" rx="1" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M6 2v2M12 2v2M2 7h14" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Founded",
    value: "2021",
  },
];

const popularComparisons = [
  { flag: "🇩🇪", city: "Berlin", slug: "berlin" },
  { flag: "🇦🇪", city: "Dubai", slug: "dubai" },
  { flag: "🇭🇰", city: "Hong Kong", slug: "hong-kong" },
  { flag: "🇺🇸", city: "New York", slug: "new-york" },
  { flag: "🇬🇧", city: "London", slug: "london" },
  { flag: "🇸🇬", city: "Singapore", slug: "singapore" },
  { flag: "🇯🇵", city: "Tokyo", slug: "tokyo" },
  { flag: "🇨🇦", city: "Toronto", slug: "toronto" },
];

// ── JSON-LD: ContactPage ───────────────────────────────────────────────────
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://worldlivingcost.com/contact",
  url: "https://worldlivingcost.com/contact",
  name: "Contact Worldlivingcost",
   datePublished:"2025-06-01",
 dateModified:"2026-07-01",
  description:
    "Contact Worldlivingcost for support, data corrections, API access, partnerships, media inquiries, and business licensing.",
  isPartOf: {
    "@type": "WebSite",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
  },
  about: {
    "@id": "https://worldlivingcost.com/#organization",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".contact-summary"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldlivingcost.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://worldlivingcost.com/contact" },
    ],
  },
};

const contactFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I report incorrect cost of living data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Email our data team at data@worldlivingcost.com with the city name, the specific field you believe is inaccurate (such as rent index, grocery price, or average salary), and a reliable source or current price if available. Our team cross-checks every submission against government statistics and contributor data before updating the database.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Worldlivingcost data in my app or research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide API access and data licensing for HR platforms, relocation services, fintech products, and academic research. Reach out to api@worldlivingcost.com with details about your use case, expected request volume, and which cities or countries you need coverage for.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly will I get a response?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most inquiries are answered within 24 hours on business days. Data correction requests are reviewed within 48 hours, while partnership and API inquiries may take slightly longer as they often involve a short scoping call with our team.",
      },
    },
    {
      "@type": "Question",
      name: "Does Worldlivingcost offer support for businesses and HR teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HR and finance teams use our cost of living index and salary benchmarking data to set fair compensation for international and remote hires. Contact our partnerships team to discuss bulk data access, custom reports, or integration into internal compensation tools.",
      },
    },
  ],
};


// ── JSON-LD: Organization contactPoint — tells AI systems what each ────────
// email address is for. Uses the same @id as the sitewide Organization
// entity so it's understood as additional detail on that same entity,
// rather than a duplicate.
const organizationContactJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://worldlivingcost.com/#organization",
  publisher: {
 "@id":"https://worldlivingcost.com/#organization"
},
  name: "Worldlivingcost",
  url: "https://worldlivingcost.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@worldlivingcost.com",
    },
    {
      "@type": "ContactPoint",
      contactType: "data corrections",
      email: "data@worldlivingcost.com",
    },
    {
 "@type":"ContactPoint",
 "contactType":"technical support"
},
    {
      "@type": "ContactPoint",
      contactType: "media relations",
      email: "press@worldlivingcost.com",
    },
    {
      "@type": "ContactPoint",
      contactType: "legal",
      email: "legal@worldlivingcost.com",
    },
  ],
};

export default function ContactForm() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationContactJsonLd) }}
      />
      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqJsonLd) }}
/>

      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Contact Us
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Get in touch
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Have a question, found an error in our data, or want to partner with
              us? Reach out directly we reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Entity-reinforcing summary, targeted by the speakable schema */}
        <div className="contact-summary bg-white border border-slate-200 rounded-xl p-6 mb-8 text-sm text-slate-600 leading-relaxed">
          Worldlivingcost provides cost of living data, city comparisons, rent
          indexes, purchasing power metrics, quality of life rankings, and
          relocation planning information for cities worldwide. Contact our team
          regarding data corrections, partnerships, API access, media inquiries,
          or general support.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — office info + quick links */}
          <div className="space-y-5">
            {/* Office card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Our Office</h3>
              <div className="space-y-3">
                {officeInfo.map((o) => (
                  <div key={o.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      {o.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{o.label}</p>
                      <p className="text-sm font-medium text-slate-800">{o.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-700">{l.label}</p>
                      <p className="text-xs text-slate-400">{l.desc}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-300 group-hover:text-blue-500 shrink-0">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right — email cards */}
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-slate-900 mb-5">
              Contact by Email
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                    {c.icon}
                  </div>
                  <p className="font-semibold text-sm text-slate-900 mb-1">{c.label}</p>
                  <p className="text-sm text-blue-600 font-medium mb-1.5 group-hover:underline">
                    {c.value}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.sub}</p>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* SEO Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-slate-100 pt-12 mt-12">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              How Can We Help?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Worldlivingcost helps expats, remote workers, HR professionals, and
              retirees compare living costs across cities worldwide. We take every
              message seriously and aim to respond within 24 hours on business days.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              If you have found an incorrect price or index in our database, please use the Data Corrections email above. Include the city name, the field that is incorrect, and the value you believe is accurate. Our data team reviews every correction within 48 hours.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Partnerships and API Access
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              We offer data licensing and API access for businesses, HR platforms, relocation services, and financial tools, covering monthly-updated rent, grocery, transport, utility, and salary data for cities worldwide.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              For press and media inquiries, interview requests, or data citations in publications, contact our press team directly. We are happy to provide verified data, methodology documentation, and expert commentary on global cost of living trends.
            </p>
          </div>
        </div>

        {/* Popular Comparisons */}
        <div className="mt-8 border-t border-slate-100 pt-8">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
            Popular City Cost Comparisons
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {popularComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}-vs-tokyo`}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <p className="text-sm font-semibold text-slate-800">{c.flag} {c.city}</p>
                <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Internal link hub */}
        <div className="mt-8 border-t border-slate-100 pt-8">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
            Explore More
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-100 pt-12 mt-12">
  <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
    Frequently Asked Contact Questions
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-2">
        How do I report incorrect cost of living data?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Email our data team at data@worldlivingcost.com with the city name,
        the specific field you believe is inaccurate (such as rent index,
        grocery price, or average salary), and a reliable source or
        current price if available. Our team cross-checks every submission
        against government statistics and contributor data before updating
        the database.
      </p>
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-2">
        Can I use Worldlivingcost data in my app or research?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Yes. We provide API access and data licensing for HR platforms,
        relocation services, fintech products, and academic research.
        Reach out to api@worldlivingcost.com with details about your use
        case, expected request volume, and which cities or countries you
        need coverage for.
      </p>
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-2">
        How quickly will I get a response?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Most inquiries are answered within 24 hours on business days.
        Data correction requests are reviewed within 48 hours, while
        partnership and API inquiries may take slightly longer as they
        often involve a short scoping call with our team.
      </p>
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-2">
        Does Worldlivingcost offer support for businesses and HR teams?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Yes. HR and finance teams use our cost of living index and salary
        benchmarking data to set fair compensation for international and
        remote hires. Contact our partnerships team to discuss bulk data
        access, custom reports, or integration into internal compensation
        tools.
      </p>
    </div>
  </div>
</div>
      </div>
      {/* Support Guide */}

    </>
  );
}