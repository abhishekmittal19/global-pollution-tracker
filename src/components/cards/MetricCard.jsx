import React from 'react';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import Badge from '../common/Badge';
import { formatTrend } from '../../utils/formatters';

export default function MetricCard({
  label,
  value,
  unit,
  reportingYear,
  description,
  source,
  sourceUrl,
  trend,
  trendLabel,
  status = 'VERIFIED',
  className = '',
}) {
  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card hover:border-forest-300 transition-all flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-500">
            {label}
          </span>
          {status && <Badge status={status} size="xs" />}
        </div>

        <div className="flex items-baseline gap-2 mt-1 mb-2">
          <span className="text-3xl font-bold tracking-tight text-forest-950 font-mono-numeric">
            {value !== undefined && value !== null ? value : '—'}
          </span>
          {unit && (
            <span className="text-xs font-medium text-slate-600 tracking-normal">
              {unit}
            </span>
          )}
        </div>

        {description && (
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {description}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-sand-200/80 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          {reportingYear && (
            <span className="bg-sand-100 text-slate-700 px-1.5 py-0.5 rounded font-mono-numeric">
              Year {reportingYear}
            </span>
          )}

          {trend !== null && trend !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 font-medium ${
                trend > 0 ? 'text-amber-700' : 'text-emerald-700'
              }`}
            >
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{formatTrend(trend)} {trendLabel || ''}</span>
            </span>
          )}
        </div>

        {source && (
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Source:</span>
            {sourceUrl && sourceUrl !== '#' ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-forest-700 hover:text-forest-900 hover:underline flex items-center gap-0.5 truncate max-w-[120px]"
                title={source}
              >
                <span className="truncate">{source}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
              </a>
            ) : (
              <span className="text-slate-600 truncate max-w-[120px]" title={source}>
                {source}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
