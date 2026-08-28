"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const COUNTERS = [
  { value: 4400000000, display: "4.4B", label: "People living in cities", suffix: "" },
  { value: 1000000000, display: "1B+", label: "Slum dwellers worldwide", suffix: "" },
  { value: 68, display: "68%", label: "World urban by 2050", suffix: "%" },
  { value: 11, display: "SDG 11", label: "Goals for sustainable cities", suffix: "" },
];

// Slot machine ticker for a number
function SlotTicker({ finalValue, label }: { finalValue: string; label: string }) {
  const [display, setDisplay] = useState("---");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || ran.current) return;
        ran.current = true;
        observer.disconnect();

        const CHARS = "0123456789ABCDEF".split("");
        const duration = 1400;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          if (progress < 1) {
            // Scramble
            const scrambled = finalValue
              .split("")
              .map((ch) =>
                /[0-9]/.test(ch)
                  ? CHARS[Math.floor(Math.random() * 10)]
                  : ch
              )
              .join("");
            setDisplay(scrambled);
            requestAnimationFrame(tick);
          } else {
            setDisplay(finalValue);
            setDone(true);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [finalValue]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start">
      <motion.div
        className={`text-5xl md:text-7xl font-black tracking-tight leading-none tabular-nums transition-colors duration-500 ${
          done ? "text-[#F5A623]" : "text-[#666]"
        }`}
      >
        {display}
      </motion.div>
      <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#999] mt-3">
        {label}
      </div>
    </div>
  );
}

export default function ImpactCounters() {
  return (
    <section className="bg-[#111] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-6 h-[2px] bg-[#F5A623]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-black text-[#555]">
            The Numbers
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.9] mb-20">
          Global
          <br />
          <span className="text-[#F5A623]">Scale</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 border-t border-[#222] pt-16">
          {COUNTERS.map((counter, i) => (
            <motion.div
              key={counter.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-0"
            >
              <SlotTicker finalValue={counter.display} label={counter.label} />
            </motion.div>
          ))}
        </div>

        {/* Divider row */}
        <div className="mt-20 pt-12 border-t border-[#222] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-sm text-[#555] max-w-lg leading-relaxed font-medium">
            The scale of urbanisation demands urgent, coordinated action. SDG 11
            provides the framework — but cities, governments, and citizens must
            act together to make it real.
          </p>
          <div className="text-[10px] tracking-[0.2em] uppercase font-black text-[#333]">
            Source: UN Habitat · 2024
          </div>
        </div>
      </div>
    </section>
  );
}
