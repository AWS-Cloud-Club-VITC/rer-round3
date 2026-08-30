import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { EnergySource, UrbanSystem, SelectedSourceId } from '../types/energy';

interface EnergyFlowProps {
  sources: EnergySource[];
  systems: UrbanSystem[];
  availableEnergyKwh: number;
  selectedSourceId: SelectedSourceId;
  onSelectSource: (sourceId: SelectedSourceId) => void;
}

export const EnergyFlow: React.FC<EnergyFlowProps> = ({
  sources,
  availableEnergyKwh,
  selectedSourceId,
  onSelectSource,
}) => {
  const [snapEffect, setSnapEffect] = useState(false);

  const solar = sources.find((s) => s.id === 'solar')!;
  const battery = sources.find((s) => s.id === 'battery')!;
  const grid = sources.find((s) => s.id === 'grid')!;

  const handleNodeClick = (id: 'solar' | 'battery' | 'grid' | 'substation') => {
    setSnapEffect(true);
    setTimeout(() => setSnapEffect(false), 500);

    if (selectedSourceId === id) {
      onSelectSource(null);
    } else {
      onSelectSource(id);
    }
  };

  const isDimmed = (id: string) => {
    if (!selectedSourceId) return false;
    return selectedSourceId !== id;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2 text-[#888888]">
        <div className="flex items-center gap-2 text-white">
          <Zap className="w-3.5 h-3.5 text-[#00A8FF] animate-pulse" />
          <span className="font-bold uppercase tracking-wider">
            PRIMARY BUS TOPOLOGY & PHYSICAL SOURCE NODES
          </span>
        </div>
        <span className="text-[11px] text-[#00A8FF]">
          [CLICK ANY SOURCE TO EXPAND TELEMETRY]
        </span>
      </div>

      {/* Blueprint Electrical Flow Diagram (Dark High-Voltage Interactive SVG) */}
      <div className={`relative w-full aspect-[21/8] select-none ${snapEffect ? 'animate-electrical-snap' : ''}`}>
        <svg viewBox="0 0 900 320" className="w-full h-full">
          <defs>
            <linearGradient id="streamBlueDark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00A8FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>

          {/* Exposed Blueprint Grid Rules */}
          <line x1="100" y1="50" x2="800" y2="50" stroke="#151515" strokeWidth="1" />
          <line x1="100" y1="160" x2="800" y2="160" stroke="#151515" strokeWidth="1" />
          <line x1="100" y1="270" x2="800" y2="270" stroke="#151515" strokeWidth="1" />
          <line x1="450" y1="20" x2="450" y2="300" stroke="#151515" strokeWidth="1" />

          {/* Conduit 1: Solar -> Substation */}
          <path
            d="M 220,60 L 400,60 L 450,140"
            fill="none"
            stroke={selectedSourceId === 'solar' ? '#00E5FF' : '#00A8FF'}
            strokeWidth={selectedSourceId === 'solar' ? '3.5' : '2'}
            strokeDasharray="6 4"
            className={selectedSourceId === 'solar' ? 'animate-energy-stream-fast' : 'animate-energy-stream'}
            opacity={isDimmed('solar') ? 0.2 : 1}
          />

          {/* Conduit 2: Battery -> Substation */}
          <path
            d="M 220,160 L 450,160"
            fill="none"
            stroke={selectedSourceId === 'battery' ? '#00FF88' : '#10B981'}
            strokeWidth={selectedSourceId === 'battery' ? '4' : '2.5'}
            strokeDasharray="6 4"
            className={selectedSourceId === 'battery' ? 'animate-energy-stream-fast' : 'animate-energy-stream'}
            opacity={isDimmed('battery') ? 0.2 : 1}
          />

          {/* Conduit 3: Base Grid -> Substation */}
          <path
            d="M 220,260 L 400,260 L 450,180"
            fill="none"
            stroke={selectedSourceId === 'grid' ? '#00E5FF' : '#0891B2'}
            strokeWidth={selectedSourceId === 'grid' ? '3.5' : '2'}
            strokeDasharray="6 4"
            className={selectedSourceId === 'grid' ? 'animate-energy-stream-fast' : 'animate-energy-stream'}
            opacity={isDimmed('grid') ? 0.2 : 1}
          />

          {/* Conduit 4: Substation -> Main Urban Grid Trunk */}
          <path
            d="M 450,160 L 720,160"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            opacity={isDimmed('substation') ? 0.3 : 1}
          />
          <path
            d="M 450,160 L 720,160"
            fill="none"
            stroke="#00A8FF"
            strokeWidth="2"
            strokeDasharray="8 6"
            className={selectedSourceId === 'substation' ? 'animate-energy-stream-fast' : 'animate-energy-stream'}
            opacity={isDimmed('substation') ? 0.3 : 1}
          />

          {/* SOURCE 1: SOLAR NODE (PHYSICAL POP-OUT) */}
          <g
            transform="translate(100, 60)"
            className="cursor-pointer transition-all duration-300"
            onClick={() => handleNodeClick('solar')}
            opacity={isDimmed('solar') ? 0.25 : 1}
          >
            <rect
              x={selectedSourceId === 'solar' ? '-20' : '-14'}
              y={selectedSourceId === 'solar' ? '-20' : '-14'}
              width={selectedSourceId === 'solar' ? '40' : '28'}
              height={selectedSourceId === 'solar' ? '40' : '28'}
              fill="#0A0A0A"
              stroke="#00A8FF"
              strokeWidth={selectedSourceId === 'solar' ? '2.5' : '1.5'}
            />
            <rect
              x={selectedSourceId === 'solar' ? '-6' : '-4'}
              y={selectedSourceId === 'solar' ? '-6' : '-4'}
              width={selectedSourceId === 'solar' ? '12' : '8'}
              height={selectedSourceId === 'solar' ? '12' : '8'}
              fill="#00A8FF"
              className={selectedSourceId === 'solar' ? 'animate-node-spark' : ''}
            />
            <text x="32" y="-5" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
              [INPUT] SOLAR PHOTOVOLTAIC
            </text>
            <text x="32" y="10" fill="#00A8FF" fontSize="12" fontWeight="800" fontFamily="monospace">
              {solar.currentOutputKwh} kWh {selectedSourceId === 'solar' && '⚡ (CLICKED)'}
            </text>
          </g>

          {/* SOURCE 2: BATTERY NODE (PHYSICAL POP-OUT) */}
          <g
            transform="translate(100, 160)"
            className="cursor-pointer transition-all duration-300"
            onClick={() => handleNodeClick('battery')}
            opacity={isDimmed('battery') ? 0.25 : 1}
          >
            <rect
              x={selectedSourceId === 'battery' ? '-20' : '-14'}
              y={selectedSourceId === 'battery' ? '-20' : '-14'}
              width={selectedSourceId === 'battery' ? '40' : '28'}
              height={selectedSourceId === 'battery' ? '40' : '28'}
              fill="#0A0A0A"
              stroke="#00FF88"
              strokeWidth={selectedSourceId === 'battery' ? '2.5' : '1.5'}
            />
            <rect
              x={selectedSourceId === 'battery' ? '-6' : '-4'}
              y={selectedSourceId === 'battery' ? '-6' : '-4'}
              width={selectedSourceId === 'battery' ? '12' : '8'}
              height={selectedSourceId === 'battery' ? '12' : '8'}
              fill="#00FF88"
              className={selectedSourceId === 'battery' ? 'animate-node-spark' : ''}
            />
            <text x="32" y="-5" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
              [STORAGE] BESS CLEAN RESERVE
            </text>
            <text x="32" y="10" fill="#00FF88" fontSize="12" fontWeight="800" fontFamily="monospace">
              {battery.currentOutputKwh} kWh {selectedSourceId === 'battery' && '⚡ (CLICKED)'}
            </text>
          </g>

          {/* SOURCE 3: BASE GRID NODE (PHYSICAL POP-OUT) */}
          <g
            transform="translate(100, 260)"
            className="cursor-pointer transition-all duration-300"
            onClick={() => handleNodeClick('grid')}
            opacity={isDimmed('grid') ? 0.25 : 1}
          >
            <rect
              x={selectedSourceId === 'grid' ? '-20' : '-14'}
              y={selectedSourceId === 'grid' ? '-20' : '-14'}
              width={selectedSourceId === 'grid' ? '40' : '28'}
              height={selectedSourceId === 'grid' ? '40' : '28'}
              fill="#0A0A0A"
              stroke="#00E5FF"
              strokeWidth={selectedSourceId === 'grid' ? '2.5' : '1.5'}
            />
            <rect
              x={selectedSourceId === 'grid' ? '-6' : '-4'}
              y={selectedSourceId === 'grid' ? '-6' : '-4'}
              width={selectedSourceId === 'grid' ? '12' : '8'}
              height={selectedSourceId === 'grid' ? '12' : '8'}
              fill="#00E5FF"
              className={selectedSourceId === 'grid' ? 'animate-node-spark' : ''}
            />
            <text x="32" y="-5" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
              [GRID] MUNICIPAL BASELINE
            </text>
            <text x="32" y="10" fill="#00E5FF" fontSize="12" fontWeight="800" fontFamily="monospace">
              {grid.currentOutputKwh} kWh (Constant)
            </text>
          </g>

          {/* CENTRAL ROUTER NODE (SUBSTATION POP-OUT) */}
          <g
            transform="translate(450, 160)"
            className="cursor-pointer transition-all duration-300"
            onClick={() => handleNodeClick('substation')}
            opacity={isDimmed('substation') ? 0.3 : 1}
          >
            <rect
              x={selectedSourceId === 'substation' ? '-32' : '-24'}
              y={selectedSourceId === 'substation' ? '-32' : '-24'}
              width={selectedSourceId === 'substation' ? '64' : '48'}
              height={selectedSourceId === 'substation' ? '64' : '48'}
              fill="#0A0A0A"
              stroke={selectedSourceId === 'substation' ? '#00E5FF' : '#FFFFFF'}
              strokeWidth={selectedSourceId === 'substation' ? '3' : '2'}
            />
            <rect
              x={selectedSourceId === 'substation' ? '-14' : '-10'}
              y={selectedSourceId === 'substation' ? '-14' : '-10'}
              width={selectedSourceId === 'substation' ? '28' : '20'}
              height={selectedSourceId === 'substation' ? '28' : '20'}
              fill="#00A8FF"
              className="animate-node-spark"
            />
            <text x="0" y="-36" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              [CONVERSION] CENTRAL SUBSTATION
            </text>
            <text x="0" y="46" fill="#00A8FF" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              {availableEnergyKwh} kWh ROUTED
            </text>
          </g>

          {/* DISTRIBUTION OUTPUT TERMINAL */}
          <g transform="translate(730, 160)" opacity={selectedSourceId ? 0.4 : 1}>
            <rect x="-14" y="-14" width="28" height="28" fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="-4" y="-4" width="8" height="8" fill="#FFFFFF" />
            <text x="25" y="-5" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
              [DISTRIBUTION] CITY SECTORS
            </text>
            <text x="25" y="10" fill="#00FF88" fontSize="11" fontWeight="bold" fontFamily="monospace">
              5 PRIORITY TIERS ⚡
            </text>
          </g>
        </svg>
      </div>

      {/* EXTENDED POP-OUT TELEMETRY ANNOTATION LINE (DIRECT ON CANVAS, NO CARDS) */}
      {selectedSourceId && (
        <div className="pt-4 border-t border-[#1A1A1A] space-y-2 animate-electrical-snap">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#666666] font-bold uppercase tracking-widest">
              POP-OUT TELEMETRY: {selectedSourceId.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={() => onSelectSource(null)}
              className="text-[#00A8FF] hover:text-white text-[10px] cursor-pointer"
            >
              [DISMISS POP-OUT ×]
            </button>
          </div>

          {selectedSourceId === 'solar' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1 text-xs">
              <div>
                <span className="text-[#666666] block text-[10px]">CURRENT GENERATION</span>
                <strong className="text-[#00A8FF] text-sm">{solar.currentOutputKwh} kWh Photovoltaic</strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">SUPPLY CONTRIBUTION</span>
                <strong className="text-white text-sm">
                  {Math.round((solar.currentOutputKwh / availableEnergyKwh) * 100)}% of Grid
                </strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">CLEAN ATTRIBUTION</span>
                <strong className="text-[#00FF88] text-sm">Zero Emissions Active</strong>
              </div>
            </div>
          )}

          {selectedSourceId === 'battery' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1 text-xs">
              <div>
                <span className="text-[#666666] block text-[10px]">BESS STORAGE DISCHARGE</span>
                <strong className="text-[#00FF88] text-sm">{battery.currentOutputKwh} kWh Reserve</strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">STORAGE BUFFER HEALTH</span>
                <strong className="text-white text-sm">
                  {Math.round((battery.currentOutputKwh / 500) * 100)}% Full (500 kWh Max)
                </strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">NOCTURNAL ROLE</span>
                <strong className="text-[#00E5FF] text-sm">Buffering Evening Surge</strong>
              </div>
            </div>
          )}

          {selectedSourceId === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1 text-xs">
              <div>
                <span className="text-[#666666] block text-[10px]">MUNICIPAL BASE FEED</span>
                <strong className="text-[#00E5FF] text-sm">{grid.currentOutputKwh} kWh Constant</strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">GRID STABILITY RATIO</span>
                <strong className="text-white text-sm">
                  {Math.round((grid.currentOutputKwh / availableEnergyKwh) * 100)}% Baseload
                </strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">RELIABILITY STATUS</span>
                <strong className="text-white text-sm">Synchronous AC Feed</strong>
              </div>
            </div>
          )}

          {selectedSourceId === 'substation' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1 text-xs">
              <div>
                <span className="text-[#666666] block text-[10px]">TOTAL ROUTER AGGREGATION</span>
                <strong className="text-white text-sm">{availableEnergyKwh} kWh Available</strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">FEEDER ARTERIES</span>
                <strong className="text-[#00A8FF] text-sm">5 Downstream Urban Branches</strong>
              </div>
              <div>
                <span className="text-[#666666] block text-[10px]">LOAD SHEDDING LOGIC</span>
                <strong className="text-[#00FF88] text-sm">Sequential Priority Waterfall</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Downward Electrical Circuit Trace */}
      <div className="flex flex-col items-center justify-center pt-6">
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#00A8FF] to-[#222222]" />
        <div className="w-2.5 h-2.5 bg-[#00FF88] animate-node-spark my-1 shadow-[0_0_8px_#00FF88]" />
        <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mt-1">
          CURRENT SPLITS INTO 5 URBAN RECEPTOR BRANCHES
        </span>
      </div>
    </div>
  );
};
