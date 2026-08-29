"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const INITIATIVES = [
  {
    title: "BRT Corridors",
    tag: "Transport",
    front: "Rapid bus transit networks connecting periphery to city centres, reducing private vehicle dependency by 34%.",
    back: "Mumbai, Lagos, and Bogotá have pioneered BRT systems serving over 2 million daily commuters each. Zero-emission electric fleets are now standard.",
    stat: "2M+ daily riders",
    icon: "🚌",
  },
  {
    title: "Green Rooftops",
    tag: "Environment",
    front: "Urban farming and insulation via rooftop gardens, cutting building energy costs and improving urban heat island effects.",
    back: "Singapore's mandatory green roof policy covers 650+ buildings. Temperature reduction of 3°C recorded in dense urban areas.",
    stat: "−3°C urban heat",
    icon: "🌿",
  },
  {
    title: "Micro-Housing",
    tag: "Housing",
    front: "Compact, modular housing units under 30m² that are fully functional and affordable for single-person households.",
    back: "Tokyo leads with 120,000+ micro-units. Smart storage and fold-out furniture make compact living comfortable and dignified.",
    stat: "30m² · full function",
    icon: "🏠",
  },
  {
    title: "Flood Sensors",
    tag: "Resilience",
    front: "IoT sensor networks in drainage systems that provide 72-hour advance flood warnings to at-risk neighbourhoods.",
    back: "Bangkok's smart drainage grid covers 6,000 sensors, protecting 1.2 million residents from monsoon flooding annually.",
    stat: "72hr advance warning",
    icon: "🌊",
  },
  {
    title: "Heritage Trails",
    tag: "Culture",
    front: "Digital heritage walking trails that use AR overlays to reveal historical layers of a city's streets and buildings.",
    back: "Florence's AR heritage app has been downloaded 4 million times, generating $200M in tourism revenue while preserving local culture.",
    stat: "4M downloads",
    icon: "🏛️",
  },
  {
    title: "Cycle Superhighways",
    tag: "Mobility",
    front: "Protected elevated cycling infrastructure separating cyclists from traffic, enabling 30km/h average speeds.",
    back: "Copenhagen's 390km cycle superhighway network sees 26% of all commutes by bicycle — the highest ratio of any major city.",
    stat: "26% bike commute rate",
    icon: "🚴",
  },
];

function FlipCard({ item, index }: { item: (typeof INITIATIVES)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const isSecondRow = index >= 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: isSecondRow ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer"
      style={{ perspective: 1200 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-[280px] md:h-[300px]"
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white border border-[#E5E5E5] p-7 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl">{item.icon}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-black border border-[#E5E5E5] px-2 py-1 text-[#999]">
              {item.tag}
            </span>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#111] uppercase mb-3">
              {item.title}
            </h3>
            <p className="text-sm text-[#666] leading-relaxed font-medium">
              {item.front}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-6 h-[2px] bg-[#F5A623]" />
            <span className="text-[9px] tracking-[0.15em] text-[#CCC] uppercase font-bold">
              Tap to flip →
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-[#111] border border-[#111] p-7 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-start justify-between">
            <span className="text-[10px] tracking-[0.2em] uppercase font-black text-[#F5A623]">
              {item.tag} · Case Study
            </span>
          </div>
          <div>
            <p className="text-sm text-[#CCC] leading-relaxed font-medium mb-4">
              {item.back}
            </p>
            <div className="inline-block border border-[#F5A623] px-3 py-1">
              <span className="text-[10px] tracking-[0.15em] uppercase font-black text-[#F5A623]">
                {item.stat}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-6 h-[2px] bg-[#F5A623]" />
            <span className="text-[9px] tracking-[0.15em] text-[#555] uppercase font-bold">
              Tap to flip back ←
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function UrbanGrid() {
  return (
    <section className="bg-[#F9F7F4] py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[2px] bg-[#F5A623]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-black text-[#999]">
            Urban Initiatives
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] uppercase leading-[0.9]">
            Ideas
            <br />
            <span className="text-[#F5A623]">In Action</span>
          </h2>
          <p className="text-sm text-[#666] max-w-xs font-medium leading-relaxed">
            Tap any card to flip it and read the real-world case study behind each initiative.
          </p>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {INITIATIVES.map((item, i) => (
            <FlipCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
