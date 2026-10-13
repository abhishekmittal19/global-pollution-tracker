import React, { useState, useEffect } from 'react';
import { Database, Search, ExternalLink, RotateCcw, X, ShieldCheck } from 'lucide-react';
import DataSourceCard from '../components/cards/DataSourceCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DataQualityNotice from '../components/common/DataQualityNotice';
import { getDataSources } from '../services/environmentalService';

const CATEGORIES = [
  'All Categories',
  'Emissions & Pollution',
  'Climate Targets & Official Inventories',
  'Emissions & Carbon Cycle',
  'Energy & Power Emissions',
  'Socioeconomic & Environmental Indicators',
  'Air Quality & Health',
  'Emissions & Asset-Level Tracking'
];

export default function DataSourcesPage() {
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const sources = await getDataSources({
          category: selectedCategory,
          search
        });
        setDataSources(sources);
      } catch (err) {
        console.error('Failed to load data sources:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedCategory, search]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All Categories');
  };

  const hasActiveFilters = search !== '' || selectedCategory !== 'All Categories';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-sand-300">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-forest-700" />
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
            Transparent Data Sources & Provenance Registry
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete citation registry enabling researchers to audit, inspect, and trace every indicator back to its primary repository.
        </p>
      </div>

      {/* Provenance Notice */}
      <DataQualityNotice
        type="scientific"
        title="Open Science & Provenance Integrity"
        collapsible={true}
      >
        <p>
          Every statistic presented across GPCI is traceable to an authoritative open-data publisher (such as the European Commission EDGAR, UNFCCC, or the Global Carbon Project).
          We do not synthesize or fabricate numbers. Known methodology boundaries and update lags are documented below for full academic scrutiny.
        </p>
      </DataQualityNotice>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-sand-300/80 p-4 shadow-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search data sources by name, publisher, or dataset scope..."
              className="w-full pl-9 pr-8 py-2 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-forest-600 focus:bg-white transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sand-200 text-xs">
          <span className="text-slate-500 font-medium text-[11px]">
            Cataloging <strong>{dataSources.length}</strong> primary international scientific repositories
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-forest-700 hover:text-forest-900 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Sources Grid */}
      {loading ? (
        <LoadingSpinner label="Auditing data source repositories..." />
      ) : dataSources.length === 0 ? (
        <EmptyState
          title="No data sources match your criteria"
          description="Try resetting your keyword search or category filter."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dataSources.map(source => (
            <DataSourceCard key={source.id} source={source} />
          ))}
        </div>
      )}
    </div>
  );
}
