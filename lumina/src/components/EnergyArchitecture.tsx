import React, { useState } from 'react';
import { Sun, BatteryCharging, Zap, Sliders, Activity, AlertTriangle } from 'lucide-react';
import { CityLoadLevel, PowerEventId, SimulationInputs } from '../types/energy';

interface EnergyArchitectureProps {
  inputs: SimulationInputs;
  onChangeInputs: (inputs: SimulationInputs) => void;
  availableEnergyKwh: number;
  totalDemandKwh: number;
  resilienceScore: number;
}

export const EnergyArchitecture: React.FC<EnergyArchitectureProps> = ({
  inputs,
  onChangeInputs,
  availableEnergyKwh,
  totalDemandKwh,
  resilienceScore,
}) => {
  const [activeEvent, setActiveEvent] = useState<PowerEventId>('NORMAL');
  const [snapEffect, setSnapEffect] = useState(false);

  // Compute current load level based on multiplier
  const getCurrentLoadLevel = (): CityLoadLevel => {
    if (inputs.cityDemandMultiplier <= 0.85) return 'LOW';
    if (inputs.cityDemandMultiplier <= 1.05) return 'NORMAL';
    if (inputs.cityDemandMultiplier <= 1.2) return 'HIGH';
    return 'EXTREME';
  };

  const currentLoad = getCurrentLoadLevel();

  const handleSelectLoadLevel = (level: CityLoadLevel) => {
    setSnapEffect(true);
    setTimeout(() => setSnapEffect(false), 500);

    let newMultiplier = 1.0;
    if (level === 'LOW') newMultiplier = 0.8;
    else if (level === 'NORMAL') newMultiplier = 1.0;
    else if (level === 'HIGH') newMultiplier = 1.2;
    else if (level === 'EXTREME') newMultiplier = 1.3;

    onChangeInputs({
      ...inputs,
      cityDemandMultiplier: newMultiplier,
    });
  };

  const handleTriggerPowerEvent = (eventId: PowerEventId) => {
    setActiveEvent(eventId);
    setSnapEffect(true);
    setTimeout(() => setSnapEffect(false), 600);

    if (eventId === 'NORMAL') {
      onChangeInputs({
        solarGenerationKwh: 150,
        batteryReserveKwh: 200,
        cityDemandMultiplier: 1.0,
        streetlightIntensity: 1.0,
      });
    } else if (eventId === 'SOLAR_DROP') {
      onChangeInputs({
        ...inputs,
        solarGenerationKwh: 50,
      });
    } else if (eventId === 'DEMAND_SURGE') {
      onChangeInputs({
        ...inputs,
        cityDemandMultiplier: 1.3,
      });
    } else if (eventId === 'BATTERY_CONSERVE') {
      onChangeInputs({
        ...inputs,
        batteryReserveKwh: 100,
      });
    } else if (eventId === 'GRID_INTERRUPT') {
      onChangeInputs({
        solarGenerationKwh: 60,
        batteryReserveKwh: 120,
        cityDemandMultiplier: 1.25,
        streetlightIntensity: 0.6,
      });
    }
  };

  const loadLevels: { id: CityLoadLevel; label: string; desc: string }[] = [
    { id: 'LOW', label: 'LOW', desc: '80% Demand' },
    { id: 'NORMAL', label: 'NORMAL', desc: '100% Nominal' },
    { id: 'HIGH', label: 'HIGH', desc: '120% Surge' },
    { id: 'EXTREME', label: 'EXTREME', desc: '130% Peak Stress' },
  ];

  const powerEvents: { id: PowerEventId; label: string; impact: string }[] = [
    { id: 'NORMAL', label: 'NOMINAL GRID', impact: 'Balanced Supply' },
    { id: 'SOLAR_DROP', label: 'SOLAR DROP', impact: 'Photovoltaic -66%' },
    { id: 'DEMAND_SURGE', label: 'DEMAND SURGE', impact: 'City Load +30%' },
    { id: 'BATTERY_CONSERVE', label: 'BATTERY CONSERVE', impact: 'BESS Buffer -50%' },
    { id: 'GRID_INTERRUPT', label: 'GRID CRISIS', impact: 'Multi-variable Stress' },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Section Header Line */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-[#00A8FF] font-extrabold tracking-widest uppercase">
            02 / ARCHITECTURE & CONDITIONS
          </span>
          <div className="w-12 h-[1px] bg-[#00A8FF]" />
          <span className="text-[#888888]">
            DYNAMIC ELECTRICAL LOAD & EVENT CONTROL
          </span>
        </div>
        <span className="text-[11px] text-[#666666]">
          calculateAvailableEnergy()
        </span>
      </div>

      {/* 1. CAUSE -> EFFECT ELECTRICAL CASCADE VISUALIZER */}
      <div className={`space-y-3 font-mono text-xs border-b border-[#1A1A1A] pb-6 transition-all ${snapEffect ? 'animate-electrical-snap' : ''}`}>
        <div className="flex items-center justify-between text-[#888888]">
          <div className="flex items-center gap-2 text-white">
            <Activity className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
            <span className="font-bold uppercase tracking-wider">
              CAUSE → EFFECT ELECTRICAL CASCADE
            </span>
          </div>
          <span className="text-[11px] text-[#00A8FF]">
            [REAL-TIME DETERMINISTIC FEEDBACK]
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-[11px] border-t border-[#151515] pt-3">
          <div className="space-y-0.5 border-l border-[#00A8FF] pl-2.5">
            <span className="text-[#666666] block text-[10px]">01 INPUT STAGE</span>
            <span className="text-white font-bold">
              SOLAR {inputs.solarGenerationKwh}k + BATT {inputs.batteryReserveKwh}k
            </span>
          </div>

          <div className="space-y-0.5 border-l border-[#00E5FF] pl-2.5">
            <span className="text-[#666666] block text-[10px]">02 AVAILABLE SUPPLY</span>
            <span className="text-[#00A8FF] font-extrabold">
              {availableEnergyKwh} kWh Available
            </span>
          </div>

          <div className="space-y-0.5 border-l border-[#00FF88] pl-2.5">
            <span className="text-[#666666] block text-[10px]">03 LOAD GAP</span>
            <span className={totalDemandKwh > availableEnergyKwh ? 'text-[#FFB000] font-bold' : 'text-[#00FF88] font-bold'}>
              {totalDemandKwh > availableEnergyKwh
                ? `-${totalDemandKwh - availableEnergyKwh} kWh Deficit`
                : `+${availableEnergyKwh - totalDemandKwh} kWh Surplus`}
            </span>
          </div>

          <div className="space-y-0.5 border-l border-[#00FF88] pl-2.5">
            <span className="text-[#666666] block text-[10px]">04 RESILIENCE INDEX</span>
            <span className="text-[#00FF88] font-extrabold">
              {resilienceScore} / 100 Calculated
            </span>
          </div>
        </div>
      </div>

      {/* 2. ELECTRICAL "CITY LOAD" BUS SELECTOR */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#888888]">
          <span className="uppercase font-bold tracking-wider text-white">
            ELECTRICAL CITY LOAD STATE
          </span>
          <span className="text-[#00E5FF]">CURRENT: {currentLoad} LOAD ({Math.round(inputs.cityDemandMultiplier * 100)}%)</span>
        </div>

        {/* Continuous Electrical Load Bus Line */}
        <div className="relative py-4">
          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 bg-[#1A1A1A]" />
          
          <div className="relative flex justify-between items-center z-10 font-mono text-xs">
            {loadLevels.map((item) => {
              const isActive = currentLoad === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectLoadLevel(item.id)}
                  className="group flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-3.5 h-3.5 transition-all ${
                      isActive
                        ? 'bg-[#00A8FF] shadow-[0_0_12px_#00A8FF] scale-125'
                        : 'bg-[#111111] border border-[#333333] group-hover:border-white'
                    }`}
                  />
                  <span
                    className={`text-xs font-mono font-black mt-2 transition-colors ${
                      isActive ? 'text-[#00A8FF]' : 'text-[#666666] group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#555555] font-sans">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. POWER EVENT TIMELINE INTERRUPTS */}
      <div className="space-y-4 pt-4 border-t border-[#1A1A1A]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
          <AlertTriangle className="w-3.5 h-3.5 text-[#FFB000]" />
          <span className="uppercase font-bold tracking-wider text-white">
            POWER EVENT TIMELINE
          </span>
          <span className="text-[10px] text-[#666666] ml-auto">
            Click event node to inject condition
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs">
          {powerEvents.map((evt) => {
            const isActive = activeEvent === evt.id;
            return (
              <button
                key={evt.id}
                type="button"
                onClick={() => handleTriggerPowerEvent(evt.id)}
                className={`group flex items-center gap-2 transition-all cursor-pointer py-1 ${
                  isActive
                    ? 'text-[#00A8FF] font-black scale-105'
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                <span
                  className={`w-2 h-2 transition-all ${
                    isActive ? 'bg-[#00A8FF] shadow-[0_0_8px_#00A8FF]' : 'bg-[#222222]'
                  }`}
                />
                <span>[{evt.label}]</span>
                <span className="text-[10px] text-[#555555]">
                  ({evt.impact})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MANUAL HIGH-VOLTAGE MODULATION SLIDERS */}
      <div className="space-y-6 pt-4 border-t border-[#1A1A1A]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#666666]">
          <Sliders className="w-3.5 h-3.5 text-[#00FF88]" />
          <span className="uppercase font-bold tracking-wider text-white">
            MANUAL PARAMETER MODULATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-mono text-xs">
          {/* Solar Influx */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <Sun className="w-3.5 h-3.5 text-[#00A8FF]" />
                <span>SOLAR HARVEST</span>
              </div>
              <span className="font-black text-[#00A8FF] text-sm">
                {inputs.solarGenerationKwh} kWh
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={inputs.solarGenerationKwh}
              onChange={(e) =>
                onChangeInputs({
                  ...inputs,
                  solarGenerationKwh: parseInt(e.target.value, 10),
                })
              }
              className="w-full accent-[#00A8FF] cursor-pointer h-1 bg-[#1A1A1A] rounded-none"
            />
            <div className="flex justify-between text-[10px] text-[#555555]">
              <span>50 kWh Min</span>
              <span>300 kWh Max</span>
            </div>
          </div>

          {/* Battery Reserve */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <BatteryCharging className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>BESS STORAGE</span>
              </div>
              <span className="font-black text-[#00FF88] text-sm">
                {inputs.batteryReserveKwh} kWh
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="500"
              step="20"
              value={inputs.batteryReserveKwh}
              onChange={(e) =>
                onChangeInputs({
                  ...inputs,
                  batteryReserveKwh: parseInt(e.target.value, 10),
                })
              }
              className="w-full accent-[#00FF88] cursor-pointer h-1 bg-[#1A1A1A] rounded-none"
            />
            <div className="flex justify-between text-[10px] text-[#555555]">
              <span>100 kWh Low</span>
              <span>500 kWh Full</span>
            </div>
          </div>

          {/* City Demand Multiplier */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>CITY DEMAND</span>
              </div>
              <span className="font-black text-[#00E5FF] text-sm">
                {Math.round(inputs.cityDemandMultiplier * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={inputs.cityDemandMultiplier}
              onChange={(e) =>
                onChangeInputs({
                  ...inputs,
                  cityDemandMultiplier: parseFloat(e.target.value),
                })
              }
              className="w-full accent-[#00E5FF] cursor-pointer h-1 bg-[#1A1A1A] rounded-none"
            />
            <div className="flex justify-between text-[10px] text-[#555555]">
              <span>80% Eco</span>
              <span>130% Peak</span>
            </div>
          </div>

          {/* Streetlight Intensity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <Zap className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>LIGHTING INTENSITY</span>
              </div>
              <span className="font-black text-[#FFB000] text-sm">
                {Math.round(inputs.streetlightIntensity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.0"
              step="0.05"
              value={inputs.streetlightIntensity}
              onChange={(e) =>
                onChangeInputs({
                  ...inputs,
                  streetlightIntensity: parseFloat(e.target.value),
                })
              }
              className="w-full accent-[#FFB000] cursor-pointer h-1 bg-[#1A1A1A] rounded-none"
            />
            <div className="flex justify-between text-[10px] text-[#555555]">
              <span>50% Dim</span>
              <span>100% Full</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
