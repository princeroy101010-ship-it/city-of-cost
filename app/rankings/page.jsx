import Link from "next/link";
import Script from "next/script";
import { cities, getScoreColor, getScoreLabel } from "../../lib/data";

const SITE_URL = "https://worldlivingcost.com";
const PAGE_URL = `${SITE_URL}/rankings`;
const SITE_NAME = "World Living Cost";
const CURRENT_YEAR = 2026;

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: `Cost of Living Rankings ${CURRENT_YEAR} | Cheapest & Best Cities Worldwide`,

  description:
    `Compare global city cost of living rankings for ${CURRENT_YEAR}. Explore monthly living costs, rent, affordability, quality of life, safety, healthcare, and purchasing power for cities worldwide.`,

  keywords: [
    "cost of living rankings",
    "cost of living rankings by city",
    "cheapest cities to live in 2026",
    "cheapest cities in the world 2026",
    "most affordable cities in the world",
    "best cities to live in 2026",
    "best cities to live worldwide",
    "city cost of living index",
    "cost of living index by city",
    "global city rankings",
    "city affordability ranking",
    "lowest cost of living cities",
    "affordable cities for expats",
    "best cities for expats",
    "cheapest cities for remote workers",
    "best cities for digital nomads",
    "best cities to retire abroad",
    "most livable cities 2026",
    "quality of life city rankings",
    "safest cities in the world",
    "best healthcare cities",
    "cheapest rent cities",
    "monthly cost of living by city",
    "city comparison",
    "cost of living comparison",
    "affordable cities worldwide",
    "cheapest cities in Europe",
    "cheapest cities in Asia",
    "cheapest cities in Latin America",
    "cost of living by country",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: SITE_NAME,
    title: `Cost of Living Rankings ${CURRENT_YEAR} | Cheapest & Best Cities`,
    description:
      `Compare cities worldwide by monthly cost of living, rent, affordability, quality of life, safety, healthcare, and purchasing power.`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Global cost of living rankings ${CURRENT_YEAR}`,
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: `Cost of Living Rankings ${CURRENT_YEAR} | Cheapest & Best Cities`,
    description:
      `Compare global cities by cost of living, rent, quality of life, safety, healthcare, and affordability.`,
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
};

/**
 * Prevent user/data-controlled strings from prematurely closing
 * the JSON-LD script element.
 */
function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RankingsPage() {
  /**
   * Cost ranking:
   * Lowest average monthly cost = most affordable.
   */
  const sortedByCost = [...cities].sort(
    (a, b) => a.avgMonthlyCost - b.avgMonthlyCost
  );

  /**
   * Quality-of-life ranking:
   * Highest quality-of-life score = highest ranked.
   */
  const sortedByQOL = [...cities].sort(
    (a, b) => b.qualityOfLife - a.qualityOfLife
  );

  const cheapestCities = sortedByCost.slice(0, 5);
  const bestQualityCities = sortedByQOL.slice(0, 5);

  const metrics = [
    {
      label: "Most Affordable Cities",
      description: "Cities with the lowest average monthly living costs.",
      cities: cheapestCities,
      valueKey: "avgMonthlyCost",
      format: (value) => `$${value.toLocaleString()}/mo`,
    },
    {
      label: "Best Quality of Life",
      description: "Cities with the highest quality-of-life scores.",
      cities: bestQualityCities,
      valueKey: "qualityOfLife",
      format: (value) => `Score: ${value}`,
    },
  ];

  /*
   * ─────────────────────────────────────────────
   * JSON-LD: BreadcrumbList
   * ─────────────────────────────────────────────
   */
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
        name: "City Rankings",
        item: PAGE_URL,
      },
    ],
  };

  /*
   * ─────────────────────────────────────────────
   * JSON-LD: CollectionPage
   * ─────────────────────────────────────────────
   */
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: `Global Cost of Living City Rankings ${CURRENT_YEAR}`,
    description:
      `Compare cities worldwide by monthly cost of living, affordability, quality of life, safety, healthcare, and purchasing power.`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
    },
    about: {
      "@type": "Thing",
      name: "Cost of living",
    },
    inLanguage: "en-US",
  };

  /*
   * ─────────────────────────────────────────────
   * JSON-LD: ItemList
   * ─────────────────────────────────────────────
   */
  const rankingsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#rankings`,
    name: `Global Cost of Living City Rankings ${CURRENT_YEAR}`,
    description:
      "Cities ranked by average monthly cost of living, affordability, and quality of life.",
    url: PAGE_URL,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: sortedByCost.length,
    itemListElement: sortedByCost.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: city.name,
      url: `${SITE_URL}/city/${city.slug}`,
    })),
  };

  /*
   * ─────────────────────────────────────────────
   * JSON-LD: Dataset
   * ─────────────────────────────────────────────
   */
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${PAGE_URL}#dataset`,
    name: `Global City Cost of Living Rankings ${CURRENT_YEAR}`,
    description:
      "City-level cost of living data including average monthly cost, cost index, quality of life, safety, healthcare, rent, and purchasing power.",
    url: PAGE_URL,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    temporalCoverage: `${CURRENT_YEAR}`,
    spatialCoverage: {
      "@type": "Place",
      name: "Worldwide",
    },
    numberOfItems: cities.length,
    variableMeasured: [
      "Average Monthly Cost",
      "Cost of Living Index",
      "Quality of Life Index",
      "Safety Index",
      "Healthcare Index",
      "Rent Index",
      "Purchasing Power Index",
    ],
  };

  /*
   * ─────────────────────────────────────────────
   * JSON-LD: FAQPage
   * ─────────────────────────────────────────────
   */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which cities have the lowest cost of living?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The lowest-cost cities vary as prices and exchange rates change. Cities in South and Southeast Asia and other emerging markets frequently appear among the more affordable destinations. Use the rankings table to compare current city-level monthly costs.",
        },
      },
      {
        "@type": "Question",
        name: "What is a cost of living index?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A cost of living index measures how expensive it is to live in one location relative to a benchmark. On this website, the city data includes a cost index alongside estimated monthly living costs so users can compare destinations more easily.",
        },
      },
      {
        "@type": "Question",
        name: "Which cities are best for expats and remote workers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best cities for expats and remote workers depend on budget, safety, healthcare, infrastructure, internet access, lifestyle, and visa requirements. Affordable cities with strong infrastructure can offer a useful balance for people planning an international move.",
        },
      },
      {
        "@type": "Question",
        name: "How are the city rankings calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The rankings compare city-level indicators such as average monthly living costs, cost of living index, quality of life, safety, and healthcare. Individual city pages provide additional cost and lifestyle information where available.",
        },
      },
      {
        "@type": "Question",
        name: "How can I compare two cities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the city comparison tool to compare destinations side by side. You can also open an individual city page from the rankings table for a more detailed breakdown of living costs and quality-of-life indicators.",
        },
      },
    ],
  };

  return (
    <>
      {/* ─────────────────────────────────────────────
          Structured Data
      ───────────────────────────────────────────── */}

      <Script
        id="rankings-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbJsonLd),
        }}
      />

      <Script
        id="rankings-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(collectionPageJsonLd),
        }}
      />

      <Script
        id="rankings-item-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(rankingsJsonLd),
        }}
      />

      <Script
        id="rankings-dataset-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(datasetJsonLd),
        }}
      />

      <Script
        id="rankings-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(faqJsonLd),
        }}
      />

      {/* ─────────────────────────────────────────────
          Hero
      ───────────────────────────────────────────── */}

      <header className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm font-medium text-blue-600 mb-2">
            Global Cost of Living Guide {CURRENT_YEAR}
          </p>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Global City Rankings
          </h1>

          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Compare the cost of living in cities worldwide by monthly expenses,
            affordability, quality of life, safety, and healthcare. Explore
            city-level rankings to find affordable places to live, work,
            study, retire, or relocate.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ─────────────────────────────────────────────
            Rankings Intro
        ───────────────────────────────────────────── */}

        <section className="mb-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
            Cost of Living Rankings by City
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed max-w-4xl">
            Our city rankings help you compare destinations based on average
            monthly living costs and important quality-of-life indicators.
            Whether you are looking for the cheapest cities to live in,
            affordable destinations for expats, or cities with a high quality
            of life, the table below provides a quick starting point for
            comparing locations around the world.
          </p>
        </section>

        {/* ─────────────────────────────────────────────
            All Cities Table
        ───────────────────────────────────────────── */}

        <section
          aria-labelledby="all-cities-heading"
          className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2
                id="all-cities-heading"
                className="font-display font-bold text-slate-900"
              >
                All Cities
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Compare monthly cost, affordability, safety, healthcare, and
                quality of life.
              </p>
            </div>

            <span className="text-sm text-slate-500 whitespace-nowrap">
              {cities.length} cities
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full data-table min-w-[760px]">
              <caption className="sr-only">
                Global city cost of living rankings showing monthly cost, cost
                index, quality of life, safety, and healthcare.
              </caption>

              <thead>
                <tr className="bg-slate-50">
                  <th
                    scope="col"
                    className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-10"
                  >
                    #
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

                  <th
                    scope="col"
                    className="px-5 py-3"
                    aria-label="City details"
                  />
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {cities.map((city, index) => (
                  <tr
                    key={city.slug}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-sm text-slate-400 font-medium">
                      {index + 1}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <img
                            src={city.image}
                            alt={`${city.name}, ${city.country}`}
                            width={36}
                            height={36}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-sm text-slate-900">
                            {city.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {city.country}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-semibold text-slate-900">
                        ${city.avgMonthlyCost.toLocaleString()}
                      </span>

                      <span className="block text-[11px] text-slate-400">
                        per month
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-slate-700">
                        {city.costIndex}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <span
                        className="score-badge"
                        style={getScoreColor(city.qualityOfLife)}
                        title={getScoreLabel(city.qualityOfLife)}
                      >
                        {city.qualityOfLife}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-slate-700">
                        {city.safety}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-slate-700">
                        {city.healthcare}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/city/${city.slug}`}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800"
                        aria-label={`View cost of living details for ${city.name}`}
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Quick Rankings
        ───────────────────────────────────────────── */}

        <section
          aria-labelledby="quick-rankings-heading"
          className="mb-14"
        >
          <div className="mb-6">
            <h2
              id="quick-rankings-heading"
              className="font-display text-2xl font-bold text-slate-900"
            >
              Quick City Rankings
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Find the most affordable cities and destinations with the
              strongest quality-of-life scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-display font-bold text-slate-900">
                    {metric.label}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {metric.description}
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  {metric.cities.map((city, index) => (
                    <Link
                      key={city.slug}
                      href={`/city/${city.slug}`}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
                      aria-label={`View ${city.name} cost of living details`}
                    >
                      <span className="text-slate-400 font-bold text-sm w-5">
                        {index + 1}
                      </span>

                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={city.image}
                          alt={`${city.name}, ${city.country}`}
                          width={32}
                          height={32}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900">
                          {city.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {city.country}
                        </p>
                      </div>

                      <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                        {metric.format(city[metric.valueKey])}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            FAQ
        ───────────────────────────────────────────── */}

        <section
          aria-labelledby="faq-heading"
          className="mt-14 border-t border-slate-100 pt-14"
        >
          <h2
            id="faq-heading"
            className="font-display text-2xl font-bold text-slate-900 mb-6"
          >
            Frequently Asked Questions About City Rankings
          </h2>

          <div className="space-y-7 max-w-4xl">
            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                Which cities have the lowest cost of living?
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                The cheapest cities to live in can change as local prices,
                exchange rates, rent, and other expenses change. Cities in
                South and Southeast Asia and other emerging markets frequently
                offer lower living costs. Use the rankings table above to
                compare the monthly cost of living for individual cities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                What is a cost of living index?
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                A cost of living index measures the relative expense of living
                in one location compared with a benchmark. It can help you
                understand whether everyday expenses such as housing, food,
                transportation, and services are relatively affordable or
                expensive.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                Which cities are best for expats and remote workers?
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                The best cities for expats and remote workers depend on your
                budget and priorities. Affordability, internet access, safety,
                healthcare, infrastructure, lifestyle, and visa requirements
                are all important factors when choosing an international
                destination.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                How are the city rankings calculated?
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                The rankings compare city-level indicators including average
                monthly living costs, cost of living index, quality of life,
                safety, and healthcare. Individual city pages provide more
                detailed information for users researching a particular
                destination.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                How can I compare two cities?
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                You can use the{" "}
                <Link
                  href="/compare"
                  className="text-blue-600 hover:underline"
                >
                  city comparison tool
                </Link>{" "}
                to compare destinations side by side. You can also open any
                city from the rankings table to see its individual cost of
                living information.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Understanding Rankings
        ───────────────────────────────────────────── */}

        <section
          aria-labelledby="understanding-rankings-heading"
          className="mt-14 border-t border-slate-100 pt-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2
                id="understanding-rankings-heading"
                className="font-display text-xl font-bold text-slate-900 mb-3"
              >
                How to Read the City Rankings
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Each city in the rankings table includes an average monthly
                cost, cost index, quality-of-life score, safety score, and
                healthcare score. Monthly cost provides a simple estimate of
                typical living expenses, while the other indicators help put
                affordability into the context of everyday life.
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                A lower monthly cost can make a destination attractive for
                budget-conscious residents, but affordability should not be
                considered in isolation. Rent, transportation, healthcare,
                safety, infrastructure, and purchasing power can all influence
                the real value of living in a city.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                Why City Rankings Matter
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Comparing cities side by side can help expats, remote workers,
                students, retirees, and families narrow down potential
                destinations before relocating. A low-cost city may be ideal
                for one person while another may prioritize healthcare,
                safety, infrastructure, or quality of life.
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                For a more detailed comparison, visit our{" "}
                <Link
                  href="/compare"
                  className="text-blue-600 hover:underline"
                >
                  city comparison tool
                </Link>{" "}
                and compare the destinations that interest you.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Regional Cost of Living
        ───────────────────────────────────────────── */}

        <section
          aria-labelledby="regional-cost-heading"
          className="mt-14 border-t border-slate-100 pt-14"
        >
          <h2
            id="regional-cost-heading"
            className="font-display text-xl font-bold text-slate-900 mb-6"
          >
            Cost of Living by Region
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                Asia
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                Many cities across South and Southeast Asia are known for
                relatively affordable housing, food, transportation, and daily
                services. Cities in countries such as Vietnam, India,
                Bangladesh, Pakistan, and Thailand are frequently considered by
                people seeking lower living costs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                Europe
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                European cities cover a broad range of living costs. Eastern
                and Southeastern European destinations can be more affordable,
                while major Western and Northern European cities often have
                substantially higher housing and everyday expenses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                Latin America
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                Latin American cities can offer a balance of living costs,
                climate, culture, and urban amenities. Affordability varies
                significantly between countries and individual cities, making
                city-level comparisons particularly useful.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">
                North America and Oceania
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                Major cities in North America and Oceania can have higher
                housing and living expenses, although they may also offer
                strong infrastructure, healthcare access, employment
                opportunities, and quality-of-life advantages.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            Methodology / Data Context
        ───────────────────────────────────────────── */}

        <section
          id="methodology"
          aria-labelledby="methodology-heading"
          className="mt-14 border-t border-slate-100 pt-14"
        >
          <h2
            id="methodology-heading"
            className="font-display text-xl font-bold text-slate-900 mb-3"
          >
            City Ranking Methodology
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed max-w-4xl mb-4">
            City rankings should be used as a comparison guide rather than a
            guarantee of the exact amount an individual will spend. Actual
            living costs vary according to neighborhood, housing type,
            household size, lifestyle, transportation choices, and personal
            spending habits.
          </p>

          <p className="text-sm text-slate-500 leading-relaxed max-w-4xl">
            For the most useful relocation research, compare the overall city
            ranking with individual categories such as rent, food,
            transportation, healthcare, safety, and purchasing power. Visit
            the relevant city page for additional details before making
            financial or relocation decisions.
          </p>
        </section>

        {/* ─────────────────────────────────────────────
            Internal Links
        ───────────────────────────────────────────── */}

        <nav
          aria-labelledby="explore-more-heading"
          className="mt-14 border-t border-slate-100 pt-8 pb-4"
        >
          <h2
            id="explore-more-heading"
            className="font-display text-lg font-bold text-slate-900 mb-4"
          >
            Explore More
          </h2>

          <div className="flex flex-wrap gap-3">
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
        </nav>
      </main>
    </>
  );
}