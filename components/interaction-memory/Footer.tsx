"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-[#F9F7F4] text-[#111] px-5 sm:px-8 md:px-12 pt-16 pb-40 md:pt-24 md:pb-56 lg:pb-64 font-semibold uppercase tracking-widest text-xs sm:text-sm border-t border-[#E5E5E5] overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F5A623]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

        {/* Brand Column */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F5A623] flex items-center justify-center shrink-0">
              <span className="text-[#111] font-black text-sm">11</span>
            </div>
            <span className="text-lg text-slate-900 tracking-tight font-extrabold">URBAN 11</span>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-[#F5A623] hover:text-[#111] transition-all">
                <LinkedinIcon />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-[#F5A623] hover:text-[#111] transition-all">
                <YoutubeIcon />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-[#F5A623] hover:text-[#111] transition-all">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <span className="opacity-50 text-[10px] font-bold tracking-widest">
              &copy; {new Date().getFullYear()} URBAN 11
            </span>
            <span className="opacity-40 normal-case font-medium text-[10px] max-w-[250px] leading-relaxed text-black">
              Disclaimer: Urban 11 is an independent global initiative for sustainable cities and communities.
            </span>
          </div>
        </div>

        {/* Initiatives Column */}
        <div className="flex flex-col gap-4 text-[#111]/70">
          <span className="text-[#F5A623] mb-2 text-[10px] font-black">INITIATIVES</span>
          <a href="#" className="hover:text-[#F5A623] transition-colors">BRT Corridors</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">Green Rooftops</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">Micro-Housing</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">Flood Sensors</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">Cycle Highways</a>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-4 text-[#111]/70">
          <span className="text-[#F5A623] mb-2 text-[10px] font-black">RESOURCES</span>
          <a href="#" className="hover:text-[#F5A623] transition-colors">UN Habitat</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">World Urban Forum</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">New Urban Agenda</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">SDG Progress Report</a>
        </div>

        {/* Legal & Contact Column */}
        <div className="flex flex-col gap-4 text-[#111]/70">
          <span className="text-[#F5A623] mb-2 text-[10px] font-black">LEGAL & CONTACT</span>
          <a href="mailto:hello@urban11.org" className="hover:text-[#F5A623] transition-colors lowercase font-medium">hello@urban11.org</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors mt-2">Privacy Policy</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">Cookie Policy</a>
          <a href="#" className="hover:text-[#F5A623] transition-colors">Join Community</a>
        </div>

        {/* QR Codes Column */}
        <div className="flex flex-col gap-6 items-start lg:items-end">
          <div className="flex flex-col gap-3">
            <span className="text-[#F5A623] text-[10px] font-black text-center lg:text-right w-full">DONATE NOW</span>
            <div className="bg-white p-3 rounded-xl border border-[#E5E5E5] w-[140px] h-[140px] flex items-center justify-center relative shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              {/* Pseudo QR code layout */}
              <div className="w-full h-full border-2 border-dashed border-[#E5E5E5] rounded-sm flex items-center justify-center relative bg-[#F9F7F4] overflow-hidden">
                <div className="w-8 h-8 bg-[#F5A623] flex items-center justify-center group-hover:scale-110 transition-transform">
                   <span className="text-[#111] font-black text-xs">11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Watermark Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] text-[20vw] font-black text-[#111]/[0.03] leading-none pointer-events-none select-none w-full text-center whitespace-nowrap z-0">
        URBAN 11
      </div>
    </footer>
  );
}
