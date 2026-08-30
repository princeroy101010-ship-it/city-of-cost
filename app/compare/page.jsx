import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { cities } from "@/lib/data";

const SITE_URL = "https://worldlivingcost.com";
const PAGE_URL = `${SITE_URL}/compare`;

export const metadata = {
  title: "Cost of Living Comparison by City | Compare Cities",

  description:
    "Compare cost of living between cities worldwide. See rent, groceries, transportation, salaries, utilities and living expenses side by side with our free city comparison tool.",

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Cost of Living Comparison by City | Compare Cities",
    description:
      "Compare cost of living, rent, groceries, transportation, salaries and living expenses between cities worldwide.",
    siteName: "WorldLivingCost",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cost of living comparison between cities",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cost of Living Comparison by City",
    description:
      "Compare living expenses, rent, groceries, transportation and salaries between cities worldwide.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

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
      name: "Cost of Living Comparison",
      item: PAGE_URL,
    },
  ],
};

const comparePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cost of Living Comparison by City",
  description:
    "Compare the cost of living between cities worldwide, including rent, groceries, transportation, salaries, utilities and everyday living expenses.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "WorldLivingCost",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Cost of Living Comparison Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: PAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cost of Living Comparison Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Free online calculator for comparing cost of living between cities, including rent, groceries, transportation, utilities, salaries and purchasing power.",
  url: PAGE_URL,
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I compare the cost of living between two cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Choose two cities to compare their housing, rent, groceries, transportation, utilities, salaries, healthcare, purchasing power and other living expenses side by side.",
      },
    },
    {
      "@type": "Question",
      name: "What does a cost of living comparison include?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A cost of living comparison can include rent, housing, groceries, restaurants, transportation, utilities, healthcare, salaries, purchasing power and other everyday expenses.",
      },
    },
    {
      "@type": "Question",
      name: "Which costs should I compare before moving to another city?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Before moving, compare rent, groceries, utilities, transportation, healthcare, taxes, average salaries and other recurring monthly expenses. Comparing these categories gives you a more realistic estimate of your required budget.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compare cities for relocation or remote work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Comparing living expenses, housing costs, salaries, purchasing power, transportation and quality of life can help people evaluate cities for relocation, remote work, study and international living.",
      },
    },
  ],
};

const datasetJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Global City Cost of Living Comparison Data",
  description:
    "City-level cost of living data covering housing, rent, groceries, transportation, utilities, salaries and other living expenses.",
  isAccessibleForFree: true,
  about: {
    "@type": "Thing",
    name: "Cost of Living Comparison",
  },
  keywords: [
    "cost of living comparison",
    "cost of living by city",
    "city cost of living comparison",
    "compare living expenses",
    "cost of living calculator",
  ],
  creator: {
    "@type": "Organization",
    name: "WorldLivingCost",
  },
  publisher: {
    "@type": "Organization",
    name: "WorldLivingCost",
  },
  url: PAGE_URL,
  inLanguage: "en",
};

/*
 * These comparisons are intentionally selected to create
 * useful crawl paths and city-level search intent.
 *
 * Your SEMrush data showed particularly attractive KD
 * for Chicago vs Houston:
 *
 * "chicago cost of living vs houston" - KD 16
 * "cost of living in chicago vs houston" - KD 16
 */
const popularComparisons = [
  {
    citySlugA: "chicago",
    citySlugB: "houston",
  },
  {
    citySlugA: "new-york",
    citySlugB: "london",
  },
  {
    citySlugA: "dubai",
    citySlugB: "singapore",
  },
  {
    citySlugA: "tokyo",
    citySlugB: "berlin",
  },
  {
    citySlugA: "sydney",
    citySlugB: "melbourne",
  },
  {
    citySlugA: "toronto",
    citySlugB: "vancouver",
  },
  {
    citySlugA: "bangkok",
    citySlugB: "kuala-lumpur",
  },
  {
    citySlugA: "paris",
    citySlugB: "madrid",
  },
  {
    citySlugA: "amsterdam",
    citySlugB: "berlin",
  },
  {
    citySlugA: "chicago",
    citySlugB: "los-angeles",
  },
];

function getCitySafe(slug) {
  return cities.find((city) => city.slug === slug) || null;
}

