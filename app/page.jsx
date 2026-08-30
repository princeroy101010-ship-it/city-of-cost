import Link from "next/link";
import Script from "next/script";

import { cities } from "../lib/data";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";

const SITE_URL = "https://worldlivingcost.com";
const SITE_NAME = "WorldLivingCost";

/* ─────────────────────────────────────────────
   PAGE METADATA
───────────────────────────────────────────── */

export const metadata = {
  title: "Cost of Living Calculator & City Comparison",

  description:
    "Use our free cost of living calculator to compare rent, groceries, transportation, salaries and everyday living expenses across cities and countries worldwide.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Cost of Living Calculator & City Comparison",

    description:
      "Compare cost of living, rent, groceries, transportation, salaries and living expenses across cities and countries worldwide.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WorldLivingCost cost of living calculator and city comparison",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Cost of Living Calculator & City Comparison",

    description:
      "Compare living expenses, rent, groceries, transportation and salaries across cities worldwide.",

    images: ["/og-image.png"],
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
};

/* ─────────────────────────────────────────────
   STATIC SEO / PAGE DATA
───────────────────────────────────────────── */

const stats = [
  {
    label: "Cities Tracked",
    value: "10,000+",
  },
  {
    label: "Countries Covered",
    value: "195",
  },
  {
    label: "Cost Indicators",
    value: "50+",
  },
  {
    label: "Data Updates",
    value: "Monthly",
  },
];

const popularCities = [
  "Tbilisi",
  "Chiang Mai",
  "Medellin",
  "Lahore",
  "New York",
  "Dubai",
];

const popularComparisons = [
  {
    from: "dubai",
    to: "london",
    label: "Dubai vs London",
  },
  {
    from: "new-york",
    to: "berlin",
    label: "New York vs Berlin",
  },
  {
    from: "bangkok",
    to: "bali",
    label: "Bangkok vs Bali",
  },
  {
    from: "tbilisi",
    to: "lisbon",
    label: "Tbilisi vs Lisbon",
  },
  {
    from: "lahore",
    to: "delhi",
    label: "Lahore vs Delhi",
  },
  {
    from: "medellin",
    to: "mexico-city",
    label: "Medellín vs Mexico City",
  },
  {
    from: "hong-kong",
    to: "singapore",
    label: "Hong Kong vs Singapore",
  },
  {
    from: "chiang-mai",
    to: "ho-chi-minh-city",
    label: "Chiang Mai vs Ho Chi Minh City",
  },
];

const popularCountries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "United Arab Emirates",
  "Pakistan",
  "India",
  "Thailand",
  "Portugal",
  "Georgia",
  "Mexico",
];

const features = [
  {
    title: "Updated Cost of Living Data",
    desc:
      "Compare rent, groceries, transportation, utilities, healthcare and other everyday expenses using regularly updated data.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="11"
          cy="11"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11 6v5l4 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    title: "Compare Cities Side by Side",
    desc:
      "Compare two cities to see differences in rent, groceries, transportation, salaries, purchasing power and living expenses.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 17l5-5 4 4 7-9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    title: "50+ Cost & Quality Indicators",
    desc:
      "Explore housing, food, transport, healthcare, salaries, purchasing power, safety, pollution and other affordability indicators.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 6h14M4 10h10M4 14h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    title: "Transparent Comparison",
    desc:
      "Understand the major expense categories behind a city's cost of living instead of relying on a single affordability score.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="11"
          cy="11"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 11l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   SEO HELPERS
───────────────────────────────────────────── */

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ─────────────────────────────────────────────
   HOMEPAGE STRUCTURED DATA
───────────────────────────────────────────── */

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,

  url: SITE_URL,

  name: "Cost of Living Calculator & City Comparison",

  description:
    "Use WorldLivingCost to compare cost of living, rent, groceries, transportation, salaries and everyday expenses across cities and countries worldwide.",

  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
  },

  about: {
    "@type": "Thing",
    name: "Cost of Living",
  },

  mainEntity: {
    "@type": "SoftwareApplication",
    name: "WorldLivingCost Cost of Living Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: SITE_URL,

    description:
      "A free online cost of living calculator and city comparison tool for comparing living expenses, rent, groceries, transportation and salaries.",
  },

  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
};

