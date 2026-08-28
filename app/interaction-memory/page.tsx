"use client";

import Hero from "@/components/interaction-memory/Hero";
import StickyScrollCards from "@/components/interaction-memory/StickyScrollCards";
import HowItWorks from "@/components/interaction-memory/HowItWorks";
import CityShowcaseGallery from "@/components/interaction-memory/CityShowcaseGallery";
import UrbanGrid from "@/components/interaction-memory/UrbanGrid";
import Testimonials from "@/components/interaction-memory/Testimonials";
import ImpactCounters from "@/components/interaction-memory/ImpactCounters";
import Footer from "@/components/interaction-memory/Footer";
import BubbleMenu from "@/components/interaction-memory/BubbleMenu";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "#hero",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#F5A623", textColor: "#111111" },
  },
  {
    label: "Pillars",
    href: "#pillars",
    ariaLabel: "SDG Pillars",
    rotation: 8,
    hoverStyles: { bgColor: "#111111", textColor: "#ffffff" },
  },
  {
    label: "How It Works",
    href: "#how",
    ariaLabel: "How it works",
    rotation: 8,
    hoverStyles: { bgColor: "#F5A623", textColor: "#111111" },
  },
  {
    label: "Observatory",
    href: "#gallery",
    ariaLabel: "3D Cities Observatory",
    rotation: -8,
    hoverStyles: { bgColor: "#111111", textColor: "#ffffff" },
  },
  {
    label: "Initiatives",
    href: "#initiatives",
    ariaLabel: "Urban Initiatives",
    rotation: 8,
    hoverStyles: { bgColor: "#F5A623", textColor: "#111111" },
  },
  {
    label: "Impact",
    href: "#impact",
    ariaLabel: "Impact numbers",
    rotation: -8,
    hoverStyles: { bgColor: "#111111", textColor: "#ffffff" },
  },
  {
    label: "Connect",
    href: "#connect",
    ariaLabel: "Connect with us",
    rotation: 8,
    hoverStyles: { bgColor: "#F5A623", textColor: "#111111" },
  },
];

// Logo JSX — SDG 11 orange square with number
function SDGLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          background: "#F5A623",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "#111",
            fontWeight: 900,
            fontSize: 11,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          11
        </span>
      </div>
      <span
        style={{
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#111",
          lineHeight: 1,
        }}
      >
        URBAN&nbsp;11
      </span>
    </div>
  );
}

export default function InteractionMemoryPage() {
  return (
    <main id="hero" className="w-full bg-[#F9F7F4] text-[#111] relative">
      {/* Navbar — BubbleMenu floats fixed over all content */}
      <BubbleMenu
        logo={<SDGLogo />}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        items={NAV_ITEMS}
        animationEase="back.out(1.7)"
        animationDuration={0.45}
        staggerDelay={0.08}
      />

      {/* 1. Hero — split panel: left scrolls, right sticky DriftWall */}
      <Hero />

      {/* 2. Sticky Scroll Cards — 5 SDG 11 sub-targets */}
      <div id="pillars">
        <StickyScrollCards />
      </div>

      {/* 3. How It Works — horizontal step rail */}
      <div id="how">
        <HowItWorks />
      </div>

      {/* 4. 3D WebGL Circular Gallery — Pioneer Metropolises */}
      <div id="gallery">
        <CityShowcaseGallery />
      </div>

      {/* 5. Urban Grid — 3D flip cards */}
      <div id="initiatives">
        <UrbanGrid />
      </div>

      {/* 6. Testimonials — dual-row infinite marquee */}
      <Testimonials />

      {/* 7. Impact Counters — slot-machine numbers */}
      <div id="impact">
        <ImpactCounters />
      </div>

      {/* 8. Footer — newsletter + links */}
      <div id="connect">
        <Footer />
      </div>
    </main>
  );
}
