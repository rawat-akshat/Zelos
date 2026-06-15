import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Serif, Inter, Newsreader } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zelos — Break through task paralysis",
  description:
    "Your cognitive companion for breaking through task paralysis. Turn overwhelm into action in under 60 seconds.",
  keywords: ["task paralysis", "productivity", "ADHD", "procrastination", "focus"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${instrumentSerif.variable} ${newsreader.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning className="font-body">
        {children}
      </body>
    </html>
  );
}
