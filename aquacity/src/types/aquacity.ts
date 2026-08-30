export interface WaterStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  flowRate: string;
  purity: string;
  tag: string;
}

export interface CityZone {
  id: string;
  name: string;
  category: 'residential' | 'commercial' | 'industrial' | 'public' | 'facility' | 'network';
  percentage: number;
  dailyVolume: string;
  description: string;
  sustainableTech: string;
  highlightIcon: string;
}

export interface WaterSolution {
  id: 'recycling' | 'rainwater' | 'leakDetection';
  title: string;
  tagline: string;
  description: string;
  active: boolean;
  impactMetrics: {
    reuseGain: number;
    leakReduction: number;
    rainwaterGain: number;
  };
  features: string[];
}

export interface CityWaterImpact {
  waterReuse: number; // Percentage (e.g. 42% - 74%)
  leakage: number;    // Percentage (e.g. 32% - 11%)
  rainwater: number;  // Percentage (e.g. 14% - 32%)
  efficiency: number; // Score (e.g. 58% - 94%)
}

export interface LeakTelemetry {
  zoneId: string;
  zoneName: string;
  estimatedLoss: string;
  pressure: string;
  nominalPressure: string;
  status: 'LEAK_ACTIVE' | 'ISOLATED' | 'REPAIRED';
  subSurfaceDepth: string;
  acousticFreq: string;
}
