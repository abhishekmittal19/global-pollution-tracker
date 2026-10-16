import React from 'react';
import CO2EmissionsDashboard from './components/CO2EmissionsDashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] selection:bg-[#D9EFAB] selection:text-[#0c2340]">
      <CO2EmissionsDashboard />
    </div>
  );
}
