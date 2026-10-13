import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Globe2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Layers
} from 'lucide-react';
import MetricCard from '../components/cards/MetricCard';
import PolicyCard from '../components/cards/PolicyCard';
import SectorBreakdownPieChart from '../components/charts/SectorBreakdownPieChart';
import EmissionsTimelineChart from '../components/charts/EmissionsTimelineChart';
import Tabs from '../components/common/Tabs';
import Badge from '../components/common/Badge';
import DataQualityNotice from '../components/common/DataQualityNotice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { formatMetric, formatPercentage, formatPopulation } from '../utils/formatters';
import { getCountryById, getPolicies } from '../services/environmentalService';

export default function CountryProfilePage() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [countryPolicies, setCountryPolicies] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const countryData = await getCountryById(id);
        setCountry(countryData);
        const policies = await getPolicies({ countryId: countryData.id });
        setCountryPolicies(policies);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError(err.message || 'Country profile not found.');
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner label="Compiling country profile and emissions ledger..." />;
  }

  if (error || !country) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 max-w-md mx-auto text-sm">
          {error || 'Unable to locate country profile.'}
        </div>
        <Link to="/countries">
          <Button variant="outline" size="sm" icon={ArrowLeft}>
            Return to Country Directory
          </Button>
        </Link>
      </div>
    );
  }

  const {
    name,
    flag,
    iso3,
    region,
    subregion,
    population,
    gdpPerCapita,
    latestReportingYear,
    verificationStatus,
    summary,
    indicators,
    ndcSnapshot,
    sectorBreakdown,
    historicalTimeline,
    methodologyNotes,
    sources
  } = country;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'emissions', label: 'Emissions & Sectors' },
    { id: 'policies', label: 'Policies & Schemes', badge: countryPolicies.length },
    { id: 'targets', label: 'Targets & NDC Progress' },
    { id: 'methodology', label: 'Methodology & Boundaries' },
    { id: 'sources', label: 'Sources & Citations', badge: sources?.length || 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/countries" className="hover:text-forest-800 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Country Explorer</span>
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">{name}</span>
      </div>

      {/* Country Header Banner */}
      <div className="bg-white rounded-2xl border border-sand-300 p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-4xl select-none" role="img" aria-label={name}>
              {flag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
                  {name}
                </h1>
                <span className="text-xs font-mono font-semibold text-slate-500 bg-sand-100 px-2 py-0.5 rounded border border-sand-200">
                  {iso3}
                </span>
                <Badge status={verificationStatus} size="sm" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <Globe2 className="w-3.5 h-3.5" />
                <span>{region} ({subregion})</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5" />
                <span>Latest Inventory: {latestReportingYear}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Quick Comparative Action */}
        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
          <Link to={`/compare?country1=${country.id}`}>
            <Button variant="primary" size="sm" className="w-full">
              Compare with Another Country
            </Button>
          </Link>
          <div className="p-3 bg-sand-50 rounded-lg border border-sand-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Population:</span>
              <strong className="font-mono-numeric">{formatPopulation(population)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Net Zero Goal:</span>
              <strong className="font-mono-numeric text-forest-900">{indicators.netZeroTargetYear || '—'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      <div className="pt-2">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Total Territorial CO₂"
                value={indicators.totalEmissionsCO2}
                unit="Mt CO₂"
                reportingYear={latestReportingYear}
                description="Fossil fuels combustion and industrial cement processes"
                source="EDGAR / UNFCCC"
                status={verificationStatus}
              />
              <MetricCard
                label="Territorial CO₂ per Person"
                value={indicators.perCapitaCO2}
                unit="t CO₂/person"
                reportingYear={latestReportingYear}
                description="Production emissions divided by domestic population"
                source="Global Carbon Project"
                status={verificationStatus}
              />
              <MetricCard
                label="Renewable Electricity Share"
                value={indicators.renewableShare}
                unit="%"
                reportingYear={latestReportingYear}
                description="Share of gross generation from solar, wind, hydro, bio"
                source="IEA / National Regulator"
                status={verificationStatus}
              />
              <MetricCard
                label="Ambient PM2.5 Exposure"
                value={indicators.airQualityPM25}
                unit="µg/m³"
                reportingYear={latestReportingYear}
                description="Population-weighted annual mean concentration"
                source="WHO / CAMS"
                status={verificationStatus}
              />
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sector Breakdown preview */}
              <SectorBreakdownPieChart sectorData={sectorBreakdown} countryName={name} />

              {/* NDC and Target Preview Card */}
              <div className="bg-white rounded-xl border border-sand-300/80 p-5 shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-sand-200">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Official Paris Agreement Commitment (NDC)
                    </h4>
                    <span className="text-[11px] bg-sand-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                      Target {ndcSnapshot.targetYear}
                    </span>
                  </div>

                  <div className="my-4 p-3 bg-forest-50/60 rounded-lg border border-forest-200 text-xs text-forest-950 leading-relaxed font-medium">
                    &ldquo;{ndcSnapshot.targetStatement}&rdquo;
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between py-1 border-b border-sand-100">
                      <span className="text-slate-500">Baseline Reference Year:</span>
                      <strong className="font-mono-numeric">{ndcSnapshot.baseYear || '—'}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sand-100">
                      <span className="text-slate-500">Target Mechanism:</span>
                      <strong className="text-slate-800">{ndcSnapshot.classification}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sand-100">
                      <span className="text-slate-500">Pledged Net-Zero Horizon:</span>
                      <strong className="text-forest-900 font-mono-numeric font-bold">{ndcSnapshot.netZeroYear}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Submission Status:</span>
                      <span className="text-slate-700">{ndcSnapshot.status}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-sand-200 text-[11px] text-slate-400">
                  Reported under UNFCCC Paris Agreement registry.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EMISSIONS */}
        {activeTab === 'emissions' && (
          <div className="space-y-6">
            <DataQualityNotice type="info" title="Emissions Boundary Scope">
              <p>
                Territorial emissions measure emissions that occur within the country&apos;s borders.
                Consumption-based emissions reflect emissions embedded in imported goods and services consumed domestically.
                For {name}, territorial CO₂ is <strong>{formatMetric(indicators.totalEmissionsCO2, { unit: 'Mt' })}</strong>, while consumption-based emissions are <strong>{formatMetric(indicators.consumptionBasedCO2, { unit: 'Mt' })}</strong>.
              </p>
            </DataQualityNotice>

            {/* Historical Timeline Chart */}
            <EmissionsTimelineChart countries={[country]} initialMetric="co2" />

            {/* Detailed Sector Breakdown */}
            <SectorBreakdownPieChart sectorData={sectorBreakdown} countryName={name} />
          </div>
        )}

        {/* TAB 3: POLICIES */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Enacted Climate Legislation & National Schemes ({countryPolicies.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Government policies, statutory acts, and economic incentives verified with official ministries.
                </p>
              </div>
            </div>

            {countryPolicies.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-sand-50 rounded-lg">
                No policy records currently indexed for {name}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {countryPolicies.map((pol) => (
                  <PolicyCard key={pol.id} policy={pol} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TARGETS & PROGRESS */}
        {activeTab === 'targets' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-sand-200 pb-3">
                Nationally Determined Contribution (NDC) Governance
              </h3>

              <div className="p-4 bg-sand-50 rounded-lg border border-sand-200 text-xs text-slate-800 space-y-2 leading-relaxed">
                <span className="font-semibold text-forest-900 block text-sm">
                  Official Statement Filed with UNFCCC:
                </span>
                <p className="italic bg-white p-3 rounded border border-sand-200">
                  &ldquo;{ndcSnapshot.targetStatement}&rdquo;
                </p>
                <div className="text-[11px] text-slate-500 pt-1">
                  Status: {ndcSnapshot.status}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-white rounded-lg border border-sand-200 text-xs space-y-1">
                  <span className="text-slate-400 text-[11px] block">Target Year</span>
                  <span className="text-base font-bold text-forest-950 font-mono-numeric">{ndcSnapshot.targetYear}</span>
                  <span className="text-[11px] text-slate-500 block">Baseline Year: {ndcSnapshot.baseYear || 'None'}</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-sand-200 text-xs space-y-1">
                  <span className="text-slate-400 text-[11px] block">Pledged Headline Reduction</span>
                  <span className="text-base font-bold text-forest-950 font-mono-numeric">{ndcSnapshot.intensityTarget}</span>
                  <span className="text-[11px] text-slate-500 block">Type: {ndcSnapshot.classification}</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-sand-200 text-xs space-y-1">
                  <span className="text-slate-400 text-[11px] block">Net-Zero Horizon</span>
                  <span className="text-base font-bold text-forest-950 font-mono-numeric">{ndcSnapshot.netZeroYear}</span>
                  <span className="text-[11px] text-slate-500 block">Long-Term Low-Emission Strategy</span>
                </div>
              </div>

              <div className="pt-4 border-t border-sand-200 text-xs text-slate-600 leading-relaxed space-y-2">
                <h4 className="font-semibold text-slate-800">
                  Target Evaluation Note (Targets vs Measured Outcomes):
                </h4>
                <p>
                  Official targets represent political and statutory commitments under international treaties.
                  They do not constitute guaranteed outcomes. Actual measured progress requires ongoing empirical audits of annual fossil combustion volumes and industrial activity.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: METHODOLOGY */}
        {activeTab === 'methodology' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-card space-y-4 text-xs leading-relaxed">
              <h3 className="text-base font-bold text-slate-900 border-b border-sand-200 pb-3">
                Methodological Framework & Limitations for {name}
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800">Accounting Standard:</h4>
                  <p className="text-slate-600 font-mono-numeric mt-0.5">{methodologyNotes.accountingStandard}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800">Geographic & Sectoral Scope:</h4>
                  <p className="text-slate-600 mt-0.5">{methodologyNotes.scope}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800">Global Warming Potential (GWP) Metric:</h4>
                  <p className="text-slate-600 mt-0.5">{methodologyNotes.gwpReference}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800">Trade & Embodied Carbon Adjustment:</h4>
                  <p className="text-slate-600 mt-0.5">{methodologyNotes.consumptionAdjustment}</p>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                  <h4 className="font-semibold text-amber-950 flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    Documented Uncertainty & Known Limitations:
                  </h4>
                  <p>{methodologyNotes.knownLimitations}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SOURCES */}
        {activeTab === 'sources' && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900">
              Primary Datasets & Government Publications ({sources?.length || 0})
            </h3>

            <div className="space-y-3">
              {sources?.map((src, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-sand-300/80 p-4 shadow-card hover:border-forest-400 transition-all flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-forest-800 font-medium">
                      <span>{src.name}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-mono-numeric">{src.year}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {src.title}
                    </h4>
                  </div>

                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-forest-700 hover:text-forest-900 hover:underline shrink-0"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
