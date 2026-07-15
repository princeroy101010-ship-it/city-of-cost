// app/faq/page.jsx  ← SERVER COMPONENT (no "use client")

import Script from "next/script";
import FaqClient from "./data";
import { faqs } from "./faq";

const FIRST_PUBLISHED_DATE = "2025-06-01";
const LAST_UPDATED_DATE = "2026-07-01";

export const metadata = {
title: "Cost of Living FAQ | Rankings, Rent & Methodology",
description:
  "Find answers about cost of living data, city rankings, rent indexes, purchasing power, methodology, city comparisons and API access.",
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

// ── JSON-LD: WebPage + BreadcrumbList + Speakable ─────────────────────────────
const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://worldlivingcost.com/faq",
  name: "Frequently Asked Questions Worldlivingcost",
  description:
    "Answers to common questions about Worldlivingcost's cost of living data, city comparison tool, price contribution, and API access.",
  url: "https://worldlivingcost.com/faq",
  datePublished: FIRST_PUBLISHED_DATE,
  isPartOf: {
  "@type": "WebSite",
  "@id": "https://worldlivingcost.com/#website",
},
mainEntity: {
  "@type": "Thing",
  name: "Cost of Living Data",
},
  dateModified: LAST_UPDATED_DATE,
  publisher: {
    "@id": "https://worldlivingcost.com/#organization",
  },
  about: [
  {
    "@type": "Thing",
    name: "Cost of Living Index",
  },
  {
    "@type": "Thing",
    name: "City Comparison",
  },
  {
    "@type": "Thing",
    name: "Rent Index",
  },
],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".faq-summary"],
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
        name: "FAQ",
        item: "https://worldlivingcost.com/faq",
      },
    ],
  },
};

// ── JSON-LD: FAQPage — generated from the same `faqs` array the UI renders,
// so schema and visible content can never go out of sync ─────────────────────
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD — server-rendered, picked up by crawlers immediately */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <FaqClient />
    </>
  );
}