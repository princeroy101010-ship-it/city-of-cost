"use client";
import { useEffect, useRef, useState } from "react";

export function ScoreBar({ label, value, max = 100, showLabel = true }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pct = Math.min((value / max) * 100, 100);
  const color =
    value >= 75 ? "#10b981" : value >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div ref={ref} className="flex items-center gap-3">
      {showLabel && (
        <span className="text-xs text-slate-500 w-28 shrink-0 truncate">{label}</span>
      )}
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: animated ? `${pct}%` : "0%",
            backgroundColor: color,
          }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-700 w-8 text-right shrink-0">
        {Math.round(value)}
      </span>
    </div>
  );
}

export function ScoreCircle({ value, size = 64 }) {
  const color =
    value >= 75 ? "#10b981" : value >= 50 ? "#f59e0b" : "#ef4444";
  const bg =
    value >= 75 ? "#d1fae5" : value >= 50 ? "#fef3c7" : "#fee2e2";
  const textColor =
    value >= 75 ? "#065f46" : value >= 50 ? "#92400e" : "#991b1b";

  return (
    <div
      className="flex items-center justify-center rounded-full font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        color: textColor,
        fontSize: size * 0.28,
      }}
    >
      {Math.round(value)}
    </div>
  );
}
