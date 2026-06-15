"use client";

import { useState } from "react";
import LandingBackground from "./LandingBackground";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";

export default function LegalPageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [navBlur, setNavBlur] = useState(false);

  return (
    <div
      className="landing-page"
      onScroll={(e) => setNavBlur(e.currentTarget.scrollTop > 8)}
      style={{ overflowY: "auto", minHeight: "100vh" }}
    >
      <LandingBackground />
      <LandingNav blurred={navBlur} showCta={false} />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 720,
          margin: "0 auto",
          padding: "120px clamp(24px, 5vw, 64px) 80px",
        }}
      >
        <h1 className="font-landing-heading landing-section-title" style={{ marginBottom: 32 }}>
          {title}
        </h1>
        <div className="legal-prose">{children}</div>
      </main>

      <LandingFooter />
    </div>
  );
}
