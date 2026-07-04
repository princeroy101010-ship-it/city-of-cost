import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCityBySlug, getScoreLabel } from "../../../lib/data";
import { ScoreBar } from "../../../components/ScoreBar";
import CostTable from "../../../components/CostTable";
import Image from "next/image";
import Script from "next/script";
export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }) {
  const YEAR = new Date().getFullYear();
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

const title = `Cost of Living in ${city.name} (${YEAR}) | Prices & Rent`;
const description = `Cost of living in ${city.name}, ${city.country}. Compare rent prices, groceries, transport, salaries, healthcare, taxes and purchasing power.`;  const canonicalUrl = `https://worldlivingcost.com/city/${city.slug}`;

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
      `${city.name} cost of living ${YEAR}`,
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
      title: `Cost of Living in ${city.name}, ${city.country} (${YEAR})`,
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
      title: `Cost of Living in ${city.name} (${YEAR}) | Monthly Expenses`,
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
    const YEAR = new Date().getFullYear();

   

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

  const cityDatasetJsonLd = {
  "@context":"https://schema.org",
  "@type":"Dataset",
  name:`${city.name} Cost of Living Data`,
  description:`Cost of living, rent prices, salaries, quality of life and purchasing power data for ${city.name}.`,
  isAccessibleForFree: true,
dateModified: new Date().toISOString(),
citation: {
  "@type": "CreativeWork",
  name: "Worldlivingcost Cost of Living Database"
},
license: "https://worldlivingcost.com/terms-of-service",
additionalType: "https://schema.org/City",
keywords: [
 "cost of living",
 city.name,
 city.country,
 "rent",
 "salary",
 "quality of life"
],
url: canonicalUrl,
  creator:{
    "@type":"Organization",
    name:"Worldlivingcost"
  },
  publisher:{
    "@type":"Organization",
    name:"Worldlivingcost"
  }
  
}


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
          text: `Use Worldlivingcost's free comparison tool to compare ${city.name} with any city worldwide. ${city.name}'s cost index is ${city.costIndex} (NYC=100), making it ${city.costIndex < 100 ? "cheaper" : "more expensive"} than New York. Compare rent, groceries, transport, healthcare, and salaries side by side at https://worldlivingcost.com/compare`,
        },
      },
      {
 "@type":"Question",
 name:`Can you live comfortably in ${city.name}?`,
 acceptedAnswer:{
   "@type":"Answer",
   text:`Many residents live comfortably in ${city.name} with a monthly budget of around $${city.avgMonthlyCost.toLocaleString()} depending on lifestyle and housing choices.`
 }
},
{
 "@type":"Question",
 name:`Is ${city.name} good for expats?`,
 acceptedAnswer:{
   "@type":"Answer",
   text:`${city.name} is popular among expats due to its job opportunities, quality of life and infrastructure.`
 }
},
{
 "@type":"Question",
 name:`What salary is needed in ${city.name}?`,
 acceptedAnswer:{
   "@type":"Answer",
   text:`A salary above the average monthly living cost of $${city.avgMonthlyCost.toLocaleString()} is generally sufficient for a comfortable lifestyle in ${city.name}.`
 }
},
{
 "@type":"Question",
 name:`Is ${city.name} cheaper than New York?`,
 acceptedAnswer:{
   "@type":"Answer",
   text:`${city.costIndex < 100 ? "Yes" : "No"}, ${city.name} has a cost index of ${city.costIndex} compared with New York City's benchmark index of 100.`
 }
},
{
 "@type":"Question",
 name:`What are the biggest expenses in ${city.name}?`,
 acceptedAnswer:{
   "@type":"Answer",
   text:`Housing, rent, groceries, transportation and healthcare are typically the largest monthly expenses in ${city.name}.`
 }
}
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
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Cost of Living Categories in ${city.name}`,
  itemListElement: Object.keys(city.categories).map((key, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: categoryLabels[key]
  }))
};
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Cost of Living in ${city.name}`,
  dateModified: new Date().toISOString(),
