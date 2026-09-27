"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Anchor } from "lucide-react";
import { GetStartedButton } from "./GetStartedButton";

export function PirateNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`pirate-header ${isScrolled ? "pirate-header--scrolled" : ""}`}
    >
      <nav className="pirate-container pirate-nav" aria-label="Main Navigation">
        <Link href="/" className="pirate-nav-logo" id="pirate-brand-link">
          <Anchor className="text-current" />
          <span>PIRATEAGENT</span>
        </Link>

        {/* Simplified navigation: single primary action */}
        <GetStartedButton size="nav" className="shadow-sm" />
      </nav>
    </header>
  );
}
