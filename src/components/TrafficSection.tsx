import React, { useState } from 'react';
import { Car, Zap, ShieldCheck, RefreshCw } from 'lucide-react';
import type { TransitLineStatus } from '../types/dashboard';

interface TrafficSectionProps {
  transitLines: TransitLineStatus[];
}

export const TrafficSection: React.FC<TrafficSectionProps> = ({ transitLines }) => {
  const [signalMode, setSignalMode] = useState<'AUTOMATED' | 'ECO_PRIORITY' | 'EMERGENCY_CORRIDOR'>('AUTOMATED');
  const [reroutingActive, setReroutingActive] = useState<boolean>(false);

  const handleToggleReroute = () => {
    setReroutingActive(true);
    setTimeout(() => setReroutingActive(false), 1500);
  };

  // Dynamically transform transit telemetry based on live Signal Mode
  const currentTransitLines = transitLines.map((line) => {
    if (signalMode === 'ECO_PRIORITY') {
      if (line.id === 'TR-04') {
        return { ...line, status: 'Express Green Wave', capacityUsage: 32 };
      }
      if (line.id === 'TR-03') {
        return { ...line, status: 'On Time (Optimized)', capacityUsage: 62 };
      }
      return { ...line, capacityUsage: Math.max(line.capacityUsage - 10, 20) };
    }
    if (signalMode === 'EMERGENCY_CORRIDOR') {
      return {
        ...line,
        status: 'Emergency Priority Corridor',
        capacityUsage: Math.min(line.capacityUsage, 25),
      };
    }
    return line; // AUTOMATED / Default
  });

  return (
    <div className="space-y-4">
      {/* Card Header & Controls */}
      <div className="saas-card p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            Mobility & Traffic
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time transit telemetry, signal optimization, and EV corridor monitoring
          </p>
        </div>

        {/* Stateful Traffic Signal Mode Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500 pl-2 font-medium">Signal Mode:</span>
          <button
            onClick={() => setSignalMode('AUTOMATED')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              signalMode === 'AUTOMATED'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            AI Auto-Balance
          </button>
          <button
            onClick={() => setSignalMode('ECO_PRIORITY')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              signalMode === 'ECO_PRIORITY'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Eco Bus Priority
          </button>
          <button
            onClick={() => setSignalMode('EMERGENCY_CORRIDOR')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              signalMode === 'EMERGENCY_CORRIDOR'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Emergency Wave
          </button>
        </div>
      </div>

      {/* Mode Status Indicator Banner */}
      <div className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
        signalMode === 'EMERGENCY_CORRIDOR'
          ? 'bg-rose-50 border-rose-200 text-rose-800'
          : signalMode === 'ECO_PRIORITY'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
          <span className="font-bold">Active Signal Mode: {signalMode}</span>
        </div>
        <span className="text-[11px] text-slate-500 font-sans">
          {signalMode === 'AUTOMATED' && 'Standard citywide AI flow balancing'}
          {signalMode === 'ECO_PRIORITY' && 'High-occupancy bus priority signals active'}
          {signalMode === 'EMERGENCY_CORRIDOR' && 'Emergency vehicle green wave clearance active'}
        </span>
      </div>

      {/* Transit Lines Status Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentTransitLines.map((line) => (
          <div key={line.id} className="saas-card p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700 font-bold">{line.mode}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                line.status.includes('Emergency')
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : line.status.includes('On Time') || line.status.includes('Express')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                ● {line.status}
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 mt-2 truncate">{line.name}</div>
            
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              <div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Capacity Usage:</span>
                  <span className="text-blue-700 font-bold font-mono">{line.capacityUsage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${line.capacityUsage > 80 ? 'bg-amber-500' : 'bg-blue-600'}`} 
                    style={{ width: `${line.capacityUsage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Active Vehicles:</span>
                <span className="text-slate-800 font-semibold">{line.activeVehicles} Units</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Green Wave Action Bar */}
      <div className="saas-card p-4 border border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Dynamic Green Wave Rerouting</h3>
            <p className="text-xs text-slate-500">
              Dispatches green signal waves across high-density corridors to reduce idle emissions.
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleReroute}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
        >
          {reroutingActive ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Optimizing Signals...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Trigger Green Wave</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
