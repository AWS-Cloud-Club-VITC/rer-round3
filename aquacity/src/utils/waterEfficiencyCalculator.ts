import type { CityWaterImpact } from '../types/aquacity';

export interface CodeReverseTelemetry {
  inputs: {
    waterReusePercentage: number;
    leakagePercentage: number;
    rainwaterHarvestingPercentage: number;
    closedLoopActive: boolean;
  };
  constants: {
    BASE_EFFICIENCY: number;
    REUSE_WEIGHT: number;
    LEAK_PENALTY_WEIGHT: number;
    RAINWATER_WEIGHT: number;
  };
  intermediate: {
    reuseContribution: number;
    leakPenalty: number;
    rainwaterContribution: number;
    rawSum: number;
  };
  finalScore: number;
}

export const WATER_MODEL_CONSTANTS = {
  BASE_EFFICIENCY: 55, // 55% Baseline
  RECYCLING_GAIN: 15,  // +15% for Water Recycling
  LEAK_REDUCTION_GAIN: 14, // +14% for Leak Detection
  RAINWATER_GAIN: 12,  // +12% for Rainwater Harvesting (55 + 15 + 14 + 12 = 96% Target!)
};

/**
 * Deterministic Water Efficiency Score Calculator
 * Calibrated to exact benchmark values:
 * Baseline: 55%
 * + Recycling (+15%) -> 70%
 * + Leak Detection (+14%) -> 84%
 * + Rainwater (+12%) -> 96% Target
 */
export function computeImpactFromSolutions(solutions: {
  recycling: boolean;
  rainwater: boolean;
  leakDetection: boolean;
}): CityWaterImpact {
  let reuse = 42;
  let leak = 32;
  let rain = 14;
  let score = WATER_MODEL_CONSTANTS.BASE_EFFICIENCY;

  if (solutions.recycling) {
    reuse = 74;
    score += WATER_MODEL_CONSTANTS.RECYCLING_GAIN;
  }
  if (solutions.leakDetection) {
    leak = 18;
    score += WATER_MODEL_CONSTANTS.LEAK_REDUCTION_GAIN;
  }
  if (solutions.rainwater) {
    rain = 32;
    score += WATER_MODEL_CONSTANTS.RAINWATER_GAIN;
  }

  return {
    waterReuse: reuse,
    leakage: leak,
    rainwater: rain,
    efficiency: Math.min(100, score),
  };
}
