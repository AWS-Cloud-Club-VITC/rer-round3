import React, { useState } from 'react';
import { Mountain, Filter, Building2, Home, RotateCcw, X, ArrowUpRight, Droplet } from 'lucide-react';

interface Stage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  stat: string;
  statLabel: string;
  nodeX: number;
  nodeY: number;
}

export const WaterJourney: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  const stages: Stage[] = [
    {
      id: 'source',
      title: '01 · SOURCE',
      subtitle: 'Alpine Catchment & Aquifer Origin',
      description: 'Water originates high in natural glacial watersheds and protected mountain aquifers, collected through gravity-fed natural catchments with pristine mineral balance.',
      icon: Mountain,
      stat: '100%',
      statLabel: 'Purity Index',
      nodeX: 100,
      nodeY: 100,
    },
    {
      id: 'treatment',
      title: '02 · TREATMENT',
      subtitle: 'Filtration & Disinfection',
      description: 'Raw river intake passes through biological sand filtration, membrane filtration, and advanced ultraviolet disinfection to eliminate 99.9% of microbial pathogens.',
      icon: Filter,
      stat: '99.9%',
      statLabel: 'Pathogen Free',
      nodeX: 290,
      nodeY: 60,
    },
    {
      id: 'city',
      title: '03 · CITY',
      subtitle: 'Municipal Main Artery',
      description: 'Treated potable water enters high-capacity transmission arteries, dynamically pressurized via automated booster pump stations across commercial and public districts.',
      icon: Building2,
      stat: '4.2 Bar',
      statLabel: 'Active Pressure',
      nodeX: 490,
      nodeY: 110,
    },
    {
      id: 'home',
      title: '04 · HOME',
      subtitle: 'Domestic Consumption',
      description: 'Water delivers domestic drinking, culinary, and sanitation needs with dual-pipe infrastructure and IoT smart meters tracking real-time consumption and conservation.',
      icon: Home,
      stat: '140 L',
      statLabel: 'Daily Target',
      nodeX: 680,
      nodeY: 70,
    },
    {
      id: 'reuse',
      title: '05 · REUSE',
      subtitle: 'Closed-Loop Recirculation',
      description: 'Post-consumer wastewater is recovered through decentralized bio-reactors and recirculated into district cooling towers, civic fountains, and urban agriculture.',
      icon: RotateCcw,
      stat: '74%',
      statLabel: 'Circularity Rate',
      nodeX: 860,
      nodeY: 100,
    },
  ];

  return (
    <section id="journey" className="py-24 lg:py-32 px-6 lg:px-14 bg-white border-y border-slate-200/80 relative overflow-hidden">
      
      {/* Background Ambient River Contour */}
      <div className="absolute top-1/2 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-sky-50/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-700 uppercase border-b border-sky-300 pb-1">
            01 · CONTINUOUS WATER LIFECYCLE
          </span>
          <h2 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.88]">
            WHERE DOES OUR <br />
            <span className="text-sky-700">WATER GO?</span>
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-light leading-relaxed">
            Data travels with the stream. Trace the continuous lifecycle of urban water where each station on the river generates real-time telemetry.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* S-CURVE CONTINUOUS RIVER WITH DATA EMBEDDED DIRECTLY ON THE RIVER PATH    */}
        {/* ========================================================================= */}
        <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] lg:aspect-[21/8] bg-[#faf9f5] rounded-3xl border border-slate-200/90 p-4 sm:p-8 overflow-hidden shadow-xs">
          
          <svg
            className="w-full h-full overflow-visible select-none"
            viewBox="0 0 960 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="journeyRiverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="25%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="75%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Riverbed Flow Guides */}
            <path
              d="M 20,100 Q 190,20 290,60 T 490,110 T 680,70 T 860,100 L 940,100"
              stroke="#e2e8f0"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Dynamic Animated Core River Stream */}
            <path
              d="M 20,100 Q 190,20 290,60 T 490,110 T 680,70 T 860,100 L 940,100"
              stroke="url(#journeyRiverGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              className="animate-water-flow"
            />

            {/* Stage Markers with Embedded Floating Numbers */}
            {stages.map((stage) => {
              const isHovered = hoveredStageId === stage.id;
              const isSelected = selectedStage?.id === stage.id;
              const Icon = stage.icon;

              return (
                <g
                  key={stage.id}
                  onClick={() => setSelectedStage(stage)}
                  onMouseEnter={() => setHoveredStageId(stage.id)}
                  onMouseLeave={() => setHoveredStageId(null)}
                  className="cursor-pointer group"
                >
                  {/* Water Ripple on Hover */}
                  <circle
                    cx={stage.nodeX}
                    cy={stage.nodeY}
                    r={isHovered ? "24" : "16"}
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity={isHovered ? "0.8" : "0.3"}
                    className="transition-all"
                  />

                  {/* Pulsing River Node */}
                  <circle
                    cx={stage.nodeX}
                    cy={stage.nodeY}
                    r="8"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                  <circle
                    cx={stage.nodeX}
                    cy={stage.nodeY}
                    r="3.5"
                    fill="#0284c7"
                    className="animate-pulse"
                  />

                  {/* Embedded Data Badge Floating Directly on the River Bend */}
                  <g
                    transform={`translate(${stage.nodeX}, ${
                      stage.nodeY > 80 ? stage.nodeY - 38 : stage.nodeY + 48
                    })`}
                  >
                    {/* Big Metric Number */}
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      fill={isHovered || isSelected ? "#0369a1" : "#0f172a"}
                      fontSize="24"
                      fontFamily="monospace"
                      fontWeight="900"
                      className="transition-colors tracking-tighter"
                    >
                      {stage.stat}
                    </text>

                    {/* Stage Title */}
                    <text
                      x="0"
                      y="14"
                      textAnchor="middle"
                      fill={isHovered || isSelected ? "#0284c7" : "#64748b"}
                      fontSize="9"
                      fontFamily="sans-serif"
                      fontWeight="800"
                      letterSpacing="0.06em"
                      className="uppercase transition-colors"
                    >
                      {stage.title}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Floating Instructions Bottom Note */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs font-mono text-slate-500">
            <Droplet className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
            <span>Click any river lifecycle station to inspect stage purification and quality metrics.</span>
          </div>

        </div>

      </div>

      {/* LIGHT EDITORIAL STAGE INSPECTION MODAL (PRESERVED POPUP) */}
      {selectedStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-xl modal-editorial-light rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 relative text-slate-900">
            <button
              onClick={() => setSelectedStage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-800 border border-sky-200">
                <selectedStage.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 fill-sky-600" />
                  RIVER MONITORING STATION · {selectedStage.title}
                </span>
                <h3 className="text-2xl font-black text-slate-950 mt-0.5">{selectedStage.subtitle}</h3>
              </div>
            </div>

            <p className="text-slate-600 text-base leading-relaxed font-light">
              {selectedStage.description}
            </p>

            <div className="p-5 rounded-2xl bg-[#faf9f5] border border-slate-200 flex items-center justify-between font-mono">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{selectedStage.statLabel}</span>
              <span className="text-3xl font-black text-sky-800">{selectedStage.stat}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStage(null)}
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                CONTINUE ALONG THE RIVER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
