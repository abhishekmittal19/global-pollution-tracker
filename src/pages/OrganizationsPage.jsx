import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Search, Filter, RotateCcw, X, ShieldCheck } from 'lucide-react';
import OrganizationCard from '../components/cards/OrganizationCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DataQualityNotice from '../components/common/DataQualityNotice';
import { getOrganizations, getCountries } from '../services/environmentalService';

const ORG_TYPES = [
  'All Types',
  'Government Agency',
  'Research Institute',
  'University / Institute',
  'International Body',
  'Research Initiative'
];

export default function OrganizationsPage() {
  const [searchParams] = useSearchParams();
  const [organizations, setOrganizations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCountryId, setSelectedCountryId] = useState('all');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [orgs, countryList] = await Promise.all([
          getOrganizations({
            type: selectedType,
            countryId: selectedCountryId,
            search
          }),
          getCountries()
        ]);
        setOrganizations(orgs);
        setCountries(countryList);

        const paramId = searchParams.get('id');
        if (paramId) {
          const matched = orgs.find(o => o.id === paramId);
          if (matched) {
            setSearch(matched.name);
          }
        }
      } catch (err) {
        console.error('Failed to load organizations:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedType, selectedCountryId, search, searchParams]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedType('All Types');
    setSelectedCountryId('all');
  };

  const hasActiveFilters = search !== '' || selectedType !== 'All Types' || selectedCountryId !== 'all';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-sand-300">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-forest-700" />
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
            People & Organizations Directory
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Verified research institutes, national environmental ministries, academic centers, and international governance bodies.
        </p>
      </div>

      {/* Governance Notice */}
      <DataQualityNotice
        type="scientific"
        title="Verified Institutional Provenance Standard"
        collapsible={true}
      >
        <p>
          All entities in this directory reflect real-world institutions, statutory ministries, and peer-reviewed scientific initiatives.
          GPCI does not hallucinate personnel, credentials, or affiliations. External links connect directly to official government portals and institutional homepages.
        </p>
      </DataQualityNotice>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-sand-300/80 p-4 shadow-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by institution name, focus area, or city..."
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

          {/* Type Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              {ORG_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Country / Jurisdiction Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCountryId}
              onChange={(e) => setSelectedCountryId(e.target.value)}
              className="w-full py-2 px-3 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              <option value="all">All Jurisdictions</option>
              <option value="global">🌐 International Bodies</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sand-200 text-xs">
          <span className="text-slate-500 font-medium text-[11px]">
            Displaying <strong>{organizations.length}</strong> verified organizations & initiatives
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

      {/* Organizations Results Grid */}
      {loading ? (
        <LoadingSpinner label="Querying verified organizations..." />
      ) : organizations.length === 0 ? (
        <EmptyState
          title="No organizations match your filters"
          description="Try selecting 'All Jurisdictions' or clearing search keywords."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {organizations.map(org => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      )}
    </div>
  );
}
