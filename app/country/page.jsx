import Link from "next/link";
import { cities } from "../../lib/data";
import ContinentFilter from "../../components/ContinentFilter";
import Script from "next/script";

export const metadata = {
 title: "Cost of Living by Country | 195 Countries Ranked",
  description:
  "Browse cost of living rankings by country. Compare rent, salaries, purchasing power, quality of life and living expenses across 195 countries.",
    alternates: {
    canonical: "https://worldlivingcost.com/countries",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/countries",
    title: "195 Countries Ranked by Cost of Living (2025)",
    description:
      "Browse cost of living data for 195 countries worldwide. Compare average monthly expenses, quality of life, and safety indices. Find the cheapest countries to live, retire, or work remotely in 2025.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cost of Living by Country Global comparison of 195 countries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "195 Countries Ranked by Cost of Living (2025)",
    description:
      "Compare cost of living, quality of life, and safety across 195 countries. Find the cheapest countries to live or retire in 2025.",
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

export const revalidate = 86400;

export default function CountriesPage() {
  const byCountry = {};
  cities.forEach((city) => {
    if (!byCountry[city.country]) {
      byCountry[city.country] = {
        country: city.country,
        countryCode: city.countryCode,
        continent: city.continent,
        currency: city.currency,
        cities: [],
        image: city.image,
      };
    }
    byCountry[city.country].cities.push(city);
  });

  const countries = Object.values(byCountry).map((c) => ({
    ...c,
    slug: c.cities[0]?.slug || c.country.toLowerCase().replace(/\s+/g, "-"),
    countrySlug: c.country.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    avgCost: Math.round(c.cities.reduce((s, ci) => s + ci.avgMonthlyCost, 0) / c.cities.length),
    avgQOL: Math.round(c.cities.reduce((s, ci) => s + ci.qualityOfLife, 0) / c.cities.length),
    avgSafety: Math.round(c.cities.reduce((s, ci) => s + ci.safety, 0) / c.cities.length),
  }));

  const continents = ["All", ...Array.from(new Set(countries.map((c) => c.continent)))];

  // Server-rendered rankings used for the above-the-fold table and the
  // "Quick Answer" / "Key Takeaways" copy AI crawlers and answer engines
  // (ChatGPT, Perplexity, Gemini, Claude) tend to pull from directly.
  const cheapestCountries = [...countries].sort((a, b) => a.avgCost - b.avgCost).slice(0, 20);
  const cheapestNames = cheapestCountries.slice(0, 6).map((c) => c.country);
  const mostExpensiveCountries20 = [...countries].sort((a, b) => b.avgCost - a.avgCost).slice(0, 20);
  const mostExpensiveCountries = mostExpensiveCountries20.slice(0, 6);
  const safestCountries20 = [...countries].sort((a, b) => b.avgSafety - a.avgSafety).slice(0, 20);
  const safestCountries = safestCountries20.slice(0, 6);

  // Fixed date so dateModified doesn't silently change on every static build.
  // Update this whenever the underlying cost-of-living dataset is actually refreshed.
  const BUILD_DATE = "2026-07-04";
  const lastUpdatedFull = new Date(BUILD_DATE).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isoDate = BUILD_DATE;

  // Diverse, dataset-guaranteed sample for "Popular City Cost Comparisons" —
  // pulled directly from `cities` (one per country, in dataset order) so every
  // link is guaranteed to resolve instead of guessing at slugs that may not exist.
  const popularCitiesSeen = new Set();
  const popularCities = [];
  for (const city of cities) {
    if (city.slug && !popularCitiesSeen.has(city.country)) {
      popularCitiesSeen.add(city.country);
      popularCities.push(city);
    }
    if (popularCities.length >= 24) break;
  }
  const formatCityLabel = (slug) =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://worldlivingcost.com/#organization",
        name: "Worldlivingcost",
        url: "https://worldlivingcost.com",
        logo: "https://worldlivingcost.com/og-image.png",
        sameAs: [],
      },
      {
        "@type": "WebPage",
        "@id": "https://worldlivingcost.com/countries#webpage",
        name: "Cost of Living by Country",
        url: "https://worldlivingcost.com/countries",
        datePublished: "2025-01-01",
        dateModified: isoDate,
        publisher: { "@id": "https://worldlivingcost.com/#organization" },
        author: { "@id": "https://worldlivingcost.com/#organization" },
        about: [
          { "@type": "Thing", name: "Cost of Living" },
          { "@type": "Thing", name: "Quality of Life" },
          { "@type": "Thing", name: "Safety Index" },
        ],
        mentions: countries.slice(0, 20).map((c) => ({ "@type": "Country", name: c.country })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#quick-answer", "#cheapest-countries"],
        },
      },
      {
        "@type": "Article",
        "@id": "https://worldlivingcost.com/countries#article",
        headline: "Cost of Living by Country (2025)",
        author: { "@id": "https://worldlivingcost.com/#organization" },
        publisher: { "@id": "https://worldlivingcost.com/#organization" },
        datePublished: "2025-01-01",
        dateModified: isoDate,
        mainEntityOfPage: { "@id": "https://worldlivingcost.com/countries#webpage" },
      },
      {
        "@type": "CollectionPage",
        "@id": "https://worldlivingcost.com/countries",
        name: "195 Countries Ranked by Cost of Living (2025)",
        description:
          "Browse cost of living data for 195 countries worldwide. Compare average monthly expenses, quality of life, and safety indices to find the most affordable countries to live, retire, or work remotely.",
        url: "https://worldlivingcost.com/countries",
        isPartOf: { "@id": "https://worldlivingcost.com/#organization" },
        about: [
          { "@type": "Thing", name: "Cost of Living" },
          { "@type": "Thing", name: "Quality of Life" },
          { "@type": "Thing", name: "Safety Index" },
        ],
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
              name: "Countries",
              item: "https://worldlivingcost.com/countries",
            },
          ],
        },
        mainEntity: {
          "@id": "https://worldlivingcost.com/countries#country-list",
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://worldlivingcost.com/countries#country-list",
        name: "Countries by Cost of Living",
        description:
          "Ranked list of countries by average monthly cost of living, quality of life, and safety index.",
        numberOfItems: countries.length,
        itemListElement: countries.map((c, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `Cost of Living in ${c.country}`,
          description: `Average monthly cost of living in ${c.country}: $${c.avgCost.toLocaleString()}. Quality of life: ${c.avgQOL}/100. Safety index: ${c.avgSafety}/100. Currency: ${c.currency}.`,
          url: `https://worldlivingcost.com/country/${c.countrySlug}`,
        })),
      },
    ],
  };

  // Continent-specific rankings, computed from the live dataset, used to keep
  // FAQ answers in sync with whatever the data actually says.
  const europeCheapest = [...countries]
    .filter((c) => c.continent === "Europe")
    .sort((a, b) => a.avgCost - b.avgCost)
    .slice(0, 9)
    .map((c) => c.country);
  const asiaCheapest = [...countries]
    .filter((c) => c.continent === "Asia")
    .sort((a, b) => a.avgCost - b.avgCost)
    .slice(0, 9)
    .map((c) => c.country);
  const cheapest10 = cheapestCountries.slice(0, 10).map((c) => c.country).join(", ");
  // No dedicated "retirement" field exists in the dataset, so we use cheapest
  // countries with a reasonable quality-of-life score as a defensible proxy,
  // instead of a hardcoded list that can drift from what the data says.
  const cheapestRetirementCountries = [...countries]
    .filter((c) => c.avgQOL >= 55)
    .sort((a, b) => a.avgCost - b.avgCost)
    .slice(0, 6)
    .map((c) => c.country);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which country has the lowest cost of living in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Countries with the lowest cost of living in 2025 include ${cheapest10}. In these countries, a single person can typically live comfortably on $500 to $900 per month including rent, food, transportation, and utilities.`,
        },
      },
      {
        "@type": "Question",
        name: "What is the cheapest country to retire in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The cheapest countries to retire in 2025, based on affordability and quality of life, include ${cheapestRetirementCountries.join(", ")}. These destinations combine affordable living costs with a reasonable standard of infrastructure and healthcare.`,
        },
      },
      {
        "@type": "Question",
        name: "Which countries are best for digital nomads and remote workers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best and most affordable countries for digital nomads in 2025 include Thailand, Vietnam, Georgia, Portugal, Mexico, Colombia, Indonesia (Bali), and Estonia. These countries offer fast internet, digital nomad visa programs, affordable living costs under $2,000 per month, and vibrant expat communities.",
        },
      },
      {
        "@type": "Question",
        name: "How do I compare cost of living between countries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use Worldlivingcost's free country and city comparison tool at worldlivingcost.com/compare. Select any two countries or cities to instantly compare rent, groceries, transportation, healthcare, and salaries side by side. Data is sourced from contributors and official sources and updated monthly.",
        },
      },
      {
        "@type": "Question",
        name: "Which European countries have the lowest cost of living?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The cheapest European countries to live in 2025 are ${europeCheapest.join(", ")}. Monthly living expenses in the cheapest Eastern European countries can be as low as $700 to $1,200.`,
        },
      },
      {
        "@type": "Question",
        name: "Which Asian countries are the cheapest to live in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The cheapest Asian countries to live in 2025 are ${asiaCheapest.join(", ")}. These countries offer monthly living costs between $400 and $900 for a single person.`,
        },
      },
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-white border-b border-slate-200 pt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="font-display text-3xl font-bold text-slate-900 mb-3">
      Cost of Living by Country: 195 Countries Ranked (2026)
    </h1>

    <p className="text-slate-500 max-w-2xl mb-4">
      Compare cost of living by country, including monthly living expenses, rent
      prices, salaries, purchasing power, safety, and quality of life rankings.
      Explore the cheapest and most expensive countries to live, work, study,
      retire, or relocate in 2026.
    </p>

    <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
      <li>✓ {countries.length} countries covered</li>
      <li>✓ Cost of living & rent rankings</li>
      <li>✓ Salaries, purchasing power & safety data</li>
      <li>✓ Updated monthly</li>
    </ul>
  </div>
