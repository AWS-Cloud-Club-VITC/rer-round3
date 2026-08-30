import React from 'react';
import { motion, Variants } from 'motion/react';
import { ArrowRight, Zap, Building2, SunMedium } from 'lucide-react';
import { EnergySimulationResult } from '../types/energy';

interface HeroProps {
  simulation: EnergySimulationResult;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  simulation,
  onExploreClick,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Top Circuit Influx Marker */}
      <div className="flex items-center gap-3 text-xs font-mono text-[#666666] mb-8 border-b border-[#1A1A1A] pb-3">
        <span className="text-[#00A8FF] font-extrabold tracking-widest uppercase">
          01 / POWER
        </span>
        <div className="w-16 h-[1px] bg-[#00A8FF]" />
        <span className="text-[11px] text-[#888888]">
          HIGH-VOLTAGE MUNICIPAL POWER GRID
        </span>
        <span className="ml-auto text-[10px] text-[#00FF88] font-bold">
          [FEED LIVE: 700 kWh]
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
      >
        {/* Left: Oversized Brutalist Typography */}
        <div className="lg:col-span-8 space-y-6">
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[0.95] font-mono uppercase"
            >
              Lumina <br />
              <span className="text-white">Powering</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8FF] via-[#00E5FF] to-[#00FF88]">
                A Better City.
              </span>
            </motion.h1>
          </div>

          <motion.p
            variants={lineVariants}
            className="text-sm sm:text-base text-[#AAAAAA] font-normal leading-relaxed max-w-2xl font-sans"
          >
            An industrial electrical control architecture directing dusk photovoltaic harvesting and BESS storage reserves through trauma hospitals, high-speed monorails, municipal lighting, and residential districts.
          </motion.p>

          {/* Brutalist Typographic CTA & Telemetry Markers */}
          <motion.div variants={lineVariants} className="pt-4 flex flex-wrap items-center gap-8 font-mono text-xs">
            <button
              type="button"
              onClick={onExploreClick}
              className="group inline-flex items-center gap-2.5 text-sm font-black text-white hover:text-[#00A8FF] transition-colors cursor-pointer"
            >
              <span>FOLLOW THE CURRENT</span>
              <Zap className="w-4 h-4 text-[#00A8FF] group-hover:scale-125 transition-transform" />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>

            <div className="flex items-center gap-2 text-[#888888]">
              <span className="w-2 h-2 bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
              <span className="font-bold text-white uppercase">
                CITY ONLINE ⚡
              </span>
            </div>

            <div className="flex items-center gap-4 text-[#666666]">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#888888]" />
                SDG 11
              </span>
              <span className="flex items-center gap-1">
                <SunMedium className="w-3.5 h-3.5 text-[#888888]" />
                SDG 7
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Technical Blueprint Specs (Sharp 0px Borders) */}
        <motion.div
          variants={lineVariants}
          className="lg:col-span-4 lg:border-l lg:border-[#222222] lg:pl-10 space-y-5 font-mono text-xs"
        >
          <div className="text-[10px] uppercase text-[#666666] font-bold tracking-widest border-b border-[#1A1A1A] pb-1">
            ACTIVE CIRCUIT METRICS
          </div>

          <div className="space-y-3.5">
            <div className="flex items-baseline justify-between border-b border-[#1A1A1A] pb-2">
              <span className="text-[#888888]">TOTAL SUPPLY</span>
              <span className="font-extrabold text-[#00A8FF] text-sm">
                {simulation.availableEnergyKwh} kWh
              </span>
            </div>

            <div className="flex items-baseline justify-between border-b border-[#1A1A1A] pb-2">
              <span className="text-[#888888]">CITY DEMAND</span>
              <span className="font-extrabold text-white text-sm">
                {simulation.totalDemandKwh} kWh
              </span>
            </div>

            <div className="flex items-baseline justify-between border-b border-[#1A1A1A] pb-2">
              <span className="text-[#888888]">RESILIENCE INDEX</span>
              <span className="font-extrabold text-[#00FF88] text-sm">
                {simulation.resilienceScore} / 100
              </span>
            </div>

            <div className="flex items-baseline justify-between border-b border-[#1A1A1A] pb-2">
              <span className="text-[#888888]">GRID STATUS</span>
              <span
                className={`font-bold text-xs ${
                  simulation.isShortage ? 'text-[#FFB000]' : 'text-[#00FF88]'
                }`}
              >
                {simulation.overallStatus} ⚡
              </span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#666666] leading-relaxed font-sans">
            Electrical conduits react in real time to available generation and priority-tiered load shedding.
          </div>
        </motion.div>
      </motion.div>

      {/* Downward Electrical Circuit Trace */}
      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#00A8FF] to-[#222222]" />
        <div className="w-2.5 h-2.5 bg-[#00A8FF] animate-node-spark my-1 shadow-[0_0_8px_#00A8FF]" />
        <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mt-1">
          CIRCUIT ENTERS GENERATION SCHEMATIC
        </span>
      </div>
    </section>
  );
};
