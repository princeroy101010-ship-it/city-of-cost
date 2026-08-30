import Link from "next/link";
import Script from "next/script";
import { cities } from "../../lib/data";

const SITE_URL = "https://worldlivingcost.com";
const PAGE_URL = `${SITE_URL}/best-affordable-cities-to-live-in-us`;

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Best Affordable Cities to Live in the US | 2026 Rankings",

  description:
    "Discover the best affordable cities to live in the US. Compare monthly living costs, rent, quality of life, safety, healthcare, and salaries to find affordable places to live in America.",

  keywords: [
    "best affordable cities to live in",
    "best affordable cities to live in USA",
    "best affordable places to live",
    "most affordable cities in the US",
    "best inexpensive cities to live in",
    "best affordable cities to live",
    "best places to live that are affordable",
    "best and most affordable places to live",
    "affordable cities to live in America",
    "cheapest cities to live in the US",
    "affordable places to live in the USA",
    "low cost of living cities in the US",
    "affordable US cities",
    "affordable cities for families",
    "affordable cities for remote workers",
    "affordable cities for young professionals",
    "affordable cities to move to",
    "cities with low cost of living and good quality of life",
    "best affordable cities in America",
    "US cities with low cost of living",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "WorldLivingCost",
    title: "Best Affordable Cities to Live in the US | 2026 Rankings",
    description:
      "Compare affordable US cities by monthly cost of living, rent, safety, healthcare, quality of life, and salaries.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Best affordable cities to live in the United States",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Affordable Cities to Live in the US | 2026 Rankings",
    description:
      "Find affordable places to live in the US by comparing living costs, rent, safety, healthcare, quality of life, and salaries.",
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

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString("en-US")}`;
}

function getAffordabilityLabel(cost) {
  if (cost <= 1200) return "Very Affordable";
  if (cost <= 1800) return "Affordable";
  if (cost <= 2500) return "Moderate";
  return "Higher Cost";
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function BestAffordableCitiesUSPage() {
  /*
   * Only United States cities are used for this landing page.
   *
   * If your data.js contains countryCode = "US", this will automatically
   * select those cities.
   */
  const usCities = cities
    .filter(
      (city) =>
        city.countryCode === "US" ||
        city.countrySlug === "united-states" ||
        city.country === "United States"
    )
    .sort((a, b) => a.avgMonthlyCost - b.avgMonthlyCost);

  /*
   * Safety fallback:
   * If the current dataset does not contain enough US cities, the page
   * still renders without crashing.
   */
  const affordableCities = usCities.slice(0, 20);

  const topAffordableCities = affordableCities.slice(0, 10);

  const bestQualityOfLife = [...usCities]
    .sort((a, b) => b.qualityOfLife - a.qualityOfLife)
    .slice(0, 5);

  const bestValueCities = [...usCities]
    .sort((a, b) => {
      const scoreA =
        (a.qualityOfLife || 0) +
        (a.safety || 0) +
        (a.healthcare || 0) -
        (a.avgMonthlyCost || 0) / 100;

      const scoreB =
        (b.qualityOfLife || 0) +
        (b.safety || 0) +
        (b.healthcare || 0) -
        (b.avgMonthlyCost || 0) / 100;

      return scoreB - scoreA;
    })
    .slice(0, 5);

  /* ---------------------------------------------------------------------- */
  /* Structured Data                                                        */
  /* ---------------------------------------------------------------------- */

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Best Affordable Cities to Live in the US",
        item: PAGE_URL,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Affordable Cities to Live in the US",
    url: PAGE_URL,
    description:
      "A comparison of affordable cities in the United States based on monthly living costs, rent, quality of life, safety, healthcare, and purchasing power.",
    isPartOf: {
      "@type": "WebSite",
      name: "WorldLivingCost",
      url: SITE_URL,
    },
    about: [
      {
        "@type": "Thing",
        name: "Cost of living",
      },
      {
        "@type": "Thing",
        name: "Affordable cities",
      },
      {
        "@type": "Thing",
        name: "United States cities",
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Affordable Cities to Live in the US",
    description:
      "Affordable US cities ranked by average monthly cost of living.",
    url: PAGE_URL,
    numberOfItems: topAffordableCities.length,
    itemListOrder:
      "https://schema.org/ItemListOrderAscending",
    itemListElement: topAffordableCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: city.name,
      url: `${SITE_URL}/city/${city.slug}`,
    })),
  };

  const faqItems = [
    {
      question: "What are the best affordable cities to live in the US?",
      answer:
        "The best affordable cities to live in the US are cities that combine a lower monthly cost of living with reasonable rent, good quality of life, safety, healthcare, and employment opportunities. Our rankings compare these factors so you can evaluate affordability beyond rent alone.",
    },
    {
      question: "What are the most affordable cities in the US?",
      answer:
        "The most affordable cities in the US are generally those with lower housing, transportation, grocery, utility, and everyday expenses. The cities on this page are sorted by average monthly living cost to make it easier to identify lower-cost destinations.",
    },
    {
      question: "What is the best affordable place to live in America?",
      answer:
        "The best affordable place to live depends on your priorities. A city with very low living costs may not have the highest salaries or quality-of-life score, while a slightly more expensive city may provide better healthcare, safety, infrastructure, and purchasing power.",
    },
    {
      question: "How much does it cost to live in an affordable US city?",
      answer:
        "Monthly living costs vary substantially between US cities and depend on housing, lifestyle, transportation, food, utilities, and other expenses. Use the city profiles on WorldLivingCost to compare monthly costs and individual expense categories before choosing a destination.",
    },
    {
      question: "What should I compare when choosing an affordable city?",
      answer:
        "Do not compare rent alone. A useful affordability comparison should include monthly living costs, rent, groceries, transportation, utilities, healthcare, safety, quality of life, and average net salary. Comparing several metrics gives a more realistic picture of how affordable a city is.",
    },
    {
      question: "Are affordable cities good for remote workers and families?",
      answer:
        "Many affordable US cities can be attractive to remote workers and families because lower housing and everyday costs can reduce monthly expenses. However, internet access, healthcare, schools, safety, transportation, and local amenities should also be considered before moving.",
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

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Affordable US Cities Cost of Living Dataset",
    description:
      "City-level cost of living and affordability data for cities in the United States, including monthly living costs, rent, safety, healthcare, quality of life, and purchasing power.",
    url: PAGE_URL,
    creator: {
      "@type": "Organization",
      name: "WorldLivingCost",
      url: SITE_URL,
    },
    spatialCoverage: {
      "@type": "Country",
      name: "United States",
    },
    variableMeasured: [
      "Average Monthly Cost",
      "Cost of Living Index",
      "Rent Index",
      "Quality of Life Index",
      "Safety Index",
      "Healthcare Index",
      "Purchasing Power Index",
    ],
    temporalCoverage: "2026",
  };

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* JSON-LD                                                             */}
      {/* ------------------------------------------------------------------ */}

      <Script
        id="affordable-us-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <Script
        id="affordable-us-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd),
        }}
      />

      <Script
        id="affordable-us-item-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <Script
        id="affordable-us-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <Script
        id="affordable-us-dataset-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetJsonLd),
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}

      <header className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-sm text-slate-400"
            >
              <Link
                href="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>

              <span className="mx-2">/</span>

              <span className="text-slate-500">
                Affordable US Cities
              </span>
            </nav>

            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Best Affordable Cities to Live in the US
            </h1>

            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl">
              Compare the best affordable places to live in America by
              monthly cost of living, rent, quality of life, safety,
              healthcare, and purchasing power. Find US cities where your
              money can go further.
            </p>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main                                                                */}
      {/* ------------------------------------------------------------------ */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro SEO block */}

        <section className="mb-10 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
            Most Affordable Cities in the US
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            Finding the best affordable city to live in is about more
            than choosing the cheapest rent. Housing, groceries,
            transportation, utilities, healthcare, salaries, safety,
            and quality of life can all change the real cost of living.
          </p>

          <p className="text-sm text-slate-500 leading-relaxed">
            Our affordable city rankings make it easier to compare US
            cities using multiple cost-of-living and lifestyle indicators.
            Use the table below to find inexpensive cities to live in,
            then open an individual city profile for a more detailed
            breakdown of everyday expenses.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Stats                                                             */}
        {/* ---------------------------------------------------------------- */}

        <section
          aria-label="Affordable US cities overview"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-2">
              US Cities
            </p>

            <p className="font-display text-2xl font-bold text-slate-900">
              {usCities.length}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              cities in our current dataset
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-2">
              Lowest Monthly Cost
            </p>

            <p className="font-display text-2xl font-bold text-slate-900">
              {affordableCities.length
                ? formatCurrency(affordableCities[0].avgMonthlyCost)
                : "—"}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              among listed US cities
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-2">
              Ranking Focus
            </p>

            <p className="font-display text-2xl font-bold text-slate-900">
              Affordability
            </p>

            <p className="text-sm text-slate-500 mt-1">
              cost, rent and lifestyle metrics
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Main ranking table                                                */}
        {/* ---------------------------------------------------------------- */}

        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Best Affordable Cities to Live in the USA
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Cities are ordered by average monthly cost of living,
              from lower to higher.
            </p>
          </div>

          {affordableCities.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] data-table">
                <caption className="sr-only">
                  Ranking of affordable cities to live in the United
                  States by monthly cost of living
                </caption>

                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-12">
                      #
                    </th>

                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      City
                    </th>

                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Monthly Cost
                    </th>

                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Cost Index
                    </th>

                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Quality of Life
                    </th>

                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Safety
                    </th>

                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Healthcare
                    </th>

                    <th className="px-5 py-3">
                      <span className="sr-only">
                        City details
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {affordableCities.map((city, index) => (
                    <tr
                      key={city.slug}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4 text-sm text-slate-400 font-medium">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <img
                              src={city.image}
                              alt={`${city.name}, ${city.country}`}
                              width="40"
                              height="40"
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <Link
                              href={`/city/${city.slug}`}
                              className="font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                            >
                              {city.name}
                            </Link>

                            <p className="text-xs text-slate-400">
                              {city.country}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-semibold text-slate-900">
                          {formatCurrency(city.avgMonthlyCost)}
                        </span>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {getAffordabilityLabel(
                            city.avgMonthlyCost
                          )}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="text-sm text-slate-700">
                          {city.costIndex}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-medium text-slate-700">
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
                          className="text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          View City →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-slate-500">
                US city data is currently being added to the
                dataset.
              </p>
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Best quality of life                                              */}
        {/* ---------------------------------------------------------------- */}

        {bestQualityOfLife.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-display font-bold text-slate-900">
                  Affordable Cities With Quality of Life
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Higher quality-of-life scores among US cities.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {bestQualityOfLife.map((city, index) => (
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

                    <span className="text-sm font-semibold text-slate-700">
                      {city.qualityOfLife}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Best value                                                     */}
            {/* ------------------------------------------------------------ */}

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-display font-bold text-slate-900">
                  Best Value Cities
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Cities balancing cost and important lifestyle
                  metrics.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {bestValueCities.map((city, index) => (
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

                    <span className="text-sm font-semibold text-slate-700">
                      {formatCurrency(city.avgMonthlyCost)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* How to choose                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-t border-slate-100 pt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
                How to Find the Best Affordable Place to Live
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                The cheapest city is not always the best affordable
                city. When comparing places to live, look at the total
                monthly budget rather than rent alone. Housing,
                groceries, transportation, utilities, healthcare, and
                everyday services can have a significant impact on your
                monthly expenses.
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                Quality of life also matters. A slightly more expensive
                city may offer better safety, healthcare, infrastructure,
                employment opportunities, or purchasing power. This is
                why our city profiles provide several metrics instead of
                relying on a single affordability number.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
                What Makes a City Affordable?
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                An affordable US city typically combines manageable
                housing costs with reasonable prices for food,
                transportation, utilities, and other essentials. Income
                is another important factor because a lower salary can
                reduce the benefit of cheaper living costs.
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                For that reason, compare the cost of living index with
                average net salary, purchasing power, rent, safety,
                healthcare, and quality of life before deciding where to
                move.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Long-tail SEO content                                             */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-t border-slate-100 pt-12 mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-5">
            Best Affordable Cities for Different Lifestyles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article>
              <h3 className="font-semibold text-slate-800 mb-2">
                Affordable Cities for Families
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                Families looking for affordable places to live should
                consider housing costs, healthcare, transportation,
                safety, and everyday expenses together. A city with
                inexpensive apartments but significantly higher
                transportation or healthcare costs may not provide the
                best overall value.
              </p>
            </article>

            <article>
              <h3 className="font-semibold text-slate-800 mb-2">
                Affordable Cities for Remote Workers
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                Remote workers can often benefit from moving to cities
                with lower housing and everyday costs while keeping
                income from a location-independent job. Internet access,
                lifestyle, safety, transportation, and quality of life
                should also be part of the comparison.
              </p>
            </article>

            <article>
              <h3 className="font-semibold text-slate-800 mb-2">
                Best Inexpensive Cities to Live In
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                Inexpensive cities can reduce monthly expenses, but
                affordability should be measured against the overall
                lifestyle a city provides. Use the rankings above to
                compare monthly costs with quality of life, safety,
                healthcare, and purchasing power.
              </p>
            </article>

            <article>
              <h3 className="font-semibold text-slate-800 mb-2">
                Affordable Cities With a Good Quality of Life
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                The best places to live that are affordable usually
                provide a balance between lower expenses and the things
                that make everyday life comfortable. Comparing multiple
                city metrics helps identify places that offer stronger
                value rather than simply the lowest price.
              </p>
            </article>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                               */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-t border-slate-100 pt-12 mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-7">
            Frequently Asked Questions
          </h2>

          <div className="space-y-7">
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
        {/* Explore More                                                      */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-t border-slate-100 pt-8 pb-4">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
            Explore More Cost of Living Resources
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