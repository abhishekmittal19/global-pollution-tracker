import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GitCompare, Plus, X, AlertTriangle, Layers, Info } from 'lucide-react';
import CountryComparisonTable from '../components/tables/CountryComparisonTable';
import EmissionsTimelineChart from '../components/charts/EmissionsTimelineChart';
import CountryComparisonBarChart from '../components/charts/CountryComparisonBarChart';
import DataQualityNotice from '../components/common/DataQualityNotice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { getCountries, compareCountries } from '../services/environmentalService';
import { INDICATOR_METRICS } from '../utils/constants';

export default function CompareCountriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allCountries, setAllCountries] = useState([]);
  const [selectedIds, setSelectedIds] = useState(['india', 'germany', 'china']);
  const [selectedMetric, setSelectedMetric] = useState('perCapitaCO2');
  const [loading, setLoading] = useState(true);

  // Check URL params for preselected countries
  useEffect(() => {
    async function init() {
      try {
        const list = await getCountries();
        setAllCountries(list);

        const c1 = searchParams.get('country1');
        const c2 = searchParams.get('country2');
        const metricParam = searchParams.get('metric');

        if (c1) {
          const initial = [c1];
          if (c2 && c2 !== c1) initial.push(c2);
          else {
            // Pick a sensible default pair
            const fallback = list.find(c => c.id !== c1);
            if (fallback) initial.push(fallback.id);
          }
          setSelectedIds(initial);
        }

        if (metricParam) {
          setSelectedMetric(metricParam);
        }
      } catch (err) {
        console.error('Failed to load comparison data:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [searchParams]);

  const addCountry = (id) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCountry = (id) => {
    if (selectedIds.length > 2) {
      setSelectedIds(selectedIds.filter(c => c !== id));
    }
  };

  if (loading) {
    return <LoadingSpinner label="Aligning multi-country environmental indicators..." />;
  }

  const selectedCountryObjects = allCountries.filter(c => selectedIds.includes(c.id));
  const availableToAdd = allCountries.filter(c => !selectedIds.includes(c.id));
  const activeMetricMeta = INDICATOR_METRICS.find(m => m.id === selectedMetric) || INDICATOR_METRICS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sand-300">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-forest-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
              Compare Countries Side-by-Side
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare 2 to 4 countries using standardized accounting boundaries, explicit units, and baseline year references.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-sand-100 px-3 py-1.5 rounded-lg border border-sand-200 font-mono-numeric">
          Selected: {selectedIds.length} / 4 Economies
        </div>
      </div>

      {/* Scientific Governance Notice */}
      <DataQualityNotice
        type="warning"
        title="Scientific Equivalence Rules for National Comparisons"
        collapsible={true}
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <strong>CO₂ vs All Greenhouse Gases:</strong> Fossil CO₂ is distinguished from total GHGs (which include agricultural methane and N₂O converted via IPCC AR5 GWP-100).
          </li>
          <li>
            <strong>Territorial vs Consumption:</strong> Territorial emissions record physical smokestack emissions within sovereign boundaries. Consumption emissions adjust for imported goods manufactured abroad.
          </li>
          <li>
            <strong>No Arbitrary Ranking:</strong> GPCI does not compute an aggregate &ldquo;green score&rdquo;, as combining incompatible socio-economic priorities obscures underlying science.
          </li>
        </ul>
      </DataQualityNotice>

      {/* Country Selection Chips & Selector */}
      <div className="bg-white rounded-xl border border-sand-300/80 p-4 shadow-card space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 mr-1">Active Countries:</span>
          {selectedCountryObjects.map(country => (
            <div
              key={country.id}
              className="inline-flex items-center gap-2 bg-forest-50 border border-forest-200 text-forest-950 px-3 py-1.5 rounded-lg text-xs font-medium"
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
              {selectedIds.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeCountry(country.id)}
                  className="text-forest-700 hover:text-rose-600 p-0.5 rounded"
                  aria-label={`Remove ${country.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

          {selectedIds.length < 4 && availableToAdd.length > 0 && (
            <div className="relative inline-block">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addCountry(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="text-xs bg-sand-100 hover:bg-sand-200 border border-dashed border-sand-300 rounded-lg px-3 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-forest-600 cursor-pointer"
              >
                <option value="" disabled>+ Add Country to Compare...</option>
                {availableToAdd.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-forest-950">
            Multi-Indicator Comparative Matrix
          </h2>
          <span className="text-xs text-slate-400">
            Normalized Accounting Framework
          </span>
        </div>

        <CountryComparisonTable countries={selectedCountryObjects} />
      </section>

      {/* Comparative Charts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-forest-950">
            Comparative Time Series & Distribution
          </h2>
          <span className="text-xs text-slate-400 font-mono-numeric">
            1990 – 2023 Harmonized
          </span>
        </div>

        <EmissionsTimelineChart countries={selectedCountryObjects} initialMetric="perCapitaCO2" />

        <CountryComparisonBarChart countries={selectedCountryObjects} initialMetric="perCapitaCO2" />
      </section>
    </div>
  );
}
