import {
  BASE_GRID_CAPACITY_KWH,
  MAX_SOLAR_CAPACITY_KWH,
  MAX_BATTERY_CAPACITY_KWH,
  BASE_URBAN_SYSTEMS,
} from '../data/citySystems';
import {
  EnergySource,
  EnergySimulationResult,
  OverallSystemStatus,
  PowerState,
  SimulationInputs,
  UrbanSystem,
} from '../types/energy';

/**
 * 1. Available Energy Calculation
 * Available = Solar Generation + Battery Discharge + Constant Base Grid Supply (350 kWh)
 */
export function calculateAvailableEnergy(
  solarKwh: number,
  batteryKwh: number,
  baseGridKwh: number = BASE_GRID_CAPACITY_KWH
): number {
  return Math.max(0, solarKwh) + Math.max(0, batteryKwh) + Math.max(0, baseGridKwh);
}

/**
 * 2. Sector Demand Calculation
 * Multiplies base demand by city multiplier, scaling streetlights by intensity
 */
export function calculateSectorDemands(
  demandMultiplier: number,
  streetlightIntensity: number
): Map<string, number> {
  const demandMap = new Map<string, number>();

  for (const sys of BASE_URBAN_SYSTEMS) {
    let demand = Math.round(sys.baseDemandKwh * demandMultiplier);
    if (sys.id === 'lighting') {
      demand = Math.round(sys.baseDemandKwh * streetlightIntensity);
    }
    demandMap.set(sys.id, demand);
  }

  return demandMap;
}

/**
 * 3. Priority-Tiered Waterfall Allocation Logic
 * Energy is allocated sequentially from Priority 1 (Hospital) to Priority 5 (Offices).
 * Higher priority tiers receive 100% before energy cascades to lower tiers.
 */
export function allocateEnergyByPriority(
  availableEnergyKwh: number,
  demandMap: Map<string, number>
): {
  systems: UrbanSystem[];
  totalAllocatedKwh: number;
} {
  // Sort systems by ascending priority (1 first, 5 last)
  const sortedBase = [...BASE_URBAN_SYSTEMS].sort((a, b) => a.priority - b.priority);

  let remainingEnergy = availableEnergyKwh;
  let totalAllocatedKwh = 0;
  const evaluatedSystems: UrbanSystem[] = [];

  for (const baseSys of sortedBase) {
    const demand = demandMap.get(baseSys.id) || baseSys.baseDemandKwh;
    let allocated = 0;

    if (remainingEnergy >= demand) {
      // Full power available for this tier
      allocated = demand;
      remainingEnergy -= demand;
    } else if (remainingEnergy > 0) {
      // Partial power (boundary tier)
      allocated = remainingEnergy;
      remainingEnergy = 0;
    } else {
      // Complete blackout for lower tiers
      allocated = 0;
    }

    totalAllocatedKwh += allocated;

    const poweredPercentage = demand > 0 ? Math.round((allocated / demand) * 100) : 100;

    let powerState: PowerState = 'OFFLINE';
    if (poweredPercentage >= 98) powerState = 'FULL POWER';
    else if (poweredPercentage >= 70) powerState = 'OPTIMAL';
    else if (poweredPercentage >= 30) powerState = 'PARTIAL';
    else if (poweredPercentage > 0) powerState = 'CRITICAL';
    else powerState = 'OFFLINE';

    evaluatedSystems.push({
      ...baseSys,
      currentDemandKwh: demand,
      allocatedKwh: allocated,
      poweredPercentage,
      powerState,
    });
  }

  // Restore original display ordering
  const originalOrder = evaluatedSystems.sort((a, b) => a.priority - b.priority);

  return {
    systems: originalOrder,
    totalAllocatedKwh,
  };
}

/**
 * 4. City Energy Resilience Calculation (0 to 100)
 * Weighted infrastructure fulfillment (60 pts) + Clean energy contribution (25 pts) + Battery reserve ratio (15 pts)
 * Severe penalty applied if Critical Tier 1 (Hospital) or Tier 2 (Transit) are compromised.
 */
export function calculateCityResilienceScore(
  systems: UrbanSystem[],
  solarKwh: number,
  batteryKwh: number,
  availableEnergyKwh: number
): {
  score: number;
  rating: 'EXCELLENT' | 'ROBUST' | 'MODERATE' | 'VULNERABLE';
  renewableShare: number;
} {
  // Weights based on infrastructure criticality
  const weights: Record<string, number> = {
    hospital: 0.35,
    transit: 0.25,
    lighting: 0.15,
    residential: 0.15,
    offices: 0.10,
  };

  let weightedPoweredSum = 0;
  for (const sys of systems) {
    const weight = weights[sys.id] || 0.2;
    weightedPoweredSum += (sys.poweredPercentage / 100) * weight;
  }

  // 1. Infrastructure preservation score (max 60 pts)
  const infraScore = weightedPoweredSum * 60;

  // 2. Clean energy share (max 25 pts)
  const cleanEnergyKwh = solarKwh + batteryKwh;
  const renewableShare = availableEnergyKwh > 0 ? Math.round((cleanEnergyKwh / availableEnergyKwh) * 100) : 0;
  const renewableScore = (renewableShare / 100) * 25;

  // 3. Battery buffer condition (max 15 pts)
  const batteryHealthRatio = Math.min(1, batteryKwh / MAX_BATTERY_CAPACITY_KWH);
  const batteryScore = batteryHealthRatio * 15;

  // Critical infrastructure penalty
  const hospital = systems.find((s) => s.id === 'hospital');
  const transit = systems.find((s) => s.id === 'transit');

  let penalty = 0;
  if (hospital && hospital.poweredPercentage < 100) {
    penalty += 35; // Severe penalty for hospital deficit
  }
  if (transit && transit.poweredPercentage < 100) {
    penalty += 15;
  }

  const rawScore = Math.round(infraScore + renewableScore + batteryScore - penalty);
  const finalScore = Math.max(0, Math.min(100, rawScore));

  let rating: 'EXCELLENT' | 'ROBUST' | 'MODERATE' | 'VULNERABLE' = 'VULNERABLE';
  if (finalScore >= 85) rating = 'EXCELLENT';
  else if (finalScore >= 70) rating = 'ROBUST';
  else if (finalScore >= 50) rating = 'MODERATE';
  else rating = 'VULNERABLE';

  return {
    score: finalScore,
    rating,
    renewableShare,
  };
}

