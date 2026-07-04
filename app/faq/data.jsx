// app/faq/data.jsx  ← CLIENT COMPONENT
"use client";
import { useState } from "react";
import Link from "next/link";
import { faqs } from "./faq";

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

export default function FaqClient() {
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
        {/* Entity-reinforcing summary, targeted by the speakable schema */}
        <div className="faq-summary bg-white border border-slate-200 rounded-xl p-6 mb-8 text-sm text-slate-600 leading-relaxed">
          Worldlivingcost provides cost of living comparisons, city rankings, rent
          indexes, purchasing power metrics, salary comparisons, and relocation
          planning data for thousands of cities worldwide. This FAQ answers common
          questions about our data sources, update frequency, methodology,
          contributor submissions, API access, and city comparison tools.
        </div>

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

        {/* SEO Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-slate-100 pt-12">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              About Our Cost of Living Data
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Worldlivingcost collects and verifies cost of living data for 10,000+ cities across 195 countries. Every data point is cross-referenced against at least two independent sources before being published. Our contributors submit real prices from their cities every month, and our data team reviews all submissions for accuracy before incorporating them into the database.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              All prices are displayed in USD using daily exchange rates from the European Central Bank. The cost of living index uses New York City as the baseline of 100. A city with an index of 50 is approximately 50% cheaper than New York across rent, groceries, transport, and utilities.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
              How to Get the Most from Worldlivingcost
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Start by browsing the city rankings to find affordable destinations filtered by continent, cost index, or quality of life score. Use the free comparison tool to place any two cities side by side and see exact differences in rent, groceries, transport, healthcare, and average salaries.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Each city page includes a full breakdown across six categories: restaurants, markets and groceries, transportation, utilities and internet, housing and rent, and salaries. Quality indices covering safety, healthcare, climate, purchasing power, and traffic are also available for every tracked city. Data is updated monthly and always free to access.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}