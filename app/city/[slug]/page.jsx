import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

import {
  cities,
  getCityBySlug,
  getScoreLabel,
} from "../../../lib/data";

import { ScoreBar } from "../../../components/ScoreBar";
import CostTable from "../../../components/CostTable";

const SITE_URL = "https://worldlivingcost.com";
const SITE_NAME = "WorldLivingCost";

/*
 * Keep this static.
 * Update manually when you genuinely update the SEO/content year.
 */
const SEO_YEAR = 2026;

/*
 * Only use this if the dataset was actually updated on this date.
 * Do NOT use new Date() here.
 */
const DATASET_MODIFIED = "2026-08-01";

export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return {};
  }

  const cityName = city.name;
  const countryName = city.country;

  const canonicalUrl = `${SITE_URL}/city/${city.slug}`;

  const title =
    `Cost of Living in ${cityName} (${SEO_YEAR}) | Rent, Prices & Salary`;

  const description =
    `Cost of living in ${cityName}, ${countryName}: average monthly expenses, rent, groceries, transportation, utilities and salary. Compare ${cityName} living costs and quality of life.`;

  return {
    title,
    description,

    /*
     * Keep keywords tightly relevant.
     * They are not a primary Google ranking mechanism,
     * so don't stuff hundreds of variations here.
     */
    keywords: [
      `cost of living in ${cityName}`,
      `cost of living ${cityName}`,
      `${cityName} cost of living`,
      `${cityName} monthly expenses`,
      `${cityName} living expenses`,
      `${cityName} rent prices`,
      `average salary in ${cityName}`,
      `is ${cityName} expensive to live in`,
      `${cityName} cost of living comparison`,
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "article",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",

      images: [
        {
          url: city.image,
          width: 1200,
          height: 630,
          alt: `Cost of living in ${cityName}, ${countryName}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [city.image],
    },
  };
}

const scoreMetrics = [
  {
    key: "qualityOfLife",
    label: "Quality of Life",
  },
  {
    key: "purchasingPower",
    label: "Purchasing Power",
  },
  {
    key: "safety",
    label: "Safety",
  },
  {
    key: "healthcare",
    label: "Healthcare",
  },
  {
    key: "climate",
    label: "Climate",
  },
  {
    key: "trafficCommute",
    label: "Traffic & Commute",
  },
];

const categoryIcons = {
  restaurants: "🍽️",
  markets: "🛒",
  transport: "🚌",
  utilities: "💡",
  housing: "🏠",
  salaries: "💼",
};

const categoryLabels = {
  restaurants: "Restaurants",
  markets: "Markets & Groceries",
  transport: "Transportation",
  utilities: "Utilities & Services",
  housing: "Rent & Housing",
  salaries: "Salaries & Income",
};

export default async function CityPage({ params }) {
  const { slug } = await params;

  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/city/${city.slug}`;

  const cityName = city.name;
  const countryName = city.country;

  const averageMonthlyCost =
    city.avgMonthlyCost.toLocaleString();

  const averageSalary =
    city.categories.salaries["Average Net Salary"].toLocaleString();

  const outsideRent =
    city.categories.housing["1BR Outside"].toLocaleString();

  const centerRent =
    city.categories.housing["1BR Center"].toLocaleString();

  const centerThreeBedroom =
    city.categories.housing["3BR Center"].toLocaleString();

  /*
   * ============================================================
   * STRUCTURED DATA
   * ============================================================
   *
   * One graph is cleaner than many independent scripts.
   */

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,

        name:
          `Cost of Living in ${cityName} (${SEO_YEAR})`,

        description:
          `Cost of living information for ${cityName}, ${countryName}, including rent, groceries, transportation, utilities, salaries and quality of life.`,

        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },

        about: {
          "@id": `${canonicalUrl}#city`,
        },

        breadcrumb: {
          "@id": `${canonicalUrl}#breadcrumb`,
        },

        inLanguage: "en",
      },

      {
        "@type": "City",
        "@id": `${canonicalUrl}#city`,

        name: cityName,

        url: canonicalUrl,

        description:
          `Cost of living in ${cityName}, ${countryName}. Average monthly living cost is $${averageMonthlyCost}, with a cost index of ${city.costIndex} and quality of life score of ${city.qualityOfLife}/100.`,

        image: city.image,

        containedInPlace: {
          "@type": "Country",
          name: countryName,
        },

        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressCountry: countryName,
        },
      },

      {
        "@type": "Dataset",
        "@id": `${canonicalUrl}#dataset`,

        name:
          `${cityName} Cost of Living Data`,

        description:
          `Cost of living data for ${cityName}, including housing, groceries, transportation, utilities, salaries, purchasing power and quality of life.`,

        url: canonicalUrl,

        isAccessibleForFree: true,

        dateModified: DATASET_MODIFIED,

        creator: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },

        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },

        keywords: [
          `cost of living in ${cityName}`,
          `${cityName} rent`,
          `${cityName} salary`,
          `${cityName} living expenses`,
          `${cityName} cost of living`,
        ],
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,

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
            item: `${SITE_URL}/rankings`,
          },

          {
            "@type": "ListItem",
            position: 3,
            name:
              `Cost of Living in ${cityName}`,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* ========================================================
          JSON-LD
      ======================================================== */}

      <Script
        id="city-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* ========================================================
          BREADCRUMB
      ======================================================== */}

      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-500"
          >
            <Link
              href="/"
              className="hover:text-slate-900"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href="/rankings"
              className="hover:text-slate-900"
            >
              City Rankings
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-slate-900 font-medium">
              {cityName}
            </span>
          </nav>
        </div>
      </div>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="relative bg-white">
        <div className="relative h-64 sm:h-80">
          <Image
            src={city.image}
            alt={`Cost of living in ${cityName}, ${countryName}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Cost of Living in {cityName}, {countryName}
                </h1>

                <p className="text-white/80 mt-1">
                  {countryName} · {city.continent}
                </p>
              </div>

              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Compare Cities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          QUICK ANSWER
      ======================================================== */}

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
        aria-labelledby="quick-answer-heading"
      >
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h2
            id="quick-answer-heading"
            className="font-display text-xl font-bold text-slate-900 mb-3"
          >
            Cost of Living in {cityName}: Quick Answer
          </h2>

          <p className="text-slate-700 leading-relaxed">
            The average cost of living in {cityName},{" "}
            {countryName} is approximately $
            {averageMonthlyCost} per month for one person.
            This page covers rent, groceries, transportation,
            utilities, salaries and quality of life. The cost
            of living index is {city.costIndex}, using New York
            City as the 100-point benchmark.
          </p>
        </div>
      </section>

      {/* ========================================================
          QUICK STATS
      ======================================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            {
              label: "Monthly Cost",
              value: `$${averageMonthlyCost}`,
              sub: "avg/person",
            },
            {
              label: "Cost Index",
              value: city.costIndex,
              sub: "NYC = 100",
            },
            {
              label: "Rent Index",
              value: city.rentIndex,
              sub: "NYC = 100",
            },
            {
              label: "Quality of Life",
              value: city.qualityOfLife,
              sub: getScoreLabel(city.qualityOfLife),
            },
            {
              label: "Safety Index",
              value: city.safety,
              sub: getScoreLabel(city.safety),
            },
            {
              label: "Population",
              value: city.population,
              sub: city.currency,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center"
            >
              <p className="text-xl font-display font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="text-xs font-medium text-slate-700 mt-0.5">
                {stat.label}
              </p>

              <p className="text-xs text-slate-400">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ======================================================
            MAIN DATA AREA
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SIDEBAR */}

          <aside className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-24">
              <h2 className="font-display font-bold text-slate-900 mb-4">
                {cityName} Quality of Life
              </h2>

              <div className="space-y-3">
                {scoreMetrics.map((metric) => (
                  <ScoreBar
                    key={metric.key}
                    label={metric.label}
                    value={city[metric.key]}
                  />
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Currency
                </h3>

                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded">
                    {city.currency}
                  </span>

                  <span className="text-xs text-slate-500">
                    Prices shown in USD
                  </span>
                </div>
              </div>

              <div className="mt-5 text-xs text-slate-400 leading-relaxed">
                <p>
                  Data is collected from contributors and
                  public sources.
                </p>

                <p className="mt-1">
                  Data is reviewed monthly.
                </p>

                <p className="mt-1">
                  Prices are indicative.
                </p>
              </div>
            </div>
          </aside>

          {/* COST TABLES */}

          <section className="lg:col-span-2 space-y-5">
            {Object.entries(city.categories).map(
              ([key, items]) => (
                <CostTable
                  key={key}
                  icon={categoryIcons[key]}
                  title={categoryLabels[key]}
                  items={items}
                  category={key}
                />
              )
            )}
          </section>
        </div>

        {/* ======================================================
            COUNTRY LINK
        ====================================================== */}

        <div className="mt-6">
          <Link
            href={`/country/${city.countrySlug}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Cost of Living in {countryName}
          </Link>
        </div>

        {/* ======================================================
            PRIMARY SEO CONTENT
        ====================================================== */}

        <section
          className="mt-10 bg-white border border-slate-200 rounded-xl p-6"
          aria-labelledby="city-guide-heading"
        >
          <h2
            id="city-guide-heading"
            className="font-display text-2xl font-bold text-slate-900 mb-5"
          >
            Cost of Living in {cityName}: Complete Guide
          </h2>

          <div className="prose prose-slate max-w-none">
            <p>
              The cost of living in {cityName},{" "}
              {countryName}, depends mainly on housing,
              transportation, food, utilities and lifestyle.
              The estimated monthly cost for one person is $
              {averageMonthlyCost}. The city's cost of living
              index is {city.costIndex}, compared with a New
              York City benchmark of 100.
            </p>

            <h3>
              Monthly Expenses in {cityName}
            </h3>

            <p>
              A typical monthly budget in {cityName} includes
              rent, groceries, transportation, utilities and
              other everyday expenses. Housing is usually one
              of the largest parts of the monthly budget.
            </p>

            <h3>
              Rent and Housing Costs in {cityName}
            </h3>

            <p>
              A one-bedroom apartment outside the city center
              costs approximately ${outsideRent} per month,
              while a one-bedroom apartment in the city center
              costs around ${centerRent}. A three-bedroom
              apartment in the center averages $
              {centerThreeBedroom} per month.
            </p>

            <h3>
              Average Salary in {cityName}
            </h3>

            <p>
              The average net salary in {cityName} is
              approximately ${averageSalary} per month.
              Purchasing power is rated {city.purchasingPower}
              out of 100.
            </p>

            <h3>
              Is {cityName} Expensive to Live In?
            </h3>

            <p>
              With a cost of living index of {city.costIndex},
              {cityName} is{" "}
              {city.costIndex < 100
                ? "less expensive than the New York City benchmark."
                : "more expensive than the New York City benchmark."}
              {" "}
              Housing, groceries and transportation are
              important factors when comparing the total
              monthly cost.
            </p>
          </div>
        </section>

        {/* ======================================================
            QUALITY OF LIFE
        ====================================================== */}

        <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">
            Quality of Life in {cityName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Safety
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {cityName} has a safety score of{" "}
                {city.safety}/100. Safety is one of the
                factors to consider when comparing living
                costs and choosing a city.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Healthcare
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Healthcare in {cityName} is rated{" "}
                {city.healthcare}/100. Healthcare access and
                medical costs can affect the total monthly
                budget for residents and families.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Climate
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                The climate index for {cityName} is{" "}
                {city.climate}/100. Climate and seasonal
                conditions can influence housing, transport
                and lifestyle expenses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Purchasing Power
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {cityName} has a purchasing power score of{" "}
                {city.purchasingPower}/100. Comparing salary
                levels with living expenses provides a better
                picture of affordability than looking at rent
                alone.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            WHO IS THIS CITY FOR?
        ====================================================== */}

        <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">
            Living in {cityName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Cost of Living for Students
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Students should budget for accommodation,
                food, transportation, utilities and study
                expenses. Shared housing and public
                transportation may reduce monthly expenses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Cost of Living for Expats
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Expats considering {cityName} should compare
                rent, healthcare, transportation, taxes,
                groceries and salary levels before relocating.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Cost of Living for Remote Workers
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Remote workers can compare housing,
                transportation, internet, food and purchasing
                power to estimate whether {cityName} fits
                their monthly budget.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Is {cityName} Affordable?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Affordability depends on income and housing
                choices. The cost index of {city.costIndex}
                provides a useful benchmark when comparing{" "}
                {cityName} with other cities.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            KEY FACTS
        ====================================================== */}

        <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">
            Key Cost of Living Facts for {cityName}
          </h2>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <dt className="text-xs text-slate-500">
                Average Monthly Cost
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                ${averageMonthlyCost}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">
                Cost Index
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                {city.costIndex}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">
                Rent Index
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                {city.rentIndex}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">
                Average Net Salary
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                ${averageSalary}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">
                Quality of Life
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                {city.qualityOfLife}/100
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">
                Safety
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                {city.safety}/100
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">
                Healthcare
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                {city.healthcare}/100
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">
                Currency
              </dt>

              <dd className="font-semibold text-slate-900 mt-1">
                {city.currency}
              </dd>
            </div>
          </dl>
        </section>

        {/* ======================================================
            FAQ - VISIBLE CONTENT ONLY
        ====================================================== */}

        <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-5">
            Frequently Asked Questions About {cityName}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                What is the cost of living in {cityName}?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                The estimated cost of living in {cityName},{" "}
                {countryName}, is approximately $
                {averageMonthlyCost} per month for one person.
                This estimate includes major living expenses
                such as housing, food, transportation and
                utilities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                How much is rent in {cityName}?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                A one-bedroom apartment outside the center
                costs approximately ${outsideRent} per month,
                while a one-bedroom apartment in the center
                costs about ${centerRent}.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Is {cityName} expensive to live in?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {cityName} has a cost index of{" "}
                {city.costIndex} compared with New York City's
                benchmark of 100. The overall affordability
                depends on housing, salary and lifestyle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                What is the average salary in {cityName}?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                The average net salary in {cityName} is
                approximately ${averageSalary} per month.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Is {cityName} good for expats?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                Expats should evaluate housing, salaries,
                transportation, healthcare, safety and quality
                of life before deciding whether {cityName} is
                suitable for relocation.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            INTERNAL LINKING
        ====================================================== */}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
            Explore More Cost of Living Data
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/country/${city.countrySlug}`}
              className="text-blue-600 hover:underline"
            >
              Cost of Living in {countryName}
            </Link>

            <Link
              href="/rankings"
              className="text-blue-600 hover:underline"
            >
              City Cost of Living Rankings
            </Link>

            <Link
              href="/compare"
              className="text-blue-600 hover:underline"
            >
              Compare Cities
            </Link>

            <Link
              href="/country"
              className="text-blue-600 hover:underline"
            >
              Country Rankings
            </Link>

            <Link
              href="/cost-of-living-calculator"
              className="text-blue-600 hover:underline"
            >
              Cost of Living Calculator
            </Link>

            <Link
              href="/methodology"
              className="text-blue-600 hover:underline"
            >
              Cost of Living Methodology
            </Link>

            <Link
              href="/about-us"
              className="text-blue-600 hover:underline"
            >
              About WorldLivingCost
            </Link>
          </div>
        </section>

        {/* ======================================================
            POPULAR COMPARISONS
        ====================================================== */}

        <section className="mt-8 border-t border-slate-200 pt-8">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
            {cityName} Cost of Living Comparisons
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link
              href={`/compare/${city.slug}-vs-berlin`}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">
                {cityName} vs Berlin
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Cost of living comparison
              </p>
            </Link>

            <Link
              href={`/compare/${city.slug}-vs-dubai`}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">
                {cityName} vs Dubai
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Cost of living comparison
              </p>
            </Link>

            <Link
              href={`/compare/${city.slug}-vs-hong-kong`}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">
                {cityName} vs Hong Kong
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Cost of living comparison
              </p>
            </Link>

            <Link
              href={`/compare/${city.slug}-vs-new-york`}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">
                {cityName} vs New York
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Cost of living comparison
              </p>
            </Link>

            <Link
              href={`/country/${city.countrySlug}`}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">
                {countryName}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Country living costs
              </p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}