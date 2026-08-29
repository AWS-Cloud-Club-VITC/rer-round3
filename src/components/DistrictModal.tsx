import React from 'react';
import { X, Video, Wind, Zap, Droplets, ShieldAlert, Cpu } from 'lucide-react';
import type { District } from '../types/dashboard';

interface DistrictModalProps {
  district: District | null;
  onClose: () => void;
}

export const DistrictModal: React.FC<DistrictModalProps> = ({ district, onClose }) => {
  if (!district) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/30 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-lg h-full bg-white border-l border-slate-200 p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {district.code}
                </span>
                <span className="text-xs font-medium text-slate-500">{district.type}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{district.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Badge */}
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-600 font-medium">District Operational Status:</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              district.status === 'Alert'
                ? 'bg-rose-100 text-rose-700 border border-rose-300'
                : district.status === 'Advisory'
                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            }`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              {district.status}
            </span>
          </div>

          {/* Optical Feed Preview */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
              <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
                <Video className="w-4 h-4 text-blue-600" /> Optical Sensor Feed (CAM-{district.code})
              </span>
              <span className="text-emerald-600 font-medium font-mono">60 FPS • Live Stream</span>
            </div>

            <div className="relative w-full h-40 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center text-white">
              <div className="text-center z-10 p-4">
                <Cpu className="w-7 h-7 text-blue-400 mx-auto mb-1.5 animate-pulse" />
                <p className="text-xs font-semibold text-slate-200">
                  AI Spatial Telemetry Active
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Resident Density: {district.population}
                </p>
              </div>
            </div>
          </div>

          {/* District Vitals Grid */}
          <div className="mt-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              District Realtime Diagnostics
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Wind className="w-3.5 h-3.5 text-blue-600" /> Air Quality
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
                  {district.aqi} <span className="text-xs text-slate-500 font-normal font-sans">AQI</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Zap className="w-3.5 h-3.5 text-amber-600" /> Traffic Load
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
                  {district.trafficDensity}% <span className="text-xs text-slate-500 font-normal font-sans">Density</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" /> Power Grid
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
                  {district.powerGridLoad}% <span className="text-xs text-slate-500 font-normal font-sans">Load</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Emergencies
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
                  {district.activeIncidents} <span className="text-xs text-slate-500 font-normal font-sans">Cases</span>
                </div>
              </div>
            </div>

            {/* Sensor Telemetry */}
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs font-mono space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">CO2 Ambient Level:</span>
                <span className="text-blue-900 font-bold">{district.telemetry.co2Ppm} PPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Solar Generation:</span>
                <span className="text-emerald-700 font-bold">{district.telemetry.solarGenerationMw} MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Active EV Slots:</span>
                <span className="text-blue-900 font-bold">{district.telemetry.evChargingActive} Slots</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Waste Capacity:</span>
                <span className="text-amber-700 font-bold">{district.telemetry.wasteBinCapacity}% Fill</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs"
          >
            Close Telemetry Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
