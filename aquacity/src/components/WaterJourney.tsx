import React, { useState } from 'react';

interface StageMarker {
  id: string;
  step: string;
  name: string;
  metric: string;
  sublabel: string;
  x: number;
  y: number;
  isAbove: boolean;
  color: string;
  description: string;
}

const STAGES: StageMarker[] = [
  {
    id: 'source',
    step: '01',
    name: 'SOURCE',
    metric: '100%',
    sublabel: 'Alpine Catchment',
    x: 120,
    y: 160,
    isAbove: true,
    color: '#0284C7',
    description: 'Pristine raw runoff and high-altitude aquifers before municipal treatment.',
  },
  {
    id: 'treatment',
    step: '02',
    name: 'TREATMENT',
    metric: '99.9%',
    sublabel: 'Multi-Barrier Filtration',
    x: 310,
    y: 220,
    isAbove: false,
    color: '#0284C7',
    description: 'Ultrafiltration membrane bioreactors achieving tap-grade potable standards.',
  },
  {
    id: 'city',
    step: '03',
    name: 'CITY',
    metric: '4.2 Bar',
    sublabel: 'Arterial Pressure Grid',
    x: 500,
    y: 160,
    isAbove: true,
    color: '#0284C7',
    description: 'Pressurized distribution network delivering metered flows across sectors.',
  },
  {
    id: 'home',
    step: '04',
    name: 'HOME',
    metric: '140 L',
    sublabel: 'Daily Per-Capita Use',
    x: 690,
    y: 220,
    isAbove: false,
    color: '#0284C7',
    description: 'Domestic consumption with aerators and smart IoT fixture shutoffs.',
  },
  {
    id: 'reuse',
    step: '05',
    name: 'REUSE',
    metric: '74%',
    sublabel: 'Circular Reclamation',
    x: 880,
    y: 170,
    isAbove: true,
    color: '#0D9488',
    description: 'Greywater recovery and district cooling closed-loop recirculation.',
  },
];

export const WaterJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState<StageMarker>(STAGES[1]);
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  // Single Source of Truth for Journey River Geometry (Hits all 5 station coordinates exactly)
  const mainRiverPath = "M 40 140 C 70 145, 90 160, 120 160 C 180 160, 240 220, 310 220 C 380 220, 430 160, 500 160 C 570 160, 620 220, 690 220 C 760 220, 810 170, 880 170 L 960 170";
  const reuseRiverPath = "M 690 220 C 760 220, 810 170, 880 170 L 960 170";

  return (
    <section id="journey" className="py-24 px-8 lg:px-16 max-w-7xl mx-auto border-t border-stone-200/80">
      
      {/* Section Header */}
      <div className="space-y-3 mb-14 select-none">
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#0284C7] uppercase">
          01 · CONTINUOUS WATER LIFECYCLE
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] font-sans">
            <span className="text-[#0A192F] block">WHERE DOES OUR</span>
            <span className="text-[#0284C7] block">WATER GO?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed pt-1">
            Data travels with the stream. Trace the continuous lifecycle of urban water where each station on the river generates real-time telemetry.
          </p>
        </div>
      </div>

      {/* Large Horizontal River Visualization Canvas */}
      <div className="w-full rounded-[2rem] bg-[#FAFAF7] border border-stone-200/80 p-8 sm:p-12 relative overflow-hidden shadow-2xs">
        
        <div className="relative w-full aspect-[21/8] min-h-[300px] flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 360"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            
            {/* Background Subtle Wave Contours */}
            <path
              d="M 40 180 C 180 110, 320 270, 500 120 C 680 120, 820 240, 960 140"
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Continuous Flowing Primary River Path */}
            <path
              d={mainRiverPath}
              stroke="#0284C7"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="12 8"
              className="animate-water-flow"
            />

            {/* Reuse Green Tail Stream */}
            <path
              d={reuseRiverPath}
              stroke="#0D9488"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="12 8"
              className="animate-water-flow-fast"
            />

            {/* 5 Circular Telemetry Nodes Sitting Directly on the River Line */}
            {STAGES.map((stage) => {
              const isSelected = activeStage.id === stage.id;
              const isHovered = hoveredStageId === stage.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <g
                  key={stage.id}
                  className="cursor-pointer"
                  onClick={() => setActiveStage(stage)}
                  onMouseEnter={() => setHoveredStageId(stage.id)}
                  onMouseLeave={() => setHoveredStageId(null)}
                >
                  {/* Invisible Rock-Solid Hit Target */}
                  <circle
                    cx={stage.x}
                    cy={stage.y}
                    r="34"
                    fill="transparent"
                    pointerEvents="all"
                  />

                  {/* Concentric Node Background */}
                  <circle
                    cx={stage.x}
                    cy={stage.y}
                    r={isHighlighted ? 18 : 14}
                    fill="#FFFFFF"
                    stroke={stage.color}
                    strokeWidth="3.5"
                    style={{ transition: 'r 0.2s ease-out' }}
                  />

                  {/* Center Dot */}
                  <circle
                    cx={stage.x}
                    cy={stage.y}
                    r={isHighlighted ? 8 : 5}
                    fill={stage.color}
                    style={{ transition: 'r 0.2s ease-out' }}
                  />

                  {/* Outer Orbit Pulse on Selected */}
                  {isSelected && (
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r="26"
                      stroke={stage.color}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      className="animate-spin"
                      style={{ transformOrigin: `${stage.x}px ${stage.y}px`, animationDuration: '8s' }}
                    />
                  )}

                  {/* Number & Stage Labels above/below without obscuring the river path */}
                  {stage.isAbove ? (
                    <g pointerEvents="none">
                      <text
                        x={stage.x}
                        y={stage.y - 32}
                        textAnchor="middle"
                        fill="#0A192F"
                        fontSize="18"
                        fontWeight="900"
                        fontFamily="sans-serif"
                        className="tracking-tight"
                      >
                        {stage.metric}
                      </text>
                      <text
                        x={stage.x}
                        y={stage.y - 15}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                        letterSpacing="0.05em"
                      >
                        {stage.step} · {stage.name}
                      </text>
                    </g>
                  ) : (
                    <g pointerEvents="none">
                      <text
                        x={stage.x}
                        y={stage.y + 36}
                        textAnchor="middle"
                        fill="#0A192F"
                        fontSize="18"
                        fontWeight="900"
                        fontFamily="sans-serif"
                        className="tracking-tight"
                      >
                        {stage.metric}
                      </text>
                      <text
                        x={stage.x}
                        y={stage.y + 54}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                        letterSpacing="0.05em"
                      >
                        {stage.step} · {stage.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

          </svg>
        </div>

        {/* Selected Stage Telemetry Banner */}
        <div className="pt-4 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2 select-none">
          <span className="font-bold text-[#0A192F]">
            STATION {activeStage.step} ACTIVE: {activeStage.name} ({activeStage.sublabel})
          </span>
          <span className="text-slate-500 font-sans">{activeStage.description}</span>
        </div>

      </div>

    </section>
  );
};
