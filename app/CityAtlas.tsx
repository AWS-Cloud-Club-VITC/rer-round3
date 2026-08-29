"use client";

import { useEffect, useRef, useState } from "react";

type City = { name: string; country: string; code: string; color: string; stat: string; story: string };
const CITIES: City[] = [
  { name: "Curitiba", country: "Brazil", code: "BR", color: "#ef7658", stat: "75% transit share", story: "A bus corridor became the spine of a greener, more equitable city." },
  { name: "Copenhagen", country: "Denmark", code: "DK", color: "#81d5ad", stat: "62% cycle commute", story: "When the easiest trip is the cleanest one, streets become public life." },
  { name: "Singapore", country: "Singapore", code: "SG", color: "#79cce0", stat: "47% canopy cover", story: "A dense metropolis makes room for nature at every vertical level." },
  { name: "Medellin", country: "Colombia", code: "CO", color: "#f0c56c", stat: "30 green corridors", story: "Civic infrastructure can turn a hillside into a bridge to opportunity." },
];

function CityModel({ density, green }: { density: number; green: number }) {
  const towers = Array.from({ length: 13 }, (_, index) => ({ left: `${6 + ((index * 17) % 88)}%`, height: `${48 + ((index * 29) % 100) * (0.65 + density / 260)}px`, delay: `${index * -0.18}s` }));
  return <div className="city-model" style={{ "--green-level": `${green}%` } as React.CSSProperties} aria-label="Isometric sustainable city model"><div className="city-sun" /><div className="city-orbit orbit-one" /><div className="city-orbit orbit-two" /><div className="city-ground ground-back" /><div className="city-ground ground-front" /><div className="city-park park-one"><span /><span /><span /></div><div className="city-park park-two"><span /><span /><span /></div>{towers.map((tower, index) => <div key={index} className={`city-tower tower-${index % 4}`} style={{ left: tower.left, height: tower.height, animationDelay: tower.delay }}><i /><i /><i /><i /><i /><i /></div>)}<div className="city-transit transit-one" /><div className="city-transit transit-two" /><div className="city-label label-air"><span className="signal-dot" /> AIR / 28 AQI</div><div className="city-label label-energy"><span className="signal-dot signal-warm" /> SOLAR GRID / 82%</div></div>;
}

function FlowCanvas({ intensity }: { intensity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const parent = canvas.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = Array.from({ length: 46 }, (_, index) => ({ x: (index * 53) % 520, y: 30 + ((index * 71) % 230), speed: 0.35 + (index % 5) * 0.09, radius: 1 + (index % 3) * 0.5 }));
    let frame = 0;
    const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = parent.clientWidth * ratio; canvas.height = parent.clientHeight * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const draw = () => { const width = parent.clientWidth; const height = parent.clientHeight; context.clearRect(0, 0, width, height); context.strokeStyle = "rgba(129,213,173,.14)"; context.lineWidth = 1; for (let line = 0; line < 6; line += 1) { context.beginPath(); context.moveTo(-20, 40 + line * 46); context.bezierCurveTo(width * .3, 10 + line * 58, width * .65, 90 + line * 12, width + 20, 42 + line * 46); context.stroke(); } particles.forEach((particle, index) => { particle.x += reducedMotion ? 0 : particle.speed * (.45 + intensity / 120); if (particle.x > width + 20) particle.x = -20; const y = particle.y + Math.sin(particle.x * .018 + index) * 8; context.fillStyle = index % 4 === 0 ? "rgba(239,118,88,.8)" : "rgba(129,213,173,.7)"; context.beginPath(); context.arc(particle.x, y, particle.radius, 0, Math.PI * 2); context.fill(); }); frame = requestAnimationFrame(draw); };
    resize(); draw(); window.addEventListener("resize", resize); return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [intensity]);
  return <canvas ref={canvasRef} className="flow-canvas" aria-label="Animated clean air and transit flow visualization" />;
}

