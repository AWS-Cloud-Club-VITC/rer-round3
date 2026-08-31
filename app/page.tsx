import type { Metadata } from "next";
import InteractionMemoryPage from "./interaction-memory/page";
import BottomBanner from "@/components/interaction-memory/BottomBanner";

export const metadata: Metadata = {
  title: "URBAN 11 — Sustainable Cities & Communities",
  description:
    "Building inclusive, safe, resilient, and sustainable cities. SDG Goal 11 — Interaction Memory Challenge.",
};

export default function Home() {
  return (
    <>
      <InteractionMemoryPage />
      <BottomBanner />
    </>
  );
}

