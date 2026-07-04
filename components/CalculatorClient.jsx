"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

const lifestyleMultipliers = { budget: 0.75, moderate: 1, comfortable: 1.4 };
const lifestyleLabels = { budget: "Budget", moderate: "Moderate", comfortable: "Comfortable" };
const householdMultipliers = { 1: 1, 2: 1.6, 3: 2.0, 4: 2.4 };

export default function CalculatorClient({ cities }) {
  const [citySlug, setCitySlug] = useState(cities[0]?.slug || "");
  const [lifestyle, setLifestyle] = useState("moderate");
  const [household, setHousehold] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState("");

  const city = useMemo(
    () => cities.find((c) => c.slug === citySlug) || cities[0],
    [citySlug, cities]
  );

  const estimate = useMemo(() => {
    if (!city) return null;
    const base = city.avgMonthlyCost;
    const total = Math.round(
      base * lifestyleMultipliers[lifestyle] * householdMultipliers[household]
    );

    const breakdown = city.categories
      ? {
          Housing: city.categories.housing?.["1BR Center"] || 0,
          Groceries: city.categories.markets
            ? Object.values(city.categories.markets).reduce((a, b) => a + b, 0)
            : 0,
          Transport: city.categories.transport
            ? Object.values(city.categories.transport).reduce((a, b) => a + b, 0)
            : 0,
          Utilities: city.categories.utilities
            ? Object.values(city.categories.utilities).reduce((a, b) => a + b, 0)
            : 0,
        }
      : {};

    const breakdownTotal = Object.values(breakdown).reduce((a, b) => a + b, 0) || 1;
    const scaledBreakdown = Object.fromEntries(
      Object.entries(breakdown).map(([key, val]) => [
        key,
        Math.round((val / breakdownTotal) * total),
      ])
    );

    return { total, scaledBreakdown };
  }, [city, lifestyle, household]);

  const income = parseFloat(monthlyIncome) || 0;
  const savings = income && estimate ? income - estimate.total : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24 space-y-5">
          <h2 className="font-display font-bold text-slate-900">Your Details</h2>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">City</label>
            <select
              value={citySlug}
              onChange={(e) => setCitySlug(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            >
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Lifestyle Level</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(lifestyleMultipliers).map((key) => (
                <button
                  key={key}
                  onClick={() => setLifestyle(key)}
                  className={`px-2 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    lifestyle === key
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {lifestyleLabels[key]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Household Size</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setHousehold(n)}
                  className={`py-2 text-sm font-medium rounded-lg border transition-colors ${
                    household === n
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {n}{n === 4 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Monthly Income (optional)
            </label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="e.g. 3000"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Used to show your estimated monthly savings.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 space-y-6">
        {estimate && (
          <>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <p className="text-blue-100 text-sm mb-1">
                Estimated monthly cost in {city.name}, {city.country}
              </p>
              <p className="font-display text-4xl font-bold mb-4">
                ${estimate.total.toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-blue-100">
                <span>{lifestyleLabels[lifestyle]} lifestyle</span>
                <span>·</span>
                <span>{household} {household === 1 ? "person" : "people"}</span>
                <span>·</span>
                <span>Cost index: {city.costIndex} (NYC=100)</span>
              </div>
            </div>

            {monthlyIncome && (
              <div
                className={`border rounded-xl p-5 ${
                  savings >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
                }`}
              >
                <p className="text-sm font-medium text-slate-800">
                  {savings >= 0
                    ? `You would have approximately $${savings.toLocaleString()} left over each month.`
                    : `Your estimated expenses exceed your income by $${Math.abs(savings).toLocaleString()} per month.`}
                </p>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-display font-bold text-slate-900 mb-4">
                Estimated Monthly Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(estimate.scaledBreakdown).map(([label, value]) => {
                  const pct = Math.round((value / estimate.total) * 100);
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">{label}</span>
                        <span className="font-medium text-slate-900">
                          ${value.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <Link
                href={`/city/${city.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                View Full {city.name} Cost of Living Data
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}