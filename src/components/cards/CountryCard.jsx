import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Zap, Wind } from 'lucide-react';
import Badge from '../common/Badge';
import { formatMetric, formatPercentage } from '../../utils/formatters';

export default function CountryCard({ country, className = '' }) {
  const { id, name, flag, region, indicators, latestReportingYear, verificationStatus } = country;

  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card hover:shadow-elevation hover:border-forest-400 transition-all flex flex-col justify-between group ${className}`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl select-none" role="img" aria-label={name}>
              {flag}
            </span>
            <div>
              <h3 className="font-semibold text-slate-850 group-hover:text-forest-800 transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Globe className="w-3 h-3" />
                <span>{region}</span>
              </div>
            </div>
          </div>
          <Badge status={verificationStatus} size="xs" />
        </div>

        {/* Indicator Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-4 bg-sand-50/70 p-3 rounded-lg border border-sand-200/80 text-xs">
          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">Total CO₂</span>
            <span className="font-semibold text-slate-800 font-mono-numeric">
              {formatMetric(indicators.totalEmissionsCO2, { unit: 'Mt' })}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">Per-Capita CO₂</span>
            <span className="font-semibold text-slate-800 font-mono-numeric">
              {formatMetric(indicators.perCapitaCO2, { unit: 't/capita', decimals: 2 })}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-600" />
              Renewables
            </span>
            <span className="font-semibold text-slate-800 font-mono-numeric">
              {formatPercentage(indicators.renewableShare)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5 flex items-center gap-1">
              <Wind className="w-3 h-3 text-sky-600" />
              PM2.5 Mean
            </span>
            <span className="font-semibold text-slate-800 font-mono-numeric">
              {formatMetric(indicators.airQualityPM25, { unit: 'µg/m³' })}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-sand-200/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500 font-mono-numeric">
          Latest: {latestReportingYear || '—'}
        </span>

        <Link
          to={`/countries/${id}`}
          className="inline-flex items-center gap-1 font-medium text-forest-700 group-hover:text-forest-900 group-hover:translate-x-0.5 transition-all text-xs"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
