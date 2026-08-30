import React from 'react';
import { Droplet, ArrowUpRight } from 'lucide-react';

export type AquacityTab = 'journey' | 'city' | 'problem' | 'solutions' | 'impact';

interface NavbarProps {
  activeTab: AquacityTab;
  setActiveTab: (tab: AquacityTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: AquacityTab; label: string; href: string }[] = [
    { id: 'journey', label: 'The Journey', href: '#journey' },
    { id: 'city', label: 'The City', href: '#city' },
    { id: 'problem', label: 'The Problem', href: '#problem' },
    { id: 'solutions', label: 'Solutions', href: '#solutions' },
    { id: 'impact', label: 'Impact', href: '#impact' },
  ];

  const handleTabClick = (item: { id: AquacityTab; href: string }) => {
    setActiveTab(item.id);
    const el = document.querySelector(item.href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xs border-b border-stone-200/80 transition-all px-8 lg:px-16 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand: Water Droplet + AQUACITY */}
        <button
          onClick={() => {
            setActiveTab('journey');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <Droplet className="w-5 h-5 text-[#0284C7] fill-[#0284C7]" />
          <span className="font-extrabold text-sm tracking-wider text-[#0A192F] uppercase font-sans">
            AQUACITY
          </span>
        </button>

        {/* Center Nav Links with active blue underline */}
        <nav className="hidden md:flex items-center gap-9 text-[13px] font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`py-1 relative transition-colors cursor-pointer ${
                  isActive ? 'text-[#0A192F] font-semibold' : 'hover:text-[#0A192F]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0284C7] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: EXPLORE ↗ */}
        <div className="flex items-center">
          <button
            onClick={() => handleTabClick({ id: 'solutions', href: '#solutions' })}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0A192F] hover:text-[#0284C7] uppercase tracking-wide transition-colors cursor-pointer font-sans"
          >
            <span>EXPLORE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
