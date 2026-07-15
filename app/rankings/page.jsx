import Link from "next/link";
import { cities, getScoreColor, getScoreLabel } from "../../lib/data";
import Script from "next/script";

export const metadata = {
  title: "Cost of Living Rankings Cheapest & Best Cities 2025",
  description:
"Explore cost of living rankings by city. Compare rent, salaries, affordability, safety, healthcare, purchasing power, and quality of life worldwide.",
  keywords: [
    "cost of living rankings",
    "cheapest cities to live 2025",
    "most affordable cities in the world",
    "best cities to live worldwide",
    "city cost of living index",
    "cheapest cities in the world",
    "global city rankings",
    "best quality of life cities",
    "safest cities in the world",
    "best cities for expats 2025",
    "cheapest cities for remote workers",
    "most livable cities 2025",
    "city affordability ranking",
    "lowest cost of living cities",
    "best cities to retire abroad",
    "top cities for digital nomads",
    "cheapest cities in Europe ranking",
    "cheapest cities in Asia ranking",
    "cheapest cities in Latin America",
    "highest quality of life cities",
    "best healthcare cities worldwide",
    "safest cities to live",
    "cost of living index by city",
    "affordable expat cities",
    "city safety ranking 2025",
    "best cities to move to 2025",
    "city ranking monthly cost",
    "cheapest rent cities worldwide",
    "city comparison ranking tool",
    "world cheapest places to live",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com/rankings",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/rankings",
    title: "Cost of Living Rankings Cheapest & Best Cities Worldwide 2025",
    description:
      "Rank and compare cities worldwide by monthly cost of living, quality of life, safety, and healthcare. Find the most affordable cities for expats, remote workers, and retirees in 2025.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Global cost of living city rankings 2025 cheapest and best cities worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost of Living Rankings Cheapest & Best Cities 2025",
    description:
      "Compare cities worldwide by monthly cost, quality of life, safety, and healthcare. Find the cheapest cities for expats and remote workers in 2025.",
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

export default function RankingsPage() {
  const sortedByCost = [...cities].sort((a, b) => a.avgMonthlyCost - b.avgMonthlyCost);
  const sortedByQOL = [...cities].sort((a, b) => b.qualityOfLife - a.qualityOfLife);

  const metrics = [
    { label: "Most Affordable", cities: sortedByCost.slice(0, 5), valueKey: "avgMonthlyCost", format: (v) => `$${v.toLocaleString()}/mo` },
    { label: "Best Quality of Life", cities: sortedByQOL.slice(0, 5), valueKey: "qualityOfLife", format: (v) => `Score: ${v}` },
  ];

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
    ],
  };

  // Dataset JSON-LD — describes the full city table as a structured dataset
const datasetJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Global City Cost of Living Rankings 2025",
  description: "Ranked dataset of cities worldwide by monthly cost of living...",
  url: "https://worldlivingcost.com/rankings",
  hasPart: {
      "@id": "https://worldlivingcost.com/rankings#methodology"
,
  "@type": "Table",
  name: "Global City Cost of Living Rankings"
},
  creator: {
    "@type": "Organization",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
  },
  temporalCoverage: "2025",
  spatialCoverage: "Worldwide",
  numberOfItems: cities.length,
  variableMeasured: [
    "Average Monthly Cost (USD)",
    "Cost of Living Index (NYC=100)",
    "Quality of Life Index",
    "Safety Index",
    "Healthcare Index",
    "Rent Index",
    "Purchasing Power Index",
  ],
  distribution: {
    "@type": "DataDownload",
    encodingFormat: "text/html",
    contentUrl: "https://worldlivingcost.com/rankings",
  },
  license: "https://worldlivingcost.com/terms-of-service",
};

