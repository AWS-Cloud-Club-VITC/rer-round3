"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin, Users, Home, Leaf } from "lucide-react";
import DriftWall from "./DriftWall";
import CardSwap, { Card } from "./CardSwap";

// SDG 11 themed city images for DriftWall/CardSwap
const CITY_ITEMS = [
  { image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop", title: "City Skyline" },
  { image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=400&fit=crop", title: "Urban Transit" },
  { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", title: "Green Spaces" },
  { image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop", title: "Architecture" },
  { image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&h=400&fit=crop", title: "Bridges" },
  { image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&h=400&fit=crop", title: "Waterfront" },
  { image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop", title: "Night City" },
  { image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop", title: "Community" },
  { image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop", title: "Streets" },
  { image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=400&fit=crop", title: "Parks" },
  { image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=600&h=400&fit=crop", title: "Housing" },
  { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop", title: "Mobility" },
];

// ── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function SlotCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const duration = 1800;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(target);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── Floating Badge ────────────────────────────────────────────────────────────
function FloatingBadge({
  icon,
  label,
  value,
  delay,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
  className: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute bg-white border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3 ${className}`}
    >
      <div className="w-8 h-8 bg-[#F5A623] flex items-center justify-center text-white shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xs text-[#666] uppercase tracking-widest font-semibold">{label}</div>
        <div className="text-sm font-black text-[#111]">{value}</div>
      </div>
    </motion.div>
  );
}

// ── City Silhouette SVG ───────────────────────────────────────────────────────
function CitySilhouette() {
  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Sky */}
      <div className="absolute inset-0 bg-[#F9F7F4]" />

      {/* Layer 3 — far buildings (lightest) */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 800 300" className="w-full" preserveAspectRatio="xMidYMax meet">
          {/* Far buildings — very light gray */}
          <rect x="0" y="180" width="60" height="120" fill="#E8E8E8" />
          <rect x="65" y="150" width="50" height="150" fill="#E8E8E8" />
          <rect x="120" y="170" width="70" height="130" fill="#E8E8E8" />
          <rect x="200" y="130" width="45" height="170" fill="#E8E8E8" />
          <rect x="250" y="160" width="60" height="140" fill="#E8E8E8" />
          <rect x="320" y="140" width="55" height="160" fill="#E8E8E8" />
          <rect x="380" y="110" width="80" height="190" fill="#E8E8E8" />
          <rect x="465" y="150" width="50" height="150" fill="#E8E8E8" />
          <rect x="520" y="130" width="70" height="170" fill="#E8E8E8" />
          <rect x="600" y="160" width="45" height="140" fill="#E8E8E8" />
          <rect x="650" y="120" width="80" height="180" fill="#E8E8E8" />
          <rect x="735" y="155" width="65" height="145" fill="#E8E8E8" />
        </svg>
      </motion.div>

      {/* Layer 2 — mid buildings */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <svg viewBox="0 0 800 300" className="w-full" preserveAspectRatio="xMidYMax meet">
          <rect x="10" y="160" width="55" height="140" fill="#CECECE" />
          <rect x="75" y="120" width="65" height="180" fill="#CECECE" />
          <rect x="150" y="140" width="80" height="160" fill="#CECECE" />
          {/* Tall building with antenna */}
          <rect x="240" y="80" width="60" height="220" fill="#CECECE" />
          <rect x="265" y="50" width="8" height="30" fill="#CECECE" />
          <rect x="310" y="130" width="55" height="170" fill="#CECECE" />
          <rect x="375" y="90" width="90" height="210" fill="#CECECE" />
          <rect x="475" y="120" width="55" height="180" fill="#CECECE" />
          <rect x="540" y="100" width="75" height="200" fill="#CECECE" />
          <rect x="625" y="135" width="60" height="165" fill="#CECECE" />
          <rect x="695" y="105" width="85" height="195" fill="#CECECE" />
        </svg>
      </motion.div>

      {/* Layer 1 — foreground buildings (darkest) */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <svg viewBox="0 0 800 300" className="w-full" preserveAspectRatio="xMidYMax meet">
          <rect x="0" y="140" width="70" height="160" fill="#B8B8B8" />
          <rect x="80" y="100" width="80" height="200" fill="#B8B8B8" />
          {/* SDG 11 Orange highlight building */}
          <rect x="170" y="60" width="70" height="240" fill="#F5A623" />
          <rect x="200" y="40" width="10" height="20" fill="#F5A623" />
          {/* windows on orange building */}
          <rect x="180" y="80" width="12" height="12" fill="white" opacity="0.4" />
          <rect x="200" y="80" width="12" height="12" fill="white" opacity="0.4" />
          <rect x="220" y="80" width="12" height="12" fill="white" opacity="0.4" />
          <rect x="180" y="105" width="12" height="12" fill="white" opacity="0.4" />
          <rect x="200" y="105" width="12" height="12" fill="white" opacity="0.4" />
          <rect x="220" y="105" width="12" height="12" fill="white" opacity="0.4" />

          <rect x="250" y="110" width="65" height="190" fill="#B8B8B8" />
          <rect x="325" y="75" width="100" height="225" fill="#B8B8B8" />
          {/* windows */}
          <rect x="335" y="90" width="15" height="15" fill="white" opacity="0.25" />
          <rect x="360" y="90" width="15" height="15" fill="white" opacity="0.25" />
          <rect x="395" y="90" width="15" height="15" fill="white" opacity="0.25" />

          <rect x="435" y="95" width="70" height="205" fill="#B8B8B8" />
          {/* Another accent building */}
          <rect x="515" y="50" width="80" height="250" fill="#111" />
          <rect x="525" y="65" width="12" height="12" fill="#F5A623" opacity="0.8" />
          <rect x="545" y="65" width="12" height="12" fill="#F5A623" opacity="0.8" />
          <rect x="565" y="65" width="12" height="12" fill="#F5A623" opacity="0.8" />
          <rect x="525" y="90" width="12" height="12" fill="#F5A623" opacity="0.4" />
          <rect x="545" y="90" width="12" height="12" fill="#F5A623" opacity="0.4" />

          <rect x="605" y="115" width="75" height="185" fill="#B8B8B8" />
          <rect x="690" y="80" width="110" height="220" fill="#B8B8B8" />

          {/* Ground */}
          <rect x="0" y="298" width="800" height="2" fill="#111" />
        </svg>
      </motion.div>

      {/* Pulsing rings on orange building */}
      <div className="absolute bottom-[calc(240px*0.4)] left-[calc(170px/800*100%+2%)]">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
          className="w-4 h-4 rounded-full border-2 border-[#F5A623]"
        />
      </div>

      {/* Floating badges */}
      <FloatingBadge
        icon={<Users size={14} />}
        label="Urban Population"
        value="4.4B"
        delay={1.0}
        className="top-8 right-6 rounded-none"
      />
      <FloatingBadge
        icon={<Home size={14} />}
        label="Affordable Homes"
        value="↑ 28%"
        delay={1.3}
        className="top-36 right-16 rounded-none"
      />
      <FloatingBadge
        icon={<Leaf size={14} />}
        label="Green Spaces"
        value="11,000+"
        delay={1.6}
        className="bottom-32 right-8 rounded-none"
      />
    </div>
  );
}

// ── Word-by-word Reveal ───────────────────────────────────────────────────────
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3 + i * 0.07,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-[#F9F7F4] flex flex-col md:flex-row overflow-hidden relative">
      {/* LEFT — scrolls */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 md:py-0 relative z-10">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-4 py-2 w-fit mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#666]">
            SDG Goal 11 · Sustainable Cities
          </span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-[clamp(2.8rem,6vw,6rem)] font-black leading-[0.88] tracking-tight text-[#111] mb-8 uppercase">
          <WordReveal text="Cities for" />
          <br />
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block text-[#F5A623]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Everyone.
            </motion.span>
          </span>
        </h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-[#555] max-w-md leading-relaxed mb-12 font-medium"
        >
          By 2030, SDG 11 aims to make cities inclusive, safe, resilient,
          and sustainable — ensuring no community is left behind.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-wrap gap-8 mb-14"
        >
          {[
            { value: 56, suffix: "%", label: "World lives in cities" },
            { value: 68, suffix: "%", label: "Projected by 2050" },
            { value: 1, suffix: "B+", label: "Slum dwellers globally" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-4xl md:text-5xl font-black text-[#111] leading-none tabular-nums">
                <SlotCounter target={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-[#999] mt-2">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton className="flex items-center gap-2 bg-[#111] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest group hover:bg-[#F5A623] transition-colors duration-300">
            <span>Explore Goals</span>
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </MagneticButton>
          <button className="flex items-center gap-2 border border-[#111] text-[#111] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors duration-300">
            <MapPin size={14} />
            <span>Find Initiatives</span>
          </button>
        </motion.div>

        {/* Scrolling ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#CCC]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-px h-8 bg-[#CCC] origin-top"
          />
        </motion.div>
      </div>

      {/* RIGHT — sticky CardSwap */}
      <div className="hidden md:flex w-[45%] lg:w-[48%] sticky top-0 h-screen shrink-0 bg-[#F9F7F4] items-center justify-center">
        <div className="-translate-x-8 lg:-translate-x-12" style={{ height: '380px', width: '560px', position: 'relative' }}>
          <CardSwap
            width={560}
            height={380}
            cardDistance={40}
            verticalDistance={20}
            delay={4000}
            pauseOnHover={true}
            skewAmount={5}
          >
            {CITY_ITEMS.slice(0, 3).map((item, i) => (
              <Card key={i} className="shadow-[0_24px_50px_rgb(0,0,0,0.2)] border border-[#E5E5E5] overflow-hidden rounded-[24px] relative bg-[#111]">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
                    <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-white/90 drop-shadow-sm">URBAN 11 Focus</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-xl">
                    {item.title}
                  </h3>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
