"use client";

import { useState } from "react";
import LandingNav from "./components/landing/LandingNav";
import LandingFooter from "./components/landing/LandingFooter";
import LandingBackground from "./components/landing/LandingBackground";
import HeroSection from "./components/landing/HeroSection";
import HowItWorksSection from "./components/landing/HowItWorksSection";
import ProductPreviewSection from "./components/landing/ProductPreviewSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import SocialProofSection from "./components/landing/SocialProofSection";
import FAQSection from "./components/landing/FAQSection";
import FinalCTASection from "./components/landing/FinalCTASection";

export default function LandingPage() {
  const [navBlur, setNavBlur] = useState(false);

  return (
    <div
      className="landing-page"
      onScroll={(e) => setNavBlur(e.currentTarget.scrollTop > 8)}
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <LandingBackground />
      <LandingNav blurred={navBlur} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <HowItWorksSection />
        <ProductPreviewSection />
        <FeaturesSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <LandingFooter />
    </div>
  );
}