const rankingsJsonLd = {
  "@context":"https://schema.org",
  "@type":"ItemList",
  name:"Global Cost of Living Rankings 2025",
  description:"Ranking of cities by cost of living.",
  itemListOrder:"https://schema.org/ItemListOrderAscending",
  numberOfItems:cities.length,
  itemListElement:sortedByCost.map((city,index)=>({
      "@type":"ListItem",
      position:index+1,
      url:`https://worldlivingcost.com/city/${city.slug}`
  }))
}
 

  // FAQPage JSON-LD — targets highest-traffic ranking/affordability questions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which city has the lowest cost of living in the world?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cities in South and Southeast Asia consistently rank as the cheapest in the world. Dhaka (Bangladesh), Karachi (Pakistan), Colombo (Sri Lanka), Hanoi (Vietnam), and Ho Chi Minh City (Vietnam) are among the cheapest cities globally, with monthly living costs often between $400 and $700 USD including rent, food, and transportation.",
        },
      },
      {
        "@type": "Question",
        name: "What city has the best quality of life in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cities consistently topping quality of life rankings in 2025 include Vienna (Austria), Zurich (Switzerland), Copenhagen (Denmark), Helsinki (Finland), and Auckland (New Zealand). These cities score high across safety, healthcare, infrastructure, climate, and purchasing power.",
        },
      },
      {
        "@type": "Question",
        name: "What is a cost of living index?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A cost of living index is a numerical score that measures the relative expense of living in a city compared to a benchmark location. Worldlivingcost uses New York City as the baseline (index = 100). A city with an index of 50 is approximately 50% cheaper than New York, while a city with an index of 150 is 50% more expensive.",
        },
      },
      {
        "@type": "Question",
        name: "Which cities are best for expats and remote workers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best cities for expats and remote workers in 2025 balance affordability, fast internet, quality of life, and visa accessibility. Top choices include Lisbon (Portugal), Chiang Mai (Thailand), Medellín (Colombia), Tbilisi (Georgia), Bali/Canggu (Indonesia), and Mexico City (Mexico). These cities offer monthly budgets of $1,000–$2,000 with excellent infrastructure.",
        },
      },
      {
        "@type": "Question",
        name: "How are city cost of living rankings calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Worldlivingcost city rankings are calculated using crowdsourced contributor data and official sources covering 50+ indicators: rent prices, grocery costs, restaurant prices, transportation fares, utilities, internet costs, healthcare costs, and salary data. The cost index uses New York City as a baseline of 100. Data is verified for outliers and updated monthly.",
        },
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
  <Script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify(rankingsJsonLd)
}}
/>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
            Global City Rankings
          </h1>
          <p className="text-slate-500 max-w-xl">
            Compare cities by cost of living, quality of life, safety, and more.
            Data updated monthly from global contributors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* All cities table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-display font-bold text-slate-900">All Cities</h2>
            <span className="text-sm text-slate-500">{cities.length} cities</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full data-table min-w-[700px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-10">#</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">City</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Monthly Cost</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Cost Index</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Quality of Life</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Safety</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Healthcare</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cities.map((city, i) => (
                  <tr key={city.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-slate-400 font-medium">{i + 1}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                          <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{city.name}</p>
                          <p className="text-xs text-slate-400">{city.country}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-semibold text-slate-900">
                        ${city.avgMonthlyCost.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-slate-700">{city.costIndex}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className="score-badge"
                        style={{
                          backgroundColor: city.qualityOfLife >= 75 ? "#d1fae5" : city.qualityOfLife >= 50 ? "#fef3c7" : "#fee2e2",
                          color: city.qualityOfLife >= 75 ? "#065f46" : city.qualityOfLife >= 50 ? "#92400e" : "#991b1b",
                        }}
                      >
                        {city.qualityOfLife}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-slate-700">{city.safety}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-slate-700">{city.healthcare}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/city/${city.slug}`}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick ranking lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-display font-bold text-slate-900">{m.label}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {m.cities.map((city, i) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-slate-400 font-bold text-sm w-5">{i + 1}</span>
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                      <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-slate-900">{city.name}</p>
                      <p className="text-xs text-slate-400">{city.country}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {m.format(city[m.valueKey])}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Visible FAQ — matches faqJsonLd exactly so schema and HTML stay in sync */}
<section className="mt-14 border-t border-slate-100 pt-14">
  <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
    Frequently Asked Questions
  </h2>
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        Which city has the lowest cost of living in the world?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Cities in South and Southeast Asia consistently rank as the cheapest
        in the world. Dhaka (Bangladesh), Karachi (Pakistan), Colombo (Sri
        Lanka), Hanoi (Vietnam), and Ho Chi Minh City (Vietnam) are among the
        cheapest cities globally, with monthly living costs often between
        $400 and $700 USD including rent, food, and transportation.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        What city has the best quality of life in 2025?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Cities consistently topping quality of life rankings in 2025 include
        Vienna (Austria), Zurich (Switzerland), Copenhagen (Denmark),
        Helsinki (Finland), and Auckland (New Zealand). These cities score
        high across safety, healthcare, infrastructure, climate, and
        purchasing power.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        What is a cost of living index?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        A cost of living index is a numerical score that measures the
        relative expense of living in a city compared to a benchmark
        location. Worldlivingcost uses New York City as the baseline (index
        = 100). A city with an index of 50 is approximately 50% cheaper than
        New York, while a city with an index of 150 is 50% more expensive.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        Which cities are best for expats and remote workers?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        The best cities for expats and remote workers in 2025 balance
        affordability, fast internet, quality of life, and visa
        accessibility. Top choices include Lisbon (Portugal), Chiang Mai
        (Thailand), Medellín (Colombia), Tbilisi (Georgia), Bali/Canggu
        (Indonesia), and Mexico City (Mexico). These cities offer monthly
        budgets of $1,000–$2,000 with excellent infrastructure.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        How are city cost of living rankings calculated?
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Worldlivingcost city rankings are calculated using crowdsourced
        contributor data and official sources covering 50+ indicators: rent
        prices, grocery costs, restaurant prices, transportation fares,
        utilities, internet costs, healthcare costs, and salary data. The
        cost index uses New York City as a baseline of 100. Data is verified
        for outliers and updated monthly.
      </p>
    </div>
  </div>
</section>

{/* Understanding the Rankings — SEO depth block */}
<section className="mt-14 border-t border-slate-100 pt-14">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div>
      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        How to Read the City Rankings Table
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        Each row in the table above represents a city ranked by average
        monthly cost of living in USD, alongside its cost index relative to
        New York City. A lower cost index means the city is more affordable,
        while a higher index means prices run closer to or above major
        Western capitals. Quality of life, safety, and healthcare scores are
        shown on a scale of 0 to 100, with higher scores indicating stronger
        infrastructure, lower crime, and better medical access.
      </p>
      <p className="text-sm text-slate-500 leading-relaxed">
        Clicking "View" on any row takes you to a full breakdown of that
        city's rent prices, grocery costs, transportation fares, utility
        bills, and average salaries, giving you a complete picture beyond
        the summary numbers shown in this table.
      </p>
    </div>

    <div>
      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        Why City Rankings Matter for Relocation Decisions
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        Ranking cities side by side helps expats, remote workers, students,
        and retirees narrow down destinations before committing to a move.
        A city with a low cost index but a poor quality of life score may
        save money on rent while sacrificing safety, healthcare access, or
        infrastructure. Conversely, a highly ranked quality of life city may
        require a larger monthly budget to maintain the same standard of
        living.
      </p>
      <p className="text-sm text-slate-500 leading-relaxed">
        We recommend cross-referencing this rankings page with the{" "}
        <Link href="/compare" className="text-blue-600 hover:underline">
          city comparison tool
        </Link>{" "}
        to see exact price differences between your current city and any
        destination you are considering.
      </p>
    </div>
  </div>
</section>

{/* Regional cost breakdown */}
<section className="mt-14 border-t border-slate-100 pt-14">
  <h2 className="font-display text-xl font-bold text-slate-900 mb-6">
    Cost of Living by Region
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        Asia: The Most Affordable Region Overall
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        South and Southeast Asian cities dominate the lower end of the cost
        index, with countries like Pakistan, India, Vietnam, and Bangladesh
        offering monthly budgets well under $700. These cities often pair
        low costs with growing infrastructure and increasingly popular
        digital nomad communities, particularly in Vietnam and Thailand.
      </p>
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        Europe: A Wide Affordability Range
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Europe spans both ends of the cost spectrum, from affordable
        Eastern European cities like Tbilisi and Sofia to expensive Western
        capitals like Zurich and Copenhagen. Quality of life scores tend to
        be high across the continent, even in its more budget-friendly
        cities.
      </p>
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        Latin America: Balanced Cost and Lifestyle
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Cities such as Medellín and Mexico City offer a strong balance of
        affordability, climate, and community, making the region a
        consistent favorite among remote workers seeking lower costs without
        sacrificing modern amenities.
      </p>
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 text-base mb-2">
        North America and Oceania: Premium Cost, High Quality of Life
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        Cities in this region typically carry cost indices at or above the
        New York City baseline of 100, but consistently rank among the
        highest for healthcare, safety, and overall infrastructure quality.
      </p>
    </div>
  </div>
</section>

{/* Internal links */}
<section className="mt-14 border-t border-slate-100 pt-8 pb-4">
  <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
    Explore More
  </h2>
  <div className="flex flex-wrap gap-3">
    <Link
      href="/countries"
      className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
    >
      Country Rankings
    </Link>
    <Link
      href="/compare"
      className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
    >
      Compare Cities
    </Link>
    <Link
      href="/calculator"
      className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
    >
      Cost of Living Calculator
    </Link>
    <Link
      href="/methodology"
      className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg hover:border-blue-200 hover:text-blue-700 transition-colors"
    >
      Methodology
    </Link>
  </div>
</section>
      </div>
    </>
  );
}