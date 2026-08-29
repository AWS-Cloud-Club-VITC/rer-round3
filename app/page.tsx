import { Roulette } from "@/components/Roulette";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-[100dvh] w-full flex-col items-center justify-between relative overflow-hidden font-sans">
      
      {/* High-Resolution Isometric City Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/city_bg.jpg" 
          alt="Isometric City Background" 
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-sky-900/30 backdrop-blur-[2px]" />
      </div>

      <div className="z-20 flex flex-col items-center w-full max-w-[1600px] h-full justify-between py-6 px-4 md:px-8">
        
        {/* Top Header Row with Title */}
        <header className="w-full flex items-center justify-center shrink-0">
          {/* Center: Title */}
          <div className="flex-1 px-4 text-center">
            <h1 className="text-2xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter text-slate-900 uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,0.9)] leading-none">
              Round 3 - Reverse Engineering Roulette
            </h1>
          </div>
        </header>

        {/* The Wheel Section - Using flex-1 and min-h-0 so it shrinks if needed to fit the screen */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center pt-4 md:pt-8">
          <Roulette />
        </div>
        
      </div>
    </main>
  );
}
