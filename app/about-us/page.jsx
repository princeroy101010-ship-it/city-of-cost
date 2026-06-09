import Link from "next/link";

export const metadata = {
  title: "About Worldlivingcost | Our Mission, Team & Data Methodology",
  description:
    "Worldlivingcost was founded in 2021 to make global cost of living data transparent and accessible. We track 10,000+ cities across 195 countries with verified monthly data trusted by 500,000+ users. Learn about our mission, team, and methodology.",
  alternates: {
    canonical: "https://worldlivingcost.com/about-us",
  },
  openGraph: {
    type: "website",
    url: "https://worldlivingcost.com/about-us",
    title: "About Worldlivingcost | Mission, Team & Data Methodology",
    description:
      "Learn how Worldlivingcost tracks cost of living data for 10,000+ cities worldwide. Our team, mission, and transparent data methodology explained.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Worldlivingcost" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Worldlivingcost | Mission, Team & Data Methodology",
    description:
      "Learn how Worldlivingcost tracks cost of living data for 10,000+ cities worldwide.",
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

const stats = [
  { value: "10,000+", label: "Cities Tracked" },
  { value: "195", label: "Countries Covered" },
  { value: "2M+", label: "Data Points" },
  { value: "500K+", label: "Monthly Users" },
];

const team = [
  {
    name: "Aryan Malik",
    role: "Co-Founder & CEO",
    bio: "Former economist at World Bank. Passionate about making financial data accessible globally.",
    initials: "AM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Sara Chen",
    role: "Co-Founder & CTO",
    bio: "Ex-Google engineer. Built data pipelines serving millions of users at scale.",
    initials: "SC",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "James Okafor",
    role: "Head of Data",
    bio: "PhD in Economics. Ensures every data point meets our strict accuracy standards.",
    initials: "JO",
    color: "bg-violet-100 text-violet-700",
  },
  {
    name: "Lena Hoffmann",
    role: "Head of Product",
    bio: "Previously at Airbnb. Designs experiences that turn complex data into clear decisions.",
    initials: "LH",
    color: "bg-amber-100 text-amber-700",
  },
];

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Accuracy First",
    desc: "Every price is verified against multiple sources. We never publish data we cannot confirm.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M7 10l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Full Transparency",
    desc: "Our methodology is public. You can see exactly how every index and score is calculated.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M6 10h8M10 6v8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Always Free",
    desc: "Core data will always be free. We believe financial information should be accessible to everyone.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 6h14M3 10h10M3 14h6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Community Driven",
    desc: "Our data is enriched by thousands of contributors who share real prices from their cities.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Worldlivingcost",
  description:
    "Worldlivingcost provides real-time cost of living data for 10,000+ cities across 195 countries. Founded in 2021, we serve 500,000+ monthly users including expats, remote workers, and HR teams.",
  url: "https://worldlivingcost.com/about-us",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldlivingcost.com" },
      { "@type": "ListItem", position: 2, name: "About Us", item: "https://worldlivingcost.com/about-us" },
    ],
  },
  mainEntity: {
    "@type": "Organization",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
    foundingDate: "2021",
    foundingLocation: "Berlin, Germany",
    description:
      "Worldlivingcost is the world's most comprehensive cost of living platform, tracking rent, groceries, transport, utilities, and salaries across 10,000+ cities in 195 countries.",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 4 },
    member: [
      { "@type": "Person", name: "Aryan Malik", jobTitle: "Co-Founder & CEO" },
      { "@type": "Person", name: "Sara Chen", jobTitle: "Co-Founder & CTO" },
      { "@type": "Person", name: "James Okafor", jobTitle: "Head of Data" },
      { "@type": "Person", name: "Lena Hoffmann", jobTitle: "Head of Product" },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              About Worldlivingcost
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5">
              Making the world&apos;s cost of living{" "}
              <span className="text-blue-600">transparent</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mb-4">
              We started Worldlivingcost because moving to a new city or even comparing
              two cities felt impossible without reliable, unbiased data. We are
              fixing that.
            </p>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Today, Worldlivingcost is trusted by over 500,000 users every month — from digital nomads
              researching their next destination, to HR teams benchmarking international salaries, to
              families planning a move abroad. Our platform covers 10,000+ cities across 195 countries
              with data verified from government statistical agencies and real contributor submissions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold text-3xl text-slate-900 mb-1">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              When people make life-changing decisions — where to work remotely,
              where to retire, where to raise a family — they deserve accurate,
              up-to-date cost of living data. Not guesses. Not outdated tables.
              Real numbers.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Founded in 2021, Worldlivingcost aggregates data from government
              statistical agencies, verified contributor submissions, and trusted
              institutional sources to build the most accurate global cost of living
              database available. Every price point is cross-checked and updated
              monthly to reflect real market conditions.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Today we serve over 500,000 users monthly — from digital nomads
              planning their next move to HR teams benchmarking international
              salaries. Our cost of living index covers rent, groceries,
              transportation, utilities, healthcare, and salary data across
              every major region in the world.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We believe that access to accurate financial and lifestyle data is
              a basic right — not a premium feature. That is why our core data
              will always be free, transparent, and openly available to anyone
              who needs it.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="font-display font-bold text-slate-900 mb-6">Our Story</h3>
            <div className="space-y-5">
              {[
                { year: "2021", event: "Founded in Berlin with a dataset of 500 cities across 50 countries. Built the first version of the cost of living index." },
                { year: "2022", event: "Expanded to 3,000 cities across 120 countries. Launched the city comparison tool and rent index tracker." },
                { year: "2023", event: "Launched contributor program with 10,000+ members submitting real prices from cities worldwide." },
                { year: "2024", event: "Reached 5M+ verified data points and 300,000 monthly users. Added quality of life, safety, and healthcare indices." },
                { year: "2025", event: "10,000 cities, 195 countries, and 500,000+ monthly users. Recognized as a leading global cost of living resource." },
              ].map((item) => (
                <div key={item.year} className="flex items-start gap-4">
                  <span className="shrink-0 text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded mt-0.5">
                    {item.year}
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Track */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
              What We Track
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Worldlivingcost collects and verifies 50+ data points per city, updated monthly from
              contributors and official government sources worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Rent and Housing", desc: "1-bedroom and 3-bedroom apartment prices in city center and outside. Price per square meter for buying property." },
              { title: "Groceries and Markets", desc: "Weekly food basket prices including milk, bread, eggs, meat, vegetables, and fruit from local supermarkets." },
              { title: "Restaurants and Dining", desc: "Inexpensive meals, mid-range restaurant prices, fast food costs, coffee, beer, and soft drink prices." },
              { title: "Transportation", desc: "Local public transport tickets, monthly passes, taxi rates, fuel prices, and car purchase costs." },
              { title: "Utilities and Services", desc: "Monthly electricity, water, internet, mobile plans, and gym membership costs for a standard apartment." },
              { title: "Salaries and Finance", desc: "Average net monthly salary after tax, mortgage interest rates, and purchasing power index by city." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
              What We Stand For
            </h2>
            <p className="text-slate-500">The principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Meet the Team</h2>
            <p className="text-slate-500">
              The people building the world&apos;s most trusted cost of living platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="bg-white border border-slate-200 rounded-xl p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-xl mx-auto mb-4 ${member.color}`}>
                  {member.initials}
                </div>
                <h3 className="font-semibold text-slate-900">{member.name}</h3>
                <p className="text-xs text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              Why Trust Our Data?
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Accuracy is the foundation of everything we do. Every data point on Worldlivingcost
              is collected from multiple independent sources including government statistical agencies,
              national bureaus of statistics, and thousands of verified contributors submitting
              real prices from their own cities.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Our data team reviews all submissions for outliers and cross-references prices against
              official sources before publishing. Every city page is updated at least once per month
              to reflect current market conditions, not outdated averages.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Unlike many cost of living tools that rely on a single survey or outdated database,
              Worldlivingcost uses a continuous collection model with real contributor input from
              over 10,000 active members worldwide.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              Who Uses Worldlivingcost?
            </h2>
            <div className="space-y-4">
              {[
                { title: "Expats and Relocators", desc: "People planning an international move use our city pages and comparison tool to budget accurately before relocating." },
                { title: "Remote Workers and Digital Nomads", desc: "Location-independent workers compare cities by cost, internet quality, and quality of life to choose their next base." },
                { title: "HR and Finance Teams", desc: "Companies use our salary and cost of living indices to set fair compensation for international hires and remote employees." },
                { title: "Retirees Planning Abroad", desc: "Retirees compare affordable destinations by monthly cost, healthcare quality, safety, and climate to find their ideal retirement city." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-10 text-center text-white">
          <h2 className="font-display text-2xl font-bold mb-3">Want to contribute data?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Help us keep prices accurate by submitting data from your city. Every
            contribution makes the platform better for everyone. Join 10,000+ contributors
            worldwide who help keep our database accurate and up to date.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Our Methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}