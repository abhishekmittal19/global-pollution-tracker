import React from 'react';
import { Menu, Search, Download, HelpCircle, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

export default function Header({
  pageTitle,
  pageSubtitle,
  onOpenSearch,
  onOpenMobileMenu,
  onOpenExport,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-sand-300 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-sand-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-forest-950 tracking-tight leading-tight">
                {pageTitle || 'Global Pollution & Climate Intelligence'}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-forest-50 text-forest-800 px-2 py-0.5 rounded-full font-medium border border-forest-200">
                <ShieldCheck className="w-3 h-3 text-forest-700" />
                <span>Open Science</span>
              </span>
            </div>
            {pageSubtitle && (
              <p className="text-xs text-slate-500 hidden sm:block mt-0.5 max-w-xl truncate">
                {pageSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Search bar & Quick Actions */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200/80 border border-sand-200 text-xs text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-600"
            aria-label="Search environmental intelligence"
          >
            <Search className="w-4 h-4 text-forest-700" />
            <span className="hidden md:inline text-slate-500">Search database...</span>
            <kbd className="hidden lg:inline-block px-1 py-0.2 text-[10px] font-mono bg-white text-slate-500 rounded border border-sand-300 shadow-subtle">
              Ctrl K
            </kbd>
          </button>

          {/* Export Action */}
          {onOpenExport && (
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={onOpenExport}
              className="text-xs hidden sm:inline-flex"
            >
              Export
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
