import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCityBySlug, getScoreColor, getScoreLabel } from "../../../lib/data";
import { ScoreBar } from "../../../components/ScoreBar";
import CostTable from "../../../components/CostTable";

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Cost of Living in ${city.name}, ${city.country} (2025)`;
  const description = `Cost of living in ${city.name}: average $${city.avgMonthlyCost.toLocaleString()}/month. Compare rent, groceries, transport, utilities, and salaries. Quality of life index: ${city.qualityOfLife}/100. Real data for expats and remote workers.`;
  const canonicalUrl = `https://worldlivingcost.com/city/${city.slug}`;

  return {
    title,
    description,
    keywords: [
      `cost of living ${city.name}`,
      `cost of living in ${city.name}`,
      `${city.name} living costs`,
      `${city.name} monthly expenses`,
      `${city.name} rent prices`,
      `${city.name} average salary`,
      `${city.name} grocery prices`,
      `${city.name} expat guide`,
      `${city.name} cost of living 2025`,
      `is ${city.name} expensive`,
      `${city.name} living expenses`,
      `cheapest neighborhoods ${city.name}`,
      `${city.name} monthly budget`,
      `living in ${city.name}`,
      `moving to ${city.name} cost`,
      `${city.country} cost of living`,
      `cost of living ${city.continent}`,
      `${city.name} quality of life`,
      `${city.name} safety index`,
      `${city.name} vs other cities cost`,
      "cost of living comparison",
      "expat living costs",
      "remote work city cost",
      "affordable cities worldwide",
      "city cost of living index",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: `Cost of Living in ${city.name}, ${city.country} 2025 Guide`,
      description: `Planning to move to or visit ${city.name}? Average monthly cost is $${city.avgMonthlyCost.toLocaleString()}. Compare rent, groceries, transport, healthcare, and salaries with real-time data. Quality of life: ${city.qualityOfLife}/100.`,
      images: [
        {
          url: city.image,
          width: 1200,
          height: 630,
          alt: `${city.name} city skyline cost of living guide ${city.country}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Cost of Living in ${city.name} (2025) $${city.avgMonthlyCost.toLocaleString()}/month`,
      description: `Compare rent, groceries, transport, and salaries in ${city.name}, ${city.country}. Real-time data for expats, remote workers, and travelers.`,
      images: [city.image],
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
}

const scoreMetrics = [
  { key: "qualityOfLife", label: "Quality of Life" },
  { key: "purchasingPower", label: "Purchasing Power" },
  { key: "safety", label: "Safety" },
  { key: "healthcare", label: "Healthcare" },
  { key: "climate", label: "Climate" },
  { key: "trafficCommute", label: "Traffic & Commute" },
];

export default async function CityPage({ params }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const canonicalUrl = `https://worldlivingcost.com/city/${city.slug}`;

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
        name: "City Rankings",
        item: "https://worldlivingcost.com/rankings",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Cost of Living in ${city.name}`,
        item: canonicalUrl,
      },
    ],
  };

  // Place JSON-LD — city entity with cost-of-living data
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: city.name,
    description: `Cost of living in ${city.name}, ${city.country}: average monthly cost $${city.avgMonthlyCost.toLocaleString()}. Cost index: ${city.costIndex} (NYC=100). Quality of life index: ${city.qualityOfLife}/100.`,
    url: canonicalUrl,
    image: city.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: city.country,
    },
    containedInPlace: {
      "@type": "Country",
      name: city.country,
    },
  };

  // FAQPage JSON-LD — city-specific high-traffic Q&As
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the cost of living in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The average cost of living in ${city.name}, ${city.country} is approximately $${city.avgMonthlyCost.toLocaleString()} per month for a single person, including rent, food, transportation, and utilities. The cost index is ${city.costIndex} relative to New York City (NYC = 100).`,
        },
      },
      {
        "@type": "Question",
        name: `How much does rent cost in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Rent in ${city.name} varies by neighborhood and apartment size. The rent index is ${city.rentIndex} (NYC=100). Use Worldlivingcost city comparison tool to see detailed rent prices for ${city.name} alongside other cities worldwide.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${city.name} expensive to live in?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name} has a cost index of ${city.costIndex} compared to New York City (100). ${city.costIndex < 50 ? `At ${city.costIndex}, ${city.name} is considered very affordable and one of the cheaper cities globally.` : city.costIndex < 80 ? `At ${city.costIndex}, ${city.name} is moderately priced more affordable than most Western cities.` : `At ${city.costIndex}, ${city.name} is on the more expensive side globally.`} The average monthly budget for a single person is around $${city.avgMonthlyCost.toLocaleString()}.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the quality of life in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name} has a quality of life index of ${city.qualityOfLife}/100 and a safety index of ${city.safety}/100. The city is located in ${city.continent} and offers a ${getScoreLabel(city.qualityOfLife).toLowerCase()} quality of life rating based on factors including safety, healthcare, climate, and infrastructure.`,
        },
      },
      {
        "@type": "Question",
        name: `How does the cost of living in ${city.name} compare to other cities?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use Worldlivingcost's free comparison tool to compare ${city.name} with any city worldwide. ${city.name}'s cost index is ${city.costIndex} (NYC=100), making it ${city.costIndex < 100 ? "cheaper" : "more expensive"} than New York. Compare rent, groceries, transport, healthcare, and salaries side by side at Worldlivingcost.world/compare.`,
        },
      },
    ],
  };

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
    salaries: "Salaries & Financing",
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link href="/rankings" className="hover:text-slate-900">Cities</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{city.name}</span>
          </nav>
        </div>
      </div>

      {/* City Hero */}
      <section className="relative bg-white">
        <div className="relative h-64 sm:h-80">
          <img
            src={city.image}
            alt={`${city.name} skyline`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {city.name}
                </h1>
                <p className="text-white/80 mt-1">{city.country} · {city.continent}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/compare?city1=${city.slug}`}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M5 3l-4 4 4 4M9 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Compare
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Monthly Cost", value: `$${city.avgMonthlyCost.toLocaleString()}`, sub: "avg/person" },
            { label: "Cost Index", value: city.costIndex, sub: "NYC=100" },
            { label: "Rent Index", value: city.rentIndex, sub: "NYC=100" },
            { label: "Quality of Life", value: city.qualityOfLife, sub: getScoreLabel(city.qualityOfLife) },
            { label: "Safety Index", value: city.safety, sub: getScoreLabel(city.safety) },
            { label: "Population", value: city.population, sub: city.currency },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center"
            >
              <p className="text-xl font-display font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5">{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scores sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-24">
              <h2 className="font-display font-bold text-slate-900 mb-4">
                Quality Indices
              </h2>
              <div className="space-y-3">
                {scoreMetrics.map((m) => (
                  <ScoreBar key={m.key} label={m.label} value={city[m.key]} />
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Currency</h3>
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded">
                    {city.currency}
                  </span>
                  <span className="text-xs text-slate-500">Prices shown in USD</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Data collected from contributors and public sources. Updated monthly.
                  Prices are indicative.
                </p>
              </div>
            </div>
          </div>

          {/* Cost tables */}
          <div className="lg:col-span-2 space-y-5">
            {Object.entries(city.categories).map(([key, items]) => (
              <CostTable
                key={key}
                icon={categoryIcons[key]}
                title={categoryLabels[key]}
                items={items}
                category={key}
              />
            ))}
          </div>
          {/* SEO Text Block */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 lg:col-span-3">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
            Cost of Living in {city.name} — Complete Guide ({new Date().getFullYear()})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">Monthly Budget Overview</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                The average cost of living in {city.name}, {city.country} is approximately ${city.avgMonthlyCost.toLocaleString()} per month for a single person. This includes rent, groceries, local transport, and utilities. Compared to New York City (index 100), {city.name} has a cost index of {city.costIndex}, making it {city.costIndex < 100 ? `around ${100 - city.costIndex}% more affordable` : `around ${city.costIndex - 100}% more expensive`}.
              </p>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">Rent and Housing</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Renting a one-bedroom apartment outside the city center in {city.name} costs around ${city.categories.housing["1BR Outside"].toLocaleString()}/month, while a one-bedroom in the center is approximately ${city.categories.housing["1BR Center"].toLocaleString()}/month. A three-bedroom apartment in the center averages ${city.categories.housing["3BR Center"].toLocaleString()}/month. The rent index is {city.rentIndex} compared to New York City.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">Quality of Life and Safety</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {city.name} scores {city.qualityOfLife}/100 on the quality of life index and {city.safety}/100 on safety. Healthcare is rated {city.healthcare}/100. The climate index is {city.climate}/100. These scores are based on factors including infrastructure, pollution levels, healthcare access, and crime rates reported by residents and contributors.
              </p>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">Salaries and Purchasing Power</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                The average net salary in {city.name} is approximately ${city.categories.salaries["Average Net Salary"].toLocaleString()}/month. With a purchasing power index of {city.purchasingPower}/100, residents can cover basic expenses and save modestly. The local currency is {city.currency}, though all prices on this page are displayed in USD for easy international comparison.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-2">
              How does {city.name} compare to other cities?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {city.name} is located in {city.continent} with a population of approximately {city.population}. At a cost index of {city.costIndex} (NYC = 100), it is {city.costIndex < 50 ? "one of the most affordable cities in the world, ideal for budget-conscious expats, remote workers, and retirees" : city.costIndex < 80 ? "a moderately affordable city, offering good value compared to most Western cities" : city.costIndex < 120 ? "a mid-range city in terms of global cost of living" : "one of the more expensive cities globally"}. Use the{" "}
              <Link href={`/compare?city1=${city.slug}`} className="text-blue-600 hover:underline">
                free comparison tool
              </Link>{" "}
              to see how {city.name} stacks up against any other city worldwide across rent, groceries, transport, and salaries.
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}