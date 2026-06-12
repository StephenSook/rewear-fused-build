import type { Metadata } from "next";
import { Fraunces, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/shell";

// Interim Google stand-ins for Editorial New (display) and General Sans (body)
// until those are self-hosted via next/font/local. JetBrains Mono is the locked
// data face. No Inter / Roboto / Arial / system / Space Grotesk.
const display = Fraunces({
  variable: "--font-display-src",
  subsets: ["latin"],
  axes: ["opsz"],
});
const body = Sora({ variable: "--font-body-src", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-src", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REWEAR-FUSED",
  description:
    "Safe to wear, able to be remade. A co-design loop closing the recycling loop on children's stretch apparel.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
        <Shell />
        {children}
      </body>
    </html>
  );
}
