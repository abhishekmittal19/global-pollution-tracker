import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldCheck, HelpCircle } from 'lucide-react';

export default function DataQualityNotice({
  title = 'Scientific Data Governance & Limitation Note',
  children,
  type = 'info', // 'info' | 'warning' | 'scientific'
  collapsible = false,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(!collapsible);

  const styleMap = {
    info: {
      container: 'bg-sand-100/80 border-sand-300 text-slate-800',
      icon: <HelpCircle className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />,
      accent: 'text-forest-900',
    },
    warning: {
      container: 'bg-amber-50/70 border-amber-200 text-amber-900',
      icon: <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />,
      accent: 'text-amber-950',
    },
    scientific: {
      container: 'bg-forest-50/60 border-forest-200 text-forest-950',
      icon: <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />,
      accent: 'text-forest-900',
    }
  };

  const currentStyle = styleMap[type] || styleMap.info;

  return (
    <aside
      aria-label={title}
      className={`border rounded-lg p-3 text-xs leading-relaxed transition-all ${currentStyle.container} ${className}`}
    >
      <div
        className={`flex items-start justify-between gap-2.5 ${collapsible ? 'cursor-pointer select-none' : ''}`}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <div className="flex items-start gap-2">
          {currentStyle.icon}
          <div className="font-semibold tracking-tight text-slate-900">
            {title}
          </div>
        </div>

        {collapsible && (
          <button
            type="button"
            className="p-0.5 text-slate-500 hover:text-slate-800 rounded focus:outline-none"
            aria-label={isOpen ? 'Collapse notice' : 'Expand notice'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-2 text-slate-700 space-y-1.5 pl-6 border-t border-black/5 pt-2">
          {children}
        </div>
      )}
    </aside>
  );
}
