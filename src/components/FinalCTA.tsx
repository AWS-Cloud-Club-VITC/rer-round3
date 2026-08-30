import React from 'react';
import { ArrowUpRight, Droplet } from 'lucide-react';

interface FinalCTAProps {
  onExplore: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExplore }) => {
  return (
    <section className="py-36 px-6 lg:px-12 bg-white border-t border-slate-200/60 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-800 tracking-widest uppercase border-b border-sky-300 pb-1">
          <Droplet className="w-4 h-4 text-sky-700 fill-sky-700" />
          <span>AQUACITY SUSTAINABILITY INITIATIVE</span>
        </div>

        <h2 className="text-6xl sm:text-8xl font-black text-slate-950 tracking-tighter uppercase leading-[0.9]">
          A SUSTAINABLE CITY <br />
          <span className="text-sky-700">STARTS WITH WATER.</span>
        </h2>

        <p className="text-slate-600 text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Every drop saved today shapes a cleaner, more resilient urban habitat for future generations.
        </p>

        <div className="pt-6">
          <button
            onClick={onExplore}
            className="editorial-link text-lg font-black cursor-pointer group"
          >
            <span>BUILD A BETTER CITY</span>
            <ArrowUpRight className="w-6 h-6 text-sky-700 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
