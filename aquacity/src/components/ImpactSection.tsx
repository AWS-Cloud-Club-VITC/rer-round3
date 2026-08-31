import React from 'react';
import { Droplet, ArrowUpRight } from 'lucide-react';

interface ImpactSectionProps {
  onExploreClick: () => void;
  onOpenSpecs: () => void;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({
  onExploreClick,
  onOpenSpecs,
}) => {
  return (
    <section id="impact" className="py-28 px-8 lg:px-16 max-w-5xl mx-auto text-center space-y-8 border-t border-stone-200/80">
      
      {/* Pill Tag */}
      <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-[#0284C7] uppercase">
        <Droplet className="w-3.5 h-3.5 fill-[#0284C7] text-[#0284C7]" />
        <span>AQUACITY SUSTAINABILITY INITIATIVE</span>
      </div>

      {/* Giant Editorial Headline */}
      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#0A192F] leading-[0.95] font-sans">
        A SUSTAINABLE CITY<br />
        <span className="text-[#0284C7]">
          STARTS WITH WATER.
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed font-sans">
        Every drop saved today shapes a cleaner, more resilient urban habitat for future generations.
      </p>

      {/* Action Link */}
      <div className="pt-4">
        <button
          onClick={onExploreClick}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A192F] hover:text-[#0284C7] tracking-wider uppercase border-b border-[#0A192F] pb-0.5 transition-colors cursor-pointer font-sans"
        >
          <span>BUILD A BETTER CITY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Minimal Editorial Footer (Team names completely removed, specs hidden subtly) */}
      <div className="pt-24 mt-16 border-t border-stone-200/80 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Clean Editorial Brand Text */}
        <div className="flex items-center gap-2 text-slate-500">
          <span className="font-bold text-[#0A192F]">AQUACITY</span>
          <span>—</span>
          <span>SDG 06 · CLEAN WATER & SANITATION</span>
          <span>·</span>
          <span>VIT CHENNAI</span>
        </div>

        {/* Right: Extremely Subtle Hidden Specs Corner Element */}
        <div className="flex items-center">
          <button
            onClick={onOpenSpecs}
            className="text-[10px] text-slate-300 hover:text-slate-500 font-mono tracking-tight transition-colors cursor-pointer"
            title="System Specifications"
          >
            · specs
          </button>
        </div>

      </div>

    </section>
  );
};
