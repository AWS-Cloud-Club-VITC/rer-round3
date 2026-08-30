import { useState, useEffect } from 'react';
import { Navbar, type AquacityTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WaterJourney } from './components/WaterJourney';
import { InteractiveCity } from './components/InteractiveCity';
import { WaterProblemSection } from './components/WaterProblemSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ImpactSection } from './components/ImpactSection';
import { LeakDetectionModal } from './components/LeakDetectionModal';
import { OrganizerSpecsModal } from './components/OrganizerSpecsModal';

import { computeImpactFromSolutions } from './utils/waterEfficiencyCalculator';
import type { CityWaterImpact } from './types/aquacity';

export function App() {
  const [activeTab, setActiveTab] = useState<AquacityTab>('journey');

  // Solutions State (Matches Screenshot 5: Water Recycling ON, Rainwater OFF, Leak Detection ON -> 84%)
  const [solutions, setSolutions] = useState({
    recycling: true,       // ON (+15%)
    rainwater: false,      // OFF (+12%)
    leakDetection: true,   // ON (+14%) -> 55 + 15 + 14 = 84%
  });

  // Modal Dialog States
  const [leakModalOpen, setLeakModalOpen] = useState(false);
  const [specsModalOpen, setSpecsModalOpen] = useState(false);

  // Compute live dynamic impact metrics
  const impact: CityWaterImpact = computeImpactFromSolutions(solutions);

  // Handle direct organizer path routes
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('hidden-feature') || path.includes('specs')) {
      setSpecsModalOpen(true);
    }
  }, []);

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections: { id: AquacityTab; el: HTMLElement | null }[] = [
        { id: 'journey', el: document.querySelector('#journey') },
        { id: 'city', el: document.querySelector('#city') },
        { id: 'problem', el: document.querySelector('#problem') },
        { id: 'solutions', el: document.querySelector('#solutions') },
        { id: 'impact', el: document.querySelector('#impact') },
      ];

      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el && sec.el.offsetTop <= scrollPos) {
          setActiveTab(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle Solution Handler
  const handleToggleSolution = (id: 'recycling' | 'rainwater' | 'leakDetection') => {
    setSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Resolve Hidden Feature Leak Handler
  const handleResolveLeak = () => {
    setSolutions((prev) => ({
      ...prev,
      leakDetection: true,
    }));
  };

  const handleExploreClick = () => {
    const el = document.querySelector('#solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A192F] flex flex-col selection:bg-sky-200 selection:text-sky-950">
      
      {/* Top Editorial Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Single Continuous Editorial Flow */}
      <main className="flex-1 w-full space-y-0">
        
        {/* Section 00: Hero (EVERY DROP SHAPES A CITY) */}
        <HeroSection />

        {/* Section 01: The Journey (WHERE DOES OUR WATER GO?) */}
        <WaterJourney />

        {/* Section 02: The City (THE CITY IS A WATER SYSTEM.) */}
        <InteractiveCity />

        {/* Section 03: The Problem (THE CITY SEALS THE LEAK.) */}
        <WaterProblemSection
          isLeakRepaired={solutions.leakDetection}
          onTriggerLeakDetection={() => setLeakModalOpen(true)}
        />

        {/* Section 04: Solutions (THE LIVING RIVER MAP.) */}
        <SolutionsSection
          solutions={solutions}
          onToggleSolution={handleToggleSolution}
          efficiencyScore={impact.efficiency}
        />

        {/* Section 05: Impact (A SUSTAINABLE CITY STARTS WITH WATER.) */}
        <ImpactSection
          onExploreClick={handleExploreClick}
          onOpenSpecs={() => setSpecsModalOpen(true)}
        />

      </main>

      {/* HIDDEN FEATURE CHALLENGE MODAL: Zone 04 Sub-Surface Diagnostic Mode */}
      <LeakDetectionModal
        isOpen={leakModalOpen}
        onClose={() => setLeakModalOpen(false)}
        onResolveLeak={handleResolveLeak}
      />

      {/* MASTER ORGANIZER & JUDGE EVALUATION MODAL */}
      <OrganizerSpecsModal
        isOpen={specsModalOpen}
        onClose={() => setSpecsModalOpen(false)}
        onTriggerHiddenFeature={() => setLeakModalOpen(true)}
      />

    </div>
  );
}

export default App;
