import React from 'react';
import { ExternalLink, MapPin, Briefcase, CheckCircle } from 'lucide-react';
import Badge from '../common/Badge';

export default function OrganizationCard({ organization, className = '' }) {
  const {
    name,
    type,
    countryName,
    countryFlag,
    headquarters,
    areaOfWork,
    description,
    keyProjects,
    officialUrl,
    verificationStatus
  } = organization;

  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card hover:border-forest-400 transition-all flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm" role="img" aria-label={countryName}>
                {countryFlag}
              </span>
              <span className="text-xs text-slate-500 font-medium">{countryName}</span>
              <span className="text-slate-300">•</span>
              <Badge variant="blue" size="xs">
                {type}
              </Badge>
            </div>
            <h3 className="text-base font-semibold text-slate-900 leading-snug">
              {name}
            </h3>
          </div>
          <Badge status={verificationStatus} size="xs" />
        </div>

        <div className="flex items-start gap-1.5 text-xs text-slate-500 my-2.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span className="truncate">{headquarters}</span>
        </div>

        <div className="p-2.5 bg-sand-50 rounded-lg border border-sand-200/80 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-forest-900 uppercase tracking-wider mb-1">
            <Briefcase className="w-3 h-3 text-forest-700" />
            Core Focus Areas
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {areaOfWork}
          </p>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          {description}
        </p>

        {keyProjects && keyProjects.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
              Key Initiatives & Published Programs:
            </span>
            <ul className="space-y-1 text-xs text-slate-700 pl-1">
              {keyProjects.map((proj, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3 h-3 text-forest-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{proj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-sand-200/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400">Verified Institution</span>
        {officialUrl && (
          <a
            href={officialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-forest-700 hover:text-forest-900 hover:underline"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
