import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WaterJourney } from './components/WaterJourney';
import { InteractiveCity } from './components/InteractiveCity';
import { WaterProblemSection } from './components/WaterProblemSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ImpactSection } from './components/ImpactSection';
import { FinalCTA } from './components/FinalCTA';
import { CodeReverseOrganizerRoute } from './components/CodeReverseOrganizerRoute';
import { HiddenFeatureOrganizerRoute } from './components/HiddenFeatureOrganizerRoute';
import { ShieldAlert, Terminal } from 'lucide-react';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<'main' | 'code-reverse' | 'hidden-feature'>('main');
  const [activeSection, setActiveSection] = useState<string>('solutions');

  // Solutions State for Dynamic Water Efficiency Score Calculation
  const [waterRecycling, setWaterRecycling] = useState<boolean>(true);
  const [rainwaterHarvesting, setRainwaterHarvesting] = useState<boolean>(false);
  const [leakDetection, setLeakDetection] = useState<boolean>(true);

  // Handle URL Path matching for Organizer Reference Routes
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('code-reverse')) {
      setCurrentRoute('code-reverse');
    } else if (path.includes('hidden-feature')) {
      setCurrentRoute('hidden-feature');
    } else {
      setCurrentRoute('main');
    }
  }, []);

  // Scroll spy to update active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'journey', 'city', 'problem', 'solutions', 'impact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothNavigate = (sectionId: string) => {
    if (currentRoute !== 'main') {
      setCurrentRoute('main');
    }
    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Render Code Reverse Organizer Route
  if (currentRoute === 'code-reverse') {
    return <CodeReverseOrganizerRoute onBack={() => setCurrentRoute('main')} />;
  }

  // Render Hidden Feature Organizer Route
  if (currentRoute === 'hidden-feature') {
    return <HiddenFeatureOrganizerRoute onBack={() => setCurrentRoute('main')} />;
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-900 selection:bg-cyan-100 selection:text-cyan-900 font-sans flex flex-col justify-between">
      
      <div>
        {/* Minimal Top Navigation Bar */}
        <Navbar onNavigate={handleSmoothNavigate} activeSection={activeSection} />

        {/* Main Editorial Story Flow */}
        <main className="w-full">
          
          {/* Section 1: Hero */}
          <HeroSection onExplore={() => handleSmoothNavigate('city')} />

          {/* Section 2: Water Journey */}
          <WaterJourney />

          {/* Section 3: Interactive City */}
          <InteractiveCity />

          {/* Section 4: The Problem & Hidden Leak Feature */}
          <WaterProblemSection leakDetection={leakDetection} />

          {/* Section 5: Solutions (Two-Column Living River Map & Simulator) */}
          <SolutionsSection
            waterRecycling={waterRecycling}
            setWaterRecycling={setWaterRecycling}
            rainwaterHarvesting={rainwaterHarvesting}
            setRainwaterHarvesting={setRainwaterHarvesting}
            leakDetection={leakDetection}
            setLeakDetection={setLeakDetection}
          />

          {/* Section 6: Impact & Dynamic Water Efficiency Score (Light Editorial Theme) */}
          <ImpactSection
            waterRecycling={waterRecycling}
            rainwaterHarvesting={rainwaterHarvesting}
            leakDetection={leakDetection}
          />

          {/* Section 7: Final CTA */}
          <FinalCTA onExplore={() => handleSmoothNavigate('solutions')} />

        </main>
      </div>

      {/* Minimal Footer & Organizer Links */}
      <footer className="w-full bg-[#faf9f5] border-t border-slate-200 py-8 px-6 lg:px-14 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">AQUACITY</span>
            <span>— SDG 06 Clean Water & Sanitation</span>
            <span className="text-slate-300">•</span>
            <span>VIT Chennai</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Team: Jyotish N, Prodhosh VS, Devadarrsha P D, Pavan S</span>
            <span className="text-slate-300">•</span>

            {/* Subtle Organizer Reference Links */}
            <button
              onClick={() => setCurrentRoute('code-reverse')}
              className="hover:text-sky-700 underline flex items-center gap-1 cursor-pointer"
            >
              <Terminal className="w-3 h-3" />
              <span>Specs: Code</span>
            </button>
            <button
              onClick={() => setCurrentRoute('hidden-feature')}
              className="hover:text-rose-700 underline flex items-center gap-1 cursor-pointer"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Specs: Hidden</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
