"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const challenges = [
  "UI Reconstruction",
  "Speed Build",
  "Bug Hunt",
  "Hidden Feature",
  "Responsive",
  "Component Puzzle",
  "Design Memory",
  "Code Reverse",
];

export function Roulette() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  // Audio Tick Effect
  const playTickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors (e.g. if browser blocks autoplay without interaction)
    }
  };

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const targetIndex = Math.floor(Math.random() * challenges.length);
    
    const currentBase = Math.ceil(rotation / 360) * 360;
    const extraSpins = 360 * 6; // Spin 6 times
    
    const sliceAngle = targetIndex * 45;
    const targetRotation = currentBase + extraSpins - sliceAngle - 90;

    setRotation(targetRotation);
    
    // Play tick sounds while spinning
    let ticks = 0;
    const tickInterval = setInterval(() => {
      playTickSound();
      ticks++;
      if (ticks > 40) clearInterval(tickInterval); // slow down ticks towards the end
    }, 150);
    
    // Slower ticks at the end
    setTimeout(() => {
      clearInterval(tickInterval);
      const slowTicks = setInterval(() => playTickSound(), 400);
      setTimeout(() => clearInterval(slowTicks), 3000);
    }, 5000);

    setTimeout(() => {
      setResult(challenges[targetIndex]);
      setSpinning(false);
      
      // CONFETTI EXPLOSION 🎊
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#38bdf8', '#000000', '#ffffff']
      });
      
    }, 8000); // 8 second spin duration matches Framer Motion
  };

  return (
    <div className="flex w-full items-center justify-center gap-10 lg:gap-16 flex-col lg:flex-row max-w-[1200px] mx-auto">
      
      {/* 🎡 THE WHEEL (Flat, Clean, Minimal) */}
      <div className="relative flex items-center justify-center shrink-0">
        
        {/* Pointer / Marker at the top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 animate-[bounce_1s_infinite]">
          <div className="w-8 h-10 bg-sky-500 rounded-t-xl border-2 border-black flex items-center justify-center relative shadow-[0_4px_15px_rgba(14,165,233,0.5)]">
             <div className="w-1.5 h-5 bg-white/90 rounded-full" />
             {/* Pointy bottom */}
             <div className="absolute -bottom-3 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[14px] border-t-sky-500" />
             <div className="absolute -bottom-[15px] w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[16px] border-t-black -z-10" />
          </div>
        </div>

        {/* Outer Wheel Container - Resized */}
        <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full p-2 bg-black shadow-[0_0_40px_rgba(0,0,0,0.6)] shrink-0 border-4 border-sky-900/40">
          
          {/* Static Top Highlight Layer - perfectly aligned to 12 o'clock */}
          <AnimatePresence>
            {result && !spinning && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 pointer-events-none rounded-full"
                style={{
                  background: `conic-gradient(from -22.5deg, rgba(14, 165, 233, 0.25) 0deg, rgba(14, 165, 233, 0.25) 45deg, transparent 45deg)`
                }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="relative w-full h-full rounded-full border-[4px] md:border-[6px] border-slate-900 overflow-hidden bg-[#0a0a0a]"
            animate={{ 
              rotate: rotation,
              scale: spinning ? [1, 1.03, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 8, ease: [0.1, 0.95, 0.2, 1] },
              scale: { duration: 0.6, repeat: spinning ? Infinity : 0 }
            }}
          >
            
            {challenges.map((challenge, i) => {
              const angle = i * 45;
              const isSelected = result === challenge;
              
              return (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 w-1/2 h-0 origin-left flex items-center z-10"
                  style={{ transform: `translateY(-50%) rotate(${angle}deg)` }}
                >
                  {/* Divider Line */}
                  <div 
                    className="absolute top-0 left-0 w-full h-[2px] bg-slate-800 origin-left" 
                    style={{ transform: 'rotate(-22.5deg)' }} 
                  />

                  {/* Text Container */}
                  <div className="pl-[70px] md:pl-[90px] lg:pl-[100px] w-full pr-4 flex items-center justify-end text-right">
                    <span 
                      className={`block font-black uppercase tracking-[0.15em] whitespace-nowrap text-[8px] md:text-[10px] lg:text-[11px] ${
                        isSelected 
                          ? "text-sky-400 font-black" 
                          : "text-slate-500"
                      }`}
                    >
                      {challenge}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 w-16 h-16 md:w-24 md:h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black border-4 md:border-[6px] border-slate-900 z-20 flex items-center justify-center">
              <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-sky-500" />
            </div>
            
          </motion.div>
        </div>
      </div>

      {/* 🎛️ CONTROL PANEL */}
      <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-[400px] shrink-0 relative z-20">
        
        {/* Result Screen - Clean flat design */}
        <div className="w-full aspect-[2/1] bg-[#0a0a0a] border-2 border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          
          <div className="inline-flex items-center space-x-2 text-sky-500 mb-4">
            <Sparkles className="w-4 h-4" />
            <p className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Target Challenge</p>
          </div>
          
          <div className="flex-1 flex items-center justify-center w-full px-2">
            <AnimatePresence mode="wait">
              {result && !spinning ? (
                <motion.h2
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter leading-tight whitespace-nowrap"
                >
                  {result}
                </motion.h2>
              ) : spinning ? (
                <motion.div
                  key="spinning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
                  <span className="text-xs font-mono text-sky-600 tracking-[0.4em] animate-pulse">COMPUTING</span>
                </motion.div>
              ) : (
                <motion.span
                  key="idle"
                  className="text-5xl text-slate-800 font-black"
                >
                  ?
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button - Clean flat design */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="w-full h-16 flex items-center justify-center px-8 text-sm md:text-base font-black tracking-[0.2em] text-black uppercase transition-all bg-sky-500 rounded-lg hover:bg-sky-400 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed border-b-4 border-sky-700 active:border-b-0 active:translate-y-1"
        >
          {spinning ? 'Engaged' : 'Execute Spin'}
        </button>
      </div>
      
    </div>
  );
}
