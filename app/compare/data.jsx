"use client";
import { useState } from "react";
import Link from "next/link";
import { cities, getCityBySlug } from "../../lib/data";
import { ScoreBar } from "../../components/ScoreBar";

const categoryLabels = {
  restaurants: { label: "Restaurants", icon: "🍽️" },
  markets: { label: "Groceries", icon: "🛒" },
  transport: { label: "Transport", icon: "🚌" },
  utilities: { label: "Utilities", icon: "💡" },
  housing: { label: "Housing", icon: "🏠" },
  salaries: { label: "Salaries", icon: "💼" },
};

const scoreMetrics = [
  { key: "qualityOfLife", label: "Quality of Life" },
  { key: "purchasingPower", label: "Purchasing Power" },
  { key: "safety", label: "Safety" },
  { key: "healthcare", label: "Healthcare" },
  { key: "climate", label: "Climate" },
  { key: "trafficCommute", label: "Traffic & Commute" },
];

export default function ComparePage() {
  const [city1Slug, setCity1Slug] = useState("new-york");
  const [city2Slug, setCity2Slug] = useState("london");
  const [activeCategory, setActiveCategory] = useState("restaurants");

  const city1 = getCityBySlug(city1Slug);
  const city2 = getCityBySlug(city2Slug);

  const items1 = city1?.categories?.[activeCategory] || {};
  const items2 = city2?.categories?.[activeCategory] || {};
  const allKeys = Array.from(new Set([...Object.keys(items1), ...Object.keys(items2)]));

  const formatVal = (val, cat, key) => {
    if (!val && val !== 0) return "—";
    if (cat === "salaries" && key === "Mortgage Interest Rate") return `${val}%`;
    if (cat === "housing" && key.startsWith("Price/m²")) return `$${val.toLocaleString()}/m²`;
    if (cat === "housing") return `$${val.toLocaleString()}/mo`;
    return `$${val}`;
  };

  const cheaper = (v1, v2, cat, key) => {
    if (!v1 || !v2) return null;
    if (cat === "salaries") return v1 > v2 ? "city1" : v2 > v1 ? "city2" : "equal";
    return v1 < v2 ? "city1" : v2 < v1 ? "city2" : "equal";
  };

  return (
    <>
      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
            Compare Cities
          </h1>
          <p className="text-slate-500">
            Select two cities to see a side-by-side cost breakdown.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* City selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { label: "City 1", value: city1Slug, set: setCity1Slug, city: city1 },
            { label: "City 2", value: city2Slug, set: setCity2Slug, city: city2 },
          ].map(({ label, value, set, city }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                {label}
              </label>
              <div className="flex items-center gap-3">
                {city && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="flex-1 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Select ${label}`}
                >
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}, {c.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {city1 && city2 && (
          <>
            {/* Header comparison */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
              <div className="grid grid-cols-3">
                <div className="p-5 text-center border-r border-slate-100">
                  <img src={city1.image} alt={city1.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                  <h2 className="font-display font-bold text-lg text-slate-900">{city1.name}</h2>
                  <p className="text-sm text-slate-500">{city1.country}</p>
                  <p className="mt-2 font-display font-bold text-2xl text-blue-600">
                    ${city1.avgMonthlyCost.toLocaleString()}
                    <span className="text-sm font-normal text-slate-400">/mo</span>
                  </p>
                </div>

                <div className="p-5 text-center flex flex-col items-center justify-center bg-slate-50">
                  <span className="text-3xl mb-2">⚖️</span>
                  <p className="text-xs text-slate-500 font-medium">Monthly difference</p>
                  <p className="font-bold text-lg text-slate-900 mt-1">
                    ${Math.abs(city1.avgMonthlyCost - city2.avgMonthlyCost).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {city1.avgMonthlyCost < city2.avgMonthlyCost
                      ? `${city1.name} is cheaper`
                      : city2.avgMonthlyCost < city1.avgMonthlyCost
                      ? `${city2.name} is cheaper`
                      : "Same cost"}
                  </p>
                </div>

                <div className="p-5 text-center border-l border-slate-100">
                  <img src={city2.image} alt={city2.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                  <h2 className="font-display font-bold text-lg text-slate-900">{city2.name}</h2>
                  <p className="text-sm text-slate-500">{city2.country}</p>
                  <p className="mt-2 font-display font-bold text-2xl text-blue-600">
                    ${city2.avgMonthlyCost.toLocaleString()}
                    <span className="text-sm font-normal text-slate-400">/mo</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Score comparison */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
              <h3 className="font-display font-bold text-slate-900 mb-4">Quality Indices Comparison</h3>
              <div className="space-y-4">
                {scoreMetrics.map((m) => (
                  <div key={m.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-slate-600">{m.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold" style={{ color: city1[m.key] >= city2[m.key] ? "#10b981" : "#94a3b8" }}>
                          {city1.name}: {city1[m.key]}
                        </span>
                        <span className="text-xs text-slate-300">vs</span>
                        <span className="text-xs font-bold" style={{ color: city2[m.key] >= city1[m.key] ? "#10b981" : "#94a3b8" }}>
                          {city2.name}: {city2[m.key]}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ScoreBar value={city1[m.key]} showLabel={false} />
                      <ScoreBar value={city2[m.key]} showLabel={false} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              {/* Tab nav */}
              <div className="flex overflow-x-auto border-b border-slate-100 scrollbar-hide">
                {Object.entries(categoryLabels).map(([key, { label, icon }]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeCategory === key
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              {/* Comparison table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Item</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-blue-600 uppercase tracking-wide">{city1.name}</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{city2.name}</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Diff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allKeys.map((key) => {
                    const v1 = items1[key];
                    const v2 = items2[key];
                    const win = cheaper(v1, v2, activeCategory, key);
                    const diff = v1 && v2 ? Math.abs(((v1 - v2) / v2) * 100).toFixed(0) : null;

                    return (
                      <tr key={key} className="hover:bg-slate-50">
                        <td className="px-5 py-3 text-sm text-slate-700">{key}</td>
                        <td className={`px-5 py-3 text-sm font-semibold text-right ${win === "city1" ? "text-emerald-600" : "text-slate-900"}`}>
                          {formatVal(v1, activeCategory, key)}
                        </td>
                        <td className={`px-5 py-3 text-sm font-semibold text-right ${win === "city2" ? "text-emerald-600" : "text-slate-900"}`}>
                          {formatVal(v2, activeCategory, key)}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {diff && win !== "equal" ? (
                            <span className={`text-xs font-medium ${win === "city1" ? "text-emerald-600" : "text-rose-500"}`}>
                              {win === "city1" ? "-" : "+"}{diff}%
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
