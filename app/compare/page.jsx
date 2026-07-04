// app/compare/page.jsx  ← SERVER COMPONENT (no "use client")

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { cities } from "@/lib/data";

export const metadata = {
 title: "Compare Cost of Living Between Cities Worldwide",

  description:
  "Compare cost of living between cities worldwide. Analyze rent, salaries, groceries, transport and purchasing power with our free calculator.",  // Issue #1 fix — keywords meta removed (Google ignores it, dead weight)
  alternates: {
    canonical: "https://worldlivingcost.com/compare",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/compare",
    title: "Compare Cost of Living Between Cities Free Side-by-Side Tool",
    description:
      "Compare rent, groceries, transport, salaries & quality of life between any two cities. Free tool covering 10,000+ cities worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost Compare cost of living between two cities side by side",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Cost of Living Between Cities Free Tool",
    description:
      "Side-by-side cost of living comparison: rent, groceries, transport, salaries & quality of life. 10,000+ cities.",
    images: ["/og-image.png"],
  },
};

const comparePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Compare Cost of Living Between Cities",
  description: "Free side-by-side cost of living comparison tool covering 10,000+ cities worldwide.",
  url: "https://worldlivingcost.com/compare",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldlivingcost.com" },
      { "@type": "ListItem", position: 2, name: "Compare Cities", item: "https://worldlivingcost.com/compare" },
    ],
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Cost of Living Comparison Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://worldlivingcost.com/compare",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

const compareSoftwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cost of Living Comparison Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Free tool to compare cost of living between any two cities worldwide, covering rent, groceries, transportation, salaries, healthcare and quality of life.",
  url: "https://worldlivingcost.com/compare",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const compareFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I compare the cost of living between two cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select any two cities from 10,000+ worldwide and instantly see a side-by-side breakdown of rent, groceries, transportation, salaries, quality of life, safety, and healthcare costs.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the cost of living comparison?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our comparison covers 50+ data points including restaurants, groceries, transportation, utilities, rent, salaries, quality of life, safety, healthcare, and purchasing power.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compare cost of living for remote work or digital nomad planning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The comparison tool helps remote workers and digital nomads evaluate purchasing power, salaries, living expenses and quality of life across cities worldwide.",
      },
    },
  ],
};

const compareDatasetJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Global City Cost Comparison Dataset",
  description:
    "Cost of living comparison data covering rent, groceries, transportation, salaries and quality of life across 10,000+ cities worldwide.",
  isAccessibleForFree: true,
  about: { "@type": "Thing", name: "Cost of Living Comparison" },
  keywords: [
    "cost of living comparison",
    "compare cities",
    "city comparison calculator",
    "cost of living calculator",
  ],
  inLanguage: "en",
  creator: { "@type": "Organization", name: "Worldlivingcost" },
  publisher: { "@type": "Organization", name: "Worldlivingcost" },
  url: "https://worldlivingcost.com/compare",
};

// Issue #2 fix — Speakable schema removed (not relevant for this page type)

// Most-compared city pairs — also used for the ItemList schema + new visible section
const popularComparisons = [
  { citySlugA: "new-york", citySlugB: "london" },
  { citySlugA: "dubai", citySlugB: "singapore" },
  { citySlugA: "tokyo", citySlugB: "berlin" },
  { citySlugA: "sydney", citySlugB: "melbourne" },
  { citySlugA: "toronto", citySlugB: "vancouver" },
  { citySlugA: "bangkok", citySlugB: "kuala-lumpur" },
  { citySlugA: "paris", citySlugB: "madrid" },
  { citySlugA: "amsterdam", citySlugB: "berlin" },
  { citySlugA: "chicago", citySlugB: "los-angeles" },
  { citySlugA: "singapore", citySlugB: "hong-kong" },
];

function getCitySafe(slug) {
  return cities.find((c) => c.slug === slug) || null;
}

