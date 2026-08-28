"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Assess the City",
    desc: "Map existing infrastructure, housing conditions, transport networks, and green spaces using participatory community surveys and satellite data.",
    icon: "🏙️",
  },
  {
    num: "02",
    title: "Engage Communities",
    desc: "Hold inclusive town halls and digital consultations. Every resident's voice — especially marginalised groups — shapes the development agenda.",
    icon: "🤝",
  },
  {
    num: "03",
    title: "Plan & Design",
    desc: "Co-create data-driven urban master plans that integrate affordable housing, green corridors, and climate-resilient infrastructure.",
    icon: "📐",
  },
  {
    num: "04",
    title: "Implement",
    desc: "Deploy phased interventions: upgrade slum settlements, expand public transit, install renewable energy systems and smart city sensors.",
    icon: "⚙️",
  },
  {
    num: "05",
    title: "Measure Impact",
    desc: "Track SDG 11 indicators in real-time — housing affordability index, air quality, commute times, and disaster resilience scores.",
    icon: "📊",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center center"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[2px] bg-[#F5A623]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-black text-[#999]">
            Our Process
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] uppercase leading-[0.9]">
            How It
            <br />
            <span className="text-[#F5A623]">Works</span>
          </h2>
          <p className="text-base text-[#666] max-w-xs leading-relaxed font-medium">
            A five-stage methodology for building cities that work for everyone,
            not just the privileged few.
          </p>
        </div>

        {/* Steps Rail */}
        <div className="relative w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="min-w-[800px] flex items-start justify-between relative px-2">
            
            {/* Background line */}
            <div
              ref={lineRef}
              className="absolute top-[32px] md:top-[40px] left-0 right-0 h-[2px] bg-[#E5E5E5] z-0"
            />
            {/* Animated fill line */}
            <motion.div
              style={{ width: lineWidth }}
              className="absolute top-[32px] md:top-[40px] left-0 h-[2px] bg-[#F5A623] z-10 origin-left"
            />

            {/* Steps */}
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="relative z-10 flex flex-col items-center sm:items-start gap-6 group cursor-pointer"
                onClick={() => setActiveStep(activeStep === i ? null : i)}
              >
                {/* Node with Big Number cutout */}
                <div
                  className={`text-6xl sm:text-7xl font-black tracking-tighter bg-white px-4 -ml-4 transition-colors duration-300 select-none
                    ${
                      activeStep === i
                        ? "text-[#F5A623] scale-105"
                        : "text-[#E5E5E5] group-hover:text-[#F5A623]"
                    }`}
                >
                  {step.num}
                </div>

                {/* Title */}
                <div
                  className={`text-sm md:text-base font-black tracking-tight text-center sm:text-left transition-colors duration-200 uppercase max-w-[150px] sm:ml-2
                    ${activeStep === i ? "text-[#F5A623]" : "text-[#555] group-hover:text-[#111]"}`}
                >
                  {step.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expanded detail panel */}
        <motion.div
          initial={false}
          animate={{
            height: activeStep !== null ? "auto" : 0,
            opacity: activeStep !== null ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          {activeStep !== null && (
            <motion.div
              key={activeStep}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 border border-[#E5E5E5] bg-[#F9F7F4] p-8 md:p-12 flex flex-col md:flex-row items-start gap-10"
            >
              <div className="text-5xl md:text-6xl font-black text-[#F5A623] opacity-20 shrink-0 leading-none">
                {STEPS[activeStep].num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{STEPS[activeStep].icon}</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#111] uppercase">
                    {STEPS[activeStep].title}
                  </h3>
                </div>
                <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-2xl font-medium">
                  {STEPS[activeStep].desc}
                </p>
                <button
                  onClick={() => setActiveStep(null)}
                  className="mt-8 text-[10px] tracking-[0.2em] uppercase font-black text-[#AAA] hover:text-[#111] transition-colors flex items-center gap-2"
                >
                  <span>↑</span> Collapse
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
