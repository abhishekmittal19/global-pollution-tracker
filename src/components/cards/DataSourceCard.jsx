import React, { useState } from 'react';
import { ExternalLink, Database, Clock, Globe2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '../common/Badge';

export default function DataSourceCard({ source, className = '' }) {
  const [showLimitations, setShowLimitations] = useState(false);

  const {
    name,
    publisher,
    category,
    geographicCoverage,
    timeCoverage,
    updateFrequency,
    sourceUrl,
    accessNotes,
    methodologyReference,
    knownLimitations
  } = source;

  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card hover:border-forest-400 transition-all flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="space-y-1">
            <Badge variant="forest" size="xs">
              {category}
            </Badge>
            <h3 className="text-base font-semibold text-slate-900 leading-snug">
              {name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Publisher: {publisher}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-sand-100 text-forest-800">
            <Database className="w-4 h-4" />
          </div>
        </div>

        {/* Coverage Metadata */}
        <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-sand-50 rounded-lg border border-sand-200 text-xs">
          <div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
              <Globe2 className="w-3 h-3 text-slate-500" />
              Coverage
            </div>
            <span className="font-medium text-slate-700 truncate block" title={geographicCoverage}>
              {geographicCoverage}
            </span>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
              <Clock className="w-3 h-3 text-slate-500" />
              Time Series
            </div>
            <span className="font-medium text-slate-700 font-mono-numeric">
              {timeCoverage}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-2 mb-3">
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-700">Access:</span> {accessNotes}
          </p>
          {methodologyReference && (
            <p className="leading-relaxed text-slate-500 text-[11px]">
              <span className="font-semibold text-slate-600">Methodology:</span> {methodologyReference}
            </p>
          )}
        </div>

        {/* Known Limitations Toggle */}
        {knownLimitations && (
          <div className="mb-3">
            <button
              type="button"
              onClick={() => setShowLimitations(!showLimitations)}
              className="text-[11px] font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
              <span>{showLimitations ? 'Hide Limitations Note' : 'Inspect Known Uncertainties / Limitations'}</span>
              {showLimitations ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showLimitations && (
              <div className="mt-2 p-2.5 rounded bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-relaxed animate-in fade-in duration-150">
                {knownLimitations}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-sand-200/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-mono-numeric">
          Freq: {updateFrequency || 'Periodic'}
        </span>

        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-forest-700 hover:text-forest-900 hover:underline"
          >
            <span>Original Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
