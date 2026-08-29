import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ShieldAlert, ChevronDown, Check, AlertTriangle, Clock, MapPin } from 'lucide-react';
import type { District, EmergencyIncident } from '../types/dashboard';

interface HeaderProps {
  districts: District[];
  selectedDistrict: District | null;
  onSelectDistrict: (district: District | null) => void;
  incidents: EmergencyIncident[];
  onNavigateToEmergency: () => void;
  activeIncidentsCount: number;
  onToggleTacticalMode: () => void;
  onOpenOrganizerModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  incidents,
  onNavigateToEmergency,
  activeIncidentsCount,
  onToggleTacticalMode,
  searchQuery,
  setSearchQuery,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const districtRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click Outside Handler for Dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
        setDistrictDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedDistrictName = selectedDistrict ? selectedDistrict.name : 'All City Districts';
  const activeIncidents = incidents.filter((i) => i.status !== 'Resolved');

  return (
    <header className="sticky top-0 z-20 w-full bg-blue-700 text-white shadow-sm px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Side: Brand Logo, Search Bar & Interactive District Selector Dropdown */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Brand Logo (Mobile view) */}
          <div className="lg:hidden flex items-center gap-2">
            <span className="font-bold text-base text-white tracking-tight">CivicFlow</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-600 text-blue-100 font-mono border border-blue-500">
              SDG 11
            </span>
          </div>

          {/* Global Search Input */}
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search districts, sensors, incidents..."
              className="w-full pl-9 pr-4 py-1.5 bg-blue-800/80 border border-blue-500/60 rounded-lg text-xs text-white placeholder-blue-300 focus:outline-none focus:bg-blue-900/90 focus:border-white transition-all"
            />
          </div>

          {/* INTERACTIVE DISTRICT SELECTOR DROPDOWN */}
          <div className="relative hidden sm:block" ref={districtRef}>
            <button
              onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-800/60 hover:bg-blue-800 border border-blue-500/50 text-xs font-medium text-blue-100 transition-all cursor-pointer"
            >
              <span>District:</span>
              <span className="font-semibold text-white truncate max-w-[150px]">{selectedDistrictName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-blue-300 ml-1 transition-transform ${districtDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {districtDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-64 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-fade-in">
                <div className="px-3 py-1.5 border-b border-slate-100 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Select Operational District
                </div>
                
                <button
                  onClick={() => {
                    onSelectDistrict(null);
                    setDistrictDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-blue-50 transition-colors ${
                    selectedDistrict === null ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                  }`}
                >
                  <span>All City Districts</span>
                  {selectedDistrict === null && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                {districts.map((d) => {
                  const isSelected = selectedDistrict?.id === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        onSelectDistrict(d);
                        setDistrictDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-blue-50 transition-colors ${
                        isSelected ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{d.name}</div>
                        <div className="text-[10px] text-slate-400">{d.code} • {d.type}</div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: System Status Indicator, Live UTC Clock, Notifications & Tactical Trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end text-xs">
          
          {/* Subtle System Status Indicator (Hidden Feature Clue / Trigger) */}
          <button
            onClick={onToggleTacticalMode}
            title="● GRID SYNCHRONIZED — Click to activate Tactical Mode"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-800/70 hover:bg-blue-800 text-blue-100 border border-blue-500/50 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-white font-mono tracking-tight">● GRID SYNCHRONIZED</span>
          </button>

          {/* Live UTC Clock */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-800/60 border border-blue-500/50 text-blue-100 font-mono text-xs">
            <span>{timeStr || '14:30:00 UTC'}</span>
          </div>

          {/* INTERACTIVE NOTIFICATION BELL BUTTON */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              title="View Emergency Notifications & Incident Alerts"
              className="relative p-2 rounded-lg bg-blue-800/70 hover:bg-blue-800 text-blue-100 border border-blue-500/50 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {activeIncidentsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center animate-pulse">
                  {activeIncidentsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-80 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 py-2 z-50 text-xs animate-fade-in">
                <div className="flex items-center justify-between px-3 pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Active Emergency Alerts
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                    {activeIncidentsCount} Active
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {activeIncidents.map((inc) => (
                    <button
                      key={inc.id}
                      onClick={() => {
                        onNavigateToEmergency();
                        setNotificationsOpen(false);
                      }}
                      className="w-full p-3 text-left hover:bg-slate-50 transition-colors flex flex-col gap-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 truncate">{inc.title}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          inc.severity === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {inc.severity}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {inc.districtName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {inc.timestamp}
                        </span>
                      </div>
                    </button>
                  ))}

                  {activeIncidents.length === 0 && (
                    <div className="p-4 text-center text-slate-500 text-xs">
                      No active emergency alerts. All district systems operational.
                    </div>
                  )}
                </div>

                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      onNavigateToEmergency();
                      setNotificationsOpen(false);
                    }}
                    className="text-blue-700 font-bold hover:underline text-xs"
                  >
                    Go to Emergency Dispatch Matrix →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tactical Override Button */}
          <button
            onClick={onToggleTacticalMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/80 hover:bg-blue-950 text-white font-medium text-xs border border-blue-400/40 transition-all shadow-xs cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Tactical Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
