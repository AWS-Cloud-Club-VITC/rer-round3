import React, { useState, useEffect, useRef } from 'react';
import { Droplet, ArrowRight, Lock, AlertCircle } from 'lucide-react';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = password.trim();

    // Accepted access codes (both 1234 and AQUACITY2026 as per specification)
    if (cleanInput === '1234' || cleanInput === 'AQUACITY2026') {
      setError(false);
      setIsSubmitting(true);
      try {
        sessionStorage.setItem('aquacity_authenticated', 'true');
      } catch {
        // Fallback for storage restricted environments
      }
      onAuthenticated();
    } else {
      setError(true);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAF7] text-[#0A192F] flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
      
      {/* Background Subtle Wave Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-40">
        <svg className="w-full max-w-5xl h-auto" viewBox="0 0 1000 400" fill="none">
          <path
            d="M 50 200 C 250 120, 450 280, 650 140 C 850 140, 950 240, 1050 180"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M 50 240 C 300 320, 600 100, 950 220"
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Main Password Form Card */}
      <div className="w-full max-w-md bg-white border border-stone-200/90 rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-slate-900/5 relative z-10 space-y-8">
        
        {/* Top Brand Logo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] shadow-2xs">
            <Droplet className="w-6 h-6 fill-[#0284C7] text-[#0284C7]" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight font-sans uppercase">
              AQUACITY
            </h1>
            <p className="text-xs text-slate-500 font-sans">
              Enter the access code to continue.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="access-code"
              className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block"
            >
              Access Code
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>

              <input
                ref={inputRef}
                id="access-code"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full pl-10 pr-4 py-3.5 rounded-xl text-sm font-mono tracking-widest bg-[#FAFAF7] border transition-all outline-none ${
                  error
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 text-rose-900'
                    : 'border-stone-200 focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 text-[#0A192F]'
                }`}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-sans pt-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Incorrect access code. Please try again.</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className={`w-full py-4 rounded-xl text-xs font-bold font-sans tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              password.trim()
                ? 'bg-[#0A192F] hover:bg-[#0284C7] text-white hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-stone-100 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>ENTER AQUACITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info tag */}
        <div className="pt-2 text-center border-t border-stone-100">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            SDG 06 · Clean Water & Sanitation
          </span>
        </div>

      </div>

    </div>
  );
};
