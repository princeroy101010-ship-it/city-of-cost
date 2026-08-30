import Link from "next/link";
import { cities } from "../../lib/data";
import ContinentFilter from "../../components/ContinentFilter";

const SITE_URL = "https://worldlivingcost.com";
const PAGE_URL = `${SITE_URL}/country`;

const SITE_NAME = "WorldLivingCost";

const PAGE_TITLE = "Cost of Living by Country | 195 Countries Ranked";

const PAGE_DESCRIPTION =
  "Compare the cost of living by country with monthly expenses, rent, salaries, purchasing power, safety, and quality of life across 195 countries.";

const BUILD_DATE = "2026-07-04";
const LAST_UPDATED = "July 4, 2026";

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

export const metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: SITE_NAME,

    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cost of Living by Country - 195 Countries Compared",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Compare cost of living, monthly expenses, rent, salaries, safety, and quality of life across countries worldwide.",
    images: [`${SITE_URL}/og-image.png`],
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

export const revalidate = 86400;

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function makeCountrySlug(countryName) {
  return String(countryName || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function averageValue(countryCities, property) {
  if (!countryCities.length) {
    return 0;
  }

  const total = countryCities.reduce((sum, city) => {
    return sum + (Number(city?.[property]) || 0);
  }, 0);

  return Math.round(total / countryCities.length);
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default function CountriesPage() {
  /*
  |--------------------------------------------------------------------------
  | Build countries from city dataset
  |--------------------------------------------------------------------------
  */

  const byCountry = {};

  for (const city of Array.isArray(cities) ? cities : []) {
    if (!city || !city.country) {
      continue;
    }

    const countryName = String(city.country).trim();

    if (!countryName) {
      continue;
    }

    if (!byCountry[countryName]) {
      byCountry[countryName] = {
        country: countryName,
        countryCode: city.countryCode || "",
        continent: city.continent || "",
        currency: city.currency || "",
        image: city.image || "",
        cities: [],
      };
    }

    byCountry[countryName].cities.push(city);
  }

  /*
  |--------------------------------------------------------------------------
  | Calculate country-level statistics
  |--------------------------------------------------------------------------
  */

  const countries = Object.values(byCountry)
    .map((countryData) => {
      const countryCities = Array.isArray(countryData.cities)
        ? countryData.cities
        : [];

      if (!countryCities.length) {
        return null;
      }

      const countrySlug = makeCountrySlug(countryData.country);

      return {
        ...countryData,

        slug: countryCities[0]?.slug || countrySlug,

        countrySlug,

        avgCost: averageValue(
          countryCities,
          "avgMonthlyCost"
        ),

        avgQOL: averageValue(
          countryCities,
          "qualityOfLife"
        ),

        avgSafety: averageValue(
          countryCities,
          "safety"
        ),
      };
    })
    .filter(Boolean);

  /*
  |--------------------------------------------------------------------------
  | Basic collections
  |--------------------------------------------------------------------------
  */

  const countryCount = countries.length;

  const continents = [
    "All",
    ...Array.from(
      new Set(
        countries
          .map((country) => country.continent)
          .filter(Boolean)
      )
    ),
  ];

  /*
  |--------------------------------------------------------------------------
  | Country rankings
  |--------------------------------------------------------------------------
  */

  const cheapestCountries = [...countries]
    .sort((a, b) => a.avgCost - b.avgCost)
    .slice(0, 20);

  const mostExpensiveCountries = [...countries]
    .sort((a, b) => b.avgCost - a.avgCost)
    .slice(0, 20);

  const safestCountries = [...countries]
    .sort((a, b) => b.avgSafety - a.avgSafety)
    .slice(0, 20);

  const highestQualityCountries = [...countries]
    .sort((a, b) => b.avgQOL - a.avgQOL)
    .slice(0, 6);

  const cheapestNames = cheapestCountries
    .slice(0, 6)
    .map((country) => country.country);

  /*
  |--------------------------------------------------------------------------
  | Retirement countries
  |--------------------------------------------------------------------------
  */

  const cheapestRetirementCountries = [...countries]
    .filter((country) => country.avgQOL >= 55)
    .sort((a, b) => a.avgCost - b.avgCost)
    .slice(0, 6)
    .map((country) => country.country);

  /*
  |--------------------------------------------------------------------------
  | Regional rankings
  |--------------------------------------------------------------------------
  */

  const europeCheapest = [...countries]
    .filter((country) => country.continent === "Europe")
    .sort((a, b) => a.avgCost - b.avgCost)
    .slice(0, 9)
    .map((country) => country.country);

  const asiaCheapest = [...countries]
    .filter((country) => country.continent === "Asia")
    .sort((a, b) => a.avgCost - b.avgCost)
    .slice(0, 9)
    .map((country) => country.country);

  /*
  |--------------------------------------------------------------------------
  | FAQ data
  |--------------------------------------------------------------------------
  */

  const cheapest10 =
    cheapestCountries
      .slice(0, 10)
      .map((country) => country.country)
      .join(", ") || "the countries listed in the rankings";

  /*
  |--------------------------------------------------------------------------
  | Popular cities
  |--------------------------------------------------------------------------
  */

  const popularCitiesSeen = new Set();
  const popularCities = [];

  for (const city of Array.isArray(cities) ? cities : []) {
    if (
      city?.slug &&
      city?.country &&
      !popularCitiesSeen.has(city.country)
    ) {
      popularCitiesSeen.add(city.country);
      popularCities.push(city);
    }

    if (popularCities.length >= 24) {
      break;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | JSON-LD IDs
  |--------------------------------------------------------------------------
  */

  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const webpageId = `${PAGE_URL}#webpage`;
  const collectionId = `${PAGE_URL}#collection`;
  const countryListId = `${PAGE_URL}#country-list`;
  const breadcrumbId = `${PAGE_URL}#breadcrumb`;

  /*
  |--------------------------------------------------------------------------
  | Organization schema
  |--------------------------------------------------------------------------
  */

  const organizationJsonLd = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
  };

  /*
  |--------------------------------------------------------------------------
  | Website schema
  |--------------------------------------------------------------------------
  */

  const websiteJsonLd = {
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE_NAME,
    url: SITE_URL,

    publisher: {
      "@id": organizationId,
    },
  };

  /*
  |--------------------------------------------------------------------------
  | WebPage schema
  |--------------------------------------------------------------------------
  */

  const webpageJsonLd = {
    "@type": "WebPage",
    "@id": webpageId,

    name: PAGE_TITLE,

    url: PAGE_URL,

    description:
      "Compare cost of living by country, including monthly expenses, rent, salaries, purchasing power, safety, and quality of life.",

    datePublished: "2025-01-01",

    dateModified: BUILD_DATE,

    isPartOf: {
      "@id": websiteId,
    },

    publisher: {
      "@id": organizationId,
    },

    about: [
      {
        "@type": "Thing",
        name: "Cost of Living",
      },
      {
        "@type": "Thing",
        name: "Cost of Living Index",
      },
      {
        "@type": "Thing",
        name: "Quality of Life",
      },
      {
        "@type": "Thing",
        name: "Safety Index",
      },
    ],
  };

  /*
  |--------------------------------------------------------------------------
  | Breadcrumb schema
  |--------------------------------------------------------------------------
  */

  const breadcrumbJsonLd = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,

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
        name: "Cost of Living by Country",
        item: PAGE_URL,
      },
    ],
  };

  /*
  |--------------------------------------------------------------------------
  | CollectionPage schema
  |--------------------------------------------------------------------------
  */

  const collectionJsonLd = {
    "@type": "CollectionPage",
    "@id": collectionId,

    name: `Cost of Living by Country | ${countryCount} Countries Ranked`,

    description:
      "Compare the cost of living in different countries using average monthly expenses, rent, salaries, quality of life, and safety data.",

    url: PAGE_URL,

    isPartOf: {
      "@id": websiteId,
    },

    publisher: {
      "@id": organizationId,
    },

    breadcrumb: {
      "@id": breadcrumbId,
    },

    mainEntity: {
      "@id": countryListId,
    },
  };

  /*
  |--------------------------------------------------------------------------
  | Country ItemList schema
  |--------------------------------------------------------------------------
  */

  const itemListJsonLd = {
    "@type": "ItemList",
    "@id": countryListId,

    name: "Countries Ranked by Cost of Living",

    description:
      "Countries ranked by average monthly cost of living, quality of life, and safety.",

    numberOfItems: countryCount,

    itemListElement: countries.map((country, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: `Cost of Living in ${country.country}`,

      description:
        `Average monthly cost of living in ${country.country}: $${country.avgCost.toLocaleString()}. ` +
        `Quality of life: ${country.avgQOL}/100. ` +
        `Safety index: ${country.avgSafety}/100.`,

      url: `${SITE_URL}/country/${country.countrySlug}`,
    })),
  };

  /*
  |--------------------------------------------------------------------------
  | FAQ schema
  |--------------------------------------------------------------------------
  */

  const faqJsonLd = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",

        name: "What is the cost of living index by country?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            `A cost of living index compares the relative price of everyday expenses between locations. ` +
            `WorldLivingCost compares countries using average monthly living expenses along with housing, ` +
            `transportation, food, quality of life, and safety data. The current rankings cover ${countryCount} countries.`,
        },
      },

      {
        "@type": "Question",

        name: "What are the cheapest countries to live in?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            `According to the current WorldLivingCost dataset, countries among the lowest average monthly ` +
            `living costs include ${cheapest10}. Actual expenses vary by city, housing, lifestyle, and household size.`,
        },
      },

      {
        "@type": "Question",

        name: "What are the best countries for digital nomads and remote workers?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            "Countries popular with digital nomads and remote workers can combine affordable living costs, " +
            "reliable internet, suitable visas, and established international communities. The best choice " +
            "depends on your budget, location preferences, visa requirements, and lifestyle.",
        },
      },

      {
        "@type": "Question",

        name: "How do I compare the cost of living in different countries?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            "Use WorldLivingCost's country rankings to compare average monthly expenses, or use the city " +
            "comparison tool to compare specific destinations across rent, food, transportation, salaries, " +
            "and other cost categories.",
        },
      },

      {
        "@type": "Question",

        name: "Which European countries have the lowest cost of living?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            `Based on the current WorldLivingCost country dataset, lower-cost European countries include ` +
            `${europeCheapest.join(", ") || "the countries shown in the rankings"}. Costs vary substantially ` +
            `between cities and between housing, food, transportation, and other expenses.`,
        },
      },

      {
        "@type": "Question",

        name: "Which Asian countries have the lowest cost of living?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            `Based on the current WorldLivingCost country dataset, lower-cost Asian countries include ` +
            `${asiaCheapest.join(", ") || "the countries shown in the rankings"}. Individual city costs ` +
            `can differ significantly from country-level averages.`,
        },
      },
    ],
  };

  /*
  |--------------------------------------------------------------------------
  | Main schema graph
  |--------------------------------------------------------------------------
  */

  const schemaGraph = {
    "@context": "https://schema.org",

    "@graph": [
      websiteJsonLd,
      organizationJsonLd,
      webpageJsonLd,
      breadcrumbJsonLd,
      collectionJsonLd,
      itemListJsonLd,
    ],
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* Main structured data */}
      <script
        id="countries-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />

      {/* FAQ structured data */}
      <script
        id="countries-page-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-3">
            Cost of Living by Country: {countryCount} Countries Ranked
          </h1>

          <p className="text-slate-500 max-w-2xl mb-4">
            Compare cost of living by country, including monthly living
            expenses, rent prices, salaries, purchasing power, safety,
            and quality of life rankings. Explore affordable and
            expensive countries to live, work, study, retire, or relocate.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
            <li>✓ {countryCount} countries covered</li>
            <li>✓ Cost of living &amp; rent rankings</li>
            <li>✓ Salaries, purchasing power &amp; safety data</li>
            <li>✓ Dataset updated regularly</li>
          </ul>
        </div>
      </section>

      <main>
        {/* =========================================================
            COUNTRY FILTER
        ========================================================== */}

        <section
          aria-label="Browse countries by continent"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        >
          <ContinentFilter
            continents={continents}
            countries={countries}
          />
        </section>

        {/* =========================================================
            QUICK ANSWER
        ========================================================== */}

        <section
          id="quick-answer"
          className="bg-slate-50 border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-2">
              Cost of Living by Country: Quick Answer
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              The countries with the lowest average living costs in
              the current WorldLivingCost dataset include{" "}
              {cheapestNames.join(", ") || "the lowest-ranked countries"}.
              The most expensive countries include{" "}
              {mostExpensiveCountries
                .slice(0, 6)
                .map((country) => country.country)
                .join(", ") || "the highest-ranked countries"}
              . Use the country rankings below to compare monthly
              living expenses, quality of life, and safety across{" "}
              {countryCount} countries.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-900 mt-6 mb-2">
              Key Takeaways
            </h2>

            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>{countryCount} countries compared</li>
              <li>Average monthly living costs by country</li>
              <li>Rent and cost of living rankings</li>
              <li>Quality of life data</li>
              <li>Safety scores</li>
              <li>Country and city-level comparisons</li>
            </ul>

            <p className="text-xs text-slate-400 mt-4">
              Last updated: {LAST_UPDATED} · Data source:
              WorldLivingCost contributor database.
            </p>
          </div>
        </section>

        {/* =========================================================
            COST OF LIVING INDEX
        ========================================================== */}

        <section
          id="cost-of-living-index"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        >
          <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
            Cost of Living Index by Country
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed max-w-3xl mb-6">
            The cost of living index by country helps show how expensive
            everyday life can be in different destinations. WorldLivingCost
            combines average monthly expenses with housing, transportation,
            groceries, salaries, safety, and quality-of-life information
            to make country-level comparisons easier.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Avg. Monthly Cost</th>
                  <th className="px-4 py-3">Quality of Life</th>
                  <th className="px-4 py-3">Safety</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {cheapestCountries.map((country, index) => (
                  <tr key={country.country}>
                    <td className="px-4 py-2 text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-4 py-2 font-medium text-slate-800">
                      <Link
                        href={`/country/${country.countrySlug}`}
                        className="hover:underline"
                      >
                        {country.country}
                      </Link>
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      ${country.avgCost.toLocaleString()}
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgQOL}/100
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgSafety}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            CHEAPEST COUNTRIES
        ========================================================== */}

        <section
          id="cheapest-countries"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10"
        >
          <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
            Cheapest Countries to Live In
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed max-w-3xl mb-5">
            Looking for affordable countries to live in? The rankings
            below are based on average monthly costs calculated from
            cities in the WorldLivingCost dataset. Actual expenses
            depend on the city, housing choice, household size, and
            lifestyle.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Avg. Monthly Cost</th>
                  <th className="px-4 py-3">Quality of Life</th>
                  <th className="px-4 py-3">Safety</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {cheapestCountries.map((country, index) => (
                  <tr key={country.country}>
                    <td className="px-4 py-2 text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-4 py-2 font-medium text-slate-800">
                      <Link
                        href={`/country/${country.countrySlug}`}
                        className="hover:underline"
                      >
                        {country.country}
                      </Link>
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      ${country.avgCost.toLocaleString()}
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgQOL}/100
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgSafety}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            MOST EXPENSIVE
        ========================================================== */}

        <section
          id="most-expensive-countries"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10"
        >
          <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
            Most Expensive Countries to Live In
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed max-w-3xl mb-5">
            Countries with higher average living costs generally have
            more expensive housing, food, transportation, services,
            or other everyday expenses. Compare the countries below
            using the same dataset and ranking method.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Avg. Monthly Cost</th>
                  <th className="px-4 py-3">Quality of Life</th>
                  <th className="px-4 py-3">Safety</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {mostExpensiveCountries.map((country, index) => (
                  <tr key={country.country}>
                    <td className="px-4 py-2 text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-4 py-2 font-medium text-slate-800">
                      <Link
                        href={`/country/${country.countrySlug}`}
                        className="hover:underline"
                      >
                        {country.country}
                      </Link>
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      ${country.avgCost.toLocaleString()}
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgQOL}/100
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgSafety}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            SAFEST
        ========================================================== */}

        <section
          id="safest-countries"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10"
        >
          <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
            Safest Countries, Ranked
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed max-w-3xl mb-5">
            Compare countries using safety scores alongside average
            monthly living costs and quality-of-life data.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Safety</th>
                  <th className="px-4 py-3">Avg. Monthly Cost</th>
                  <th className="px-4 py-3">Quality of Life</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {safestCountries.map((country, index) => (
                  <tr key={country.country}>
                    <td className="px-4 py-2 text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-4 py-2 font-medium text-slate-800">
                      <Link
                        href={`/country/${country.countrySlug}`}
                        className="hover:underline"
                      >
                        {country.country}
                      </Link>
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgSafety}/100
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      ${country.avgCost.toLocaleString()}
                    </td>

                    <td className="px-4 py-2 text-slate-600">
                      {country.avgQOL}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            GENERAL COUNTRY QUESTIONS
        ========================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                Cost of Living in Different Countries
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                The cost of living in different countries can vary
                significantly depending on housing, food, transportation,
                utilities, healthcare, local salaries, and lifestyle.
                Country-level averages are useful for an initial comparison,
                while city-level data provides a more detailed picture of
                what you may actually spend.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                What Are the Cheapest Countries to Live In?
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed">
                According to the current WorldLivingCost dataset,
                countries among the lowest average monthly living costs
                include{" "}
                {cheapestNames.join(", ") || "the lowest-ranked countries"}.
                Actual expenses vary by city, housing, lifestyle, and
                household size.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                What Are the Best Countries for Remote Workers?
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed">
                The best countries for remote workers and digital nomads
                depend on internet access, visa rules, living costs, time
                zone, infrastructure, and lifestyle. Thailand, Vietnam,
                Georgia, Portugal, and Mexico are popular options, but the
                right destination depends on individual requirements and
                budget.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                What Are the Cheapest Countries to Retire In?
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed">
                {cheapestRetirementCountries.join(", ") ||
                  "Affordable countries in the current dataset"}{" "}
                are among the more affordable countries in the current
                dataset when affordability is considered alongside a
                quality-of-life score. Retirement costs can differ
                substantially between cities and housing choices.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                Which Countries Have the Highest Quality of Life?
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed">
                {highestQualityCountries
                  .map((country) => country.country)
                  .join(", ") ||
                  "The highest-ranked countries"}{" "}
                rank among the highest for quality of life in the current
                WorldLivingCost database. Quality of life is considered
                alongside living costs and safety to give users a broader
                picture of each destination.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            METHODOLOGY
        ========================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-t border-slate-100 pt-14">
          <div className="max-w-3xl space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                How Cost of Living Is Calculated
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed">
                WorldLivingCost calculates country-level living costs
                using city data covering housing, groceries,
                transportation, utilities, dining, healthcare, and
                other everyday expenses. Country averages are calculated
                from the cities represented in the dataset. This makes
                the country rankings useful for broad comparisons while
                city pages provide more specific local information.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                Factors That Affect Cost of Living
              </h2>

              <ul className="text-slate-500 text-sm leading-relaxed space-y-1 list-disc list-inside">
                <li>Housing and rent prices</li>
                <li>Food and grocery prices</li>
                <li>Transportation expenses</li>
                <li>Utility costs</li>
                <li>Healthcare costs</li>
                <li>Average local salaries</li>
                <li>Purchasing power</li>
                <li>Inflation and local price changes</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                Cost of Living vs Quality of Life
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed">
                A low cost of living does not necessarily mean a higher
                quality of life. Affordable countries can differ in
                healthcare, infrastructure, safety, transportation,
                employment opportunities, and public services.
                WorldLivingCost therefore displays quality of life and
                safety alongside average monthly expenses.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            ADDITIONAL SEO CONTENT
        ========================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                Cheapest Countries to Live In
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-2">
                Many countries offer relatively low living costs.
                However, monthly expenses can change considerably
                between major cities, smaller towns, neighborhoods,
                housing types, and lifestyles.
              </p>

              <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside mb-5">
                {cheapestCountries.slice(0, 5).map((country) => (
                  <li key={country.country}>
                    <Link
                      href={`/country/${country.countrySlug}`}
                      className="hover:text-blue-700 hover:underline"
                    >
                      {country.country}
                    </Link>{" "}
                    – approximately $
                    {country.avgCost.toLocaleString()}/month on average
                  </li>
                ))}
              </ul>

              <h2
                id="retirement"
                className="font-display text-xl font-bold text-slate-900 mb-3"
              >
                Best Countries to Retire Abroad
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-2">
                Affordable retirement destinations can offer lower
                housing and everyday expenses while maintaining a
                reasonable quality of life. Use country and city data
                together when planning a move.
              </p>

              <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside">
                {cheapestRetirementCountries.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>

            <div id="remote-workers">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                Top Countries for Remote Workers
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-2">
                Remote workers often consider living costs, internet
                connectivity, visas, transportation, safety, and access
                to international communities when choosing a country.
              </p>

              <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside mb-5">
                <li>Thailand – popular with international remote workers</li>
                <li>Vietnam – affordable living and major cities</li>
                <li>Georgia – popular long-stay destination</li>
                <li>Portugal – strong infrastructure and EU access</li>
                <li>
                  Mexico – popular location for North American remote workers
                </li>
              </ul>

              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                Safest Countries
              </h2>

              <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside mb-5">
                {safestCountries.slice(0, 6).map((country) => (
                  <li key={country.country}>
                    <Link
                      href={`/country/${country.countrySlug}`}
                      className="hover:text-blue-700 hover:underline"
                    >
                      {country.country}
                    </Link>{" "}
                    – safety score {country.avgSafety}/100
                  </li>
                ))}
              </ul>

              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                How to Compare Countries
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed">
                Use{" "}
                <Link
                  href="/compare"
                  className="text-blue-600 hover:underline"
                >
                  the free city comparison tool
                </Link>{" "}
                to compare specific destinations. You can also open
                individual country pages to explore local living costs
                and city-level expenses.
              </p>
            </div>
          </div>

          {/* =========================================================
              REGIONAL OVERVIEW
          ========================================================== */}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Asia */}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                Asia
              </h3>

              <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                {countries
                  .filter(
                    (country) => country.continent === "Asia"
                  )
                  .sort((a, b) => a.avgCost - b.avgCost)
                  .slice(0, 4)
                  .map((country) => (
                    <li key={country.country}>
                      <Link
                        href={`/country/${country.countrySlug}`}
                        className="hover:text-blue-700 hover:underline"
                      >
                        {country.country}
                      </Link>{" "}
                      – ${country.avgCost.toLocaleString()}/month
                    </li>
                  ))}
              </ul>
            </div>

            {/* Europe */}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                Europe
              </h3>

              <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                {countries
                  .filter(
                    (country) => country.continent === "Europe"
                  )
                  .sort((a, b) => a.avgCost - b.avgCost)
                  .slice(0, 4)
                  .map((country) => (
                    <li key={country.country}>
                      <Link
                        href={`/country/${country.countrySlug}`}
                        className="hover:text-blue-700 hover:underline"
                      >
                        {country.country}
                      </Link>{" "}
                      – ${country.avgCost.toLocaleString()}/month
                    </li>
                  ))}
              </ul>
            </div>

            {/* Americas */}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                Americas
              </h3>

              <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                {countries
                  .filter(
                    (country) =>
                      country.continent === "North America" ||
                      country.continent === "South America" ||
                      country.continent === "Americas"
                  )
                  .sort((a, b) => a.avgCost - b.avgCost)
                  .slice(0, 4)
                  .map((country) => (
                    <li key={country.country}>
                      <Link
                        href={`/country/${country.countrySlug}`}
                        className="hover:text-blue-700 hover:underline"
                      >
                        {country.country}
                      </Link>{" "}
                      – ${country.avgCost.toLocaleString()}/month
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* =========================================================
              POPULAR CITY COMPARISONS
          ========================================================== */}

          <div className="mt-8 border-t border-slate-100 pt-8">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
              Popular City Cost Comparisons
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {popularCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm font-semibold text-slate-800">
                    {city.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Cost of living
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* =========================================================
              POPULAR COUNTRIES
          ========================================================== */}

          <div className="mt-8 border-t border-slate-100 pt-8">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
              Popular Countries
            </h2>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {[...countries]
                .sort((a, b) => a.avgCost - b.avgCost)
                .slice(0, 20)
                .map((country) => (
                  <Link
                    key={country.country}
                    href={`/country/${country.countrySlug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Cost of Living in {country.country}
                  </Link>
                ))}
            </div>
          </div>

          {/* =========================================================
              INTERNAL LINKS
          ========================================================== */}

          <div className="mt-8 border-t border-slate-100 pt-8">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
              Explore More Cost of Living Data
            </h2>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {popularCities[0]?.slug ? (
                <Link
                  href={`/city/${popularCities[0].slug}`}
                  className="text-blue-600 hover:underline"
                >
                  Cost of Living by City
                </Link>
              ) : null}

              <Link
                href="/country"
                className="text-blue-600 hover:underline"
              >
                Cost of Living by Country
              </Link>

              <Link
                href="/cost-of-living-calculator"
                className="text-blue-600 hover:underline"
              >
                Cost of Living Calculator
              </Link>

              <Link
                href="/compare"
                className="text-blue-600 hover:underline"
              >
                Compare Cities
              </Link>

              <a
                href="#cost-of-living-index"
                className="text-blue-600 hover:underline"
              >
                Cost of Living Index
              </a>

              <a
                href="#cheapest-countries"
                className="text-blue-600 hover:underline"
              >
                Cheapest Countries
              </a>

              <a
                href="#most-expensive-countries"
                className="text-blue-600 hover:underline"
              >
                Most Expensive Countries
              </a>

              <a
                href="#remote-workers"
                className="text-blue-600 hover:underline"
              >
                Digital Nomad Countries
              </a>

              <a
                href="#retirement"
                className="text-blue-600 hover:underline"
              >
                Retirement Countries
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}