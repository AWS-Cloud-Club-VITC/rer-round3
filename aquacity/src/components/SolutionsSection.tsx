import React from 'react';
import { RotateCcw, CloudRain, ShieldCheck, Droplet } from 'lucide-react';

interface SolutionsSectionProps {
  solutions: {
    recycling: boolean;
    rainwater: boolean;
    leakDetection: boolean;
  };
  onToggleSolution: (id: 'recycling' | 'rainwater' | 'leakDetection') => void;
  efficiencyScore: number;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  solutions,
  onToggleSolution,
  efficiencyScore,
}) => {
  // Single Source of Truth Geometry for Living River Map
  const mainFlowPath = "M 70 70 C 130 70, 150 160, 190 160 C 240 160, 310 210, 350 210 C 390 210, 430 260, 460 270";
  const residentialBranchPath = "M 190 160 C 260 160, 340 100, 400 90";
  const reuseLoopPath = "M 350 210 C 260 300, 120 280, 190 160"; // Perfect smooth closed loop returning to treatment
  const rainwaterTributaryPath = "M 320 30 C 280 60, 240 120, 190 160"; // Rainwater runoff entering treatment
  const leakBranchPath = "M 350 210 C 380 230, 400 270, 420 280";

  return (
    <section id="solutions" className="py-24 px-8 lg:px-16 max-w-7xl mx-auto border-t border-stone-200/80">
      
      {/* Section Header */}
      <div className="space-y-3 mb-14 select-none">
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#0284C7] uppercase">
          04 · INTERACTIVE WATERSHED SIMULATOR
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A192F] font-sans">
            THE LIVING RIVER MAP.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right font-normal leading-relaxed font-sans">
            Watch the watershed map respond in real time as infrastructure solutions are activated or bypassed.
          </p>
        </div>
      </div>

      {/* 2-Column Layout (55% / 45%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Watershed River Network Map Canvas */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1 select-none">
            <span className="flex items-center gap-1.5 font-semibold text-[#0284C7]">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]"></span>
              WATERSHED RIVER NETWORK · DYNAMIC FLOW
            </span>
            <span>Flow: {efficiencyScore >= 75 ? 'Optimal' : 'Sub-Optimal'}</span>
          </div>

          {/* Map Card Container */}
          <div className="w-full aspect-[4/3] rounded-[2rem] bg-[#FAFAF7] border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xs">
            
            {/* SVG Interactive River Topology */}
            <div className="relative w-full h-full my-auto">
              <svg
                className="w-full h-full"
                viewBox="0 0 520 340"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                
                {/* Main Arterial River Flow */}
                <path
                  d={mainFlowPath}
                  stroke="#0284C7"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="10 6"
                  className="animate-water-flow"
                />

                {/* Residential Branch */}
                <path
                  d={residentialBranchPath}
                  stroke={solutions.rainwater ? '#0284C7' : '#94A3B8'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  className={solutions.rainwater ? 'animate-water-flow' : ''}
                />

                {/* Rainwater Tributary Stream (When Active) */}
                {solutions.rainwater && (
                  <path
                    d={rainwaterTributaryPath}
                    stroke="#38BDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="5 3"
                    className="animate-water-flow-fast"
                  />
                )}

                {/* Perfect Closed-Loop Recycling Circuit */}
                {solutions.recycling && (
                  <path
                    d={reuseLoopPath}
                    stroke="#059669"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    className="animate-water-flow-fast"
                  />
                )}

                {/* Leak Fracture Bleed Stream (If leakDetection is OFF) */}
                {!solutions.leakDetection && (
                  <path
                    d={leakBranchPath}
                    stroke="#f43f5e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                    className="animate-pulse"
                  />
                )}

                {/* Industrial Feeder Branch */}
                <path
                  d="M 350 210 C 390 210, 430 260, 460 270"
                  stroke={solutions.leakDetection ? '#0284C7' : '#f43f5e'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  className="animate-water-flow"
                />

                {/* Map Nodes & Exact Labels */}
                {/* 1. RESERVOIR */}
                <circle cx="70" cy="70" r="5.5" fill="#0284C7" />
                <text x="80" y="73" fill="#0A192F" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  RESERVOIR
                </text>

                {/* 2. TREATMENT FACILITY */}
                <circle cx="190" cy="160" r="6" fill="#0284C7" />
                <text x="202" y="163" fill="#0A192F" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  TREATMENT FACILITY
                </text>

                {/* 3. RESIDENTIAL (42%) */}
                <circle cx="400" cy="90" r="5.5" fill="#0284C7" />
                <text x="412" y="93" fill="#0A192F" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  RESIDENTIAL (42%)
                </text>

                {/* 4. REUSE OUTLET */}
                <circle cx="350" cy="210" r="6" fill="#059669" />
                <text x="362" y="213" fill="#059669" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  REUSE OUTLET
                </text>

                {/* 5. INDUSTRIAL (28%) */}
                <circle cx="460" cy="270" r="5.5" fill="#0284C7" />
                <text x="472" y="273" fill="#0A192F" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  INDUSTRIAL (28%)
                </text>

                {/* Dynamic Labels based on Controls */}
                {solutions.recycling && (
                  <text x="170" y="280" fill="#059669" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                    ↺ 74% CLOSED-LOOP RECYCLE STREAM
                  </text>
                )}

                {solutions.rainwater && (
                  <text x="330" y="25" fill="#0284C7" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    ☂ +12% RAINWATER TRIBUTARY
                  </text>
                )}

              </svg>
            </div>

            {/* Bottom Map Note */}
            <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500 select-none">
              <Droplet className="w-3 h-3 text-[#0284C7] fill-[#0284C7] shrink-0" />
              <span>Interact with the simulator controls on the right to manipulate watershed flows.</span>
            </div>

          </div>
        </div>

        {/* Right Column: Configuration Matrix & Telemetry */}
        <div className="lg:col-span-5 space-y-8 select-none">
          
          {/* Header */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold tracking-widest text-[#0284C7] uppercase">
              CONFIGURATION MATRIX
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-sans tracking-tight">
              BUILD A BETTER WATER SYSTEM.
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Toggle municipal interventions to observe immediate watershed impact and efficiency calculation gains.
            </p>
          </div>

          {/* Solution Toggles */}
          <div className="space-y-6 pt-2">
            
            {/* Toggle 1: WATER RECYCLING */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1 max-w-xs">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-slate-700" />
                  <span className="font-bold text-xs text-[#0A192F] uppercase font-sans">WATER RECYCLING</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Recirculates greywater and industrial effluent back into the municipal loop (+15% score).
                </p>
              </div>

              <button
                onClick={() => onToggleSolution('recycling')}
                className={`w-12 py-1 rounded-full text-[10px] font-bold font-mono transition-colors cursor-pointer shrink-0 text-center ${
                  solutions.recycling
                    ? 'bg-[#0F766E] hover:bg-[#115E59] text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-slate-500'
                }`}
              >
                {solutions.recycling ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Toggle 2: RAINWATER HARVESTING */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1 max-w-xs">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-3.5 h-3.5 text-slate-700" />
                  <span className="font-bold text-xs text-[#0A192F] uppercase font-sans">RAINWATER HARVESTING</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Captures rooftop and permeable runoff to introduce a fresh tributary stream (+12% score).
                </p>
              </div>

              <button
                onClick={() => onToggleSolution('rainwater')}
                className={`w-12 py-1 rounded-full text-[10px] font-bold font-mono transition-colors cursor-pointer shrink-0 text-center ${
                  solutions.rainwater
                    ? 'bg-[#0F766E] hover:bg-[#115E59] text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-slate-500'
                }`}
              >
                {solutions.rainwater ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Toggle 3: LEAK DETECTION */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1 max-w-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                  <span className="font-bold text-xs text-[#0A192F] uppercase font-sans">LEAK DETECTION</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Acoustic sensors locate subterranean fractures to seal arterial loss (+14% score).
                </p>
              </div>

              <button
                onClick={() => onToggleSolution('leakDetection')}
                className={`w-12 py-1 rounded-full text-[10px] font-bold font-mono transition-colors cursor-pointer shrink-0 text-center ${
                  solutions.leakDetection
                    ? 'bg-[#0F766E] hover:bg-[#115E59] text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-slate-500'
                }`}
              >
                {solutions.leakDetection ? 'ON' : 'OFF'}
              </button>
            </div>

          </div>

          {/* Bottom Composite System Telemetry */}
          <div className="space-y-3 pt-2">
            <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              COMPOSITE SYSTEM TELEMETRY
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#0A192F] uppercase font-sans">
                WATER EFFICIENCY SCORE
              </span>
              <span className="text-3xl font-extrabold font-mono text-[#0A192F]">
                {efficiencyScore}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0284C7] to-[#0D9488] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${efficiencyScore}%` }}
              />
            </div>

            {/* Baseline vs Target */}
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>55% BASELINE</span>
              <span>TARGET: 96%</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
