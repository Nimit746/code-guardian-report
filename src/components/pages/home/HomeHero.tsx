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
      className="section-glow relative flex items-center justify-center px-4 sm:px-6"
    >
      <div className="relative z-10 mx-auto max-w-3xl space-y-8 text-center sm:space-y-10">
        {/* Tagline */}
        <div className="animate-fade-in space-y-5">
          <div className="border-primary/20 bg-card shadow-primary/5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-sm">
            <Shield className="text-primary h-3.5 w-3.5" />
            <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Security Analysis Platform
            </span>
          </div>

          <h1 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Protect your code{" "}
            <span className="text-primary">before it ships</span>
          </h1>

          <p className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed sm:text-lg">
            Enterprise-grade static analysis powered by AI. Detects
            vulnerabilities, bugs, and quality issues in real-time.
          </p>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-delay-1 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            onClick={onStartAnalysis}
            size="lg"
            className="btn-ultra-primary shadow-primary/25 hover:shadow-primary/35 w-full shadow-lg sm:w-auto"
          >
            Start Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full border border-slate-200 !bg-white !text-black shadow-sm hover:bg-slate-50 sm:w-auto dark:border-white/20 dark:!bg-transparent dark:!text-white dark:hover:bg-white/10"
          >
            Live Demo
          </Button>
        </div>

        {/* Social proof — minimal */}
        <p className="animate-fade-in-delay-2 text-muted-foreground text-sm">
          Trusted by 10,000+ developers worldwide
        </p>
      </div>

      {/* Gradient divider */}
      <div
        className="absolute right-0 bottom-0 left-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--glow) / 0.15), transparent)",
        }}
      />
    </HeroSection>
  );
};
