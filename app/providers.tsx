"use client";

import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { AuthProvider } from "@/lib/auth-context";
import { NavigationProvider } from "@/lib/navigation-context";
import { ConnectionStatus } from "@/components/common/ConnectionStatus";
import { FirestoreStatus } from "@/components/firebase/FirestoreStatus";
import { FirestoreHealthChecker } from "@/components/firebase/FirestoreHealthChecker";
import { FirestoreErrorNotification } from "@/components/firebase/FirestoreErrorNotification";
import { PWAUpdateNotification } from "@/components/pwa/PWAUpdateNotification";
import { OfflineIndicator } from "@/components/pwa/OfflineIndicator";
import { PWAMobileBanner } from "@/components/pwa/PWAMobileBanner";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";
import { ScrollToTop } from "@/components/common/ScrollToTop";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <NavigationProvider>
          <ErrorBoundary>
            <TooltipProvider>
              <SmoothScrollProvider>
                <Sonner
                  position="top-right"
                  toastOptions={{
                    className: "rounded-lg",
                    duration: 3000,
                    style: {
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid hsl(var(--border))",
                    },
                  }}
                />
                <ConnectionStatus />
                <FirestoreStatus />
                <FirestoreHealthChecker />
                <FirestoreErrorNotification />
                <PWAUpdateNotification />
                <OfflineIndicator />
                <PWAMobileBanner />
                {children}
                <ScrollToTop />
                {isProd ? <Analytics /> : null}
                {isProd ? <SpeedInsights /> : null}
              </SmoothScrollProvider>
            </TooltipProvider>
          </ErrorBoundary>
        </NavigationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
