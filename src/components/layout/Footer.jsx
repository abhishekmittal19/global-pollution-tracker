import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, Heart, Globe2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sand-300 bg-sand-100/60 py-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-forest-950 text-sm">
                Global Pollution & Climate Intelligence (GPCI)
              </span>
              <span className="bg-forest-100 text-forest-800 text-[10px] px-2 py-0.5 rounded font-mono font-medium">
                v1.0.0 Architecture
              </span>
            </div>
            <p className="text-slate-500 max-w-2xl leading-relaxed text-xs">
              An open, non-partisan environmental research platform dedicated to transparent emissions accounting,
              comparative national policy evaluation, and scientific methodology education.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <Link to="/about" className="text-slate-700 hover:text-forest-800">
              About Project
            </Link>
            <Link to="/methodologies" className="text-slate-700 hover:text-forest-800">
              Methodology
            </Link>
            <Link to="/data-sources" className="text-slate-700 hover:text-forest-800">
              Data Provenance
            </Link>
            <Link to="/compare" className="text-slate-700 hover:text-forest-800">
              Compare
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-sand-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
            <span>
              Primary Citations: UNFCCC National Inventories, EDGAR v8.0, Global Carbon Project (2023), IEA World Energy Balances.
            </span>
          </div>

          <div>
            Built with React & Vite. Data released under CC BY-4.0 Open Science.
          </div>
        </div>
      </div>
    </footer>
  );
}