export default function CityAtlas() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [green, setGreen] = useState(72);
  const [density, setDensity] = useState(58);
  const [mode, setMode] = useState<"air" | "mobility" | "nature">("air");
  const metric = { air: { value: Math.round(18 + (100 - green) * .35), label: "Clean air index", unit: "AQI", note: "below WHO interim target" }, mobility: { value: Math.round(32 + density * .45), label: "Low-carbon trips", unit: "%", note: "of daily journeys" }, nature: { value: Math.round(green * .76), label: "Canopy + parks", unit: "%", note: "of urban footprint" } }[mode];
  useEffect(() => {
    const shareButton = document.querySelector<HTMLButtonElement>(".note-dark button");
    if (!shareButton) return;
    const share = async () => {
      const shareData = { title: "Urban Signal", text: "Explore a more sustainable city with Urban Signal.", url: `${window.location.href}#builder` };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          shareButton.textContent = "SIGNAL SHARED ↗";
        } else {
          await navigator.clipboard.writeText(shareData.url);
          shareButton.textContent = "SIGNAL LINK COPIED ↗";
        }
      } catch {
        shareButton.textContent = "TRY AGAIN ↗";
      }
    };
    shareButton.addEventListener("click", share);
    return () => shareButton.removeEventListener("click", share);
  }, []);
  return <><header className="site-nav"><a href="#top" className="brand-mark"><span>11</span> URBAN SIGNAL</a><nav><a href="#atlas">Atlas</a><a href="#builder">City builder</a><a href="#field-notes">Field notes</a></nav><a href="#builder" className="nav-action">Design a city <b>↗</b></a></header><main id="top"><section className="hero-shell"><div className="hero-grid" /><div className="hero-copy reveal-up"><p className="eyebrow"><span className="eyebrow-line" /> UN SUSTAINABLE DEVELOPMENT GOAL 11</p><h1>The city is a living <em>system.</em></h1><p className="hero-deck">Explore the choices that make urban life more inclusive, safe, resilient and sustainable. Move through the atlas, then leave your mark on the city of 2030.</p><div className="hero-actions"><a href="#atlas" className="button button-primary">Enter the living atlas <b>↗</b></a><a href="#field-notes" className="text-link">Why cities matter <span>↓</span></a></div><div className="hero-proof"><div><strong>68%</strong><span>of people projected to live in cities by 2050</span></div><div><strong>10</strong><span>targets make SDG 11 actionable</span></div></div></div><div className="hero-scene reveal-scene"><div className="scene-meta meta-top"><span>LIVE TERRAIN / 01</span><span>+04° 35' 22" N</span></div><CityModel density={density} green={green} /><div className="scene-meta meta-bottom"><span>DESIGNED WITH NATURE</span><span>DRAG TO EXPLORE <b>↗</b></span></div></div><div className="scroll-cue"><span>SCROLL TO REVEAL</span><i /></div></section><section id="atlas" className="atlas-section section-pad"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> THE LIVING ATLAS</p><h2>Every city is a<br /><em>prototype.</em></h2><p>Select a city to trace one decision through its streets, systems and people.</p></div><div className="atlas-layout"><div className="city-list" role="listbox" aria-label="City profiles">{CITIES.map((city) => <button key={city.name} className={`city-choice ${selectedCity.name === city.name ? "is-active" : ""}`} onClick={() => setSelectedCity(city)} aria-selected={selectedCity.name === city.name}><span className="city-code" style={{ color: city.color }}>{city.code}</span><span><strong>{city.name}</strong><small>{city.country}</small></span><b>↗</b></button>)}</div><article className="atlas-story" style={{ "--city-tint": selectedCity.color } as React.CSSProperties}><div className="story-map"><div className="map-ring ring-a" /><div className="map-ring ring-b" /><div className="map-pin" /><div className="map-road road-a" /><div className="map-road road-b" /><span>{selectedCity.code} / 2030 FIELD VIEW</span></div><div className="story-content"><p className="eyebrow">{selectedCity.country} / FIELD NOTE</p><h3>{selectedCity.name}</h3><p>{selectedCity.story}</p><div className="story-stat"><strong>{selectedCity.stat}</strong><span>One city, many connected systems.</span></div><div className="tag-row"><span>SDG 11</span><span>FIELD STUDY</span></div></div></article></div></section><section id="builder" className="builder-section section-pad"><div className="section-heading builder-heading"><p className="eyebrow"><span className="eyebrow-line" /> CITY BUILDER / OPEN LAB</p><h2>Make room for<br /><em>what matters.</em></h2><p>Adjust the balance. Watch the city answer back.</p></div><div className="builder-layout"><div className="builder-canvas"><CityModel density={density} green={green} /><div className="builder-canvas-label">YOUR DISTRICT / UNSAVED <span className="signal-dot" /></div><FlowCanvas intensity={green} /></div><div className="builder-panel"><div className="panel-head"><span>01 / 03</span><span>LIVE MODEL</span></div><h3>Balance the brief</h3><p className="panel-intro">A sustainable city is not a single metric. It is a set of choices that reinforce one another.</p><label className="range-label"><span>+ Green infrastructure</span><output>{green}%</output><input type="range" min="10" max="100" value={green} onChange={(event) => setGreen(Number(event.target.value))} /></label><label className="range-label"><span>+ Mixed-use density</span><output>{density}%</output><input type="range" min="20" max="100" value={density} onChange={(event) => setDensity(Number(event.target.value))} /></label><div className="metric-switch" role="tablist" aria-label="City metrics">{(["air", "mobility", "nature"] as const).map((item) => <button key={item} className={mode === item ? "is-active" : ""} onClick={() => setMode(item)} role="tab" aria-selected={mode === item}>{item}</button>)}</div><div className="live-metric"><span>{metric.label}</span><strong>{metric.value}<small>{metric.unit}</small></strong><p>{metric.note}</p><div className="metric-bars"><i style={{ width: `${Math.min(100, metric.value)}%` }} /><i style={{ width: `${Math.min(100, green + 12)}%` }} /><i style={{ width: `${Math.min(100, density + 6)}%` }} /></div></div><button className="button button-dark">Save this district <b>↗</b></button></div></div></section><section id="field-notes" className="notes-section section-pad"><div className="notes-top"><div><p className="eyebrow"><span className="eyebrow-line" /> FIELD NOTES / SDG 11</p><h2>Small signals.<br /><em>Big shifts.</em></h2></div><p>Urban change is a collective practice. Start with the street outside your door, then look at the systems that shape it.</p></div><div className="notes-grid"><article className="note-card note-wide"><span className="note-index">01 / RESOURCE</span><span className="note-icon">◎</span><h3>Read the 10 targets</h3><p>From housing and transport to disaster resilience, the SDG 11 framework is a map for a more liveable future.</p><a href="https://sdgs.un.org/goals/goal11" target="_blank" rel="noreferrer" className="text-link">Open UN framework ↗</a></article><article className="note-card note-accent"><span className="note-index">02 / TAKE ACTION</span><span className="note-icon">↗</span><h3>Find your first move</h3><p>Choose one daily journey, shared space or local decision to make more sustainable this week.</p><a href="#builder" className="text-link">Start with the builder ↗</a></article><article className="note-card note-dark"><span className="note-index">03 / JOIN THE SIGNAL</span><span className="note-icon">✳</span><h3>Pass it on</h3><p>Share your district blueprint and make urban futures easier to imagine together.</p><button className="text-link text-link-light">Create a signal ↗</button></article></div></section></main><footer className="site-footer"><div className="brand-mark"><span>11</span> URBAN SIGNAL</div><p>Built for the people who make cities feel like home.</p><div><span>UN SDG 11 / 2030</span><a href="#top">Back to top ↑</a></div></footer></>;
}
