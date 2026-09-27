"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { GetStartedButton } from "./GetStartedButton";

export function PirateHero() {
  return (
    <div className="pirate-hero-data">
      <div className="pirate-hero-badge">
        <Sparkles className="w-3.5 h-3.5" />
        <span>AUTONOMOUS DATA INTELLIGENCE</span>
      </div>

      <h3 className="pirate-hero-subtitle">PIRATEAGENT</h3>

      <h1 className="pirate-hero-title">
        <span>YOUR AI DATA</span>
        RESEARCH CREW
      </h1>

      <p className="pirate-hero-desc">
        Turn a simple business request into clean, structured, source-backed web data.
      </p>

      {/* Concise 5-step workflow explanation */}
      <div className="pirate-workflow-strip" aria-label="How PirateAgent Works">
        <div className="pirate-step">
          <span className="pirate-step-num">1</span>
          <span>Prompt</span>
        </div>
        <span className="pirate-step-arrow" aria-hidden="true">&rarr;</span>
        <div className="pirate-step">
          <span className="pirate-step-num">2</span>
          <span>AI Plan</span>
        </div>
        <span className="pirate-step-arrow" aria-hidden="true">&rarr;</span>
        <div className="pirate-step">
          <span className="pirate-step-num">3</span>
          <span>Web Search</span>
        </div>
        <span className="pirate-step-arrow" aria-hidden="true">&rarr;</span>
        <div className="pirate-step">
          <span className="pirate-step-num">4</span>
          <span>Extract</span>
        </div>
        <span className="pirate-step-arrow" aria-hidden="true">&rarr;</span>
        <div className="pirate-step">
          <span className="pirate-step-num">5</span>
          <span>Clean Dataset</span>
        </div>
      </div>

      <div className="pirate-hero-cta">
        <GetStartedButton />
        <span className="pirate-hero-hint">Direct access to application dashboard &bull; No setup required</span>
      </div>
    </div>
  );
}