datePublished: "2026-01-01",
author: {
  "@type": "Organization",
  name: "Worldlivingcost"
},
mainEntity: {
  "@type": "Place",
  name: city.name
},
  url: canonicalUrl,
  description:`Cost of living, rent prices, salaries, quality of life and purchasing power data for ${city.name}`,
  inLanguage: "en"
};
const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": `Cost of Living in ${city.name}`,
  "url": canonicalUrl,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".quick-answer"
    ]
  }
};
const definedTermJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Cost of Living Index",
  "description":
    "A relative measure comparing the average living expenses between cities worldwide."
};
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(definedTermJsonLd),
  }}
/>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(speakableJsonLd),
  }}
/>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(webPageJsonLd),
  }}
/>
      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(itemListJsonLd),
  }}
/>

      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(cityDatasetJsonLd),
  }}
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
      <Image
  src={city.image}
  alt={`Cost of Living in ${city.name}, ${city.country}`}
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
 Cost of Living in {city.name}, {city.country}
</h1>
                <p className="text-white/80 mt-1">{city.country} · {city.continent}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/compare`}
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

             <div className="text-xs text-slate-400 leading-relaxed">
  <p>Data collected from contributors and public sources.</p>
  <p>Updated Monthly</p>
  <p>Prices are indicative.</p>
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

          <p className="mt-4">
  <Link
    href={`/country/${city.countrySlug}`}
    className="text-blue-600 hover:underline"
  >
    View Cost of Living in {city.country}
  </Link>
</p>


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
<div className="mt-8 space-y-6">

  <div>
    <h3 className="font-semibold text-slate-800 text-base mb-2">
      Cost of Living vs Salary in {city.name}
    </h3>
    <p className="text-sm text-slate-500 leading-relaxed">
      The average monthly salary in {city.name} is approximately $
      {city.categories.salaries["Average Net Salary"].toLocaleString()}.
      Compared with the average monthly living cost of $
      {city.avgMonthlyCost.toLocaleString()}, residents generally enjoy a
      purchasing power score of {city.purchasingPower}/100.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-slate-800 text-base mb-2">
      Healthcare Costs in {city.name}
    </h3>
    <p className="text-sm text-slate-500 leading-relaxed">
      Healthcare quality in {city.name} is rated {city.healthcare}/100.
      Medical expenses vary depending on insurance coverage and healthcare
      providers, but overall healthcare access remains an important factor
      when evaluating the total cost of living.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-slate-800 text-base mb-2">
      Quality of Life in {city.name}
    </h3>
    <p className="text-sm text-slate-500 leading-relaxed">
      {city.name} has a quality of life score of {city.qualityOfLife}/100,
      supported by factors such as healthcare, safety, climate, purchasing
      power, infrastructure, and public services.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-slate-800 text-base mb-2">
      Cost of Living for Students in {city.name}
    </h3>
    <p className="text-sm text-slate-500 leading-relaxed">
      Students living in {city.name} should budget for accommodation, food,
      transportation, internet, and study-related expenses. Shared housing
      and student discounts can significantly reduce monthly costs.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-slate-800 text-base mb-2">
      Cost of Living for Expats in {city.name}
    </h3>
    <p className="text-sm text-slate-500 leading-relaxed">
      Expats moving to {city.name} often consider rent, healthcare,
      transportation, taxation, and lifestyle costs. Worldlivingcost data
      helps compare living expenses with other cities worldwide before
      relocation.
    </p>
  </div>

<section className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5 quick-answer">
  <h2 className="font-semibold text-lg mb-2">
    Quick Answer
  </h2>

 <p>
The average cost of living in {city.name}, {city.country} is approximately ${city.avgMonthlyCost.toLocaleString()} per month for a single person including rent, groceries, transportation, utilities and healthcare. The city's cost index is {city.costIndex} compared with New York City (100).
</p>
<h2>Living in {city.name}</h2>

<p>
Living in {city.name} offers a balance between housing costs, transportation expenses, healthcare access and overall quality of life. The city has a cost of living index of {city.costIndex} and a quality of life score of {city.qualityOfLife}/100. Residents spend most of their monthly budget on housing, groceries and transportation, while local salaries average ${city.categories.salaries["Average Net Salary"].toLocaleString()} per month. For expats, students, remote workers and families, {city.name} provides a useful benchmark when comparing living costs with other cities in {city.country} and around the world.
</p>
</section>
<section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
  <h2 className="font-bold text-xl mb-4">
    Key Facts About {city.name}
  </h2>

  <ul
  className="space-y-2"
  itemScope
  itemType="https://schema.org/ItemList"
>
    <li>Average Monthly Cost: ${city.avgMonthlyCost.toLocaleString()}</li>
    <li>Cost Index: {city.costIndex}</li>
    <li>Rent Index: {city.rentIndex}</li>
    <li>Average Salary: ${city.categories.salaries["Average Net Salary"].toLocaleString()}</li>
    <li>Quality of Life: {city.qualityOfLife}/100</li>
    <li>Safety Score: {city.safety}/100</li>
    <li>Country: {city.country}</li>
    <li>Currency: {city.currency}</li>
  </ul>
</section>
<section className="mt-8">
<h2>
Is {city.name} Expensive?
</h2>

<p>
{city.name} has a cost index of {city.costIndex} compared with New York City's benchmark score of 100. This means it is {city.costIndex < 100 ? "more affordable" : "more expensive"} than many major international cities.
</p>
</section>
</div>
<div className="mt-6 flex flex-wrap gap-4">
  <Link
    href="/cost-of-living-calculator"
    className="text-blue-600 hover:underline"
  >
    Learn how Worldlivingcost calculates cost of living data
  </Link>

  <Link
    href="/about-us"
    className="text-blue-600 hover:underline"
  >
    About Worldlivingcost and our data sources
  </Link>
</div>
          <div className="mt-5 pt-5 border-t border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-2">
              How does {city.name} compare to other cities?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {city.name} is located in {city.continent} with a population of approximately {city.population}. At a cost index of {city.costIndex} (NYC = 100), it is {city.costIndex < 50 ? "one of the most affordable cities in the world, ideal for budget-conscious expats, remote workers, and retirees" : city.costIndex < 80 ? "a moderately affordable city, offering good value compared to most Western cities" : city.costIndex < 120 ? "a mid-range city in terms of global cost of living" : "one of the more expensive cities globally"}. Use the{" "}
              <Link href={`/compare/${city.slug}-vs-berlin`} className="text-blue-600 hover:underline">
                free comparison tool
              </Link>{" "}
              to see how {city.name} stacks up against any other city worldwide across rent, groceries, transport, and salaries.
            </p>
          </div>


<section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
  <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
    Frequently Asked Questions
  </h2>

  <div className="space-y-5">
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        What is the cost of living in {city.name}?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        The average cost of living in {city.name}, {city.country} is approximately ${city.avgMonthlyCost.toLocaleString()} per month for a single person, including rent, food, transportation, and utilities. The cost index is {city.costIndex} relative to New York City (NYC = 100).
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        How much does rent cost in {city.name}?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Rent in {city.name} varies by neighborhood and apartment size. The rent index is {city.rentIndex} (NYC=100). Use Worldlivingcost's city comparison tool to see detailed rent prices for {city.name} alongside other cities worldwide.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        Is {city.name} expensive to live in?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {city.name} has a cost index of {city.costIndex} compared to New York City (100). {city.costIndex < 50 ? `At ${city.costIndex}, ${city.name} is considered very affordable and one of the cheaper cities globally.` : city.costIndex < 80 ? `At ${city.costIndex}, ${city.name} is moderately priced and more affordable than most Western cities.` : `At ${city.costIndex}, ${city.name} is on the more expensive side globally.`} The average monthly budget for a single person is around ${city.avgMonthlyCost.toLocaleString()}.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        What is the quality of life in {city.name}?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {city.name} has a quality of life index of {city.qualityOfLife}/100 and a safety index of {city.safety}/100. The city is located in {city.continent} and offers a {getScoreLabel(city.qualityOfLife).toLowerCase()} quality of life rating based on factors including safety, healthcare, climate, and infrastructure.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        How does the cost of living in {city.name} compare to other cities?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Use Worldlivingcost's free comparison tool to compare {city.name} with any city worldwide. {city.name}'s cost index is {city.costIndex} (NYC=100), making it {city.costIndex < 100 ? "cheaper" : "more expensive"} than New York. Compare rent, groceries, transport, healthcare, and salaries side by side.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        Can you live comfortably in {city.name}?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Many residents live comfortably in {city.name} with a monthly budget of around ${city.avgMonthlyCost.toLocaleString()} depending on lifestyle and housing choices.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        Is {city.name} good for expats?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {city.name} is popular among expats due to its job opportunities, quality of life, and infrastructure.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        What salary is needed in {city.name}?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        A salary above the average monthly living cost of ${city.avgMonthlyCost.toLocaleString()} is generally sufficient for a comfortable lifestyle in {city.name}.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        Is {city.name} cheaper than New York?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {city.costIndex < 100 ? "Yes" : "No"}, {city.name} has a cost index of {city.costIndex} compared with New York City's benchmark index of 100.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        What are the biggest expenses in {city.name}?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Housing, rent, groceries, transportation, and healthcare are typically the largest monthly expenses in {city.name}.
      </p>
    </div>
  </div>
</section>
<section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
  <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
    Best Time & Tips to Save Money in {city.name}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-2">
        Cheapest Ways to Live in {city.name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Newcomers looking to reduce their monthly budget in {city.name} typically save the most on housing by choosing accommodation outside the city center, where rent runs close to ${city.categories.housing["1BR Outside"].toLocaleString()}/month compared to ${city.categories.housing["1BR Center"].toLocaleString()}/month in the center. Cooking at home instead of dining out, using public transport instead of taxis, and sharing an apartment with roommates are the most effective ways to cut living expenses in {city.name}, {city.country}.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-2">
        Is {city.name} Worth Moving To?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        With a purchasing power index of {city.purchasingPower}/100 and a quality of life score of {city.qualityOfLife}/100, {city.name} is {city.qualityOfLife >= 70 ? "considered a highly desirable relocation destination with strong infrastructure and services" : city.qualityOfLife >= 50 ? "a reasonable option for relocation, balancing affordability with adequate quality of life" : "a budget-friendly option, though residents should weigh lifestyle trade-offs carefully"}. Combined with a cost index of {city.costIndex} relative to New York City, {city.name} remains a popular search term among people comparing the cost of living {city.country} has to offer against other destinations in {city.continent}.
      </p>
    </div>
  </div>

  <div className="mt-5 pt-5 border-t border-slate-100">
    <h3 className="font-semibold text-slate-800 text-sm mb-2">
      {city.name} Cost of Living FAQ Summary
    </h3>
    <p className="text-sm text-slate-500 leading-relaxed">
      People searching for "cost of living in {city.name}", "{city.name} monthly expenses {new Date().getFullYear()}", and "is {city.name} affordable" can use this page as a complete reference. With an average monthly cost of ${city.avgMonthlyCost.toLocaleString()}, a safety score of {city.safety}/100, and healthcare rated {city.healthcare}/100, {city.name} offers a data-backed answer for expats, digital nomads, students, and families planning a move to {city.country}.
    </p>
  </div>
</section>
          {/* Popular Comparisons */}
{/* Popular Comparisons */}
<div className="mt-8 border-t border-slate-100 pt-8">
  <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
    Popular City Cost Comparisons
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

    <Link
      href={`/compare/${city.slug}-vs-${'tokyo'}`}
      className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      <p className="text-sm font-semibold text-slate-800">
        {city.name} vs Berlin
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
        {city.name} vs Dubai
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
        {city.name} vs Hong Kong
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
        {city.name} vs New York
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
        Cost of Living in {city.country}
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Country living costs
      </p>
    </Link>
<Link href="/compare">Compare Cities</Link>
<Link href="/rankings">City Rankings</Link>
<Link href="/country">Country Rankings</Link>
<Link href="/methodology">Methodology</Link>
<Link href="/about-us">About Us</Link>
<Link href="/cost-of-living-calculator">Calculator</Link>
  </div>
</div>

        </div>
        <p className="text-xs text-slate-400">
Last reviewed: {new Date().toLocaleDateString()}
</p>
        </div>
      </div>
    </>
  );
}