"use client";
import { useState } from "react";
import Link from "next/link";

export default function CountryRankingTable({
  title,
  data,
  columns,
  initialCount = 20,
  step = 20,
}) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const filtered = data.filter((c) =>
    c.country.toLowerCase().includes(query.toLowerCase())
  );
  const visible = filtered.slice(0, visibleCount);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(initialCount);
          }}
          placeholder="Search country..."
          className="w-full sm:w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Rank</th>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((c, i) => (
              <tr key={c.country}>
                <td className="px-4 py-2 text-slate-400">{i + 1}</td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 text-slate-600">
                    {col.key === "country" ? (
                      <Link
                        href={`/country/${c.countrySlug}`}
                        className="font-medium text-slate-800 hover:underline"
                      >
                        {c.country}
                      </Link>
                    ) : col.render ? (
                      col.render(c)
                    ) : (
                      c[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-6">No countries found.</p>
      )}

      {visibleCount < filtered.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount((v) => v + step)}
            className="px-5 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View More ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}