import React from 'react';
import { ExternalLink, Info, AlertTriangle } from 'lucide-react';
import Badge from '../common/Badge';
import { formatMetric, formatPercentage, formatPopulation } from '../../utils/formatters';

export default function CountryComparisonTable({ countries = [] }) {
  if (!countries || countries.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 bg-sand-50 rounded-lg">
        Please select at least two countries to generate a comparative analysis table.
      </div>
    );
  }

  const comparisonRows = [
    {
      group: 'Demographics & Socioeconomics',
      rows: [
        {
          label: 'Population',
          unit: 'Inhabitants',
          format: (c) => formatPopulation(c.population),
          note: 'Mid-year UN Population Division estimates'
        },
        {
          label: 'GDP per Capita (Nominal)',
          unit: 'USD',
          format: (c) => formatMetric(c.gdpPerCapita, { prefix: '$', unit: 'USD' }),
          note: 'World Bank World Development Indicators'
        }
      ]
    },
    {
      group: 'Emissions Accounting (Territorial vs Consumption)',
      rows: [
        {
          label: 'Territorial CO₂ (Fossil & Cement)',
          unit: 'Mt CO₂',
          format: (c) => formatMetric(c.indicators.totalEmissionsCO2, { unit: 'Mt' }),
          note: 'Emissions physically generated within national borders (UNFCCC standard)',
          isHighlight: true
        },
        {
          label: 'Total Greenhouse Gases (GHG)',
          unit: 'Mt CO₂eq',
          format: (c) => formatMetric(c.indicators.totalGHG, { unit: 'Mt CO₂eq' }),
          note: 'Includes CO₂, Methane, N₂O, and F-gases aggregated via IPCC AR5 GWP-100',
          isHighlight: true
        },
        {
          label: 'Territorial CO₂ per Capita',
          unit: 't CO₂/person',
          format: (c) => formatMetric(c.indicators.perCapitaCO2, { unit: 't/capita', decimals: 2 }),
          note: 'Production-based emissions divided by domestic population',
          isHighlight: true
        },
        {
          label: 'Consumption-Based CO₂',
          unit: 'Mt CO₂',
          format: (c) => formatMetric(c.indicators.consumptionBasedCO2, { unit: 'Mt' }),
          note: 'Trade-adjusted: accounts for embodied carbon in net imports/exports (Global Carbon Budget)'
        },
        {
          label: 'Trade Embodied Carbon Status',
          unit: 'Direction',
          format: (c) => {
            const terr = c.indicators.totalEmissionsCO2;
            const cons = c.indicators.consumptionBasedCO2;
            if (!terr || !cons) return '—';
            return cons > terr ? 'Net Importer of Carbon' : 'Net Exporter of Carbon';
          },
          note: 'Net importers consume goods manufactured abroad; net exporters manufacture goods for global export'
        }
      ]
    },
    {
      group: 'Energy & Atmospheric Indicators',
      rows: [
        {
          label: 'Renewable Electricity Generation Share',
          unit: '%',
          format: (c) => formatPercentage(c.indicators.renewableShare),
          note: 'Solar, wind, hydro, bioenergy share of total electricity generation',
          isHighlight: true
        },
        {
          label: 'Grid Carbon Intensity',
          unit: 'g CO₂/kWh',
          format: (c) => formatMetric(c.indicators.carbonIntensity, { unit: 'g/kWh' }),
          note: 'Grams of CO₂ emitted per kilowatt-hour of electricity generated on the grid'
        },
        {
          label: 'Annual Mean PM2.5 Exposure',
          unit: 'µg/m³',
          format: (c) => formatMetric(c.indicators.airQualityPM25, { unit: 'µg/m³' }),
          note: 'Population-weighted exposure to fine ambient particulate matter (WHO guideline: 5 µg/m³)'
        },
        {
          label: 'Forest Land Cover Share',
          unit: '%',
          format: (c) => formatPercentage(c.indicators.forestCoverShare),
          note: 'Natural and planted forest canopy percentage of total geographic area'
        }
      ]
    },
    {
      group: 'Climate Commitments & Legal Targets',
      rows: [
        {
          label: 'Target Baseline Reference Year',
          unit: 'Year',
          format: (c) => c.indicators.baselineYear ? `Year ${c.indicators.baselineYear}` : '—',
          note: 'Reference point against which percentage reduction pledges are calculated'
        },
        {
          label: 'NDC Target Type & Mechanism',
          unit: 'Classification',
          format: (c) => c.ndcSnapshot?.classification || '—',
          note: 'Absolute volumetric reduction vs economic intensity reduction'
        },
        {
          label: '2030 Headline Pledge',
          unit: 'Target',
          format: (c) => c.ndcSnapshot?.intensityTarget || '—',
          note: 'Filed Nationally Determined Contribution commitments under Paris Agreement'
        },
        {
          label: 'Pledged Net-Zero Horizon',
          unit: 'Year',
          format: (c) => c.indicators.netZeroTargetYear ? `Year ${c.indicators.netZeroTargetYear}` : '—',
          note: 'Target year for carbon neutrality or economy-wide net greenhouse-gas neutrality'
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-sand-300 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-sand-100/80 border-b border-sand-300">
              <th className="p-3.5 font-semibold text-slate-800 w-1/4 min-w-[200px]">
                Environmental & Policy Indicator
              </th>
              {countries.map(country => (
                <th key={country.id} className="p-3.5 font-semibold text-slate-900 border-l border-sand-200 min-w-[180px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl" role="img" aria-label={country.name}>
                        {country.flag}
                      </span>
                      <span className="text-sm font-bold text-slate-900">{country.name}</span>
                    </div>
                    <Badge status={country.verificationStatus} size="xs" />
                  </div>
                  <div className="text-[11px] font-normal text-slate-500 mt-1">
                    {country.region} • Latest: {country.latestReportingYear}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-sand-200">
            {comparisonRows.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <tr className="bg-sand-50/90">
                  <td
                    colSpan={countries.length + 1}
                    className="p-2.5 font-bold text-forest-950 uppercase tracking-wider text-[11px] border-y border-sand-200"
                  >
                    {group.group}
                  </td>
                </tr>

                {group.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={`hover:bg-sand-50/50 transition-colors ${
                      row.isHighlight ? 'bg-forest-50/20' : ''
                    }`}
                  >
                    <td className="p-3 font-medium text-slate-800 align-top">
                      <div className="font-semibold text-slate-850">{row.label}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="bg-sand-100 px-1 rounded text-slate-600 font-mono-numeric">[{row.unit}]</span>
                        <span>{row.note}</span>
                      </div>
                    </td>

                    {countries.map(country => (
                      <td
                        key={country.id}
                        className="p-3 text-slate-800 border-l border-sand-200 align-top font-mono-numeric"
                      >
                        <span className={`text-xs font-semibold ${row.isHighlight ? 'text-forest-950' : 'text-slate-850'}`}>
                          {row.format(country)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-sand-100/60 border-t border-sand-200 text-[11px] text-slate-600 space-y-1">
        <div className="flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Methodological Equivalence Warning:</strong> Percentage targets cannot be compared without normalizing against common baseline years. Territorial emissions hold domestic producers liable, while consumption-based accounting adjusts for imported finished goods. GPCI does not assign an arbitrary single ranking.
          </span>
        </div>
      </div>
    </div>
  );
}
