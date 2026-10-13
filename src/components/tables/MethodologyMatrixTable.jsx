import React from 'react';

export default function MethodologyMatrixTable({ matrix = [] }) {
  if (!matrix || matrix.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-sand-300 shadow-card overflow-hidden">
      <div className="p-4 bg-sand-100/80 border-b border-sand-300">
        <h4 className="font-semibold text-slate-850 text-sm">
          Comparative Architecture: Official Inventories vs. Independent Tracking Models
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Understanding data latency, verification standards, and analytical boundaries across global databases.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-sand-50 border-b border-sand-200 text-slate-700">
              <th className="p-3 font-semibold w-1/5 min-w-[140px]">Evaluation Dimension</th>
              <th className="p-3 font-semibold text-forest-900 min-w-[180px] bg-forest-50/40">
                UNFCCC National Inventories
              </th>
              <th className="p-3 font-semibold text-slate-900 min-w-[180px]">
                EDGAR (European Commission JRC)
              </th>
              <th className="p-3 font-semibold text-slate-900 min-w-[180px]">
                Climate TRACE (Satellite & AI)
              </th>
              <th className="p-3 font-semibold text-slate-900 min-w-[180px]">
                Global Carbon Project (GCP)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200">
            {matrix.map((row, idx) => (
              <tr key={idx} className="hover:bg-sand-50/50 transition-colors">
                <td className="p-3 font-semibold text-slate-800 bg-sand-50/30">
                  {row.feature}
                </td>
                <td className="p-3 text-slate-700 leading-relaxed bg-forest-50/20">
                  {row.unfccc}
                </td>
                <td className="p-3 text-slate-700 leading-relaxed">
                  {row.edgar}
                </td>
                <td className="p-3 text-slate-700 leading-relaxed">
                  {row.climateTrace}
                </td>
                <td className="p-3 text-slate-700 leading-relaxed">
                  {row.gcp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
