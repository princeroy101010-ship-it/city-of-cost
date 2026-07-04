import Link from "next/link";
import CalculatorClient from "../../components/CalculatorClient";
import { cities } from "../../lib/data";

export const metadata = {
  title: "Cost of Living Calculator | Compare Monthly Living Expenses",
  description:
"Free cost of living calculator. Estimate monthly living expenses, rent, groceries, transportation, utilities, and salary needs for cities worldwide.",
  alternates: {
    canonical: "https://worldlivingcost.com/cost-of-living-calculator",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/cost-of-living-calculator",
    title: "Cost of Living Calculator | Worldlivingcost",
    description:
      "Estimate your monthly cost of living in any city worldwide. Free calculator covering rent, groceries, transport, utilities, and salaries.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Cost of Living Calculator" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost of Living Calculator | Worldlivingcost",
    description:
      "Estimate your monthly cost of living in any city worldwide based on lifestyle and household size.",
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

const calculatorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Worldlivingcost Cost of Living Calculator",
  url: "https://worldlivingcost.com/cost-of-living-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  featureList: [
 "Cost of Living Calculator",
 "Monthly Budget Estimator",
 "City Comparison Tool",
 "Rent Calculator"
],
  description:
    "A free calculator that estimates monthly cost of living in any city worldwide based on lifestyle level, household size, and local price data.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Worldlivingcost", url: "https://worldlivingcost.com" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the cost of living calculator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator takes a city's average monthly cost of living data and adjusts it based on your selected lifestyle level (budget, moderate, or comfortable) and household size, giving you a personalized monthly expense estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Is the cost of living calculator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Worldlivingcost calculator is completely free to use with no sign-up required. It draws on the same verified data used across our city and country pages.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the calculator's estimates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estimates are based on average contributor and public pricing data and should be used as a planning guide rather than an exact figure, since actual costs vary by neighborhood and personal spending habits.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator account for household size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can select a household size from one to four or more people, and the calculator scales shared expenses like rent and utilities accordingly rather than simply multiplying costs per person.",
      },
    },
    {
      "@type": "Question",
      name: "Can the calculator show if I can afford to live somewhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you enter your expected monthly income, the calculator compares it against your estimated expenses and shows approximately how much you would have left over, or whether your income falls short for that lifestyle level.",
      },
    },
  ],
};

export default function CalculatorPage() {
  const cityOptions = cities.map((c) => ({
    slug: c.slug,
    name: c.name,
    country: c.country,
    avgMonthlyCost: c.avgMonthlyCost,
    costIndex: c.costIndex,
    categories: c.categories,
    currency: c.currency,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero — server rendered */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Free Tool
            </div>
           <h1 className="font-display text-xl font-bold text-slate-900 mb-3">
  Cost of Living Calculator & Monthly Budget Estimator
</h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Estimate your monthly budget in any city worldwide based on your
              lifestyle, household size, and income. Powered by verified cost
              of living data from 10,000+ cities across 195 countries.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Only the interactive part is client-rendered */}
        <CalculatorClient cities={cityOptions} />

        {/* SEO Content — server rendered */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-slate-100 pt-12 mt-14">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              How the Cost of Living Calculator Works
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Our cost of living calculator uses verified average monthly
              expense data for each city, then adjusts it based on your
              selected lifestyle level and household size. A budget lifestyle
              assumes shared housing and minimal dining out, a moderate
              lifestyle reflects typical local spending, and a comfortable
              lifestyle assumes a private apartment and regular restaurant
              visits.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              This tool is designed for expats, remote workers, students, and
              anyone planning a relocation who wants a quick, data-backed
              estimate before diving into a full city comparison. It draws
              directly from the same verified dataset used across our city
              and country rankings.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Tips for Using Your Estimate
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Treat this calculator as a starting point rather than a fixed
              budget. Actual costs vary by neighborhood, personal habits, and
              currency fluctuations. For a more detailed breakdown, visit the
              full city page to see individual prices for rent, groceries,
              transport, and salaries.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              If you are comparing multiple destinations, use the{" "}
              <Link href="/compare" className="text-blue-600 hover:underline">
                city comparison tool
              </Link>{" "}
              to see two cities side by side across every cost category, or
              browse the{" "}
              <Link href="/rankings" className="text-blue-600 hover:underline">
                city rankings
              </Link>{" "}
              to find affordable destinations that match your budget.
            </p>
          </div>
        </div>

        {/* FAQ — server rendered, matches faqJsonLd exactly */}
        <div className="mt-12 border-t border-slate-100 pt-12">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-6">
            Calculator FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">
                How does the cost of living calculator work?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                The calculator takes a city's average monthly cost of living
                data and adjusts it based on your selected lifestyle level
                (budget, moderate, or comfortable) and household size, giving
                you a personalized monthly expense estimate.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">
                Is the cost of living calculator free to use?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Yes, the Worldlivingcost calculator is completely free to use
                with no sign-up required. It draws on the same verified data
                used across our city and country pages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">
                How accurate are the calculator's estimates?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Estimates are based on average contributor and public pricing
                data and should be used as a planning guide rather than an
                exact figure, since actual costs vary by neighborhood and
                personal spending habits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">
                Does the calculator account for household size?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Yes. You can select a household size from one to four or more
                people, and the calculator scales shared expenses like rent
                and utilities accordingly rather than simply multiplying
                costs per person.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">
                Can the calculator show if I can afford to live somewhere?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                If you enter your expected monthly income, the calculator
                compares it against your estimated expenses and shows
                approximately how much you would have left over, or whether
                your income falls short for that lifestyle level.
              </p>
            </div>
          </div>
        </div>
<section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
What Is a Cost of Living Calculator?</h2>

            <p className="text-sm text-slate-500 leading-relaxed">

A cost of living calculator estimates monthly living expenses in a city by analyzing rent, groceries, transportation, utilities, healthcare, and lifestyle costs. It helps expats, remote workers, students, retirees, and families compare affordability before relocating.
</p>
</section>
        {/* Internal links — server rendered */}
        <div className="mt-12 border-t border-slate-100 pt-8">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
           Average Monthly Cost of Living by Popular City</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/compare"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Compare Cities
            </Link>
            <Link
              href="/rankings"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              City Rankings
            </Link>
            <Link
              href="/country"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Country Rankings
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Methodology
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}