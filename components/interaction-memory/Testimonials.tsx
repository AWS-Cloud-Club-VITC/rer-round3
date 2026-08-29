"use client";

import { motion } from "framer-motion";

const ROW_ONE = [
  {
    quote:
      "The new BRT line cut my daily commute from 90 minutes to 35. I finally have time to spend with my kids.",
    name: "Priya Nair",
    role: "Daily Commuter, Chennai",
    initials: "PN",
  },
  {
    quote:
      "Our neighbourhood used to flood every monsoon. After the sensor network was installed, we had 3 days of warning. We saved everything.",
    name: "Emmanuel Owusu",
    role: "Community Leader, Accra",
    initials: "EO",
  },
  {
    quote:
      "The city's rooftop farming programme gave us fresh vegetables and reduced our building's cooling bill by 22%.",
    name: "Liu Wei",
    role: "Building Manager, Chengdu",
    initials: "LW",
  },
  {
    quote:
      "Heritage AR trails brought my students to life. History is no longer a textbook — it's walking beside them.",
    name: "Sofia Martins",
    role: "History Teacher, Lisbon",
    initials: "SM",
  },
  {
    quote:
      "Micro-housing gave me affordable independence in the city centre without an 80-minute commute.",
    name: "Kaito Yamamoto",
    role: "Graduate Student, Tokyo",
    initials: "KY",
  },
];

const ROW_TWO = [
  {
    quote:
      "I cycle to work on the protected superhighway every day. It's faster than the subway and I arrive energised.",
    name: "Astrid Larsen",
    role: "Software Engineer, Copenhagen",
    initials: "AL",
  },
  {
    quote:
      "The participatory planning app let me submit feedback that actually ended up in the master plan. Citizens matter here.",
    name: "Fatima Al-Hassan",
    role: "Urban Resident, Amman",
    initials: "FA",
  },
  {
    quote:
      "After the slum upgrade programme, we have running water, sealed roads, and street lighting. It's transformed our lives.",
    name: "Carlos Mendoza",
    role: "Community Member, Medellín",
    initials: "CM",
  },
  {
    quote:
      "Real-time air quality sensors in our district finally gave us data to hold the factories accountable.",
    name: "Ananya Sharma",
    role: "Environmental Activist, Delhi",
    initials: "AS",
  },
  {
    quote:
      "The SDG 11 dashboard helps me see our city's progress in real time. Data-driven policy is the only way forward.",
    name: "Ngozi Adeyemi",
    role: "City Planner, Lagos",
    initials: "NA",
  },
];

function TestimonialCard({ item }: { item: (typeof ROW_ONE)[0] }) {
  return (
    <div className="w-[320px] md:w-[400px] shrink-0 whitespace-normal bg-white border border-[#E5E5E5] p-6 md:p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-default relative">
      {/* Quote text */}
      <div className="mb-6">
        <svg
          className="w-7 h-7 text-[#F5A623] opacity-40 mb-4 group-hover:opacity-80 transition-opacity shrink-0"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="text-sm md:text-base text-[#333] leading-relaxed font-medium">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#F0F0F0]">
        <div className="w-10 h-10 bg-[#111] flex items-center justify-center text-white text-xs font-black shrink-0">
          {item.initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-black text-[#111] truncate">{item.name}</span>
          <span className="text-xs text-[#888] font-medium truncate">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: typeof ROW_ONE;
  direction?: "left" | "right";
  speed?: number;
}) {
  const duplicated = [...items, ...items, ...items];
  const animX = direction === "left" ? ["0%", "-33.333333%"] : ["-33.333333%", "0%"];

  return (
    <div className="relative w-full overflow-hidden flex whitespace-nowrap py-2">
      {/* Fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#F9F7F4] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#F9F7F4] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: animX }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        className="flex items-stretch gap-6 px-4 hover:[animation-play-state:paused]"
      >
        {duplicated.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#F9F7F4] py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[2px] bg-[#F5A623]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-black text-[#999]">
            Voices from the Ground
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] uppercase leading-[0.9]">
          Real
          <br />
          <span className="text-[#F5A623]">Impact</span>
        </h2>
      </div>

      {/* Row 1 — left */}
      <MarqueeRow items={ROW_ONE} direction="left" speed={45} />

      <div className="h-6" />

      {/* Row 2 — right */}
      <MarqueeRow items={ROW_TWO} direction="right" speed={40} />
    </section>
  );
}
