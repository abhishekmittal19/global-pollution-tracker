import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, Flame, Zap, Target, FileText, Recycle } from 'lucide-react';

const iconMap = {
  Wind,
  Flame,
  Zap,
  Target,
  FileText,
  Recycle,
};

export default function TopicCard({ topic, className = '' }) {
  const { title, category, description, iconName, link, indicatorsCount, sampleMetric } = topic;
  const IconComponent = iconMap[iconName] || FileText;

  return (
    <Link
      to={link}
      className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card hover:shadow-elevation hover:border-forest-500 transition-all flex flex-col justify-between group ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-200 group-hover:bg-forest-100 transition-colors">
            <IconComponent className="w-5 h-5 text-forest-700" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-850 group-hover:text-forest-850 transition-colors mb-1.5">
          {title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="pt-3 border-t border-sand-200/80 flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          <span className="text-[11px] text-slate-400 block font-medium">
            {indicatorsCount}
          </span>
          {sampleMetric && (
            <span className="text-[11px] font-mono-numeric text-forest-800 font-semibold block">
              {sampleMetric}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 font-medium text-forest-700 group-hover:translate-x-1 transition-transform">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
