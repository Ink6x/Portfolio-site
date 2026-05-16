import type { Metadata } from "next";
import { Oxanium, Fira_Code, Space_Mono, Audiowide, Outfit, M_PLUS_1p } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-terminal",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space",
  display: "swap",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-audiowide",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const mPlus1p = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mplus",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ink6x Lab",
    template: "%s | Ink6x Lab",
  },
  description:
    "AI systems, agents, and web apps by Ink6x, Founder of Human+.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`h-full ${oxanium.variable} ${firaCode.variable} ${spaceMono.variable} ${audiowide.variable} ${outfit.variable} ${mPlus1p.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
