import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Globe, FileText, BookOpen, Building2, ArrowRight } from 'lucide-react';
import { searchGlobal } from '../../services/environmentalService';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ countries: [], policies: [], methodologies: [], organizations: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ countries: [], policies: [], methodologies: [], organizations: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setLoading(true);
      const timer = setTimeout(async () => {
        const res = await searchGlobal(query);
        setResults(res);
        setLoading(false);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setResults({ countries: [], policies: [], methodologies: [], organizations: [] });
      setLoading(false);
    }
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    results.countries.length +
    results.policies.length +
    results.methodologies.length +
    results.organizations.length;

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-elevation border border-sand-300 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-sand-200 gap-3">
          <Search className="w-5 h-5 text-forest-700 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries, policies, indicators, organizations (e.g. India, Solar, ETS, PM2.5)..."
            className="w-full bg-transparent text-sm text-slate-850 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-sand-100 text-slate-500 rounded border border-sand-200">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="text-center py-6 text-xs text-slate-500">
              Searching environmental intelligence registry...
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="py-6 text-center text-xs text-slate-400">
              Type at least 2 characters to search across countries, policies, methodologies, and organizations.
            </div>
          )}

          {!loading && query.length >= 2 && totalResults === 0 && (
            <div className="py-6 text-center text-xs text-slate-500">
              No verified records found matching &ldquo;<span className="text-slate-700 font-medium">{query}</span>&rdquo;.
            </div>
          )}

          {/* Countries */}
          {results.countries.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-forest-700" />
                <span>Countries & Economies</span>
              </div>
              <div className="space-y-1">
                {results.countries.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-forest-50/70 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-forest-900">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">{item.subtitle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-forest-700 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Policies */}
          {results.policies.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                <span>Government Policies & Schemes</span>
              </div>
              <div className="space-y-1">
                {results.policies.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-sky-50/70 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-900">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">{item.subtitle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Methodologies */}
          {results.methodologies.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Scientific Methodologies</span>
              </div>
              <div className="space-y-1">
                {results.methodologies.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/70 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-amber-900">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">{item.subtitle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Organizations */}
          {results.organizations.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-700" />
                <span>Organizations & Institutes</span>
              </div>
              <div className="space-y-1">
                {results.organizations.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/70 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-purple-900">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">{item.subtitle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-sand-100/80 border-t border-sand-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>{totalResults} items found across intelligence modules</span>
          <span>Press ESC or click outside to close</span>
        </div>
      </div>
    </div>
  );
}
