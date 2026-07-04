import Link from "next/link";

const FIRST_PUBLISHED_DATE = "2025-06-01";
const LAST_UPDATED_DATE = "2026-07-01";
const LAST_UPDATED_DISPLAY = "July 1, 2026";

export const metadata = {
  title: "How We Calculate Cost of Living Data",
description:
  "Learn how Worldlivingcost calculates cost of living, rent, purchasing power, safety, healthcare and quality of life indices using verified data sources.",  keywords: [
    "cost of living index methodology",
    "how is cost of living calculated",
    "cost of living data sources",
    "cost of living index formula",
    "quality of life index calculation",
    "how Worldlivingcost calculates data",
    "cost of living data accuracy",
    "city cost index explained",
    "cost of living data transparency",
    "rent index methodology",
    "safety index calculation",
    "healthcare index formula",
    "purchasing power index explained",
    "cost of living NYC baseline",
    "cost of living contributor data",
    "World Bank cost of living data",
    "IMF cost of living statistics",
    "government cost of living data",
    "cost of living verification process",
    "reliable cost of living data",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/methodology",
  },
  openGraph: {
    // Methodology is a permanent reference page, not a dated news article
    type: "website",
    url: "https://worldlivingcost.com/methodology",
    title: "Cost of Living Index Methodology How We Calculate Data | Worldlivingcost",
    description:
      "Full transparency on how Worldlivingcost calculates cost of living, rent, quality of life, safety, and healthcare indices for 10,000+ cities. Data sources, formulas, verification steps, and update schedules explained.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost methodology how cost of living indices are calculated",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Worldlivingcost Calculates Cost of Living Data Full Methodology",
    description:
      "Transparent breakdown of how Worldlivingcost calculates cost of living, rent, quality of life, safety, and healthcare indices for 10,000+ cities worldwide.",
    images: ["/og-image.png"],
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

const sources = [
  { name: "Government Statistical Agencies", weight: "40%", desc: "National statistics offices (ONS, Destatis, INSEE, BLS etc.)", icon: "🏛️" },
  { name: "Contributor Submissions", weight: "35%", desc: "Verified prices submitted by our community of local contributors", icon: "👥" },
  { name: "Institutional Data", weight: "15%", desc: "World Bank, IMF, WHO, OECD public datasets", icon: "🌐" },
  { name: "Commercial Partners", weight: "10%", desc: "Rental platforms, grocery chains, utility providers", icon: "🤝" },
];

const indices = [
  {
    name: "Cost of Living Index",
    formula: "Weighted average of restaurant, grocery, transport, utility, and miscellaneous prices. New York City = 100 baseline.",
    update: "Monthly",
    color: "bg-blue-50 border-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "Rent Index",
    formula: "Based on median rent for 1BR and 3BR apartments in city centre and outside. New York City = 100 baseline.",
    update: "Monthly",
    color: "bg-emerald-50 border-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Quality of Life Index",
    formula: "Composite of 9 sub-indices: purchasing power, safety, healthcare, cost of living, traffic, pollution, climate, and housing affordability.",
    update: "Quarterly",
    color: "bg-violet-50 border-violet-100",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    name: "Safety Index",
    formula: "Based on crime statistics, contributor safety perception surveys, and police data. Higher = safer.",
    update: "Quarterly",
    color: "bg-amber-50 border-amber-100",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    name: "Healthcare Index",
    formula: "Composite of healthcare infrastructure quality, staff competence, cost, availability of modern equipment, and contributor ratings.",
    update: "Bi-annually",
    color: "bg-rose-50 border-rose-100",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    name: "Purchasing Power Index",
    formula: "Relative purchasing power of net salary vs. cost of living in the city. Higher = your salary goes further.",
    update: "Quarterly",
    color: "bg-slate-50 border-slate-200",
    badge: "bg-slate-100 text-slate-700",
  },
];

const steps = [
  {
    step: "01",
    title: "Data Collection",
    desc: "Raw prices are collected from government sources, contributor submissions, and institutional databases on a rolling basis.",
  },
  {
    step: "02",
    title: "Verification",
    desc: "Each price point is cross-referenced against at least 2 independent sources. Outliers are flagged for manual review.",
  },
  {
    step: "03",
    title: "Normalization",
    desc: "All prices are converted to USD at current exchange rates and normalized to our NYC = 100 baseline.",
  },
  {
    step: "04",
    title: "Index Calculation",
    desc: "Weighted formulas are applied to calculate each index. Weights are reviewed and updated quarterly.",
  },
  {
    step: "05",
    title: "Publication",
    desc: "Verified, calculated data is published on the platform. All changes are logged with timestamps.",
  },
];

const faqs = [
  {
    q: "What is the Worldlivingcost Cost of Living Index?",
    a: "The Worldlivingcost Cost of Living Index is a weighted average of restaurant prices, grocery costs, transportation fares, utility bills, and miscellaneous expenses in a city. New York City is used as the baseline (index = 100). A city with a score of 50 is approximately 50% cheaper than New York City. The index is updated monthly.",
  },
  {
    q: "What is the Worldlivingcost Rent Index?",
    a: "The Rent Index is based on median monthly rent prices for 1-bedroom and 3-bedroom apartments both in the city centre and outside of it. New York City = 100 baseline. Updated monthly from contributor submissions, rental platforms, and housing market data.",
  },
  {
    q: "How is the Quality of Life Index calculated?",
    a: "The Quality of Life Index is a composite of 9 sub-indices: purchasing power, safety, healthcare quality, cost of living, traffic and commute, pollution levels, climate, housing affordability, and property price-to-income ratio. It is updated quarterly.",
  },
  {
    q: "How is the Safety Index calculated?",
    a: "The Safety Index is based on crime statistics from official police and government sources, contributor safety perception surveys, and analysis of reported crime rates. A higher score means a safer city. Updated quarterly.",
  },
  {
    q: "What data sources does Worldlivingcost use?",
    a: "Worldlivingcost data is compiled from contributor submissions, public government statistical sources, institutional datasets (World Bank, IMF, WHO, OECD), and commercial reference providers such as rental platforms, grocery chains, and utility companies.",
  },
  {
    q: "How often is Worldlivingcost data updated?",
    a: "Update frequency varies by index: Cost of Living and Rent indices are updated monthly. Quality of Life, Safety, and Purchasing Power indices are updated quarterly. The Healthcare Index is updated bi-annually. All updates are timestamped and logged on the platform.",
  },
  {
    q: "What is the Purchasing Power Index?",
    a: "The Purchasing Power Index measures the relative purchasing power of a net salary in a given city compared to the cost of living in that city. A higher score means your salary stretches further. It is updated quarterly and accounts for local wage levels, taxes, and living costs.",
  },
];

const relatedLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/rankings", label: "City Rankings" },
  { href: "/country", label: "Browse by Country" },
  { href: "/cost-of-living-calculator", label: "cost of living calculator" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

// WebPage + Dataset + Speakable JSON-LD — describes this as an authoritative methodology document
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://worldlivingcost.com/methodology",
  name: "Cost of Living Index Methodology How Worldlivingcost Calculates Data",
  description:
    "Full transparency on how Worldlivingcost calculates cost of living, rent, quality of life, safety, healthcare, and purchasing power indices for 10,000+ cities across 195 countries.",
  url: "https://worldlivingcost.com/methodology",
  publisher: {
  "@id": "https://worldlivingcost.com/#organization"
},
  inLanguage: "en-US",
  datePublished: FIRST_PUBLISHED_DATE,
  dateModified: LAST_UPDATED_DATE,
  isPartOf: {
    "@type": "WebSite",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".methodology-summary"],
  },
  about: {
    "@type": "Dataset",
    name: "Global Cost of Living Index",
    description:
      "Worldlivingcost's global cost of living dataset covering 10,000+ cities across 195 countries. Data is compiled from contributor submissions, public government statistical sources, institutional datasets, and commercial reference providers.",
    url: "https://worldlivingcost.com",
    creator: {
      "@id": "https://worldlivingcost.com/#organization",
    },
    variableMeasured: [
      "Cost of Living Index (NYC=100)",
      "Rent Index (NYC=100)",
      "Quality of Life Index",
      "Safety Index",
      "Healthcare Index",
      "Purchasing Power Index",
    ],
    temporalCoverage: "2025-01-01/..",
    spatialCoverage: "Worldwide",
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
        name: "Methodology",
        item: "https://worldlivingcost.com/methodology",
      },
    ],
  },
};

