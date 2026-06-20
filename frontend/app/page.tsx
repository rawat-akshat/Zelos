"use client";

import { useState } from "react";
import LandingNav from "./components/landing/LandingNav";
import LandingFooter from "./components/landing/LandingFooter";
import LandingBackground from "./components/landing/LandingBackground";
import HeroSection from "./components/landing/HeroSection";
import EmotionalHookSection from "./components/landing/EmotionalHookSection";
import MoatSection from "./components/landing/MoatSection";
import HowItWorksSection from "./components/landing/HowItWorksSection";
import GoalTimelineSection from "./components/landing/GoalTimelineSection";
import PlaybookSection from "./components/landing/PlaybookSection";
import BehavioralInsightsSection from "./components/landing/BehavioralInsightsSection";
import WhoItsForSection from "./components/landing/WhoItsForSection";
import FAQSection from "./components/landing/FAQSection";
import FounderInsightSection from "./components/landing/FounderInsightSection";
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
        <EmotionalHookSection />
        <MoatSection />
        <HowItWorksSection />
        <GoalTimelineSection />
        <PlaybookSection />
        <BehavioralInsightsSection />
        <WhoItsForSection />
        <FAQSection />
        <FounderInsightSection />
        <FinalCTASection />
      </main>

      <LandingFooter />
    </div>
  );
}
