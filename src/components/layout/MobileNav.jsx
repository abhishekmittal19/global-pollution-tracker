import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Leaf, Layers } from 'lucide-react';
import { NAV_ITEMS } from './Sidebar';
import { API_CONFIG } from '../../services/api';

export default function MobileNav({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-sand-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-800 text-white flex items-center justify-center">
                <Leaf className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <span className="block font-bold text-xs text-forest-950">GPCI Intelligence</span>
                <span className="text-[10px] text-slate-500">Environmental Platform</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-sand-100"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="p-3 space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all
                    ${isActive
                      ? 'bg-forest-800 text-white font-semibold'
                      : 'text-slate-700 hover:bg-sand-100 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-sand-200 bg-sand-50 text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Mode:</span>
            <span className="font-semibold text-forest-900">
              {API_CONFIG.isLocal ? 'Verified Local Data' : 'MERN API'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
