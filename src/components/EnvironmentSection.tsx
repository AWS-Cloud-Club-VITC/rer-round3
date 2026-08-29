import React from 'react';
import { Wind, Leaf, Thermometer } from 'lucide-react';

export const EnvironmentSection: React.FC = () => {
  const pollutantBreakdown = [
    { name: 'PM2.5 (Fine Particulate)', value: '18.0 µg/m³', status: 'Good', target: '< 25.0', pct: 45 },
    { name: 'PM10 (Coarse Particulate)', value: '31.0 µg/m³', status: 'Good', target: '< 45.0', pct: 55 },
    { name: 'CO₂ (Carbon Dioxide)', value: '412 PPM', status: 'Nominal', target: '< 450', pct: 72 },
    { name: 'NO₂ (Nitrogen Dioxide)', value: '18.4 PPB', status: 'Optimal', target: '< 25.0', pct: 38 },
  ];

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="saas-card p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wind className="w-5 h-5 text-blue-600" />
            Environmental Monitoring
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous air quality monitoring, bio-scrubber efficiency, and green canopy metrics
          </p>
        </div>

        {/* Main AQI Display Badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200">
          <span className="text-xs font-medium text-slate-600">Air Quality Index:</span>
          <span className="text-2xl font-bold text-blue-700 font-mono">58</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
            Good
          </span>
        </div>
      </div>

      {/* Component Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pollutantBreakdown.map((item, idx) => (
          <div key={idx} className="saas-card p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">{item.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {item.status}
              </span>
            </div>
            <div className="text-xl font-bold text-slate-900 mt-2 font-mono">{item.value}</div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Safe Limit: {item.target}</span>
                <span>{item.pct}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.pct}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bio-Canopy & Climate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="saas-card p-5 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Leaf className="w-4.5 h-4.5 text-emerald-600" />
            Green Canopy Coverage
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            42.4% total district land allocated to bio-parks, rooftop solar gardens, and carbon absorption zones.
          </p>
          <div className="mt-4 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs font-mono text-emerald-900 space-y-1.5">
            <div className="flex justify-between">
              <span className="font-sans">Carbon Absorption:</span>
              <span className="font-bold">18.4 Tons / Hour</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">Urban Heat Reduction:</span>
              <span className="font-bold">-2.8°C Delta</span>
            </div>
          </div>
        </div>

        <div className="saas-card p-5 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Thermometer className="w-4.5 h-4.5 text-amber-600" />
            Micro-Climate & Acoustic Telemetry
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time urban heat sensors and acoustic decibel meters to maintain livability standards.
          </p>
          <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-amber-900 space-y-1.5">
            <div className="flex justify-between">
              <span className="font-sans">Average Ambient Temp:</span>
              <span className="font-bold">24.6°C</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">Urban Noise Level:</span>
              <span className="font-bold">52 dB (Nominal)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
