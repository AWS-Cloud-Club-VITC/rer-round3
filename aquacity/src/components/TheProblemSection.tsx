import React from 'react';
import { Check } from 'lucide-react';

interface TheProblemSectionProps {
  isLeakRepaired: boolean;
  onTriggerLeakDetection: () => void;
}

export const TheProblemSection: React.FC<TheProblemSectionProps> = ({
  isLeakRepaired,
  onTriggerLeakDetection,
}) => {
  return (
    <section id="problem" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      
      {/* Top Section Tag */}
      <div className="space-y-3 mb-12">
        <div className="text-[11px] font-mono font-bold tracking-widest text-rose-600 uppercase">
          03 · THE URBAN WATER CRISIS
        </div>

        {/* Section Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 font-sans leading-[0.95]">
          THE CITY<br />
          <span className={isLeakRepaired ? 'text-emerald-700' : 'text-rose-600'}>
            {isLeakRepaired ? 'SEALS THE LEAK.' : 'LOSES WATER.'}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-sans leading-relaxed pt-1">
          {isLeakRepaired
            ? 'Active acoustic sensors and micro-pressure balance algorithms have isolated feeder fractures, stabilizing urban loss down to 18%.'
            : 'Aging pipelines and unmonitored subterranean fissures silently bleed billions of liters before reaching household taps.'}
        </p>
      </div>

      {/* 2-Column Telemetry Matrix (Exact Match to Reference Image 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Municipal Telemetry Loss Benchmark */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
            MUNICIPAL TELEMETRY LOSS BENCHMARK
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-sans tracking-tight uppercase">
              THE CITY LOSES
            </h3>

            {/* Huge Number */}
            <div className={`text-7xl sm:text-8xl lg:text-9xl font-black font-sans tracking-tighter ${
              isLeakRepaired ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {isLeakRepaired ? '18%' : '32%'}
            </div>

            <div className="text-sm sm:text-base font-extrabold text-slate-950 uppercase tracking-tight font-sans">
              OF ITS TRANSMITTED WATER
            </div>
          </div>

          {/* Subterranean Note */}
          <div className="pt-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {isLeakRepaired
                ? 'Subterranean acoustic sensor loop active · Pressure stabilized at 4.2 Bar'
                : 'Acoustic discrepancy detected at Zone 04 feeder · Pressure at 2.1 Bar'}
            </span>
          </div>

        </div>

        {/* Right Column: Zone 04 River Feeder Transmission Graph Card */}
        <div className="lg:col-span-7 space-y-2">
          
          {/* Top Bar on Right Card */}
          <div className="flex items-center justify-between text-[10px] font-mono px-1">
            <span className="text-slate-500 font-bold uppercase tracking-wider">
              ZONE 04 RIVER FEEDER TRANSMISSION
            </span>
            <span className={isLeakRepaired ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold animate-pulse'}>
              {isLeakRepaired ? '[ ACOUSTIC SENSORS REPAIRED ]' : '[ LEAK DETECTED · CLICK TO INSPECT ]'}
            </span>
          </div>

          {/* Graphical Transmission Card */}
          <div className="w-full aspect-[2/1] rounded-2xl bg-[#faf9f6] border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xs">
            
            {/* Interactive SVG Transmission Curve */}
            <div className="relative w-full h-full my-auto flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 450 160" fill="none">
                
                {/* Nominal Transmission Stream (Curving Main Pipe Line) */}
                <path
                  d="M 30 80 C 100 80, 180 50, 240 60 C 300 70, 360 100, 420 100"
                  stroke="#0284c7"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="10 6"
                  className="animate-water-flow"
                />

                {/* Subterranean Branch (Green if repaired, Red if leaking) */}
                <path
                  d="M 240 60 C 270 80, 290 120, 320 130"
                  stroke={isLeakRepaired ? '#10b981' : '#f43f5e'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="5 3"
                  className="animate-water-flow-fast"
                />

                {/* Interactive Hydrophone Sensor Node */}
                <circle
                  cx="240"
                  cy="60"
                  r="6"
                  fill="#ffffff"
                  stroke={isLeakRepaired ? '#10b981' : '#f43f5e'}
                  strokeWidth="3"
                  className="cursor-pointer"
                  onClick={onTriggerLeakDetection}
                />

              </svg>
            </div>

            {/* Bottom Card Status Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-stone-200/60">
              <span>PRESSURE: {isLeakRepaired ? '4.2 BAR' : '2.1 BAR'}</span>
              <span className={isLeakRepaired ? 'text-emerald-700 font-semibold' : 'text-rose-600 font-semibold'}>
                STATUS: {isLeakRepaired ? 'SEALED & STABILIZED' : 'UNISOLATED FRACTURE'}
              </span>
            </div>

          </div>

          {/* Click to inspect trigger note */}
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
