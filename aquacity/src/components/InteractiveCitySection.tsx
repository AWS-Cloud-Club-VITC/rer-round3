import React, { useState } from 'react';
import { Home, Building2, Factory, Trees, Droplets, Network, ArrowUpRight } from 'lucide-react';
import type { CityZone } from '../types/aquacity';

export const CITY_ZONES: CityZone[] = [
  {
    id: 'residential',
    name: 'Residential Neighborhoods',
    category: 'residential',
    percentage: 42,
    dailyVolume: '596 ML/Day',
    description: 'High-density urban dwellings, multi-family units and suburban homes utilizing smart IoT meters and greywater recycling fixtures.',
    sustainableTech: 'Low-flow aeration, smart leak shutoff valves & decentralized rainwater barrels.',
    highlightIcon: 'Home',
  },
  {
    id: 'commercial',
    name: 'Commercial & Financial Hub',
    category: 'commercial',
    percentage: 21,
    dailyVolume: '298 ML/Day',
    description: 'High-rise office towers, shopping districts and hospitality centers with centralized cooling loops and stormwater retention roofs.',
    sustainableTech: 'Closed-loop HVAC chiller recycling & vacuum sanitation infrastructure.',
    highlightIcon: 'Building2',
  },
  {
    id: 'industrial',
    name: 'Eco-Industrial Park',
    category: 'industrial',
    percentage: 28,
    dailyVolume: '397 ML/Day',
    description: 'Advanced clean manufacturing, bio-tech centers and logistics terminals with zero-liquid discharge requirements.',
    sustainableTech: 'On-site effluent ultrafiltration & closed-circuit process water reuse.',
    highlightIcon: 'Factory',
  },
  {
    id: 'public',
    name: 'Public Parks & Bioswales',
    category: 'public',
    percentage: 9,
    dailyVolume: '128 ML/Day',
    description: 'Botanical corridors, permeable urban plazas, civic fountains and urban canopy irrigation powered by treated stormwater.',
    sustainableTech: 'Sub-surface drip irrigation, moisture sensor arrays & rain gardens.',
    highlightIcon: 'Trees',
  },
  {
    id: 'facility',
    name: 'Ultrafiltration Water Plant',
    category: 'facility',
    percentage: 100,
    dailyVolume: '1,420 ML Processed',
    description: 'The central municipal treatment hub utilizing multi-barrier ceramic membranes, ozone contactors and UV disinfection chambers.',
    sustainableTech: 'Solar-powered recovery pumps & real-time microbial spectrometry.',
    highlightIcon: 'Droplets',
  },
  {
    id: 'network',
    name: 'Smart Distribution Arteries',
    category: 'network',
    percentage: 100,
    dailyVolume: '1,420 km Pipeline',
    description: 'Sub-surface ductile iron and HDPE conduit network equipped with acoustic hydrophones and automated pressure-reducing valves.',
    sustainableTech: 'AI pressure management & acoustic early leak detection nodes.',
    highlightIcon: 'Network',
  },
];

export const InteractiveCitySection: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('residential');

  const selectedZone = CITY_ZONES.find((z) => z.id === selectedZoneId) || CITY_ZONES[0];

  const getZoneIcon = (category: string) => {
    switch (category) {
      case 'residential':
        return Home;
      case 'commercial':
        return Building2;
      case 'industrial':
        return Factory;
      case 'public':
        return Trees;
      case 'facility':
        return Droplets;
      default:
        return Network;
    }
  };

  return (
    <section id="city" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      
      {/* Section Header */}
      <div className="space-y-3 mb-12">
        <div className="text-[11px] font-mono font-bold tracking-widest text-cyan-800 uppercase">
          02 · SPATIAL WATER DEMAND
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 font-sans">
            THE CITY IS A WATER SYSTEM.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right font-sans leading-relaxed">
            Every sector of urban life depends on balanced water circulation. Click any district to inspect consumption ratios and sustainable tech.
          </p>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: City Zones Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {CITY_ZONES.map((zone) => {
            const Icon = getZoneIcon(zone.category);
            const isSelected = zone.id === selectedZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-slate-950 shadow-md ring-1 ring-slate-950/10'
                    : 'bg-[#faf9f6] border-stone-200/90 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isSelected ? 'bg-slate-950 text-white' : 'bg-stone-200 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-2xl font-black font-sans text-slate-950">
                    {zone.percentage}%
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-tight">{zone.name}</h3>
                <p className="text-[11px] text-slate-500 font-mono mt-1">{zone.dailyVolume}</p>

                <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{isSelected ? 'Selected' : 'Inspect'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right 4 Cols: Selected Zone Telemetry Panel */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="w-full rounded-2xl bg-[#faf9f6] border border-stone-200/90 p-6 sm:p-8 space-y-6">
            
            <div className="space-y-1 pb-4 border-b border-stone-200/60">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">ZONE TELEMETRY</span>
              <h3 className="font-extrabold text-xl text-slate-950 tracking-tight">{selectedZone.name}</h3>
            </div>

            {/* Big Stat */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 font-mono">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500 font-medium">Demand Share</span>
                <span className="text-3xl font-extrabold text-cyan-900">{selectedZone.percentage}%</span>
              </div>
              <div className="mt-2 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-cyan-700 h-1.5 rounded-full"
                  style={{ width: `${selectedZone.percentage}%` }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Operational Summary</span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {selectedZone.description}
              </p>
            </div>

            {/* Tech Note */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs text-slate-600 font-sans space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-700 block uppercase">
                SDG 6.4 Clean Technology
              </span>
              <p className="text-[11px] leading-relaxed">
                {selectedZone.sustainableTech}
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
