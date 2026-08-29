import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';

interface WaterProblemSectionProps {
  leakDetection?: boolean;
}

export const WaterProblemSection: React.FC<WaterProblemSectionProps> = ({ leakDetection = false }) => {
  const [leakDetectedMode, setLeakDetectedMode] = useState<boolean>(false);

  const targetLossPercentage = leakDetection ? 18 : 32;
  const animatedLossPercentage = useAnimatedNumber(targetLossPercentage, 500);

  return (
    <section id="problem" className="py-24 lg:py-32 px-6 lg:px-14 bg-white border-y border-slate-200/80 relative overflow-hidden">
      
      {/* Background Warning Water Contour */}
      <div className="absolute top-1/3 right-1/4 -z-10 w-[500px] h-[500px] rounded-full bg-rose-50/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-rose-600 uppercase border-b border-rose-200 pb-1">
            03 · THE URBAN WATER CRISIS
          </span>
          <h2 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.88]">
            THE CITY <br />
            <span className={leakDetection ? "text-emerald-700" : "text-rose-600"}>
              {leakDetection ? "SEALS THE LEAK." : "LOSES WATER."}
            </span>
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-light leading-relaxed">
            {leakDetection
              ? "Active acoustic sensors and micro-pressure balance algorithms have isolated feeder fractures, stabilizing urban loss down to 18%."
              : "Aging municipal transmission arteries, pressure spikes, and undetected micro-fractures silently bleed millions of gallons from the river flow before it ever reaches a tap."}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL COMPOSITION: DATA INTEGRATED DIRECTLY WITH THE WATER STREAM     */}
        {/* ========================================================================= */}
        <div className="relative w-full py-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Huge Editorial Data Phrase Integrated with Water */}
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                MUNICIPAL TELEMETRY LOSS BENCHMARK
              </span>
              
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                THE CITY LOSES
              </div>

              {/* Giant Fluid Statistic */}
              <div className="flex items-baseline gap-2 py-2">
                <span className={`text-8xl sm:text-9xl lg:text-[10rem] font-black font-mono tracking-tighter leading-none transition-colors ${
                  leakDetection ? "text-emerald-600" : "text-rose-600"
                }`}>
                  {animatedLossPercentage}%
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
                OF ITS TRANSMITTED WATER
              </div>

              <p className="text-xs font-mono text-slate-400 pt-2">
                {leakDetection
                  ? "✓ Subterranean acoustic sensor loop active · Pressure stabilized at 4.2 Bar"
                  : "*Illustrative municipal benchmark telemetry across urban transmission feeder loops"}
              </p>
            </div>

            {/* Right: Flowing River Pipe with Integrated Anomaly Node */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                  ZONE 04 RIVER FEEDER TRANSMISSION
                </span>

                {/* Secret Hotspot Anomaly Node */}
                <button
                  onClick={() => setLeakDetectedMode(!leakDetectedMode)}
                  className={`inline-flex items-center gap-2 text-xs font-mono font-bold uppercase cursor-pointer hover:underline ${
                    leakDetection ? "text-emerald-700" : "text-rose-600"
                  }`}
                  title="Inspect River Anomaly"
                >
                  <span className={`w-2.5 h-2.5 rounded-full animate-ping ${
                    leakDetection ? "bg-emerald-600" : "bg-rose-600"
                  }`}></span>
                  <span>{leakDetection ? "[ ACOUSTIC SENSORS REPAIRED ]" : "[ PRESSURE ANOMALY DETECTED ]"}</span>
                </button>
              </div>

              {/* River Flow SVG */}
              <div className="bg-[#faf9f5] rounded-3xl border border-slate-200 p-6">
                <svg
                  className="w-full h-36 overflow-visible"
                  viewBox="0 0 500 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Main River Trunk */}
                  <path
                    d="M 20,60 C 120,60 180,40 260,40 C 340,40 400,80 480,80"
                    stroke="#0284c7"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="animate-water-flow"
                  />

                  {/* Leaking or Repaired Divergence */}
                  <path
                    d="M 260,40 C 300,40 320,85 360,105"
                    stroke={leakDetection ? "#10b981" : "#ef4444"}
                    strokeWidth={leakDetectedMode ? "6" : "4"}
                    strokeDasharray={leakDetection ? "none" : "4 6"}
                    strokeLinecap="round"
                    className={leakDetection ? "animate-water-flow" : "animate-water-flow-fast"}
                  />

                  {/* Anomaly Node Hotspot on the River */}
                  <g
                    onClick={() => setLeakDetectedMode(!leakDetectedMode)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="260"
                      cy="40"
                      r="16"
                      fill={leakDetection ? "#10b981" : "#ef4444"}
                      opacity="0.3"
                      className="animate-ping"
                    />
                    <circle
                      cx="260"
                      cy="40"
                      r="9"
                      fill={leakDetection ? "#059669" : "#dc2626"}
                    />
                    <circle cx="260" cy="40" r="3.5" fill="#ffffff" />
                  </g>

                  {/* Escaped Water Droplets */}
                  {!leakDetection && (
                    <>
                      <circle cx="330" cy="88" r="3" fill="#ef4444" className="animate-pulse" />
                      <circle cx="360" cy="105" r="4" fill="#ef4444" className="animate-pulse" />
                    </>
                  )}
                </svg>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>PRESSURE: 4.2 BAR</span>
                  <span className={leakDetection ? "text-emerald-700 font-bold" : "text-rose-600 font-bold"}>
                    {leakDetection ? "STATUS: SEALED & STABILIZED" : "STATUS: 1.24M L/DAY LOSS"}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* LIGHT EDITORIAL ACOUSTIC LEAK DETECTION MODAL (PRESERVED POPUP) */}
      {leakDetectedMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-xl modal-editorial-light rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 relative text-slate-900">
            <button
              onClick={() => setLeakDetectedMode(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
                <ShieldAlert className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-widest">
                  ACOUSTIC LEAK DETECTION ACTIVE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">Zone 04 Fracture Isolated</h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm font-light leading-relaxed">
              Continuous acoustic hydrophones detected a high-frequency micro-fissure along the main municipal feeder loop. Isolation protocol executed.
            </p>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Estimated Water Loss</span>
                <span className="text-xl font-bold text-rose-600">1,240,000 L / day</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Network Pressure</span>
                <span className="text-xl font-bold text-sky-700">4.2 Bar (Stabilized)</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Acoustic Peak</span>
                <span className="text-xl font-bold text-amber-600">840 Hz (Leak Signature)</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Isolation Valve</span>
                <span className="text-xl font-bold text-emerald-700">VALVE SHUT</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Smart pressure diversion active. Flow rerouted through Secondary Arterial Loop #04-C.</span>
            </div>

            <button
              onClick={() => setLeakDetectedMode(false)}
              className="w-full py-3 rounded-full bg-slate-950 hover:bg-sky-700 text-white font-bold text-xs uppercase font-mono tracking-widest transition-colors cursor-pointer"
            >
              CONFIRM & CLOSE LEAK DETECTION MODE
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
