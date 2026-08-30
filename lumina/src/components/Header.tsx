import React, { useState, useEffect } from 'react';
import { Zap, Clock, RotateCcw } from 'lucide-react';
import { DiurnalPhase } from '../types/energy';
import { getDiurnalPhase, getTimeProfileInfo } from '../utils/timeProfile';

interface HeaderProps {
  onReset: () => void;
  onNavigateSection?: (sectionId: string) => void;
  activeSection?: string;
  onPhaseChange?: (phase: DiurnalPhase) => void;
  scrollProgress?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onNavigateSection,
  activeSection = 'city',
  onPhaseChange,
  scrollProgress = 0,
}) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      if (onPhaseChange) {
        onPhaseChange(getDiurnalPhase(now));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onPhaseChange]);

  const phase = getDiurnalPhase(time);
  const phaseInfo = getTimeProfileInfo(phase);

  const formattedDay = time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const formattedDate = time.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const navItems = [
    { id: 'city', label: '01 POWER' },
    { id: 'architecture', label: '02 ARCHITECTURE' },
    { id: 'infrastructure', label: '03 INFRASTRUCTURE' },
    { id: 'intelligence', label: '04 INTELLIGENCE' },
    { id: 'resilience', label: '05 RESILIENCE' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-sm border-b border-[#222222]">
      {/* Global Thin Electrical Progress Trace with Traveling Spark */}
      <div className="relative w-full h-[2px] bg-[#151515] overflow-hidden">
        <div
          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#00A8FF] via-[#00E5FF] to-[#00FF88] transition-all duration-150 shadow-[0_0_8px_#00A8FF]"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
        {/* Active Traveling Spark */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] pointer-events-none transition-all duration-150"
          style={{ left: `calc(${Math.min(100, Math.max(0, scrollProgress * 100))}% - 5px)` }}
        />
      </div>

      {/* Main Brutalist Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-[#00A8FF] animate-current-pulse stroke-[2.5]" />
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black tracking-tight text-white font-mono uppercase">
                LUMINA<span className="text-xs text-[#00A8FF]">®</span>
              </span>
              <span className="hidden sm:inline text-[9px] font-mono text-[#00FF88] font-bold">
                [HIGH VOLTAGE ACTIVE]
              </span>
            </div>
            <div className="text-[9px] font-mono text-[#666666] tracking-widest uppercase">
              URBAN ENERGY CONTROL SYSTEM
            </div>
          </div>
        </div>

        {/* Center Nav Items — Brutalist Monospaced Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono font-bold">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigateSection && onNavigateSection(item.id)}
                className={`relative py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive ? 'text-white font-black' : 'text-[#777777] hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-[#00A8FF] shadow-[0_0_6px_#00A8FF]" />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00A8FF]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Live System Clock & Diurnal Indicator */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-2 text-[#888888]">
            <span className="text-[#00E5FF] font-bold tracking-wider">
              {phaseInfo.label} ⚡
            </span>
            <span className="text-[#333333]">•</span>
            <Clock className="w-3.5 h-3.5 text-[#666666]" />
            <span className="hidden md:inline text-[#666666]">
              {formattedDay} {formattedDate}
            </span>
            <span className="text-white font-extrabold tracking-wider">
              {formattedTime}
            </span>
          </div>

          {/* Borderless Reset Circuit Trigger */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-[#666666] hover:text-[#00A8FF] transition-colors cursor-pointer text-[11px] font-mono tracking-tight"
            title="Reset Energy Circuit"
          >
            <RotateCcw className="w-3 h-3" />
            <span>[RESET]</span>
          </button>
        </div>
      </div>
    </header>
  );
};
