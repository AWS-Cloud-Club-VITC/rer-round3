import React from 'react';
import { Droplet } from 'lucide-react';

export const HeroSection: React.FC = () => {
  // Single Source of Truth for Hero River Geometry
  const riverPath = "M 400 70 C 330 110, 240 170, 260 250 C 280 330, 200 390, 130 430";

  return (
    <section className="relative w-full pt-16 pb-24 px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
        
        {/* Left Column (58% width): Giant Editorial Headline */}
        <div className="lg:col-span-7 space-y-8 z-10 select-none">
          
          {/* Top Tag: SDG 06 · CLEAN WATER & SANITATION */}
          <div className="inline-block">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-[#0284C7] uppercase pb-1 border-b border-[#0284C7]/60">
              <Droplet className="w-3.5 h-3.5 fill-[#0284C7] text-[#0284C7]" />
              <span>SDG 06 · CLEAN WATER & SANITATION</span>
            </div>
          </div>

          {/* Enormous 3-Color Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black tracking-tight leading-[0.88] font-sans">
            <span className="text-[#0A192F] block">EVERY DROP</span>
            <span className="text-[#0284C7] block">SHAPES A</span>
            <span className="text-[#0D9488] block">CITY.</span>
          </h1>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-xl font-normal leading-relaxed font-sans pt-2">
            Follow the continuous flow of water as it journeys through the natural watershed, powers urban infrastructure, and shapes resilient sustainable communities.
          </p>

        </div>

        {/* Right Column (42% width): Flowing River SVG Diagram */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] pointer-events-none select-none">
          
          <div className="relative w-full h-[460px] max-w-[480px]">
            <svg className="w-full h-full" viewBox="0 0 500 500" fill="none" preserveAspectRatio="xMidYMid meet">
              
              {/* Background Reference Orbital Ellipses */}
              <ellipse
                cx="280"
                cy="260"
                rx="160"
                ry="85"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              
              {/* Secondary Diagonal Reference Line */}
              <line
                x1="120"
                y1="170"
                x2="300"
                y2="350"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                strokeOpacity="0.8"
              />

              {/* Glowing Outer River Layer */}
              <path
                d={riverPath}
                stroke="#38BDF8"
                strokeWidth="18"
                strokeLinecap="round"
                strokeOpacity="0.18"
              />

              {/* Main River Flow Path (Thick Curved Segmented Blue Stream) */}
              <path
                d={riverPath}
                stroke="#0284C7"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="12 8"
                className="animate-water-flow"
              />

              {/* Center Concentric Station Node (Exact intersection at x:260, y:250 on riverPath) */}
              <g transform="translate(0, 0)">
                <circle cx="260" cy="250" r="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
                <circle cx="260" cy="250" r="6" fill="#0284C7" />
                <circle
                  cx="260"
                  cy="250"
                  r="24"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="animate-spin"
                  style={{ transformOrigin: '260px 250px', animationDuration: '10s' }}
                />
              </g>

              {/* Headwaters Start Node (x:400, y:70) */}
              <circle cx="400" cy="70" r="6" fill="#0284C7" />
              
              {/* Inlet End Node (x:130, y:430) */}
              <circle cx="130" cy="430" r="6" fill="#0284C7" />

              {/* Top Technical Labels */}
              <text x="400" y="44" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="0.1em">
                HEADWATERS
              </text>
              <text x="400" y="58" textAnchor="middle" fill="#0A192F" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="0.05em">
                ALPINE WATERSHED
              </text>

              {/* Bottom Technical Labels */}
              <text x="130" y="405" textAnchor="end" fill="#0284C7" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="0.1em">
                RIVER FLOW INLET
              </text>
              <text x="130" y="420" textAnchor="end" fill="#0A192F" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="0.05em">
                ENTERING CITY GRID ↓
              </text>

            </svg>
          </div>

        </div>

      </div>
    </section>
  );
};
