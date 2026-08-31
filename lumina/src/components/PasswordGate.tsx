import React, { useState, useEffect, useRef } from 'react';
import { Zap, Lock, AlertCircle, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Auto-focus password input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      sessionStorage.setItem('lumina_auth', 'true');
      setError(false);
      onAuthenticated();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#F5F5F5] flex items-center justify-center p-4 font-mono select-none relative overflow-hidden">
      {/* Background Subtle Exposed Grid & Conduit Sparks */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* High-Voltage Circuit Conduits across background */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#151515] -translate-y-1/2 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00A8FF]/30 to-transparent animate-pulse" />
      </div>

      <div className={`relative z-10 w-full max-w-md space-y-8 text-center ${shake ? 'animate-bounce' : ''}`}>
        {/* Terminal Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0A0A0A] border border-[#222222] text-[#00A8FF] mb-2 shadow-[0_0_15px_rgba(0,168,255,0.2)]">
            <Zap className="w-6 h-6 animate-current-pulse stroke-[2.5]" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            LUMINA
          </h1>

          <div className="text-[10px] tracking-widest text-[#666666] uppercase font-bold">
            HIGH-VOLTAGE URBAN ENERGY SYSTEM • RESTRICTED ACCESS
          </div>

          <p className="text-sm text-[#888888] font-sans pt-1">
            Enter the access code to continue.
          </p>
        </div>

        {/* Access Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#666666]">
              <label htmlFor="access-code" className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#888888]">
                <Lock className="w-3.5 h-3.5 text-[#00A8FF]" />
                <span>ACCESS CODE</span>
              </label>
              <span className="text-[10px] text-[#555555]">AUTHENTICATION GATE</span>
            </div>

            <div className="relative">
              <input
                id="access-code"
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••"
                className={`w-full bg-[#0A0A0A] border ${
                  error
                    ? 'border-[#FF4444] text-[#FF4444] shadow-[0_0_10px_rgba(255,68,68,0.3)]'
                    : 'border-[#222222] text-white focus:border-[#00A8FF] focus:shadow-[0_0_12px_rgba(0,168,255,0.3)]'
                } px-4 py-3 text-center tracking-[0.5em] text-lg font-mono placeholder:tracking-normal placeholder:text-[#333333] transition-all outline-none rounded-none`}
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#FF4444] font-bold pt-1 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect access code. Please try again.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-[#0A0A0A] border border-[#00A8FF] text-[#00A8FF] hover:bg-[#00A8FF] hover:text-black font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(0,168,255,0.15)] hover:shadow-[0_0_20px_rgba(0,168,255,0.5)] rounded-none"
          >
            <span>ENTER LUMINA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </form>

        {/* Footer Technical Metadata */}
        <div className="pt-6 border-t border-[#1A1A1A] flex items-center justify-between text-[10px] text-[#555555]">
          <span>STATUS: SECURE ⚡</span>
          <span>CODE: 1234</span>
          <span>SDG 11 × SDG 7</span>
        </div>
      </div>
    </div>
  );
};
