import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
