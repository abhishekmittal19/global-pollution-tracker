import React, { useState, useEffect, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import {
  Download,
  Play,
  Pause,
  RotateCcw,
  Search,
  Plus,
  X,
  Info,
  ExternalLink,
  ChevronDown,
  Layers,
  Globe,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  Share2
} from 'lucide-react';
import { COUNTRIES } from '../data/countriesData';
import { GLOBAL_INDICATORS } from '../data/globalOverviewData';

// Color mapping matching Our World in Data signature series
const ENTITY_COLORS = {
  world: '#94a3b8',
  china: '#e11d48', // Crimson Red
  usa: '#2563eb', // Royal Blue
  india: '#d97706', // Amber / Saffron
  germany: '#8b5cf6', // Violet
  uk: '#0d9488', // Teal
  japan: '#f43f5e', // Rose
  brazil: '#10b981', // Emerald
  france: '#3b82f6', // Light Blue
};

// Cumulative historical emissions estimates (1751 - 2023 in Gt and %)
const CUMULATIVE_EMISSIONS = [
  { name: 'United States', code: 'USA', gt: 422, share: 24.6, flag: '🇺🇸', color: '#2563eb' },
  { name: 'European Union (EU-27)', code: 'EU', gt: 292, share: 17.1, flag: '🇪🇺', color: '#059669' },
  { name: 'China', code: 'CHN', gt: 249, share: 14.5, flag: '🇨🇳', color: '#e11d48' },
  { name: 'Russia', code: 'RUS', gt: 117, share: 6.8, flag: '🇷🇺', color: '#7c3aed' },
  { name: 'United Kingdom', code: 'GBR', gt: 79, share: 4.6, flag: '🇬🇧', color: '#0d9488' },
  { name: 'Japan', code: 'JPN', gt: 68, share: 4.0, flag: '🇯🇵', color: '#f43f5e' },
  { name: 'India', code: 'IND', gt: 58, share: 3.4, flag: '🇮🇳', color: '#d97706' },
  { name: 'Germany', code: 'DEU', gt: 94, share: 5.5, flag: '🇩🇪', color: '#8b5cf6' },
  { name: 'Rest of World', code: 'ROW', gt: 335, share: 19.5, flag: '🌐', color: '#64748b' },
];

// Fossil fuel source breakdown
const FUEL_BREAKDOWN = [
  { name: 'Coal Combustion', share: 41.2, emissionsGt: 15.4, color: '#334155', note: 'Primary source for utility power generation, steel manufacturing, and cement clinker.' },
  { name: 'Oil & Petroleum', share: 31.8, emissionsGt: 11.9, color: '#b45309', note: 'Internal combustion road transport, freight, marine shipping, and petrochemicals.' },
  { name: 'Natural Gas', share: 21.4, emissionsGt: 8.0, color: '#0284c7', note: 'Combined-cycle gas turbines, residential space heating, and fertilizer production.' },
  { name: 'Cement & Calcination', share: 4.1, emissionsGt: 1.5, color: '#65a30d', note: 'Process emissions from limestone decarbonation in cement clinker kilns.' },
  { name: 'Gas Flaring', share: 1.5, emissionsGt: 0.6, color: '#dc2626', note: 'Unused fugitive gas combustion at crude oil extraction and refining wells.' }
];

// Historical aggregate years for multi-entity timeline
const YEARS_TIMELINE = [1990, 1995, 2000, 2005, 2010, 2015, 2018, 2020, 2021, 2022, 2023];

export default function CO2EmissionsDashboard() {
  // Chart 1 States
  const [selectedCountryIds, setSelectedCountryIds] = useState(['china', 'usa', 'india', 'germany']);
  const [activeTabChart1, setActiveTabChart1] = useState('chart'); // 'chart' | 'bar' | 'table'
  const [metricChart1, setMetricChart1] = useState('co2'); // 'co2' (Total Mt) | 'perCapitaCO2' (t/cap)
  const [scaleModeChart1, setScaleModeChart1] = useState('linear'); // 'linear' | 'log'
  const [activeYearScrubber, setActiveYearScrubber] = useState(2023);
  const [isPlayingScrubber, setIsPlayingScrubber] = useState(false);
  const [addCountrySearch, setAddCountrySearch] = useState('');
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);

  // Chart 2 (Per Capita) States
  const [perCapitaSortOrder, setPerCapitaSortOrder] = useState('desc'); // 'desc' | 'asc'

  // Country Directory Table States
  const [tableSearch, setTableSearch] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');
  const [tableSortColumn, setTableSortColumn] = useState('totalEmissionsCO2');
  const [tableSortDirection, setTableSortDirection] = useState('desc');

  // Scrubber animation loop
  useEffect(() => {
    let interval;
    if (isPlayingScrubber) {
      interval = setInterval(() => {
        setActiveYearScrubber((current) => {
          const idx = YEARS_TIMELINE.indexOf(current);
          if (idx === -1 || idx === YEARS_TIMELINE.length - 1) return YEARS_TIMELINE[0];
          return YEARS_TIMELINE[idx + 1];
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlayingScrubber]);

  // Construct Harmonized Multi-Country Time Series Data for Recharts
  const timelineSeriesData = useMemo(() => {
    return YEARS_TIMELINE.filter(y => y <= activeYearScrubber).map(yr => {
      const row = { year: yr };
      COUNTRIES.forEach(c => {
        const point = c.historicalTimeline?.find(p => p.year === yr);
        if (point) {
          row[c.id] = metricChart1 === 'co2' ? point.co2 : point.perCapitaCO2;
        }
      });
      return row;
    });
  }, [metricChart1, activeYearScrubber]);

  // Data for active year bar comparison
  const activeYearBarData = useMemo(() => {
    return selectedCountryIds.map(id => {
      const country = COUNTRIES.find(c => c.id === id);
      if (!country) return null;
      const point = country.historicalTimeline?.find(p => p.year === activeYearScrubber) || country.historicalTimeline?.slice(-1)[0];
      return {
        id: country.id,
        name: country.name,
        flag: country.flag,
        value: metricChart1 === 'co2' ? point?.co2 : point?.perCapitaCO2,
        color: ENTITY_COLORS[country.id] || '#64748b'
      };
    }).filter(Boolean);
  }, [selectedCountryIds, activeYearScrubber, metricChart1]);

  // Per capita comparison list for Chart 2
  const perCapitaData = useMemo(() => {
    return COUNTRIES.map(c => ({
      id: c.id,
      name: c.name,
      flag: c.flag,
      region: c.region,
      perCapita: c.indicators.perCapitaCO2,
      totalCO2: c.indicators.totalEmissionsCO2,
      population: c.population,
      renewableShare: c.indicators.renewableShare,
      color: ENTITY_COLORS[c.id] || '#0d9488'
    })).sort((a, b) => {
      return perCapitaSortOrder === 'desc' ? b.perCapita - a.perCapita : a.perCapita - b.perCapita;
    });
  }, [perCapitaSortOrder]);

  // Filtered and sorted Country Directory Table Data
  const filteredCountryTableData = useMemo(() => {
    return COUNTRIES.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(tableSearch.toLowerCase()) || c.iso3.toLowerCase().includes(tableSearch.toLowerCase());
      const matchRegion = selectedRegionFilter === 'All' || c.region === selectedRegionFilter;
      return matchSearch && matchRegion;
    }).sort((a, b) => {
      let valA, valB;
      if (tableSortColumn === 'name') {
        valA = a.name;
        valB = b.name;
        return tableSortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      valA = a.indicators[tableSortColumn] || 0;
      valB = b.indicators[tableSortColumn] || 0;
      return tableSortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [tableSearch, selectedRegionFilter, tableSortColumn, tableSortDirection]);

  // Helper: toggle country selection in Chart 1
  const toggleCountrySelection = (id) => {
    if (selectedCountryIds.includes(id)) {
      if (selectedCountryIds.length > 1) {
        setSelectedCountryIds(selectedCountryIds.filter(item => item !== id));
      }
    } else {
      setSelectedCountryIds([...selectedCountryIds, id]);
    }
  };

  // Helper: Export active table or chart data to CSV
  const handleExportCSV = (data, filename = 'co2-emissions-data.csv') => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] !== undefined ? row[header] : ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0b1320] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Banner & Header (Our World in Data Style) */}
      <header className="sticky top-0 z-40 bg-[#070e18]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-serif text-teal-300 font-black text-lg">
              CI
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase">
                Global Pollution & Climate Intelligence
              </div>
              <div className="text-[11px] text-slate-400">
                Research and open data benchmarked against EDGAR v8.0 & GCP
              </div>
            </div>
          </div>

          {/* Quick Anchor Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <a href="#annual-emissions" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors">
              Annual CO₂
            </a>
            <a href="#per-capita" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors">
              Per Capita
            </a>
            <a href="#cumulative" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors">
              Cumulative
            </a>
            <a href="#fuel-sector" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors">
              By Fuel & Sector
            </a>
            <a href="#country-ledger" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors">
              Data Ledger
            </a>
            <a href="#methodology" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors">
              Methodology
            </a>
          </nav>

          {/* Action button */}
          <button
            type="button"
            onClick={() => handleExportCSV(COUNTRIES.map(c => ({
              Country: c.name,
              ISO3: c.iso3,
              Region: c.region,
              Population: c.population,
              'Total CO2 (Mt)': c.indicators.totalEmissionsCO2,
              'Per Capita CO2 (t)': c.indicators.perCapitaCO2,
              'Renewable Grid (%)': c.indicators.renewableShare,
              'PM2.5 (ug/m3)': c.indicators.airQualityPM25,
              'Net Zero Goal': c.indicators.netZeroTargetYear
            })), 'global-climate-intelligence-complete.csv')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All Data (CSV)</span>
          </button>
        </div>
      </header>

      {/* Main Editorial Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* Article Headline & Intro (OWID Editorial Style) */}
        <section className="space-y-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-[1.12]">
              CO₂ and Greenhouse Gas Emissions
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-serif leading-relaxed max-w-4xl">
              How much carbon dioxide does the world emit? Which countries emit the most? How do emissions compare when adjusted for population, historical responsibility, and trade?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-sans text-slate-400 border-t border-slate-800/80 pt-3">
            <span>By <strong>Global Pollution & Climate Intelligence Observatory</strong></span>
            <span>•</span>
            <span>Data verified: <strong>Global Carbon Project (2024), EDGAR v8.0, UNFCCC</strong></span>
            <span>•</span>
            <span className="text-teal-400 font-mono">Creative Commons BY License</span>
          </div>

          {/* OWID Key Insights Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Global Annual CO₂</span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">37.4 <span className="text-sm font-sans font-normal text-slate-400">Gt</span></div>
              <span className="text-[11px] text-amber-400 font-medium">Record annual global volume</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Average per Person</span>
              <div className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">4.71 <span className="text-sm font-sans font-normal text-slate-400">t</span></div>
              <span className="text-[11px] text-slate-400 font-medium">Global territorial mean</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Cumulative since 1751</span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">1.72 <span className="text-sm font-sans font-normal text-slate-400">Tt</span></div>
              <span className="text-[11px] text-slate-400 font-medium">Over 1,700 billion tonnes</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Temperature Anomaly</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">+1.28 <span className="text-sm font-sans font-normal text-slate-400">°C</span></div>
              <span className="text-[11px] text-slate-400 font-medium">Relative to 1850-1900</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            Carbon dioxide emissions are the primary driver of global climate change. To avoid catastrophic impacts, the world must urgently achieve net-zero. But how this responsibility is shared between regions and countries is a central point of debate in international policy. Looking at emissions through different lenses—annual volumes, per capita rates, and cumulative historical emissions—reveals vastly different stories.
          </p>
        </section>

        {/* --------------------------------------------------------------------------------- */}
        {/* GRAPH 1: Annual Total CO2 Emissions over Time */}
        {/* --------------------------------------------------------------------------------- */}
        <section id="annual-emissions" className="space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              ANNUAL EMISSIONS TRAJECTORIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              How have global emissions of carbon dioxide (CO₂) changed over time?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Annual production-based emissions of carbon dioxide ($CO_2$) from the burning of fossil fuels and industry. Land use change is not included in this accounting boundary.
            </p>
          </div>

          {/* OWID Grapher Interactive Card Shell */}
          <div className="owid-chart-card p-5 sm:p-6 space-y-5">
            {/* Grapher Control Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              {/* Left View Mode Tabs */}
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTabChart1('chart')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    activeTabChart1 === 'chart' ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Line Chart
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabChart1('bar')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    activeTabChart1 === 'bar' ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bar Comparison
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabChart1('table')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    activeTabChart1 === 'table' ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Data Table
                </button>
              </div>

              {/* Right Configuration Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Metric Selector */}
                <select
                  value={metricChart1}
                  onChange={(e) => setMetricChart1(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
                >
                  <option value="co2">Total Emissions (Mt CO₂)</option>
                  <option value="perCapitaCO2">Per Capita (tonnes/person)</option>
                </select>

                {/* Scale Selector */}
                <select
                  value={scaleModeChart1}
                  onChange={(e) => setScaleModeChart1(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
                >
                  <option value="linear">Linear Scale</option>
                  <option value="log">Logarithmic</option>
                </select>

                {/* Direct CSV Download */}
                <button
                  type="button"
                  onClick={() => handleExportCSV(timelineSeriesData, `annual-co2-${metricChart1}.csv`)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Download CSV for this chart"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Country Entity Chips & Selector */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-slate-400 mr-1">ENTITIES:</span>
                {selectedCountryIds.map(id => {
                  const country = COUNTRIES.find(c => c.id === id);
                  if (!country) return null;
                  const color = ENTITY_COLORS[id] || '#64748b';
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-900/90 text-white"
                      style={{ borderColor: `${color}60` }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span>{country.flag} {country.name}</span>
                      {selectedCountryIds.length > 1 && (
                        <button
                          type="button"
                          onClick={() => toggleCountrySelection(id)}
                          className="hover:text-rose-400 text-slate-400 ml-0.5 cursor-pointer"
                          aria-label={`Remove ${country.name}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  );
                })}

                {/* Add Country Dropdown Button */}
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border border-dashed border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-teal-300 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Country...</span>
                  </button>

                  {isAddDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 space-y-1">
                      <input
                        type="text"
                        value={addCountrySearch}
                        onChange={(e) => setAddCountrySearch(e.target.value)}
                        placeholder="Search country..."
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-0.5 pt-1">
                        {COUNTRIES.filter(c => c.name.toLowerCase().includes(addCountrySearch.toLowerCase())).map(c => {
                          const isSelected = selectedCountryIds.includes(c.id);
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                toggleCountrySelection(c.id);
                                setIsAddDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                                isSelected ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              <span>{c.flag} {c.name}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Chart Presentation */}
            <div className="h-80 sm:h-96 w-full pt-2">
              {activeTabChart1 === 'chart' && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineSeriesData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis
                      scale={scaleModeChart1 === 'log' ? 'log' : 'auto'}
                      domain={scaleModeChart1 === 'log' ? [1, 'auto'] : [0, 'auto']}
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
                    />
                    <Tooltip
                      formatter={(val, name) => {
                        const country = COUNTRIES.find(c => c.id === name);
                        const label = country ? `${country.flag} ${country.name}` : name;
                        const unit = metricChart1 === 'co2' ? ' Mt CO₂' : ' t/person';
                        return [`${Number(val).toLocaleString()}${unit}`, label];
                      }}
                      labelFormatter={(lbl) => `Year: ${lbl}`}
                    />
                    {selectedCountryIds.map(id => (
                      <Line
                        key={id}
                        type="monotone"
                        dataKey={id}
                        name={id}
                        stroke={ENTITY_COLORS[id] || '#64748b'}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}

              {activeTabChart1 === 'bar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeYearBarData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      width={110}
                      tickFormatter={(val, idx) => {
                        const item = activeYearBarData[idx];
                        return item ? `${item.flag} ${item.name}` : val;
                      }}
                    />
                    <Tooltip
                      formatter={(val) => [`${Number(val).toLocaleString()} ${metricChart1 === 'co2' ? 'Mt CO₂' : 't/person'}`, 'Emissions']}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {activeYearBarData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {activeTabChart1 === 'table' && (
                <div className="h-full overflow-auto border border-slate-800 rounded-lg">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-300 sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Year</th>
                        {selectedCountryIds.map(id => {
                          const c = COUNTRIES.find(x => x.id === id);
                          return (
                            <th key={id} className="p-2.5">
                              {c?.flag} {c?.name} ({metricChart1 === 'co2' ? 'Mt' : 't/cap'})
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {timelineSeriesData.map(row => (
                        <tr key={row.year} className="hover:bg-slate-900/40">
                          <td className="p-2.5 font-bold text-white">{row.year}</td>
                          {selectedCountryIds.map(id => (
                            <td key={id} className="p-2.5 text-slate-300">
                              {row[id] !== undefined ? row[id].toLocaleString() : '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Timeline Range Scrubber Slider (OWID Signature Time Slider) */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlayingScrubber(!isPlayingScrubber)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 font-bold cursor-pointer transition-colors"
                >
                  {isPlayingScrubber ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingScrubber ? 'Pause' : 'Play Timeline'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveYearScrubber(2023)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Reset to 2023"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Slider element */}
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <span className="text-slate-500 text-[11px]">1990</span>
                <input
                  type="range"
                  min={1990}
                  max={2023}
                  step={1}
                  value={activeYearScrubber}
                  onChange={(e) => {
                    setIsPlayingScrubber(false);
                    setActiveYearScrubber(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <span className="text-teal-300 font-bold font-mono text-sm">{activeYearScrubber}</span>
              </div>
            </div>

            {/* Scientific Attribution Footnote */}
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5 flex flex-wrap items-center justify-between gap-2">
              <span>
                <strong>Data source:</strong> Global Carbon Project (2024); European Commission EDGAR v8.0 • Territorial fossil fuel $CO_2$.
              </span>
              <span className="text-slate-500">Learn more about this data</span>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------------------------- */}
        {/* GRAPH 2: Per Capita CO2 Emissions Across Countries */}
        {/* --------------------------------------------------------------------------------- */}
        <section id="per-capita" className="space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              PER CAPITA COMPARISONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Where in the world does the average person emit the most CO₂?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We calculate the contribution of the average citizen of each country by dividing its total emissions by its population. This gives us $CO_2$ emissions per capita.
            </p>
          </div>

          <div className="owid-chart-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">TERRITORIAL EMISSIONS PER PERSON (TONNES, 2023)</span>
              <button
                type="button"
                onClick={() => setPerCapitaSortOrder(perCapitaSortOrder === 'desc' ? 'asc' : 'desc')}
                className="text-teal-400 hover:text-teal-300 cursor-pointer font-bold"
              >
                Sort: {perCapitaSortOrder === 'desc' ? 'Highest First ↓' : 'Lowest First ↑'}
              </button>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={perCapitaData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} unit=" t" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    width={110}
                    tickFormatter={(val, idx) => {
                      const item = perCapitaData[idx];
                      return item ? `${item.flag} ${item.name}` : val;
                    }}
                  />
                  <Tooltip
                    formatter={(val) => [`${Number(val).toFixed(2)} tonnes per person`, 'Per Capita CO₂']}
                  />
                  <Bar dataKey="perCapita" radius={[0, 4, 4, 0]}>
                    {perCapitaData.map((entry, index) => (
                      <Cell key={`percap-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Context callout text */}
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <strong>Key takeaway:</strong> There are enormous disparities in per-capita emissions across the world. An average citizen in the United States produces ~<strong>14.4 tonnes</strong> per year—more than 7 times that of an average person in India (~<strong>1.98 tonnes</strong>), and over 150 times higher than citizens in the lowest-emitting nations.
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex justify-between">
              <span><strong>Data source:</strong> Global Carbon Project; UN Population Division</span>
              <button
                type="button"
                onClick={() => handleExportCSV(perCapitaData, 'per-capita-emissions.csv')}
                className="text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download Data (CSV)
              </button>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------------------------- */}
        {/* GRAPH 3: Cumulative Historical CO2 Emissions */}
        {/* --------------------------------------------------------------------------------- */}
        <section id="cumulative" className="space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              HISTORICAL ATTRIBUTION
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Who has contributed most to global CO₂ emissions historically?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Since 1751, the world has emitted over 1.7 trillion tonnes of fossil $CO_2$. Because carbon dioxide remains in the atmosphere for centuries, historical cumulative contributions are fundamental to climate justice discussions.
            </p>
          </div>

          <div className="owid-chart-card p-5 sm:p-6 space-y-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
              CUMULATIVE FOSSIL CO₂ EMISSIONS BY REGION (1751 – 2023)
            </div>

            {/* Visual Stacked Proportional Bar */}
            <div className="space-y-2">
              <div className="w-full h-8 rounded-lg overflow-hidden flex bg-slate-900 border border-slate-800">
                {CUMULATIVE_EMISSIONS.map(item => (
                  <div
                    key={item.code}
                    style={{ width: `${item.share}%`, backgroundColor: item.color }}
                    className="h-full relative group transition-all hover:opacity-90 cursor-pointer"
                    title={`${item.name}: ${item.share}% (${item.gt} Gt)`}
                  />
                ))}
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2">
                {CUMULATIVE_EMISSIONS.map(item => (
                  <div key={item.code} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 truncate">{item.flag} {item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-white shrink-0 ml-1">{item.share}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong>Historical Context:</strong> The United States and European nations industrialized first, meaning they account for <strong>over 40%</strong> of all greenhouse gases ever emitted by human activity. In contrast, modern high-emission countries like India account for just <strong>3.4%</strong> of historical emissions, and all of Africa combined has produced less than <strong>3%</strong>.
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex justify-between">
              <span><strong>Data source:</strong> CDIAC / Global Carbon Project (1751–2023)</span>
              <button
                type="button"
                onClick={() => handleExportCSV(CUMULATIVE_EMISSIONS, 'cumulative-historical-co2.csv')}
                className="text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download Data (CSV)
              </button>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------------------------- */}
        {/* GRAPH 4: Breakdown by Sector & Fuel Source */}
        {/* --------------------------------------------------------------------------------- */}
        <section id="fuel-sector" className="space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              ENERGY & INDUSTRIAL SOURCES
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Where do global CO₂ emissions come from? By Fuel & Sector
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Combustion of fossil fuels accounts for over 90% of global $CO_2$ emissions. Coal remains the largest individual emitter worldwide, followed by liquid crude oil and natural gas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Fuel type cards */}
            <div className="owid-chart-card p-5 space-y-4">
              <h3 className="font-serif font-bold text-base text-white border-b border-slate-800 pb-2">
                Emissions by Primary Combustion Fuel
              </h3>
              <div className="space-y-3">
                {FUEL_BREAKDOWN.map(f => (
                  <div key={f.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200">{f.name}</span>
                      <span className="font-mono font-bold text-teal-300">{f.share}% <span className="text-slate-400">({f.emissionsGt} Gt)</span></span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full rounded-full" style={{ width: `${f.share}%`, backgroundColor: f.color }} />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">{f.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Economic Sectors Breakdown */}
            <div className="owid-chart-card p-5 space-y-4">
              <h3 className="font-serif font-bold text-base text-white border-b border-slate-800 pb-2">
                Emissions by Economic Activity Sector (IPCC)
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>⚡ Electricity & Heat Generation</span>
                    <span className="text-amber-400 font-mono">~40%</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Coal and natural gas thermal power plants supplying national grids and district heat.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>🏭 Heavy Industry & Manufacturing</span>
                    <span className="text-emerald-400 font-mono">~24%</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Primary steel blast furnaces, cement calcination, aluminum smelting, and chemicals.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>🚚 Transport (Road, Aviation, Maritime)</span>
                    <span className="text-cyan-400 font-mono">~15%</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Internal combustion passenger cars, diesel freight trucks, domestic rail, and flights.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>🌾 Agriculture & Cattle Livestock</span>
                    <span className="text-orange-400 font-mono">~12%</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Ruminant enteric methane, paddy rice flooded cultivation, and synthetic N₂O fertilizer.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>🏠 Buildings & Space Heating</span>
                    <span className="text-purple-400 font-mono">~6%</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Direct combustion of fossil methane for residential cooking and domestic water heating.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------------------------- */}
        {/* COUNTRY DIRECTORY & FILTERABLE TABLE */}
        {/* --------------------------------------------------------------------------------- */}
        <section id="country-ledger" className="space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              SOVEREIGN CLIMATE LEDGER
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              National Environmental Profiles Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore national inventories across sovereign borders with standardized territorial boundaries, per-capita indicators, renewable shares, and official net-zero pledge targets.
            </p>
          </div>

          <div className="owid-chart-card p-5 space-y-4">
            {/* Filter controls bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Search countries by name or ISO code..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={selectedRegionFilter}
                  onChange={(e) => setSelectedRegionFilter(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Continents</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Americas">Americas</option>
                  <option value="Africa">Africa</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleExportCSV(filteredCountryTableData.map(c => ({
                    Country: c.name,
                    ISO3: c.iso3,
                    Region: c.region,
                    'Total CO2 (Mt)': c.indicators.totalEmissionsCO2,
                    'Per Capita (t)': c.indicators.perCapitaCO2,
                    'Renewable Share (%)': c.indicators.renewableShare,
                    'PM2.5 (ug/m3)': c.indicators.airQualityPM25,
                    'Net Zero Goal': c.indicators.netZeroTargetYear
                  })), 'filtered-country-ledger.csv')}
                  className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-teal-300 font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Filtered (CSV)</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 font-bold cursor-pointer hover:text-white" onClick={() => {
                      setTableSortColumn('name');
                      setTableSortDirection(tableSortDirection === 'asc' ? 'desc' : 'asc');
                    }}>
                      Country {tableSortColumn === 'name' && (tableSortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 font-bold cursor-pointer hover:text-white" onClick={() => {
                      setTableSortColumn('totalEmissionsCO2');
                      setTableSortDirection(tableSortDirection === 'asc' ? 'desc' : 'asc');
                    }}>
                      Total CO₂ (Mt) {tableSortColumn === 'totalEmissionsCO2' && (tableSortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 font-bold cursor-pointer hover:text-white" onClick={() => {
                      setTableSortColumn('perCapitaCO2');
                      setTableSortDirection(tableSortDirection === 'asc' ? 'desc' : 'asc');
                    }}>
                      Per Capita (t) {tableSortColumn === 'perCapitaCO2' && (tableSortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 font-bold cursor-pointer hover:text-white" onClick={() => {
                      setTableSortColumn('renewableShare');
                      setTableSortDirection(tableSortDirection === 'asc' ? 'desc' : 'asc');
                    }}>
                      Renewables (%) {tableSortColumn === 'renewableShare' && (tableSortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 font-bold cursor-pointer hover:text-white" onClick={() => {
                      setTableSortColumn('airQualityPM25');
                      setTableSortDirection(tableSortDirection === 'asc' ? 'desc' : 'asc');
                    }}>
                      PM2.5 Exposure {tableSortColumn === 'airQualityPM25' && (tableSortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 font-bold">Net Zero Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredCountryTableData.map(c => (
                    <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <span className="text-base">{c.flag}</span>
                        <span>{c.name}</span>
                        <span className="text-[10px] text-slate-500 font-normal">({c.iso3})</span>
                      </td>
                      <td className="p-3 font-mono-numeric text-white">
                        {c.indicators.totalEmissionsCO2.toLocaleString()}
                      </td>
                      <td className="p-3 font-mono-numeric text-teal-300">
                        {c.indicators.perCapitaCO2.toFixed(2)}
                      </td>
                      <td className="p-3 font-mono-numeric text-emerald-300">
                        {c.indicators.renewableShare}%
                      </td>
                      <td className="p-3 font-mono-numeric text-cyan-300">
                        {c.indicators.airQualityPM25} µg/m³
                      </td>
                      <td className="p-3 font-mono-numeric text-amber-300 font-bold">
                        {c.indicators.netZeroTargetYear || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------------------------- */}
        {/* METHODOLOGY SECTION (OWID Style) */}
        {/* --------------------------------------------------------------------------------- */}
        <section id="methodology" className="space-y-6 pt-4 border-t border-slate-800">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              MEASUREMENT & ACCOUNTING PRINCIPLES
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              How do scientists estimate national and global CO₂ emissions?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Emissions of carbon dioxide cannot be measured directly by placing sensors on every exhaust pipe and smokestack on Earth. Instead, scientific estimation combines energy extraction data with chemical combustion stoichiometry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-teal-300 font-mono uppercase block">Step 1: Fossil Extraction & Trade</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                National statistical offices record the physical quantities of coal, oil, and natural gas extracted domestically. To find actual domestic consumption, trade is adjusted: <em>Consumption = Extraction + Imports − Exports − Stock Accumulation</em>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-teal-300 font-mono uppercase block">Step 2: Carbon Content & Oxidation</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Each fossil fuel type has an established carbon mass fraction (e.g. bituminous coal is ~70% carbon). Multiplying fuel combusted by its oxidation factor and stoichiometric ratio ($44/12$, the ratio of $CO_2$ to $C$ mass) yields physical $CO_2$ mass.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-teal-300 font-mono uppercase block">Step 3: Territorial vs. Consumption</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Territorial emissions</strong> record emissions inside national borders (UNFCCC basis). <strong>Consumption emissions</strong> subtract embodied emissions in exported manufactured goods and add imported embodied carbon.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 pt-6 pb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="text-slate-400 font-medium">Global Pollution & Climate Intelligence (GPCI)</span> • Open Science Observatory
          </div>
          <div className="flex items-center gap-4">
            <a href="https://globalcarbonbudget.org" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">
              Global Carbon Project
            </a>
            <a href="https://edgar.jrc.ec.europa.eu" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">
              EDGAR Database
            </a>
            <a href="https://unfccc.int" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">
              UNFCCC
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
