import React, { useState } from 'react';
import {
  UrbanSystem,
  EnergySimulationResult,
  SimulationInputs,
} from '../types/energy';

interface CitySceneProps {
  simulation: EnergySimulationResult;
  currentInputs: SimulationInputs;
  onSelectSystem: (system: UrbanSystem | null) => void;
  selectedSystem: UrbanSystem | null;
}

export const CityScene: React.FC<CitySceneProps> = ({
  simulation,
  onSelectSystem,
  selectedSystem,
}) => {
  const [hoveredSystemId, setHoveredSystemId] = useState<string | null>(null);
  const [snapEffect, setSnapEffect] = useState(false);

  const { systems } = simulation;
  const hospital = systems.find((s) => s.id === 'hospital')!;
  const transit = systems.find((s) => s.id === 'transit')!;
  const lighting = systems.find((s) => s.id === 'lighting')!;
  const residential = systems.find((s) => s.id === 'residential')!;
  const offices = systems.find((s) => s.id === 'offices')!;

  const handleSystemClick = (sys: UrbanSystem) => {
    setSnapEffect(true);
    setTimeout(() => setSnapEffect(false), 500);

    if (selectedSystem?.id === sys.id) {
      onSelectSystem(null);
    } else {
      onSelectSystem(sys);
    }
  };

  const isDimmed = (id: string) => {
    if (!selectedSystem) return false;
    return selectedSystem.id !== id;
  };

  const getGlowOpacity = (percentage: number) => {
    if (percentage >= 98) return 1.0;
    if (percentage >= 70) return 0.8;
    if (percentage >= 30) return 0.5;
    if (percentage > 0) return 0.25;
    return 0.05;
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-8 font-mono text-xs">
      {/* Section Header Line */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#00A8FF] font-extrabold tracking-widest uppercase">
            03 / INFRASTRUCTURE POP-OUT NETWORK
          </span>
          <div className="w-12 h-[1px] bg-[#00A8FF]" />
          <span className="text-[#888888]">
            PHYSICAL RECEPTOR SELECTION & BRANCH SURGE
          </span>
        </div>
        <span className="text-[11px] text-[#00A8FF]">
          [CLICK SECTOR TO POP OUT OF CIRCUIT]
        </span>
      </div>

      {/* Floating Header Telemetry Text (Dark High-Contrast) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1A1A] pb-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00FF88] animate-ping" />
            <span className="font-bold text-white uppercase">BUS CIRCUIT ACTIVE</span>
          </div>
          <span className="text-[#888888]">
            SUPPLY: <strong className="text-[#00A8FF]">{simulation.availableEnergyKwh} kWh</strong>
          </span>
          <span className="text-[#888888]">
            DEMAND: <strong className="text-white">{simulation.totalDemandKwh} kWh</strong>
          </span>
        </div>

        <div className="text-[11px] font-bold">
          {simulation.isShortage ? (
            <span className="text-[#FFB000]">DEFICIT LOAD SHED: -{simulation.energyGapKwh} kWh</span>
          ) : (
            <span className="text-[#00FF88]">SURPLUS BUFFER: +{simulation.availableEnergyKwh - simulation.totalDemandKwh} kWh</span>
          )}
        </div>
      </div>

      {/* MAIN ARCHITECTURAL VECTOR CITY BLUEPRINT CANVAS (PHYSICAL POP-OUT) */}
      <div className={`relative w-full aspect-[16/10] sm:aspect-[21/9] select-none border border-[#222222] bg-[#080808] ${snapEffect ? 'animate-electrical-snap' : ''}`}>
        <svg
          viewBox="0 0 900 380"
          className="w-full h-full"
          aria-label="Dark Electrical City Blueprint"
        >
          <defs>
            <filter id="hospitalGlowDark" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="streetGlowDark" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Canvas Background */}
          <rect width="900" height="380" fill="#080808" />

          {/* Background Architectural Skyline Outlines */}
          <path
            d="M 0,320 L 40,240 L 70,240 L 70,200 L 110,200 L 110,280 L 160,280 L 190,160 L 230,160 L 250,220 L 310,220 L 330,180 L 390,180 L 410,250 L 470,250 L 500,150 L 540,150 L 570,230 L 630,230 L 660,170 L 720,170 L 750,260 L 810,260 L 840,210 L 900,210 L 900,380 L 0,380 Z"
            fill="#0F0F0F"
            stroke="#1E1E1E"
            strokeWidth="1"
            opacity={selectedSystem ? 0.35 : 1}
          />

          {/* Electrical Feeder Lines Branching Out */}
          <path
            d="M 0,260 L 115,260 L 115,120"
            fill="none"
            stroke={hospital.poweredPercentage > 0 ? '#00FF88' : '#222222'}
            strokeWidth={selectedSystem?.id === 'hospital' ? '4' : '2'}
            strokeDasharray="4 4"
            className={selectedSystem?.id === 'hospital' ? 'animate-energy-stream-fast' : 'animate-energy-stream'}
            opacity={isDimmed('hospital') ? 0.15 : 1}
          />
          <path
            d="M 0,260 L 300,260 L 300,90"
            fill="none"
            stroke={residential.poweredPercentage > 0 ? '#00E5FF' : '#222222'}
            strokeWidth={selectedSystem?.id === 'residential' ? '4' : '2'}
            strokeDasharray="4 4"
            className={selectedSystem?.id === 'residential' ? 'animate-energy-stream-fast' : 'animate-energy-stream'}
            opacity={isDimmed('residential') ? 0.15 : 1}
          />
          <path
            d="M 0,260 L 780,260 L 780,70"
            fill="none"
            stroke={offices.poweredPercentage > 0 ? '#00A8FF' : '#222222'}
            strokeWidth={selectedSystem?.id === 'offices' ? '4' : '2'}
            strokeDasharray="4 4"
            className={selectedSystem?.id === 'offices' ? 'animate-energy-stream-fast' : 'animate-energy-stream'}
            opacity={isDimmed('offices') ? 0.15 : 1}
          />

          {/* SECTOR 1: HOSPITAL COMPLEX (PHYSICAL POP-OUT) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredSystemId('hospital')}
            onMouseLeave={() => setHoveredSystemId(null)}
            onClick={() => handleSystemClick(hospital)}
            opacity={isDimmed('hospital') ? 0.2 : 1}
          >
            <rect
              x={selectedSystem?.id === 'hospital' ? '45' : '50'}
              y={selectedSystem?.id === 'hospital' ? '110' : '120'}
              width={selectedSystem?.id === 'hospital' ? '140' : '130'}
              height={selectedSystem?.id === 'hospital' ? '210' : '200'}
              fill="#0D0D0D"
              stroke={
                hoveredSystemId === 'hospital' || selectedSystem?.id === 'hospital'
                  ? '#00FF88'
                  : '#333333'
              }
              strokeWidth={selectedSystem?.id === 'hospital' ? '3' : '1'}
            />
            <rect x="35" y="200" width="50" height="120" fill="#0A0A0A" stroke="#222222" strokeWidth="1" />

            {/* Emergency Beacon Cross */}
            <g transform="translate(115, 100)" className={hospital.poweredPercentage > 0 ? 'animate-beacon' : ''}>
              <circle
                r={selectedSystem?.id === 'hospital' ? '22' : '16'}
                fill="#00FF88"
                fillOpacity={getGlowOpacity(hospital.poweredPercentage) * 0.4}
                filter="url(#hospitalGlowDark)"
              />
              <rect x="-3" y="-9" width="6" height="18" fill="#00FF88" />
              <rect x="-9" y="-3" width="18" height="6" fill="#00FF88" />
            </g>

            {/* Windows */}
            <g fill="#00FF88" opacity={getGlowOpacity(hospital.poweredPercentage)}>
              <rect x="65" y="140" width="18" height="12" />
              <rect x="90" y="140" width="18" height="12" />
              <rect x="115" y="140" width="18" height="12" />
              <rect x="140" y="140" width="18" height="12" />
              <rect x="65" y="165" width="18" height="12" />
              <rect x="90" y="165" width="18" height="12" />
              <rect x="115" y="165" width="18" height="12" />
              <rect x="140" y="165" width="18" height="12" />
              <rect x="65" y="190" width="18" height="12" />
              <rect x="90" y="190" width="18" height="12" />
              <rect x="115" y="190" width="18" height="12" />
              <rect x="140" y="190" width="18" height="12" />
            </g>

            <text
              x="115"
              y="295"
              fill="#00FF88"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              HOSPITAL ⚡ {hospital.poweredPercentage}% {selectedSystem?.id === 'hospital' && '(SELECTED)'}
            </text>
          </g>

          {/* SECTOR 2: RESIDENTIAL DISTRICT (PHYSICAL POP-OUT) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredSystemId('residential')}
            onMouseLeave={() => setHoveredSystemId(null)}
            onClick={() => handleSystemClick(residential)}
            opacity={isDimmed('residential') ? 0.2 : 1}
          >
            <rect
              x={selectedSystem?.id === 'residential' ? '205' : '210'}
              y={selectedSystem?.id === 'residential' ? '80' : '90'}
              width={selectedSystem?.id === 'residential' ? '110' : '100'}
              height={selectedSystem?.id === 'residential' ? '240' : '230'}
              fill="#0D0D0D"
              stroke={
                hoveredSystemId === 'residential' || selectedSystem?.id === 'residential'
                  ? '#00E5FF'
                  : '#333333'
              }
              strokeWidth={selectedSystem?.id === 'residential' ? '3' : '1'}
            />
            <rect x="320" y="140" width="85" height="180" fill="#0A0A0A" stroke="#222222" strokeWidth="1" />

            <g fill="#00E5FF" opacity={getGlowOpacity(residential.poweredPercentage) * 0.9}>
              <rect x="225" y="110" width="12" height="10" />
              <rect x="245" y="110" width="12" height="10" />
              <rect x="265" y="110" width="12" height="10" />
              <rect x="285" y="110" width="12" height="10" />
              <rect x="225" y="130" width="12" height="10" />
              <rect x="245" y="130" width="12" height="10" />
              <rect x="265" y="130" width="12" height="10" />
              <rect x="285" y="130" width="12" height="10" />
              <rect x="225" y="150" width="12" height="10" />
              <rect x="245" y="150" width="12" height="10" />
              <rect x="265" y="150" width="12" height="10" />
              <rect x="285" y="150" width="12" height="10" />
            </g>

            <text
              x="300"
              y="295"
              fill="#00E5FF"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              RESIDENTIAL ⚡ {residential.poweredPercentage}%
            </text>
          </g>

          {/* SECTOR 3: COMMERCIAL OFFICES (PHYSICAL POP-OUT) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredSystemId('offices')}
            onMouseLeave={() => setHoveredSystemId(null)}
            onClick={() => handleSystemClick(offices)}
            opacity={isDimmed('offices') ? 0.2 : 1}
          >
            <polygon
              points={
                selectedSystem?.id === 'offices'
                  ? '695,60 795,100 795,325 695,325'
                  : '700,70 790,110 790,320 700,320'
              }
              fill="#0D0D0D"
              stroke={
                hoveredSystemId === 'offices' || selectedSystem?.id === 'offices'
                  ? '#00A8FF'
                  : '#333333'
              }
              strokeWidth={selectedSystem?.id === 'offices' ? '3' : '1'}
            />
            <rect x="800" y="130" width="75" height="190" fill="#0A0A0A" stroke="#222222" strokeWidth="1" />

            <g fill="#00A8FF" opacity={getGlowOpacity(offices.poweredPercentage) * 0.85}>
              <rect x="715" y="130" width="60" height="6" />
              <rect x="715" y="145" width="60" height="6" />
              <rect x="715" y="160" width="60" height="6" />
              <rect x="715" y="175" width="60" height="6" />
              <rect x="715" y="190" width="60" height="6" />
              <rect x="715" y="205" width="60" height="6" />
            </g>

            <text
              x="780"
              y="295"
              fill="#00A8FF"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              OFFICES ⚡ {offices.poweredPercentage}%
            </text>
          </g>

          {/* SECTOR 4: PUBLIC TRANSIT MONORAIL (PHYSICAL POP-OUT) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredSystemId('transit')}
            onMouseLeave={() => setHoveredSystemId(null)}
            onClick={() => handleSystemClick(transit)}
            opacity={isDimmed('transit') ? 0.2 : 1}
          >
            <path
              d="M 0,260 Q 250,240 500,250 T 900,230"
              fill="none"
              stroke="#222222"
              strokeWidth="8"
              strokeLinecap="square"
            />
            <path
              d="M 0,260 Q 250,240 500,250 T 900,230"
              fill="none"
              stroke={transit.poweredPercentage > 0 ? '#00A8FF' : '#333333'}
              strokeWidth={selectedSystem?.id === 'transit' ? '3.5' : '2'}
              strokeDasharray="8 8"
              opacity={getGlowOpacity(transit.poweredPercentage)}
            />

            <g transform="translate(430, 230)" opacity={getGlowOpacity(transit.poweredPercentage)}>
              <rect
                x="0"
                y="0"
                width={selectedSystem?.id === 'transit' ? '90' : '80'}
                height="16"
                fill="#00A8FF"
                stroke="#00E5FF"
                strokeWidth="1"
              />
              <rect x="10" y="4" width="10" height="8" fill="#050505" />
              <rect x="26" y="4" width="10" height="8" fill="#050505" />
              <rect x="42" y="4" width="10" height="8" fill="#050505" />
              <rect x="58" y="4" width="10" height="8" fill="#050505" />
            </g>

            <text
              x="505"
              y="215"
              fill="#00A8FF"
              fontSize="9.5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              TRANSIT MONORAIL ⚡ {transit.poweredPercentage}%
            </text>
          </g>

          {/* SECTOR 5: STREET LIGHTING AVENUE (PHYSICAL POP-OUT) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredSystemId('lighting')}
            onMouseLeave={() => setHoveredSystemId(null)}
            onClick={() => handleSystemClick(lighting)}
            opacity={isDimmed('lighting') ? 0.2 : 1}
          >
            <rect x="0" y="335" width="900" height="45" fill="#0A0A0A" />
            <path d="M 0,355 L 900,355" stroke="#222222" strokeWidth="1.5" strokeDasharray="15 10" />

            {[80, 240, 400, 560, 720, 860].map((lampX, idx) => (
              <g key={idx} transform={`translate(${lampX}, 315)`}>
                <polygon
                  points="-30,40 30,40 0,0"
                  fill="#FFB000"
                  opacity={getGlowOpacity(lighting.poweredPercentage) * 0.4}
                  filter="url(#streetGlowDark)"
                />
                <path d="M 0,40 L 0,0 C 0,-8 10,-10 12,-5" fill="none" stroke="#444444" strokeWidth="2" />
                <circle cx="12" cy="-3" r="3.5" fill="#FFB000" opacity={getGlowOpacity(lighting.poweredPercentage)} />
              </g>
            ))}

            <text
              x="450"
              y="370"
              fill="#FFB000"
              fontSize="9.5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              STREET LIGHTING NETWORK ⚡ {lighting.poweredPercentage}%
            </text>
          </g>
        </svg>
      </div>

      {/* EXTENDED POP-OUT TECHNICAL ANNOTATIONS (PHYSICALLY EXPANDED DIRECTLY ON CANVAS) */}
      {selectedSystem && (
        <div className="pt-4 border-t border-[#1A1A1A] space-y-4 animate-electrical-snap">
          <div className="flex items-center justify-between border-b border-[#151515] pb-2">
            <div>
              <span className="text-[10px] text-[#666666] block uppercase tracking-widest">
                POP-OUT RECEPTOR: TIER {selectedSystem.priority} • {selectedSystem.criticality}
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight font-mono uppercase">
                {selectedSystem.name}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`font-black text-sm ${
                  selectedSystem.poweredPercentage >= 98
                    ? 'text-[#00FF88]'
                    : selectedSystem.poweredPercentage >= 70
                    ? 'text-[#00A8FF]'
                    : selectedSystem.poweredPercentage > 0
                    ? 'text-[#FFB000]'
                    : 'text-[#FF4444]'
                }`}
              >
                {selectedSystem.powerState} ({selectedSystem.poweredPercentage}%) ⚡
              </span>
              <button
                type="button"
                onClick={() => onSelectSystem(null)}
                className="text-[#00A8FF] hover:text-white text-[11px] cursor-pointer"
              >
                [COLLAPSE POP-OUT ×]
              </button>
            </div>
          </div>

          <p className="text-[#AAAAAA] font-sans text-xs sm:text-sm leading-relaxed max-w-3xl">
            {selectedSystem.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 border-t border-[#151515]">
            <div>
              <span className="text-[10px] text-[#666666] block">DEMAND</span>
              <span className="text-base font-black text-white">
                {selectedSystem.currentDemandKwh} kWh
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#666666] block">ALLOCATED SUPPLY</span>
              <span className="text-base font-black text-[#00FF88]">
                {selectedSystem.allocatedKwh} kWh
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#666666] block">FULFILLMENT</span>
              <span className="text-base font-black text-[#00A8FF]">
                {selectedSystem.poweredPercentage}%
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#666666] block">PRIORITY RANK</span>
              <span className="text-base font-black text-white">
                Tier {selectedSystem.priority} / 5
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Downward Electrical Circuit Trace */}
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#00A8FF] to-[#222222]" />
        <div className="w-2.5 h-2.5 bg-[#00E5FF] animate-node-spark my-1 shadow-[0_0_8px_#00E5FF]" />
        <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mt-1">
          CURRENT FEEDS INTO DETERMINISTIC DECISION LOGIC
        </span>
      </div>
    </section>
  );
};
