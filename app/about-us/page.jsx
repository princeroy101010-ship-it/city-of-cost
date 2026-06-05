import Link from "next/link";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Worldlivingcost our mission to make global cost of living data transparent, accurate, and accessible to everyone.",
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

export default function AboutPage() {
  return (
    <>
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
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              We started Worldlivingcost because moving to a new city or even comparing
              two cities felt impossible without reliable, unbiased data. We are
              fixing that.
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
              When people make life-changing decisions where to work remotely,
              where to retire, where to raise a family they deserve accurate,
              up-to-date cost of living data. Not guesses. Not outdated tables.
              Real numbers.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Founded in 2021, Worldlivingcost aggregates data from government
              statistical agencies, verified contributor submissions, and trusted
              institutional sources to build the most accurate global cost of living
              database available.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Today we serve over 500,000 users monthly from digital nomads
              planning their next move to HR teams benchmarking international
              salaries.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="font-display font-bold text-slate-900 mb-6">Our Story</h3>
            <div className="space-y-5">
              {[
                { year: "2021", event: "Founded in Berlin with a dataset of 500 cities" },
                { year: "2022", event: "Expanded to 3,000 cities across 120 countries" },
                { year: "2023", event: "Launched contributor program 10,000+ members" },
                { year: "2024", event: "Reached 5M+ data points, 300K monthly users" },
                { year: "2025", event: "10,000 cities, 195 countries, 500K users monthly" },
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

      {/* Values */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
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
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Meet the Team</h2>
          <p className="text-slate-500">The people building the world&apos;s most trusted cost of living platform.</p>
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
      </section>

      {/* CTA */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-10 text-center text-white">
          <h2 className="font-display text-2xl font-bold mb-3">Want to contribute data?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Help us keep prices accurate by submitting data from your city. Every
            contribution makes the platform better for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Get in Touch
            </Link>
            <Link href="/methodology" className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Our Methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}