import React from 'react';
import { ArrowUpRight, Droplet } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 py-24 overflow-hidden">
      
      {/* Background Ambient River Glow */}
      <div className="absolute top-1/3 right-10 -z-10 w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative">
        
        {/* Left Column: Huge Editorial Typography */}
        <div className="lg:col-span-7 space-y-10 z-10">
          
          {/* SDG Label */}
          <div className="inline-flex items-center gap-2.5 text-xs font-mono font-bold text-sky-800 tracking-widest uppercase border-b border-sky-300 pb-1">
            <Droplet className="w-4 h-4 fill-sky-600 text-sky-600" />
            <span>SDG 06 · CLEAN WATER & SANITATION</span>
          </div>

          {/* Huge Headline */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-[0.88] uppercase">
            EVERY DROP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-600 to-teal-600">
              SHAPES A CITY.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xl sm:text-2xl text-slate-600 font-light max-w-2xl leading-relaxed">
            Follow the continuous flow of water as it journeys through the natural watershed, powers urban infrastructure, and shapes resilient sustainable communities.
          </p>

          {/* Editorial Link CTA */}
          <div className="pt-4 flex items-center gap-8">
            <button
              onClick={onExplore}
              className="editorial-link text-base sm:text-lg cursor-pointer group"
            >
              <span>FOLLOW THE RIVER</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-sky-700" />
            </button>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
              SCROLL TO EXPLORE ↓
            </span>
          </div>
        </div>

        {/* Right Column: Originating River Headwaters Art */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="w-full max-w-lg aspect-square relative flex items-center justify-center">
            
            {/* Fluid River Origin SVG */}
            <svg
              className="w-full h-full text-sky-600 overflow-visible"
              viewBox="0 0 450 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <filter id="riverGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Landscape Elevation Contour Rings */}
              <path d="M 40,225 C 100,100 350,80 410,225 C 350,370 100,350 40,225 Z" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 6" />
              <path d="M 90,225 C 140,140 310,120 360,225 C 310,330 140,310 90,225 Z" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

              {/* Main Origin River Stream winding from top right through center to bottom */}
              <path
                d="M 380,40 C 320,120 180,100 220,220 C 260,320 120,360 80,440"
                stroke="url(#riverGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                filter="url(#riverGlow)"
                className="animate-water-flow"
              />

              {/* Secondary Tributary Stream */}
              <path
                d="M 60,60 C 140,120 180,180 220,220"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-water-flow-fast"
              />

              {/* Headwaters Origin Hotspot Node */}
              <circle cx="380" cy="40" r="8" fill="#0284c7" className="animate-ping" />
              <circle cx="380" cy="40" r="6" fill="#0369a1" />

              {/* Confluence Pulse Hotspot */}
              <circle cx="220" cy="220" r="12" fill="#0ea5e9" className="animate-pulse" />
              <circle cx="220" cy="220" r="6" fill="#ffffff" />
            </svg>

            {/* Floating Editorial Origin Annotations */}
            <div className="absolute top-2 right-4 text-right space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-widest block">HEADWATERS</span>
              <span className="text-xs font-black text-slate-900 font-mono">ALPINE WATERSHED</span>
            </div>

            <div className="absolute bottom-6 left-0 text-left space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-teal-700 uppercase tracking-widest block">RIVER FLOW INLET</span>
              <span className="text-xs font-black text-slate-900 font-mono">ENTERING CITY GRID ↓</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
