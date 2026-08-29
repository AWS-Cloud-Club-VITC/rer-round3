import React from 'react';
import { LayoutDashboard, Car, Wind, ShieldAlert, Building2, LineChart, MapPin } from 'lucide-react';

export type TabType = 
  | 'overview' 
  | 'map'
  | 'mobility' 
  | 'environment' 
  | 'emergency' 
  | 'infrastructure' 
  | 'analytics'
  | 'hidden-feature';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  incidentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, incidentsCount }) => {
  const tabs = [
    { id: 'overview', label: 'City Overview', icon: LayoutDashboard },
    { id: 'map', label: 'City Operations Map', icon: MapPin },
    { id: 'mobility', label: 'Mobility & Transit', icon: Car },
    { id: 'environment', label: 'Environment & AQI', icon: Wind },
    { id: 'emergency', label: 'Emergency Incidents', icon: ShieldAlert, badge: incidentsCount },
    { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
    { id: 'analytics', label: 'Telemetry Analytics', icon: LineChart },
  ];

  return (
    <nav className="w-full bg-white border-b border-slate-200 px-4 lg:px-8 py-2 sticky top-[57px] z-20 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-mono font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
