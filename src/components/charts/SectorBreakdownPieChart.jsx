import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { formatMetric, formatPercentage } from '../../utils/formatters';

export default function SectorBreakdownPieChart({ sectorData = [], countryName = '', className = '' }) {
  if (!sectorData || sectorData.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 bg-sand-50 rounded-lg">
        No sector breakdown data available for this profile.
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-sand-300 shadow-elevation text-xs font-sans">
          <div className="flex items-center gap-1.5 font-semibold text-slate-850 pb-1 border-b border-sand-200 mb-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            <span>{data.sector}</span>
          </div>
          <div className="space-y-0.5 text-slate-600">
            <div>Share of Total: <strong className="text-forest-900 font-mono-numeric">{formatPercentage(data.share)}</strong></div>
            {data.emissionsMt && (
              <div>Emissions: <span className="font-mono-numeric font-medium text-slate-800">{formatMetric(data.emissionsMt, { unit: 'Mt CO₂eq' })}</span></div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card ${className}`}>
      <div className="pb-3 border-b border-sand-200">
        <h4 className="text-sm font-semibold text-slate-900">
          Greenhouse-Gas Emissions by Economic Sector
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Breakdown of national emissions inventory {countryName ? `for ${countryName}` : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-3">
        {/* Pie Chart */}
        <div className="h-52 md:col-span-5 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={sectorData}
                dataKey="share"
                nameKey="sector"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#1A5B47'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Breakdown Table */}
        <div className="md:col-span-7 space-y-1.5 text-xs">
          {sectorData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-1.5 rounded hover:bg-sand-50 transition-colors"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700 truncate" title={item.sector}>
                  {item.sector}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {item.emissionsMt && (
                  <span className="text-slate-500 text-[11px] font-mono-numeric">
                    {formatMetric(item.emissionsMt, { unit: 'Mt' })}
                  </span>
                )}
                <span className="font-semibold text-slate-900 font-mono-numeric w-12 text-right">
                  {formatPercentage(item.share)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