export default function CompareIndexPage() {
  const pairs = popularComparisons
    .map((p) => ({
      cityA: getCitySafe(p.citySlugA),
      cityB: getCitySafe(p.citySlugB),
      slug: `${p.citySlugA}-vs-${p.citySlugB}`,
    }))
    .filter((p) => p.cityA && p.cityB);

  const compareItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular Cost of Living Comparisons",
    itemListElement: pairs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.cityA.name} vs ${p.cityB.name}`,
      url: `https://worldlivingcost.com/compare/${p.slug}`,
    })),
  };

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparePageJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareSoftwareAppJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareDatasetJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareItemListJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Issue #3 fix — visible breadcrumb, matches BreadcrumbList schema above */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-slate-900 font-medium">Compare Cities</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-slate-200 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Compare Cost of Living Between Cities Worldwide
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-7">
            Compare rent, groceries, transportation, salaries, healthcare, purchasing power and
            quality of life across 10,000+ cities. Pick a popular comparison below or search any
            two cities to get started.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular comparison cards */}
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
          Popular City Cost of Living Comparisons
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
                    alt={cityA.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-28">
                  <Image
                    src={cityB.image}
                    alt={cityB.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-4">
                <p className="font-display font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cityA.name} <span className="text-slate-400 font-normal">vs</span> {cityB.name}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {cityA.country} · {cityB.country}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-bold text-blue-600">
                    ${cityA.avgMonthlyCost.toLocaleString()}
                    <span className="text-slate-300 mx-1">/</span>
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

        {/* Compare any two cities intent section */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
            Compare Cost of Living Between Any Two Cities
          </h2>
          <p className="text-slate-600 leading-7">
            Users commonly compare New York and London, Dubai and Singapore, Toronto and
            Vancouver, Sydney and Melbourne, Paris and Madrid, and thousands of other city
            combinations. Whether you're comparing two major capitals or a small town against a
            global hub, our tool lets you pick any two cities from over 10,000 worldwide and get
            an instant, detailed breakdown of the cost difference between them.
          </p>
        </div>

        {/* Issue #4 fix — Most Compared Cities Worldwide (visible entity graph for GEO) */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
            Most Compared Cities Worldwide
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-slate-700">
            {pairs.map(({ cityA, cityB, slug }) => (
              <li key={slug}>
                <Link href={`/compare/${slug}`} className="hover:text-blue-600 transition-colors">
                  {cityA.name} vs {cityB.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Browse Cities — Issue #5 fix: trimmed to 100 + "View All Cities" link */}
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
          Browse Cities
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {cities.slice(0, 100).map((c) => (
            <Link
              key={c.slug}
              href={`/city/${c.slug}`}
              className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>

       
        <div className="mb-14">
          <Link
            href="/country"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All Cities →
          </Link>
        </div>
 <Link  href='/cost-of-living-calculator' className="font-display text-2xl font-bold text-slate-900 mb-6">
          Cost of living calculator
        </Link>
  
        {/* SEO content block — expanded to 1000+ words */}
        <div className="compare-content rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Cost of Living Comparison Calculator for Cities Worldwide
          </h2>

          <div className="space-y-5 text-slate-600 leading-8">
            <p>
              Worldlivingcost helps you compare the cost of living between cities worldwide using
              real-world data covering rent prices, housing costs, grocery expenses,
              transportation costs, healthcare expenses, utilities, average salaries, purchasing
              power and quality of life indicators. Whether you are relocating, studying abroad,
              retiring overseas, working remotely or planning an international move, our free cost
              of living comparison calculator makes it easy to evaluate monthly expenses across
              more than 10,000 cities and 195 countries.
            </p>

            <p>
              Compare major cities such as New York vs London, Dubai vs Singapore, Tokyo vs
              Berlin, Toronto vs Vancouver, Sydney vs Melbourne and hundreds of other city
              combinations. Instantly see side-by-side differences in living expenses, salary
              requirements, housing affordability, safety scores, climate indexes and overall
              quality of life.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Why Compare Cost of Living Before You Move
            </h3>
            <p>
              Moving to a new city, whether across the country or across the world, is one of the
              biggest financial decisions most people make. A city that looks affordable on paper
              can turn out to be expensive once you account for rent inflation, hidden utility
              costs, or a weaker local currency. Conversely, a city with a reputation for being
              costly might actually offer better value once you factor in a higher local salary,
              lower healthcare costs, or cheaper public transportation. Comparing cost of living
              data side by side removes the guesswork and lets you make a decision based on real
              numbers rather than assumptions or outdated advice from friends and forums.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Salary and Purchasing Power Comparison
            </h3>
            <p>
              A salary that feels generous in one city can fall short in another once rent,
              transportation and daily expenses are factored in. Our tool converts average
              salaries into real purchasing power, so you can see whether your income will
              stretch further in a new city or shrink once local costs are accounted for. This is
              especially useful when negotiating a relocation package or evaluating a job offer
              abroad, since a higher nominal salary does not always translate into a higher
              standard of living. For example, a $6,000 monthly salary in a city with expensive
              housing and high taxes may provide less disposable income than a $3,500 salary in a
              city with lower rent and a lower cost of everyday goods.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Rent and Housing Cost Comparison
            </h3>
            <p>
              Housing is usually the single largest line item in any household budget, and rent
              prices can vary dramatically even between cities in the same country. Our
              comparison breaks down average rent for city-center and outside-city-center
              apartments, price per square meter for buying property, and mortgage interest
              rates, so you can budget accurately before committing to a move. We also separate
              one-bedroom and three-bedroom apartment pricing, since family housing needs differ
              significantly from single-occupant or couple housing needs, and the price gap
              between city center and suburban areas can be one of the biggest cost-saving levers
              available when relocating.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Groceries, Restaurants, and Everyday Spending
            </h3>
            <p>
              Beyond rent, day-to-day spending on groceries and dining out adds up quickly and
              varies enormously by region. A basket of basic groceries — milk, bread, eggs,
              produce, and meat — can cost two to three times more in one city than another, even
              within the same country. Restaurant prices follow a similar pattern, with major
              tourist and financial hub cities typically carrying a significant markup over
              smaller cities or emerging markets. Our comparison tool captures both categories
              separately, since some cities are affordable for cooking at home but expensive for
              eating out, and vice versa.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Transportation and Commute Costs
            </h3>
            <p>
              Transportation costs include public transit passes, taxi and rideshare pricing,
              fuel prices, and the cost of owning a car including insurance and maintenance. In
              some cities, an efficient public transportation network makes car ownership
              unnecessary, dramatically lowering monthly expenses. In others, a car is essential
              simply to get to work, adding a significant fixed cost that many relocation
              calculators overlook. We include commute-specific pricing so you can estimate your
              realistic monthly transportation budget rather than relying on a single average
              transportation index.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Healthcare and Insurance Costs
            </h3>
            <p>
              Healthcare costs differ dramatically depending on whether a country has
              publicly-funded healthcare, private insurance-based systems, or a hybrid model.
              For expats and remote workers in particular, healthcare access and out-of-pocket
              costs can be a deciding factor between two otherwise similar cities. Our healthcare
              index reflects both the affordability and general quality of medical care available
              in each city, helping you weigh this often-overlooked cost category alongside rent
              and salary.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Relocation, Expat, and Digital Nomad Planning
            </h3>
            <p>
              Our city comparison tool is used by expats, digital nomads, students, remote
              workers, international employees and families looking to understand where their
              income will go furthest. Compare cities by monthly budget, purchasing power, cost
              of housing, transportation expenses and everyday living costs before making
              important financial decisions. For digital nomads and remote workers specifically,
              we also factor in quality of life, safety and climate scores, since these often
              matter as much as raw cost when choosing a base city. Many remote workers use our
              tool to compare a shortlist of two or three candidate cities before committing to a
              long-term stay, checking not just affordability but also safety and overall
              livability.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              Quality of Life, Safety, and Climate
            </h3>
            <p>
              Cost is only part of the relocation equation. A cheaper city that feels unsafe,
              has poor healthcare access, or has a climate that doesn't suit you can end up being
              a worse choice than a slightly more expensive alternative. That's why our
              comparison tool includes quality of life, safety, healthcare, climate, and traffic
              and commute scores alongside every cost breakdown — giving you a fuller picture of
              what daily life would actually look like in each city, not just what it would cost.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 pt-2">
              City Affordability and Everyday Expenses
            </h3>
            <p>
              Beyond rent and salaries, everyday affordability depends on grocery prices,
              restaurant costs, public transportation fares, utility bills and healthcare
              expenses. Two cities with similar average incomes can have very different
              affordability profiles once these recurring costs are added up. Our comparison
              tool surfaces all of these categories side by side, so you can see exactly where
              your money goes further and where it doesn't.
            </p>

            <p>
              Data is updated regularly from thousands of contributors and public sources across
              10,000+ cities, giving you a transparent, up-to-date view of global cost of living
              trends whenever you're planning a move, negotiating a salary, or simply curious how
              your city stacks up against another. Start by picking one of the popular comparisons
              above, browsing cities below, or searching for any two cities directly to get your
              free, detailed side-by-side comparison in seconds.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-10">
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">10,000+ Cities</h3>
              <p className="text-sm text-slate-600">
                Compare living costs across major global cities and emerging destinations.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">50+ Cost Factors</h3>
              <p className="text-sm text-slate-600">
                Rent, groceries, healthcare, transport, salaries, utilities and more.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Updated Data</h3>
              <p className="text-sm text-slate-600">
                Monthly updates based on global cost of living benchmarks and pricing data.
              </p>

            </div>

          </div>
        </div>

        {/* FAQ */}
        <div className="faq-content mt-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions About Cost of Living Comparisons
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">
                How do I compare the cost of living between two cities?
              </h3>
              <p className="text-slate-600 mt-2">
                Select any two cities and instantly compare rent, groceries, transportation,
                healthcare, salaries, purchasing power and quality of life indicators side by side.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                What is included in the cost of living comparison?
              </h3>
              <p className="text-slate-600 mt-2">
                Comparisons include housing, rent, groceries, restaurants, transportation,
                healthcare, utilities, salaries, purchasing power, safety and quality of life
                indicators.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Can I compare cost of living for remote work or digital nomad planning?
              </h3>
              <p className="text-slate-600 mt-2">
                Yes. The comparison tool helps remote workers and digital nomads evaluate
                purchasing power, salaries, living expenses and quality of life across cities
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}