export type DiurnalPhase = 'DAWN' | 'DAYLIGHT' | 'DUSK' | 'NIGHT';

export type PowerState = 'FULL POWER' | 'OPTIMAL' | 'PARTIAL' | 'CRITICAL' | 'OFFLINE';

export type OverallSystemStatus = 'OPTIMAL' | 'BALANCED' | 'STRAINED' | 'CRITICAL';

export type SelectedSourceId = 'solar' | 'battery' | 'grid' | 'substation' | null;

export type CityLoadLevel = 'LOW' | 'NORMAL' | 'HIGH' | 'EXTREME';

export type PowerEventId = 'NORMAL' | 'GRID_INTERRUPT' | 'SOLAR_DROP' | 'DEMAND_SURGE' | 'BATTERY_CONSERVE';

export interface EnergySource {
  id: 'solar' | 'battery' | 'grid';
  name: string;
  category: 'Renewable Generation' | 'Energy Storage' | 'Base Municipal Grid';
  currentOutputKwh: number;
  maxCapacityKwh: number;
  color: string;
  statusText: string;
  isClean: boolean;
}

export interface UrbanSystem {
  id: 'hospital' | 'transit' | 'lighting' | 'residential' | 'offices';
  name: string;
  category: string;
  priority: number; // 1 (Highest) to 5 (Lowest)
  criticality: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'COMMERCIAL';
  baseDemandKwh: number;
  currentDemandKwh: number;
  allocatedKwh: number;
  poweredPercentage: number;
  powerState: PowerState;
  accentColor: string;
  description: string;
}

export interface SimulationInputs {
  solarGenerationKwh: number;
  batteryReserveKwh: number;
  cityDemandMultiplier: number;
  streetlightIntensity: number;
}

export interface EnergySimulationResult {
  inputs: SimulationInputs;
  sources: EnergySource[];
  systems: UrbanSystem[];
  availableEnergyKwh: number;
  totalDemandKwh: number;
  energyGapKwh: number;
  isShortage: boolean;
  overallStatus: OverallSystemStatus;
  resilienceScore: number;
  resilienceRating: 'EXCELLENT' | 'ROBUST' | 'MODERATE' | 'VULNERABLE';
  renewableSharePercentage: number;
  criticalInfrastructureStatus: '100% SECURE' | 'PARTIALLY SECURE' | 'COMPROMISED';
  explanation: string;
}

export interface EnergyHistoryPoint {
  id: string;
  timestamp: string;
  timeLabel: string;
  availableKwh: number;
  demandKwh: number;
  shortfallKwh: number;
  resilienceScore: number;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  inputs: SimulationInputs;
}