/* ─────────────────────────────────────────────
   FEATURED CITY ITEM LIST
───────────────────────────────────────────── */

const topCities = cities.slice(0, 24);

const featuredCitiesItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",

  name: "Popular Cities by Cost of Living",

  description:
    "Explore cost of living data for popular cities including rent, groceries, transportation and salaries.",

  itemListElement: topCities.map((city, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: city.name,
    url: `${SITE_URL}/city/${city.slug}`,
  })),
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────────────────────
          STRUCTURED DATA
      ─────────────────────────────────────── */}

      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd),
        }}
      />

      <Script
        id="featured-cities-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuredCitiesItemList),
        }}
      />

      {/* ───────────────────────────────────────
          HERO
      ─────────────────────────────────────── */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-24 pb-16">
        {/* Background grid */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(#0066ff 1px, transparent 1px), linear-gradient(90deg, #0066ff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className="absolute left-1/2 top-0 h-72 w-full max-w-3xl -translate-x-1/2 rounded-full bg-blue-600/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span
                className="h-1.5 w-1.5 rounded-full bg-blue-500"
                aria-hidden="true"
              />

              Updated Monthly • 10,000+ Cities • 195 Countries
            </div>

            {/* H1 */}

            <h1 className="font-display mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Cost of Living Calculator &amp; City Comparison
            </h1>

            {/* Hero description */}

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl">
              Compare cost of living, rent, groceries, transportation,
              salaries and everyday expenses across cities and countries
              worldwide.
            </p>

            {/* Search interaction */}

            <SearchBar />

            {/* Popular city links */}

            <nav
              className="mt-5 flex flex-wrap items-center justify-center gap-2"
              aria-label="Popular cities"
            >
              <span className="text-sm text-slate-400">
                Popular cities:
              </span>

              {popularCities.map((city) => (
                <Link
                  key={city}
                  href={`/city/${slugify(city)}`}
                  className="text-sm text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                >
                  {city}
                </Link>
              ))}
            </nav>
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white px-6 py-5 text-center"
              >
                <p className="font-display mb-1 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────
          QUICK COMPARISON
      ─────────────────────────────────────── */}

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        aria-labelledby="popular-comparisons-heading"
      >
        <div className="mb-6">
          <h2
            id="popular-comparisons-heading"
            className="font-display mb-2 text-2xl font-bold text-slate-900"
          >
            Popular Cost of Living Comparisons
          </h2>

          <p className="text-sm text-slate-500">
            Compare living expenses, rent, groceries and salaries between
            popular cities.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {popularComparisons.map((item) => (
            <Link
              key={item.label}
              href={`/compare/${item.from}-vs-${item.to}`}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/compare"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Compare more cities →
          </Link>
        </div>
      </section>

      {/* ───────────────────────────────────────
          COST OF LIVING BY COUNTRY
      ─────────────────────────────────────── */}

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        aria-labelledby="countries-heading"
      >
        <div className="mb-6">
          <h2
            id="countries-heading"
            className="font-display mb-2 text-2xl font-bold text-slate-900"
          >
            Cost of Living by Country
          </h2>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
            Compare living expenses, rent prices, groceries,
            transportation, salaries and affordability across countries
            around the world.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {popularCountries.map((country) => (
            <Link
              key={country}
              href={`/country/${slugify(country)}`}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              Cost of Living in {country}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/countries"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Explore all countries →
          </Link>
        </div>
      </section>

      {/* ───────────────────────────────────────
          FEATURED CITIES
      ─────────────────────────────────────── */}

      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="cities-heading"
      >
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <h2
              id="cities-heading"
              className="font-display text-2xl font-bold text-slate-900"
            >
              Popular Cities by Cost of Living
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore rent, groceries, transportation, salaries and
              everyday living expenses in popular cities.
            </p>
          </div>

          <Link
            href="/rankings"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 sm:flex"
          >
            View cost of living rankings

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 7h8M8 4l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topCities.map((city) => (
            <CityCard
              key={city.slug}
              city={city}
            />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/rankings"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            View all cost of living rankings →
          </Link>
        </div>
      </section>

      {/* ───────────────────────────────────────
          WHY WORLDLIVINGCOST
      ─────────────────────────────────────── */}

      <section
        className="border-y border-slate-200 bg-slate-50 py-16"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="features-heading"
              className="font-display mb-2 text-2xl font-bold text-slate-900"
            >
              Why Use WorldLivingCost?
            </h2>

            <p className="text-slate-500">
              Everything you need to understand and compare the cost of
              living before choosing a city or country.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mb-2 font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-500">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────
          RANKING / LOW COST LANDING PAGES
      ─────────────────────────────────────── */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display mb-2 text-2xl font-bold text-slate-900">
            Find Affordable Places to Live
          </h2>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
            Explore cost of living rankings to find affordable states,
            cities and countries based on housing, food, transportation
            and other everyday expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/rankings/cheapest-states-to-live-in-us"
            className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <h3 className="mb-2 font-semibold text-slate-900">
              Cheapest States to Live in the US
            </h3>

            <p className="text-sm leading-relaxed text-slate-500">
              Compare affordable US states by housing, rent, groceries,
              transportation and overall cost of living.
            </p>
          </Link>

          <Link
            href="/rankings"
            className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <h3 className="mb-2 font-semibold text-slate-900">
              Cost of Living Rankings
            </h3>

            <p className="text-sm leading-relaxed text-slate-500">
              Browse cities and countries by affordability, quality of
              life, purchasing power and other indicators.
            </p>
          </Link>

          <Link
            href="/countries"
            className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <h3 className="mb-2 font-semibold text-slate-900">
              Cheapest Countries to Live
            </h3>

            <p className="text-sm leading-relaxed text-slate-500">
              Compare countries to discover destinations with lower rent,
              food, transportation and everyday living costs.
            </p>
          </Link>
        </div>
      </section>

      {/* ───────────────────────────────────────
          CTA
      ─────────────────────────────────────── */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-blue-600 p-10 text-center text-white md:p-14">
          <div
            className="absolute inset-0 opacity-10"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, white 0%, transparent 60%), radial-gradient(circle at 70% 50%, white 0%, transparent 60%)",
            }}
          />

          <div className="relative">
            <h2 className="font-display mb-3 text-3xl font-bold">
              Compare the Cost of Living Before You Move
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-lg text-blue-100">
              Compare two cities side by side and understand the real
              differences in rent, groceries, transportation, salaries
              and everyday expenses.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                Start Comparing

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 5l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="/rankings"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Rankings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────
          MAIN SEO CONTENT
      ─────────────────────────────────────── */}

      <section
        className="border-t border-slate-100 py-14"
        aria-labelledby="cost-of-living-guide-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Column 1 */}

            <div>
              <h2
                id="cost-of-living-guide-heading"
                className="font-display mb-3 text-xl font-bold text-slate-900"
              >
                What Is Cost of Living?
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Cost of living is the amount of money needed to cover
                everyday expenses in a particular city or country. These
                expenses can include housing, rent, groceries,
                transportation, utilities, healthcare, entertainment and
                other essential goods and services. Comparing these
                expenses helps people understand how affordable one
                location is compared with another.
              </p>

              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                How Does a Cost of Living Index Work?
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                A cost of living index compares the relative prices of
                common goods and services between locations. Housing,
                groceries, transportation, utilities and other categories
                can be combined into an overall affordability measure.
                WorldLivingCost presents these categories separately so
                you can see which expenses contribute most to the cost of
                living in a city.
              </p>
            </div>

            {/* Column 2 */}

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Average Cost of Living
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Average living expenses vary significantly by location,
                household size and lifestyle. Housing is often one of the
                largest expenses, while groceries, transportation,
                utilities and healthcare can also have a major impact on
                a monthly budget. Use city and country comparisons to
                understand how these costs differ before making a move.
              </p>

              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Cost of Living for Expats and Remote Workers
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Expats, digital nomads and remote workers often compare
                cities based on rent, food prices, internet and
                transportation as well as salary and purchasing power.
                Our city comparisons help you evaluate these factors
                together when researching where to live.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────
              REGIONAL AFFORDABILITY
          ───────────────────────────────── */}

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Affordable Cities in Asia
              </h3>

              <p className="text-xs leading-relaxed text-slate-500">
                Compare cities such as Lahore, Kathmandu, Hanoi,
                Chiang Mai and Ho Chi Minh City by rent, groceries,
                transportation and other living expenses.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Affordable Cities in Europe
              </h3>

              <p className="text-xs leading-relaxed text-slate-500">
                Explore cities such as Tbilisi, Tirana, Bucharest and
                other European destinations to compare housing,
                groceries and monthly expenses.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Affordable Cities in the Americas
              </h3>

              <p className="text-xs leading-relaxed text-slate-500">
                Compare living costs in cities across North America,
                Central America and South America using rent, food,
                transportation and salary indicators.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────
              TRACKED DATA
          ───────────────────────────────── */}

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                What Does WorldLivingCost Track?
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                WorldLivingCost tracks major categories that influence
                everyday living expenses, including restaurants,
                groceries, local transportation, utilities and internet,
                rent and housing, and average salaries. City profiles can
                also include quality of life, safety, healthcare, climate,
                purchasing power, traffic and pollution indicators.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                How to Use the Cost of Living Calculator
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Start with the{" "}
                <Link
                  href="/compare"
                  className="font-medium text-blue-600 hover:underline"
                >
                  cost of living comparison tool
                </Link>{" "}
                to compare two cities. You can also explore{" "}
                <Link
                  href="/rankings"
                  className="font-medium text-blue-600 hover:underline"
                >
                  cost of living rankings
                </Link>{" "}
                or browse{" "}
                <Link
                  href="/countries"
                  className="font-medium text-blue-600 hover:underline"
                >
                  countries by living cost
                </Link>{" "}
                to research potential destinations.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────
              TOPICAL CONTENT CLUSTER
          ───────────────────────────────── */}

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Cost of Living by Country
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Compare living expenses across countries using housing,
                groceries, transportation, healthcare and salary data.
                Country-level comparisons are useful for expats,
                students, retirees and remote workers researching
                international destinations.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Cost of Living by City
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                City-level cost of living can differ significantly even
                within the same country. Explore individual city pages to
                compare rent, food, transportation, utilities, salaries
                and other everyday expenses.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Cost of Living vs Salary
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                A low cost of living does not always mean better
                affordability. Comparing average salaries with living
                expenses can provide a clearer picture of purchasing
                power and the income needed to maintain a particular
                lifestyle.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Rent Prices by City
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Housing can be one of the largest parts of a monthly
                budget. Compare rental costs between cities to understand
                how much accommodation may contribute to your overall
                living expenses.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Quality of Life Rankings
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Cost is only one part of choosing where to live. Compare
                affordability with safety, healthcare, climate,
                purchasing power, traffic and pollution to evaluate
                overall quality of life.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Healthcare Cost Comparison
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Healthcare expenses can affect the overall budget for
                individuals and families. Use location comparisons to
                research healthcare affordability alongside other major
                living costs.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Cost of Living for Students
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                International students can compare rent, food,
                transportation and everyday expenses when researching
                affordable cities and countries for study.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                Cost of Living for Retirees
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Retirees can compare housing, healthcare, transportation,
                safety and overall living expenses when evaluating
                retirement destinations.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────
              FINAL INTERNAL LINKS
          ───────────────────────────────── */}

          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
              Explore WorldLivingCost
            </h2>

            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-600">
              Continue your research with our city comparisons, country
              cost profiles and affordability rankings.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 ring-1 ring-slate-200 transition hover:ring-blue-300"
              >
                Compare Cities
              </Link>

              <Link
                href="/rankings"
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 ring-1 ring-slate-200 transition hover:ring-blue-300"
              >
                Cost of Living Rankings
              </Link>

              <Link
                href="/countries"
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 ring-1 ring-slate-200 transition hover:ring-blue-300"
              >
                Browse Countries
              </Link>

              <Link
                href="/cheapest-states-to-live-in-us"
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 ring-1 ring-slate-200 transition hover:ring-blue-300"
              >
                Cheapest US States
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}