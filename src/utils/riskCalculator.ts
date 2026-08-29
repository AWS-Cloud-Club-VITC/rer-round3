import type { CityRiskInput, CityRiskOutput, RiskCategory } from '../types/dashboard';

/**
 * Calculates the comprehensive City Risk Score based on real-time city telemetry.
 * 
 * Target Formula for Code Reverse Engineering Challenge:
 * - Traffic Level (0-100%): 25% weight
 * - Air Quality Index (0-500 AQI, normalized /5 to 0-100 scale): 30% weight
 * - Active Emergencies (0-10 incidents): 7.5 points per incident (75% max weight)
 * - Infrastructure Health Deficit (100% - Health%): 20% weight
 * 
 * Total Score range: 0 - 100
 * Category mapping:
 * - 0 - 35: NORMAL
 * - 36 - 70: WARNING
 * - 71 - 100: CRITICAL
 */
export function calculateCityRiskScore(input: CityRiskInput): CityRiskOutput {
  const { trafficLevel, aqiIndex, activeEmergencies, infrastructureHealth } = input;

  // 1. Traffic component (0-25 points)
  const trafficContrib = (Math.min(Math.max(trafficLevel, 0), 100)) * 0.25;

  // 2. Air Quality Index component (0-30 points) -> AQI 500 = 100 * 0.30 = 30 pts
  const normalizedAqi = Math.min(Math.max(aqiIndex, 0), 500) / 5;
  const aqiContrib = normalizedAqi * 0.30;

  // 3. Active Emergency incidents component (0-75 points, capped at 30 pts max weight for balance)
  const emergencyContrib = Math.min(Math.max(activeEmergencies, 0), 10) * 3.0;

  // 4. Infrastructure Health Deficit component (0-20 points)
  const infraDeficit = 100 - Math.min(Math.max(infrastructureHealth, 0), 100);
  const infraContrib = infraDeficit * 0.20;

  // Calculate total composite score (rounded to 1 decimal place)
  const rawScore = trafficContrib + aqiContrib + emergencyContrib + infraContrib;
  const score = Math.min(Math.max(Math.round(rawScore * 10) / 10, 0), 100);

  // Determine Risk Category
  let category: RiskCategory = 'NORMAL';
  let activeProtocol = 'Automated Green Grid Dispatch & Smart Signal Balancing';

  if (score >= 71) {
    category = 'CRITICAL';
    activeProtocol = 'LEVEL 3 LOCKDOWN — Emergency Protocol Dispatch & Grid Isolation';
  } else if (score >= 36) {
    category = 'WARNING';
    activeProtocol = 'LEVEL 2 ADVISORY — Dynamic Traffic Rerouting & Substation Load Shedding';
  }

  return {
    score,
    category,
    activeProtocol,
    breakdown: {
      trafficContribution: Math.round(trafficContrib * 10) / 10,
      aqiContribution: Math.round(aqiContrib * 10) / 10,
      emergenciesContribution: Math.round(emergencyContrib * 10) / 10,
      infraContribution: Math.round(infraContrib * 10) / 10,
    },
  };
}
