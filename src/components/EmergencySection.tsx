import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Clock, MapPin, Filter } from 'lucide-react';
import type { EmergencyIncident } from '../types/dashboard';

interface EmergencySectionProps {
  incidents: EmergencyIncident[];
  onResolveIncident?: (id: string) => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({ incidents, onResolveIncident }) => {
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredIncidents = incidents.filter((inc) => {
    if (severityFilter === 'ALL') return true;
    return inc.severity.toUpperCase() === severityFilter;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-300 font-bold';
      case 'high':
        return 'bg-amber-50 text-amber-700 border-amber-300 font-bold';
      case 'medium':
        return 'bg-yellow-50 text-yellow-800 border-yellow-300 font-medium';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300 font-medium';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Card & Severity Filter */}
      <div className="saas-card p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            Emergency Dispatch Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time emergency incident feed, autonomous unit dispatching, and status resolution
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 ml-1" />
          <span className="text-slate-500">Severity:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                severityFilter === sev
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List Table */}
      <div className="saas-card overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Incident ID & Title</th>
                <th className="py-3 px-4">District & Location</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] border font-mono ${getSeverityBadge(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{incident.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{incident.id} • {incident.category}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{incident.location} ({incident.districtName})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{incident.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono">
                        {incident.status}
                      </span>
                      {onResolveIncident && incident.status !== 'Resolved' && (
                        <button
                          onClick={() => onResolveIncident(incident.id)}
                          className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Resolve</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredIncidents.length === 0 && (
          <div className="p-8 text-center text-slate-500 font-mono text-xs">
            No active emergency incidents matching filter "{severityFilter}".
          </div>
        )}
      </div>
    </div>
  );
};
