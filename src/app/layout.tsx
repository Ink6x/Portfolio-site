import type { Metadata } from "next";
import { Oxanium, Fira_Code } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Jullien Lab",
    template: "%s | Jullien Lab",
  },
  description:
    "AI systems, agents, and web apps by Jullien, Founder of Human+.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`h-full ${oxanium.variable} ${firaCode.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
