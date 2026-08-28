"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    num: "01",
    tag: "Housing",
    title: "Safe & Affordable Shelter",
    body: "By 2030, ensure access for all to adequate, safe and affordable housing and basic services, and upgrade slums. Over 1 billion people currently live in informal settlements worldwide.",
    accent: "#F5A623",
    bg: "#FFFFFF",
  },
  {
    num: "02",
    tag: "Transport",
    title: "Sustainable Mobility",
    body: "Provide access to safe, affordable, accessible and sustainable transport systems. Improve road safety by expanding public transport — prioritising the needs of those in vulnerable situations.",
    accent: "#111111",
    bg: "#F9F7F4",
  },
  {
    num: "03",
    tag: "Planning",
    title: "Inclusive Urbanisation",
    body: "Enhance inclusive and sustainable urbanisation and capacity for participatory, integrated and sustainable human settlement planning in all countries.",
    accent: "#F5A623",
    bg: "#FFFFFF",
  },
  {
    num: "04",
    tag: "Heritage",
    title: "Cultural & Natural Heritage",
    body: "Strengthen efforts to protect and safeguard the world's cultural and natural heritage. Preserve identity, history, and natural ecosystems woven into the fabric of our cities.",
    accent: "#111111",
    bg: "#F9F7F4",
  },
  {
    num: "05",
    tag: "Resilience",
    title: "Disaster Risk Reduction",
    body: "Significantly reduce the number of deaths and people affected by disasters, including water-related disasters. Build cities that withstand climate shocks and recover faster.",
    accent: "#F5A623",
    bg: "#FFFFFF",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────
export default function StickyScrollCards() {
  return (
    <section className="bg-[#F9F7F4] relative">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[2px] bg-[#F5A623]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-black text-[#999]">
            SDG 11 Sub-Targets
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] uppercase leading-[0.9]">
          The Five
          <br />
          <span className="text-[#F5A623]">Pillars</span>
        </h2>
      </div>

      {/* Stack */}
      <div className="relative pb-32">
        {CARDS.map((card, index) => {
          // Adjust top value so cards stack with a slight offset
          // so you can see the top edge of previous cards
          const topOffset = 80 + index * 40;

          return (
            <div
              key={card.num}
              className="sticky w-full flex items-center justify-center overflow-hidden"
              style={{
                top: `${topOffset}px`,
                // Make sure earlier cards have lower z-index than later ones
                zIndex: 10 + index,
                paddingBottom: "10vh",
              }}
            >
              <div
                style={{ backgroundColor: card.bg }}
                className="w-full max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-20 lg:py-24 shadow-[0_-10px_40px_rgb(0,0,0,0.08)] border border-[#E5E5E5] rounded-t-[2.5rem] overflow-hidden flex flex-col md:flex-row gap-12 relative"
              >
                {/* Content Side */}
                <div className="flex-1 relative z-10 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="text-[10px] tracking-[0.25em] uppercase font-black border px-3 py-1.5"
                      style={{ borderColor: card.accent, color: card.accent }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black tracking-tight text-[#111] mb-6 uppercase leading-[1.05]">
                    {card.title}
                  </h3>

                  <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-xl font-medium">
                    {card.body}
                  </p>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#AAA]">
                      Sub-target {card.num} of {String(CARDS.length).padStart(2, "0")}
                    </div>
                    <div className="w-16 h-px bg-[#E5E5E5]" />
                  </div>
                </div>

                {/* Big Number Side */}
                <div className="hidden md:flex flex-1 items-center justify-end relative select-none pointer-events-none">
                  <div
                    className="text-[12rem] lg:text-[18rem] font-black leading-none tracking-tighter"
                    style={{ color: card.accent, opacity: 0.08 }}
                  >
                    {card.num}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
