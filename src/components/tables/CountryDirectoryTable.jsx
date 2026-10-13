import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpDown } from 'lucide-react';
import Badge from '../common/Badge';
import { formatMetric, formatPercentage } from '../../utils/formatters';

export default function CountryDirectoryTable({
  countries = [],
  sortBy,
  sortOrder,
  onSort
}) {
  const renderSortIndicator = (columnKey) => {
    if (sortBy !== columnKey) {
      return <ArrowUpDown className="w-3 h-3 text-slate-300 ml-1 inline" />;
    }
    return (
      <span className="text-forest-700 font-bold ml-1">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-sand-300 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-sand-100/90 border-b border-sand-300 text-slate-700">
              <th
                onClick={() => onSort('name')}
                className="p-3.5 font-semibold cursor-pointer hover:text-forest-800"
              >
                Country / Economy {renderSortIndicator('name')}
              </th>
              <th className="p-3.5 font-semibold">Region</th>
              <th
                onClick={() => onSort('totalEmissionsCO2')}
                className="p-3.5 font-semibold text-right cursor-pointer hover:text-forest-800"
              >
                Total CO₂ (Mt) {renderSortIndicator('totalEmissionsCO2')}
              </th>
              <th
                onClick={() => onSort('perCapitaCO2')}
                className="p-3.5 font-semibold text-right cursor-pointer hover:text-forest-800"
              >
                Per-Capita CO₂ (t) {renderSortIndicator('perCapitaCO2')}
              </th>
              <th
                onClick={() => onSort('renewableShare')}
                className="p-3.5 font-semibold text-right cursor-pointer hover:text-forest-800"
              >
                Renewables (%) {renderSortIndicator('renewableShare')}
              </th>
              <th
                onClick={() => onSort('airQualityPM25')}
                className="p-3.5 font-semibold text-right cursor-pointer hover:text-forest-800"
              >
                PM2.5 (µg/m³) {renderSortIndicator('airQualityPM25')}
              </th>
              <th className="p-3.5 font-semibold text-center">Status</th>
              <th className="p-3.5 font-semibold text-right">Profile</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-sand-200">
            {countries.map(country => (
              <tr key={country.id} className="hover:bg-sand-50/70 transition-colors">
                <td className="p-3.5 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={country.name}>
                      {country.flag}
                    </span>
                    <div>
                      <Link to={`/countries/${country.id}`} className="hover:text-forest-800 hover:underline">
                        {country.name}
                      </Link>
                      <span className="text-[11px] text-slate-400 font-mono block">
                        {country.iso3}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="p-3.5 text-slate-600">
                  {country.region}
                </td>

                <td className="p-3.5 text-right font-mono-numeric font-medium text-slate-800">
                  {formatMetric(country.indicators.totalEmissionsCO2)}
                </td>

                <td className="p-3.5 text-right font-mono-numeric font-medium text-slate-800">
                  {formatMetric(country.indicators.perCapitaCO2, { decimals: 2 })}
                </td>

                <td className="p-3.5 text-right font-mono-numeric font-medium text-slate-800">
                  {formatPercentage(country.indicators.renewableShare)}
                </td>

                <td className="p-3.5 text-right font-mono-numeric font-medium text-slate-800">
                  {formatMetric(country.indicators.airQualityPM25)}
                </td>

                <td className="p-3.5 text-center">
                  <Badge status={country.verificationStatus} size="xs" />
                </td>

                <td className="p-3.5 text-right">
                  <Link
                    to={`/countries/${country.id}`}
                    className="inline-flex items-center gap-1 text-forest-700 hover:text-forest-900 font-medium text-xs"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
