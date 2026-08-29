import React, { useState } from 'react';
import { Home, Building2, Factory, Trees, Droplet, X, ArrowUpRight } from 'lucide-react';

interface CitySector {
  id: string;
  name: string;
  share: string;
  percentage: number;
  icon: React.ElementType;
  description: string;
  nodeX: number;
  nodeY: number;
  labelPosition: 'top' | 'bottom' | 'right' | 'left';
  metrics: { label: string; value: string }[];
}

export const InteractiveCity: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<CitySector | null>(null);
  const [hoveredSectorId, setHoveredSectorId] = useState<string | null>(null);

  const sectors: CitySector[] = [
    {
      id: 'residential',
      name: 'RESIDENTIAL DISTRICTS',
      share: '42%',
      percentage: 42,
      icon: Home,
      description: 'The primary urban destination where water feeds residential households, green corridors, and eco-housing equipped with dual-pipe greywater recycling systems.',
      nodeX: 280,
      nodeY: 130,
      labelPosition: 'top',
      metrics: [
        { label: 'City Demand Share', value: '42%' },
        { label: 'Avg Household Usage', value: '140 L / day' },
        { label: 'Greywater Recirculation', value: '38% Recycled' },
        { label: 'Smart Meter Coverage', value: '99.4%' },
      ],
    },
    {
      id: 'commercial',
      name: 'COMMERCIAL TOWERS',
      share: '21%',
      percentage: 21,
      icon: Building2,
      description: 'High-density commercial hubs and tech campuses utilizing HVAC condensate recapture, vacuum plumbing fixtures, and rainwater harvesting cisterns.',
      nodeX: 620,
      nodeY: 140,
      labelPosition: 'top',
      metrics: [
        { label: 'City Demand Share', value: '21%' },
        { label: 'HVAC Recaptured', value: '82,000 L / mo' },
        { label: 'Efficiency Rating', value: 'A+ Certified' },
        { label: 'Peak Flow Reduction', value: '-24%' },
      ],
    },
    {
      id: 'industrial',
      name: 'INDUSTRIAL ECO-PARK',
      share: '28%',
      percentage: 28,
      icon: Factory,
      description: 'Heavy manufacturing and clean-tech production zones operating zero-liquid-discharge (ZLD) closed-loop purification circuits to eliminate raw effluent.',
      nodeX: 420,
      nodeY: 340,
      labelPosition: 'bottom',
      metrics: [
        { label: 'City Demand Share', value: '28%' },
        { label: 'Closed-Loop Circularity', value: '91% Recovered' },
        { label: 'Daily Reclaimed Volume', value: '1.4M L / day' },
        { label: 'Effluent Purity Index', value: '100% Non-Toxic' },
      ],
    },
    {
      id: 'public',
      name: 'PUBLIC PARKS & WETLANDS',
      share: '9%',
      percentage: 9,
      icon: Trees,
      description: 'Civic wetlands, public tree canopies, and permeable sponge parks irrigated 100% by treated stormwater runoff and recycled municipal effluent.',
      nodeX: 740,
      nodeY: 320,
      labelPosition: 'bottom',
      metrics: [
        { label: 'City Demand Share', value: '9%' },
        { label: 'Stormwater Capture', value: '100% Infiltrated' },
        { label: 'Hydration Health', value: 'Optimal Index' },
        { label: 'Aquifer Recharge', value: '+18% Annually' },
      ],
    },
  ];

  return (
    <section id="city" className="py-24 lg:py-32 px-6 lg:px-14 bg-[#faf9f5] relative overflow-hidden">
      
      {/* Background Subtle Flow Gradient */}
      <div className="absolute top-1/3 left-1/4 -z-10 w-[600px] h-[600px] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-700 uppercase border-b border-sky-300 pb-1">
            02 · THE URBAN RIVER NETWORK
          </span>
          <h2 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.88]">
            THE CITY IS A <br />
            <span className="text-sky-700">WATER SYSTEM.</span>
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-light leading-relaxed">
            Data flows directly with the water. Follow the river branches across the city landscape and click any embedded data marker to inspect sector profiles.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* IMMERSIVE ORGANIC RIVER WITH DATA EMBEDDED DIRECTLY ALONG THE FLOW        */}
        {/* ========================================================================= */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-8 overflow-hidden shadow-xs">
          
          <svg
            className="w-full h-full overflow-visible select-none"
            viewBox="0 0 900 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cityRiverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="30%" stopColor="#0284c7" />
                <stop offset="65%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>

            {/* Subtle City Grid Terrain Contour Guides */}
            <path d="M 40,225 C 180,100 420,80 860,200" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="8 8" />
            <path d="M 40,320 C 260,260 520,380 860,340" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="8 8" />

            {/* 1. Main River Artery entering from Left, winding through City */}
            <path
              d="M 20,225 C 140,225 200,130 280,130 C 380,130 400,280 500,280 C 600,280 640,140 720,140 C 780,140 820,225 880,225"
              stroke="#e2e8f0"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 20,225 C 140,225 200,130 280,130 C 380,130 400,280 500,280 C 600,280 640,140 720,140 C 780,140 820,225 880,225"
              stroke="url(#cityRiverGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              className="animate-water-flow"
            />

            {/* 2. Branch 1 to Industrial (Bending Downward) */}
            <path
              d="M 280,130 C 340,190 380,280 420,340"
              stroke="#0284c7"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-water-flow-fast"
            />

            {/* 3. Branch 2 to Public Wetlands (Bending Bottom-Right) */}
            <path
              d="M 500,280 C 580,280 660,320 740,320"
              stroke="#0d9488"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-water-flow"
            />

            {/* Water Ripple Waves along the River */}
            <circle cx="280" cy="130" r="28" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <circle cx="620" cy="140" r="24" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <circle cx="420" cy="340" r="26" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <circle cx="740" cy="320" r="22" stroke="#0d9488" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

            {/* ============================================================= */}
            {/* EMBEDDED DATA MARKERS ANCHORED DIRECTLY TO THE RIVER          */}
            {/* ============================================================= */}
            {sectors.map((sector) => {
              const isHovered = hoveredSectorId === sector.id;
              const isSelected = selectedSector?.id === sector.id;

              return (
                <g
                  key={sector.id}
                  onClick={() => setSelectedSector(sector)}
                  onMouseEnter={() => setHoveredSectorId(sector.id)}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer group"
                >
                  {/* Leader Connection Line from River Node to Number */}
                  <line
                    x1={sector.nodeX}
                    y1={sector.nodeY}
                    x2={sector.nodeX}
                    y2={sector.labelPosition === 'top' ? sector.nodeY - 45 : sector.nodeY + 45}
                    stroke={isHovered || isSelected ? "#0284c7" : "#94a3b8"}
                    strokeWidth={isHovered ? "2" : "1.5"}
                    strokeDasharray="3 3"
                    className="transition-all"
                  />

                  {/* Pulsing River Node on the Water */}
                  <circle
                    cx={sector.nodeX}
                    cy={sector.nodeY}
                    r={isHovered ? "12" : "9"}
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="3"
                    className="transition-all"
                  />
                  <circle
                    cx={sector.nodeX}
                    cy={sector.nodeY}
                    r="4"
                    fill="#0284c7"
                    className="animate-pulse"
                  />

                  {/* Giant Number Anchored Directly Along the River */}
                  <g
                    transform={`translate(${sector.nodeX}, ${
                      sector.labelPosition === 'top' ? sector.nodeY - 50 : sector.nodeY + 65
                    })`}
                  >
                    {/* Background Soft Glow on Hover */}
                    {isHovered && (
                      <circle cx="0" cy="-10" r="35" fill="#e0f2fe" opacity="0.7" />
                    )}

                    {/* Percentage Value */}
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      fill={isHovered || isSelected ? "#0369a1" : "#0f172a"}
                      fontSize="36"
                      fontFamily="monospace"
                      fontWeight="900"
                      className="transition-colors tracking-tighter"
                    >
                      {sector.share}
                    </text>

                    {/* Sector Name Subtitle */}
                    <text
                      x="0"
                      y="18"
                      textAnchor="middle"
                      fill={isHovered || isSelected ? "#0284c7" : "#64748b"}
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="800"
                      letterSpacing="0.05em"
                      className="uppercase transition-colors"
                    >
                      {sector.name}
                    </text>

                    {/* Inspect Link Prompt */}
                    <text
                      x="0"
                      y="32"
                      textAnchor="middle"
                      fill="#0284c7"
                      fontSize="9"
                      fontFamily="sans-serif"
                      fontWeight="700"
                      letterSpacing="0.08em"
                      opacity={isHovered ? "1" : "0"}
                      className="uppercase transition-opacity"
                    >
                      INSPECT PROFILE ↗
                    </text>
                  </g>
                </g>
              );
            })}

            {/* River Flow Direction Indicators */}
            <g transform="translate(100, 215)">
              <text x="0" y="0" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                RIVER INLET →
              </text>
            </g>
            <g transform="translate(800, 245)">
              <text x="0" y="0" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                → MUNICIPAL RECIRCULATION
              </text>
            </g>
          </svg>

          {/* Floating Instructions Bottom Note */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs font-mono text-slate-500">
            <Droplet className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
            <span>Click any river data marker above to open its comprehensive sector telemetry.</span>
          </div>

        </div>

      </div>

      {/* LIGHT EDITORIAL SECTOR BREAKDOWN MODAL (PRESERVED POPUP) */}
      {selectedSector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-2xl modal-editorial-light rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 relative text-slate-900">
            <button
              onClick={() => setSelectedSector(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-sky-50 text-sky-800 border border-sky-200">
                <selectedSector.icon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 fill-sky-600" />
                  RIVER BRANCH PROFILE · {selectedSector.share} OF TOTAL DEMAND
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mt-0.5">{selectedSector.name}</h3>
              </div>
            </div>

            <p className="text-slate-600 text-base leading-relaxed font-light">
              {selectedSector.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-slate-200 font-mono">
              {selectedSector.metrics.map((m, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">{m.label}</span>
                  <span className="text-xl font-black text-slate-950">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSector(null)}
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                RETURN TO RIVER FLOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