export default function CompareIndexPage() {
  const pairs = popularComparisons
    .map((pair) => {
      const cityA = getCitySafe(pair.citySlugA);
      const cityB = getCitySafe(pair.citySlugB);

      if (!cityA || !cityB) {
        return null;
      }

      return {
        cityA,
        cityB,
        slug: `${pair.citySlugA}-vs-${pair.citySlugB}`,
      };
    })
    .filter(Boolean);

  const compareItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular City Cost of Living Comparisons",
    itemListElement: pairs.map((pair, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${pair.cityA.name} vs ${pair.cityB.name}`,
      url: `${SITE_URL}/compare/${pair.slug}`,
    })),
  };

  return (
    <>
      {/* Structured data */}
      <Script
        id="compare-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <Script
        id="compare-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparePageJsonLd),
        }}
      />

      <Script
        id="compare-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppJsonLd),
        }}
      />

      <Script
        id="compare-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <Script
        id="compare-dataset-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetJsonLd),
        }}
      />

      <Script
        id="compare-item-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(compareItemListJsonLd),
        }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-slate-500">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
            </li>

            <li className="mx-2" aria-hidden="true">
              /
            </li>

            <li
              className="text-slate-900 font-medium"
              aria-current="page"
            >
              Cost of Living Comparison
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Cost of Living Comparison by City
          </h1>

          <p className="text-slate-600 max-w-3xl mx-auto leading-7">
            Compare the cost of living between cities worldwide. See rent,
            groceries, transportation, utilities, salaries, healthcare and
            everyday living expenses side by side with our free city
            comparison tool.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Popular comparisons */}
        <section aria-labelledby="popular-comparisons">
          <h2
            id="popular-comparisons"
            className="font-display text-2xl font-bold text-slate-900 mb-6"
          >
            Popular Cost of Living Comparisons
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {pairs.map(({ cityA, cityB, slug }) => (
              <Link
                key={slug}
                href={`/compare/${slug}`}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="grid grid-cols-2">
                  <div className="relative h-28">
                    <Image
                      src={cityA.image}
                      alt={`${cityA.name} cost of living`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="relative h-28">
                    <Image
                      src={cityB.image}
                      alt={`${cityB.name} cost of living`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <p className="font-display font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cityA.name}{" "}
                    <span className="text-slate-400 font-normal">
                      vs
                    </span>{" "}
                    {cityB.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {cityA.country} · {cityB.country}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-blue-600">
                      ${cityA.avgMonthlyCost.toLocaleString()}
                      <span className="text-slate-300 mx-1">
                        /
                      </span>
                      ${cityB.avgMonthlyCost.toLocaleString()}
                    </span>

                    <span className="text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
                      Compare →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison tool intent */}
        <section
          className="mb-14"
          aria-labelledby="compare-any-cities"
        >
          <h2
            id="compare-any-cities"
            className="font-display text-2xl font-bold text-slate-900 mb-4"
          >
            Compare Cost of Living Between Any Two Cities
          </h2>

          <p className="text-slate-600 leading-7">
            Compare two cities by their living expenses, housing costs,
            groceries, transportation, utilities, salaries and purchasing
            power. A city cost of living comparison can help you understand
            how much your monthly budget may change when moving from one
            location to another.
          </p>

          <p className="text-slate-600 leading-7 mt-4">
            Whether you are researching a move, comparing job offers,
            planning to study abroad, working remotely or looking for a more
            affordable city, comparing expenses side by side gives you a
            clearer picture than looking at a single cost of living number.
          </p>
        </section>

        {/* Low-KD opportunity comparison */}
        <section
          className="mb-14 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:p-8"
          aria-labelledby="city-opportunities"
        >
          <h2
            id="city-opportunities"
            className="font-display text-2xl font-bold text-slate-900 mb-4"
          >
            Compare Living Expenses in Popular U.S. Cities
          </h2>

          <p className="text-slate-600 leading-7 mb-5">
            Looking for a specific city comparison? Explore detailed
            comparisons of living expenses, housing and everyday costs
            between major U.S. cities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pairs
              .filter(
                ({ cityA, cityB }) =>
                  cityA.slug === "chicago" ||
                  cityB.slug === "houston"
              )
              .map(({ cityA, cityB, slug }) => (
                <Link
                  key={slug}
                  href={`/compare/${slug}`}
                  className="rounded-xl bg-white border border-slate-200 p-4 font-medium text-slate-800 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  {cityA.name} cost of living vs {cityB.name}
                </Link>
              ))}
          </div>
        </section>

        {/* Most compared */}
        <section
          className="mb-14"
          aria-labelledby="most-compared"
        >
          <h2
            id="most-compared"
            className="font-display text-2xl font-bold text-slate-900 mb-4"
          >
            Popular City Cost Comparisons
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-slate-700">
            {pairs.map(({ cityA, cityB, slug }) => (
              <li key={slug}>
                <Link
                  href={`/compare/${slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {cityA.name} vs {cityB.name} cost of living
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Browse cities */}
        <section aria-labelledby="browse-cities">
          <h2
            id="browse-cities"
            className="font-display text-2xl font-bold text-slate-900 mb-6"
          >
            Compare Cost of Living by City
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {cities.slice(0, 100).map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>

          <div className="mb-14">
            <Link
              href="/country"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Browse all cities →
            </Link>
          </div>
        </section>

        {/* Calculator */}
        <section className="mb-14">
          <Link
            href="/cost-of-living-calculator"
            className="inline-block font-display text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            Cost of Living Calculator →
          </Link>

          <p className="text-slate-600 mt-3 leading-7 max-w-3xl">
            Calculate your expected living expenses and use the results
            alongside our city comparisons to estimate the budget you may
            need in another location.
          </p>
        </section>

        {/* Main SEO content */}
        <section className="compare-content rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Cost of Living Comparison Calculator for Cities Worldwide
          </h2>

          <div className="space-y-5 text-slate-600 leading-8">
            <p>
              A cost of living comparison helps you understand how much it
              costs to live in one city compared with another. WorldLivingCost
              lets you compare cities using categories such as rent,
              groceries, transportation, utilities, healthcare, salaries,
              purchasing power and other everyday living expenses.
            </p>

            <p>
              Instead of looking only at an average cost of living number,
              compare the individual expenses that matter to your budget.
              Housing may be much more expensive in one city while groceries
              or transportation may be cheaper. Looking at several categories
              together provides a more useful picture of affordability.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Compare Rent and Housing Costs
            </h3>

            <p>
              Rent is often one of the largest monthly expenses for people
              living in a city. Our city comparisons help you evaluate
              housing costs alongside other expenses. Comparing city-center
              and outside-center housing can also show how location affects
              your monthly budget.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Compare Groceries and Everyday Expenses
            </h3>

            <p>
              Grocery prices, restaurants and everyday purchases can vary
              substantially between cities. A useful living expenses
              comparison should therefore look beyond rent and include the
              recurring costs that make up a typical monthly budget.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Compare Transportation and Utilities
            </h3>

            <p>
              Transportation and utility costs can have a significant effect
              on affordability. Public transportation, fuel, taxis,
              electricity, internet and other household expenses can differ
              considerably between locations.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Salary and Purchasing Power Comparison
            </h3>

            <p>
              Cost alone does not determine affordability. A city with higher
              living expenses may also have higher salaries. Comparing salary
              and purchasing power with monthly expenses can help you
              understand whether an apparently expensive city may still fit
              your budget.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Cost of Living for Relocation and Remote Work
            </h3>

            <p>
              People researching relocation, remote work, studying abroad,
              retirement or international living can use city cost
              comparisons to narrow down potential destinations. Comparing
              housing, food, transportation, healthcare and purchasing power
              provides a broader view of what everyday life may cost.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Compare Major Cities Before You Move
            </h3>

            <p>
              Popular city comparisons can answer practical questions such as
              whether one city is more affordable than another, how housing
              costs differ, and how much income may be required to maintain a
              similar lifestyle. Choose two cities above to view a detailed
              side-by-side comparison.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Why Compare Cost of Living by City?
            </h3>

            <p>
              National averages can hide large differences between individual
              cities. Comparing cost of living by city gives you a more
              location-specific view of housing, food, transportation,
              utilities and other recurring expenses. This can be especially
              useful when deciding between multiple cities within the same
              country.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-10">
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">
                10,000+ Cities
              </h3>
              <p className="text-sm text-slate-600">
                Explore city-level living costs across locations around the
                world.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">
                Multiple Cost Factors
              </h3>
              <p className="text-sm text-slate-600">
                Compare housing, groceries, transportation, utilities,
                salaries and more.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">
                Side-by-Side Comparison
              </h3>
              <p className="text-sm text-slate-600">
                Quickly identify which city may be more affordable for your
                lifestyle and budget.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="faq-content mt-14"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className="text-3xl font-bold text-slate-900 mb-8"
          >
            Frequently Asked Questions About Cost of Living
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                How do I compare the cost of living between two cities?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                Select two cities to compare rent, groceries,
                transportation, utilities, healthcare, salaries,
                purchasing power and other living expenses side by side.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                What is included in a cost of living comparison?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                A comparison can include housing, rent, groceries,
                restaurants, transportation, utilities, healthcare,
                salaries, purchasing power and other everyday expenses.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                What should I compare before moving to another city?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                Compare rent, groceries, utilities, transportation,
                healthcare, salaries and other recurring expenses. These
                categories provide a more realistic picture of your expected
                monthly budget.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Can I compare cities for remote work?
              </h3>

              <p className="text-slate-600 mt-2 leading-7">
                Yes. Comparing living expenses, rent, salaries, purchasing
                power, transportation and quality of life can help remote
                workers evaluate potential cities.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}