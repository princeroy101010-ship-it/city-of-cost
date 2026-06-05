import Link from "next/link";
import Image from "next/image";
import { ScoreBar } from "./ScoreBar";

export default function CityCard({ city }) {
  const scoreColor =
    city.qualityOfLife >= 75
      ? "pill-green"
      : city.qualityOfLife >= 50
      ? "pill-yellow"
      : "pill-red";

  return (
    <Link href={`/city/${city.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-slate-200 overflow-hidden card-hover">
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <img
            src={city.image}
            alt={`${city.name} cityscape`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <h3 className="text-white font-display font-bold text-lg leading-tight">
                {city.name}
              </h3>
              <p className="text-white/80 text-sm">{city.country}</p>
            </div>
            <span className={`score-badge ${scoreColor}`}>
              {city.qualityOfLife}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Monthly cost */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Avg. monthly cost</p>
              <p className="text-xl font-display font-bold text-slate-900">
                ${city.avgMonthlyCost.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-0.5">Cost index</p>
              <p className="text-xl font-bold text-slate-900">{city.costIndex}</p>
            </div>
          </div>

          {/* Score bars */}
          <div className="space-y-2">
            <ScoreBar label="Quality of Life" value={city.qualityOfLife} />
            <ScoreBar label="Safety" value={city.safety} />
            <ScoreBar label="Healthcare" value={city.healthcare} />
          </div>
        </div>
      </article>
    </Link>
  );
}
