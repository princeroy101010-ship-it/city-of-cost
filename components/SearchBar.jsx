"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cities } from "../lib/data";

export default function SearchBar({ placeholder = "Search any city... e.g. Tokyo, Berlin, New York" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (val) => {
    setQuery(val);
    if (val.length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }
    const filtered = cities.filter(
      (c) =>
        c.name.toLowerCase().includes(val.toLowerCase()) ||
        c.country.toLowerCase().includes(val.toLowerCase())
    );
    setResults(filtered.slice(0, 6));
    setOpen(true);
  };

  const goTo = (slug) => {
    setOpen(false);
    setQuery("");
    router.push(`/city/${slug}`);
  };

  return (
    <div ref={ref} className="relative max-w-xl mx-auto">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 13l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3.5 text-sm bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          aria-label="Search cities"
          autoComplete="off"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {results.map((city) => (
            <button
              key={city.slug}
              onClick={() => goTo(city.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-slate-900">{city.name}</p>
                <p className="text-xs text-slate-500">{city.country}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-slate-700">
                  ${city.avgMonthlyCost.toLocaleString()}/mo
                </p>
                <p className="text-xs text-slate-400">avg cost</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-50 px-4 py-6 text-center text-sm text-slate-500">
          No cities found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
