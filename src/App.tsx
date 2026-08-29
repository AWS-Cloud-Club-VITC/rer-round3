import { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import type { TabType } from './components/Navbar';
import { MetricCards } from './components/MetricCards';
import { DistrictMap } from './components/DistrictMap';
import { DistrictModal } from './components/DistrictModal';
import { TrafficSection } from './components/TrafficSection';
import { EnvironmentSection } from './components/EnvironmentSection';
import { EmergencySection } from './components/EmergencySection';
import { InfrastructureSection } from './components/InfrastructureSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { TacticalIncidentOverlay } from './components/TacticalIncidentOverlay';
import { OrganizerSupportModal } from './components/OrganizerSupportModal';

import {
  INITIAL_DISTRICTS,
  INITIAL_METRICS,
  INITIAL_INCIDENTS,
  INITIAL_INFRASTRUCTURE,
  INITIAL_TRANSIT,
} from './data/mockData';
import type { District, CityMetric, EmergencyIncident, CityRiskInput } from './types/dashboard';
import { calculateCityRiskScore } from './utils/riskCalculator';
import { Eye, LayoutDashboard, Car, ShieldAlert } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [districts] = useState<District[]>(INITIAL_DISTRICTS);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [metrics, setMetrics] = useState<CityMetric[]>(INITIAL_METRICS);
  const [incidents, setIncidents] = useState<EmergencyIncident[]>(INITIAL_INCIDENTS);
  const [infrastructure] = useState(INITIAL_INFRASTRUCTURE);
  const [transitLines] = useState(INITIAL_TRANSIT);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tacticalModeOpen, setTacticalModeOpen] = useState<boolean>(false);
  const [organizerModalOpen, setOrganizerModalOpen] = useState<boolean>(false);

  // Risk Calculator Input State (Internal calculation for tactical mode risk output)
  const [riskInput] = useState<CityRiskInput>({
    trafficLevel: 68,
    aqiIndex: 42,
    activeEmergencies: 3,
    infrastructureHealth: 88,
  });

  // Handle organizer route / path matching
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('hidden-feature')) {
      setActiveTab('hidden-feature');
    }
  }, []);

  // Compute live Risk Score
  const riskOutput = useMemo(() => {
    return calculateCityRiskScore(riskInput);
  }, [riskInput]);

  // Recalibrate metric action (Level 2 micro-action)
  const handleRecalibrateMetric = (id: string) => {
    setMetrics((prev) =>
      prev.map((m) => {
        if (m.id === id && m.hiddenSubDetail) {
          return {
            ...m,
            hiddenSubDetail: {
              ...m.hiddenSubDetail,
              lastCalibrated: 'Just now (Recalibrated)',
              sensorDrift: '±0.0%',
            },
          };
        }
        return m;
      })
    );
  };

  // Resolve Incident Action
  const handleResolveIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: 'Resolved' } : inc))
    );
  };

  // Filter districts based on search & header dropdown selection
  const filteredDistricts = useMemo(() => {
    let result = districts;
    if (selectedDistrict) {
      result = districts.filter((d) => d.id === selectedDistrict.id);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          d.type.toLowerCase().includes(q)
      );
    }
    return result;
  }, [districts, selectedDistrict, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      
      {/* Desktop Left Sidebar Navigation */}
      <div className="hidden lg:block">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          incidentsCount={incidents.filter((i) => i.status !== 'Resolved').length}
          onToggleTacticalMode={() => setTacticalModeOpen(true)}
          onOpenOrganizerModal={() => setOrganizerModalOpen(true)}
        />
      </div>

      {/* Main Workspace Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <Header
          districts={districts}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={(d) => setSelectedDistrict(d)}
          incidents={incidents}
          onNavigateToEmergency={() => setActiveTab('emergency')}
          activeIncidentsCount={incidents.filter((i) => i.status !== 'Resolved').length}
          onToggleTacticalMode={() => setTacticalModeOpen(true)}
          onOpenOrganizerModal={() => setOrganizerModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6 pb-24 lg:pb-12">
          
          {/* Tab 1: Overview (Main Dashboard View) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Clean Dashboard Hero Section */}
              <div className="saas-card p-6 border border-slate-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    SDG 11 Sustainable Cities & Communities Operations
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  CivicFlow Smart City Intelligence
                </h1>
                <p className="text-xs text-slate-500 mt-1 max-w-3xl">
                  Real-time monitoring across the city's districts, mobility, environment and infrastructure.
                </p>
              </div>

              {/* FIRST VIEWPORT: CITY VITALS (Compact Information Strip Grid) */}
              <section>
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    City Vitals Summary
                  </h3>
                </div>
                <MetricCards metrics={metrics} onRecalibrateMetric={handleRecalibrateMetric} />
              </section>

              {/* MAIN MAP CARD (City Operations Map) */}
              <section id="map-section">
                <DistrictMap
                  districts={filteredDistricts}
                  selectedDistrict={selectedDistrict}
                  onSelectDistrict={(d) => setSelectedDistrict(d)}
                />
              </section>

              {/* TRAFFIC SECTION */}
              <section>
                <TrafficSection transitLines={transitLines} />
              </section>

              {/* ENVIRONMENTAL MONITORING SECTION */}
              <section>
                <EnvironmentSection />
              </section>

              {/* EMERGENCY DISPATCH SECTION */}
              <section>
                <EmergencySection
                  incidents={incidents}
                  onResolveIncident={handleResolveIncident}
                />
              </section>

              {/* INFRASTRUCTURE HEALTH SECTION */}
              <section>
                <InfrastructureSection infrastructure={infrastructure} />
              </section>
            </div>
          )}

          {/* Tab 2: Dedicated City Operations Map View */}
          {activeTab === 'map' && (
            <div className="space-y-6 animate-fade-in">
              <div className="saas-card p-6 border border-slate-200 bg-white shadow-xs">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  City Operations Spatial Map
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Interactive district telemetry, camera feeds, and environmental sensor nodes. Click any district to open the inspection drawer.
                </p>
              </div>

              <DistrictMap
                districts={filteredDistricts}
                selectedDistrict={selectedDistrict}
                onSelectDistrict={(d) => setSelectedDistrict(d)}
              />
            </div>
          )}

          {/* Dedicated Mobility View */}
          {activeTab === 'mobility' && (
            <div className="animate-fade-in">
              <TrafficSection transitLines={transitLines} />
            </div>
          )}

          {/* Dedicated Environment View */}
          {activeTab === 'environment' && (
            <div className="animate-fade-in">
              <EnvironmentSection />
            </div>
          )}

          {/* Dedicated Emergency View */}
          {activeTab === 'emergency' && (
            <div className="animate-fade-in">
              <EmergencySection
                incidents={incidents}
                onResolveIncident={handleResolveIncident}
              />
            </div>
          )}

          {/* Dedicated Infrastructure View */}
          {activeTab === 'infrastructure' && (
            <div className="animate-fade-in">
              <InfrastructureSection infrastructure={infrastructure} />
            </div>
          )}

          {/* Dedicated Analytics View */}
          {activeTab === 'analytics' && (
            <div className="animate-fade-in">
              <AnalyticsSection />
            </div>
          )}

          {/* Organizer Route ONLY: Hidden Feature Guide (/challenge/hidden-feature) */}
          {activeTab === 'hidden-feature' && (
            <div className="saas-card p-6 border border-slate-200 bg-white space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Organizer Hidden Feature Specification
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Internal guide for organizers & judges evaluating the RER Round 3 Hidden Feature Challenge.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-emerald-200 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold block w-max">
                    Interactive Map Drawer
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">District Inspection Drawer</h3>
                  <p className="text-slate-600">
                    Clicking any city district node on the interactive map opens a right-side telemetry drawer.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('map');
                      setSelectedDistrict(districts[0]);
                    }}
                    className="mt-2 text-blue-700 underline font-semibold cursor-pointer"
                  >
                    Test Map Drawer →
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-amber-200 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold block w-max">
                    Card Sub-Telemetry
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">Metric Expansion & Recalibration</h3>
                  <p className="text-slate-600">
                    Hovering over any key metric card expands sub-telemetry metrics (PM2.5, sensor drift, sync time) and sensor recalibration actions.
                  </p>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="mt-2 text-blue-700 underline font-semibold cursor-pointer"
                  >
                    Test Card Expansion →
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-rose-200 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold block w-max">
                    Tactical Mode Overlay
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">Tactical Command Mode</h3>
                  <p className="text-slate-600">
                    Clicking the status indicator "● GRID SYNCHRONIZED" opens emergency tactical override mode.
                  </p>
                  <button
                    onClick={() => setTacticalModeOpen(true)}
                    className="mt-2 text-rose-700 underline font-semibold cursor-pointer"
                  >
                    Test Tactical Mode →
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Mobile / Tablet Bottom Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white text-slate-800 border-t border-slate-200 p-2 flex justify-around text-xs shadow-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded ${activeTab === 'overview' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px]">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded ${activeTab === 'map' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
          >
            <Eye className="w-4 h-4" />
            <span className="text-[10px]">Map</span>
          </button>
          <button
            onClick={() => setActiveTab('mobility')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded ${activeTab === 'mobility' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
          >
            <Car className="w-4 h-4" />
            <span className="text-[10px]">Mobility</span>
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded ${activeTab === 'emergency' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px]">Alerts</span>
          </button>
        </div>

        {/* Level 1 Hidden Feature Drawer (District Side Drawer) */}
        <DistrictModal
          district={selectedDistrict}
          onClose={() => setSelectedDistrict(null)}
        />

        {/* Level 3 Hidden Feature Overlay (Tactical Incident Mode) */}
        <TacticalIncidentOverlay
          isOpen={tacticalModeOpen}
          onClose={() => setTacticalModeOpen(false)}
          riskOutput={riskOutput}
        />

        {/* Organizer & Judge Reference Modal */}
        <OrganizerSupportModal
          isOpen={organizerModalOpen}
          onClose={() => setOrganizerModalOpen(false)}
        />

        {/* Footer */}
        <footer className="w-full bg-white border-t border-slate-200 py-4 px-4 lg:px-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span>CivicFlow Smart City Dashboard — SDG 11</span>
              <span className="mx-2">•</span>
              <span>AWS Student Builder Group, VIT Chennai</span>
            </div>
            <div>
              <span>Team: Jyotish N, Prodhosh VS, Devadarrsha P D, Pavan S</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
