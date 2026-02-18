"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Download,
  X,
  Smartphone,
  Zap,
  Shield,
  WifiOff,
  Bell,
} from "lucide-react";
import { usePWA } from "../../hooks/usePWA";
import { cn } from "@/lib/utils";

export function PWAMobileBanner() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [dismissed, setDismissed] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  // Check if on mobile and show banner after a delay
  React.useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasBeenDismissed = localStorage.getItem("pwa-banner-dismissed");

    if (isMobile && isInstallable && !isInstalled && !hasBeenDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isInstallable, isInstalled]);

  if (!isVisible || dismissed || isInstalled || !isInstallable) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setIsVisible(false);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  const features = [
    { icon: Zap, text: "Faster Loading" },
    { icon: WifiOff, text: "Works Offline" },
    { icon: Bell, text: "Push Notifications" },
  ];

  return (
    <div
      className={cn(
        "fixed right-0 bottom-0 left-0 z-50",
        "bg-background/95 border-primary/20 border-t backdrop-blur-xl",
        "text-foreground shadow-2xl",
        "transform transition-transform duration-500 ease-out",
        "safe-bottom", // For iOS safe area
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      {/* Technical striped top border */}
      <div className="via-primary/50 absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent" />

      {/* Decorative corner markers */}
      <div className="border-primary/50 absolute top-0 left-0 h-2 w-2 border-t border-l" />
      <div className="border-primary/50 absolute top-0 right-0 h-2 w-2 border-t border-r" />

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="hover:bg-muted text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded-full p-1.5 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {/* App Icon and Info */}
          <div className="flex flex-1 items-center gap-4">
            <div className="relative">
              <div className="border-primary/20 bg-primary/5 rounded-xl border p-3 backdrop-blur-sm">
                <Shield className="text-primary h-8 w-8" />
              </div>
              <div className="bg-background border-border absolute -right-1 -bottom-1 rounded-full border p-1 shadow-sm">
                <Smartphone className="text-foreground h-3 w-3" />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <h3 className="font-serif text-base leading-tight font-bold tracking-tight sm:text-lg">
                Install Code Guardian
              </h3>
              <p className="text-muted-foreground font-mono text-xs leading-tight sm:text-sm">
                Add to home screen for better performance
              </p>
            </div>
          </div>

          {/* Features - Hidden on very small screens */}
          <div className="border-border/40 hidden h-10 items-center gap-6 border-l px-4 pl-6 sm:flex">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-muted-foreground flex items-center gap-2 font-mono text-xs"
              >
                <feature.icon className="text-primary/70 h-3.5 w-3.5" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Install Button */}
          <Button
            onClick={handleInstall}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 border-primary/20 w-full border font-mono text-xs tracking-wider uppercase shadow-lg sm:w-auto"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Install App
          </Button>
        </div>

        {/* Features for mobile - Shown only on small screens */}
        <div className="border-border mt-4 flex items-center justify-between gap-2 border-t border-dashed pt-3 sm:hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-muted-foreground flex flex-col items-center gap-1.5 text-center font-mono text-[10px]"
            >
              <div className="bg-primary/10 rounded-full p-1.5">
                <feature.icon className="text-primary h-3 w-3" />
              </div>
              <span className="leading-tight">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PWAMobileBanner;
