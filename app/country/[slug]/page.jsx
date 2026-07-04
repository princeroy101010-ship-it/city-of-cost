import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cities, getCountryBySlug, getScoreLabel } from "../../../lib/data";
import { ScoreBar } from "../../../components/ScoreBar";
import CostTable from "../../../components/CostTable";

export async function generateStaticParams() {
  // FIX #1: dedupe country slugs — without this, a country with 50 cities
  // generated the same static param 50 times.
  const uniqueSlugs = [...new Set(cities.map((city) => city.countrySlug))];
  return uniqueSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return {};
  }

  const YEAR = new Date().getFullYear();

 const title = `Cost of Living in ${country.name} (${YEAR}) | Prices & Rent`;

const description =
  `Compare cost of living in ${country.name}, including rent, salaries, groceries, healthcare, transport and purchasing power.`;
  const canonicalUrl = `https://worldlivingcost.com/country/${country.slug}`;

  return {
    title,
    description,
    keywords: [
      `cost of living ${country.name}`,
      `cost of living in ${country.name}`,
      `${country.name} living costs`,
      `${country.name} monthly expenses`,
      `${country.name} rent prices`,
      `${country.name} average salary`,
      `${country.name} grocery prices`,
      `${country.name} expat guide`,
      `${country.name} cost of living ${YEAR}`,
      `is ${country.name} expensive`,
      `${country.name} living expenses`,
      `cheapest neighborhoods ${country.name}`,
      `${country.name} monthly budget`,
      `living in ${country.name}`,
      `moving to ${country.name} cost`,
      `${country.name} digital nomad cost`,
      `${country.name} remote work`,
      `${country.name} for families`,
      `${country.name} for students`,
      `best cities in ${country.name}`,
      `pros and cons of living in ${country.name}`,
      `${country.country} cost of living`,
      `cost of living ${country.continent}`,
      `${country.name} quality of life`,
      `${country.name} safety index`,
      `${country.name} vs other cities cost`,
      `${country.name} public transport cost`,
      `${country.name} utilities cost`,
      `${country.name} food prices`,
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
      type: "website",
      url: canonicalUrl,
      title: `Cost of Living in ${country.name}, ${country.country} ${YEAR} Guide`,
      description: `Planning to move to or visit ${country.name}? Average monthly cost is $${country.avgMonthlyCost.toLocaleString()}. Compare rent, groceries, transport, healthcare, and salaries with real-time data. Quality of life: ${country.qualityOfLife}/100.`,
      images: [
        {
          url: country.image,
          width: 1200,
          height: 630,
          alt: `${country.name} skyline cost of living guide ${country.country}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Cost of Living in ${country.name} (${YEAR}) $${country.avgMonthlyCost.toLocaleString()}/month`,
      description: `Compare rent, groceries, transport, and salaries in ${country.name}, ${country.country}. Real-time data for expats, remote workers, and travelers.`,
      images: [country.image],
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

export default async function CountryPage({ params }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) notFound();

  const countryCities = cities.filter(
    (city) => city.countrySlug === country.slug
  );

  const YEAR = new Date().getFullYear();
  const UPDATED_DATE = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const description =
    `Compare cost of living in ${country.name}, including rent prices, groceries, healthcare costs, salaries, purchasing power and quality of life rankings. Updated monthly.`;
  const canonicalUrl = `https://worldlivingcost.com/country/${country.slug}`;

  const firstCitySlug = countryCities[0]?.slug;
  const compareHref = firstCitySlug
    ? `/compare?city1=${firstCitySlug}`
    : `/compare`;

  // "Best cities" shortlist — top 5 by quality of life score, falls back
  // gracefully if a country only has 1-2 cities in the dataset.
  const bestCities = [...countryCities]
    .sort((a, b) => (b.qualityOfLife || 0) - (a.qualityOfLife || 0))
    .slice(0, 5);

  // Pros/cons generated from the actual scored data rather than static copy,
  // so every country page says something true and specific about itself.
  const pros = [];
  const cons = [];

  if (country.costIndex < 80) pros.push(`Affordable overall cost of living (index ${country.costIndex}, NYC = 100)`);
  else cons.push(`Higher overall cost of living (index ${country.costIndex}, NYC = 100)`);

  if (country.safety >= 60) pros.push(`Strong safety rating (${country.safety}/100)`);
  else cons.push(`Safety score is below average (${country.safety}/100) — research neighborhoods carefully`);

  if (country.healthcare >= 60) pros.push(`Good healthcare access and quality (${country.healthcare}/100)`);
  else cons.push(`Healthcare index is on the lower side (${country.healthcare}/100)`);

  if (country.purchasingPower >= 60) pros.push(`Solid purchasing power for residents (${country.purchasingPower}/100)`);
  else cons.push(`Purchasing power is limited relative to local prices (${country.purchasingPower}/100)`);

  if (country.trafficCommute >= 60) pros.push(`Manageable traffic and commute times (${country.trafficCommute}/100)`);
  else cons.push(`Traffic and commute can be a challenge (${country.trafficCommute}/100)`);

  if (country.climate >= 60) pros.push(`Favorable climate year-round (${country.climate}/100)`);
  else cons.push(`Climate scores lower (${country.climate}/100) — check seasonal conditions`);

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldlivingcost.com" },
      { "@type": "ListItem", position: 2, name: "Countries", item: "https://worldlivingcost.com/country" },
      { "@type": "ListItem", position: 3, name: `Cost of Living in ${country.name}`, item: canonicalUrl },
    ],
  };

  // FIX: WebPage schema now includes "about", "mainEntity", and "speakable"
  // for AI Overviews / GEO / voice-assistant readability.
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Cost of Living in ${country.name}`,
    url: canonicalUrl,
    description: description,
    isPartOf: {
      "@type": "WebSite",
      url: "https://worldlivingcost.com",
    },
    about: {
      "@type": "Thing",
      name: `Cost of Living in ${country.name}`,
    },
    mainEntity: {
      "@type": "Dataset",
      name: `${country.name} Cost of Living Data`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".seo-summary", ".faq-section"],
    },
  };

  const countryDatasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id":"https://worldlivingcost.com/#organization",
    name: `${country.name} Cost of Living Data`,
    description:
      `Cost of living, rent prices, salaries, healthcare costs and quality of life data for ${country.name}.`,
    url: canonicalUrl,
    creator: { "@id": "https://worldlivingcost.com/#organization" },
    publisher: { "@id": "https://worldlivingcost.com/#organization" },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
  };

  const countryJsonLd = {
  "@context":"https://schema.org",
  "@type":"Country",
  name: country.name,
  url: canonicalUrl,
  image: country.image,
  population: country.population,
  currenciesAccepted: country.currency,
  description: description
};

  // FIX #2: "city" wording removed from FAQ copy — this is the country page.
  const faqItems = [
    {
      q: `What is the cost of living in ${country.name}?`,
      a: `The average cost of living in ${country.name}, ${country.country} is approximately $${country.avgMonthlyCost.toLocaleString()} per month for a single person, including rent, food, transportation, and utilities. The cost index is ${country.costIndex} relative to New York City (NYC = 100).`,
    },
    {
      q: `How much does rent cost in ${country.name}?`,
      a: `Rent in ${country.name} varies by neighborhood and apartment size. The rent index is ${country.rentIndex} (NYC=100). A 1-bedroom apartment outside the center averages around $${country.categories.housing["1BR Outside"].toLocaleString()}/month, while a 1-bedroom in the center runs closer to $${country.categories.housing["1BR Center"].toLocaleString()}/month.`,
    },
    {
      q: `Is ${country.name} expensive to live in?`,
      a: `${country.name} has a cost index of ${country.costIndex} compared to New York City (100). ${country.costIndex < 50 ? `At ${country.costIndex}, ${country.name} is considered very affordable and one of the cheaper places globally.` : country.costIndex < 80 ? `At ${country.costIndex}, ${country.name} is moderately priced, more affordable than most Western countries.` : `At ${country.costIndex}, ${country.name} is on the more expensive side globally.`} The average monthly budget for a single person is around $${country.avgMonthlyCost.toLocaleString()}.`,
    },
    {
      q: `What is the quality of life in ${country.name}?`,
      a: `${country.name} has a quality of life index of ${country.qualityOfLife}/100 and a safety index of ${country.safety}/100. Located in ${country.continent}, it offers a ${getScoreLabel(country.qualityOfLife).toLowerCase()} quality of life rating based on factors including safety, healthcare, climate, and infrastructure.`,
    },
    {
      q: `What is the average salary in ${country.name}?`,
      a: `The average net salary in ${country.name} is approximately $${country.categories.salaries["Average Net Salary"].toLocaleString()}/month, with a purchasing power index of ${country.purchasingPower}/100.`,
    },
    {
      q: `Is ${country.name} good for digital nomads and remote workers?`,
      a: `${country.name} has a cost index of ${country.costIndex} and a quality of life score of ${country.qualityOfLife}/100, making it ${country.costIndex < 80 && country.qualityOfLife > 60 ? "an attractive option for remote workers looking for a strong balance of affordability and livability" : "worth evaluating against your specific budget and lifestyle needs"}. Check current rent, transport, and utility costs above before planning a move.`,
    },
    {
      q: `What is the best city to live in ${country.name}?`,
      a: bestCities.length
        ? `Based on quality of life scores, ${bestCities[0].name} currently ranks highest among the cities tracked in ${country.name}, followed by ${bestCities.slice(1, 3).map((c) => c.name).join(" and ")}.`
        : `Check the individual city pages for ${country.name} to compare quality of life, safety, and cost data across locations.`,
    },
    {
      q: `How does the cost of living in ${country.name} compare to other countries?`,
      a: `Use Worldlivingcost's free comparison tool to compare ${country.name} with any city or country worldwide. ${country.name}'s cost index is ${country.costIndex} (NYC=100), making it ${country.costIndex < 100 ? "cheaper" : "more expensive"} than New York. Compare rent, groceries, transport, healthcare, and salaries side by side at https://worldlivingcost.com/compare`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Cities in ${country.name}`,
    itemListElement: countryCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://worldlivingcost.com/city/${city.slug}`,
      name: city.name,
    })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(countryDatasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(countryJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link href="/country" className="hover:text-slate-900">Countries</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{country.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white">
        <div className="relative h-64 sm:h-80">
          {/* FIX: next/image for better CLS/LCP instead of raw <img> */}
          <Image
            src={country.image}
            alt={`Cost of Living in ${country.name}, ${country.country} - Country Guide`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
  {country.name} Cost of Living, Rent Prices, Salaries & Quality of Life ({YEAR})
</h1>
                <p className="text-white/80 mt-1">{country.country} · {country.continent}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={compareHref}
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
            { label: "Monthly Cost", value: `$${country.avgMonthlyCost.toLocaleString()}`, sub: "avg/person" },
            { label: "Cost Index", value: country.costIndex, sub: "NYC=100" },
            { label: "Rent Index", value: country.rentIndex, sub: "NYC=100" },
            { label: "Quality of Life", value: country.qualityOfLife, sub: getScoreLabel(country.qualityOfLife) },
            { label: "Safety Index", value: country.safety, sub: getScoreLabel(country.safety) },
            { label: "Population", value: country.population, sub: country.currency },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
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
              <h2 className="font-display font-bold text-slate-900 mb-4">Quality Indices</h2>
              <div className="space-y-3">
                {scoreMetrics.map((m) => (
                  <ScoreBar key={m.key} label={m.label} value={country[m.key]} />
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Currency</h3>
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded">
                    {country.currency}
                  </span>
                  <span className="text-xs text-slate-500">Prices shown in USD</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed mt-6 pt-5 border-t border-slate-100">
                <p>Data collected from contributors and public sources.</p>
                <p>Updated: {UPDATED_DATE}</p>
                <p>Prices are indicative.</p>
              </div>

              {countryCities.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Cities in {country.name}
                  </h3>
                  <ul className="space-y-1.5">
                    {countryCities.map((city) => (
                      <li key={city.slug}>
                        <Link href={`/city/${city.slug}`} className="text-sm text-blue-600 hover:underline">
                          Cost of living in {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Cost tables */}
          <div className="lg:col-span-2 space-y-5">
            {Object.entries(country.categories).map(([key, items]) => (
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
          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 lg:col-span-3 seo-summary">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
              Cost of Living in {country.name} — Complete Guide ({YEAR})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 text-sm mb-2">Monthly Budget Overview</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  The average cost of living in {country.name}, {country.country} is approximately ${country.avgMonthlyCost.toLocaleString()} per month for a single person. This includes rent, groceries, local transport, and utilities. Compared to New York City (index 100), {country.name} has a cost index of {country.costIndex}, making it {country.costIndex < 100 ? `around ${100 - country.costIndex}% more affordable` : `around ${country.costIndex - 100}% more expensive`}. Individuals and couples should budget higher depending on housing size and lifestyle choices, while students and solo remote workers often spend near the lower end of this range.
                </p>

                <h3 className="font-semibold text-slate-800 text-sm mb-2">Rent and Housing Costs</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Renting a one-bedroom apartment outside major population centers in {country.name} costs around ${country.categories.housing["1BR Outside"].toLocaleString()}/month, while a one-bedroom in a central area is approximately ${country.categories.housing["1BR Center"].toLocaleString()}/month. A three-bedroom apartment in a central area averages ${country.categories.housing["3BR Center"].toLocaleString()}/month. The rent index for {country.name} is {country.rentIndex} compared to New York City (NYC = 100).
                </p>

                <h3 className="font-semibold text-slate-800 text-sm mb-2">Food, Groceries & Dining Out</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Everyday grocery costs and restaurant prices in {country.name} play a major role in the overall monthly budget. Prices vary between local markets, mid-range restaurants, and imported goods, so residents who cook at home and shop at local markets typically spend noticeably less than those who eat out often. See the Restaurants and Markets & Groceries tables above for a full item-by-item price breakdown.
                </p>

                <h3 className="font-semibold text-slate-800 text-sm mb-2">Transportation Costs</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Public transport, taxis, fuel, and vehicle costs in {country.name} are detailed in the Transportation table above. A traffic and commute score of {country.trafficCommute}/100 indicates how easy day-to-day travel around the country generally is, which matters when comparing regions before relocating.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 text-sm mb-2">Quality of Life and Safety</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {country.name} scores {country.qualityOfLife}/100 on the quality of life index and {country.safety}/100 on safety. Healthcare is rated {country.healthcare}/100. The climate index is {country.climate}/100. These scores are based on factors including infrastructure, pollution levels, healthcare access, and crime rates reported by residents and contributors, and are updated regularly to reflect current conditions.
                </p>

                <h3 className="font-semibold text-slate-800 text-sm mb-2">Salaries and Purchasing Power</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  The average net salary in {country.name} is approximately ${country.categories.salaries["Average Net Salary"].toLocaleString()}/month. With a purchasing power index of {country.purchasingPower}/100, residents can cover basic expenses and save modestly. The local currency is {country.currency}, though all prices on this page are displayed in USD for easy international comparison.
                </p>

                <h3 className="font-semibold text-slate-800 text-sm mb-2">Utilities & Monthly Bills</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Electricity, water, heating/cooling, and internet costs are broken down in the Utilities & Services table above. Combined with rent, these fixed monthly costs form the core of any relocation budget for {country.name}.
                </p>

                <h3 className="font-semibold text-slate-800 text-sm mb-2">Is {country.name} Good for Digital Nomads?</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Remote workers evaluating {country.name} should weigh the {country.costIndex} cost index against the {country.qualityOfLife}/100 quality of life score and {country.safety}/100 safety rating. Combined with reliable internet infrastructure (see Utilities above), these numbers help determine whether {country.name} fits a remote-work budget and lifestyle.
                </p>
              </div>
            </div>

            {/* NEW: Monthly Budget Breakdown table */}
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Monthly Budget Breakdown in {country.name}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-slate-700">Expense</th>
                      <th className="px-4 py-2 font-semibold text-slate-700">Estimated Monthly Cost (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-2 text-slate-600">Rent — 1BR Outside Center</td>
                      <td className="px-4 py-2 text-slate-900 font-medium">
                        ${country.categories.housing["1BR Outside"].toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-slate-600">Rent — 1BR City Center</td>
                      <td className="px-4 py-2 text-slate-900 font-medium">
                        ${country.categories.housing["1BR Center"].toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-slate-600">Rent — 3BR City Center</td>
                      <td className="px-4 py-2 text-slate-900 font-medium">
                        ${country.categories.housing["3BR Center"].toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-slate-600">Average Net Salary</td>
                      <td className="px-4 py-2 text-slate-900 font-medium">
                        ${country.categories.salaries["Average Net Salary"].toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-2 text-slate-800 font-semibold">Total Avg. Monthly Cost (single person, all-inclusive)</td>
                      <td className="px-4 py-2 text-slate-900 font-bold">
                        ${country.avgMonthlyCost.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                See the Restaurants, Markets & Groceries, Transportation, and Utilities tables above for a full itemized breakdown.
              </p>
            </div>

            {/* NEW: Families section */}
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Cost of Living for Families in {country.name}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Families relocating to {country.name} typically need a larger home, higher grocery spend, and budget for schooling and healthcare. A 3-bedroom apartment in a central area runs around ${country.categories.housing["3BR Center"].toLocaleString()}/month, and with a healthcare index of {country.healthcare}/100 and safety index of {country.safety}/100, {country.name} is {country.healthcare >= 60 && country.safety >= 60 ? "generally considered a solid option for raising children" : "worth researching neighborhood-by-neighborhood before committing to a family move"}. Total household budgets usually run well above the single-person average of ${country.avgMonthlyCost.toLocaleString()}/month once housing size, schooling, and childcare are factored in.
              </p>
            </div>

            {/* NEW: Students section */}
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Student Living Costs in {country.name}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Students in {country.name} generally spend less than the citywide single-person average by sharing accommodation, using public transport, and cooking at home. With a cost index of {country.costIndex} (NYC = 100) and a rent index of {country.rentIndex}, budget-conscious students can often keep total monthly spend meaningfully below the ${country.avgMonthlyCost.toLocaleString()} average, especially if renting outside the city center at roughly ${country.categories.housing["1BR Outside"].toLocaleString()}/month or splitting that cost with roommates.
              </p>
            </div>

            {/* NEW: Best Cities section */}
            {bestCities.length > 0 && (
              <div className="mt-8 border-t border-slate-100 pt-8">
                <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                  Best Cities to Live in {country.name}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Ranked by quality of life score among the cities tracked in {country.name}:
                </p>
                <ol className="space-y-2">
                  {bestCities.map((city, i) => (
                    <li key={city.slug} className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-800">{i + 1}. </span>
                      <Link href={`/city/${city.slug}`} className="text-blue-600 hover:underline">
                        {city.name}
                      </Link>
                      {typeof city.qualityOfLife === "number" && (
                        <span> — Quality of Life {city.qualityOfLife}/100</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <section>
                <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
Quick Summary</h2>

              <p className="text-sm text-slate-500 leading-relaxed">

The average cost of living in {country.name} is
${country.avgMonthlyCost.toLocaleString()} per month
for a single person. Housing costs average
${country.categories.housing["1BR Outside"].toLocaleString()}
for a one-bedroom apartment outside the city center.
The country scores {country.qualityOfLife}/100 for quality
of life and {country.safety}/100 for safety.
Compared with New York City, {country.name} has a cost
index of {country.costIndex}, making it
{country.costIndex < 100 ? "more affordable" : "more expensive"}.
</p>
</section>

            {/* NEW: Pros and Cons section */}
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Pros and Cons of Living in {country.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-2">Pros</h3>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {pros.map((p) => (
                      <li key={p} className="text-sm text-slate-500">{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-2">Cons</h3>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {cons.map((c) => (
                      <li key={c} className="text-sm text-slate-500">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-slate-100">
              <Link href="/methodology" className="text-sm text-blue-600 hover:underline">
                Methodology
              </Link>
              <Link href="/about" className="text-sm text-blue-600 hover:underline">
                About Worldlivingcost
              </Link>
            </div>

            <div className="mt-5 pt-5 border-t border-slate-100">
              <h3 className="font-semibold text-slate-800 text-sm mb-2">
                How does {country.name} compare to other countries?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {country.name} is located in {country.continent} with a population of approximately {country.population}. At a cost index of {country.costIndex} (NYC = 100), it is {country.costIndex < 50 ? "one of the most affordable countries in the world, ideal for budget-conscious expats, remote workers, and retirees" : country.costIndex < 80 ? "a moderately affordable country, offering good value compared to most Western countries" : country.costIndex < 120 ? "a mid-range country in terms of global cost of living" : "one of the more expensive countries globally"}. Use the{" "}
                <Link href={compareHref} className="text-blue-600 hover:underline">
                  free comparison tool
                </Link>{" "}
                to see how {country.name} stacks up against any other city or country worldwide across rent, groceries, transport, and salaries.
              </p>
            </div>

            {/* Visible FAQ block */}
            <div className="mt-8 border-t border-slate-100 pt-8 faq-section">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Frequently Asked Questions About {country.name}
              </h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.q}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Comparisons */}
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Popular City Cost Comparisons
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link href="/compare/berlin-vs-dubai" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-slate-800">🇩🇪 Berlin</p>
                  <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
                </Link>
                <Link href="/compare/berlin-vs-dubai" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-slate-800">🇦🇪 Dubai</p>
                  <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
                </Link>
                <Link href="/country/hong-kong" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-slate-800">🇭🇰 Hong Kong</p>
                  <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
                </Link>
                <Link href="/country/new-york" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-slate-800">🇺🇸 New York</p>
                  <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
                </Link>
                {/* FIX #3: removed the self-link back to /country/[slug]; now points
                    to the countries index page instead of linking to itself */}
                <Link href="/country" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors col-span-2 sm:col-span-4">
                  <p className="text-sm font-semibold text-slate-800">Browse All Countries</p>
                </Link>
                 <Link href="/cost-of-living-calculator" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors col-span-2 sm:col-span-4">
                  <p className="text-sm font-semibold text-slate-800">Cost of living calculator</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}