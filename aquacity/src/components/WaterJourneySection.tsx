import React, { useState } from 'react';
import { Mountain, Filter, Building2, Home, RotateCcw, Activity } from 'lucide-react';
import type { WaterStage } from '../types/aquacity';

export const STAGES_DATA: WaterStage[] = [
  {
    id: 'source',
    step: '01',
    title: 'SOURCE',
    subtitle: 'Alpine & Aquifer Catchment',
    description: 'Natural mountain runoff, rivers and protected underground aquifers collecting pristine raw water before seasonal influx.',
    flowRate: '1,850 L/sec',
    purity: '98.2% Raw Purity',
    tag: 'Natural Inflow',
  },
  {
    id: 'treatment',
    step: '02',
    title: 'TREATMENT',
    subtitle: 'Advanced Membrane Bioreactors',
    description: 'Water is cleaned, multi-barrier filtered, and tested before entering the urban pressurized distribution grid.',
    flowRate: '1,720 L/sec',
    purity: '99.9% Potable Standard',
    tag: 'Purification Stage',
  },
  {
    id: 'city',
    step: '03',
    title: 'CITY',
    subtitle: 'Smart Sensor Arterial Grid',
    description: 'High-pressure distribution network delivering metered flows across industrial, commercial and civic sectors.',
    flowRate: '1,420 L/sec',
    purity: '99.7% Verified Tap Grade',
    tag: 'Urban Distribution',
  },
  {
    id: 'home',
    step: '04',
    title: 'HOME',
    subtitle: 'Domestic & Community Fixtures',
    description: 'Clean drinking delivery, real-time residential IoT metering, and water-conserving low-flow aerators.',
    flowRate: '840 L/sec',
    purity: 'Optimal Mineral Balance',
    tag: 'Consumption & Use',
  },
  {
    id: 'reuse',
    step: '05',
    title: 'REUSE',
    subtitle: 'Circular Reclamation & Bioswales',
    description: 'Greywater recovery, circular district cooling recirculation, and ecological aquifer replenishment.',
    flowRate: '680 L/sec',
    purity: '88.5% Greywater Recycled',
    tag: 'Circular Economy',
  },
];

export const WaterJourneySection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('treatment');

  const activeStage = STAGES_DATA.find((s) => s.id === activeStageId) || STAGES_DATA[1];

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'source':
        return Mountain;
      case 'treatment':
        return Filter;
      case 'city':
        return Building2;
      case 'home':
        return Home;
      case 'reuse':
        return RotateCcw;
      default:
        return Activity;
    }
  };

  return (
    <section id="journey" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      
      {/* Section Header */}
      <div className="space-y-3 mb-12">
        <div className="text-[11px] font-mono font-bold tracking-widest text-cyan-800 uppercase">
          01 · THE URBAN METABOLISM
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 font-sans">
            WHERE DOES OUR WATER GO?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right font-sans leading-relaxed">
            Follow the five sequential stages of water as it flows from alpine catchments, powers urban life, and returns through closed-loop recycling.
          </p>
        </div>
      </div>

      {/* Interactive 5-Stage Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
        {STAGES_DATA.map((stage) => {
          const Icon = getStageIcon(stage.id);
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white border-slate-950 shadow-md ring-1 ring-slate-950/10'
                  : 'bg-[#faf9f6] border-stone-200/90 hover:bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-slate-950' : 'text-slate-400'}`}>
                  STAGE {stage.step}
                </span>
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-slate-950 text-white' : 'bg-stone-200 text-slate-600'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-tight">{stage.title}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{stage.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div className="w-full rounded-2xl bg-[#faf9f6] border border-stone-200/90 p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Overview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-cyan-800 uppercase tracking-wider">
              STAGE {activeStage.step} OF 05 · {activeStage.tag}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {activeStage.title} : {activeStage.subtitle}
            </h3>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
            {activeStage.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
            <div className="px-4 py-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-slate-400 block text-[10px]">Flow Rate</span>
              <span className="font-bold text-slate-900">{activeStage.flowRate}</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-slate-400 block text-[10px]">Standard</span>
              <span className="font-bold text-cyan-900">{activeStage.purity}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Micro Telemetry Visual */}
        <div className="lg:col-span-5 relative">
          <div className="w-full aspect-[4/3] rounded-xl bg-white border border-stone-200 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>NODE #{activeStage.step} SENSOR</span>
              <span className="text-emerald-600 font-bold">● ACTIVE</span>
            </div>

            <div className="my-auto text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-cyan-700 text-white mx-auto flex items-center justify-center shadow-xs">
                {React.createElement(getStageIcon(activeStage.id), { className: 'w-6 h-6' })}
              </div>
              <div className="text-xs font-bold font-mono uppercase text-slate-900">
                {activeStage.title} CONDUIT
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-400 border-t border-stone-100 pt-2">
              SDG 06.1 Universal Clean Access Metric
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
