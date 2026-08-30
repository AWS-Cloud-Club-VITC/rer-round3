import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Urban Signal | SDG 11 Living Atlas",
  description:
    "A living atlas for imagining inclusive, safe, resilient and sustainable cities through SDG 11.",
  keywords: [
    "SDG 11",
    "Sustainable Cities",
    "Urban Resilience",
    "Responsive Design Challenge",
    "UN Goals",
    "Smart Cities",
    "Biophilic Urbanism",
    "Green Mobility",
  ],
  authors: [{ name: "SDG 11 Urban Innovation Studio" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-[#0f172a] text-[#ffffff] selection:bg-[#f97316] selection:text-[#ffffff]">
        {children}
      </body>
    </html>
  );
}
