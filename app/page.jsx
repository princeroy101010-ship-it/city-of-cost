import Link from "next/link";
import { cities } from "../lib/data";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";

export const metadata = {
  title: "Cost of Living Comparison by City & Country 2025",
  description:
    "Compare cost of living, rent prices, grocery costs, and salaries across 10,000+ cities worldwide. Free cost of living calculator trusted by expats, remote workers, and travelers. Real-time data, zero guesswork.",
  keywords: [
    "cost of living",
    "cost of living comparison",
    "cost of living by city",
    "cost of living calculator",
    "cheapest cities to live 2025",
    "cheapest countries to live",
    "average cost of living worldwide",
    "monthly living expenses by city",
    "rent prices comparison",
    "grocery prices by country",
    "city cost comparison tool",
    "expat living costs",
    "remote work cost of living",
    "best affordable cities",
    "digital nomad budget cities",
    "quality of life index",
    "salary comparison cities",
    "housing costs worldwide",
    "cheapest places to retire abroad",
    "living cost index 2025",
  ],
  alternates: {
    canonical: "https://worldlivingcost.com",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com",
    title: "Cost of Living Comparison by City & Country 2025",
    description:
      "Compare cost of living, rent, groceries, and salaries across 10,000+ cities. Real-time data for expats, remote workers, and travelers. Find the most affordable cities worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CostLiving Compare cost of living across 10,000+ cities worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost of Living Comparison by City & Country 2025",
    description:
      "Compare cost of living, rent, groceries, and salaries across 10,000+ cities. Find affordable cities for expats and remote workers.",
    images: ["/og-image.png"],
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cost of Living Comparison by City & Country 2025",
  description:
    "Compare cost of living, rent prices, grocery costs, and salaries across 10,000+ cities and 195 countries worldwide. Free cost of living calculator and city comparison tool.",
  url: "https://worldlivingcost.com",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://worldlivingcost.com",
      },
    ],
  },
  mainEntity: {
    "@type": "Dataset",
    name: "Global Cost of Living Index",
    description:
      "Real-time cost of living data for 10,000+ cities across 195 countries, including rent, groceries, transportation, healthcare, and salary data.",
    url: "https://worldlivingcost.com",
    creator: {
      "@type": "Organization",
      name: "worldlivingcost",
      url: "https://worldlivingcost.com",
    },
    temporalCoverage: "2025",
    spatialCoverage: "Worldwide",
    variableMeasured: [
      "Rent Prices",
      "Grocery Costs",
      "Transportation Costs",
      "Healthcare Costs",
      "Monthly Living Expenses",
      "Quality of Life Index",
      "Purchasing Power",
      "Salary Comparison",
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is cost of living?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cost of living refers to the amount of money needed to cover basic expenses such as housing, food, transportation, healthcare, and utilities in a specific city or country. It is used to compare the affordability of different locations worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "Which city has the lowest cost of living?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cities in South and Southeast Asia such as Chiang Mai (Thailand), Ho Chi Minh City (Vietnam), and Tbilisi (Georgia) consistently rank among the cheapest places to live worldwide, with monthly expenses often below $1,000 USD including rent.",
      },
    },
    {
      "@type": "Question",
      name: "How do I compare cost of living between two cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Worldlivingcost's free city comparison tool. Enter any two cities to instantly compare rent, groceries, transportation, healthcare, salaries, and quality of life side by side across 10,000+ cities worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "What factors affect cost of living?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The main factors that affect cost of living include housing and rent prices, food and grocery costs, transportation expenses, healthcare costs, utility bills, taxes, and local inflation rates. Geographic location, local economy, and demand for housing are major drivers.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good monthly budget for an expat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A comfortable monthly budget for a single expat ranges from $800–$1,500 in affordable cities in Asia or Eastern Europe, $1,500–$2,500 in mid-range cities in Latin America or Southern Europe, and $3,000–$5,000+ in expensive cities like New York, London, or San Francisco.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries have the cheapest cost of living in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The countries with the lowest cost of living in 2025 include Pakistan, India, Nepal, Bangladesh, Vietnam, Indonesia, Egypt, Georgia, and Colombia. These destinations offer very affordable rent, food, and transportation costs compared to Western nations.",
      },
    },
  ],
};

const stats = [
  { label: "Cities Tracked", value: "10,000+" },
  { label: "Countries Covered", value: "195" },
  { label: "Data Points", value: "2M+" },
  { label: "Monthly Users", value: "500K+" },
];

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M11 6v5l4 2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Real-Time Data",
    desc: "Prices updated monthly from contributors and official sources across every city.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17l5-5 4 4 7-9" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Side-by-Side Compare",
    desc: "Compare any two cities instantly rent, groceries, transport, salaries and more.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 10h10M4 14h6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "50+ Indicators",
    desc: "Track cost of living, quality of life, safety, healthcare, pollution, and more.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M7 11l3 3 5-5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Trusted Methodology",
    desc: "Transparent calculation methods. Know exactly how every index is computed.",
  },
];

export default function HomePage() {
  const topCities = cities.slice(0, 6);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-white border-b border-slate-200 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#0066ff 1px, transparent 1px), linear-gradient(90deg, #0066ff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-blue-600/5 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Updated June 2025 10,000+ cities
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
              Where in the world{" "}
              <span className="text-blue-600">fits your budget?</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 mb-8 leading-relaxed max-w-2xl mx-auto">
              Compare cost of living, rent, groceries, salaries and quality of
              life across thousands of cities worldwide. Real data, zero guesswork.
            </p>

            {/* Search */}
            <SearchBar />

            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <span className="text-sm text-slate-400">Popular:</span>
              {["New York", "London", "Dubai", "Tokyo", "Berlin"].map((city) => (
                <Link
                  key={city}
                  href={`/city/${city.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-5 text-center">
                <p className="font-display font-bold text-2xl text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured cities */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Featured Cities
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Most searched cities this month
            </p>
          </div>
          <Link
            href="/rankings"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View all rankings
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {topCities.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
              Why Worldlivingcost?
            </h2>
            <p className="text-slate-500">
              Everything you need to plan your move or compare cities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-6 border border-slate-200"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%), radial-gradient(circle at 70% 50%, white 0%, transparent 60%)"
          }} />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold mb-3">
              Ready to find your perfect city?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
              Compare any two cities side by side and see the real cost breakdown.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Start Comparing
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/rankings"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                View Rankings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}