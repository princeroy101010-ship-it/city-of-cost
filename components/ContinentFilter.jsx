"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContinentFilter({ continents, countries }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredByContinent =
    active === "All" ? countries : countries.filter((c) => c.continent === active);

  const filtered = filteredByContinent.filter((c) =>
    c.country.toLowerCase().includes(query.toLowerCase())
  );

  const visible = filtered.slice(0, visibleCount);

  const handleFilterChange = (c) => {
    setActive(c);
    setVisibleCount(12);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setVisibleCount(12);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => handleFilterChange(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                active === c
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search country..."
          className="w-full sm:w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <p className="text-sm text-slate-400 mb-4">
        Showing {visible.length} of {filtered.length} countries
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {visible.map((c) => (
          <Link
            href={`/country/${c.countrySlug}`}
            key={c.countryCode}
            className="bg-white border cursor-pointer border-slate-200 rounded-xl overflow-hidden card-hover"
          >
            <div className="relative h-36 overflow-hidden">
              <img src={c.image} alt={c.country} className="w-full h-full object-cover" />
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
                <span className="font-semibold" style={{ color: c.avgQOL >= 75 ? "#10b981" : c.avgQOL >= 50 ? "#f59e0b" : "#ef4444" }}>
                  {c.avgQOL}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="text-slate-500">Safety</span>
                <span className="font-semibold" style={{ color: c.avgSafety >= 75 ? "#10b981" : c.avgSafety >= 50 ? "#f59e0b" : "#ef4444" }}>
                  {c.avgSafety}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
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
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-10">No countries found.</p>
      )}

      {visibleCount < filtered.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((v) => v + 12)}
            className="px-6 py-2.5 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
}