"use client";

import { GetStartedButton } from "./GetStartedButton";

export function PirateHero() {
  return (
    <div className="pirate-hero-data">
      <h3 className="pirate-hero-subtitle">PIRATEAGENT</h3>

      <h1 className="pirate-hero-title">
        <span>YOUR AI DATA</span>
        RESEARCH CREW
      </h1>

      <p className="pirate-hero-desc">
        Turn a simple business request into clean, structured, source-backed web data.
      </p>

      <div className="pirate-hero-cta">
        <GetStartedButton />
      </div>
    </div>
  );
}
