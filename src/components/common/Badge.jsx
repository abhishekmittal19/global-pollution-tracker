import React from 'react';
import { DATA_STATUS_BADGES } from '../../utils/constants';

export default function Badge({
  status,
  variant = 'default',
  children,
  className = '',
  size = 'sm'
}) {
  if (status && DATA_STATUS_BADGES[status]) {
    const info = DATA_STATUS_BADGES[status];
    return (
      <span
        title={info.tooltip}
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${info.color} ${
          size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
        } ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${info.dotColor}`} />
        <span>{children || info.label}</span>
      </span>
    );
  }

  const variantStyles = {
    default: 'bg-sand-200 text-slate-700 border-sand-300',
    forest: 'bg-forest-50 text-forest-800 border-forest-200',
    blue: 'bg-sky-50 text-sky-800 border-sky-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    outline: 'bg-transparent text-slate-600 border-slate-300',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variantStyles[variant] || variantStyles.default} ${
        size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs'
      } ${className}`}
    >
      {children}
    </span>
  );
}
