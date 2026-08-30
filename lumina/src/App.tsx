import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EnergyArchitecture } from './components/EnergyArchitecture';
import { EnergyFlow } from './components/EnergyFlow';
import { CityScene } from './components/CityScene';
import { EnergyIntelligence } from './components/EnergyIntelligence';
import { Resilience } from './components/Resilience';
import { EnergyHistory } from './components/EnergyHistory';
import { OrganizerPage } from './components/OrganizerPage';
import { Footer } from './components/Footer';
import {
  DiurnalPhase,
  EnergyHistoryPoint,
  SelectedSourceId,
  SimulationInputs,
  UrbanSystem,
} from './types/energy';
import { simulateEnergyGrid } from './utils/energyEngine';

const INITIAL_INPUTS: SimulationInputs = {
  solarGenerationKwh: 150,
  batteryReserveKwh: 200,
  cityDemandMultiplier: 1.0,
  streetlightIntensity: 1.0,
};

export const App: React.FC = () => {
  const [inputs, setInputs] = useState<SimulationInputs>(INITIAL_INPUTS);
  const [selectedSystem, setSelectedSystem] = useState<UrbanSystem | null>(null);
  const [selectedSourceId, setSelectedSourceId] = useState<SelectedSourceId>(null);
  const [, setDiurnalPhase] = useState<DiurnalPhase>('NIGHT');
  const [activeSection, setActiveSection] = useState<string>('city');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isOrganizerRoute, setIsOrganizerRoute] = useState<boolean>(() => {
    return (
      window.location.pathname === '/organizer' ||
      window.location.hash === '#organizer'
    );
  });
  const [history, setHistory] = useState<EnergyHistoryPoint[]>([]);

  const citySectionRef = useRef<HTMLDivElement | null>(null);
  const architectureSectionRef = useRef<HTMLDivElement | null>(null);
  const infrastructureSectionRef = useRef<HTMLDivElement | null>(null);
  const intelligenceSectionRef = useRef<HTMLDivElement | null>(null);
  const resilienceSectionRef = useRef<HTMLDivElement | null>(null);

  // Sync route on popstate / hashchange
  useEffect(() => {
    const checkRoute = () => {
      setIsOrganizerRoute(
        window.location.pathname === '/organizer' ||
        window.location.hash === '#organizer'
      );
    };
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Track global scroll progress for traveling electrical trace
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Master Simulation Engine
  const simulation = useMemo(() => {
    return simulateEnergyGrid(inputs);
  }, [inputs]);

  // Record history snapshots
  useEffect(() => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    const newPoint: EnergyHistoryPoint = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: now.toISOString(),
      timeLabel,
      availableKwh: simulation.availableEnergyKwh,
      demandKwh: simulation.totalDemandKwh,
      shortfallKwh: simulation.energyGapKwh,
      resilienceScore: simulation.resilienceScore,
    };

    setHistory((prev) => {
      const last = prev[prev.length - 1];
      if (
        last &&
        last.availableKwh === newPoint.availableKwh &&
        last.demandKwh === newPoint.demandKwh
      ) {
        return prev;
      }
      return [...prev.slice(-7), newPoint];
    });
  }, [simulation.availableEnergyKwh, simulation.totalDemandKwh, simulation.resilienceScore, simulation.energyGapKwh]);

  const handleReset = () => {
    setInputs(INITIAL_INPUTS);
    setSelectedSystem(null);
    setSelectedSourceId(null);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
    if (sectionId === 'city') targetRef = citySectionRef;
    else if (sectionId === 'architecture') targetRef = architectureSectionRef;
    else if (sectionId === 'infrastructure') targetRef = infrastructureSectionRef;
    else if (sectionId === 'intelligence') targetRef = intelligenceSectionRef;
    else if (sectionId === 'resilience') targetRef = resilienceSectionRef;

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToOrganizer = () => {
    window.history.pushState({}, '', '/organizer');
    setIsOrganizerRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToApp = () => {
    window.history.pushState({}, '', '/');
    setIsOrganizerRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isOrganizerRoute) {
    return <OrganizerPage onBackToApp={navigateToApp} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col font-sans selection:bg-[#00A8FF] selection:text-black">
      {/* Brutalist Header & Circuit Progress Trace */}
      <Header
        onReset={handleReset}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
        onPhaseChange={setDiurnalPhase}
        scrollProgress={scrollProgress}
      />

      {/* Main Continuous High-Voltage Stream */}
      <main className="flex-1 w-full space-y-20 pb-16">
        {/* Section 01 — POWER (Hero) */}
        <div ref={citySectionRef} className="scroll-mt-20">
          <Hero
            simulation={simulation}
            onExploreClick={() => handleNavigateSection('architecture')}
          />
        </div>

        {/* Section 02 — ARCHITECTURE */}
        <div ref={architectureSectionRef} className="scroll-mt-20 space-y-8">
          <EnergyArchitecture
            inputs={inputs}
            onChangeInputs={setInputs}
            availableEnergyKwh={simulation.availableEnergyKwh}
            totalDemandKwh={simulation.totalDemandKwh}
            resilienceScore={simulation.resilienceScore}
          />
          <EnergyFlow
            sources={simulation.sources}
            systems={simulation.systems}
            availableEnergyKwh={simulation.availableEnergyKwh}
            selectedSourceId={selectedSourceId}
            onSelectSource={setSelectedSourceId}
          />
        </div>

        {/* Section 03 — INFRASTRUCTURE */}
        <div ref={infrastructureSectionRef} className="scroll-mt-20">
          <CityScene
            simulation={simulation}
            currentInputs={inputs}
            onSelectSystem={setSelectedSystem}
            selectedSystem={selectedSystem}
          />
        </div>

        {/* Section 04 — INTELLIGENCE */}
        <div ref={intelligenceSectionRef} className="scroll-mt-20">
          <EnergyIntelligence simulation={simulation} />
        </div>

        {/* Section 05 — RESILIENCE */}
        <div ref={resilienceSectionRef} className="scroll-mt-20 space-y-6">
          <Resilience simulation={simulation} />
          <EnergyHistory history={history} />
        </div>
      </main>

      {/* Section 06 — IMPACT (Footer) */}
      <Footer onNavigateOrganizer={navigateToOrganizer} />
    </div>
  );
};

export default App;
