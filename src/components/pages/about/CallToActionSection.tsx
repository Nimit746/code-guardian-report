import React, { useState, useEffect } from "react";
import {
  Terminal,
  ArrowRight,
  ShieldCheck,
  Lock,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "./constants";
import { scrollToElement } from "./utils";
import type { BaseSectionProps } from "./types";
import { cn } from "@/lib/utils";

export const CallToActionSection: React.FC<BaseSectionProps> = ({
  className = "",
}) => {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToHome = () => {
    scrollToElement(SECTION_IDS.HOME);
  };

  const statusIndicators = [
    {
      label: "ENCRYPTION_LAYER",
      status: "ACTIVE",
      icon: <Lock className="h-3 w-3" />,
      color: "text-green-500",
    },
    {
      label: "THREAT_DB",
      status: "ONLINE",
      icon: <ShieldCheck className="h-3 w-3" />,
      color: "text-green-500",
    },
    {
      label: "ANALYSIS_CORE",
      status: "READY",
      icon: <Activity className="h-3 w-3" />,
      color: "text-primary",
    },
  ];

  return (
    <section
      className={cn(
        "bg-background border-border relative border-t py-24",
        className
      )}
    >
      {/* Decorative Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="border-border bg-background/80 group relative mx-auto max-w-4xl border backdrop-blur-sm">
          {/* Corner Accents */}
          <div className="border-primary absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2" />
          <div className="border-primary absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2" />
          <div className="border-primary absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2" />
          <div className="border-primary absolute -right-1 -bottom-1 h-3 w-3 border-r-2 border-b-2" />

          <div className="p-8 text-center md:p-12">
            {/* Header Icon */}
            <div className="bg-primary/10 border-primary/20 mb-8 inline-flex items-center justify-center rounded-none border p-4">
              <Terminal className="text-primary h-8 w-8" />
            </div>

            <h2 className="mb-6 font-mono text-3xl font-bold tracking-tight uppercase md:text-5xl">
              System_Initialization
            </h2>

            <div className="mx-auto mb-10 max-w-2xl">
              <div className="text-muted-foreground bg-muted/30 border-primary border-l-2 p-4 text-left font-mono text-sm md:text-base">
                <span className="text-primary mr-2">$</span>
                <span className="typing-text">
                  Initiate comprehensive security audit sequence for local
                  codebase. Awaiting user input command...
                </span>
                <span
                  className={cn(
                    "bg-primary ml-1 inline-block h-4 w-2.5 align-middle",
                    cursorVisible ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={scrollToHome}
              className="bg-primary hover:bg-primary/90 text-primary-foreground hover:border-primary/50 group/btn relative h-14 overflow-hidden rounded-none border border-transparent px-8 font-mono text-lg font-bold uppercase transition-all"
            >
              <span className="relative z-10 flex items-center gap-3">
                Execute_Sequence
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </span>
              {/* Scanline effect on button */}
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-[100%]" />
            </Button>

            {/* System Status Indicators */}
            <div className="border-border mt-12 flex flex-wrap justify-center gap-4 border-t pt-8 md:gap-12">
              {statusIndicators.map((indicator, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 font-mono text-xs uppercase"
                >
                  <span className="text-muted-foreground flex items-center gap-2">
                    {indicator.icon}
                    {indicator.label}:
                  </span>
                  <span className={cn("font-bold", indicator.color)}>
                    [{indicator.status}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
