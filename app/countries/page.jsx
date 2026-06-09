import Link from "next/link";
import { cities } from "../../lib/data";
import ContinentFilter from "../../components/ContinentFilter";

export const metadata = {
  title: "Cost of Living by Country 195 Countries Compared (2025)",
  description:
    "Compare cost of living by country worldwide. Browse average monthly expenses, quality of life scores, and safety indices across 195 countries. Find the cheapest and most affordable countries to live, work, or retire in 2025.",
  keywords: [
    "cost of living by country",
    "cost of living comparison by country",
    "cheapest countries to live",
    "most affordable countries 2025",
    "cheapest countries to retire",
    "best countries for expats",
    "cost of living worldwide",
    "cheapest countries in the world",
    "low cost of living countries",
    "countries with lowest cost of living",
    "cheapest countries in Europe",
    "cheapest countries in Asia",
    "cheapest countries in South America",
    "cheapest countries in Africa",
    "best countries for remote workers",
    "digital nomad cheapest countries",
    "average monthly expenses by country",
    "country cost of living index",
    "quality of life by country",
    "safety index by country",
    "average salary by country",
    "most expensive countries to live",
    "cheapest countries to travel",
    "move abroad cheaply",
    "retire overseas cost of living",
    "expat cost of living guide",
    "country living expenses comparison",
    "best value countries to live",
    "affordable countries for families",
    "cost of living Europe vs Asia",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/countries",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/countries",
    title: "Cost of Living by Country 195 Countries Compared (2025)",
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
    title: "Cost of Living by Country 195 Countries (2025)",
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
    avgCost: Math.round(c.cities.reduce((s, ci) => s + ci.avgMonthlyCost, 0) / c.cities.length),
    avgQOL: Math.round(c.cities.reduce((s, ci) => s + ci.qualityOfLife, 0) / c.cities.length),
    avgSafety: Math.round(c.cities.reduce((s, ci) => s + ci.safety, 0) / c.cities.length),
  }));

  const continents = ["All", ...Array.from(new Set(countries.map((c) => c.continent)))];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://worldlivingcost.com/countries",
        name: "Cost of Living by Country 195 Countries Compared (2025)",
        description:
          "Browse cost of living data for 195 countries worldwide. Compare average monthly expenses, quality of life, and safety indices to find the most affordable countries to live, retire, or work remotely.",
        url: "https://worldlivingcost.com/countries",
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
          url: `https://worldlivingcost.com/city/${c.cities[0]?.slug || c.country.toLowerCase().replace(/\s+/g, "-")}`,
        })),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which country has the lowest cost of living in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Countries with the lowest cost of living in 2025 include Pakistan, India, Nepal, Bangladesh, Vietnam, Indonesia, Myanmar, Cambodia, Egypt, and Georgia. In these countries, a single person can live comfortably on $500 to $900 per month including rent, food, transportation, and utilities.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cheapest country to retire in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cheapest countries to retire in 2025 include Portugal, Georgia, Mexico, Vietnam, Thailand, Colombia, and Malaysia. These destinations offer a high quality of life, affordable healthcare, and monthly living costs typically between $1,000 and $2,000 USD for a couple.",
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
          text: "The cheapest European countries to live in 2025 are Georgia, Albania, North Macedonia, Kosovo, Moldova, Ukraine, Bulgaria, Romania, and Bosnia. Western European countries with relatively affordable costs include Portugal and Greece. Monthly living expenses in the cheapest Eastern European countries can be as low as $700 to $1,200.",
        },
      },
      {
        "@type": "Question",
        name: "Which Asian countries are the cheapest to live in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cheapest Asian countries to live in 2025 are Pakistan, India, Nepal, Bangladesh, Myanmar, Cambodia, Laos, Vietnam, and Indonesia. These countries offer monthly living costs between $400 and $900 for a single person. Thailand and Malaysia are slightly more expensive but offer excellent quality of life for expats and retirees.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-3">
            Cost of Living by Country (2025)
          </h1>
          <p className="text-slate-500 max-w-2xl mb-4">
            Browse average monthly costs, quality of life scores, and safety indices for countries worldwide. Data is verified monthly from government sources and real contributors.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
            <li>✓ 195 countries covered</li>
            <li>✓ Average monthly cost in USD</li>
            <li>✓ Quality of life and safety scores</li>
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

      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        Best Countries to Retire Abroad
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed mb-2">
        These countries are popular with retirees. They offer low costs and good healthcare.
      </p>
      <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside">
        <li>Portugal – easy visa, $1,200/month</li>
        <li>Georgia – very affordable, $900/month</li>
        <li>Mexico – warm climate, $1,100/month</li>
        <li>Thailand – great healthcare, $1,000/month</li>
        <li>Colombia – growing expat community</li>
      </ul>
    </div>

    <div>
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
        How to Compare Countries
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed">
        Use the{" "}
        <Link href="/compare" className="text-blue-600 hover:underline">
          free comparison tool
        </Link>
        Pick any two cities. See rent, food, and salary differences. Data updates every month.
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
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    <Link
      href="/compare?city1=berlin"
      className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      <p className="text-sm font-semibold text-slate-800">🇩🇪 Berlin</p>
      <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
    </Link>
    <Link
      href="/compare?city1=dubai"
      className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      <p className="text-sm font-semibold text-slate-800">🇦🇪 Dubai</p>
      <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
    </Link>
    <Link
      href="/compare?city1=hong-kong"
      className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      <p className="text-sm font-semibold text-slate-800">🇭🇰 Hong Kong</p>
      <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
    </Link>
    <Link
      href="/compare?city1=new-york"
      className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      <p className="text-sm font-semibold text-slate-800">🇺🇸 New York</p>
      <p className="text-xs text-slate-500 mt-1">Compare cost of living</p>
    </Link>
  </div>
</div>
</section>
    </>
  );
}