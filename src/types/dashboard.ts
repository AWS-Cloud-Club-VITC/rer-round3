export type RiskCategory = 'NORMAL' | 'WARNING' | 'CRITICAL';

export interface District {
  id: string;
  name: string;
  code: string;
  type: string;
  population: string;
  riskLevel: RiskCategory;
  aqi: number;
  trafficDensity: number; // 0-100%
  powerGridLoad: number; // 0-100%
  waterReclamation: number; // 0-100%
  activeIncidents: number;
  status: 'Nominal' | 'Advisory' | 'Alert';
  cctvFeedUrl?: string;
  description: string;
  coordinates: { x: number; y: number };
  telemetry: {
    co2Ppm: number;
    solarGenerationMw: number;
    evChargingActive: number;
    wasteBinCapacity: number;
  };
}

export interface CityMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change: string; // e.g. "+2.4%"
  isPositive: boolean;
  status: 'nominal' | 'warning' | 'critical';
  category: 'environment' | 'mobility' | 'energy' | 'safety' | 'infrastructure';
  hiddenSubDetail?: {
    secondaryMetric: string;
    secondaryValue: string;
    sensorDrift: string;
    lastCalibrated: string;
  };
}

export interface EmergencyIncident {
  id: string;
  title: string;
  districtId: string;
  districtName: string;
  category: 'Fire' | 'Traffic Congestion' | 'Power Outage' | 'Water Leak' | 'Medical' | 'Environmental';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  timestamp: string;
  status: 'Dispatched' | 'On Scene' | 'Monitoring' | 'Resolved';
  location: string;
  assignedUnits: string[];
}

export interface InfrastructureNode {
  id: string;
  name: string;
  type: 'Bridge' | 'Substation' | 'Water Treatment' | 'Tunnel' | 'Microgrid' | 'Telecom Tower';
  healthScore: number; // 0-100
  loadPercentage: number;
  districtName: string;
  status: 'Operational' | 'Maintenance Required' | 'Degraded';
  lastInspection: string;
}

export interface TransitLineStatus {
  id: string;
  name: string;
  mode: 'Subway Express' | 'Autonomous Shuttle' | 'Electric Tram' | 'Rapid Bus Transit';
  status: 'On Time' | 'Minor Delays' | 'Suspended';
  capacityUsage: number; // 0-100%
  activeVehicles: number;
}

export interface CityRiskInput {
  trafficLevel: number; // 0-100
  aqiIndex: number; // 0-500
  activeEmergencies: number; // 0-10
  infrastructureHealth: number; // 0-100
}

export interface CityRiskOutput {
  score: number; // 0-100
  category: RiskCategory;
  activeProtocol: string;
  breakdown: {
    trafficContribution: number;
    aqiContribution: number;
    emergenciesContribution: number;
    infraContribution: number;
  };
}
