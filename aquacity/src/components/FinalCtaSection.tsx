import React from 'react';

interface FinalCtaSectionProps {
  onScrollToTop?: () => void;
  onOpenSpecs: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenSpecs,
}) => {
  return (
    <footer className="w-full border-t border-stone-200/90 py-8 px-8 lg:px-16 text-[11px] font-mono text-slate-400 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Footer Label */}
        <div className="flex items-center gap-2 text-slate-500">
          <span className="font-bold text-[#0A192F]">AQUACITY</span>
          <span>—</span>
          <span>SDG 06 · CLEAN WATER & SANITATION</span>
          <span>·</span>
          <span>VIT CHENNAI</span>
        </div>

        {/* Right Footer Subtle Specs Link */}
        <div className="flex items-center">
          <button
            onClick={onOpenSpecs}
            className="text-[10px] text-slate-300 hover:text-slate-500 font-mono tracking-tight transition-colors cursor-pointer"
          >
            · specs
          </button>
        </div>

      </div>
    </footer>
  );
};
