import React from 'react';
import { RotateCcw, CloudRain, ShieldCheck, Droplet } from 'lucide-react';

interface LivingRiverMapSectionProps {
  solutions: {
    recycling: boolean;
    rainwater: boolean;
    leakDetection: boolean;
  };
  onToggleSolution: (id: 'recycling' | 'rainwater' | 'leakDetection') => void;
  efficiencyScore: number;
}

export const LivingRiverMapSection: React.FC<LivingRiverMapSectionProps> = ({
  solutions,
  onToggleSolution,
  efficiencyScore,
}) => {
  return (
    <section id="solutions" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      
      {/* Top Section Header */}
      <div className="space-y-3 mb-12">
        <div className="text-[11px] font-mono font-bold tracking-widest text-cyan-800 uppercase">
          04 · INTERACTIVE WATERSHED SIMULATOR
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 font-sans">
            THE LIVING RIVER MAP.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right font-sans leading-relaxed">
            Watch the watershed map respond in real time as infrastructure solutions are activated or bypassed.
          </p>
        </div>
      </div>

      {/* 2-Column Layout (Exact Match to Reference Image 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Watershed River Network Map Canvas */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Top Canvas Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
            <span className="flex items-center gap-1.5 font-semibold text-cyan-900">
              <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
              WATERSHED RIVER NETWORK · DYNAMIC FLOW
            </span>
            <span>Flow: {efficiencyScore >= 75 ? 'Optimal' : 'Sub-Optimal'}</span>
          </div>

          {/* Map Card */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-[#faf9f6] border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xs">
            
            {/* SVG Interactive River Topology */}
            <div className="relative w-full h-full my-auto">
              <svg className="w-full h-full" viewBox="0 0 500 320" fill="none">
                
                {/* Main Arterial River Flow (Thick Dashed Stream) */}
                <path
                  d="M 50 60 C 140 60, 160 140, 240 180 C 320 220, 380 230, 460 260"
                  stroke="#0284c7"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="10 6"
                  className="animate-water-flow"
                />

                {/* Residential Branch (Curving to top right) */}
                <path
                  d="M 160 140 C 240 140, 320 100, 380 90"
                  stroke={solutions.rainwater ? '#0ea5e9' : '#94a3b8'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  className={solutions.rainwater ? 'animate-water-flow' : ''}
                />

                {/* Closed-Loop Recycling Circuit (Curving Bottom Return Line) */}
                {solutions.recycling && (
                  <path
                    d="M 330 200 C 240 280, 120 260, 160 140"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    className="animate-water-flow-fast"
                  />
                )}

                {/* Industrial Feeder Branch */}
                <path
                  d="M 330 200 C 370 240, 410 260, 440 270"
                  stroke={solutions.leakDetection ? '#0ea5e9' : '#f43f5e'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  className="animate-water-flow"
                />

                {/* Map Nodes & Labels (Exact positioning from reference) */}
                {/* 1. RESERVOIR */}
                <circle cx="50" cy="60" r="5" fill="#0284c7" />
                <text x="60" y="63" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  RESERVOIR
                </text>

                {/* 2. TREATMENT FACILITY */}
                <circle cx="160" cy="140" r="5" fill="#0284c7" />
                <text x="170" y="143" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  TREATMENT FACILITY
                </text>

                {/* 3. RESIDENTIAL (42%) */}
                <circle cx="380" cy="90" r="5" fill="#0284c7" />
                <text x="390" y="93" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  RESIDENTIAL (42%)
                </text>

                {/* 4. REUSE OUTLET */}
                <circle cx="330" cy="200" r="5" fill="#10b981" />
                <text x="340" y="203" fill="#047857" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  REUSE OUTLET
                </text>

                {/* 5. INDUSTRIAL (28%) */}
                <circle cx="440" cy="270" r="5" fill="#0284c7" />
                <text x="450" y="273" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  INDUSTRIAL (28%)
                </text>

                {/* Closed Loop Stream Label */}
                {solutions.recycling && (
                  <text x="140" y="270" fill="#059669" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    ↺ 74% CLOSED-LOOP RECYCLE STREAM
                  </text>
                )}

              </svg>
            </div>

            {/* Bottom Map Note */}
            <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <Droplet className="w-3 h-3 text-cyan-600 fill-cyan-600 shrink-0" />
              <span>Interact with the simulator controls on the right to manipulate watershed flows.</span>
            </div>

          </div>
        </div>

        {/* Right Column: Configuration Matrix & Telemetry */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Header */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold tracking-widest text-cyan-800 uppercase">
              CONFIGURATION MATRIX
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-sans tracking-tight">
              BUILD A BETTER WATER SYSTEM.
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Toggle municipal interventions to observe immediate watershed impact and efficiency calculation gains.
            </p>
          </div>

          {/* Solution Toggles List */}
          <div className="space-y-6 pt-2">
            
            {/* Toggle 1: WATER RECYCLING */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1 max-w-xs">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-slate-700" />
                  <span className="font-bold text-xs text-slate-950 uppercase font-sans">WATER RECYCLING</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Recirculates greywater and industrial effluent back into the municipal loop (+15% score).
                </p>
              </div>

              <button
                onClick={() => onToggleSolution('recycling')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono transition-colors cursor-pointer shrink-0 ${
                  solutions.recycling
                    ? 'bg-teal-700 hover:bg-teal-800 text-white'
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
                  <span className="font-bold text-xs text-slate-950 uppercase font-sans">RAINWATER HARVESTING</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Captures rooftop and permeable runoff to introduce a fresh tributary stream (+12% score).
                </p>
              </div>

              <button
                onClick={() => onToggleSolution('rainwater')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono transition-colors cursor-pointer shrink-0 ${
                  solutions.rainwater
                    ? 'bg-teal-700 hover:bg-teal-800 text-white'
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
                  <span className="font-bold text-xs text-slate-950 uppercase font-sans">LEAK DETECTION</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Acoustic sensors locate subterranean fractures to seal arterial loss (+14% score).
                </p>
              </div>

              <button
                onClick={() => onToggleSolution('leakDetection')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono transition-colors cursor-pointer shrink-0 ${
                  solutions.leakDetection
                    ? 'bg-teal-700 hover:bg-teal-800 text-white'
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
              <span className="text-xs font-bold text-slate-900 uppercase font-sans">
                WATER EFFICIENCY SCORE
              </span>
              <span className="text-3xl font-extrabold font-mono text-cyan-900">
                {efficiencyScore}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-600 to-cyan-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${efficiencyScore}%` }}
              />
            </div>

            {/* Baseline vs Target Labels */}
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
