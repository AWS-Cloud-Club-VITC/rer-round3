import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface WaterProblemSectionProps {
  isLeakRepaired: boolean;
  onTriggerLeakDetection: () => void;
}

export const WaterProblemSection: React.FC<WaterProblemSectionProps> = ({
  isLeakRepaired,
  onTriggerLeakDetection,
}) => {
  const [isNodeHovered, setIsNodeHovered] = useState(false);

  // Single Source of Truth Geometry for Feeder Line & Acoustic Branch
  const feederMainPath = "M 30 80 C 100 80, 180 50, 240 60 C 300 70, 360 100, 420 100";
  const feederBranchPath = "M 240 60 C 270 80, 290 120, 320 130";

  return (
    <section id="problem" className="py-24 px-8 lg:px-16 max-w-7xl mx-auto border-t border-stone-200/80">
      
      {/* Section Header */}
      <div className="space-y-3 mb-14 select-none">
        <div className="text-[11px] font-mono font-bold tracking-widest text-rose-600 uppercase">
          03 · THE URBAN WATER CRISIS
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] font-sans">
            <span className="text-[#0A192F] block">THE CITY</span>
            <span className={isLeakRepaired ? 'text-[#059669] block' : 'text-rose-600 block'}>
              {isLeakRepaired ? 'SEALS THE LEAK.' : 'LOSES WATER.'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed pt-1">
            {isLeakRepaired
              ? 'Active acoustic sensors and micro-pressure balance algorithms have isolated feeder fractures, stabilizing urban loss down to 18%.'
              : 'Aging pipelines and unmonitored subterranean fissures silently bleed billions of liters before reaching household taps.'}
          </p>
        </div>
      </div>

      {/* 2-Column Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Municipal Telemetry Loss Benchmark */}
        <div className="lg:col-span-5 space-y-4 select-none">
          
          <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
            MUNICIPAL TELEMETRY LOSS BENCHMARK
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] uppercase tracking-tight font-sans">
              THE CITY LOSES
            </h3>

            {/* Giant Percentage Number */}
            <div className={`text-7xl sm:text-8xl lg:text-9xl font-black font-sans tracking-tighter ${
              isLeakRepaired ? 'text-[#059669]' : 'text-rose-600'
            }`}>
              {isLeakRepaired ? '18%' : '32%'}
            </div>

            <div className="text-sm sm:text-base font-extrabold text-[#0A192F] uppercase tracking-tight font-sans">
              OF ITS TRANSMITTED WATER
            </div>
          </div>

          {/* Subterranean Sensor Note */}
          <div className="pt-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>
              {isLeakRepaired
                ? 'Subterranean acoustic sensor loop active · Pressure stabilized at 4.2 Bar'
                : 'Acoustic discrepancy detected at Zone 04 feeder · Pressure at 2.1 Bar'}
            </span>
          </div>

        </div>

        {/* Right Column: Zone 04 River Feeder Transmission Graph Card */}
        <div className="lg:col-span-7 space-y-2">
          
          {/* Top Card Bar */}
          <div className="flex items-center justify-between text-[10px] font-mono px-1 select-none">
            <span className="text-slate-500 font-bold uppercase tracking-wider">
              ZONE 04 · RIVER FEEDER TRANSMISSION
            </span>
            <span className={isLeakRepaired ? 'text-[#059669] font-bold' : 'text-rose-600 font-bold animate-pulse'}>
              {isLeakRepaired ? '[ ACOUSTIC SENSORS REPAIRED ]' : '[ LEAK DETECTED · CLICK TO INSPECT ]'}
            </span>
          </div>

          {/* Telemetry Card */}
          <div className="w-full aspect-[2/1] rounded-[2rem] bg-[#FAFAF7] border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xs">
            
            {/* SVG Pressure & Transmission Curve */}
            <div className="relative w-full h-full my-auto flex items-center justify-center">
              <svg
                className="w-full h-full"
                viewBox="0 0 450 160"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                
                {/* Nominal Transmission Stream (Thick Blue Dashed Line) */}
                <path
                  d={feederMainPath}
                  stroke="#0284C7"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="10 6"
                  className="animate-water-flow"
                />

                {/* Subterranean Branch (Green if repaired, Red if leaking) */}
                <path
                  d={feederBranchPath}
                  stroke={isLeakRepaired ? '#059669' : '#f43f5e'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="5 3"
                  className="animate-water-flow-fast"
                />

                {/* Interactive Hydrophone Sensor Node at x:240, y:60 */}
                <g
                  className="cursor-pointer"
                  onClick={onTriggerLeakDetection}
                  onMouseEnter={() => setIsNodeHovered(true)}
                  onMouseLeave={() => setIsNodeHovered(false)}
                >
                  {/* Invisible Hit Target */}
                  <circle cx="240" cy="60" r="30" fill="transparent" pointerEvents="all" />

                  {/* Concentric Node Circle */}
                  <circle
                    cx="240"
                    cy="60"
                    r={isNodeHovered ? 9 : 7}
                    fill="#FFFFFF"
                    stroke={isLeakRepaired ? '#059669' : '#f43f5e'}
                    strokeWidth="3"
                    style={{ transition: 'r 0.2s ease-out' }}
                  />
                  <circle
                    cx="240"
                    cy="60"
                    r={isNodeHovered ? 4 : 3}
                    fill={isLeakRepaired ? '#059669' : '#f43f5e'}
                  />
                </g>

              </svg>
            </div>

            {/* Bottom Card Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-stone-200/60 select-none">
              <span>PRESSURE: {isLeakRepaired ? '4.2 BAR' : '2.1 BAR'}</span>
              <span className={isLeakRepaired ? 'text-[#059669] font-semibold' : 'text-rose-600 font-semibold'}>
                STATUS: {isLeakRepaired ? 'SEALED & STABILIZED' : 'UNISOLATED FRACTURE'}
              </span>
            </div>

          </div>

          {/* Anomaly Inspection Trigger */}
          {!isLeakRepaired && (
            <div className="text-right">
              <button
                onClick={onTriggerLeakDetection}
                className="text-[11px] font-mono text-rose-600 hover:text-rose-800 underline font-semibold cursor-pointer"
              >
                Inspect Zone 04 Acoustic Anomaly (Diagnostic Mode) →
              </button>
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
