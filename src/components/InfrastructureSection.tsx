import React from 'react';
import { Building2 } from 'lucide-react';
import type { InfrastructureNode } from '../types/dashboard';

interface InfrastructureSectionProps {
  infrastructure: InfrastructureNode[];
}

export const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ infrastructure }) => {
  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="saas-card p-5 border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Infrastructure Health Matrix
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Structural integrity health scores and load monitoring for bridges, substations, and water plants
        </p>
      </div>

      {/* Nodes List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infrastructure.map((node) => {
          const isHealthy = node.healthScore >= 80;
          return (
            <div key={node.id} className="saas-card p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-700">{node.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                  node.status === 'Operational'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  ● {node.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2 truncate">{node.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{node.type} • {node.districtName}</p>

              {/* Progress Meters */}
              <div className="mt-3 space-y-2.5 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-sans">Structural Health:</span>
                    <span className={`font-bold ${isHealthy ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {node.healthScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${isHealthy ? 'bg-emerald-600' : 'bg-amber-500'}`}
                      style={{ width: `${node.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-sans">Operational Load:</span>
                    <span className="text-blue-700 font-bold">{node.loadPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${node.loadPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
