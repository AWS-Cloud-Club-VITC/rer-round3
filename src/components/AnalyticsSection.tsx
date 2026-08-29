import React from 'react';
import { LineChart, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { TELEMETRY_HISTORY_24H } from '../data/mockData';

export const AnalyticsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="saas-card p-5 border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-blue-600" />
          Telemetry Analytics & Trends
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          24-hour historical air quality index, traffic congestion, and power grid load tracking
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 24h Trend Line Chart */}
        <div className="saas-card p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <LineChart className="w-4 h-4 text-blue-600" />
              24-Hour City Trajectory
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Live UTC Stream</span>
          </div>

          <div className="h-64 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={TELEMETRY_HISTORY_24H}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="aqi" stroke="#2563eb" strokeWidth={2} name="Air Quality (AQI)" dot={false} />
                <Line type="monotone" dataKey="traffic" stroke="#f59e0b" strokeWidth={2} name="Traffic Congestion %" dot={false} />
                <Line type="monotone" dataKey="powerLoad" stroke="#10b981" strokeWidth={2} name="Power Load %" dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Telemetry Comparison Bar Chart */}
        <div className="saas-card p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              District Peak Comparison
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Peak Load Index</span>
          </div>

          <div className="h-64 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TELEMETRY_HISTORY_24H.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="traffic" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Traffic Congestion %" />
                <Bar dataKey="aqi" fill="#10b981" radius={[4, 4, 0, 0]} name="AQI Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
