import React, { useEffect, useState } from 'react';
import { ShieldCheck, Leaf, Battery, Sparkles, Activity } from 'lucide-react';
import { EnergySimulationResult } from '../types/energy';

interface ResilienceProps {
  simulation: EnergySimulationResult;
}

export const Resilience: React.FC<ResilienceProps> = ({ simulation }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isScoreExpanded, setIsScoreExpanded] = useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = useState(false);
  const [snapEffect, setSnapEffect] = useState(false);

  useEffect(() => {
    let start = 0;
    const target = simulation.resilienceScore;
    const duration = 400;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = (target - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [simulation.resilienceScore]);

  const handleScoreClick = () => {
    setSnapEffect(true);
    setTimeout(() => setSnapEffect(false), 500);
    setIsScoreExpanded(!isScoreExpanded);
  };

  const handleStatusClick = () => {
    setSnapEffect(true);
    setTimeout(() => setSnapEffect(false), 500);
    setIsStatusExpanded(!isStatusExpanded);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-[#00FF88]';
    if (score >= 70) return 'text-[#00A8FF]';
    if (score >= 50) return 'text-[#FFB000]';
    return 'text-[#FF4444]';
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-12 font-mono text-xs">
      {/* Section Header Line */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#00A8FF] font-extrabold tracking-widest uppercase">
            05 / RESILIENCE & SYSTEM STATUS
          </span>
          <div className="w-12 h-[1px] bg-[#00A8FF]" />
          <span className="text-[#888888]">
            INTERACTIVE MUNICIPAL SURVIVABILITY CONVERGENCE
          </span>
        </div>

        {/* Clickable System Status Indicator */}
        <button
          type="button"
          onClick={handleStatusClick}
          className="flex items-center gap-1.5 text-[#00FF88] font-black cursor-pointer hover:underline"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>{simulation.overallStatus} STATUS ⚡ [CLICK TO EXPAND]</span>
        </button>
      </div>

      {/* GIANT EDITORIAL RESILIENCE CALLOUT (INTERACTIVE CONVERGENCE NODE) */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${snapEffect ? 'animate-electrical-snap' : ''}`}>
        {/* Left: Interactive Score Pop-Out */}
        <div
          onClick={handleScoreClick}
          className="lg:col-span-5 space-y-2 cursor-pointer group"
          title="Click to expand/contract resilience factors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-[#666666] uppercase group-hover:text-white transition-colors">
              CITY RESILIENCE INDEX {isScoreExpanded ? '[EXPANDED]' : '[CLICK TO EXPAND]'}
            </span>
            <span className="text-[10px] text-[#00A8FF]">⚡ CONVERGENCE NODE</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span
              className={`text-7xl sm:text-9xl font-black tracking-tight transition-transform group-hover:scale-105 ${getScoreColor(
                simulation.resilienceScore
              )}`}
            >
              {animatedScore}
            </span>
            <span className="text-2xl text-[#444444] font-bold">
              / 100
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#888888] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
            <span>Rating: <strong className="text-white">{simulation.resilienceRating}</strong></span>
            <span className="text-[#666666] ml-auto">Click score to reconfigure circuit</span>
          </div>
        </div>

        {/* Right: Connected Factor Annotations (Radiating Lines) */}
        <div className="lg:col-span-7 lg:border-l lg:border-[#222222] lg:pl-12 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">
              Nocturnal Grid Survivability Telemetry
            </h3>
            <p className="text-[#888888] font-sans text-xs sm:text-sm leading-relaxed">
              {simulation.explanation}
            </p>
          </div>

          {/* 4 Factor Telemetry Lines */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#1A1A1A]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#666666] text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>CRITICAL INFRASTRUCTURE (60 pts)</span>
              </div>
              <div className="text-base font-black text-white">
                {simulation.criticalInfrastructureStatus}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#666666] text-[11px]">
                <Leaf className="w-3.5 h-3.5 text-[#00A8FF]" />
                <span>CLEAN ENERGY SHARE (25 pts)</span>
              </div>
              <div className="text-base font-black text-[#00A8FF]">
                {simulation.renewableSharePercentage}% Clean
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#666666] text-[11px]">
                <Battery className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>BESS BUFFER HEALTH (15 pts)</span>
              </div>
              <div className="text-base font-black text-white">
                {simulation.sources.find((s) => s.id === 'battery')?.currentOutputKwh} kWh Buffer
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#666666] text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>GRID EFFICIENCY</span>
              </div>
              <div className="text-base font-black text-white">
                {simulation.isShortage ? 'Compensated' : '100% Optimal'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXTENDED SYSTEM STATUS BREAKDOWN (CLICK POP-OUT) */}
      {isStatusExpanded && (
        <div className="pt-4 border-t border-[#1A1A1A] space-y-3 animate-electrical-snap">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#666666] font-bold uppercase tracking-widest">
              POP-OUT: REAL-TIME POWER BALANCE
            </span>
            <button
              type="button"
              onClick={() => setIsStatusExpanded(false)}
              className="text-[#00A8FF] hover:text-white text-[10px] cursor-pointer"
            >
              [COLLAPSE BALANCE ×]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs border-t border-[#151515] pt-3">
            <div>
              <span className="text-[#666666] block text-[10px]">TOTAL POWER INGESTION</span>
              <strong className="text-[#00A8FF] text-base">{simulation.availableEnergyKwh} kWh</strong>
              <div className="w-full bg-[#1A1A1A] h-1.5 mt-1.5">
                <div
                  className="bg-[#00A8FF] h-full"
                  style={{ width: `${Math.min(100, (simulation.availableEnergyKwh / 1000) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[#666666] block text-[10px]">TOTAL CITY LOAD DEMAND</span>
              <strong className="text-white text-base">{simulation.totalDemandKwh} kWh</strong>
              <div className="w-full bg-[#1A1A1A] h-1.5 mt-1.5">
                <div
                  className={simulation.isShortage ? 'bg-[#FFB000] h-full' : 'bg-[#00FF88] h-full'}
                  style={{ width: `${Math.min(100, (simulation.totalDemandKwh / 1000) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[#666666] block text-[10px]">CRITICAL TIER SECURITY</span>
              <strong className="text-[#00FF88] text-base">{simulation.criticalInfrastructureStatus}</strong>
              <span className="text-[10px] text-[#888888] block mt-1">
                P1 Hospital & P2 Transit fully preserved
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
