import React, { useState } from 'react';
import { Sliders, ShieldAlert, CheckCircle2, AlertTriangle, Code2 } from 'lucide-react';
import type { CityRiskInput, CityRiskOutput } from '../types/dashboard';

interface RiskCalculatorWidgetProps {
  inputState: CityRiskInput;
  setInputState: React.Dispatch<React.SetStateAction<CityRiskInput>>;
  outputState: CityRiskOutput;
}

export const RiskCalculatorWidget: React.FC<RiskCalculatorWidgetProps> = ({
  inputState,
  setInputState,
  outputState,
}) => {
  const [showFormula, setShowFormula] = useState<boolean>(false);

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'CRITICAL':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-300',
          text: 'text-rose-700',
          badge: 'bg-rose-600 text-white',
          icon: ShieldAlert,
        };
      case 'WARNING':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          text: 'text-amber-800',
          badge: 'bg-amber-500 text-white',
          icon: AlertTriangle,
        };
      default:
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-300',
          text: 'text-emerald-800',
          badge: 'bg-emerald-600 text-white',
          icon: CheckCircle2,
        };
    }
  };

  const theme = getCategoryTheme(outputState.category);
  const StatusIcon = theme.icon;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="saas-card p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            City Risk Index Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Calculates live composite risk scores from traffic density, air quality, active emergencies, and structural integrity
          </p>
        </div>

        <button
          onClick={() => setShowFormula(!showFormula)}
          className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
        >
          <Code2 className="w-4 h-4 text-blue-600" />
          <span>{showFormula ? 'Hide Formula Specs' : 'View Formula Specs'}</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Input Controls */}
        <div className="lg:col-span-2 saas-card p-6 border border-slate-200 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Realtime Telemetry Input Controls
          </h3>

          {/* Slider 1: Traffic Congestion */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-700">Traffic Congestion Index:</span>
              <span className="font-mono font-bold text-blue-700">{inputState.trafficLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={inputState.trafficLevel}
              onChange={(e) => setInputState((prev) => ({ ...prev, trafficLevel: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0% (Light)</span>
              <span>Weight: 0.25</span>
              <span>100% (Gridlock)</span>
            </div>
          </div>

          {/* Slider 2: Air Quality Index */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-700">Air Quality Index (AQI):</span>
              <span className="font-mono font-bold text-blue-700">{inputState.aqiIndex} AQI</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={inputState.aqiIndex}
              onChange={(e) => setInputState((prev) => ({ ...prev, aqiIndex: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 AQI (Pure)</span>
              <span>Weight: 0.30 (scaled / 5)</span>
              <span>300 AQI (Hazardous)</span>
            </div>
          </div>

          {/* Slider 3: Active Emergencies */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-700">Active Emergency Incidents:</span>
              <span className="font-mono font-bold text-rose-600">{inputState.activeEmergencies} Cases</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={inputState.activeEmergencies}
              onChange={(e) => setInputState((prev) => ({ ...prev, activeEmergencies: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 Cases</span>
              <span>Weight: 3.00 / incident</span>
              <span>10 Cases</span>
            </div>
          </div>

          {/* Slider 4: Infrastructure Health */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-700">Infrastructure Health Score:</span>
              <span className="font-mono font-bold text-emerald-700">{inputState.infrastructureHealth}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={inputState.infrastructureHealth}
              onChange={(e) => setInputState((prev) => ({ ...prev, infrastructureHealth: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0% (Degraded)</span>
              <span>Weight: 0.20 (deficit)</span>
              <span>100% (Optimal)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Output Composite Score */}
        <div className={`saas-card p-6 border ${theme.border} ${theme.bg} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Composite Risk Output
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${theme.badge}`}>
                {outputState.category}
              </span>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 shadow-xs mb-3">
                <StatusIcon className={`w-8 h-8 ${theme.text}`} />
              </div>
              <div className="text-4xl font-bold font-mono text-slate-900">
                {outputState.score} <span className="text-sm text-slate-500 font-sans font-normal">/ 100</span>
              </div>
              <p className={`text-xs font-medium mt-2 ${theme.text}`}>
                Status Category: {outputState.category}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-mono text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Traffic Component:</span>
              <span className="font-bold">+{outputState.breakdown.trafficContribution} pts</span>
            </div>
            <div className="flex justify-between">
              <span>AQI Component:</span>
              <span className="font-bold">+{outputState.breakdown.aqiContribution} pts</span>
            </div>
            <div className="flex justify-between">
              <span>Emergency Component:</span>
              <span className="font-bold">+{outputState.breakdown.emergenciesContribution} pts</span>
            </div>
            <div className="flex justify-between">
              <span>Infra Deficit:</span>
              <span className="font-bold">+{outputState.breakdown.infraContribution} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formula Specs View */}
      {showFormula && (
        <div className="saas-card p-5 border border-blue-200 bg-blue-50/50 space-y-3 font-mono text-xs text-slate-800 animate-fade-in">
          <div className="font-bold text-blue-900 text-sm">Deterministic Risk Formula:</div>
          <div className="p-3 bg-white border border-blue-200 rounded-lg text-blue-950 font-bold overflow-x-auto">
            Risk Score = (Traffic × 0.25) + ((AQI / 5) × 0.30) + (Emergencies × 3.0) + ((100 - InfraHealth) × 0.20)
          </div>
        </div>
      )}
    </div>
  );
};
