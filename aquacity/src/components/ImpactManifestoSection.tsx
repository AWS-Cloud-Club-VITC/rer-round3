import React from 'react';
import { Droplet, ArrowUpRight } from 'lucide-react';

interface ImpactManifestoSectionProps {
  onExploreClick: () => void;
}

export const ImpactManifestoSection: React.FC<ImpactManifestoSectionProps> = ({ onExploreClick }) => {
  return (
    <div className="w-full space-y-0">
      
      {/* Top Panoramic Water Photography Banner (Exact match to reference) */}
      <div className="w-full h-36 sm:h-44 md:h-52 overflow-hidden relative border-b border-stone-200">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt="Ocean water ripples and waves"
          className="w-full h-full object-cover object-center brightness-105 contrast-95"
          loading="eager"
        />
        {/* Soft gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Main Manifesto Section */}
      <section id="impact" className="py-24 sm:py-32 px-6 lg:px-12 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-cyan-900 uppercase">
          <Droplet className="w-3.5 h-3.5 fill-cyan-600 text-cyan-600" />
          <span>AQUACITY SUSTAINABILITY INITIATIVE</span>
        </div>

        {/* Huge Headline: A SUSTAINABLE CITY / STARTS WITH WATER. */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-950 leading-[0.95] font-sans">
          A SUSTAINABLE CITY<br />
          <span className="text-[#0284c7]">
            STARTS WITH WATER.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
          Every drop saved today shapes a cleaner, more resilient urban habitat for future generations.
        </p>

        {/* Action Link */}
        <div className="pt-4">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 hover:text-sky-700 tracking-wider uppercase border-b border-slate-950 pb-0.5 transition-colors cursor-pointer font-sans"
          >
            <span>BUILD A BETTER CITY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </section>

    </div>
  );
};
