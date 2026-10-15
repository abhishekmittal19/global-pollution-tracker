import React from 'react';
import CO2EmissionsDashboard from './components/CO2EmissionsDashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b1320] text-slate-100 selection:bg-teal-500/30 selection:text-teal-200">
      <CO2EmissionsDashboard />
    </div>
  );
}
