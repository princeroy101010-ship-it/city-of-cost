import Link from "next/link";

export const dynamic = "force-static";
export const dynamicParams = false;

const SITE_URL = "https://worldlivingcost.com";
const PAGE_URL = `${SITE_URL}/cheapest-states-to-live-in-us`;

const states = [
  {
    rank: 1,
    name: "Arkansas",
    slug: "arkansas",
    abbreviation: "AR",
    index: "86.9",
    belowAverage: "13.1%",
    description:
      "Arkansas is one of the cheapest states to live in the US, with housing and everyday expenses below the national average.",
  },
  {
    rank: 2,
    name: "Mississippi",
    slug: "mississippi",
    abbreviation: "MS",
    index: "87.0",
    belowAverage: "13.0%",
    description:
      "Mississippi offers some of the lowest living costs in America, especially for housing, making it attractive for budget-conscious households.",
  },
  {
    rank: 3,
    name: "Iowa",
    slug: "iowa",
    abbreviation: "IA",
    index: "87.8",
    belowAverage: "12.2%",
    description:
      "Iowa combines relatively affordable housing with moderate everyday expenses and is among the lower-cost states in the country.",
  },
  {
    rank: 4,
    name: "Oklahoma",
    slug: "oklahoma",
    abbreviation: "OK",
    index: "87.8",
    belowAverage: "12.2%",
    description:
      "Oklahoma has comparatively low housing and living expenses, making it one of the most affordable states for residents.",
  },
  {
    rank: 5,
    name: "Louisiana",
    slug: "louisiana",
    abbreviation: "LA",
    index: "88.2",
    belowAverage: "11.8%",
    description:
      "Louisiana remains a lower-cost state for housing and daily expenses compared with many parts of the United States.",
  },
  {
    rank: 6,
    name: "South Dakota",
    slug: "south-dakota",
    abbreviation: "SD",
    index: "88.6",
    belowAverage: "11.4%",
    description:
      "South Dakota offers below-average overall prices and no individual state income tax, although taxes and housing should be evaluated together.",
  },
  {
    rank: 7,
    name: "Alabama",
    slug: "alabama",
    abbreviation: "AL",
    index: "88.8",
    belowAverage: "11.2%",
    description:
      "Alabama is among the most affordable states for housing and everyday expenses, particularly compared with expensive coastal states.",
  },
  {
    rank: 8,
    name: "North Dakota",
    slug: "north-dakota",
    abbreviation: "ND",
    index: "89.0",
    belowAverage: "11.0%",
    description:
      "North Dakota has a relatively low overall price level and can provide strong housing affordability compared with higher-cost states.",
  },
  {
    rank: 9,
    name: "West Virginia",
    slug: "west-virginia",
    abbreviation: "WV",
    index: "89.5",
    belowAverage: "10.5%",
    description:
      "West Virginia is known for affordable housing and remains one of the lower-cost states for people looking to reduce living expenses.",
  },
  {
    rank: 10,
    name: "Kansas",
    slug: "kansas",
    abbreviation: "KS",
    index: "90.1",
    belowAverage: "9.9%",
    description:
      "Kansas provides below-average living costs, with housing affordability helping make it one of the cheaper states in the US.",
  },
];

