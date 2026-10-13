import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { INDICATOR_METRICS } from '../../utils/constants';
import { formatMetric } from '../../utils/formatters';

const BAR_COLORS = [
  '#1A5B47', // Forest
  '#2563EB', // Blue
  '#D97706', // Ochre
  '#DC2626', // Red
  '#7C3AED', // Violet
  '#059669', // Emerald
  '#0891B2'  // Cyan
];

export default function CountryComparisonBarChart({
  countries = [],
  initialMetric = 'perCapitaCO2',
  className = ''
}) {
  const [selectedMetricId, setSelectedMetricId] = useState(initialMetric);

  const currentMetric = INDICATOR_METRICS.find(m => m.id === selectedMetricId) || INDICATOR_METRICS[0];

  const chartData = countries.map(country => ({
    name: country.name,
    flag: country.flag,
    id: country.id,
    value: country.indicators[selectedMetricId] ?? 0,
    year: country.latestReportingYear
  })).sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-sand-300 shadow-elevation text-xs font-sans">
          <div className="font-semibold text-slate-850 pb-1 border-b border-sand-200 mb-1 flex items-center gap-1.5">
            <span>{data.flag}</span>
            <span>{data.name}</span>
          </div>
          <div className="text-slate-600">
            <span className="font-semibold text-forest-900 font-mono-numeric text-sm">
              {formatMetric(data.value, { unit: currentMetric.unit, decimals: 2 })}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono-numeric">
            Reporting Period: {data.year}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card ${className}`}>
      {/* Header with metric dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sand-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Comparative Country Benchmark
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentMetric.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="metric-select" className="text-xs font-medium text-slate-500 whitespace-nowrap">
            Metric:
          </label>
          <select
            id="metric-select"
            value={selectedMetricId}
            onChange={(e) => setSelectedMetricId(e.target.value)}
            className="text-xs bg-sand-50 border border-sand-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
          >
            {INDICATOR_METRICS.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.unit})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE9" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E7E2D5' }}
              tick={({ x, y, payload }) => {
                const item = chartData.find(c => c.name === payload.value);
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text x={0} y={15} textAnchor="middle" fill="#334155" fontSize={11} fontWeight={500}>
                      {item?.flag} {payload.value}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E7E2D5' }}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 text-[11px] text-slate-500 border-t border-sand-200 flex items-center justify-between">
        <span>Unit: <strong>{currentMetric.unit}</strong>. Sourced from official inventories & EDGAR v8.0.</span>
        <span>Note: Comparisons should consider economic structure and population size.</span>
      </div>
    </div>
  );
}
