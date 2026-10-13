import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { formatMetric } from '../../utils/formatters';

const COUNTRY_COLORS = {
  india: '#D97706', // Ochre / saffron
  germany: '#2563EB', // Blue
  china: '#DC2626', // Red
  usa: '#7C3AED', // Violet
  japan: '#059669', // Emerald
  brazil: '#16A34A', // Green
  'united-kingdom': '#0891B2', // Cyan
};

const METRIC_CONFIG = {
  co2: {
    label: 'Territorial CO₂ Emissions',
    unit: 'Mt CO₂',
    description: 'Fossil fuel combustion & cement production'
  },
  ghg: {
    label: 'Total Greenhouse Gases',
    unit: 'Mt CO₂eq',
    description: 'CO₂, CH₄, N₂O, and F-gases (AR5 GWP-100)'
  },
  perCapitaCO2: {
    label: 'CO₂ per Capita',
    unit: 't CO₂/person',
    description: 'Territorial carbon dioxide divided by population'
  },
  renewableShare: {
    label: 'Renewable Electricity Share',
    unit: '%',
    description: 'Share of total electricity generation from renewables'
  }
};

export default function EmissionsTimelineChart({
  countries = [],
  initialMetric = 'co2',
  className = ''
}) {
  const [activeMetric, setActiveMetric] = useState(initialMetric);
  const [selectedCountryIds, setSelectedCountryIds] = useState(
    countries.slice(0, 3).map(c => c.id) // default India, Germany, China
  );

  // Build aligned timeline data
  const years = [1990, 1995, 2000, 2005, 2010, 2015, 2018, 2020, 2021, 2022, 2023];

  const chartData = years.map(year => {
    const row = { year };
    countries.forEach(country => {
      const match = country.historicalTimeline?.find(p => p.year === year);
      if (match) {
        row[country.id] = match[activeMetric] ?? null;
      }
    });
    return row;
  });

  const toggleCountry = (id) => {
    if (selectedCountryIds.includes(id)) {
      if (selectedCountryIds.length > 1) {
        setSelectedCountryIds(selectedCountryIds.filter(c => c !== id));
      }
    } else {
      setSelectedCountryIds([...selectedCountryIds, id]);
    }
  };

  const metricMeta = METRIC_CONFIG[activeMetric] || METRIC_CONFIG.co2;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg border border-sand-300 shadow-elevation text-xs font-sans">
          <div className="font-semibold text-slate-850 pb-1.5 border-b border-sand-200 mb-1.5 flex items-center justify-between gap-4">
            <span>Year {label}</span>
            <span className="text-[11px] text-slate-500 font-normal">{metricMeta.unit}</span>
          </div>
          <div className="space-y-1">
            {payload.map((item) => {
              const country = countries.find(c => c.id === item.dataKey);
              return (
                <div key={item.dataKey} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium">
                      {country?.flag} {country?.name || item.dataKey}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono-numeric">
                    {formatMetric(item.value, { unit: metricMeta.unit, decimals: 2 })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-xl border border-sand-300/80 p-5 shadow-card ${className}`}>
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">
              Historical Emissions & Transition Trajectory (1990 – 2023)
            </h3>
            <span className="text-xs bg-forest-50 text-forest-800 font-medium px-2 py-0.5 rounded border border-forest-200">
              {metricMeta.unit}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {metricMeta.description} • Source: EDGAR v8.0 / UNFCCC / IEA
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-sand-100 p-1 rounded-lg border border-sand-200">
          {Object.entries(METRIC_CONFIG).map(([key, config]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveMetric(key)}
              className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${
                activeMetric === key
                  ? 'bg-white text-forest-900 shadow-subtle font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {config.label.split(' ')[0]} {config.label.includes('Capita') ? 'per Capita' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Country Filter Toggles */}
      <div className="flex flex-wrap items-center gap-2 py-3">
        <span className="text-xs font-medium text-slate-500 mr-1">Display Countries:</span>
        {countries.map(country => {
          const isSelected = selectedCountryIds.includes(country.id);
          const color = COUNTRY_COLORS[country.id] || '#64748B';
          return (
            <button
              key={country.id}
              type="button"
              onClick={() => toggleCountry(country.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                isSelected
                  ? 'bg-white text-slate-800 border-sand-300 shadow-subtle'
                  : 'bg-sand-50 text-slate-400 border-transparent hover:border-sand-200 opacity-60'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isSelected ? color : '#CBD5E1' }}
              />
              <span>{country.flag} {country.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE9" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E7E2D5' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E7E2D5' }}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => {
                const country = countries.find(c => c.id === value);
                return <span className="text-xs text-slate-700 font-medium">{country?.flag} {country?.name || value}</span>;
              }}
              wrapperStyle={{ paddingTop: 10 }}
            />
            {countries.map(country => {
              if (!selectedCountryIds.includes(country.id)) return null;
              return (
                <Line
                  key={country.id}
                  type="monotone"
                  dataKey={country.id}
                  name={country.id}
                  stroke={COUNTRY_COLORS[country.id] || '#334155'}
                  strokeWidth={2.5}
                  dot={{ r: 3, strokeWidth: 1.5, fill: '#FFFFFF' }}
                  activeDot={{ r: 5, strokeWidth: 2 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-2.5 border-t border-sand-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Units: <strong>{metricMeta.unit}</strong>. Normalized against standardized IPCC AR5 reporting boundaries.</span>
        <span>Notice: Does not include international aviation or marine bunker fuel pursuant to UNFCCC Article 4.</span>
      </div>
    </div>
  );
}