// TechArticle JSON-LD — a more reliable fit than HowTo for an explanatory
// process write-up that isn't a consumer DIY task
const techArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "How Worldlivingcost Calculates Cost of Living Indices",
  description:
    "The process Worldlivingcost uses to collect, verify, normalize, calculate, and publish cost of living data for 10,000+ cities worldwide.",
  url: "https://worldlivingcost.com/methodology",
  datePublished: FIRST_PUBLISHED_DATE,
  dateModified: LAST_UPDATED_DATE,
  author: {
    "@id": "https://worldlivingcost.com/#organization",
  },
  publisher: {
    "@id": "https://worldlivingcost.com/#organization",
  },
  mainEntityOfPage: "https://worldlivingcost.com/methodology",
};

// FAQPage JSON-LD — matches the visible FAQ section below word for word
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function MethodologyPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Methodology
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">
              How we calculate our indices
            </h1>
            <Link href='/cost-of-living-calculator' className="text-blue-400">
            Click here 
            </Link>
            <p className="text-lg text-slate-500 leading-relaxed mb-4">
              Full transparency on our data sources, formulas, and update schedules.
              We believe you should know exactly where every number comes from.
            </p>
            <p className="text-xs font-medium text-slate-400">
              Last reviewed: {LAST_UPDATED_DISPLAY}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Entity-reinforcing summary, also targeted by the speakable schema */}
        <div className="methodology-summary bg-white border border-slate-200 rounded-xl p-6 text-sm text-slate-600 leading-relaxed">
           Worldlivingcost provides cost of living comparisons,
  rent indexes, salary purchasing power analysis,
  city rankings, quality of life scores, healthcare ratings,
  safety metrics, and relocation planning data for cities
  and countries worldwide.

  This methodology explains how our datasets are collected,
  verified, normalized, weighted, and updated using
  contributor submissions, public government statistics,
  institutional datasets, and commercial reference data.
        </div>

        {/* Data sources */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">Data Sources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sources.map((s) => (
              <div key={s.name} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="text-2xl mb-3">{s.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-slate-900">{s.name}</h3>
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                    ~{s.weight}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Weightings are approximate targets and are reviewed quarterly; actual mix
            varies by city depending on data availability.
          </p>
        </div>

        {/* Process */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">Our Process</h2>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {steps.map((s) => (
                <div key={s.step} id={`step-${s.step}`} className="p-5">
                  <span className="font-display font-bold text-2xl text-blue-200 block mb-3">{s.step}</span>
                  <h3 className="font-semibold text-sm text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Index formulas */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">Index Definitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {indices.map((idx) => (
              <div key={idx.name} className={`border rounded-xl p-5 ${idx.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">{idx.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${idx.badge}`}>
                    Updated {idx.update}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{idx.formula}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-white border border-slate-200 rounded-xl p-7">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
            Known Limitations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Geographic Coverage",
                desc: "Smaller cities may have fewer contributor data points, leading to wider confidence intervals. We indicate data confidence on each city page.",
              },
              {
                title: "Exchange Rate Fluctuation",
                desc: "All prices are converted to USD at the time of the last update. Rapid currency movements may temporarily affect index accuracy.",
              },
              {
                title: "Neighbourhood Variance",
                desc: "City-level averages mask significant neighbourhood-to-neighbourhood variance, particularly for rent. Use our data as a starting point, not a final answer.",
              },
            ].map((l) => (
              <div key={l.title}>
                <h3 className="font-semibold text-sm text-slate-900 mb-2">{l.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visible FAQ section — matches faqJsonLd content exactly */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
            {faqs.map((f) => (
              <div key={f.q} className="p-5">
                <h3 className="font-semibold text-sm text-slate-900 mb-2">{f.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Found an error in our data?</h3>
            <p className="text-sm text-slate-500">
              We take data accuracy seriously. Report any issues and our team will investigate within 48 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Report an Error
          </Link>
        </div>

        {/* Internal link hub — passes authority to key sections of the site */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">
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
      </div>
    </>
  );
}