const comparisonStates = [
  {
    name: "Mississippi",
    slug: "mississippi",
    index: "87.0",
  },
  {
    name: "Arkansas",
    slug: "arkansas",
    index: "86.9",
  },
  {
    name: "Oklahoma",
    slug: "oklahoma",
    index: "87.8",
  },
  {
    name: "Iowa",
    slug: "iowa",
    index: "87.8",
  },
  {
    name: "Alabama",
    slug: "alabama",
    index: "88.8",
  },
  {
    name: "West Virginia",
    slug: "west-virginia",
    index: "89.5",
  },
  {
    name: "Kansas",
    slug: "kansas",
    index: "90.1",
  },
  {
    name: "South Dakota",
    slug: "south-dakota",
    index: "88.6",
  },
];

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    "Cheapest States to Live in the US in 2026 | Lowest Cost of Living States",

  description:
    "Discover the cheapest states to live in the US in 2026. Compare the lowest cost of living states by affordability, housing, everyday expenses, and cost of living index.",

  keywords: [
    "cheapest states to live in us",
    "cheapest states to live in the US",
    "cheapest states to live in",
    "cheapest state to live in",
    "lowest cost of living states",
    "lowest cost of living state",
    "most affordable states to live in",
    "cheapest places to live in the US",
    "cheapest states in America",
    "states with lowest cost of living",
    "cheapest states for living",
    "affordable states to live in",
    "lowest cost states to live in",
    "cost of living by state",
    "cost of living comparison by state",
    "cheapest states 2026",
    "most affordable states 2026",
  ],

  alternates: {
    canonical: PAGE_URL,
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

  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Worldlivingcost",
    locale: "en_US",
    title:
      "Cheapest States to Live in the US in 2026 | Lowest Cost of Living States",
    description:
      "Compare the cheapest states to live in the US in 2026 and discover which states have the lowest cost of living.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cheapest States to Live in the US in 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cheapest States to Live in the US in 2026",
    description:
      "Compare the most affordable states in America by cost of living and discover where your money goes further.",
    images: ["/og-image.png"],
  },

  authors: [
    {
      name: "Worldlivingcost",
      url: SITE_URL,
    },
  ],

  creator: "Worldlivingcost",
  publisher: "Worldlivingcost",
  category: "Cost of Living",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Cost of Living",
      item: `${SITE_URL}/cost-of-living`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cheapest States to Live in the US",
      item: PAGE_URL,
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  headline: "Cheapest States to Live in the US in 2026",
  description:
    "A comparison of the cheapest and most affordable states to live in the United States based on cost of living and price-level differences.",
  url: PAGE_URL,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  author: {
    "@type": "Organization",
    name: "Worldlivingcost",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Worldlivingcost",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  },
  dateModified: "2026-08-30",
  datePublished: "2026-08-30",
  articleSection: "Cost of Living",
  keywords:
    "cheapest states to live in US, lowest cost of living states, cheapest states 2026, affordable states to live in",
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cheapest States to Live in the US in 2026",
  description:
    "A ranked list of affordable US states based on cost of living price levels.",
  numberOfItems: states.length,
  itemListElement: states.map((state) => ({
    "@type": "ListItem",
    position: state.rank,
    name: state.name,
    url: `${SITE_URL}/state/${state.slug}`,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the cheapest states to live in the US in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Among the most affordable US states are Arkansas, Mississippi, Iowa, Oklahoma, Louisiana, South Dakota, Alabama, North Dakota, West Virginia, and Kansas. Rankings can differ depending on whether the methodology emphasizes overall prices, housing, taxes, or household budgets.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest state to live in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arkansas and Mississippi are among the cheapest states to live in based on overall price-level measures. The exact number one state can change depending on the cost of living methodology and data year.",
      },
    },
    {
      "@type": "Question",
      name: "Which states have the lowest cost of living?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "States frequently found near the low end of US cost-of-living rankings include Arkansas, Mississippi, Oklahoma, Iowa, Louisiana, Alabama, West Virginia, Kansas, South Dakota, and North Dakota.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a state cheap to live in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Housing is usually one of the biggest factors behind differences in living costs between states. Groceries, utilities, transportation, healthcare, taxes, and local wages also affect how affordable a state is.",
      },
    },
    {
      "@type": "Question",
      name: "Are the cheapest states also the best states to live in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Low cost of living is only one measure of affordability. Employment opportunities, salaries, healthcare, safety, education, climate, infrastructure, and quality of life should also be considered before moving.",
      },
    },
    {
      "@type": "Question",
      name: "How can I compare the cost of living between states?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compare housing, groceries, transportation, utilities, healthcare, taxes, and local income together. Worldlivingcost can also be used to compare living costs across locations and cities.",
      },
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Cheapest States to Live in the US in 2026",
  description:
    "Compare the cheapest states to live in the US and find states with the lowest cost of living.",
  isPartOf: {
    "@type": "WebSite",
    name: "Worldlivingcost",
    url: SITE_URL,
  },
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-image.png`,
  },
  inLanguage: "en-US",
};

export default function CheapestStatesToLivePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-white border-b border-slate-200 overflow-hidden">
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
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex justify-center items-center gap-2 text-sm text-slate-400 mb-7"
            >
              <Link
                href="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-slate-500">
                Cost of Living
              </span>

              <span>/</span>

              <span className="text-slate-700">
                Cheapest States
              </span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              2026 Cost of Living Guide • United States
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
              Cheapest States to Live in the{" "}
              <span className="text-blue-600">
                US in 2026
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover the cheapest states to live in the US and compare
              the lowest cost of living states by overall affordability,
              housing, and everyday expenses.
            </p>

            {/* Primary Links */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/rankings"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Cost Rankings
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
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
                href="/compare"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                Compare Locations
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
            <div className="bg-white px-6 py-5 text-center">
              <p className="font-display font-bold text-2xl text-slate-900 mb-1">
                50
              </p>
              <p className="text-sm text-slate-500">
                US States
              </p>
            </div>

            <div className="bg-white px-6 py-5 text-center">
              <p className="font-display font-bold text-2xl text-slate-900 mb-1">
                10
              </p>
              <p className="text-sm text-slate-500">
                Affordable States
              </p>
            </div>

            <div className="bg-white px-6 py-5 text-center">
              <p className="font-display font-bold text-2xl text-slate-900 mb-1">
                100
              </p>
              <p className="text-sm text-slate-500">
                US Average Index
              </p>
            </div>

            <div className="bg-white px-6 py-5 text-center">
              <p className="font-display font-bold text-2xl text-slate-900 mb-1">
                2026
              </p>
              <p className="text-sm text-slate-500">
                Ranking Year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            What Are the Cheapest States to Live in the US?
          </h2>

          <p className="text-slate-600 leading-relaxed mb-5">
            The cheapest states to live in the US are generally found
            across the South, Midwest, and Great Plains. States such as
            Arkansas, Mississippi, Oklahoma, Iowa, Louisiana, Alabama,
            West Virginia, South Dakota, North Dakota, and Kansas
            frequently appear near the lower end of cost-of-living
            rankings.
          </p>

          <p className="text-slate-600 leading-relaxed">
            A lower cost of living means that everyday expenses such as
            housing, groceries, utilities, transportation, and healthcare
            can require less money than in higher-cost states. However,
            the cheapest state is not automatically the best place for
            everyone. Income, employment opportunities, taxes, healthcare,
            safety, and quality of life also matter when deciding where
            to live.
          </p>
        </div>
      </section>

      {/* Ranking */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-5 mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                10 Cheapest States to Live In
              </h2>

              <p className="text-slate-500">
                Affordable US states with below-average overall price
                levels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {states.map((state) => (
              <article
                key={state.slug}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-display font-bold text-lg">
                    #{state.rank}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        <Link
                          href={`/state/${state.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {state.name}
                        </Link>
                      </h3>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                        {state.belowAverage} below average
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mb-5">
                      {state.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">
                          Cost Index
                        </p>
                        <p className="font-display font-bold text-slate-900">
                          {state.index}
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">
                          National Average
                        </p>
                        <p className="font-display font-bold text-slate-900">
                          100
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Lowest Cost of Living States Compared
          </h2>

          <p className="text-slate-500">
            Compare several of the most affordable states at a glance.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rank
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  State
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Cost Index
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Compared With US Average
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Explore
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {states.map((state) => (
                <tr
                  key={state.slug}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4 font-semibold text-slate-700">
                    {state.rank}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/state/${state.slug}`}
                      className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {state.name}
                    </Link>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {state.index}
                  </td>

                  <td className="px-5 py-4 text-emerald-600 font-medium">
                    {state.belowAverage} lower
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/state/${state.slug}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View state
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 mt-4">
          A cost-of-living index uses 100 as the US average. Values below
          100 indicate a lower overall price level than the national
          average. Rankings can differ depending on the source,
          methodology, geographic coverage, and data year.
        </p>
      </section>

      {/* Why Housing Matters */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Why Housing Makes Some States Cheaper
            </h2>

            <p className="text-slate-600 leading-relaxed mb-5">
              Housing is one of the biggest reasons living costs vary
              between US states. A state can have similar grocery or
              transportation prices to another state but still be much
              cheaper overall when rent and home prices are lower.
            </p>

            <p className="text-slate-600 leading-relaxed">
              This is why affordable states often have a large advantage
              in housing. Before moving, however, compare the complete
              monthly budget rather than looking at home prices alone.
              Property taxes, insurance, utilities, commuting costs, and
              local wages can significantly change the real affordability
              of a location.
            </p>
          </div>
        </div>
      </section>

      {/* What To Consider */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            What to Consider When Choosing an Affordable State
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">
            The lowest cost of living is only one part of a good relocation
            decision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
              $
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">
              Housing Costs
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Compare rent, home prices, property taxes, insurance, and
              housing availability.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
              ↑
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">
              Local Salaries
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              A low-cost state can be less affordable if local wages are
              also significantly lower.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
              %
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">
              Taxes
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Consider income taxes, sales taxes, property taxes, and
              other state and local costs.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
              ✓
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">
              Quality of Life
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Healthcare, safety, education, jobs, infrastructure, and
              climate can matter as much as price.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Affordable States */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
          Explore Affordable States
        </h2>

        <p className="text-slate-500 text-sm mb-6">
          View individual state cost-of-living information.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {comparisonStates.map((state) => (
            <Link
              key={state.slug}
              href={`/state/${state.slug}`}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-700">
                  {state.name}
                </span>

                <span className="text-xs font-semibold text-blue-600">
                  {state.index}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Cheapest Places to Live in the US
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              If your goal is to reduce monthly expenses, the cheapest
              places to live in the US are often located in states with
              lower housing costs. Arkansas, Mississippi, Oklahoma, Iowa,
              Louisiana, Alabama, West Virginia, and Kansas are examples
              of states that frequently appear among the more affordable
              locations.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              States With the Lowest Cost of Living
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              States with the lowest cost of living typically have
              below-average housing prices and lower overall price
              levels. However, affordability varies within each state.
              A large metropolitan area can cost considerably more than a
              smaller city or rural community in the same state.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              How Is Cost of Living Measured?
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Cost of living can be measured using a basket of goods and
              services that includes housing, food, utilities,
              transportation, healthcare, and other everyday expenses.
              Many indexes use 100 as the national average, with values
              below 100 representing lower overall price levels.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Is a Low Cost of Living Enough?
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Not always. The best state for your budget depends on the
              relationship between your income and expenses. Someone
              working remotely may prioritize low housing costs, while a
              family may place more importance on schools, healthcare,
              childcare, and employment opportunities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Cheapest States for Families
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Families should look beyond the headline cost-of-living
              index. Housing, childcare, healthcare, transportation,
              utilities, and school-related expenses can have a major
              effect on the total household budget.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Cheapest States for Retirees
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Retirees may benefit from affordable housing and everyday
              expenses, but healthcare availability, property taxes,
              insurance, and state tax rules should also be included when
              comparing retirement destinations.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Cheapest States for Remote Workers
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Remote workers can potentially take advantage of lower
              housing costs without being limited by local employment
              markets. Internet availability, quality of life, housing,
              taxes, and access to airports can still influence the best
              choice.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              Compare Cost of Living by City
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              State-level averages are useful for broad comparisons, but
              city-level costs can be very different. Use our{" "}
              <Link
                href="/compare"
                className="text-blue-600 hover:underline"
              >
                city comparison tool
              </Link>{" "}
              to compare housing, groceries, transportation, salaries,
              and other living expenses between locations.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Frequently Asked Questions
            </h2>

            <p className="text-slate-500">
              Common questions about the cheapest states to live in
              America.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group bg-white border border-slate-200 rounded-xl p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
                What are the cheapest states to live in the US in 2026?
                <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              <p className="text-sm text-slate-500 leading-relaxed mt-4">
                Arkansas, Mississippi, Iowa, Oklahoma, Louisiana, South
                Dakota, Alabama, North Dakota, West Virginia, and Kansas
                are among the states frequently found near the affordable
                end of cost-of-living rankings.
              </p>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
                What is the cheapest state to live in?
                <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              <p className="text-sm text-slate-500 leading-relaxed mt-4">
                Arkansas and Mississippi are among the strongest
                candidates depending on the cost-of-living methodology
                used. Different sources can produce different rankings.
              </p>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
                Which states have the lowest cost of living?
                <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              <p className="text-sm text-slate-500 leading-relaxed mt-4">
                Several Southern and Midwestern states have relatively low
                overall price levels, including Arkansas, Mississippi,
                Oklahoma, Iowa, Alabama, Louisiana, and West Virginia.
              </p>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
                What makes a state affordable?
                <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              <p className="text-sm text-slate-500 leading-relaxed mt-4">
                Housing is usually one of the most important factors.
                Groceries, utilities, transportation, healthcare, taxes,
                and local wages also influence how affordable a state is.
              </p>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
                Are cheap states good for retirees?
                <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              <p className="text-sm text-slate-500 leading-relaxed mt-4">
                Some affordable states can be attractive for retirees,
                but housing, healthcare, insurance, property taxes,
                income taxes, and access to services should all be
                compared before making a decision.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, white 0%, transparent 60%), radial-gradient(circle at 70% 50%, white 0%, transparent 60%)",
            }}
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold mb-3">
              Compare the Cost of Living Before You Move
            </h2>

            <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
              Compare cities and locations to understand housing,
              groceries, transportation, salaries, and everyday expenses.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Compare Cities

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
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