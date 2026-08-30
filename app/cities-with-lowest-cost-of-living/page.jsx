import Link from "next/link";
import Script from "next/script";

import {
  cities,
  getScoreColor,
  getScoreLabel,
} from "../../lib/data";

const BASE_URL = "https://worldlivingcost.com";
const PAGE_URL = `${BASE_URL}/cities-with-lowest-cost-of-living`;

const PAGE_TITLE =
  "Cities With the Lowest Cost of Living in 2026 | Cheapest Cities";

const PAGE_DESCRIPTION =
  "Find cities with the lowest cost of living in 2026. Compare monthly expenses, rent, cost of living indexes, safety, healthcare, and quality of life to find the least expensive cities to live in.";

const PRIMARY_KEYWORD = "cities with lowest cost of living";

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "cities with lowest cost of living",
    "least expensive cities to live in",
    "lowest cost of living cities",
    "cheapest cost of living cities",
    "cheap cost of living cities",
    "what cities have the lowest cost of living",
    "city with lowest cost of living",
    "cities lowest cost of living",
    "least expensive cities",
    "cheapest cities to live in",
    "most affordable cities to live in",
    "affordable cities to live in",
    "lowest cost cities to live in",
    "cheapest places to live",
    "cities with cheap rent",
    "affordable cities worldwide",
    "cheapest cities in the world",
    "affordable cities for expats",
    "affordable cities for remote workers",
    "low cost of living cities",
    "monthly cost of living by city",
    "city cost of living comparison",
    "cost of living rankings",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "World Living Cost",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cities with the lowest cost of living worldwide",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/og-image.png`],
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

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatCurrency(value) {
  return `$${Number(value).toLocaleString("en-US")}`;
}

