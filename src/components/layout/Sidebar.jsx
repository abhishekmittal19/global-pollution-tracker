import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe2,
  GitCompare,
  Flame,
  FileText,
  BookOpen,
  Building2,
  Database,
  Info,
  Layers,
  Leaf
} from 'lucide-react';
import { API_CONFIG } from '../../services/api';

export const NAV_ITEMS = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Country Explorer', path: '/countries', icon: Globe2 },
  { name: 'Compare Countries', path: '/compare', icon: GitCompare },
  { name: 'Pollution & Emissions', path: '/emissions', icon: Flame },
  { name: 'Policies & Schemes', path: '/policies', icon: FileText },
  { name: 'Methodologies', path: '/methodologies', icon: BookOpen },
  { name: 'People & Organizations', path: '/organizations', icon: Building2 },
  { name: 'Data Sources', path: '/data-sources', icon: Database },
  { name: 'About the Project', path: '/about', icon: Info },
];

export default function Sidebar({ className = '' }) {
  return (
    <aside className={`w-64 bg-white border-r border-sand-300 flex flex-col justify-between shrink-0 select-none ${className}`}>
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-sand-200">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-forest-800 text-white flex items-center justify-center shadow-subtle group-hover:bg-forest-900 transition-colors">
              <Leaf className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="block font-bold text-sm tracking-tight text-forest-950 leading-tight">
                Global Pollution &
              </span>
              <span className="block text-xs font-semibold text-forest-700 tracking-wide uppercase">
                Climate Intelligence
              </span>
            </div>
          </NavLink>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] text-slate-500 font-medium">
              GPCI Environmental Platform
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1" aria-label="Main Navigation">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Intelligence Modules
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all
                  ${isActive
                    ? 'bg-forest-800 text-white shadow-subtle font-semibold'
                    : 'text-slate-700 hover:bg-sand-100/90 hover:text-slate-900'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                    <span className="truncate">{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-sand-200 bg-sand-50/70 text-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <Layers className="w-3.5 h-3.5 text-forest-700" />
            <span>Service Mode:</span>
          </span>
          <span className="bg-sand-200/80 px-1.5 py-0.5 rounded font-mono text-[10px] text-forest-900 font-semibold">
            {API_CONFIG.isLocal ? 'Verified Local Data' : 'MERN API'}
          </span>
        </div>

        <div className="text-[10px] text-slate-400 leading-tight">
          Scientific data verified against UNFCCC, EDGAR v8.0, and GCP 2023.
        </div>
      </div>
    </aside>
  );
}
