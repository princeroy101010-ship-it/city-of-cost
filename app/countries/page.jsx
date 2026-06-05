import Link from "next/link";
import { cities } from "../../lib/data";

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
  // Group cities by country
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

  // JSON-LD: CollectionPage + ItemList using @graph (best practice for linked entities)
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
        description: "Ranked list of countries by average monthly cost of living, quality of life, and safety index.",
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

  // FAQPage JSON-LD — targets highest-traffic country cost-of-living questions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which country has the lowest cost of living in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Countries with the lowest cost of living in 2025 include Pakistan, India, Nepal, Bangladesh, Vietnam, Indonesia, Myanmar, Cambodia, Egypt, and Georgia. In these countries, a single person can live comfortably on $500–$900 per month including rent, food, transportation, and utilities.",
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
          text: "The best and most affordable countries for digital nomads in 2025 include Thailand, Vietnam, Georgia, Portugal, Mexico, Colombia, Indonesia (Bali), and Estonia. These countries offer fast internet, digital nomad visa programs, affordable living costs under $2,000/month, and vibrant expat communities.",
        },
      },
      {
        "@type": "Question",
        name: "How do I compare cost of living between countries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use Worldlivingcost's free country and city comparison tool at Worldlivingcost/compare. Select any two countries or cities to instantly compare rent, groceries, transportation, healthcare, and salaries side by side. Data is sourced from contributors and official sources and updated monthly.",
        },
      },
      {
        "@type": "Question",
        name: "Which European countries have the lowest cost of living?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cheapest European countries to live in 2025 are Georgia, Albania, North Macedonia, Kosovo, Moldova, Ukraine, Bulgaria, Romania, and Bosnia. Western European countries with relatively affordable costs include Portugal and Greece. Monthly living expenses in the cheapest Eastern European countries can be as low as $700–$1,200.",
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
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
            Countries Overview
          </h1>
          <p className="text-slate-500 max-w-xl">
            Average cost of living data aggregated by country from all tracked cities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Continents quick nav */}
        <div className="flex gap-2 flex-wrap mb-8">
          {continents.map((c) => (
            <span
              key={c}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 font-medium"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Country grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {countries.map((c) => (
            <article
              key={c.country}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden card-hover"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.country}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h2 className="text-white font-display font-bold">{c.country}</h2>
                  <p className="text-white/70 text-xs">{c.continent}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500">Avg monthly cost</p>
                    <p className="font-display font-bold text-slate-900">${c.avgCost.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Currency</p>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {c.currency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-500">Quality of Life</span>
                  <span
                    className="font-semibold"
                    style={{ color: c.avgQOL >= 75 ? "#10b981" : c.avgQOL >= 50 ? "#f59e0b" : "#ef4444" }}
                  >
                    {c.avgQOL}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-slate-500">Safety</span>
                  <span
                    className="font-semibold"
                    style={{ color: c.avgSafety >= 75 ? "#10b981" : c.avgSafety >= 50 ? "#f59e0b" : "#ef4444" }}
                  >
                    {c.avgSafety}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {c.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/city/${city.slug}`}
                      className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-2 py-1 rounded-lg transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}