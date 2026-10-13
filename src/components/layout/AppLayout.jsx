import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import GlobalSearchModal from './GlobalSearchModal';
import ExportModal from '../common/ExportModal';
import Footer from './Footer';

const PAGE_TITLES = {
  '/': {
    title: 'Global Pollution & Climate Intelligence',
    subtitle: 'Explore environmental challenges, compare countries, and understand the policies shaping climate action.'
  },
  '/countries': {
    title: 'Country Explorer',
    subtitle: 'Searchable directory of national emissions profiles, renewable progress, and air quality metrics.'
  },
  '/compare': {
    title: 'Compare Countries',
    subtitle: 'Rigorous multi-country side-by-side indicator benchmark with standardized accounting boundaries.'
  },
  '/emissions': {
    title: 'Pollution & Emissions Intelligence',
    subtitle: 'Deep dive into greenhouse gas trajectories, sectoral allocations, and atmospheric pollutants.'
  },
  '/policies': {
    title: 'Policies & Schemes Explorer',
    subtitle: 'Catalog of verified statutory acts, renewable feed-in laws, and carbon trading mechanisms.'
  },
  '/methodologies': {
    title: 'Methodology & Accounting Explorer',
    subtitle: 'Understand the science of territorial vs consumption footprints, GWP weighting, and monitoring protocols.'
  },
  '/organizations': {
    title: 'People & Organizations Directory',
    subtitle: 'Verified researchers, environmental ministries, research institutes, and international climate bodies.'
  },
  '/data-sources': {
    title: 'Transparent Data Sources',
    subtitle: 'Complete provenance registry tracing all indicators back to their primary published repositories.'
  },
  '/about': {
    title: 'About the GPCI Project',
    subtitle: 'Mission, architecture, MERN API endpoints, and scientific governance guidelines.'
  }
};

export default function AppLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Global Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentMeta = PAGE_TITLES[location.pathname] || {
    title: 'Environmental Intelligence',
    subtitle: 'Global Pollution & Climate Intelligence'
  };

  return (
    <div className="min-h-screen bg-sand-50 text-slate-850 flex flex-col antialiased">
      <div className="flex flex-1 min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" />

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Shell */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            pageTitle={currentMeta.title}
            pageSubtitle={currentMeta.subtitle}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Export Intelligence Dialog */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={{ exportedAt: new Date().toISOString(), platform: 'GPCI Intelligence' }}
      />
    </div>
  );
}
