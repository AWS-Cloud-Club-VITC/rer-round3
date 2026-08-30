import React, { useState, useEffect } from 'react';
import { Droplet, X, Activity, CheckCircle2 } from 'lucide-react';

interface CitySector {
  id: string;
  name: string;
  percentage: number;
  flow: string;
  x: number;
  y: number;
  labelAbove: boolean;
  description: string;
  color: string;
  quality: string;
  reuseRate: string;
  pressure: string;
  status: string;
}

const SECTORS: CitySector[] = [
  {
    id: 'residential',
    name: 'RESIDENTIAL DISTRICTS',
    percentage: 42,
    flow: '596 ML / DAY',
    x: 360,
    y: 130,
    labelAbove: true,
    description: 'High-density urban dwellings with aerated low-flow fixtures and smart shutoffs.',
    color: '#0284C7',
    quality: '98.4%',
    reuseRate: '74%',
    pressure: '4.2 BAR',
    status: 'OPTIMAL',
  },
  {
    id: 'commercial',
    name: 'COMMERCIAL TOWERS',
    percentage: 21,
    flow: '298 ML / DAY',
    x: 620,
    y: 140,
    labelAbove: true,
    description: 'Corporate high-rises and retail towers featuring closed-loop HVAC cooling loops.',
    color: '#0284C7',
    quality: '99.1%',
    reuseRate: '68%',
    pressure: '4.5 BAR',
    status: 'REGULATED',
  },
  {
    id: 'industrial',
    name: 'INDUSTRIAL ECO-PARK',
    percentage: 28,
    flow: '397 ML / DAY',
    x: 460,
    y: 290,
    labelAbove: false,
    description: 'Clean-tech manufacturing with on-site effluent recovery and zero-liquid discharge.',
    color: '#0284C7',
    quality: '96.8%',
    reuseRate: '82%',
    pressure: '3.9 BAR',
    status: 'RECIRCULATING',
  },
  {
    id: 'public',
    name: 'PUBLIC PARKS & WETLANDS',
    percentage: 9,
    flow: '128 ML / DAY',
    x: 680,
    y: 290,
    labelAbove: false,
    description: 'Civic bioswales, rain gardens and botanical retention ponds for urban cooling.',
    color: '#0D9488',
    quality: '94.2%',
    reuseRate: '91%',
    pressure: '3.6 BAR',
    status: 'ECOLOGICAL',
  },
];

