import React, { useState } from 'react';
import { RotateCcw, CloudRain, ShieldCheck, ShieldAlert, CheckCircle2, X, ArrowUpRight, Droplet } from 'lucide-react';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';

interface SolutionsSectionProps {
  waterRecycling: boolean;
  setWaterRecycling: (val: boolean) => void;
  rainwaterHarvesting: boolean;
  setRainwaterHarvesting: (val: boolean) => void;
  leakDetection: boolean;
  setLeakDetection: (val: boolean) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  waterRecycling,
  setWaterRecycling,
  rainwaterHarvesting,
  setRainwaterHarvesting,
  leakDetection,
  setLeakDetection,
}) => {
  const [anomalyModalOpen, setAnomalyModalOpen] = useState(false);

  // Dynamic Efficiency Score Calculation
  const baseScore = 55;
  const recyclingBonus = waterRecycling ? 15 : 0;
  const rainwaterBonus = rainwaterHarvesting ? 12 : 0;
  const leakBonus = leakDetection ? 14 : 0;
  const targetEfficiencyScore = Math.min(baseScore + recyclingBonus + rainwaterBonus + leakBonus, 96);

  // Smooth number counting animation
  const animatedScore = useAnimatedNumber(targetEfficiencyScore, 500);

  return (
    <section id="solutions" className="py-24 lg:py-32 px-6 lg:px-14 bg-white border-t border-slate-200/80 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-sky-700 uppercase">
              04 · INTERACTIVE WATERSHED SIMULATOR
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight uppercase mt-1">
              THE LIVING RIVER <span className="text-sky-700">MAP.</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md font-light">
            Watch the watershed map respond in real time as infrastructure solutions are activated or bypassed.
          </p>
        </div>

        {/* TWO-COLUMN EXPERIENCE (LEFT ~60% RIVER MAP, RIGHT ~40% SIMULATOR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN (~60%): ORGANIC INTERACTIVE RIVER MAP                         */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                WATERSHED RIVER NETWORK · DYNAMIC FLOW
              </span>
              <span className="text-xs font-mono text-slate-400">
                {leakDetection ? 'Flow: Optimal' : 'Flow: Loss in Zone 04'}
              </span>
            </div>

            {/* Interactive SVG River Map */}
            <div className="relative w-full aspect-[16/11] bg-[#faf9f5] rounded-3xl border border-slate-200/90 p-4 sm:p-6 overflow-hidden flex items-center justify-center shadow-xs">
              
              <svg
                className="w-full h-full overflow-visible select-none"
                viewBox="0 0 700 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="mapRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="35%" stopColor="#0284c7" />
                    <stop offset="70%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>

                  <linearGradient id="reuseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                {/* Watershed Terrain Contour Guides */}
                <path d="M 50,120 C 150,40 400,60 650,140" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 6" />
                <path d="M 50,300 C 200,240 450,260 650,380" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 6" />
                <path d="M 120,400 C 300,340 500,420 650,440" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                {/* 1. MAIN RIVER TRUNK */}
                <path
                  d="M 60,80 C 180,80 240,180 340,190 C 440,200 480,290 580,310 C 620,320 650,340 680,350"
                  stroke="#cbd5e1"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 60,80 C 180,80 240,180 340,190 C 440,200 480,290 580,310 C 620,320 650,340 680,350"
                  stroke="url(#mapRiverGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="animate-water-flow"
                />

                {/* 2. RESIDENTIAL BRANCH */}
                <path
                  d="M 340,190 C 380,140 440,120 520,110"
                  stroke="#38bdf8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="animate-water-flow"
                />

                {/* 3. INDUSTRIAL BRANCH */}
                <path
                  d="M 480,290 C 520,360 560,400 630,410"
                  stroke="#0284c7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="animate-water-flow-fast"
                />

                {/* DYNAMIC RESPONSE: WATER RECYCLING CIRCULAR RETURN LOOP */}
                {waterRecycling && (
                  <g className="animate-fade-in">
                    <path
                      d="M 630,410 C 660,450 560,460 420,440 C 260,420 180,360 220,240 C 240,180 300,190 340,190"
                      stroke="url(#reuseGrad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="8 8"
                      className="animate-water-flow-fast"
                    />
                    <text x="320" y="445" fill="#0d9488" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      ↺ 74% CLOSED-LOOP RECYCLE STREAM
                    </text>
                  </g>
                )}

                {/* DYNAMIC RESPONSE: RAINWATER HARVESTING FRESH TRIBUTARY */}
                {rainwaterHarvesting && (
                  <g className="animate-fade-in">
                    <path
                      d="M 380,20 C 390,80 370,120 340,190"
                      stroke="#06b6d4"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="6 6"
                      className="animate-water-flow-fast"
                    />
                    <circle cx="380" cy="20" r="6" fill="#06b6d4" className="animate-ping" />
                    <circle cx="380" cy="20" r="4" fill="#0284c7" />
                    <text x="395" y="30" fill="#0284c7" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      ↓ RAINWATER HARVESTING INFLOW (+32%)
                    </text>
                  </g>
                )}

                {/* DYNAMIC RESPONSE: ZONE 04 LEAK / REPAIR */}
                {leakDetection ? (
                  <g>
                    <path
                      d="M 340,190 C 380,220 420,240 480,290"
                      stroke="#10b981"
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="animate-water-flow"
                    />
                    <circle cx="410" cy="235" r="7" fill="#10b981" />
                    <circle cx="410" cy="235" r="3" fill="#ffffff" />
                  </g>
                ) : (
                  <g
                    onClick={() => setAnomalyModalOpen(true)}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 340,190 C 380,220 420,240 480,290"
                      stroke="#ef4444"
                      strokeWidth="6"
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                      className="animate-water-flow-fast"
                    />
                    <circle cx="410" cy="235" r="16" fill="#ef4444" opacity="0.3" className="animate-ping" />
                    <circle cx="410" cy="235" r="8" fill="#dc2626" />
                    <circle cx="410" cy="235" r="3" fill="#ffffff" />
                    <text x="430" y="240" fill="#dc2626" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      ⚠ PRESSURE ANOMALY
                    </text>
                  </g>
                )}

                {/* Watershed Labels Along the River */}
                <g transform="translate(40, 60)">
                  <circle cx="20" cy="20" r="7" fill="#0284c7" />
                  <text x="35" y="24" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="800">
                    RESERVOIR
                  </text>
                </g>

                <g transform="translate(190, 130)">
                  <circle cx="20" cy="20" r="7" fill="#0284c7" />
                  <text x="35" y="24" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="800">
                    TREATMENT FACILITY
                  </text>
                </g>

                <g transform="translate(520, 95)">
                  <circle cx="20" cy="20" r="7" fill="#0ea5e9" />
                  <text x="35" y="24" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="800">
                    RESIDENTIAL (42%)
                  </text>
                </g>

                <g transform="translate(560, 395)">
                  <circle cx="20" cy="20" r="7" fill="#0369a1" />
                  <text x="35" y="24" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="800">
                    INDUSTRIAL (28%)
                  </text>
                </g>

                <g transform="translate(480, 275)">
                  <circle cx="20" cy="20" r="7" fill="#10b981" />
                  <text x="35" y="24" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="800">
                    REUSE OUTLET
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-4 left-6 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <Droplet className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
                <span>Interact with the simulator controls on the right to manipulate watershed flows.</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN (~40%): SOLUTION SIMULATOR CONTROLS & WATER EFFICIENCY       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Header */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest block">
                CONFIGURATION MATRIX
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight">
                BUILD A BETTER WATER SYSTEM.
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Toggle municipal interventions to observe immediate watershed impact and efficiency calculation gains.
              </p>
            </div>

            {/* Clean Editorial Solution Rows */}
            <div className="space-y-6 border-t border-slate-200 pt-6">
              
              {/* Solution 1: Water Recycling */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-sky-700" />
                    <h4 className="text-base font-black text-slate-950 tracking-tight uppercase">
                      WATER RECYCLING
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Recirculates greywater and industrial effluent back into the municipal loop (+15% score).
                  </p>
                </div>

                <button
                  onClick={() => setWaterRecycling(!waterRecycling)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                    waterRecycling
                      ? 'bg-sky-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-800'
                  }`}
                >
                  {waterRecycling ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Solution 2: Rainwater Harvesting */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-4 h-4 text-cyan-700" />
                    <h4 className="text-base font-black text-slate-950 tracking-tight uppercase">
                      RAINWATER HARVESTING
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Captures rooftop and permeable runoff to introduce a fresh tributary stream (+12% score).
                  </p>
                </div>

                <button
                  onClick={() => setRainwaterHarvesting(!rainwaterHarvesting)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                    rainwaterHarvesting
                      ? 'bg-cyan-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-800'
                  }`}
                >
                  {rainwaterHarvesting ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Solution 3: Leak Detection */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-base font-black text-slate-950 tracking-tight uppercase">
                      LEAK DETECTION
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Acoustic sensors locate subterranean fractures to seal arterial loss (+14% score).
                  </p>
                </div>

                <button
                  onClick={() => setLeakDetection(!leakDetection)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                    leakDetection
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-800'
                  }`}
                >
                  {leakDetection ? 'ON' : 'OFF'}
                </button>
              </div>

            </div>

            {/* Dynamic Water Efficiency Score Connected to Flow Channel */}
            <div className="pt-2 space-y-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                COMPOSITE SYSTEM TELEMETRY
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                  WATER EFFICIENCY SCORE
                </span>
                <span className="text-5xl font-black font-mono text-sky-800 tracking-tight transition-all">
                  {animatedScore}%
                </span>
              </div>

              {/* Animated Flow Channel Tube */}
              <div className="w-full h-4 bg-sky-50 rounded-full border border-sky-200/80 p-0.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 via-sky-600 to-teal-500 rounded-full transition-all duration-500 animate-water-flow"
                  style={{ width: `${animatedScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>55% BASELINE</span>
                <span>TARGET: 96%</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* LIGHT EDITORIAL ACOUSTIC LEAK DETECTION MODAL (PRESERVED POPUP) */}
      {anomalyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-xl modal-editorial-light rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 relative text-slate-900">
            <button
              onClick={() => setAnomalyModalOpen(false)}
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
              onClick={() => {
                setLeakDetection(true);
                setAnomalyModalOpen(false);
              }}
              className="w-full py-3 rounded-full bg-slate-950 hover:bg-sky-700 text-white font-bold text-xs uppercase font-mono tracking-widest transition-colors cursor-pointer"
            >
              ACTIVATE LEAK REPAIR & CLOSE
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
