import React, { useState, useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
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
  Share2,
  Calendar,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Factory,
  Truck,
  Leaf,
  BarChart3,
  Target,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { COUNTRIES } from "../data/countriesData";
import { GLOBAL_INDICATORS } from "../data/globalOverviewData";

// Authentic Our World in Data signature color series
const OWID_ENTITY_COLORS = {
  world: "#185a9d", // OWID Classic Blue
  china: "#c0392b", // Crimson Red
  usa: "#2563eb", // Royal Blue
  india: "#d97706", // Saffron / Amber
  germany: "#0d9488", // Deep Teal
  "united-kingdom": "#7c3aed", // Royal Violet
  japan: "#e11d48", // Rose Red
  brazil: "#059669", // Emerald Green
};

// Mini sparkline data for Layer 1 Useful Data Preview
const GLOBAL_SPARKLINE_DATA = [
  { year: "1990", gt: 22.7 },
  { year: "1995", gt: 23.5 },
  { year: "2000", gt: 25.4 },
  { year: "2005", gt: 30.1 },
  { year: "2010", gt: 33.3 },
  { year: "2015", gt: 35.5 },
  { year: "2018", gt: 36.8 },
  { year: "2020", gt: 34.8 },
  { year: "2022", gt: 37.0 },
  { year: "2023", gt: 37.4 },
];

// Scope 1, 2, and 3 accounting breakdown
const SCOPE_FRAMEWORK = [
  {
    scope: "Scope 1",
    name: "Direct Combustion & Industrial Processes",
    emissionsGt: 15.4,
    share: 41.2,
    color: "#0c2340",
    icon: Factory,
    description:
      "Fuel burned on-site in utility power stations, heavy industrial furnaces, and cement clinker calcination kilns.",
    levers: [
      "Coal plant phase-out",
      "Kiln electrification",
      "Carbon capture (CCUS)",
    ],
  },
  {
    scope: "Scope 2",
    name: "Purchased Electricity & Grid Energy",
    emissionsGt: 11.9,
    share: 31.8,
    color: "#185a9d",
    icon: Zap,
    description:
      "Emissions from electricity, steam, heating, and cooling consumed from national and regional transmission grids.",
    levers: ["Renewable energy PPAs", "Battery storage", "Grid efficiency"],
  },
  {
    scope: "Scope 3",
    name: "Value Chain & Embodied Trade Carbon",
    emissionsGt: 10.1,
    share: 27.0,
    color: "#0d9488",
    icon: Truck,
    description:
      "Embodied emissions from international freight, maritime shipping, aviation, and cross-border trade imports.",
    levers: [
      "Low-carbon supply chains",
      "Green shipping lanes",
      "Deforestation mandates",
    ],
  },
];

// Historical aggregate years for multi-entity timeline
const YEARS_TIMELINE = [
  1990, 1995, 2000, 2005, 2010, 2015, 2018, 2020, 2021, 2022, 2023,
];

export default function CO2EmissionsDashboard() {
  // Layer Navigation helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Chart States (OWID Grapher)
  const [selectedCountryIds, setSelectedCountryIds] = useState([
    "china",
    "usa",
    "india",
    "germany",
  ]);
  const [activeTabChart, setActiveTabChart] = useState("chart"); // 'chart' | 'bar' | 'table'
  const [metricChart, setMetricChart] = useState("co2"); // 'co2' (Total Mt) | 'perCapitaCO2' (t/cap)
  const [scaleModeChart, setScaleModeChart] = useState("linear"); // 'linear' | 'log'
  const [activeYearScrubber, setActiveYearScrubber] = useState(2023);
  const [isPlayingScrubber, setIsPlayingScrubber] = useState(false);
  const [isAddCountryOpen, setIsAddCountryOpen] = useState(false);

  // Sovereign Directory Table States
  const [tableSearch, setTableSearch] = useState("");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState("All");
  const [tableSortColumn, setTableSortColumn] = useState("totalEmissionsCO2");
  const [tableSortDirection, setTableSortDirection] = useState("desc");

  // Timeline scrubber loop
  useEffect(() => {
    let interval;
    if (isPlayingScrubber) {
      interval = setInterval(() => {
        setActiveYearScrubber((current) => {
          const idx = YEARS_TIMELINE.indexOf(current);
          if (idx === -1 || idx === YEARS_TIMELINE.length - 1)
            return YEARS_TIMELINE[0];
          return YEARS_TIMELINE[idx + 1];
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlayingScrubber]);

  // Construct Multi-Country Time Series Data for Recharts
  const timelineSeriesData = useMemo(() => {
    return YEARS_TIMELINE.filter((y) => y <= activeYearScrubber).map((yr) => {
      const row = { year: yr };
      COUNTRIES.forEach((c) => {
        const point = c.historicalTimeline?.find((p) => p.year === yr);
        if (point) {
          row[c.id] = metricChart === "co2" ? point.co2 : point.perCapitaCO2;
        }
      });
      return row;
    });
  }, [metricChart, activeYearScrubber]);

  // Data for active year bar comparison
  const activeYearBarData = useMemo(() => {
    return selectedCountryIds
      .map((id) => {
        const country = COUNTRIES.find((c) => c.id === id);
        if (!country) return null;
        const point =
          country.historicalTimeline?.find(
            (p) => p.year === activeYearScrubber,
          ) || country.historicalTimeline?.slice(-1)[0];
        return {
          id: country.id,
          name: country.name,
          flag: country.flag,
          value: metricChart === "co2" ? point?.co2 : point?.perCapitaCO2,
          color: OWID_ENTITY_COLORS[country.id] || "#64748b",
        };
      })
      .filter(Boolean);
  }, [selectedCountryIds, activeYearScrubber, metricChart]);

  // Table filtering and sorting
  const filteredAndSortedCountries = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
        c.iso3.toLowerCase().includes(tableSearch.toLowerCase());
      const matchesRegion =
        selectedRegionFilter === "All" || c.region === selectedRegionFilter;
      return matchesSearch && matchesRegion;
    }).sort((a, b) => {
      const aVal = a.indicators[tableSortColumn] ?? 0;
      const bVal = b.indicators[tableSortColumn] ?? 0;
      return tableSortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [tableSearch, selectedRegionFilter, tableSortColumn, tableSortDirection]);

  // Toggle country in Chart selection
  const handleToggleCountry = (id) => {
    if (selectedCountryIds.includes(id)) {
      if (selectedCountryIds.length > 1) {
        setSelectedCountryIds(selectedCountryIds.filter((cId) => cId !== id));
      }
    } else {
      setSelectedCountryIds([...selectedCountryIds, id]);
    }
  };

  // CSV Export utility
  const handleExportCSV = (
    data,
    filename = "ourworldindata-co2-emissions.csv",
  ) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((h) => {
            const val = row[h];
            return typeof val === "string" && val.includes(",")
              ? `"${val}"`
              : val;
          })
          .join(","),
      ),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-[#D9EFAB] selection:text-[#0c2340]">
      {/* OWID SIGNATURE TOP HEADER (Oxford Navy #002147) */}
      <header className="sticky top-0 z-50 bg-[#002147] text-white border-b border-[#0c2340] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* OWID Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white">
                GreenScope
              </span>
              {/* Soft Lime Micro-Accent Badge */}
              <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#D9EFAB] text-[#22380a] hidden sm:inline-block">
                RESEARCH LEDGER
              </span>
            </a>
          </div>

          {/* Layer Quick Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-200">
            <button
              type="button"
              onClick={() => scrollToSection("layer-1-landing")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Layer 1: Overview
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("layer-2-grapher")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Layer 2: The Grapher
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("layer-3-ledger")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Layer 3: Data Ledger
            </button>
          </nav>

          {/* Action Button with Soft Lime Micro-Highlight */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                handleExportCSV(
                  COUNTRIES.map((c) => ({
                    Country: c.name,
                    ISO3: c.iso3,
                    Region: c.region,
                    TotalCO2_Mt: c.indicators.totalEmissionsCO2,
                    PerCapita_t: c.indicators.perCapitaCO2,
                    RenewableGrid_Pct: c.indicators.renewableShare,
                    PM25: c.indicators.airQualityPM25,
                    NetZeroGoal: c.indicators.netZeroTargetYear,
                  })),
                  "ourworldindata-full-dataset.csv",
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D9EFAB]" />
              <span className="hidden sm:inline">Download All Data</span>
              <span className="sm:hidden">CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: 3-LAYER RESEARCH DASHBOARD */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-20">
        {/* =========================================================================
            LAYER 1 — THE LANDING EXPERIENCE
            Goal: Make the value of the platform clear.
            - A simple headline and explanation
            - One prominent action
            - A small preview of useful data
            - Clear links to the main features
           ========================================================================= */}
        <section
          id="layer-1-landing"
          className="space-y-8 pb-10 border-b border-[#e2e8f0]"
        >
          {/* Layer Architectural Header */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#D9EFAB] text-[#22380a] border border-[#c4e48a]">
              LAYER 1 • THE LANDING EXPERIENCE
            </span>
            <span className="text-xs text-[#64748b] font-mono">
              Research Synthesis & Vital Signs
            </span>
          </div>

          {/* Simple Headline and Explanation (Editorial Serif Typography) */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-black tracking-tight text-[#0c2340] leading-[1.12]">
              CO₂ and Greenhouse Gas Emissions
            </h1>
            <p className="text-lg sm:text-xl text-[#334155] leading-relaxed max-w-3xl font-serif">
              How much carbon dioxide does the world emit? Which countries emit
              the most? An open, verifiable research platform tracking sovereign
              emissions, per-capita responsibility, and net-zero trajectories
              benchmarked against the Global Carbon Project and EDGAR v8.0.
            </p>
          </div>

          {/* ONE PROMINENT ACTION */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("layer-2-grapher")}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#0c2340] hover:bg-[#002147] text-white font-medium text-sm transition-all shadow-sm cursor-pointer group"
            >
              <span>Explore Interactive Grapher</span>
              <ArrowRight className="w-4 h-4 text-[#D9EFAB] group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs text-[#64748b]">
              Updated with 2023 audited inventories • 195 sovereign nations
            </span>
          </div>

          {/* A SMALL PREVIEW OF USEFUL DATA (OWID Vital Signs Card with Mini Sparkline) */}
          <div className="owid-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#185a9d]" />
                <span className="text-xs font-mono font-bold tracking-wider text-[#0c2340] uppercase">
                  Data Preview — Global Atmospheric Vital Signs
                </span>
                {/* Soft Lime Accent Badge */}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D9EFAB] text-[#22380a] font-bold">
                  ● 2023 VERIFIED
                </span>
              </div>
              <div className="text-xs text-[#64748b] font-mono">
                Source: Global Carbon Project (GCP)
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
                <div className="text-[11px] font-mono text-[#64748b] uppercase">
                  Annual Fossil CO₂
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-[#0c2340] font-mono-numeric">
                  37.4{" "}
                  <span className="text-xs font-sans font-normal text-[#64748b]">
                    Gt
                  </span>
                </div>
                {/* Soft Lime Accent */}
                <span className="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#D9EFAB] text-[#22380a] font-bold">
                  +1.1% YoY
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
                <div className="text-[11px] font-mono text-[#64748b] uppercase">
                  Per Capita Mean
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-[#0c2340] font-mono-numeric">
                  4.71{" "}
                  <span className="text-xs font-sans font-normal text-[#64748b]">
                    t
                  </span>
                </div>
                {/* Soft Lime Accent */}
                <span className="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#D9EFAB] text-[#22380a] font-bold">
                  9.4x Spread
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
                <div className="text-[11px] font-mono text-[#64748b] uppercase">
                  Cumulative 1751–2023
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-[#0c2340] font-mono-numeric">
                  1,720{" "}
                  <span className="text-xs font-sans font-normal text-[#64748b]">
                    Gt
                  </span>
                </div>
                {/* Soft Lime Accent */}
                <span className="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#D9EFAB] text-[#22380a] font-bold">
                  Historical
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
                <div className="text-[11px] font-mono text-[#64748b] uppercase">
                  Warming Anomaly
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-[#0c2340] font-mono-numeric">
                  +1.28{" "}
                  <span className="text-xs font-sans font-normal text-[#64748b]">
                    °C
                  </span>
                </div>
                {/* Soft Lime Accent */}
                <span className="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#D9EFAB] text-[#22380a] font-bold">
                  1.5°C Limit
                </span>
              </div>
            </div>

            {/* Embedded Mini Sparkline Chart */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-[#64748b] mb-1.5 font-mono">
                <span>Global Annual Emissions Trajectory (1990 – 2023)</span>
                <span className="font-bold text-[#0c2340]">
                  37.4 Gt CO₂ / yr
                </span>
              </div>
              <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={GLOBAL_SPARKLINE_DATA}
                    margin={{ top: 2, right: 5, left: 5, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="owidBlueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#185a9d"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="#185a9d"
                          stopOpacity={0.0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="gt"
                      stroke="#185a9d"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#owidBlueGradient)"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontFamily: "JetBrains Mono",
                        color: "#0c2340",
                      }}
                      formatter={(val) => [`${val} Gt CO₂`, "Global Annual"]}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CLEAR LINKS TO THE MAIN FEATURES */}
            <div className="pt-4 border-t border-[#e2e8f0]">
              <div className="text-xs font-mono font-bold text-[#64748b] mb-2 uppercase tracking-wider">
                Explore Core Research Sections:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection("layer-2-grapher")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#f1f5f9] border border-[#cbd5e1] text-xs font-mono text-[#0c2340] hover:text-[#185a9d] transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#185a9d]" />
                  <span>Annual Emissions Trajectories</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("layer-2-scopes")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#f1f5f9] border border-[#cbd5e1] text-xs font-mono text-[#0c2340] hover:text-[#185a9d] transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#185a9d]" />
                  <span>Scope 1, 2 & 3 Allocation</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("layer-3-ledger")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#f1f5f9] border border-[#cbd5e1] text-xs font-mono text-[#0c2340] hover:text-[#185a9d] transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#185a9d]" />
                  <span>Sovereign Data Ledger</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("layer-3-methodology")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#f1f5f9] border border-[#cbd5e1] text-xs font-mono text-[#0c2340] hover:text-[#185a9d] transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#185a9d]" />
                  <span>Stoichiometric Methodology</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            LAYER 2 — THE INTERACTIVE INTELLIGENCE LAYER ("The Grapher")
            Goal: Enable comparative discovery, entity selection, and timeline playback.
           ========================================================================= */}
        <section id="layer-2-grapher" className="space-y-10 pt-4">
          {/* Layer Architectural Header */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#D9EFAB] text-[#22380a] border border-[#c4e48a]">
              LAYER 2 • THE INTERACTIVE GRAPHER
            </span>
            <span className="text-xs text-[#64748b] font-mono">
              Comparative Analysis & Scopes Breakdown
            </span>
          </div>

          {/* OWID QUESTION-DRIVEN HEADING */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c2340] tracking-tight">
              How have global emissions of carbon dioxide (CO₂) changed over
              time?
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Annual emissions of carbon dioxide from fossil fuels and industry.
              Land-use change is excluded. Emissions are measured in million
              tonnes (Mt) of CO₂.
            </p>
          </div>

          {/* THE GRAPHER CARD FRAME */}
          <div className="owid-card p-6 sm:p-8 space-y-6">
            {/* Top Toolbar: Tabs, Metrics, Scale & Export */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
              {/* Tab Selector: Chart | Bar | Table */}
              <div className="inline-flex rounded-md border border-[#cbd5e1] bg-[#f8fafc] p-0.5">
                <button
                  type="button"
                  onClick={() => setActiveTabChart("chart")}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeTabChart === "chart"
                      ? "bg-[#0c2340] text-white"
                      : "text-[#475569] hover:text-[#0c2340]"
                  }`}
                >
                  Chart
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabChart("bar")}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeTabChart === "bar"
                      ? "bg-[#0c2340] text-white"
                      : "text-[#475569] hover:text-[#0c2340]"
                  }`}
                >
                  Ranking
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabChart("table")}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeTabChart === "table"
                      ? "bg-[#0c2340] text-white"
                      : "text-[#475569] hover:text-[#0c2340]"
                  }`}
                >
                  Table
                </button>
              </div>

              {/* Metric & Scale Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-md border border-[#cbd5e1] bg-[#f8fafc] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setMetricChart("co2")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      metricChart === "co2"
                        ? "bg-[#0c2340] text-white font-bold"
                        : "text-[#475569]"
                    }`}
                  >
                    Total Mt CO₂
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetricChart("perCapitaCO2")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      metricChart === "perCapitaCO2"
                        ? "bg-[#0c2340] text-white font-bold"
                        : "text-[#475569]"
                    }`}
                  >
                    Per Capita (t)
                  </button>
                </div>

                <div className="inline-flex rounded-md border border-[#cbd5e1] bg-[#f8fafc] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setScaleModeChart("linear")}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      scaleModeChart === "linear"
                        ? "bg-[#0c2340] text-white font-bold"
                        : "text-[#475569]"
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    type="button"
                    onClick={() => setScaleModeChart("log")}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      scaleModeChart === "log"
                        ? "bg-[#0c2340] text-white font-bold"
                        : "text-[#475569]"
                    }`}
                  >
                    Log
                  </button>
                </div>

                {/* CSV Download button with Soft Lime highlight */}
                <button
                  type="button"
                  onClick={() =>
                    handleExportCSV(
                      timelineSeriesData,
                      `owid-co2-emissions-${metricChart}.csv`,
                    )
                  }
                  className="inline-flex items-center gap-1 px-3 py-1 rounded border border-[#cbd5e1] hover:border-[#0c2340] text-xs font-mono text-[#0c2340] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#0c2340]" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Country Selector Chips (OWID Signature "+ Add Country" style) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#64748b] mr-1">
                Entities:
              </span>
              {COUNTRIES.map((c) => {
                const isSelected = selectedCountryIds.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleToggleCountry(c.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-sans transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0c2340] text-white shadow-sm"
                        : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: isSelected
                          ? OWID_ENTITY_COLORS[c.id] || "#0d9488"
                          : "#94a3b8",
                      }}
                    />
                    <span>{c.flag}</span>
                    <span className="font-medium">{c.name}</span>
                    {isSelected && selectedCountryIds.length > 1 && (
                      <X className="w-3 h-3 opacity-60 hover:opacity-100 ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CHART VIEWPORT */}
            <div className="h-80 sm:h-96 w-full pt-2">
              {activeTabChart === "chart" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timelineSeriesData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="year"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      fontFamily="JetBrains Mono"
                    />
                    <YAxis
                      scale={scaleModeChart === "log" ? "log" : "auto"}
                      domain={
                        scaleModeChart === "log"
                          ? ["auto", "auto"]
                          : [0, "auto"]
                      }
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      fontFamily="JetBrains Mono"
                      tickFormatter={(v) =>
                        metricChart === "co2"
                          ? `${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`
                          : `${v}t`
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        color: "#0c2340",
                        fontFamily: "JetBrains Mono",
                        fontSize: "12px",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                      }}
                      formatter={(val, name) => {
                        const country = COUNTRIES.find((c) => c.id === name);
                        const label = country
                          ? `${country.flag} ${country.name}`
                          : name;
                        const formatted =
                          metricChart === "co2"
                            ? `${val.toLocaleString()} Mt CO₂`
                            : `${val} t/capita`;
                        return [formatted, label];
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                      formatter={(val) => {
                        const country = COUNTRIES.find((c) => c.id === val);
                        return (
                          <span className="text-[#334155] font-sans text-xs">
                            {country ? `${country.flag} ${country.name}` : val}
                          </span>
                        );
                      }}
                    />
                    {selectedCountryIds.map((id) => (
                      <Line
                        key={id}
                        type="monotone"
                        dataKey={id}
                        stroke={OWID_ENTITY_COLORS[id] || "#185a9d"}
                        strokeWidth={id === "india" || id === "china" ? 2.5 : 2}
                        dot={false}
                        activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}

              {activeTabChart === "bar" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activeYearBarData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 70, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      fontFamily="JetBrains Mono"
                      tickFormatter={(v) =>
                        metricChart === "co2" ? `${v} Mt` : `${v} t`
                      }
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      fontFamily="Lato"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        color: "#0c2340",
                        fontFamily: "JetBrains Mono",
                        fontSize: "12px",
                      }}
                      formatter={(val) => [
                        metricChart === "co2"
                          ? `${val?.toLocaleString()} Mt CO₂`
                          : `${val} t CO₂/person`,
                        "Emissions",
                      ]}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {activeYearBarData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {activeTabChart === "table" && (
                <div className="h-full overflow-auto rounded border border-[#e2e8f0] bg-white">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#f8fafc] text-[#475569] sticky top-0 border-b border-[#e2e8f0]">
                      <tr>
                        <th className="p-3 font-bold">Year</th>
                        {selectedCountryIds.map((id) => {
                          const c = COUNTRIES.find((x) => x.id === id);
                          return (
                            <th key={id} className="p-3 font-bold">
                              {c ? `${c.flag} ${c.name}` : id}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0]">
                      {timelineSeriesData
                        .slice()
                        .reverse()
                        .map((row) => (
                          <tr key={row.year} className="hover:bg-[#f8fafc]">
                            <td className="p-3 font-bold text-[#0c2340]">
                              {row.year}
                            </td>
                            {selectedCountryIds.map((id) => (
                              <td key={id} className="p-3 text-[#334155]">
                                {row[id]
                                  ? `${row[id].toLocaleString()} ${metricChart === "co2" ? "Mt" : "t"}`
                                  : "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* OWID TIMELINE SCRUBBER LOOP (1990 - 2023) */}
            <div className="pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingScrubber(!isPlayingScrubber)}
                  className="w-8 h-8 rounded-full bg-[#0c2340] hover:bg-[#185a9d] text-white flex items-center justify-center transition-colors cursor-pointer"
                  title={isPlayingScrubber ? "Pause" : "Play"}
                >
                  {isPlayingScrubber ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>
                <div>
                  <span className="text-xs text-[#64748b] font-mono">
                    Year:
                  </span>
                  <span className="text-sm font-bold font-mono text-[#0c2340] ml-1.5">
                    {activeYearScrubber}
                  </span>
                </div>
              </div>

              <div className="flex-1 max-w-md mx-2">
                <input
                  type="range"
                  min="1990"
                  max="2023"
                  step="1"
                  value={activeYearScrubber}
                  onChange={(e) => {
                    setIsPlayingScrubber(false);
                    setActiveYearScrubber(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-[#0c2340] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#64748b]">
                  <span>1990</span>
                  <span>2015</span>
                  <span>2023</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsPlayingScrubber(false);
                  setActiveYearScrubber(2023);
                }}
                className="text-xs font-mono text-[#64748b] hover:text-[#0c2340] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset (2023)</span>
              </button>
            </div>

            {/* Citation & License Footer (OWID Signature) */}
            <div className="pt-3 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between text-[11px] text-[#64748b]">
              <div>
                Source:{" "}
                <span className="font-semibold text-[#0c2340]">
                  Global Carbon Project (2023)
                </span>
                ;{" "}
                <span className="font-semibold text-[#0c2340]">EDGAR v8.0</span>
              </div>
              <div>
                Open Access: Licensed under{" "}
                <span className="font-semibold text-[#0c2340]">CC BY 4.0</span>
              </div>
            </div>
          </div>

          {/* SCOPES 1, 2, AND 3 ALLOCATION FRAMEWORK */}
          <div id="layer-2-scopes" className="space-y-6 pt-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-[#0c2340]">
                Where do emissions come from? Scope 1, 2 & 3 Classification
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Emissions broken down by the Greenhouse Gas (GHG) Protocol
                corporate and sovereign accounting scopes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SCOPE_FRAMEWORK.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.scope}
                    className="owid-card p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#0c2340] border border-[#e2e8f0]">
                          {item.scope}
                        </span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#D9EFAB] text-[#22380a] border border-[#c4e48a]">
                          {item.share}% Share
                        </span>
                      </div>

                      <h4 className="text-base font-serif font-bold text-[#0c2340] leading-snug">
                        {item.name}
                      </h4>

                      <div className="text-2xl font-serif font-black text-[#0c2340] font-mono-numeric">
                        {item.emissionsGt}{" "}
                        <span className="text-xs font-sans font-normal text-[#64748b]">
                          Gt CO₂
                        </span>
                      </div>

                      <p className="text-xs text-[#475569] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e2e8f0]">
                      <div className="text-[10px] font-mono text-[#64748b] uppercase font-bold mb-1.5">
                        Key Decarbonisation Levers:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.levers.map((lever, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f8fafc] border border-[#e2e8f0] text-[#334155]"
                          >
                            {lever}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            LAYER 3 — THE SOVEREIGN LEDGER & AUDIT LAYER
            Goal: Planetary accountability, verifiable audit data, and institutional execution.
           ========================================================================= */}
        <section
          id="layer-3-ledger"
          className="space-y-10 pt-4 border-t border-[#e2e8f0]"
        >
          {/* Layer Architectural Header */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#D9EFAB] text-[#22380a] border border-[#c4e48a]">
              LAYER 3 • DATA LEDGER & AUDIT
            </span>
            <span className="text-xs text-[#64748b] font-mono">
              Country-Level Verification & Stoichiometric Principles
            </span>
          </div>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c2340] tracking-tight">
                Sovereign Climate & Emissions Ledger
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed max-w-2xl">
                Filterable cross-economy verification across total emissions,
                per capita footprint, clean power grid share, and net-zero
                targets.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleExportCSV(
                  COUNTRIES.map((c) => ({
                    Country: c.name,
                    ISO3: c.iso3,
                    Region: c.region,
                    Population: c.population,
                    "Total CO2 (Mt)": c.indicators.totalEmissionsCO2,
                    "Per Capita CO2 (t)": c.indicators.perCapitaCO2,
                    "Renewable Grid (%)": c.indicators.renewableShare,
                    "PM2.5 (ug/m3)": c.indicators.airQualityPM25,
                    "Net Zero Year": c.indicators.netZeroTargetYear,
                  })),
                  "sovereign-environmental-ledger.csv",
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#0c2340] hover:bg-[#185a9d] text-white text-xs font-mono transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D9EFAB]" />
              <span>Export Ledger (CSV)</span>
            </button>
          </div>

          {/* Search & Continent Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-white border border-[#e2e8f0]">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search country or ISO-3 code (e.g. India, IND, China)..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded border border-[#cbd5e1] text-xs text-[#0c2340] placeholder-[#94a3b8] focus:outline-none focus:border-[#0c2340]"
              />
            </div>

            {/* Region Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {["All", "Asia", "Europe", "Americas"].map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegionFilter(reg)}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                    selectedRegionFilter === reg
                      ? "bg-[#0c2340] text-white font-bold"
                      : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="owid-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0]">
                  <tr>
                    <th className="p-3.5 font-bold text-[#0c2340]">
                      Country / Territory
                    </th>
                    <th
                      className="p-3.5 font-bold cursor-pointer hover:text-[#0c2340]"
                      onClick={() => {
                        setTableSortColumn("totalEmissionsCO2");
                        setTableSortDirection(
                          tableSortDirection === "asc" ? "desc" : "asc",
                        );
                      }}
                    >
                      Total CO₂ (Mt){" "}
                      {tableSortColumn === "totalEmissionsCO2" &&
                        (tableSortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      className="p-3.5 font-bold cursor-pointer hover:text-[#0c2340]"
                      onClick={() => {
                        setTableSortColumn("perCapitaCO2");
                        setTableSortDirection(
                          tableSortDirection === "asc" ? "desc" : "asc",
                        );
                      }}
                    >
                      Per Capita (t){" "}
                      {tableSortColumn === "perCapitaCO2" &&
                        (tableSortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      className="p-3.5 font-bold cursor-pointer hover:text-[#0c2340]"
                      onClick={() => {
                        setTableSortColumn("renewableShare");
                        setTableSortDirection(
                          tableSortDirection === "asc" ? "desc" : "asc",
                        );
                      }}
                    >
                      Clean Grid %{" "}
                      {tableSortColumn === "renewableShare" &&
                        (tableSortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="p-3.5 font-bold">PM2.5 Air Quality</th>
                    <th className="p-3.5 font-bold">Net-Zero Target</th>
                    <th className="p-3.5 font-bold">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {filteredAndSortedCountries.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-[#f8fafc] transition-colors"
                    >
                      <td className="p-3.5 font-sans font-semibold text-[#0c2340] flex items-center gap-2">
                        <span className="text-base">{c.flag}</span>
                        <div>
                          <div>{c.name}</div>
                          <div className="text-[10px] font-mono text-[#64748b] uppercase">
                            {c.iso3} • {c.region}
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold font-mono text-[#0c2340]">
                        {c.indicators.totalEmissionsCO2?.toLocaleString()} Mt
                      </td>
                      <td className="p-3.5 font-mono text-[#334155]">
                        {c.indicators.perCapitaCO2} t
                      </td>
                      <td className="p-3.5 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-[#334155]">
                            {c.indicators.renewableShare}%
                          </span>
                          <div className="w-14 h-1.5 rounded bg-[#e2e8f0] overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-[#185a9d] rounded"
                              style={{
                                width: `${Math.min(c.indicators.renewableShare, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono text-[#475569]">
                        {c.indicators.airQualityPM25} µg/m³
                      </td>
                      <td className="p-3.5 font-mono">
                        {/* Soft Lime Accent Badge */}
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#D9EFAB] text-[#22380a] font-bold border border-[#c4e48a]">
                          {c.indicators.netZeroTargetYear
                            ? `Pledge ${c.indicators.netZeroTargetYear}`
                            : "Not Specified"}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0d9488]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{c.verificationStatus}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* METHODOLOGY & CHEMICAL STOICHIOMETRY (OWID 3-Step Accounting Guide) */}
          <div
            id="layer-3-methodology"
            className="owid-card p-6 sm:p-8 space-y-6"
          >
            <div className="space-y-2 pb-4 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#185a9d]" />
                <span className="text-xs font-mono font-bold text-[#185a9d] uppercase">
                  Data Acquisition & Accounting Principles
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0c2340]">
                How do we estimate carbon dioxide (CO₂) emissions?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Reconstructions of national CO₂ emissions apply stoichiometric
                principles across three verified steps:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#334155] leading-relaxed font-sans">
              <div className="space-y-2 p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="font-mono font-bold text-[#0c2340] text-sm">
                  Step 1: Production Extraction
                </div>
                <p>
                  Industrial statistics detail physical extraction quantities of
                  coal, lignite, peat, natural gas, and crude petroleum produced
                  within sovereign borders.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="font-mono font-bold text-[#0c2340] text-sm">
                  Step 2: International Trade Correction
                </div>
                <p>
                  To ascertain how much fuel was burned domestically, we adjust
                  for cross-border trade flows:
                  <code className="block mt-1 font-mono text-[#0c2340] bg-white p-1.5 rounded border border-[#cbd5e1]">
                    Domestic Extraction + Imports − Exports − Stock Additions
                  </code>
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="font-mono font-bold text-[#0c2340] text-sm">
                  Step 3: Chemical Stoichiometry
                </div>
                <p>
                  Molar mass conservation determines atmospheric CO₂ release:
                  <code className="block mt-1 font-mono text-[#0c2340] bg-white p-1.5 rounded border border-[#cbd5e1]">
                    C + O₂ → CO₂ (12g C + 32g O → 44g CO₂)
                  </code>
                  Every tonne of pure elemental carbon oxidized yields 3.664
                  tonnes of CO₂.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* OWID SIGNATURE FOOTER */}
      <footer className="border-t border-[#cbd5e1] bg-[#002147] text-white py-12 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif font-black text-base text-white">
              Our World in Data
            </div>
            <div className="text-slate-300 text-[11px]">
              Research and data to make progress against the world’s largest
              problems.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <button
              type="button"
              onClick={() => scrollToSection("layer-1-landing")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Layer 1: Overview
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("layer-2-grapher")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Layer 2: The Grapher
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("layer-3-ledger")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Layer 3: Data Ledger
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 text-center sm:text-right">
            Open access licensed under{" "}
            <span className="text-white font-bold">CC BY 4.0</span>.
          </div>
        </div>
      </footer>
    </div>
  );
}
