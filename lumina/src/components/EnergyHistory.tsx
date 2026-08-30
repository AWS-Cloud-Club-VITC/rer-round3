import React from 'react';
import { History } from 'lucide-react';
import { EnergyHistoryPoint } from '../types/energy';

interface EnergyHistoryProps {
  history: EnergyHistoryPoint[];
}

export const EnergyHistory: React.FC<EnergyHistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  const maxKwh = Math.max(...history.map((h) => h.availableKwh), 900);
  const minKwh = Math.min(...history.map((h) => h.availableKwh), 400);
  const range = Math.max(1, maxKwh - minKwh);

  const width = 280;
  const height = 40;

  const sparklinePoints = history
    .map((point, index) => {
      const x = (index / Math.max(1, history.length - 1)) * width;
      const normalizedY = 1 - (point.availableKwh - minKwh) / range;
      const y = Math.max(4, Math.min(height - 4, normalizedY * height));
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 border-t border-[#222222] space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between text-[#888888]">
        <div className="flex items-center gap-2">
          <History className="w-3.5 h-3.5 text-[#00A8FF]" />
          <span className="font-bold uppercase tracking-wider text-white">
            SNAPSHOT LOG STREAM
          </span>
        </div>
        <span className="text-[11px] text-[#666666]">
          Last {history.length} snapshots
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Sparkline SVG Trace */}
        <div className="md:col-span-4 flex items-center gap-4">
          <div className="w-48 h-8 overflow-hidden bg-[#0A0A0A] border border-[#1A1A1A]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              <polyline
                fill="none"
                stroke="#00A8FF"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                points={sparklinePoints}
              />
            </svg>
          </div>
          <span className="font-extrabold text-[#00A8FF] text-xs">
            {history[history.length - 1]?.availableKwh} kWh
          </span>
        </div>

        {/* Right: Inline Micro Timestamp Log */}
        <div className="md:col-span-8 flex flex-wrap items-center gap-6 text-[11px] text-[#888888]">
          {history.slice(-5).map((point, i) => (
            <div key={point.id || i} className="flex items-baseline gap-2 border-b border-[#1A1A1A] pb-1">
              <span className="text-[#666666]">{point.timeLabel}</span>
              <strong className="text-white">{point.availableKwh} kWh</strong>
              <span className="text-[#00FF88] font-bold">[{point.resilienceScore}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
