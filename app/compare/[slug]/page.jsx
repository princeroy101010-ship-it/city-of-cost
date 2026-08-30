// app/compare/[slug]/page.jsx
// SERVER COMPONENT — no "use client"

import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

import CompareClient from "../data";
import { cities, getCityBySlug } from "../../../lib/data";

// ============================================================
// SITE CONSTANTS
// ============================================================

const BASE_URL = "https://worldlivingcost.com";
const SITE_NAME = "WorldLivingCost";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

// ============================================================
// POPULAR COMPARISONS
// Keep these focused on important/high-intent city pairs.
// ============================================================

const popularPairs = [
  "new-york-vs-london",
  "dubai-vs-singapore",
  "tokyo-vs-berlin",
  "sydney-vs-melbourne",
  "toronto-vs-vancouver",
  "bangkok-vs-kuala-lumpur",
  "paris-vs-madrid",
  "amsterdam-vs-berlin",
  "chicago-vs-los-angeles",
];

// ============================================================
// HELPERS
// ============================================================

function splitSlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  if (!slug.includes("-vs-")) return null;

  const parts = slug.split("-vs-");

  if (parts.length !== 2) return null;

  const [rawA, rawB] = parts;

  if (!rawA || !rawB) return null;

  return {
    rawA,
    rawB,
  };
}

function resolveSlug(slug) {
  const parts = splitSlug(slug);

  if (!parts) return null;

  const { rawA, rawB } = parts;

  const cityA = getCityBySlug(rawA);
  const cityB = getCityBySlug(rawB);

  if (!cityA || !cityB) return null;

  return {
    cityA,
    cityB,
    rawA,
    rawB,
  };
}

/**
 * Creates a deterministic URL for a city pair.
 *
 * This prevents:
 *
 * /compare/new-york-vs-london
 * /compare/london-vs-new-york
 *
 * from becoming two indexable versions of essentially
 * the same comparison.
 */
function getCanonicalPairSlug(cityA, cityB) {
  return [cityA.slug, cityB.slug].sort().join("-vs-");
}

function getComparisonUrl(slug) {
  return `${BASE_URL}/compare/${slug}`;
}

function formatMoney(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "N/A";
  }

  return `$${value.toLocaleString("en-US")}`;
}

function getCheaperCity(cityA, cityB) {
  if (
    typeof cityA.avgMonthlyCost !== "number" ||
    typeof cityB.avgMonthlyCost !== "number"
  ) {
    return null;
  }

  if (cityA.avgMonthlyCost < cityB.avgMonthlyCost) {
    return cityA;
  }

  if (cityB.avgMonthlyCost < cityA.avgMonthlyCost) {
    return cityB;
  }

  return null;
}

function getPercentageDifference(cityA, cityB) {
  if (
    typeof cityA.avgMonthlyCost !== "number" ||
    typeof cityB.avgMonthlyCost !== "number" ||
    cityA.avgMonthlyCost <= 0 ||
    cityB.avgMonthlyCost <= 0
  ) {
    return null;
  }

  const higher = Math.max(
    cityA.avgMonthlyCost,
    cityB.avgMonthlyCost
  );

  const lower = Math.min(
    cityA.avgMonthlyCost,
    cityB.avgMonthlyCost
  );

  return Math.round(((higher - lower) / higher) * 100);
}

/**
 * Generates useful internal comparison links.
 *
 * Priority:
 * 1. Same country
 * 2. Other real cities
 * 3. Exclude the current pair
 */
function getRelatedComparisons(cityA, cityB, limit = 6) {
  const excluded = new Set([cityA.slug, cityB.slug]);

  const availableCities = cities.filter(
    (city) => city && city.slug && !excluded.has(city.slug)
  );

  const sameCountry = availableCities.filter(
    (city) =>
      city.country &&
      cityA.country &&
      city.country.toLowerCase() === cityA.country.toLowerCase()
  );

  const remaining = availableCities.filter(
    (city) => !sameCountry.some((same) => same.slug === city.slug)
  );

  const ordered = [...sameCountry, ...remaining];

  return ordered.slice(0, limit).map((city) => ({
    slug: getCanonicalPairSlug(cityA, city),
    label: `${cityA.name} vs ${city.name}`,
  }));
}

function formatPairLabel(slug) {
  return slug
    .replace(/-vs-/g, " vs ")
    .replace(/-/g, " ");
}

// ============================================================
// STATIC PARAMS
// ============================================================

export async function generateStaticParams() {
  return popularPairs.map((slug) => ({
    slug,
  }));
}

