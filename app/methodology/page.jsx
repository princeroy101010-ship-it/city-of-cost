import Link from "next/link";

export const metadata = {
  title: "Cost of Living Index Methodology How We Calculate Data | Worldlivingcost",
  description:
    "Learn exactly how Worldlivingcost calculates its cost of living, rent, quality of life, safety, and healthcare indices. Full transparency on data sources, weighting formulas, verification process, and update schedules for 10,000+ cities worldwide.",
  keywords: [
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
    type: "article",
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
    article: {
      modifiedTime: "2025-06-01T00:00:00.000Z",
      authors: ["https://worldlivingcost.com"],
    },
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

// WebPage + Dataset JSON-LD — describes this as an authoritative methodology document
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://worldlivingcost.com/methodology",
  name: "Cost of Living Index Methodology How Worldlivingcost Calculates Data",
  description:
    "Full transparency on how Worldlivingcost calculates cost of living, rent, quality of life, safety, healthcare, and purchasing power indices for 10,000+ cities across 195 countries.",
  url: "https://worldlivingcost.com/methodology",
  inLanguage: "en-US",
  dateModified: "2025-06-01",
  isPartOf: {
    "@type": "WebSite",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
  },
  about: {
    "@type": "Dataset",
    name: "Global Cost of Living Index",
    description:
      "Worldlivingcost's global cost of living dataset covering 10,000+ cities across 195 countries. Data compiled from government statistical agencies (40%), contributor submissions (35%), institutional sources including World Bank, IMF, WHO, OECD (15%), and commercial partners (10%).",
    url: "https://worldlivingcost.com",
    creator: {
      "@type": "Organization",
      name: "Worldlivingcost",
      url: "https://worldlivingcost.com",
    },
    variableMeasured: [
      "Cost of Living Index (NYC=100)",
      "Rent Index (NYC=100)",
      "Quality of Life Index",
      "Safety Index",
      "Healthcare Index",
      "Purchasing Power Index",
    ],
    temporalCoverage: "2025",
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

// HowTo JSON-LD — the 5-step data process maps perfectly to HowTo schema
// Google can show this as a numbered step rich result in SERPs
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Worldlivingcost Calculates Cost of Living Indices",
  description:
    "The 5-step process Worldlivingcost uses to collect, verify, normalize, calculate, and publish cost of living data for 10,000+ cities worldwide.",
  url: "https://worldlivingcost.com/methodology",
  totalTime: "P1M",
  tool: [
    { "@type": "HowToTool", name: "Government statistical datasets" },
    { "@type": "HowToTool", name: "Contributor submission platform" },
    { "@type": "HowToTool", name: "World Bank, IMF, WHO, OECD public data" },
    { "@type": "HowToTool", name: "Outlier detection and cross-referencing system" },
    { "@type": "HowToTool", name: "USD exchange rate normalization" },
  ],
  step: steps.map((s, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: s.title,
    text: s.desc,
    url: `https://worldlivingcost.com/methodology#step-${s.step}`,
  })),
};

// FAQPage JSON-LD — Index Definitions are genuinely Q&A content (what is X index → formula answer)
// Plus high-traffic methodology questions for rich result eligibility
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Worldlivingcost Cost of Living Index?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Worldlivingcost Cost of Living Index is a weighted average of restaurant prices, grocery costs, transportation fares, utility bills, and miscellaneous expenses in a city. New York City is used as the baseline (index = 100). A city with a score of 50 is approximately 50% cheaper than New York City. The index is updated monthly.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Worldlivingcost Rent Index?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Rent Index is based on median monthly rent prices for 1-bedroom and 3-bedroom apartments both in the city centre and outside of it. New York City = 100 baseline. Updated monthly from contributor submissions, rental platforms, and housing market data.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Quality of Life Index calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Quality of Life Index is a composite of 9 sub-indices: purchasing power, safety, healthcare quality, cost of living, traffic and commute, pollution levels, climate, housing affordability, and property price-to-income ratio. It is updated quarterly.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Safety Index calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Safety Index is based on crime statistics from official police and government sources, contributor safety perception surveys, and analysis of reported crime rates. A higher score means a safer city. Updated quarterly.",
      },
    },
    {
      "@type": "Question",
      name: "What data sources does Worldlivingcost use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Worldlivingcost data comes from four source types: Government Statistical Agencies (40%) including ONS, Destatis, INSEE, and BLS; Contributor Submissions (35%) from verified local contributors worldwide; Institutional Data (15%) from the World Bank, IMF, WHO, and OECD; and Commercial Partners (10%) including rental platforms, grocery chains, and utility providers.",
      },
    },
    {
      "@type": "Question",
      name: "How often is Worldlivingcost data updated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Update frequency varies by index: Cost of Living and Rent indices are updated monthly. Quality of Life, Safety, and Purchasing Power indices are updated quarterly. The Healthcare Index is updated bi-annually. All updates are timestamped and logged on the platform.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Purchasing Power Index?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Purchasing Power Index measures the relative purchasing power of a net salary in a given city compared to the cost of living in that city. A higher score means your salary stretches further. It is updated quarterly and accounts for local wage levels, taxes, and living costs.",
      },
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
            <p className="text-lg text-slate-500 leading-relaxed">
              Full transparency on our data sources, formulas, and update schedules.
              We believe you should know exactly where every number comes from.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
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
                    {s.weight}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">Our Process</h2>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {steps.map((s) => (
                <div key={s.step} className="p-5">
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
      </div>
    </>
  );
}