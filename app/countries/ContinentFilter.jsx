"use client";
import { useState } from "react";

export default function ContinentFilter({ continents, countries, renderCards }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? countries
    : countries.filter((c) => c.continent === active);

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-8">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {renderCards(filtered)}
      </div>
    </>
  );
}