// Allow additional valid city pairs to render dynamically.
export const dynamicParams = true;

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const resolved = resolveSlug(slug);

  if (!resolved) {
    return {
      title: "Cost of Living Comparison | WorldLivingCost",
      description:
        "Compare cost of living, rent, salaries, groceries, transportation and quality of life between cities worldwide.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const { cityA, cityB } = resolved;

  const canonicalSlug = getCanonicalPairSlug(cityA, cityB);
  const canonicalUrl = getComparisonUrl(canonicalSlug);

  const pairTitle = `${cityA.name} vs ${cityB.name}`;

  const title = `${pairTitle} Cost of Living Comparison`;

  const description =
    `Compare ${cityA.name} vs ${cityB.name} cost of living, rent, salaries, groceries, transport and monthly expenses side by side.`;

  return {
    title,

    description,

    keywords: [
      `${cityA.name} vs ${cityB.name} cost of living`,
      `cost of living ${cityA.name} vs ${cityB.name}`,
      `${cityB.name} vs ${cityA.name} cost of living`,
      `${cityA.name} ${cityB.name} cost comparison`,
      `living expenses ${cityA.name} vs ${cityB.name}`,
      `rent ${cityA.name} vs ${cityB.name}`,
      `salary ${cityA.name} vs ${cityB.name}`,
      `groceries ${cityA.name} vs ${cityB.name}`,
      `transportation ${cityA.name} vs ${cityB.name}`,
      `${cityA.name} vs ${cityB.name} for expats`,
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
      type: "website",
      siteName: SITE_NAME,
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${pairTitle} cost of living comparison`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ============================================================
// PAGE
// ============================================================

export default async function ComparePage({ params }) {
  const { slug } = await params;

  const resolved = resolveSlug(slug);

  if (!resolved) {
    notFound();
  }

  const { cityA, cityB, rawA, rawB } = resolved;

  // ----------------------------------------------------------
  // Canonical pair normalization
  // ----------------------------------------------------------

  const canonicalSlug = getCanonicalPairSlug(cityA, cityB);

  /**
   * If someone opens the reverse version:
   *
   * /compare/london-vs-new-york
   *
   * while canonical ordering is:
   *
   * /compare/new-york-vs-london
   *
   * redirect to the single preferred URL.
   *
   * This helps prevent duplicate comparison pages.
   */
  if (slug !== canonicalSlug) {
    permanentRedirect(`/compare/${canonicalSlug}`);
  }

  const canonicalUrl = getComparisonUrl(canonicalSlug);

  // ----------------------------------------------------------
  // Derived comparison data
  // ----------------------------------------------------------

  const pairTitle = `${cityA.name} vs ${cityB.name}`;

  const cheaperCity = getCheaperCity(cityA, cityB);

  const percentageDifference = getPercentageDifference(
    cityA,
    cityB
  );

  const otherPairs = popularPairs
    .filter((pair) => pair !== canonicalSlug)
    .slice(0, 9);

  const relatedPairs = getRelatedComparisons(
    cityA,
    cityB,
    6
  );

  // ==========================================================
  // JSON-LD — BREADCRUMB
  // ==========================================================

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
        name: "Compare Cities",
        item: `${BASE_URL}/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pairTitle,
        item: canonicalUrl,
      },
    ],
  };

  // ==========================================================
  // JSON-LD — WEB PAGE
  // ==========================================================

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `${pairTitle} Cost of Living Comparison`,
    description:
      `Compare the cost of living, rent, salaries, groceries, transportation, healthcare and quality of life between ${cityA.name} and ${cityB.name}.`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BASE_URL}#website`,
      name: SITE_NAME,
      url: BASE_URL,
    },
    mainEntity: {
      "@id": `${canonicalUrl}#comparison`,
    },
  };

  // ==========================================================
  // JSON-LD — WEB APPLICATION
  // ==========================================================

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${canonicalUrl}#comparison`,
    name: `${pairTitle} Cost of Living Comparison`,
    url: canonicalUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description:
      `Free online tool for comparing the cost of living between ${cityA.name} and ${cityB.name}, including rent, groceries, transportation, salaries, purchasing power and quality of life.`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Cost of living comparison",
      "Monthly expense comparison",
      "Rent and housing comparison",
      "Grocery price comparison",
      "Transportation comparison",
      "Salary comparison",
      "Purchasing power comparison",
      "Quality of life comparison",
      "Safety comparison",
      "Healthcare comparison",
    ],
  };

  // ==========================================================
  // JSON-LD — FAQ
  // ==========================================================

  const faqQuestions = [
    {
      "@type": "Question",
      name: `Is ${cityA.name} or ${cityB.name} cheaper to live in?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: cheaperCity
          ? `${cheaperCity.name} has the lower average monthly cost of living in this comparison. Compare rent, groceries, transportation, utilities and other categories above for a more detailed breakdown.`
          : `${cityA.name} and ${cityB.name} have similar average monthly costs in this comparison. Review the individual expense categories above to see where the differences occur.`,
      },
    },
    {
      "@type": "Question",
      name: `How much does it cost to live in ${cityA.name} compared with ${cityB.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          `The average monthly cost of living is ${formatMoney(
            cityA.avgMonthlyCost
          )} in ${cityA.name} compared with ${formatMoney(
            cityB.avgMonthlyCost
          )} in ${cityB.name}.`,
      },
    },
    {
      "@type": "Question",
      name: `Is rent cheaper in ${cityA.name} or ${cityB.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          `Use the rent and housing section of the comparison to evaluate apartment costs in ${cityA.name} and ${cityB.name}, including differences between city-center and outside-city-center housing where data is available.`,
      },
    },
    {
      "@type": "Question",
      name: `Which city is better for expats: ${cityA.name} or ${cityB.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          `The better city for expats depends on budget, salary, housing costs, safety, healthcare, transportation and lifestyle preferences. Compare these factors side by side to determine which city fits your priorities.`,
      },
    },
    {
      "@type": "Question",
      name: `What is included in the ${cityA.name} vs ${cityB.name} cost of living comparison?`,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          `The comparison covers major living expenses and lifestyle indicators including housing, rent, groceries, restaurants, transportation, utilities, salaries, purchasing power, safety, healthcare, climate, traffic and quality of life.`,
      },
    },
  ];

  const compareFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqQuestions,
  };

  // ==========================================================
  // JSON-LD — RELATED COMPARISONS
  // ==========================================================

  const compareItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular Cost of Living Comparisons",
    itemListElement: otherPairs.map((pair, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: formatPairLabel(pair),
      url: getComparisonUrl(pair),
    })),
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <>
      {/* ======================================================
          STRUCTURED DATA
      ====================================================== */}

      <Script
        id="compare-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <Script
        id="compare-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd),
        }}
      />

      <Script
        id="compare-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <Script
        id="compare-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(compareFaqJsonLd),
        }}
      />

      <Script
        id="compare-item-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(compareItemListJsonLd),
        }}
      />

      {/* ======================================================
          BREADCRUMBS
      ====================================================== */}

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <nav
          aria-label="Breadcrumb"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <ol className="flex flex-wrap items-center text-sm text-slate-500">
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/"
                itemProp="item"
                className="hover:text-blue-600 transition-colors"
              >
                <span itemProp="name">Home</span>
              </Link>

              <meta itemProp="position" content="1" />
            </li>

            <li
              className="mx-2"
              aria-hidden="true"
            >
              /
            </li>

            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/compare"
                itemProp="item"
                className="hover:text-blue-600 transition-colors"
              >
                <span itemProp="name">Compare Cities</span>
              </Link>

              <meta itemProp="position" content="2" />
            </li>

            <li
              className="mx-2"
              aria-hidden="true"
            >
              /
            </li>

            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="text-slate-900 font-medium"
            >
              <span itemProp="name">{pairTitle}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* ======================================================
          HERO / PRIMARY SEARCH INTENT
      ====================================================== */}

      <main>
        <section className="max-w-6xl mx-auto px-4 pt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            {cityA.name} vs {cityB.name} Cost of Living Comparison
          </h1>

          <p className="text-slate-600 leading-7 mt-4 max-w-4xl">
            Compare the cost of living in {cityA.name} and{" "}
            {cityB.name} side by side. Explore average monthly
            expenses, rent, groceries, transportation, salaries,
            purchasing power, healthcare, safety and quality of life
            to see which city is more affordable for your lifestyle.
          </p>

          {/* ==================================================
              QUICK ANSWER
          ================================================== */}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-xl font-bold text-slate-900">
              {pairTitle}: Quick Cost of Living Answer
            </h2>

            <p className="mt-3 text-slate-600 leading-7">
              The average monthly cost of living is{" "}
              <strong className="text-slate-900">
                {formatMoney(cityA.avgMonthlyCost)}
              </strong>{" "}
              in {cityA.name} compared with{" "}
              <strong className="text-slate-900">
                {formatMoney(cityB.avgMonthlyCost)}
              </strong>{" "}
              in {cityB.name}.
            </p>

            {cheaperCity && (
              <p className="mt-2 text-slate-600 leading-7">
                Based on the average monthly cost in this dataset,{" "}
                <strong className="text-slate-900">
                  {cheaperCity.name}
                </strong>{" "}
                is the more affordable city overall.
                {percentageDifference !== null && (
                  <>
                    {" "}
                    The difference between the two average monthly
                    costs is approximately{" "}
                    <strong className="text-slate-900">
                      {percentageDifference}%
                    </strong>
                    .
                  </>
                )}
              </p>
            )}
          </div>

          {/* ==================================================
              SERVER-RENDERED COMPARISON TABLE
          ================================================== */}

          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {pairTitle} cost of living and quality of life comparison
              </caption>

              <thead>
                <tr className="bg-slate-50">
                  <th
                    scope="col"
                    className="text-left px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide text-xs"
                  >
                    Metric
                  </th>

                  <th
                    scope="col"
                    className="text-right px-4 py-3 font-semibold text-blue-600 uppercase tracking-wide text-xs"
                  >
                    {cityA.name}
                  </th>

                  <th
                    scope="col"
                    className="text-right px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide text-xs"
                  >
                    {cityB.name}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                <tr>
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-slate-700"
                  >
                    Average Monthly Cost of Living
                  </th>

                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    {formatMoney(cityA.avgMonthlyCost)}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    {formatMoney(cityB.avgMonthlyCost)}
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-slate-700"
                  >
                    Quality of Life
                  </th>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityA.qualityOfLife}/100
                  </td>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityB.qualityOfLife}/100
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-slate-700"
                  >
                    Purchasing Power
                  </th>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityA.purchasingPower}/100
                  </td>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityB.purchasingPower}/100
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-slate-700"
                  >
                    Safety
                  </th>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityA.safety}/100
                  </td>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityB.safety}/100
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-slate-700"
                  >
                    Healthcare
                  </th>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityA.healthcare}/100
                  </td>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityB.healthcare}/100
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-slate-700"
                  >
                    Climate
                  </th>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityA.climate}/100
                  </td>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityB.climate}/100
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-slate-700"
                  >
                    Traffic &amp; Commute
                  </th>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityA.trafficCommute}/100
                  </td>

                  <td className="px-4 py-3 text-right text-slate-900">
                    {cityB.trafficCommute}/100
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ==================================================
              CALCULATOR HEADING
          ================================================== */}

          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mt-12">
            Live Cost of Living Comparison: {pairTitle}
          </h2>

          <p className="text-slate-600 leading-7 mt-3 max-w-4xl">
            Use the comparison tool below to explore detailed
            differences between {cityA.name} and {cityB.name},
            including housing, food, transportation, salaries and
            other everyday expenses.
          </p>
        </section>

        {/* ======================================================
            CLIENT COMPARISON TOOL
        ====================================================== */}

        <Suspense
          fallback={
            <div className="p-10 text-center text-slate-400">
              Loading cost of living comparison...
            </div>
          }
        >
          <CompareClient
            city1={rawA}
            city2={rawB}
          />
        </Suspense>

        {/* ======================================================
            SEO CONTENT
        ====================================================== */}

        <section className="compare-answer max-w-6xl mx-auto px-4 py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {pairTitle} Cost of Living
            </h2>

            <div className="space-y-5 text-slate-600 leading-8">
              <p>
                The cost of living in {cityA.name} compared with{" "}
                {cityB.name} depends on housing, food, transportation,
                utilities, healthcare, salaries and lifestyle. This
                comparison brings those factors together so you can
                evaluate the two cities using the available cost of
                living data.
              </p>

              <p>
                The average monthly cost of living is{" "}
                <strong className="text-slate-900">
                  {formatMoney(cityA.avgMonthlyCost)}
                </strong>{" "}
                in {cityA.name} and{" "}
                <strong className="text-slate-900">
                  {formatMoney(cityB.avgMonthlyCost)}
                </strong>{" "}
                in {cityB.name}.
                {cheaperCity
                  ? ` Based on the overall monthly cost figure, ${cheaperCity.name} is currently the more affordable option in this comparison.`
                  : ` The two cities have similar average monthly costs in this comparison.`}
              </p>

              <p>
                Whether you're relocating, studying abroad, retiring,
                working remotely, moving for employment or comparing
                international destinations, it is important to look
                beyond one overall number. Rent, groceries, commuting,
                healthcare, salaries and purchasing power can
                significantly change how affordable a city feels.
              </p>
            </div>

            {/* ==================================================
                CITY A
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-8 pb-2">
              About {cityA.name}
            </h3>

            <p className="text-slate-600 leading-8">
              {cityA.name}, {cityA.country}, has an average monthly
              cost of living of{" "}
              <strong className="text-slate-900">
                {formatMoney(cityA.avgMonthlyCost)}
              </strong>
              . Its quality of life score is{" "}
              {cityA.qualityOfLife}/100, while its safety score is{" "}
              {cityA.safety}/100 and healthcare score is{" "}
              {cityA.healthcare}/100. The city has a climate score of{" "}
              {cityA.climate}/100 and a traffic and commute score of{" "}
              {cityA.trafficCommute}/100.
            </p>

            {/* ==================================================
                CITY B
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
              About {cityB.name}
            </h3>

            <p className="text-slate-600 leading-8">
              {cityB.name}, {cityB.country}, has an average monthly
              cost of living of{" "}
              <strong className="text-slate-900">
                {formatMoney(cityB.avgMonthlyCost)}
              </strong>
              . Its quality of life score is{" "}
              {cityB.qualityOfLife}/100, safety score is{" "}
              {cityB.safety}/100 and healthcare score is{" "}
              {cityB.healthcare}/100. Its climate score is{" "}
              {cityB.climate}/100 and traffic and commute score is{" "}
              {cityB.trafficCommute}/100.
            </p>

            {/* ==================================================
                RENT
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-8 pb-2">
              Rent Comparison: {cityA.name} vs {cityB.name}
            </h3>

            <p className="text-slate-600 leading-8">
              Housing is often one of the largest expenses when
              comparing {cityA.name} and {cityB.name}. Rent can vary
              significantly depending on apartment size, location and
              proximity to the city center. Use the housing section of
              the comparison tool above to review available rental
              data for both cities. This is especially important for
              expats, students, families and remote workers creating a
              monthly budget.
            </p>

            {/* ==================================================
                SALARY
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
              Salary &amp; Purchasing Power: {cityA.name} vs{" "}
              {cityB.name}
            </h3>

            <p className="text-slate-600 leading-8">
              Salary should be considered together with living
              expenses. A city with higher wages can still be more
              expensive if rent, food and transportation costs are
              substantially higher. Comparing purchasing power helps
              provide additional context when deciding between{" "}
              {cityA.name} and {cityB.name}.
            </p>

            {/* ==================================================
                GROCERIES
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
              Grocery Prices: {cityA.name} vs {cityB.name}
            </h3>

            <p className="text-slate-600 leading-8">
              Grocery expenses can make a significant difference to a
              monthly budget. Everyday products such as milk, bread,
              eggs, rice, vegetables, fruit and meat can have very
              different prices in {cityA.name} and {cityB.name}.
              Review the detailed market and food data above to
              estimate your expected grocery spending.
            </p>

            {/* ==================================================
                TRANSPORTATION
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
              Transportation Costs: {cityA.name} vs {cityB.name}
            </h3>

            <p className="text-slate-600 leading-8">
              Transportation costs depend on public transit,
              commuting distances, taxi prices, fuel costs and car
              ownership. Compare public transportation, taxis and
              fuel between {cityA.name} and {cityB.name} to understand
              how commuting could affect your monthly budget.
            </p>

            {/* ==================================================
                QUALITY OF LIFE
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
              Quality of Life: {cityA.name} vs {cityB.name}
            </h3>

            <p className="text-slate-600 leading-8">
              Cost is only one part of choosing where to live. Quality
              of life, safety, healthcare, climate and traffic can
              influence the overall experience of living in a city.{" "}
              {cityA.name} has a quality of life score of{" "}
              {cityA.qualityOfLife}/100 compared with{" "}
              {cityB.name}'s {cityB.qualityOfLife}/100. The comparison
              table above provides additional scores for safety,
              healthcare, climate and commuting.
            </p>

            {/* ==================================================
                EXPATS
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
              Which City Is Better for Expats: {cityA.name} or{" "}
              {cityB.name}?
            </h3>

            <p className="text-slate-600 leading-8">
              The better city for expats depends on personal
              priorities. If affordability is most important,{" "}
              {cheaperCity
                ? `${cheaperCity.name} has the lower average monthly cost in this comparison.`
                : "the two cities have similar average monthly costs."}{" "}
              If salary, purchasing power, safety, healthcare,
              transportation or quality of life are more important,
              compare those individual metrics rather than relying
              only on the overall cost figure.
            </p>

            {/* ==================================================
                RELOCATION
            ================================================== */}

            <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
              {cityA.name} vs {cityB.name} for Relocation
            </h3>

            <p className="text-slate-600 leading-8">
              For relocation planning, consider your expected income,
              housing requirements, transportation needs, food budget,
              healthcare expenses and desired lifestyle. Comparing{" "}
              {cityA.name} and {cityB.name} across multiple categories
              gives you a better starting point than looking at a
              single cost-of-living number.
            </p>

            {/* ==================================================
                SITE VALUE PROPOSITIONS
            ================================================== */}

            <div className="grid gap-4 md:grid-cols-3 mt-10">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">
                  10,000+ Cities
                </h3>

                <p className="text-sm text-slate-600">
                  Explore cost of living information for cities around
                  the world.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">
                  50+ Cost Factors
                </h3>

                <p className="text-sm text-slate-600">
                  Compare housing, groceries, transportation,
                  healthcare, salaries, utilities and more.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Detailed Comparisons
                </h3>

                <p className="text-sm text-slate-600">
                  Compare cities side by side before planning a move,
                  trip, retirement or remote-work lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            FAQ
        ====================================================== */}

        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions About {pairTitle}
          </h2>

          <div className="space-y-7">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Is {cityA.name} or {cityB.name} cheaper to live in?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                {cheaperCity
                  ? `${cheaperCity.name} has the lower average monthly cost of living in this comparison. Review the individual categories above for a more detailed comparison.`
                  : `${cityA.name} and ${cityB.name} have similar average monthly costs in this comparison.`}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                How much does it cost to live in {cityA.name} compared
                with {cityB.name}?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                The average monthly cost is{" "}
                <strong>
                  {formatMoney(cityA.avgMonthlyCost)}
                </strong>{" "}
                in {cityA.name} and{" "}
                <strong>
                  {formatMoney(cityB.avgMonthlyCost)}
                </strong>{" "}
                in {cityB.name}.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Is rent cheaper in {cityA.name} or {cityB.name}?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                Use the housing comparison above to evaluate rental
                costs in both cities. Rent can vary considerably
                depending on apartment size and location.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Which city is better for expats: {cityA.name} or{" "}
                {cityB.name}?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                It depends on your budget and lifestyle priorities.
                Compare cost, rent, salaries, purchasing power, safety,
                healthcare, transportation and quality of life before
                making a decision.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                What is included in this cost of living comparison?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                The comparison includes major living expenses and
                lifestyle indicators such as rent, housing, groceries,
                restaurants, transportation, utilities, salaries,
                purchasing power, safety, healthcare, climate and
                quality of life.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            COST OF LIVING CALCULATOR
        ====================================================== */}

        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-5">
              Cost of Living Calculator
            </h2>

            <p className="text-slate-600 leading-8">
              Want to compare other destinations? Use our{" "}
              <Link
                href="/cost-of-living-calculator"
                className="text-blue-600 hover:underline font-medium"
              >
                Cost of Living Calculator
              </Link>{" "}
              to estimate monthly expenses, housing, groceries,
              transportation and other living costs. You can also
              explore{" "}
              <Link
                href="/country"
                className="text-blue-600 hover:underline font-medium"
              >
                Cost of Living by Country
              </Link>{" "}
              to compare living expenses and lifestyle indicators
              across countries.
            </p>
          </div>
        </section>

        {/* ======================================================
            POPULAR COMPARISONS
        ====================================================== */}

        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Other Popular Cost of Living Comparisons
          </h2>

          <ul className="grid md:grid-cols-3 gap-3">
            {otherPairs.map((pair) => (
              <li key={pair}>
                <Link
                  href={`/compare/${pair}`}
                  className="block rounded-lg border border-slate-200 px-4 py-3 text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  {formatPairLabel(pair)}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ======================================================
            RELATED COMPARISONS
        ====================================================== */}

        {relatedPairs.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              More Comparisons for {cityA.name}
            </h2>

            <ul className="grid md:grid-cols-3 gap-3">
              {relatedPairs.map(
                ({ slug: relatedSlug, label }) => (
                  <li key={relatedSlug}>
                    <Link
                      href={`/compare/${relatedSlug}`}
                      className="block rounded-lg border border-slate-200 px-4 py-3 text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}