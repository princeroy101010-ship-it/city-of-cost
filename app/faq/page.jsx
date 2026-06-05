// app/faq/page.jsx  ← SERVER COMPONENT (no "use client")

import FaqClient from "./data";

export const metadata = {
  title: "FAQ Cost of Living Data, Tool & API Questions | Worldlivingcost",
  description:
    "Answers to the most common questions about Worldlivingcost how our data works, how to compare cities, contribute prices, and access the API. Free to use.",
  keywords: [
    "cost of living FAQ",
    "cost of living data accuracy",
    "how to compare cost of living cities",
    "cost of living calculator help",
    "cost of living index explained",
    "NYC baseline cost of living",
    "cost of living data sources",
    "how accurate is cost of living data",
    "cost of living API",
    "expat city comparison tool help",
    "how to contribute city prices",
    "cost of living in USD",
    "city cost of living questions",
    "Worldlivingcost platform guide",
    "monthly cost of living explained",
    "cost of living index methodology",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/faq",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/faq",
    title: "FAQ Cost of Living Data, Tool & API | Worldlivingcost",
    description:
      "How does our data work? How do I compare two cities? Can I use the API? Find answers to all common Worldlivingcost questions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost FAQ Frequently asked questions about cost of living data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ Cost of Living Data, Tool & API | Worldlivingcost",
    description:
      "Answers about our data accuracy, city comparison tool, API access, and contributing prices. Everything you need to know about Worldlivingcost.",
    images: ["/og-image.png"],
  },
};

// ── JSON-LD: WebPage + BreadcrumbList ─────────────────────────────────────────
const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Frequently Asked Questions Worldlivingcost",
  description:
    "Answers to common questions about Worldlivingcost's cost of living data, city comparison tool, price contribution, and API access.",
  url: "https://worldlivingcost.com/faq",
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
        name: "FAQ",
        item: "https://worldlivingcost.com/faq",
      },
    ],
  },
};

// ── JSON-LD: FAQPage — all Q&As indexed by search engines & AI ────────────────
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    // About the Data
    {
      "@type": "Question",
      name: "How often is cost of living data updated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cost and rent indices are updated monthly. Quality of life, safety, and healthcare indices are updated quarterly. Every data point is timestamped so you always know how fresh the data is.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the cost of living data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each price is cross-referenced against at least two independent sources before publishing. Cost of living data is inherently approximate prices vary by neighbourhood, lifestyle, and time. Use our data as a reliable guide, not an absolute truth.",
      },
    },
    {
      "@type": "Question",
      name: "What does the NYC = 100 baseline mean in the cost of living index?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All cost and rent indices use New York City as the baseline (score of 100). A city with a cost index of 65 is approximately 35% cheaper than New York City for equivalent goods and services.",
      },
    },
    {
      "@type": "Question",
      name: "Are cost of living prices shown in local currency or USD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All prices are shown in USD for easy global comparison. Daily exchange rates from the European Central Bank are used for conversion. The original local currency is noted where relevant.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle cities with less cost of living data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cities with fewer than 100 contributor data points are marked with a lower confidence indicator. Data is still shown but should be treated as an estimate rather than a precise figure.",
      },
    },
    // Using Worldlivingcost
    {
      "@type": "Question",
      name: "Is Worldlivingcost free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes core cost of living data, city comparisons, and rankings are completely free. A premium API tier for businesses is planned for the future, but personal use will always be free.",
      },
    },
    {
      "@type": "Question",
      name: "How do I compare the cost of living between two cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to the Compare page, select any two cities from the dropdowns, and instantly see a side-by-side breakdown across restaurants, groceries, transport, housing, utilities, and salaries.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download cost of living data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bulk data downloads are available via the API. CSV export functionality for individual city pages is in development.",
      },
    },
    {
      "@type": "Question",
      name: "How do I report incorrect cost of living data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Contact page and select 'Data Correction' as the topic. Include the city name, the incorrect value, and the correct value. All reports are reviewed within 48 hours.",
      },
    },
    // Contributing
    {
      "@type": "Question",
      name: "How can I contribute city price data to Worldlivingcost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit the Contribute page to submit local prices. All submissions are reviewed before being incorporated into the database. Contributions from locals who know their city's prices are especially valuable.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an account to contribute cost of living data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can submit data without an account, but creating a free account lets you track contributions, earn contributor status, and get credited on the city pages you help improve.",
      },
    },
    // API & Business
    {
      "@type": "Question",
      name: "Do you offer a cost of living data API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a public API is available with rate-limited free access. For higher rate limits and commercial use, contact api@Worldlivingcost.world to discuss partnership options.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Worldlivingcost data in my app or product?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free tier API data can be used in non-commercial applications with attribution. Commercial use requires a separate data license agreement. Contact legal@Worldlivingcost.world for details.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD — server-rendered, picked up by crawlers immediately */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <FaqClient />
    </>
  );
}