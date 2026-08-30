import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, BatteryCharging, Server, ShieldAlert, Cpu } from 'lucide-react';
import { EnergySimulationResult } from '../types/energy';

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  metricLabel: string;
  metricValue: string;
}

interface EnergyIntelligenceProps {
  simulation: EnergySimulationResult;
}

export const EnergyIntelligence: React.FC<EnergyIntelligenceProps> = ({ simulation }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: ProcessStep[] = [
    {
      id: 'generate',
      stepNumber: '01',
      title: 'GENERATE',
      subtitle: 'Photovoltaic + Base Grid',
      description:
        'Harvesting dusk solar power combined with the 350 kWh constant baseline municipal grid supply.',
      icon: <Sun className="w-3.5 h-3.5 text-[#00A8FF]" />,
      metricLabel: 'Active Feeds',
      metricValue: '2 Sources',
    },
    {
      id: 'store',
      stepNumber: '02',
      title: 'STORE',
      subtitle: 'BESS Battery Reserves',
      description:
        'Buffering surplus clean energy in high-density battery storage to buffer evening consumption spikes.',
      icon: <BatteryCharging className="w-3.5 h-3.5 text-[#00FF88]" />,
      metricLabel: 'Max BESS Buffer',
      metricValue: '500 kWh',
    },
    {
      id: 'distribute',
      stepNumber: '03',
      title: 'DISTRIBUTE',
      subtitle: 'Substation Load Router',
      description:
        'Aggregating total available power and routing conduits into the city core through smart telemetry.',
      icon: <Server className="w-3.5 h-3.5 text-[#00E5FF]" />,
      metricLabel: 'Router Latency',
      metricValue: 'Synchronous',
    },
    {
      id: 'prioritize',
      stepNumber: '04',
      title: 'PRIORITIZE',
      subtitle: 'Waterfall Load Shedding',
      description:
        'Allocating power to P1 Hospitals and P2 Transit before cascading downstream to residential & office zones.',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-[#FFB000]" />,
      metricLabel: 'Protection Tiers',
      metricValue: '5 Ranks',
    },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Section Header Line */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-[#00A8FF] font-extrabold tracking-widest uppercase">
            04 / INTELLIGENCE
          </span>
          <div className="w-12 h-[1px] bg-[#00A8FF]" />
          <span className="text-[#888888]">
            CONTINUOUS 4-PHASE ENERGY TRANSFORMATION
          </span>
        </div>
        <span className="text-[11px] text-[#666666]">
          allocateEnergyByPriority()
        </span>
      </div>

      {/* 1. CONTINUOUS ELECTRICAL TIMELINE (DARK BRUTALIST) */}
      <div className="space-y-6">
        {/* Desktop Horizontal Conduit Trace */}
        <div className="relative hidden md:block py-4">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-[#222222]" />
          <motion.div
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#00A8FF] via-[#00E5FF] to-[#00FF88] origin-left shadow-[0_0_8px_#00A8FF]"
            animate={{
              width: `${(activeStepIndex / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />

          <div className="relative flex justify-between items-center z-10">
            {steps.map((step, index) => {
              const isActive = index === activeStepIndex;
              const isPast = index <= activeStepIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className="group flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-3.5 h-3.5 transition-all ${
                      isActive
                        ? 'bg-[#00A8FF] shadow-[0_0_10px_#00A8FF] scale-125'
                        : isPast
                        ? 'bg-[#00FF88]'
                        : 'bg-[#111111] border border-[#333333]'
                    }`}
                  />
                  <span
                    className={`text-xs font-mono font-bold mt-2 transition-colors ${
                      isActive ? 'text-[#00A8FF]' : 'text-[#666666] group-hover:text-white'
                    }`}
                  >
                    {step.stepNumber} {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Open Phase Descriptions (NO CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs pt-4 border-t border-[#1A1A1A]">
          {steps.map((step, index) => {
            const isActive = index === activeStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(index)}
                className={`text-left space-y-2 transition-all cursor-pointer ${
                  isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                }`}
              >
                <div className="flex items-center gap-2">
                  {step.icon}
                  <span className="text-[10px] text-[#666666] font-bold">
                    PHASE {step.stepNumber}
                  </span>
                </div>

                <div className="font-black text-sm text-white tracking-tight">
                  {step.title}
                </div>
                <div className="text-[11px] text-[#00A8FF] font-medium">
                  {step.subtitle}
                </div>

                <p className="text-[#888888] font-sans text-xs leading-relaxed pt-1">
                  {step.description}
                </p>

                <div className="pt-2 border-t border-[#1A1A1A] flex items-center justify-between text-[10px] text-[#555555]">
                  <span>{step.metricLabel}</span>
                  <strong className="text-white">{step.metricValue}</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DETERMINISTIC DECISION WATERFALL — EXPOSED GRID TRACE */}
      <div className="space-y-4 pt-6 border-t border-[#222222]">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-white">
            <Cpu className="w-3.5 h-3.5 text-[#00FF88]" />
            <span className="font-bold uppercase tracking-wider">
              PRIORITY LOAD SHEDDING WATERFALL
            </span>
          </div>
          <span className="text-[#666666] text-[11px]">
            Cascades sequentially from Tier 1 (Hospitals) to Tier 5 (Offices)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 font-mono text-xs text-center border-t border-[#1A1A1A] pt-4">
          {simulation.systems.map((sys) => (
            <div key={sys.id} className="space-y-1 text-left border-l-2 pl-3 border-[#222222]">
              <span className="text-[10px] text-[#666666] block">
                TIER {sys.priority}
              </span>
              <div className="font-bold text-white text-xs truncate">
                {sys.name}
              </div>
              <div
                className={`text-lg font-black ${
                  sys.poweredPercentage >= 98
                    ? 'text-[#00FF88]'
                    : sys.poweredPercentage >= 70
                    ? 'text-[#00A8FF]'
                    : sys.poweredPercentage > 0
                    ? 'text-[#FFB000]'
                    : 'text-[#FF4444]'
                }`}
              >
                {sys.poweredPercentage}%
              </div>
              <div className="text-[10px] text-[#777777]">
                {sys.allocatedKwh} / {sys.currentDemandKwh} kWh
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Downward Electrical Circuit Trace */}
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#00A8FF] to-[#222222]" />
        <div className="w-2.5 h-2.5 bg-[#00FF88] animate-node-spark my-1 shadow-[0_0_8px_#00FF88]" />
        <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mt-1">
          CIRCUIT CONVERGES INTO RESILIENCE CALCULATION NODE
        </span>
      </div>
    </section>
  );
};