function getQualityLabel(score) {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 50) return "Average";
  return "Low";
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function CitiesWithLowestCostOfLivingPage() {
  /*
   * Lowest monthly cost first.
   *
   * This is the primary ranking used by this SEO landing page.
   */
  const cheapestCities = [...cities]
    .sort((a, b) => a.avgMonthlyCost - b.avgMonthlyCost);

  /*
   * Lowest cost-index cities.
   */
  const lowestCostIndexCities = [...cities]
    .sort((a, b) => a.costIndex - b.costIndex);

  /*
   * Best quality of life among the available dataset.
   *
   * Useful because users normally balance affordability with livability.
   */
  const affordableQualityCities = [...cities]
    .sort((a, b) => {
      const affordabilityA = 100 - a.costIndex;
      const affordabilityB = 100 - b.costIndex;

      const scoreA =
        affordabilityA * 0.5 +
        a.qualityOfLife * 0.5;

      const scoreB =
        affordabilityB * 0.5 +
        b.qualityOfLife * 0.5;

      return scoreB - scoreA;
    });

  const topCheapestCities = cheapestCities.slice(0, 10);

  /* ------------------------------------------------------------------------ */
  /* Breadcrumb Schema                                                        */
  /* ------------------------------------------------------------------------ */

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cities With the Lowest Cost of Living",
        item: PAGE_URL,
      },
    ],
  };

  /* ------------------------------------------------------------------------ */
  /* WebPage Schema                                                           */
  /* ------------------------------------------------------------------------ */

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    isPartOf: {
      "@type": "WebSite",
      name: "World Living Cost",
      url: BASE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Cost of living by city",
    },
    mainEntity: {
      "@id": `${PAGE_URL}#ranking`,
    },
  };

  /* ------------------------------------------------------------------------ */
  /* ItemList Schema                                                          */
  /* ------------------------------------------------------------------------ */

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#ranking`,
    name: "Cities With the Lowest Cost of Living",
    description:
      "A ranking of cities ordered by average monthly cost of living.",
    url: PAGE_URL,
    itemListOrder:
      "https://schema.org/ItemListOrderAscending",
    numberOfItems: cheapestCities.length,

    itemListElement: topCheapestCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: city.name,
      url: `${BASE_URL}/city/${city.slug}`,
    })),
  };

  /* ------------------------------------------------------------------------ */
  /* Dataset Schema                                                           */
  /* ------------------------------------------------------------------------ */

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Cities With the Lowest Cost of Living",
    description:
      "City-level cost of living data including monthly living costs, rent, cost index, safety, healthcare, purchasing power, and quality of life.",
    url: PAGE_URL,

    creator: {
      "@type": "Organization",
      name: "World Living Cost",
      url: BASE_URL,
    },

    spatialCoverage: {
      "@type": "Place",
      name: "Worldwide",
    },

    temporalCoverage: "2026",

    variableMeasured: [
      "Average Monthly Cost",
      "Cost of Living Index",
      "Rent Index",
      "Quality of Life Index",
      "Safety Index",
      "Healthcare Index",
      "Purchasing Power Index",
      "Climate Index",
    ],

    numberOfItems: cities.length,

    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/html",
      contentUrl: PAGE_URL,
    },
  };

  /* ------------------------------------------------------------------------ */
  /* FAQ Schema                                                               */
  /* ------------------------------------------------------------------------ */

  const faqItems = [
    {
      question:
        "What cities have the lowest cost of living?",
      answer:
        "The cities with the lowest cost of living vary depending on rent, food, transportation, utilities, and lifestyle. This ranking compares cities using average monthly living costs and cost indexes so you can identify the least expensive cities in the available dataset.",
    },
    {
      question:
        "What are the least expensive cities to live in?",
      answer:
        "The least expensive cities are those with the lowest overall monthly living costs. Use the ranking on this page to compare average monthly expenses, then open an individual city profile to see rent, groceries, transportation, utilities, and other costs.",
    },
    {
      question:
        "How is the cost of living ranking calculated?",
      answer:
        "Cities are ranked primarily by average monthly cost of living. Additional indicators such as rent, cost of living index, quality of life, safety, healthcare, purchasing power, and climate help provide a broader comparison between destinations.",
    },
    {
      question:
        "What is a low cost of living city?",
      answer:
        "A low cost of living city is a destination where everyday expenses such as housing, food, transportation, utilities, and other essential goods and services are relatively inexpensive compared with other cities.",
    },
    {
      question:
        "Is the cheapest city always the best city to live in?",
      answer:
        "Not necessarily. A very low monthly cost can come with differences in safety, healthcare, infrastructure, purchasing power, climate, or quality of life. Comparing several indicators gives a more useful picture than looking at price alone.",
    },
    {
      question:
        "How can I compare two affordable cities?",
      answer:
        "Open the individual city profiles or use the city comparison tool to compare monthly costs, rent, cost indexes, safety, healthcare, quality of life, and other available indicators side by side.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Structured Data                                                     */}
      {/* ------------------------------------------------------------------ */}

      <Script
        id="cities-lowest-cost-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <Script
        id="cities-lowest-cost-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <Script
        id="cities-lowest-cost-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <Script
        id="cities-lowest-cost-dataset"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetJsonLd),
        }}
      />

      <Script
        id="cities-lowest-cost-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                 */}
      {/* ------------------------------------------------------------------ */}

      <header className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Global Cost of Living Guide
            </p>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Cities With the Lowest Cost of Living
            </h1>

            <p className="text-slate-500 max-w-3xl leading-relaxed">
              Find the cities with the lowest cost of living and compare
              monthly expenses, rent, affordability, safety, healthcare,
              purchasing power, and quality of life. Use the rankings below
              to discover the least expensive cities to live in and explore
              detailed city-level costs.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ---------------------------------------------------------------- */}
        {/* Intro SEO Content                                                */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-10">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
              Find the Least Expensive Cities to Live In
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Looking for cities with the lowest cost of living? The table
              below ranks destinations by average monthly living costs,
              making it easier to find affordable places to live. Monthly
              cost is only one part of the decision, so each city also
              includes cost of living, rent, safety, healthcare, and quality
              of life indicators.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              If your goal is to reduce your monthly budget, start with the
              lowest-cost cities and then open their individual profiles for
              a more detailed breakdown of housing, groceries,
              transportation, utilities, and salaries.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Main Ranking                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section
          aria-labelledby="lowest-cost-cities-heading"
          className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10"
        >
          <div className="px-6 py-5 border-b border-slate-100">
            <h2
              id="lowest-cost-cities-heading"
              className="font-display text-xl font-bold text-slate-900"
            >
              Cities With the Lowest Cost of Living
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Ranked by average monthly cost of living.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full data-table min-w-[850px]">
              <caption className="sr-only">
                Ranking of cities with the lowest cost of living by average
                monthly expenses
              </caption>

              <thead>
                <tr className="bg-slate-50">
                  <th
                    scope="col"
                    className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-12"
                  >
                    Rank
                  </th>

                  <th
                    scope="col"
                    className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    City
                  </th>

                  <th
                    scope="col"
                    className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    Monthly Cost
                  </th>

                  <th
                    scope="col"
                    className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    Cost Index
                  </th>

                  <th
                    scope="col"
                    className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    Quality of Life
                  </th>

                  <th
                    scope="col"
                    className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    Safety
                  </th>

                  <th
                    scope="col"
                    className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    Healthcare
                  </th>

                  <th scope="col" className="px-5 py-3">
                    <span className="sr-only">Details</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {cheapestCities.map((city, index) => (
                  <tr
                    key={city.slug}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-slate-400 font-semibold">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/city/${city.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <img
                            src={city.image}
                            alt={`${city.name}, ${city.country} cost of living`}
                            width="40"
                            height="40"
                            loading={index < 10 ? "eager" : "lazy"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">
                            {city.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {city.country}
                          </p>
                        </div>
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-bold text-slate-900">
                        {formatCurrency(city.avgMonthlyCost)}
                      </span>

                      <span className="block text-xs text-slate-400">
                        per month
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-medium text-slate-700">
                        {city.costIndex}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span
                        className="score-badge"
                        style={{
                          backgroundColor:
                            city.qualityOfLife >= 75
                              ? "#d1fae5"
                              : city.qualityOfLife >= 50
                                ? "#fef3c7"
                                : "#fee2e2",

                          color:
                            city.qualityOfLife >= 75
                              ? "#065f46"
                              : city.qualityOfLife >= 50
                                ? "#92400e"
                                : "#991b1b",
                        }}
                      >
                        {city.qualityOfLife}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="text-sm text-slate-700">
                        {city.safety}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="text-sm text-slate-700">
                        {city.healthcare}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/city/${city.slug}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap"
                      >
                        View city →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Top 10 Cards                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-12">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Top 10 Cheapest Cities to Live In
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              The lowest average monthly costs in the current city dataset.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topCheapestCities.map((city, index) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="h-32 bg-slate-100 overflow-hidden">
                  <img
                    src={city.image}
                    alt={`${city.name} cost of living`}
                    width="400"
                    height="250"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">
                      #{index + 1}
                    </span>

                    <span className="text-xs font-semibold text-blue-600">
                      {city.costIndex} index
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-slate-900">
                    {city.name}
                  </h3>

                  <p className="text-xs text-slate-400 mb-3">
                    {city.country}
                  </p>

                  <p className="text-sm font-bold text-slate-800">
                    {formatCurrency(city.avgMonthlyCost)}
                    <span className="font-normal text-slate-400">
                      {" "}
                      / month
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Cost Index Ranking                                               */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-display font-bold text-slate-900">
                  Lowest Cost of Living Index
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Cities with the lowest relative cost index.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {lowestCostIndexCities.slice(0, 5).map((city, index) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-slate-400 font-bold text-sm w-5">
                      {index + 1}
                    </span>

                    <div className="flex-1">
                      <p className="font-medium text-sm text-slate-900">
                        {city.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {city.country}
                      </p>
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      {city.costIndex}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-display font-bold text-slate-900">
                  Affordable Cities With Good Quality of Life
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  A balance of affordability and livability.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {affordableQualityCities
                  .slice(0, 5)
                  .map((city, index) => (
                    <Link
                      key={city.slug}
                      href={`/city/${city.slug}`}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-slate-400 font-bold text-sm w-5">
                        {index + 1}
                      </span>

                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900">
                          {city.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {city.country}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="block text-sm font-bold text-slate-700">
                          {city.qualityOfLife}
                        </span>

                        <span className="text-[11px] text-slate-400">
                          quality score
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* How To Find Cheap Cities                                         */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-t border-slate-100 pt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                How to Find Cities With a Low Cost of Living
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Finding a cheap city to live in involves more than looking
                at rent. Housing, groceries, transportation, utilities,
                healthcare, restaurants, and local purchasing power can all
                have a major effect on your monthly budget.
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                Start by comparing average monthly costs, then check the
                city's cost index and individual expense categories. This
                approach can help you find an affordable destination that
                also matches your lifestyle.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                Cheapest Does Not Always Mean Best
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                The city with the lowest cost of living is not necessarily
                the best destination for everyone. A lower budget can be
                attractive, but safety, healthcare, infrastructure,
                transportation, climate, and quality of life also matter.
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                For relocation decisions, compare several indicators instead
                of choosing a city based only on its monthly cost.
              </p>
            </div>

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* What Is Cost Of Living Index                                    */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-t border-slate-100 pt-12 mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
            What Is a Cost of Living Index?
          </h2>

          <div className="max-w-4xl">
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              A cost of living index is a way to compare how expensive
              everyday life is in one city relative to a benchmark. Lower
              index values generally indicate lower prices, while higher
              values indicate that everyday expenses are more expensive.
            </p>

            <p className="text-sm text-slate-500 leading-relaxed">
              The index is useful for comparing destinations, but it should
              be considered alongside actual monthly expenses, rent,
              salaries, purchasing power, safety, healthcare, and quality of
              life.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                              */}
        {/* ---------------------------------------------------------------- */}

        <section
          aria-labelledby="faq-heading"
          className="border-t border-slate-100 pt-12 mb-12"
        >
          <h2
            id="faq-heading"
            className="font-display text-2xl font-bold text-slate-900 mb-7"
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-7 max-w-4xl">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-slate-800 text-base mb-2">
                  {item.question}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Explore More                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-t border-slate-100 pt-8 pb-4">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
            Explore More Cost of Living Guides
          </h2>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/rankings"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Global City Rankings
            </Link>

            <Link
              href="/countries"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Country Rankings
            </Link>

            <Link
              href="/compare"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Compare Cities
            </Link>

            <Link
              href="/calculator"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Cost of Living Calculator
            </Link>

            <Link
              href="/methodology"
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              Methodology
            </Link>

          </div>
        </section>

      </main>
    </>
  );
}