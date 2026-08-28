"use client";

import CircularGallery from "./CircularGallery";

const SUSTAINABLE_CITIES = [
  {
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80&fit=crop",
    text: "Singapore · Eco Canopy",
  },
  {
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80&fit=crop",
    text: "Copenhagen · Clean Transit",
  },
  {
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80&fit=crop",
    text: "Tokyo · Compact Living",
  },
  {
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?w=800&q=80&fit=crop",
    text: "Medellín · Urban Lift",
  },
  {
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80&fit=crop",
    text: "Amsterdam · Canal Grid",
  },
  {
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=800&q=80&fit=crop",
    text: "Curitiba · Rapid Transit",
  },
  {
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&q=80&fit=crop",
    text: "Zurich · Zero Emission",
  },
  {
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80&fit=crop",
    text: "Barcelona · Superblocks",
  },
];

export default function CityShowcaseGallery() {
  return (
    <section className="bg-white py-24 md:py-36 overflow-hidden border-y border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[2px] bg-[#F5A623]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-black text-[#999]">
            3D Interactive Observatory
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] uppercase leading-[0.9]">
            Pioneer
            <br />
            <span className="text-[#F5A623]">Metropolises</span>
          </h2>
          <p className="text-sm md:text-base text-[#666] max-w-sm leading-relaxed font-medium">
            Drag or scroll horizontally across the WebGL 3D cylinder to inspect global cities executing SDG 11 benchmarks.
          </p>
        </div>
      </div>

      {/* 3D WebGL Cylinder Gallery */}
      <div className="w-full h-[520px] md:h-[620px] relative bg-[#FAF9F6]">
        <CircularGallery
          items={SUSTAINABLE_CITIES}
          bend={2.5}
          textColor="#111111"
          borderRadius={0.06}
          scrollSpeed={2}
          scrollEase={0.05}
          font="bold 28px sans-serif"
        />

        {/* Drag Hint indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 border border-[#E5E5E5] shadow-sm">
          <span className="text-xs">⇄</span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-black text-[#444]">
            Drag or scroll to rotate
          </span>
        </div>
      </div>
    </section>
  );
}
