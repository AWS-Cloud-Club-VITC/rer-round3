import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reverse Engineering Roulette",
  description: "Round 3 - CodeCrafters IITM BS Degree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrainsMono.variable} h-[100dvh] antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-[#070b14] text-white font-sans selection:bg-[#ff5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}
