import React from 'react';
import { Sparkles, Check, Plus } from 'lucide-react';
import type { CityWaterImpact } from '../types/aquacity';

interface CityImpactSectionProps {
  impact: CityWaterImpact;
  solutions: {
    recycling: boolean;
    rainwater: boolean;
    leakDetection: boolean;
  };
  onToggleSolution: (id: 'recycling' | 'rainwater' | 'leakDetection') => void;
}

export const CityImpactSection: React.FC<CityImpactSectionProps> = ({
  impact,
  solutions,
  onToggleSolution,
}) => {
  return (
    <section id="impact" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-semibold">
            <span>06 / SUSTAINABILITY INDEX</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display">
            MEASURING URBAN HYDRO IMPACT.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Dynamic efficiency calculations responding in real time to architectural water interventions. 
            High circularity translates directly into resilient municipal capacity.
          </p>
        </div>

        {/* Quick Reset / Toggle Strip */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onToggleSolution('recycling')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              solutions.recycling
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {solutions.recycling ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            Recycling
          </button>

          <button
            onClick={() => onToggleSolution('rainwater')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              solutions.rainwater
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {solutions.rainwater ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            Rainwater
          </button>

          <button
            onClick={() => onToggleSolution('leakDetection')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              solutions.leakDetection
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {solutions.leakDetection ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            Leak Sensors
          </button>
        </div>
      </div>

      {/* 4 Large Editorial Typography Data Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Metric 1: Water Reuse */}
        <div className="editorial-card p-8 bg-white border border-stone-200/90 rounded-3xl space-y-4 hover:border-sky-300">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>CIRCULAR REUSE</span>
            <span className="text-sky-700 font-bold">Target: 70%+</span>
          </div>
          <div className="text-6xl sm:text-7xl font-bold font-mono text-sky-700 tracking-tighter transition-all duration-500">
            {impact.waterReuse}%
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 font-display">WATER REUSE RATIO</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Percentage of non-potable demand supplied by decentralized treatment loops.
            </p>
          </div>
        </div>

        {/* Metric 2: Leakage */}
        <div className="editorial-card p-8 bg-white border border-stone-200/90 rounded-3xl space-y-4 hover:border-rose-300">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>UNACCOUNTED LOSS</span>
            <span className="text-rose-600 font-bold">Target: &lt;15%</span>
          </div>
          <div className={`text-6xl sm:text-7xl font-bold font-mono tracking-tighter transition-all duration-500 ${
            impact.leakage > 20 ? 'text-rose-600' : 'text-emerald-600'
          }`}>
            {impact.leakage}%
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 font-display">NETWORK LEAKAGE</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unaccounted sub-surface losses mitigated through automated hydrophones.
            </p>
          </div>
        </div>

        {/* Metric 3: Rainwater */}
        <div className="editorial-card p-8 bg-white border border-stone-200/90 rounded-3xl space-y-4 hover:border-sky-300">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>SPONGE CITY RECHARGE</span>
            <span className="text-sky-700 font-bold">Target: 30%+</span>
          </div>
          <div className="text-6xl sm:text-7xl font-bold font-mono text-cyan-600 tracking-tighter transition-all duration-500">
            {impact.rainwater}%
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 font-display">RAINWATER HARVEST</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Stormwater absorbed through bioswales and decentralized urban cisterns.
            </p>
          </div>
        </div>

        {/* Metric 4: Composite Water Efficiency Score */}
        <div className="editorial-card p-8 bg-gradient-to-br from-sky-900 to-slate-900 text-white rounded-3xl space-y-4 shadow-xl shadow-sky-950/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-center text-xs font-mono text-sky-200 z-10 relative">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              INTEGRATED SCORE
            </span>
            <span className="text-emerald-400 font-bold">OPTIMAL</span>
          </div>

          <div className="text-6xl sm:text-7xl font-bold font-mono text-white tracking-tighter z-10 relative transition-all duration-500">
            {impact.efficiency}%
          </div>

          <div className="space-y-1 z-10 relative">
            <h3 className="font-bold text-base text-white font-display">WATER EFFICIENCY</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Composite index calculating multi-variable urban water resilience.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-300 z-10 relative">
            <span>SDG 06.4 Hydro Efficiency Target</span>
            <span className="text-emerald-400 font-bold">Nominal Benchmark</span>
          </div>
        </div>

      </div>

    </section>
  );
};
