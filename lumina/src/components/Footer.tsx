import React from 'react';
import { Building2, SunMedium, Zap, Shield } from 'lucide-react';

interface FooterProps {
  onNavigateOrganizer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateOrganizer }) => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#222222] mt-12 space-y-8 font-mono text-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-[#00A8FF] stroke-[2.5]" />
            <span className="font-black text-sm tracking-tight text-white font-mono uppercase">
              LUMINA
            </span>
          </div>
          <p className="text-[#777777] font-sans text-xs">
            Industrial electrical control architecture for resilient urban life after dark.
          </p>
        </div>

        {/* SDG Badges */}
        <div className="flex flex-wrap items-center gap-6 text-[#888888]">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#FFB000]" />
            <div>
              <strong className="block text-white">SDG 11</strong>
              <span className="text-[10px] text-[#666666] font-sans">Sustainable Cities & Communities</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SunMedium className="w-4 h-4 text-[#00A8FF]" />
            <div>
              <strong className="block text-white">SDG 7</strong>
              <span className="text-[10px] text-[#666666] font-sans">Affordable & Clean Energy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#666666] text-[11px]">
        <span>LUMINA © 2026 • HIGH-VOLTAGE CONTROL SYSTEM</span>
        <div className="flex items-center gap-6">
          <span className="text-[#888888]">POWERING A BETTER CITY.</span>
          {onNavigateOrganizer && (
            <button
              type="button"
              onClick={onNavigateOrganizer}
              className="text-[#888888] hover:text-[#00A8FF] transition-colors cursor-pointer text-[10px] flex items-center gap-1"
              title="Evaluation Rubric"
            >
              <Shield className="w-3 h-3" />
              <span>[EVALUATION GUIDE]</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
