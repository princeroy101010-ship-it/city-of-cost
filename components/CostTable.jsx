"use client";
import { useState } from "react";

export default function CostTable({ icon, title, items, category }) {
  const [open, setOpen] = useState(true);

  const isHousing = category === "housing";
  const isSalary = category === "salaries";

  const formatValue = (key, val) => {
    if (isSalary && key === "Mortgage Interest Rate") return `${val}%`;
    if (isHousing && key.startsWith("Price/m²")) return `$${val.toLocaleString()}/m²`;
    if (isHousing) return `$${val.toLocaleString()}/mo`;
    return `$${val}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden="true">{icon}</span>
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <span className="text-xs text-slate-400">({Object.keys(items).length} items)</span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-slate-100">
          <table className="w-full data-table">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Item
                </th>
                <th className="text-right px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Price (USD)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(items).map(([key, val]) => (
                <tr key={key}>
                  <td className="px-5 py-3 text-sm text-slate-700">{key}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-slate-900 text-right">
                    {formatValue(key, val)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