export const InteractiveCity: React.FC = () => {
  const [activeSector, setActiveSector] = useState<CitySector>(SECTORS[0]);
  const [hoveredSectorId, setHoveredSectorId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Single Source of Truth Geometry: Green branch starts directly at (540, 200) on the main river centerline!
  const mainRiverPath = "M 60 220 C 180 220, 260 130, 360 130 C 460 130, 520 280, 620 140 C 700 30, 800 220, 940 220";
  const industrialBranchPath = "M 360 130 C 390 190, 420 250, 460 290";
  const publicBranchPath = "M 540 200 C 580 240, 630 270, 680 290";

  // ESC key closes popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNodeClick = (sector: CitySector) => {
    setActiveSector(sector);
    setIsPopupOpen(true);
  };

  return (
    <section id="city" className="py-24 px-8 lg:px-16 max-w-7xl mx-auto border-t border-stone-200/80 relative">
      
      {/* Section Header */}
      <div className="space-y-3 mb-14 select-none">
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#0284C7] uppercase">
          02 · THE URBAN RIVER NETWORK
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] font-sans">
            <span className="text-[#0A192F] block">THE CITY IS A</span>
            <span className="text-[#0284C7] block">WATER SYSTEM.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed pt-1">
            Data flows directly with the water. Follow the river branches across the city landscape and click any embedded data marker to inspect sector profiles.
          </p>
        </div>
      </div>

      {/* Large River Network Visualization Canvas */}
      <div className="w-full rounded-[2rem] bg-[#FAFAF7] border border-stone-200/80 p-8 sm:p-12 relative overflow-hidden shadow-2xs">
        
        <div className="relative w-full aspect-[21/9] min-h-[340px] flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 400"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            
            {/* Background Reference Contours */}
            <path
              d="M 120 240 C 300 340, 700 340, 880 240"
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Central Flowing River Trunk */}
            <path
              d={mainRiverPath}
              stroke="#0284C7"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="12 8"
              className="animate-water-flow"
            />

            {/* Industrial Feeder Branch (Dashed Blue line from Main River at x:360, y:130 to x:460, y:290) */}
            <path
              d={industrialBranchPath}
              stroke="#0284C7"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="6 4"
              className="animate-water-flow-fast"
            />

            {/* Public Parks Branch (Teal line physically originating from Main River centerline at x:540, y:200 to x:680, y:290) */}
            <path
              d={publicBranchPath}
              stroke="#0D9488"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="6 4"
              className="animate-water-flow"
            />

            {/* Stream Flow Markers: RIVER INLET (Left) & MUNICIPAL RECIRCULATION (Right) */}
            <text x="90" y="210" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="0.05em">
              ← RIVER INLET
            </text>
            <text x="890" y="235" textAnchor="end" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="0.05em">
              → MUNICIPAL RECIRCULATION
            </text>

            {/* 4 Interactive Sector Data Markers */}
            {SECTORS.map((sector) => {
              const isSelected = activeSector.id === sector.id;
              const isHovered = hoveredSectorId === sector.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <g
                  key={sector.id}
                  className="cursor-pointer"
                  onClick={() => handleNodeClick(sector)}
                  onMouseEnter={() => setHoveredSectorId(sector.id)}
                  onMouseLeave={() => setHoveredSectorId(null)}
                >
                  {/* Invisible Rock-Solid Hit Target Circle */}
                  <circle
                    cx={sector.x}
                    cy={sector.y}
                    r="34"
                    fill="transparent"
                    pointerEvents="all"
                  />

                  {/* Concentric Node Circle */}
                  <circle
                    cx={sector.x}
                    cy={sector.y}
                    r={isHighlighted ? 16 : 12}
                    fill="#FFFFFF"
                    stroke={sector.color}
                    strokeWidth="3.5"
                    style={{ transition: 'r 0.2s ease-out' }}
                  />
                  <circle
                    cx={sector.x}
                    cy={sector.y}
                    r={isHighlighted ? 7 : 4}
                    fill={sector.color}
                    style={{ transition: 'r 0.2s ease-out' }}
                  />

                  {/* Concentric Outer Ring on Selection */}
                  {isSelected && (
                    <circle
                      cx={sector.x}
                      cy={sector.y}
                      r="24"
                      stroke={sector.color}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      className="animate-spin"
                      style={{ transformOrigin: `${sector.x}px ${sector.y}px`, animationDuration: '8s' }}
                    />
                  )}

                  {/* Embedded Percentage & Sector Name */}
                  {sector.labelAbove ? (
                    <g pointerEvents="none">
                      <text
                        x={sector.x}
                        y={sector.y - 34}
                        textAnchor="middle"
                        fill="#0A192F"
                        fontSize="28"
                        fontWeight="900"
                        fontFamily="sans-serif"
                        className="tracking-tight"
                      >
                        {sector.percentage}%
                      </text>
                      <text
                        x={sector.x}
                        y={sector.y - 16}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        letterSpacing="0.05em"
                      >
                        {sector.name}
                      </text>
                    </g>
                  ) : (
                    <g pointerEvents="none">
                      <text
                        x={sector.x}
                        y={sector.y + 36}
                        textAnchor="middle"
                        fill="#0A192F"
                        fontSize="28"
                        fontWeight="900"
                        fontFamily="sans-serif"
                        className="tracking-tight"
                      >
                        {sector.percentage}%
                      </text>
                      <text
                        x={sector.x}
                        y={sector.y + 54}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        letterSpacing="0.05em"
                      >
                        {sector.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

          </svg>
        </div>

        {/* Bottom Interactive Note & Selected Sector Telemetry */}
        <div className="pt-4 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2 select-none">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Droplet className="w-3.5 h-3.5 fill-[#0284C7] text-[#0284C7] shrink-0" />
            <span>Click any river data marker above to open its comprehensive sector telemetry.</span>
          </div>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="text-[#0A192F] font-bold hover:text-[#0284C7] underline cursor-pointer"
          >
            {activeSector.name}: {activeSector.flow} ({activeSector.percentage}% Demand) ↗
          </button>
        </div>

      </div>

      {/* FLOATING DETAIL POP-OUT INSPECTION MODAL (Zero Document Reflow) */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white border border-stone-200/90 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-[#0A192F] relative transition-all transform duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'popoutSpring 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284C7] text-[10px] font-mono font-bold uppercase border border-sky-100">
                  <Activity className="w-3 h-3" />
                  <span>SECTOR TELEMETRY PROFILE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] tracking-tight font-sans">
                  {activeSector.name}
                </h3>
              </div>

              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Big Demand & Volume Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-stone-200/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                  URBAN DEMAND
                </span>
                <div className="text-3xl sm:text-4xl font-black font-sans text-[#0284C7] tracking-tight">
                  {activeSector.percentage}%
                </div>
                <span className="text-[10px] text-slate-500 font-mono block">Share of Total Grid</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-stone-200/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                  DAILY VOLUME
                </span>
                <div className="text-2xl sm:text-3xl font-black font-sans text-[#0A192F] tracking-tight">
                  {activeSector.flow}
                </div>
                <span className="text-[10px] text-slate-500 font-mono block">Metered Real-time Flow</span>
              </div>
            </div>

            {/* 4 Technical Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-center space-y-0.5">
                <span className="text-[9px] text-slate-400 block uppercase">QUALITY</span>
                <span className="font-bold text-[#0A192F] text-sm block">{activeSector.quality}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-center space-y-0.5">
                <span className="text-[9px] text-slate-400 block uppercase">REUSE RATE</span>
                <span className="font-bold text-[#0D9488] text-sm block">{activeSector.reuseRate}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-center space-y-0.5">
                <span className="text-[9px] text-slate-400 block uppercase">PRESSURE</span>
                <span className="font-bold text-[#0A192F] text-sm block">{activeSector.pressure}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-center space-y-0.5">
                <span className="text-[9px] text-emerald-700 block uppercase">STATUS</span>
                <span className="font-bold text-emerald-800 text-xs block">{activeSector.status}</span>
              </div>

            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1">
              {activeSector.description}
            </p>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Telemetry Loop Verified
              </span>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#0284C7] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
