// app/compare/page.jsx  ← SERVER COMPONENT (no "use client")

import CompareClient from "./data";

export const metadata = {
  title: "Compare Cost of Living Between Cities | Free City Comparison Tool",
  description:
    "Compare cost of living between any two cities worldwide. Side-by-side rent, groceries, transport, salaries & quality of life. Free tool. 10,000+ cities.",
  keywords: [
    "cost of living comparison",
    "compare cost of living cities",
    "city cost comparison tool",
    "cost of living calculator",
    "cost of living between two cities",
    "compare cities cost of living",
    "rent comparison cities",
    "salary comparison cities",
    "cheapest cities to live 2025",
    "cost of living index by city",
    "monthly expenses comparison",
    "expat cost of living comparison",
    "compare New York vs London cost",
    "compare Dubai vs Singapore cost",
    "compare Tokyo vs Berlin cost",
    "quality of life comparison cities",
    "purchasing power comparison",
    "grocery prices by city",
    "transport costs comparison",
    "healthcare costs by city",
    "digital nomad city comparison",
    "remote work city comparison",
    "relocate city cost comparison",
    "housing cost comparison worldwide",
    "cheapest cities for expats 2025",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/compare",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/compare",
    title: "Compare Cost of Living Between Cities Free Side-by-Side Tool",
    description:
      "Compare rent, groceries, transport, salaries & quality of life between any two cities. Free tool covering 10,000+ cities worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost Compare cost of living between two cities side by side",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Cost of Living Between Cities Free Tool",
    description:
      "Side-by-side cost of living comparison: rent, groceries, transport, salaries & quality of life. 10,000+ cities.",
    images: ["/og-image.png"],
  },
};

const comparePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Compare Cost of Living Between Cities",
  description:
    "Free side-by-side cost of living comparison tool. Compare rent, groceries, transport, salaries, and quality of life indices between any two cities from 10,000+ worldwide.",
  url: "https://worldlivingcost.com/compare",
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
        name: "Compare Cities",
        item: "https://worldlivingcost.com/compare",
      },
    ],
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "City Cost of Living Comparison Tool",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Compare cost of living between any two cities worldwide. Includes rent, groceries, transportation, utilities, salaries, quality of life, safety, and healthcare indices.",
    url: "https://worldlivingcost.com/compare",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Side-by-side city cost comparison",
      "Rent and housing cost comparison",
      "Grocery and food price comparison",
      "Transportation cost comparison",
      "Salary and purchasing power comparison",
      "Quality of life index comparison",
      "Safety index comparison",
      "Healthcare cost comparison",
    ],
  },
};

const compareFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I compare the cost of living between two cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Worldlivingcost's free comparison tool select any two cities from 10,000+ worldwide and instantly see a side-by-side breakdown of rent, groceries, transportation, salaries, quality of life, safety, and healthcare costs.",
      },
    },
    {
      "@type": "Question",
      name: "Which city is cheaper to live in: New York or London?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "London is generally slightly cheaper than New York for monthly living costs. However, both are among the world's most expensive cities. Use our free comparison tool to see the exact current cost breakdown across rent, groceries, transport, and more.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the cost of living comparison?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our comparison covers 50+ data points including: restaurants and dining out, grocery and market prices, public and private transportation, utility bills, rent and housing costs, average salaries, quality of life index, safety index, healthcare index, climate score, and purchasing power.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest city to live in compared to New York?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cities like Chiang Mai (Thailand), Ho Chi Minh City (Vietnam), Tbilisi (Georgia), and Medellín (Colombia) are 70–85% cheaper than New York. Use our comparison tool to see the exact monthly cost difference for any city pair.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compare cost of living for remote work or digital nomad planning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our tool is widely used by remote workers and digital nomads to compare cities by salary-adjusted cost of living, purchasing power, quality of life, and internet infrastructure. Compare any two cities to find where your money goes furthest.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the cost of living comparison data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Data is updated monthly from thousands of contributors and official sources across 10,000+ cities. Our transparent methodology lets you see exactly how every index is calculated, so you can trust the numbers when planning a move or relocation.",
      },
    },
  ],
};

export default function ComparePage() {
  return (
    <>
      {/* JSON-LD Structured Data — Server-rendered for best SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqJsonLd) }}
      />

      {/* All interactive UI lives in the client component */}
      <CompareClient />
    </>
  );
}