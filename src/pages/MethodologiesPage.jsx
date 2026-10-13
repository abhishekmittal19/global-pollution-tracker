import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, ShieldCheck, ArrowRight, HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import MethodologyMatrixTable from '../components/tables/MethodologyMatrixTable';
import DataQualityNotice from '../components/common/DataQualityNotice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';
import { getMethodologies } from '../services/environmentalService';

export default function MethodologiesPage() {
  const [methodologiesData, setMethodologiesData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMethodologies();
        setMethodologiesData(data);
      } catch (err) {
        console.error('Failed to load methodologies:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Compiling scientific measurement frameworks..." />;
  }

  const { frameworks = [], comparisonMatrix = [] } = methodologiesData || {};

  const categories = ['All', 'Emissions Accounting', 'Emissions Metrics', 'Air Quality', 'Target Frameworks'];

  const filteredFrameworks = activeCategory === 'All'
    ? frameworks
    : frameworks.filter(f => f.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-sand-300">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-forest-700" />
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 tracking-tight">
            Scientific Methodologies & Accounting Standards
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore the exact measurement boundaries, IPCC warming potentials, and baseline mechanics governing global climate data.
        </p>
      </div>

      {/* Governance Explainer */}
      <DataQualityNotice
        type="scientific"
        title="Why Measurement Methodologies Matter"
        collapsible={false}
      >
        <p>
          Environmental data is never value-neutral. The decision to use territorial accounting rather than consumption accounting,
          to measure against a 1990 baseline rather than 2005, or to calculate emissions intensity rather than an absolute cap,
          fundamentally changes which countries appear to lead or lag. Transparent methodology separates genuine decarbonization from statistical displacement.
        </p>
      </DataQualityNotice>

      {/* Structured Comparison Matrix */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-forest-950">
            Official State Inventories vs. Independent Monitoring Models
          </h2>
          <span className="text-xs text-slate-400">
            Harmonized Evaluation
          </span>
        </div>
        <MethodologyMatrixTable matrix={comparisonMatrix} />
      </section>

      {/* Deep-Dive Framework Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-forest-950">
              Core Measurement Paradigms & Boundaries
            </h2>
            <p className="text-xs text-slate-500">
              Detailed technical explanations of international climate and pollution accounting rules
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-sand-100 p-1 rounded-lg border border-sand-200">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-forest-900 shadow-subtle font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredFrameworks.map((framework) => (
            <article
              key={framework.id}
              id={framework.id}
              className="bg-white rounded-xl border border-sand-300 p-6 shadow-card space-y-4 scroll-mt-20"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-sand-200 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="forest" size="xs">
                      {framework.category}
                    </Badge>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      Boundary: {framework.boundaryType}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {framework.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Established by: {framework.establishedBy}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {framework.summary}
              </p>

              {/* Side-by-side Principle Columns */}
              {framework.principles && framework.principles.length > 0 && (
                <div className="border border-sand-200 rounded-lg overflow-hidden">
                  <div className="bg-sand-100/90 p-2.5 text-xs font-bold text-slate-800 border-b border-sand-200">
                    Structured Comparison of Principles
                  </div>
                  <div className="divide-y divide-sand-200 text-xs">
                    {framework.principles.map((p, idx) => (
                      <div key={idx} className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3 hover:bg-sand-50/50">
                        <div className="md:col-span-3 font-semibold text-slate-850">
                          {p.aspect}
                        </div>
                        <div className="md:col-span-4 text-slate-700 bg-sand-50 p-2 rounded border border-sand-200/80">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Territorial Standard / Scope 1</span>
                          {p.territorial}
                        </div>
                        <div className="md:col-span-5 text-slate-700 bg-forest-50/30 p-2 rounded border border-forest-100">
                          <span className="text-[10px] uppercase font-bold text-forest-800 block mb-0.5">Consumption / Trade-Adjusted / Health Guideline</span>
                          {p.consumption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {framework.realWorldImpact && (
                <div className="p-3 bg-sand-50 rounded-lg border border-sand-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-1">Empirical Demonstration:</strong>
                  {framework.realWorldImpact}
                </div>
              )}

              {framework.guidanceNote && (
                <div className="p-2.5 bg-emerald-50/60 rounded border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Research Guidance:</strong> {framework.guidanceNote}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
