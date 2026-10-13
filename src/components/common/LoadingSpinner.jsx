import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ label = 'Retrieving environmental datasets...', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`} role="status">
      <Loader2 className="w-8 h-8 text-forest-700 animate-spin mb-3" />
      <span className="text-sm font-medium text-slate-600 tracking-tight">{label}</span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
