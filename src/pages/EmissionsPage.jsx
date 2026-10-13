import React, { useState, useEffect } from 'react';
import { Flame, Wind, Factory, Zap, Truck, Home, Wheat, Trash2, Info, ArrowRight } from 'lucide-react';
import EmissionsTimelineChart from '../components/charts/EmissionsTimelineChart';
import CountryComparisonBarChart from '../components/charts/CountryComparisonBarChart';
import SectorBreakdownPieChart from '../components/charts/SectorBreakdownPieChart';
import DataQualityNotice from '../components/common/DataQualityNotice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';
import { getCountries } from '../services/environmentalService';
import { formatMetric, formatPercentage } from '../utils/formatters';

const SECTOR_SUMMARIES = [
  {
    name: 'Energy & Power Generation',
    icon: Zap,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    globalShare: '~40%',
    summary: 'Combustion of coal, natural gas, and oil for utility power and district heat networks.'
  },
  {
    name: 'Industry & Heavy Manufacturing',
    icon: Factory,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    globalShare: '~24%',
    summary: 'Steel blast furnaces, cement clinker calcination, petrochemicals, and aluminum smelting.'
  },
  {
    name: 'Transport (Road, Rail, Aviation)',
    icon: Truck,
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    globalShare: '~15%',
    summary: 'Internal combustion road vehicles, freight trucks, domestic aviation, and rail diesel engines.'
  },
  {
    name: 'Agriculture & Cattle Livestock',
    icon: Wheat,
    color: 'text-orange-700 bg-orange-50 border-orange-200',
    globalShare: '~12%',
    summary: 'Ruminant enteric fermentation methane (cattle, sheep), paddy rice cultivation, and synthetic fertilizer N₂O.'
  },
  {
    name: 'Buildings & Space Heating',
    icon: Home,
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    globalShare: '~6%',
    summary: 'Direct residential and commercial fuel combustion for space heating, cooking, and hot water.'
  },
  {
    name: 'Municipal & Industrial Waste',
    icon: Trash2,
    color: 'text-slate-700 bg-slate-50 border-slate-200',
    globalShare: '~3%',
    summary: 'Anaerobic decomposition in landfills producing fugitive methane, and wastewater treatment.'
  }
];

export default function EmissionsPage() {
  const [countries, setCountries] = useState([]);
  const [activeCountryId, setActiveCountryId] = useState('india');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const list = await getCountries();
        setCountries(list);
      } catch (err) {
        console.error('Failed to load emissions data:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading pollution and greenhouse gas datasets..." />;
  }

  const activeCountry = countries.find(c => c.id === activeCountryId) || countries[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-sand-300">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-forest-700" />
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
            Pollution & Greenhouse-Gas Emissions
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed sector contributions, multi-gas warming potentials, and ambient air particulate matter diagnostics.
        </p>
      </div>

      {/* Atmospheric Science Notice */}
      <DataQualityNotice
        type="scientific"
        title="Atmospheric Accounting Principles (UNFCCC vs EDGAR)"
        collapsible={true}
      >
        <p>
          Emissions datasets reflect standard IPCC 100-year Global Warming Potentials (GWP-100) from the Fifth Assessment Report (AR5).
          Territorial accounting captures emissions generated within geographical boundaries, excluding international aviation and marine bunkers in accordance with UNFCCC reporting decisions.
        </p>
      </DataQualityNotice>

      {/* Major Economic Sectors Grid */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-forest-950">
          Primary Sources of Global Greenhouse Emissions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTOR_SUMMARIES.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-sand-300/80 p-4 shadow-card hover:border-forest-300 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${sector.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-sand-100 px-2 py-0.5 rounded">
                    {sector.globalShare} Global
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{sector.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sector.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Country Sector Deep Dive with selector */}
      <section className="bg-white rounded-xl border border-sand-300 p-6 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              National Sector Allocation: {activeCountry.flag} {activeCountry.name}
            </h2>
            <p className="text-xs text-slate-500">
              Select an economy to inspect its latest verified sector inventory
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Select Country:</span>
            <div className="flex flex-wrap gap-1.5">
              {countries.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCountryId(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    activeCountryId === c.id
                      ? 'bg-forest-800 text-white border-forest-800 shadow-subtle'
                      : 'bg-sand-50 text-slate-700 border-sand-200 hover:bg-sand-100'
                  }`}
                >
                  <span>{c.flag} {c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <SectorBreakdownPieChart
              sectorData={activeCountry.sectorBreakdown}
              countryName={activeCountry.name}
            />
          </div>

          <div className="lg:col-span-5 bg-sand-50/80 p-5 rounded-xl border border-sand-200 text-xs space-y-3">
            <h3 className="font-semibold text-slate-900 border-b border-sand-200 pb-2">
              National Emissions Diagnostics
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Territorial CO₂ (Fossil):</span>
                <strong className="font-mono-numeric">{formatMetric(activeCountry.indicators.totalEmissionsCO2, { unit: 'Mt' })}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Greenhouse Gases:</span>
                <strong className="font-mono-numeric">{formatMetric(activeCountry.indicators.totalGHG, { unit: 'Mt CO₂eq' })}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Per-Capita CO₂:</span>
                <strong className="font-mono-numeric">{formatMetric(activeCountry.indicators.perCapitaCO2, { unit: 't/capita', decimals: 2 })}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Grid Carbon Intensity:</span>
                <strong className="font-mono-numeric">{formatMetric(activeCountry.indicators.carbonIntensity, { unit: 'g CO₂/kWh' })}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PM2.5 Ambient Exposure:</span>
                <strong className="font-mono-numeric">{formatMetric(activeCountry.indicators.airQualityPM25, { unit: 'µg/m³' })}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-sand-200">
              <Link
                to={`/countries/${activeCountry.id}`}
                className="text-forest-700 hover:text-forest-900 font-semibold inline-flex items-center gap-1"
              >
                <span>Open full profile for {activeCountry.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Trajectories */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-forest-950">
          Decadal Emissions Trends (1990 – 2023)
        </h2>
        <EmissionsTimelineChart countries={countries} initialMetric="co2" />
      </section>
    </div>
  );
}
