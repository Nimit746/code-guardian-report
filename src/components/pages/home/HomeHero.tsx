import React from "react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/layout/HeroSection";
import { ArrowRight, Shield } from "lucide-react";

interface HomeHeroProps {
  onStartAnalysis: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onStartAnalysis }) => {
  return (
    <HeroSection
      title=""
      description=""
      variant="gradient"
      className="relative flex items-center justify-center px-4 sm:px-6"
    >
      <div className="relative z-10 mx-auto max-w-3xl space-y-8 text-center sm:space-y-10">
        {/* Tagline */}
        <div className="animate-fade-in space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Security Analysis Platform
            </span>
          </div>

          <h1 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Protect your code{" "}
            <span className="text-primary">before it ships</span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Enterprise-grade static analysis powered by AI. Detects
            vulnerabilities, bugs, and quality issues in real-time.
          </p>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-delay-1 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            onClick={onStartAnalysis}
            size="lg"
            className="btn-ultra-primary w-full shadow-lg shadow-primary/20 sm:w-auto"
          >
            Start Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="btn-ultra-glass w-full border-border/50 bg-background/50 hover:bg-background/80 sm:w-auto"
          >
            Live Demo
          </Button>
        </div>

        {/* Social proof — minimal */}
        <p className="animate-fade-in-delay-2 text-sm text-muted-foreground">
          Trusted by 10,000+ developers worldwide
        </p>
      </div>
    </HeroSection>
  );
};
