import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileJson, Check } from 'lucide-react';
import Button from './Button';

export default function ExportModal({ isOpen, onClose, data, filename = 'gpci-environmental-data' }) {
  const [format, setFormat] = useState('csv');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    let blob;
    let extension = format;

    if (format === 'json') {
      const jsonStr = JSON.stringify(data, null, 2);
      blob = new Blob([jsonStr], { type: 'application/json' });
    } else {
      // Basic CSV flatten
      let csvContent = '';
      if (Array.isArray(data) && data.length > 0) {
        const headers = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object');
        csvContent += headers.join(',') + '\n';
        data.forEach(row => {
          const values = headers.map(header => {
            const val = row[header] ?? '';
            return `"${String(val).replace(/"/g, '""')}"`;
          });
          csvContent += values.join(',') + '\n';
        });
      } else {
        csvContent = 'metric,value\n' + Object.entries(data).map(([k, v]) => `"${k}","${v}"`).join('\n');
      }
      blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.${extension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl shadow-elevation border border-sand-300 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-sand-200">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-forest-700" />
            <h3 className="font-semibold text-slate-850">Export Intelligence Data</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-sand-100"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-sm">
          <p className="text-slate-600 text-xs leading-relaxed">
            Download current dataset for scientific evaluation, academic modeling, or local analysis. Citations and methodological metadata are retained.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Format</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all ${
                  format === 'csv'
                    ? 'border-forest-600 bg-forest-50/50 text-forest-900 ring-1 ring-forest-600'
                    : 'border-sand-300 bg-white hover:bg-sand-50 text-slate-700'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-forest-700 shrink-0" />
                <div>
                  <div className="font-medium text-xs">CSV Table</div>
                  <div className="text-[11px] text-slate-500">For Excel, R, Python</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all ${
                  format === 'json'
                    ? 'border-forest-600 bg-forest-50/50 text-forest-900 ring-1 ring-forest-600'
                    : 'border-sand-300 bg-white hover:bg-sand-50 text-slate-700'
                }`}
              >
                <FileJson className="w-5 h-5 text-forest-700 shrink-0" />
                <div>
                  <div className="font-medium text-xs">JSON Schema</div>
                  <div className="text-[11px] text-slate-500">For REST & MERN APIs</div>
                </div>
              </button>
            </div>
          </div>

          <div className="p-2.5 bg-sand-100 rounded text-[11px] text-slate-600 border border-sand-200">
            <strong>Provenance guarantee:</strong> Data licensed under CC BY 4.0 / Open Data. Reference: GPCI v1.0.0.
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-sand-200">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownload}
            icon={downloaded ? Check : Download}
          >
            {downloaded ? 'Exported!' : `Download .${format.toUpperCase()}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
