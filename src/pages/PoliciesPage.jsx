import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Search, Filter, RotateCcw, X, ShieldAlert } from 'lucide-react';
import PolicyCard from '../components/cards/PolicyCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DataQualityNotice from '../components/common/DataQualityNotice';
import { SECTORS, POLICY_STATUSES, POLICY_TYPES } from '../utils/constants';
import { getPolicies, getCountries } from '../services/environmentalService';

export default function PoliciesPage() {
  const [searchParams] = useSearchParams();
  const [policies, setPolicies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('all');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPolicyType, setSelectedPolicyType] = useState('All Types');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [policyList, countryList] = await Promise.all([
          getPolicies({
            countryId: selectedCountryId,
            sector: selectedSector,
            status: selectedStatus,
            policyType: selectedPolicyType,
            search
          }),
          getCountries()
        ]);
        setPolicies(policyList);
        setCountries(countryList);

        const paramId = searchParams.get('id');
        if (paramId) {
          const match = policyList.find(p => p.id === paramId);
          if (match) {
            setSearch(match.title);
          }
        }
      } catch (err) {
        console.error('Failed to load policies:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCountryId, selectedSector, selectedStatus, selectedPolicyType, search, searchParams]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCountryId('all');
    setSelectedSector('All Sectors');
    setSelectedStatus('All Statuses');
    setSelectedPolicyType('All Types');
  };

  const hasActiveFilters =
    search !== '' ||
    selectedCountryId !== 'all' ||
    selectedSector !== 'All Sectors' ||
    selectedStatus !== 'All Statuses' ||
    selectedPolicyType !== 'All Types';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-sand-300">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-forest-700" />
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
            Climate Policies & Schemes Explorer
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Catalog of verified national acts, renewable feed-in mechanisms, energy efficiency mandates, and carbon trading schemes.
        </p>
      </div>

      {/* Critical Evaluation Notice */}
      <DataQualityNotice
        type="warning"
        title="Policy Evaluation Principle: Presence vs. Effectiveness"
        collapsible={true}
      >
        <p>
          <strong>Never treat the count or volume of enacted policies as a direct measure of climate performance.</strong>
          A country with few overarching, high-stringency carbon laws may achieve greater emissions mitigation than one with dozens of overlapping, weakly enforced subsidies. Each record below contains official targets and documented evidence of outcomes where verified by authoritative audits.
        </p>
      </DataQualityNotice>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-xl border border-sand-300/80 p-4 shadow-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search */}
          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search policies by keyword, agency, or target..."
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

          {/* Country Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedCountryId}
              onChange={(e) => setSelectedCountryId(e.target.value)}
              className="w-full py-2 px-2.5 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              <option value="all">All Countries</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full py-2 px-2.5 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              {SECTORS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-2.5 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              {POLICY_STATUSES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Policy Type Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedPolicyType}
              onChange={(e) => setSelectedPolicyType(e.target.value)}
              className="w-full py-2 px-2.5 bg-sand-50 border border-sand-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
            >
              {POLICY_TYPES.map(pt => (
                <option key={pt} value={pt}>{pt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sand-200 text-xs">
          <span className="text-slate-500 font-medium text-[11px]">
            Showing <strong>{policies.length}</strong> verified policy initiatives
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

      {/* Policy Results Grid */}
      {loading ? (
        <LoadingSpinner label="Filtering policy catalog..." />
      ) : policies.length === 0 ? (
        <EmptyState
          title="No policies match the selected criteria"
          description="Try broadening the sector or country filters to discover related climate schemes."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {policies.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      )}
    </div>
  );
}
