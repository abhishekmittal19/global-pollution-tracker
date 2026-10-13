import React from 'react';
import {
  Info,
  ShieldCheck,
  Server,
  Database,
  Code2,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function AboutPage() {
  const backendEndpoints = [
    { method: 'GET', path: '/api/overview', description: 'Returns global aggregate greenhouse gas indicators, featured economies, and topics.' },
    { method: 'GET', path: '/api/countries', description: 'Returns filtered list of countries (query params: region, search, sortBy, sortOrder).' },
    { method: 'GET', path: '/api/countries/:id', description: 'Returns detailed country profile, indicators, sector allocations, and NDC pledges.' },
    { method: 'GET', path: '/api/countries/:id/indicators', description: 'Returns historical time series and sector metrics for charts.' },
    { method: 'GET', path: '/api/compare?ids=...&metric=...', description: 'Aligns multi-country historical time series and generates comparative rows.' },
    { method: 'GET', path: '/api/policies', description: 'Returns searchable climate policies (query params: countryId, sector, status, type).' },
    { method: 'GET', path: '/api/methodologies', description: 'Returns accounting frameworks and inventory comparison matrix.' },
    { method: 'GET', path: '/api/organizations', description: 'Returns directory of verified research institutes, ministries, and NGOs.' },
    { method: 'GET', path: '/api/data-sources', description: 'Returns transparent registry of open-data publishers and license metadata.' },
    { method: 'GET', path: '/api/search?q=...', description: 'Universal search across countries, policies, methodologies, and organizations.' },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-sand-300">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-forest-700" />
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
            About Global Pollution & Climate Intelligence (GPCI)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          A centralized, open-science platform designed for rigorous environmental policy and emissions exploration.
        </p>
      </div>

      {/* Vision & Mission */}
      <section className="bg-white rounded-xl border border-sand-300/80 p-6 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Compass className="w-5 h-5 text-forest-700" />
          <span>Product Vision & Core Objective</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The long-term vision of GPCI is to help citizens, researchers, and policymakers understand and compare environmental action across countries without political bias or opaque metrics.
          Rather than reducing complex Earth system interactions into arbitrary single &ldquo;green ranks&rdquo;, GPCI provides transparent data, preserves scientific units, and highlights measurement limitations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 bg-sand-50 rounded-lg border border-sand-200 text-xs space-y-1.5">
            <strong className="text-forest-900 block font-semibold">What We Do:</strong>
            <ul className="space-y-1 text-slate-600 list-disc pl-4">
              <li>Separate territorial emissions from trade-adjusted consumption emissions.</li>
              <li>Document official Paris Agreement NDC baseline reference years.</li>
              <li>Provide verified links directly to original national ministries and repositories.</li>
              <li>Display missing data honestly as &ldquo;— Not Reported&rdquo; rather than misleading zeroes.</li>
            </ul>
          </div>

          <div className="p-3.5 bg-sand-50 rounded-lg border border-sand-200 text-xs space-y-1.5">
            <strong className="text-forest-900 block font-semibold">What We Avoid:</strong>
            <ul className="space-y-1 text-slate-600 list-disc pl-4">
              <li>No synthetic aggregate &ldquo;green scores&rdquo; or beauty-contest rankings.</li>
              <li>No mixing of CO₂ fossil data with multi-gas greenhouse matrices without labels.</li>
              <li>No conflation of policy quantities with policy effectiveness.</li>
              <li>No hallucinations of non-existent research credentials or statistics.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="bg-white rounded-xl border border-sand-300/80 p-6 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-forest-700" />
          <span>Designed for Diverse User Groups</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg border border-sand-200 space-y-1 bg-sand-50/50">
            <span className="font-semibold text-slate-800 block">1. Students & Beginners</span>
            <p className="text-slate-600">Clear explanatory labels, contextual tooltips, and progressive disclosure from basic metrics to deep tabs.</p>
          </div>
          <div className="p-3 rounded-lg border border-sand-200 space-y-1 bg-sand-50/50">
            <span className="font-semibold text-slate-800 block">2. Researchers & Data Analysts</span>
            <p className="text-slate-600">Standardized CSV and JSON exports, multi-country comparison tools, and explicit GWP metric citations.</p>
          </div>
          <div className="p-3 rounded-lg border border-sand-200 space-y-1 bg-sand-50/50">
            <span className="font-semibold text-slate-800 block">3. Environmental NGOs</span>
            <p className="text-slate-600">Catalog of real statutory policies with reported budgets and documented empirical evidence of outcomes.</p>
          </div>
          <div className="p-3 rounded-lg border border-sand-200 space-y-1 bg-sand-50/50">
            <span className="font-semibold text-slate-800 block">4. Citizens & Communities</span>
            <p className="text-slate-600">Understand national progress toward Paris Agreement commitments and air quality health standards.</p>
          </div>
          <div className="p-3 rounded-lg border border-sand-200 space-y-1 bg-sand-50/50">
            <span className="font-semibold text-slate-800 block">5. Software Engineers</span>
            <p className="text-slate-600">Clean modular service layer ready to connect to a future Node/Express/MongoDB MERN backend.</p>
          </div>
        </div>
      </section>

      {/* MERN Backend API Specifications */}
      <section className="bg-white rounded-xl border border-sand-300/80 p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-forest-700" />
            <span>Future MERN Backend Integration Points</span>
          </h2>
          <Badge variant="forest" size="xs">Ready for Node / Express / Mongo</Badge>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The frontend is architected with a decoupled service layer (<code className="bg-sand-100 px-1 py-0.5 rounded text-forest-900 font-mono">src/services/environmentalService.js</code>).
          Setting <code className="bg-sand-100 px-1 py-0.5 rounded text-forest-900 font-mono">VITE_USE_LOCAL_DATA=false</code> and supplying <code className="bg-sand-100 px-1 py-0.5 rounded text-forest-900 font-mono">VITE_API_BASE_URL</code> will immediately route all frontend data queries to the following Express.js REST API endpoints:
        </p>

        <div className="overflow-x-auto border border-sand-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-sand-100 text-slate-700 border-b border-sand-200">
                <th className="p-2.5 font-semibold w-24">Method</th>
                <th className="p-2.5 font-semibold w-64">Endpoint Path</th>
                <th className="p-2.5 font-semibold">Purpose & Target Mongo Collection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 font-mono-numeric">
              {backendEndpoints.map((ep, idx) => (
                <tr key={idx} className="hover:bg-sand-50/60">
                  <td className="p-2.5 font-mono font-bold text-emerald-800 text-[11px]">{ep.method}</td>
                  <td className="p-2.5 font-mono text-slate-900 text-[11px]">{ep.path}</td>
                  <td className="p-2.5 text-slate-600 font-sans text-xs">{ep.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Verified vs Sample Data Disclosure */}
      <section className="bg-white rounded-xl border border-sand-300/80 p-6 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-forest-700" />
          <span>Sample Data vs. Verified Real-World Data Breakdown</span>
        </h2>
        <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Verified Real-World Datasets (100% Authentic Citations):</strong>
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-600">
            <li>
              <strong>India, Germany, China, US, Japan, Brazil, UK:</strong> Indicators (Total CO₂, Total GHG, Per-Capita CO₂, Renewable Share, Grid Carbon Intensity, PM2.5, Baseline Years, NDCs) are sourced directly from EDGAR v8.0, UNFCCC First/Second/Third National Communications, IEA, and Global Carbon Project 2023.
            </li>
            <li>
              <strong>Climate Policies:</strong> All 13 policies (e.g. India National Solar Mission, PAT Scheme, FAME II; Germany KSG, EEG 2023, Coal Phaseout; China ETS, 1+N Framework, NEV Plan; US IRA) are real, enacted statutory programs with verified government ministry citations.
            </li>
            <li>
              <strong>Organizations & Data Sources:</strong> All 12 institutions and 8 data sources represent real entities and verified open repositories.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
