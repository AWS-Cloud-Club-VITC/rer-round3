import React from 'react';
import { ArrowUpRight, Waves } from 'lucide-react';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';

interface ImpactSectionProps {
  waterRecycling: boolean;
  rainwaterHarvesting: boolean;
  leakDetection: boolean;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({
  waterRecycling,
  rainwaterHarvesting,
  leakDetection,
}) => {
  // Deterministic Water Efficiency Score Calculation (Code Reverse Engineering target)
  const baseScore = 55;
  const recyclingBonus = waterRecycling ? 15 : 0;
  const rainwaterBonus = rainwaterHarvesting ? 12 : 0;
  const leakBonus = leakDetection ? 14 : 0;

  const targetEfficiencyScore = Math.min(baseScore + recyclingBonus + rainwaterBonus + leakBonus, 96);
  const animatedScore = useAnimatedNumber(targetEfficiencyScore, 500);

  // Dynamic Impact Metrics
  const targetWaterReuseRate = waterRecycling ? 74 : 38;
  const targetLeakageRate = leakDetection ? 18 : 32;
  const targetRainwaterContribution = rainwaterHarvesting ? 32 : 10;

  const animatedWaterReuse = useAnimatedNumber(targetWaterReuseRate, 500);
  const animatedLeakage = useAnimatedNumber(targetLeakageRate, 500);
  const animatedRainwater = useAnimatedNumber(targetRainwaterContribution, 500);

  return (
    <section id="impact" className="pt-24 pb-0 px-6 lg:px-14 bg-[#faf9f5] text-slate-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Main Editorial Hero Grid (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column (~60%) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section Tag */}
            <div className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
              05 · MEASURABLE RIVER IMPACT
            </div>

            {/* Giant Heading with Blue Accent Word */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tighter leading-[0.88] uppercase">
              CUMULATIVE <br />
              <span className="text-sky-700">SUSTAINABILITY</span> <br />
              IMPACT.
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 font-light max-w-xl leading-relaxed">
              As water solutions activate across the watershed, city efficiency metrics and river stream volume respond dynamically in real time.
            </p>

            {/* Water Efficiency Flow Channel Visualization */}
            <div className="space-y-3 pt-2 max-w-xl">
              <span className="text-xs font-mono font-black text-slate-900 uppercase tracking-widest block">
                WATER EFFICIENCY FLOW
              </span>

              {/* Water Channel Progress Tube */}
              <div className="w-full h-7 bg-sky-100/70 rounded-full p-1 border border-sky-200/90 overflow-hidden relative shadow-xs">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-teal-500 transition-all duration-700 relative animate-water-flow flex items-center justify-end pr-2"
                  style={{ width: `${animatedScore}%` }}
                >
                  <div className="w-2 h-2 rounded-full bg-white/90 animate-ping" />
                </div>
              </div>

              {/* Baseline & Target Labels */}
              <div className="flex justify-between text-[11px] font-mono font-medium text-slate-500 pt-0.5">
                <span>55% BASELINE (ALL OFF)</span>
                <span>TARGET: 96% CLOSED-LOOP CIRCULARITY</span>
              </div>
            </div>

          </div>

          {/* Right Column (~40%): Live Telemetry Giant Typography Integrated with Water */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:items-end pt-2 lg:pt-0">
            <div className="space-y-2 text-left lg:text-right">
              
              {/* Telemetry Header */}
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                <Waves className="w-4 h-4 text-sky-600 animate-pulse" />
                <span>LIVE SYSTEM TELEMETRY</span>
              </div>

              {/* Giant Floating Score Number Produced by the River Flow */}
              <div className="flex items-start justify-start lg:justify-end text-slate-950 font-mono tracking-tighter">
                <span className="text-8xl sm:text-9xl lg:text-[10rem] font-black leading-none">
                  {animatedScore}
                </span>
                <div className="flex flex-col items-start pt-2 sm:pt-4">
                  <span className="text-5xl sm:text-6xl font-bold leading-none">%</span>
                  <ArrowUpRight className="w-7 h-7 sm:w-9 sm:h-9 text-slate-900 mt-1" />
                </div>
              </div>

              <p className="text-xs font-mono text-slate-500 max-w-xs lg:ml-auto">
                Dynamic watershed composite calculated from active recycling, aquifer harvesting, and acoustic detection.
              </p>
            </div>
          </div>

        </div>

        {/* Floating Secondary Metric Data Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
          
          <div className="space-y-1 border-l-2 border-sky-600 pl-4">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              WATER REUSE
            </span>
            <div className="text-4xl font-black font-mono text-slate-950">
              {animatedWaterReuse}%
            </div>
            <p className="text-xs text-slate-500">
              {waterRecycling ? 'Closed-loop greywater active' : 'Single-use domestic flow'}
            </p>
          </div>

          <div className="space-y-1 border-l-2 border-rose-500 pl-4">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              UNACCOUNTED LEAKAGE
            </span>
            <div className="text-4xl font-black font-mono text-slate-950">
              {animatedLeakage}%
            </div>
            <p className="text-xs text-slate-500">
              {leakDetection ? 'Acoustic sensors active' : 'Undetected pipe fissures'}
            </p>
          </div>

          <div className="space-y-1 border-l-2 border-teal-600 pl-4">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              RAINWATER HARVESTING
            </span>
            <div className="text-4xl font-black font-mono text-slate-950">
              {animatedRainwater}%
            </div>
            <p className="text-xs text-slate-500">
              {rainwaterHarvesting ? 'Aquifer recharge active' : 'Runoff diverted to storm sewers'}
            </p>
          </div>

        </div>

      </div>

      {/* Realistic Edge-to-Edge Water Ripples & Skyline Graphic at Bottom */}
      <div className="w-full relative mt-12 overflow-hidden h-64 sm:h-80 lg:h-[380px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#faf9f5]/20 to-[#faf9f5] z-10" />
        <img
          src="/water_skyline.jpg"
          alt="AquaCity Water Surface and Skyline"
          className="w-full h-full object-cover object-center opacity-85"
        />
      </div>

    </section>
  );
};
