import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import type { District } from '../types/dashboard';

interface DistrictMapProps {
  districts: District[];
  selectedDistrict: District | null;
  onSelectDistrict: (district: District) => void;
}

export const DistrictMap: React.FC<DistrictMapProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Alert':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Advisory':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="saas-card p-5 border border-slate-200 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Navigation className="w-4.5 h-4.5 text-blue-600" />
            City Operations Map
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Live district and infrastructure overview
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Nominal
          </span>
          <span className="flex items-center gap-1.5 text-amber-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Advisory
          </span>
          <span className="flex items-center gap-1.5 text-rose-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Alert
          </span>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="relative w-full h-[330px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
        
        {/* Subtle Light Grid Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
          <defs>
            <pattern id="light-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#light-grid-pattern)" />
        </svg>

        {/* Radar Line Sweep */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-blue-300/30 pointer-events-none flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-radar origin-center"></div>
        </div>

        {/* District Node Markers */}
        {districts.map((d) => {
          const isSelected = selectedDistrict?.id === d.id;

          return (
            <button
              key={d.id}
              onClick={() => onSelectDistrict(d)}
              style={{ top: `${d.coordinates.y}%`, left: `${d.coordinates.x}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10 ${
                isSelected ? 'scale-110 z-20' : 'hover:scale-105'
              }`}
            >
              <div className="relative flex items-center justify-center">
                {d.riskLevel !== 'NORMAL' && (
                  <span className={`absolute inline-flex h-7 w-7 rounded-full opacity-25 animate-ping ${
                    d.riskLevel === 'CRITICAL' ? 'bg-rose-500' : 'bg-amber-500'
                  }`}></span>
                )}

                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-xs border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400/40'
                    : 'bg-white text-slate-800 border-slate-300 group-hover:border-blue-500 group-hover:text-blue-600'
                }`}>
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  <span>{d.name}</span>
                </div>
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover:block w-44 p-2.5 rounded-lg bg-slate-900 text-white shadow-xl text-xs z-30 pointer-events-none border border-slate-800">
                <div className="font-bold">{d.name}</div>
                <div className="flex justify-between mt-1 text-slate-300 font-mono text-[11px]">
                  <span>AQI: {d.aqi}</span>
                  <span>Traffic: {d.trafficDensity}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* District Grid Badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
        {districts.map((d) => {
          const isSelected = selectedDistrict?.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onSelectDistrict(d)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/30'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">{d.code}</span>
                <span className={`px-1.5 py-0.2 text-[9px] rounded font-semibold border ${getStatusBadge(d.status)}`}>
                  {d.status}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1 truncate">{d.name}</div>
              <div className="text-[11px] text-slate-500 mt-1 flex justify-between font-mono">
                <span>AQI {d.aqi}</span>
                <span>{d.trafficDensity}% Traffic</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
