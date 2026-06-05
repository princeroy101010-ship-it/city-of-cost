"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "About the Data",
    items: [
      {
        q: "How often is data updated?",
        a: "Cost and rent indices are updated monthly. Quality of life, safety, and healthcare indices are updated quarterly. We timestamp every data point so you always know how fresh the data is.",
      },
      {
        q: "How accurate is your data?",
        a: "We cross-reference each price against at least two independent sources before publishing. That said, cost of living data is inherently approximate prices vary by neighbourhood, lifestyle, and time. Use our data as a reliable guide, not an absolute truth.",
      },
      {
        q: "What does the NYC = 100 baseline mean?",
        a: "All our cost and rent indices use New York City as the baseline (score of 100). A city with a cost index of 65 is approximately 35% cheaper than New York City for equivalent goods and services.",
      },
      {
        q: "Are prices shown in local currency or USD?",
        a: "All prices are shown in USD for easy comparison. We use daily exchange rates from the European Central Bank to convert. The original local currency is noted where relevant.",
      },
      {
        q: "How do you handle cities with less data?",
        a: "Cities with fewer than 100 contributor data points are marked with a lower confidence indicator. We still show the data but recommend treating it as an estimate rather than a precise figure.",
      },
    ],
  },
  {
    category: "Using Worldlivingcost",
    items: [
      {
        q: "Is Worldlivingcost free to use?",
        a: "Yes core cost of living data, city comparisons, and rankings are completely free. We plan to offer a premium API tier for businesses in the future, but personal use will always be free.",
      },
      {
        q: "How do I compare two cities?",
        a: "Go to the Compare page, select any two cities from the dropdowns, and instantly see a side-by-side breakdown across restaurants, groceries, transport, housing, utilities, and salaries.",
      },
      {
        q: "Can I download the data?",
        a: "Bulk data downloads are currently available via our API (see API documentation). We are working on CSV export functionality for individual city pages.",
      },
      {
        q: "How do I report incorrect data?",
        a: "Use our Contact page and select 'Data Correction' as the topic. Include the city name, the incorrect value, and what the correct value should be. Our team reviews all reports within 48 hours.",
      },
    ],
  },
  {
    category: "Contributing Data",
    items: [
      {
        q: "How can I contribute price data?",
        a: "We welcome contributions from locals who know their city's prices. Visit the Contribute page to submit prices. All submissions are reviewed before being incorporated into our database.",
      },
      {
        q: "Do I need an account to contribute?",
        a: "You can submit data without an account, but creating a free account lets you track your contributions, earn contributor status, and get credited on the city pages you help improve.",
      },
      {
        q: "What happens after I submit data?",
        a: "Your submission enters our review queue. Our team verifies it against existing data points and other sources. If approved, it is incorporated into the city's dataset within 7 days.",
      },
    ],
  },
  {
    category: "API & Business",
    items: [
      {
        q: "Do you offer a data API?",
        a: "Yes, we offer a public API with rate-limited access for free. For higher rate limits and commercial use, contact us at api@Worldlivingcost.world to discuss partnership options.",
      },
      {
        q: "Can I use Worldlivingcost data in my product?",
        a: "Free tier API data can be used in non-commercial applications with attribution. Commercial use requires a separate data license agreement. Contact us at legal@Worldlivingcost.world.",
      },
    ],
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-medium text-sm text-slate-900 pr-4">{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 border-t border-slate-100 bg-white">
          <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...faqs.map((f) => f.category)];

  const filtered = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              FAQ
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Everything you need to know about Worldlivingcost, our data, and how to use the platform.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ sections */}
        <div className="space-y-10">
          {filtered.map((section) => (
            <div key={section.category}>
              <h2 className="font-display font-bold text-slate-900 mb-4">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-slate-500 mb-5">
            Can not find what you are looking for? Our team is happy to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}