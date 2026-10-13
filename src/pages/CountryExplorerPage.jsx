import React, { useState, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List, X, RotateCcw } from 'lucide-react';
import CountryCard from '../components/cards/CountryCard';
import CountryDirectoryTable from '../components/tables/CountryDirectoryTable';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { REGIONS, INDICATOR_METRICS } from '../utils/constants';
import { getCountries } from '../services/environmentalService';

export default function CountryExplorerPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [sortBy, setSortBy] = useState('totalEmissionsCO2');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getCountries({
          region: selectedRegion,
          search,
          sortBy,
          sortOrder
        });
        setCountries(data);
      } catch (err) {
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedRegion, search, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedRegion('All Regions');
    setSortBy('totalEmissionsCO2');
    setSortOrder('desc');
  };

  const hasActiveFilters = search !== '' || selectedRegion !== 'All Regions' || sortBy !== 'totalEmissionsCO2';

  const handleSortToggle = (columnKey) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-300">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
            Country Environmental Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore national greenhouse-gas profiles, air quality monitoring, and renewable energy adoption.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-sand-200/80 p-1 rounded-lg border border-sand-300 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-forest-900 shadow-subtle'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'table'
                ? 'bg-white text-forest-900 shadow-subtle'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Table view"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-xl border border-sand-300/80 p-4 shadow-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by country name, ISO, or region..."
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

          {/* Region Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-2 px-3 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              {REGIONS.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          {/* Sort By Indicator */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2 px-3 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              <option value="totalEmissionsCO2">Sort: Total CO₂ Emissions</option>
              <option value="perCapitaCO2">Sort: CO₂ per Capita</option>
              <option value="totalGHG">Sort: Total Greenhouse Gases</option>
              <option value="renewableShare">Sort: Renewable Share</option>
              <option value="airQualityPM25">Sort: PM2.5 Concentration</option>
              <option value="name">Sort: Country Name (A-Z)</option>
            </select>

            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-sand-300 rounded-lg bg-sand-50 hover:bg-sand-100 text-xs text-slate-700 font-semibold"
              title={sortOrder === 'asc' ? 'Ascending Order' : 'Descending Order'}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Active Filters Pill Row */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sand-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium">Active filters:</span>
              {search && (
                <span className="bg-sand-100 px-2 py-0.5 rounded text-[11px] text-slate-700">
                  Search: &ldquo;{search}&rdquo;
                </span>
              )}
              {selectedRegion !== 'All Regions' && (
                <span className="bg-forest-50 px-2 py-0.5 rounded text-[11px] text-forest-800 border border-forest-200">
                  {selectedRegion}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-forest-700 hover:text-forest-900 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Results Grid / Table */}
      {loading ? (
        <LoadingSpinner label="Filtering country directory..." />
      ) : countries.length === 0 ? (
        <EmptyState
          title="No countries matched your filters"
          description="Try broadening your geographic region filter or resetting your search term."
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {countries.map(country => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      ) : (
        <CountryDirectoryTable
          countries={countries}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSortToggle}
        />
      )}
    </div>
  );
}
