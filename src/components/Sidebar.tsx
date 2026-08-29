import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Car,
  Wind,
  ShieldAlert,
  Building2,
  LineChart,
  Activity,
  ChevronRight,
  Settings,
} from 'lucide-react';
import type { TabType } from './Navbar';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  incidentsCount: number;
  onToggleTacticalMode: () => void;
  onOpenOrganizerModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  incidentsCount,
  onToggleTacticalMode,
  onOpenOrganizerModal,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'City Operations Map', icon: MapPin },
    { id: 'mobility', label: 'Mobility & Transit', icon: Car },
    { id: 'environment', label: 'Environmental Monitoring', icon: Wind },
    { id: 'emergency', label: 'Emergency Dispatch', icon: ShieldAlert, badge: incidentsCount },
    { id: 'infrastructure', label: 'Infrastructure Health', icon: Building2 },
    { id: 'analytics', label: 'Analytics & Trends', icon: LineChart },
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 shadow-xs border-r border-slate-200">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              CivicFlow
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                SDG 11
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Smart City Intelligence</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-3 border-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        {/* System Status Trigger for Hidden Tactical Incident Mode */}
        <button
          onClick={onToggleTacticalMode}
          title="System Status Indicator (Click to activate Tactical Incident Mode)"
          className="w-full p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              GRID SYNCHRONIZED
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">● Node #882-V Operational</p>
        </button>

        {/* Organizer Support Specs Modal Button */}
        <button
          onClick={onOpenOrganizerModal}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium border border-slate-200 transition-all cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5 text-slate-500" />
          <span>System Specs</span>
        </button>
      </div>
    </aside>
  );
};