/**
 * 5. Overall System Status Calculation
 */
export function calculateSystemStatus(
  energyGapKwh: number,
  systems: UrbanSystem[],
  batteryReserveKwh: number
): OverallSystemStatus {
  const hospital = systems.find((s) => s.id === 'hospital');
  const transit = systems.find((s) => s.id === 'transit');

  if (hospital && hospital.poweredPercentage < 100) {
    return 'CRITICAL';
  }
  if (transit && transit.poweredPercentage < 100) {
    return 'CRITICAL';
  }
  if (energyGapKwh > 100 || batteryReserveKwh < 120) {
    return 'STRAINED';
  }
  if (energyGapKwh > 0) {
    return 'BALANCED';
  }
  return 'OPTIMAL';
}

/**
 * Master Simulation Execution Function
 */
export function simulateEnergyGrid(inputs: SimulationInputs): EnergySimulationResult {
  const { solarGenerationKwh, batteryReserveKwh, cityDemandMultiplier, streetlightIntensity } = inputs;

  // 1. Available Energy
  const availableEnergyKwh = calculateAvailableEnergy(solarGenerationKwh, batteryReserveKwh);

  // 2. Sector Demands
  const demandMap = calculateSectorDemands(cityDemandMultiplier, streetlightIntensity);
  let totalDemandKwh = 0;
  demandMap.forEach((val) => {
    totalDemandKwh += val;
  });

  // 3. Priority Allocation
  const { systems } = allocateEnergyByPriority(availableEnergyKwh, demandMap);

  // 4. Energy Gap & Shortage Status
  const isShortage = availableEnergyKwh < totalDemandKwh;
  const energyGapKwh = isShortage ? totalDemandKwh - availableEnergyKwh : 0;

  // 5. Resilience Scoring
  const { score: resilienceScore, rating: resilienceRating, renewableShare } =
    calculateCityResilienceScore(systems, solarGenerationKwh, batteryReserveKwh, availableEnergyKwh);

  // 6. Grid Health Status
  const overallStatus = calculateSystemStatus(energyGapKwh, systems, batteryReserveKwh);

  // 7. Critical Infrastructure Security Status
  const hospital = systems.find((s) => s.id === 'hospital')!;
  const transit = systems.find((s) => s.id === 'transit')!;

  let criticalInfrastructureStatus: '100% SECURE' | 'PARTIALLY SECURE' | 'COMPROMISED' = '100% SECURE';
  if (hospital.poweredPercentage < 100) {
    criticalInfrastructureStatus = 'COMPROMISED';
  } else if (transit.poweredPercentage < 100) {
    criticalInfrastructureStatus = 'PARTIALLY SECURE';
  }

  // 8. Sources Telemetry
  const sources: EnergySource[] = [
    {
      id: 'solar',
      name: 'Photovoltaic Solar Farm',
      category: 'Renewable Generation',
      currentOutputKwh: solarGenerationKwh,
      maxCapacityKwh: MAX_SOLAR_CAPACITY_KWH,
      color: '#0EA5E9', // Electric Blue
      statusText: solarGenerationKwh >= 200 ? 'Peak Dusk Yield' : 'Moderate Influx',
      isClean: true,
    },
    {
      id: 'battery',
      name: 'BESS Clean Storage Buffer',
      category: 'Energy Storage',
      currentOutputKwh: batteryReserveKwh,
      maxCapacityKwh: MAX_BATTERY_CAPACITY_KWH,
      color: '#059669', // Emerald
      statusText: batteryReserveKwh >= 300 ? 'High Buffer Level' : 'Standard Reserve',
      isClean: true,
    },
    {
      id: 'grid',
      name: 'Municipal Base Grid Feed',
      category: 'Base Municipal Grid',
      currentOutputKwh: BASE_GRID_CAPACITY_KWH,
      maxCapacityKwh: BASE_GRID_CAPACITY_KWH,
      color: '#0891B2', // Cyan
      statusText: 'Constant Synchronous Supply',
      isClean: false,
    },
  ];

  // Dynamic explanation string
  let explanation = '';
  if (isShortage) {
    explanation = `Energy demand exceeds generation by ${energyGapKwh} kWh. Priority waterfall is active: P1 Hospitals and P2 Transit remain protected, while lower-priority commercial loads are shed.`;
  } else {
    explanation = `Grid is balanced with a surplus of ${availableEnergyKwh - totalDemandKwh} kWh. All municipal, residential, and commercial sectors are fully powered.`;
  }

  return {
    inputs,
    sources,
    systems,
    availableEnergyKwh,
    totalDemandKwh,
    energyGapKwh,
    isShortage,
    overallStatus,
    resilienceScore,
    resilienceRating,
    renewableSharePercentage: renewableShare,
    criticalInfrastructureStatus,
    explanation,
  };
}
