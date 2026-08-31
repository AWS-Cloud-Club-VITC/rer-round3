import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, Zap, Activity, CheckCircle2, Wrench, RefreshCw } from 'lucide-react';

interface LeakDetectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolveLeak: () => void;
}

export const LeakDetectionModal: React.FC<LeakDetectionModalProps> = ({
  isOpen,
  onClose,
  onResolveLeak,
}) => {
  const [valveClosed, setValveClosed] = useState<boolean>(false);
  const [rerouteActive, setRerouteActive] = useState<boolean>(false);
  const [isResolved, setIsResolved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleApplyResolution = () => {
    setValveClosed(true);
    setRerouteActive(true);
    setIsResolved(true);
    onResolveLeak();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 animate-fade-in select-none">
      <div className="w-full max-w-3xl bg-slate-900 border border-sky-500/40 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col justify-between max-h-[92vh]">
        
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-2xl border transition-colors ${
              isResolved ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400' : 'bg-rose-500/20 border-rose-400/40 text-rose-400'
            }`}>
              {isResolved ? (
                <ShieldCheck className="w-6 h-6 animate-pulse text-emerald-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 animate-bounce text-rose-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  isResolved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                }`}>
                  {isResolved ? 'FRACTURE ISOLATED & SECURED' : 'ACOUSTIC LEAK DETECTION ACTIVE'}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mt-1 font-display">
                Zone 04 Sub-Surface Diagnostic Mode
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>EXIT MODE</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-mono text-xs">
          
          {/* Telemetry Status Matrix */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-4">
            <div className="flex items-center justify-between text-cyan-300">
              <span className="font-bold uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Pipeline Acoustic Telemetry Record
              </span>
              <span className="text-[10px] text-slate-500">TAG #LK-4028-EAST</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Anomaly Location</span>
                <span className="font-bold text-white text-sm">Zone 04 East</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Estimated Loss</span>
                <span className={`font-bold text-sm ${isResolved ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isResolved ? '0 L/min (Stopped)' : '420 L/min'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Arterial Pressure</span>
                <span className={`font-bold text-sm ${isResolved ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isResolved ? '4.4 bar (Nominal)' : '2.1 bar (Drop)'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Acoustic Frequency</span>
                <span className="font-bold text-cyan-300 text-sm">18.4 kHz</span>
              </div>
            </div>
          </div>

          {/* Interactive Isolation & Repair Controls */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Emergency Hydro-Isolation Controls
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Control 1: Automated Isolation Valve */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Smart Gate Valve #7B</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Electromagnetically isolates fracture conduit to halt high-pressure water escape.
                </p>
                <button
                  onClick={() => setValveClosed(!valveClosed)}
                  className={`w-full py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                    valveClosed
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {valveClosed ? '[ VALVE CLOSED · ISOLATED ]' : '[ DEPLOY ISOLATION VALVE ]'}
                </button>
              </div>

              {/* Control 2: Grid Loop Rerouting */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Auxiliary Bypass Loop</span>
                  <RefreshCw className={`w-4 h-4 text-cyan-400 ${rerouteActive ? 'animate-spin' : ''}`} />
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Redirects residential supply through Secondary Ring 02 to maintain neighborhood pressure.
                </p>
                <button
                  onClick={() => setRerouteActive(!rerouteActive)}
                  className={`w-full py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                    rerouteActive
                      ? 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {rerouteActive ? '[ BYPASS LOOP ACTIVE ]' : '[ ACTIVATE BYPASS LOOP ]'}
                </button>
              </div>

            </div>
          </div>

          {/* Quick Action: Apply Full Solution */}
          {!isResolved ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950 to-slate-950 border border-sky-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <h5 className="font-bold text-white text-sm">Automate Complete Isolation & Recovery</h5>
                  <p className="text-xs text-slate-400 font-sans">
                    Instantly closes gate valves, activates bypass channels, and restores nominal pressure.
                  </p>
                </div>
              </div>

              <button
                onClick={handleApplyResolution}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0 cursor-pointer"
              >
                APPLY RESOLUTION →
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between text-emerald-300">
              <div className="flex items-center gap-2.5 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Zone 04 Leak Neutralized · Urban Efficiency Score Recalculated (+14% Gain)</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Hydro-Telemetry Synchronized · SDG 06.4 Target Met</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-mono transition-all cursor-pointer"
          >
            CONFIRM & RETURN TO OVERVIEW
          </button>
        </div>

      </div>
    </div>
  );
};
