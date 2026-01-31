"use client";

import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { ValueProps } from "../components/ValueProps";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <ValueProps />
      <HowItWorks />
    </div>
  );
}


