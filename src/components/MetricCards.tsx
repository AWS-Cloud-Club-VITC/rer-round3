import React, { useState } from 'react';
import { Wind, Car, Zap, ShieldAlert, Droplets, Leaf, RefreshCw, CheckCircle2 } from 'lucide-react';
import type { CityMetric } from '../types/dashboard';

interface MetricCardsProps {
  metrics: CityMetric[];
  onRecalibrateMetric?: (id: string) => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics, onRecalibrateMetric }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [calibratedId, setCalibratedId] = useState<string | null>(null);

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'environment':
        return Wind;
      case 'mobility':
        return Car;
      case 'energy':
        return Zap;
      case 'safety':
        return ShieldAlert;
      case 'water':
        return Droplets;
      default:
        return Leaf;
    }
  };

  const handleCalibrate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCalibratedId(id);
    if (onRecalibrateMetric) {
      onRecalibrateMetric(id);
    }
    setTimeout(() => setCalibratedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {metrics.map((metric) => {
        const Icon = getMetricIcon(metric.category);
        const isHovered = hoveredId === metric.id;
        const isCalibrated = calibratedId === metric.id;

        return (
          <div key={metric.id} className="relative">
            <div
              onMouseEnter={() => setHoveredId(metric.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`p-4 rounded-xl border bg-white cursor-pointer transition-all duration-200 ease-out origin-center ${
                isHovered
                  ? 'scale-[1.03] border-blue-400 shadow-md z-20 relative'
                  : 'scale-100 border-slate-200 shadow-2xs z-10 relative'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">
                  {metric.label}
                </span>
                <div className={`p-1.5 rounded-md border transition-colors ${
                  isHovered ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-xl font-bold text-slate-900 tracking-tight font-mono">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-[11px] font-medium text-slate-400 font-sans">{metric.unit}</span>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className={`font-semibold ${metric.isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {metric.change}
                </span>
                <span className="text-slate-400 text-[10px]">Telemetry</span>
              </div>

              {/* LEVEL 2 HIDDEN FEATURE: Sub-Telemetry Expansion on Hover */}
              {metric.hiddenSubDetail && (
                <div
                  className={`mt-2.5 pt-2 border-t border-slate-100 text-[11px] font-mono transition-opacity duration-200 ${
                    isHovered ? 'opacity-100 block' : 'opacity-70 hidden'
                  }`}
                >
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400 font-sans">{metric.hiddenSubDetail.secondaryMetric}:</span>
                    <span className="text-blue-700 font-semibold">{metric.hiddenSubDetail.secondaryValue}</span>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Drift: {metric.hiddenSubDetail.sensorDrift}</span>
                    <span>Sync: {metric.hiddenSubDetail.lastCalibrated}</span>
                  </div>

                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={(e) => handleCalibrate(metric.id, e)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-sans font-medium transition-all cursor-pointer"
                    >
                      {isCalibrated ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Calibrated</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3 text-blue-600 transition-transform duration-500" />
                          <span>Recalibrate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
