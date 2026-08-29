import React, { useState } from 'react';
import { Droplet, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection = 'solutions' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'The Journey', href: 'journey' },
    { label: 'The City', href: 'city' },
    { label: 'The Problem', href: 'problem' },
    { label: 'Solutions', href: 'solutions' },
    { label: 'Impact', href: 'impact' },
  ];

  const handleLinkClick = (href: string) => {
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-4 px-6 lg:px-14 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
        >
          <Droplet className="w-5 h-5 text-sky-700 fill-sky-700 group-hover:scale-110 transition-transform" />
          <span className="font-black text-xl tracking-tight text-slate-950 font-mono">
            AQUACITY
          </span>
        </button>

        {/* Center: Clean Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-medium text-slate-700">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`hover:text-sky-700 transition-colors cursor-pointer relative py-2 ${
                  isActive ? 'text-slate-950 font-bold' : ''
                }`}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-sky-600 rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-600 group-hover:w-full transition-all duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Editorial CTA Link */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleLinkClick('solutions')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-slate-950 hover:text-sky-700 uppercase transition-colors cursor-pointer group"
          >
            <span>EXPLORE</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-slate-900 hover:text-sky-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-8 space-y-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4 text-base font-semibold text-slate-900">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-1 hover:text-sky-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleLinkClick('solutions')}
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-sky-700 uppercase"
          >
            <span>EXPLORE AQUACITY</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
