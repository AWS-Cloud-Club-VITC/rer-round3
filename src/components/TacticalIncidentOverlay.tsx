import React, { useState } from 'react';
import { X, ShieldAlert, Zap, AlertTriangle, Radio, Lock, CheckCircle2 } from 'lucide-react';
import type { CityRiskOutput } from '../types/dashboard';

interface TacticalIncidentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  riskOutput?: CityRiskOutput;
}

export const TacticalIncidentOverlay: React.FC<TacticalIncidentOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  const [emergencyRouting, setEmergencyRouting] = useState<boolean>(true);
  const [gridPriority, setGridPriority] = useState<string>('Metro Core');
  const [responseLevel, setResponseLevel] = useState<'STANDARD' | 'HIGH' | 'MAXIMUM'>('HIGH');
  const [sirenActive, setSirenActive] = useState<boolean>(false);
  const [sectorLockdown, setSectorLockdown] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in select-none">
      <div className="w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col justify-between max-h-[92vh]">
        
        {/* Top Command Banner */}
        <div className="p-5 bg-gradient-to-r from-blue-900/80 via-slate-900 to-slate-900 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400">
              <ShieldAlert className="w-6 h-6 animate-pulse text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 uppercase">
                  TACTICAL OVERRIDE ACTIVE
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                Tactical Incident Emergency Command Mode
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>EXIT OVERRIDE</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Active Incident Status Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-cyan-300">
              <span className="font-bold uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Active Incident Telemetry Log
              </span>
              <span className="text-[10px] text-slate-400">ID #INC-2041-TACTICAL</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Incident Type</span>
                <span className="font-bold text-amber-400">Power Grid Instability</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Affected District</span>
                <span className="font-bold text-white">Metro Core</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Current Grid Load</span>
                <span className="font-bold text-rose-400">91% (CRITICAL)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Emergency Routing</span>
                <span className="font-bold text-emerald-400">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Interactive Tactical Controls */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Emergency Command Controls
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              
              {/* Control 1: Emergency Routing */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold">Emergency Routing</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Clears signals for EV dispatch units.
                </p>
                <button
                  onClick={() => setEmergencyRouting(!emergencyRouting)}
                  className={`w-full py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    emergencyRouting
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                  }`}
                >
                  {emergencyRouting ? '[ ACTIVE ]' : '[ STANDBY ]'}
                </button>
              </div>

              {/* Control 2: Grid Priority */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold">Grid Priority Zone</span>
                  <Radio className="w-4 h-4 text-cyan-400" />
                </div>
                <select
                  value={gridPriority}
                  onChange={(e) => setGridPriority(e.target.value)}
                  className="w-full py-1.5 px-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Metro Core">Metro Core</option>
                  <option value="Eco Industrial Zone">Eco Industrial Zone</option>
                  <option value="Waterfront Tech Hub">Waterfront Tech Hub</option>
                  <option value="All Districts">All Districts</option>
                </select>
                <div className="text-[10px] text-cyan-300">
                  Priority: <span className="font-bold">{gridPriority}</span>
                </div>
              </div>

              {/* Control 3: Response Level */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold">Response Level</span>
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {(['STANDARD', 'HIGH', 'MAXIMUM'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setResponseLevel(lvl)}
                      className={`py-1.5 text-[10px] font-bold rounded transition-all cursor-pointer ${
                        responseLevel === lvl
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Subsystem Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setSirenActive(!sirenActive)}
                className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                  sirenActive
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Radio className={`w-4 h-4 ${sirenActive ? 'animate-bounce text-rose-400' : 'text-slate-500'}`} />
                  <span>District Emergency Sirens</span>
                </div>
                <span>{sirenActive ? '[ SIREN ON ]' : '[ OFF ]'}</span>
              </button>

              <button
                onClick={() => setSectorLockdown(!sectorLockdown)}
                className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                  sectorLockdown
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lock className={`w-4 h-4 ${sectorLockdown ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>Freight Gate Lockdown</span>
                </div>
                <span>{sectorLockdown ? '[ LOCKED ]' : '[ UNLOCKED ]'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tactical Mode Synchronized (Node #882-V)</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono transition-all shadow-md cursor-pointer"
          >
            CONFIRM & EXIT OVERRIDE
          </button>
        </div>
      </div>
    </div>
  );
};