</div>

 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ContinentFilter
          continents={continents}
          countries={countries}
      
        />
      </div>

  
      {/* Quick Answer block — direct-answer format for AI/answer engines */}
      <section id="quick-answer" className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-2">Quick Answer</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            The cheapest countries to live in 2025 include {cheapestNames.join(", ")}. The most
            expensive countries include{" "}
            {mostExpensiveCountries.map((c) => c.country).join(", ")}. Use the country database
            below to compare monthly expenses, quality of life, and safety across{" "}
            {countries.length} countries.
          </p>

          <h2 className="font-display text-lg font-bold text-slate-900 mt-6 mb-2">
            Key Takeaways
          </h2>
          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>{countries.length} countries compared</li>
            <li>Updated monthly</li>
            <li>Includes quality of life data</li>
            <li>Includes safety scores</li>
            <li>Data sourced from contributors and official sources</li>
          </ul>

          <p className="text-xs text-slate-400 mt-4">
            Data updated monthly. Last updated: {lastUpdatedFull} · Data source: Worldlivingcost
            contributor database.
          </p>
        </div>
      </section>

      {/* Above-the-fold, server-rendered ranking table */}
      <section id="cheapest-countries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
          Cheapest Countries to Live In, Ranked (2025)
        </h2>
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
            <tbody className="divide-y divide-slate-100 pointer-cursors">
              {cheapestCountries.map((c, i) => (
                <tr key={c.country}>
                  <td className="px-4 py-2 text-slate-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium text-slate-800">
                    <Link href={`/country/${c.countrySlug}`} className="hover:underline">
                      {c.country}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-slate-600">${c.avgCost.toLocaleString()}</td>
                  <td className="px-4 py-2 text-slate-600">{c.avgQOL}/100</td>
                  <td className="px-4 py-2 text-slate-600">{c.avgSafety}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top 20 Most Expensive Countries — server rendered */}
      <section id="most-expensive-countries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
          Most Expensive Countries to Live In, Ranked (2025)
        </h2>
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
              {mostExpensiveCountries20.map((c, i) => (
                <tr key={c.country}>
                  <td className="px-4 py-2 text-slate-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium text-slate-800">
                    <Link href={`/country/${c.countrySlug}`} className="hover:underline">
                      {c.country}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-slate-600">${c.avgCost.toLocaleString()}</td>
                  <td className="px-4 py-2 text-slate-600">{c.avgQOL}/100</td>
                  <td className="px-4 py-2 text-slate-600">{c.avgSafety}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top 20 Safest Countries — server rendered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
          Safest Countries, Ranked (2025)
        </h2>
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
              {safestCountries20.map((c, i) => (
                <tr key={c.country}>
                  <td className="px-4 py-2 text-slate-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium text-slate-800">
                    <Link href={`/country/${c.countrySlug}`} className="hover:underline">
                      {c.country}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-slate-600">{c.avgSafety}/100</td>
                  <td className="px-4 py-2 text-slate-600">${c.avgCost.toLocaleString()}</td>
                  <td className="px-4 py-2 text-slate-600">{c.avgQOL}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Direct Q&A sections — AI Overview / Perplexity citation format */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
              What Are the Cheapest Countries to Live in 2025?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              According to Worldlivingcost data, the cheapest countries to live in 2025 include{" "}
              {cheapestNames.join(", ")}. Average monthly living expenses range from $400 to $900
              depending on city, lifestyle, and housing costs.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
              What Are the Best Countries for Remote Workers?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              The best countries for remote workers and digital nomads combine low living costs
              with fast internet and nomad-friendly visas. Thailand, Vietnam, Georgia, Portugal,
              and Mexico are consistently ranked among the top choices, with typical monthly
              budgets under $1,500.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
              What Are the Cheapest Countries to Retire In?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {cheapestRetirementCountries.join(", ")} are among the cheapest countries to retire
              in 2025 based on affordability and quality-of-life data, offering budgets typically
              between $1,000 and $2,000 per month for a couple.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
              Which Countries Have the Highest Quality of Life?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {[...countries]
                .sort((a, b) => b.avgQOL - a.avgQOL)
                .slice(0, 6)
                .map((c) => c.country)
                .join(", ")}{" "}
              rank among the highest for quality of life in the Worldlivingcost database,
              combining strong infrastructure, healthcare, and safety scores.
            </p>
          </div>
        </div>
      </section>

      {/* Informational depth block — topical authority / NLP coverage for GEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-t border-slate-100 pt-14">
        <div className="max-w-3xl space-y-8">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
              How Cost of Living Is Calculated
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Worldlivingcost calculates cost of living using housing, groceries, transportation,
              utilities, dining, healthcare, and local purchasing power data collected across
              cities and countries worldwide. Figures are averaged across each country's tracked
              cities to produce the country-level estimates shown on this page.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
              Factors That Affect Cost of Living
            </h2>
            <ul className="text-slate-500 text-sm leading-relaxed space-y-1 list-disc list-inside">
              <li>Housing prices</li>
              <li>Rent demand</li>
              <li>Utility costs</li>
              <li>Food prices</li>
              <li>Transportation expenses</li>
              <li>Healthcare costs</li>
              <li>Average salaries</li>
              <li>Inflation rates</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
              Cost of Living vs Quality of Life
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              A low cost of living does not always mean a higher quality of life. Countries with
              affordable housing and food may offer different healthcare, infrastructure, safety,
              and employment opportunities. That's why this page tracks quality of life and
              safety alongside average monthly cost, rather than ranking countries on price
              alone.
            </p>
          </div>
        </div>
      </section>
  {/* SEO Content Block */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-slate-100">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div>
      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        Cheapest Countries to Live in 2025
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed mb-2">
        Many countries offer very low living costs. A single person can live well on $500–$900 per month.
      </p>
      <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside mb-5">
        <li>Pakistan – from $400/month</li>
        <li>India – from $450/month</li>
        <li>Nepal – from $480/month</li>
        <li>Vietnam – from $550/month</li>
        <li>Cambodia – from $600/month</li>
      </ul>

      <h2 id="retirement" className="font-display text-xl font-bold text-slate-900 mb-3">
        Best Countries to Retire Abroad
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed mb-2">
        These countries combine low costs with a reasonable quality of life, based on affordability and quality-of-life data.
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
        These countries have fast internet and low costs. Most offer digital nomad visas.
      </p>
      <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside mb-5">
        <li>Thailand – fast WiFi, under $1,500/month</li>
        <li>Vietnam – very affordable, great cafes</li>
        <li>Georgia – nomad visa available</li>
        <li>Portugal – EU access, good infrastructure</li>
        <li>Mexico – close to US timezone</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        Safest Countries
      </h2>
      <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside mb-5">
        {safestCountries.map((c) => (
          <li key={c.country}>
            {c.country} – safety score {c.avgSafety}/100
          </li>
        ))}
      </ul>

      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        How to Compare Countries
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed">
        Use the{" "}
        <Link href="/compare" className="text-blue-600 hover:underline">
          free comparison tool
        </Link>
        . Pick any two cities. See rent, food, and salary differences. Data updates every month.
      </p>
    </div>
  </div>

  <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <h3 className="font-semibold text-slate-900 mb-2 text-sm">Asia</h3>
      <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
        <li>Pakistan – $400–$700/month</li>
        <li>India – $450–$800/month</li>
        <li>Vietnam – $550–$900/month</li>
        <li>Nepal – from $480/month</li>
      </ul>
    </div>
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <h3 className="font-semibold text-slate-900 mb-2 text-sm">Europe</h3>
      <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
        <li>Georgia – $700–$1,000/month</li>
        <li>Albania – from $750/month</li>
        <li>Bulgaria – $800–$1,200/month</li>
        <li>Romania – from $900/month</li>
      </ul>
    </div>
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <h3 className="font-semibold text-slate-900 mb-2 text-sm">Americas</h3>
      <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
        <li>Bolivia – from $700/month</li>
        <li>Colombia – $900–$1,400/month</li>
        <li>Ecuador – from $800/month</li>
        <li>Paraguay – very affordable</li>
      </ul>
    </div>
  </div>
  {/* Popular Comparisons */}
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
        <p className="text-sm font-semibold text-slate-800">{formatCityLabel(city.slug)}</p>
        <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
      </Link>
    ))}
  </div>
</div>

{/* Popular Countries — internal linking boost to top 20 countries */}
<div className="mt-8 border-t border-slate-100 pt-8">
  <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Popular Countries</h2>
  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
    {[...countries]
      .sort((a, b) => a.avgCost - b.avgCost)
      .slice(0, 20)
      .map((c) => (
        <Link key={c.country} href={`/country/${c.countrySlug}`} className="text-blue-600 hover:underline">
          {c.country}
        </Link>
      ))}
  </div>
</div>

{/* Internal Link Depth — hub-and-spoke structure for AI retrieval */}
<div className="mt-8 border-t border-slate-100 pt-8">
  <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Explore More</h2>
  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
    {popularCities[0] && (
      <Link href={`/city/${popularCities[0].slug}`} className="text-blue-600 hover:underline">
        Cost of Living by City
      </Link>
    )}
    <Link href="/countries" className="text-blue-600 hover:underline">
      Cost of Living by Country
    </Link>
      <Link href="/cost-of-living-calculator" className="text-blue-600 hover:underline">
      Cost of Living by calculator
    </Link>
    <Link href="/compare" className="text-blue-600 hover:underline">
      Compare Cities
    </Link>
    <a href="#cheapest-countries" className="text-blue-600 hover:underline">
      Cheapest Countries
    </a>
    <a href="#most-expensive-countries" className="text-blue-600 hover:underline">
      Most Expensive Countries
    </a>
    <a href="#remote-workers" className="text-blue-600 hover:underline">
      Digital Nomad Countries
    </a>
    <a href="#retirement" className="text-blue-600 hover:underline">
      Retirement Countries
    </a>
  </div>
  <p className="text-xs text-slate-400 mt-3">
    Note: "Cheapest / Most Expensive / Digital Nomad / Retirement Countries" are in-page anchors
    for now. Swap them for dedicated routes (e.g. <code>/countries/cheapest</code>) once those
    pages exist.
  </p>
</div>
</section>
    </>
  );
}