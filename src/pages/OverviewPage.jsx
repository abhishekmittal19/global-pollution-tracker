import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  ArrowRight,
  TrendingUp,
  Search,
  BookOpen,
  FileText,
  ShieldCheck,
  Compass,
  ExternalLink
} from 'lucide-react';
import MetricCard from '../components/cards/MetricCard';
import CountryCard from '../components/cards/CountryCard';
import TopicCard from '../components/cards/TopicCard';
import EmissionsTimelineChart from '../components/charts/EmissionsTimelineChart';
import CountryComparisonBarChart from '../components/charts/CountryComparisonBarChart';
import DataQualityNotice from '../components/common/DataQualityNotice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getGlobalOverview, getCountries } from '../services/environmentalService';

export default function OverviewPage() {
  const [overviewData, setOverviewData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [overview, countryList] = await Promise.all([
          getGlobalOverview(),
          getCountries()
        ]);
        setOverviewData(overview);
        setCountries(countryList);
      } catch (err) {
        console.error('Failed to load overview data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Compiling global climate & emissions intelligence..." />;
  }

  const { indicators = [], topics = [], recentResearch = [], featuredCountries = [] } = overviewData || {};

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-900 via-forest-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-elevation overflow-hidden border border-forest-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Independent Climate & Emissions Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Global Pollution & Climate Intelligence
          </h1>

          <p className="text-sm sm:text-base text-sand-200 leading-relaxed font-normal">
            Explore environmental challenges, compare countries, and understand the policies shaping climate action.
            Standardized metrics based on official UNFCCC submissions, EDGAR inventories, and peer-reviewed Earth science.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm shadow-subtle transition-colors"
            >
              <span>Compare Countries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/countries"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <Globe className="w-4 h-4 text-emerald-300" />
              <span>Explore Directory</span>
            </Link>
          </div>
        </div>

        {/* Decorative Grid Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#C7E2D7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none hidden md:block" />
      </section>

      {/* Scientific Governance Disclaimer */}
      <DataQualityNotice
        type="scientific"
        title="Scientific Attribution & Governance Standard"
        collapsible={true}
      >
        <p>
          Data within this platform is assembled from sovereign inventories filed with the UNFCCC, European Commission EDGAR v8.0, and the Global Carbon Project (2023).
          Territorial production-based emissions are explicitly segregated from consumption-adjusted trade matrices.
          Pledged percentage targets are benchmarked to specified historical baseline years.
        </p>
      </DataQualityNotice>

      {/* Key Global Indicator Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-forest-950 tracking-tight">
              Global Climate Indicators
            </h2>
            <p className="text-xs text-slate-500">
              Macro-level metrics tracking worldwide emissions and energy transition progress
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono-numeric">
            Verified Cycle 2023-2024
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {indicators.map((item) => (
            <MetricCard
              key={item.id}
              label={item.label}
              value={item.value}
              unit={item.unit}
              reportingYear={item.reportingYear}
              description={item.description}
              source={item.source}
              sourceUrl={item.sourceUrl}
              trend={item.trend}
              trendLabel={item.trendLabel}
              status={item.status}
            />
          ))}
        </div>
      </section>

      {/* Visualizations Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-forest-950 tracking-tight">
              Interactive Environmental Trajectories
            </h2>
            <p className="text-xs text-slate-500">
              Compare long-term historical trends and benchmark country indicators
            </p>
          </div>
          <Link
            to="/compare"
            className="text-xs font-semibold text-forest-700 hover:text-forest-900 inline-flex items-center gap-1"
          >
            <span>Deep Comparison Mode</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Global Timeline Chart */}
        <EmissionsTimelineChart countries={countries} initialMetric="co2" />

        {/* Country Comparison Bar Chart */}
        <CountryComparisonBarChart countries={countries} initialMetric="perCapitaCO2" />
      </section>

      {/* Country Highlights Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-forest-950 tracking-tight">
              Featured Country Profiles
            </h2>
            <p className="text-xs text-slate-500">
              In-depth environmental architectures for India, Germany, China, and comparative peers
            </p>
          </div>
          <Link
            to="/countries"
            className="text-xs font-semibold text-forest-700 hover:text-forest-900 inline-flex items-center gap-1"
          >
            <span>View All {countries.length} Countries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredCountries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </section>

      {/* Explore By Topic Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-forest-950 tracking-tight">
            Explore by Environmental Topic
          </h2>
          <p className="text-xs text-slate-500">
            Navigate data, policies, and measurement frameworks across thematic domains
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      {/* Recent Research Publications Section */}
      <section className="bg-white rounded-xl border border-sand-300/80 p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-forest-700" />
            <h2 className="text-base font-bold text-slate-850">
              Verified Scientific Research & Policy Releases
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Authoritative Peer-Reviewed Sources
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentResearch.map((res) => (
            <div
              key={res.id}
              className="p-4 rounded-lg bg-sand-50/70 border border-sand-200 hover:border-forest-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                  <span className="font-semibold text-forest-800">{res.publisher}</span>
                  <span className="font-mono-numeric">{res.year}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-xs mb-2 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {res.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-sand-200/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {res.tags.map((t, idx) => (
                    <span key={idx} className="bg-white px-1.5 py-0.5 rounded text-[10px] text-slate-500 border border-sand-200">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-forest-700 hover:text-forest-900 p-1"
                  title="Open official publication"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
