import React, { useState } from 'react';
import { ExternalLink, Calendar, Building2, Target, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';

export default function PolicyCard({ policy, className = '' }) {
  const [expanded, setExpanded] = useState(false);

  const {
    title,
    nativeTitle,
    countryName,
    countryFlag,
    responsibleAgency,
    sector,
    policyType,
    objective,
    startYear,
    target,
    targetYear,
    status,
    budget,
    evidenceOfOutcomes,
    sourceName,
    sourceUrl,
    verificationStatus
  } = policy;

  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card hover:border-forest-400 transition-all ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm" role="img" aria-label={countryName}>
              {countryFlag}
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {countryName}
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="forest" size="xs">
              {sector}
            </Badge>
            {status && (
              <Badge variant={status === 'In Force' ? 'emerald' : 'amber'} size="xs">
                {status}
              </Badge>
            )}
          </div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-snug">
            {title}
          </h3>
          {nativeTitle && nativeTitle !== title && (
            <p className="text-xs text-slate-500 italic">
              {nativeTitle}
            </p>
          )}
        </div>
        <Badge status={verificationStatus} size="xs" />
      </div>

      <div className="mt-2.5 text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-y border-sand-200/80 py-2.5 my-3">
        <div className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[240px]" title={responsibleAgency}>
            {responsibleAgency}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Since {startYear}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-sand-100 text-[11px] font-medium text-slate-600">
            {policyType}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed line-clamp-3 mb-3">
        {objective}
      </p>

      {target && (
        <div className="p-3 rounded-lg bg-sand-100/70 border border-sand-200/80 text-xs mb-3 space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-forest-900">
            <Target className="w-3.5 h-3.5 text-forest-700" />
            <span>Target Goal {targetYear ? `(${targetYear})` : ''}:</span>
          </div>
          <p className="text-slate-700 leading-relaxed pl-5">
            {target}
          </p>
        </div>
      )}

      {/* Expandable Section for Deep Details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-sand-200 text-xs space-y-3 animate-in fade-in duration-150">
          {budget && (
            <div>
              <span className="font-semibold text-slate-700 block mb-0.5">Reported Budget / Allocations:</span>
              <p className="text-slate-600 leading-relaxed font-mono-numeric">{budget}</p>
            </div>
          )}

          {evidenceOfOutcomes && (
            <div className="p-2.5 bg-emerald-50/50 rounded border border-emerald-200/60 text-slate-800">
              <span className="font-semibold text-emerald-950 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Documented Evidence of Outcomes:
              </span>
              <p className="text-slate-700 leading-relaxed pl-5">
                {evidenceOfOutcomes}
              </p>
            </div>
          )}

          <div className="text-[11px] text-slate-500 bg-sand-50 p-2 rounded border border-sand-200">
            <strong>Policy Evaluation Note:</strong> The presence or quantity of enacted policies does not guarantee implementation stringency or verified net emission reductions.
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-sand-200/80 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-forest-700 hover:text-forest-900 font-medium inline-flex items-center gap-1"
        >
          <span>{expanded ? 'Show Less' : 'View Impact & Budget'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-forest-800 transition-colors"
            title={sourceName}
          >
            <span className="truncate max-w-[140px] text-[11px]">{sourceName}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        )}
      </div>
    </div>
  );
}
