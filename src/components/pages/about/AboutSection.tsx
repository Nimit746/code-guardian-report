"use client";

import React from "react";
import { AnimatedBackground } from "@/components/pages/about/AnimatedBackground";
import { HeroSection } from "@/components/layout/HeroSection";
import { StatsGrid } from "@/components/pages/about/StatsGrid";
import { VersionInfo } from "@/components/pages/about/VersionInfo";
import { DetailedInfo } from "@/components/pages/about/DetailedInfo";
import { SupportedToolsSection } from "@/components/pages/about/SupportedToolsSection";
import { CallToActionSection } from "@/components/pages/about/CallToActionSection";
import { HowToUseSection } from "@/components/pages/about/HowToUseSection";
import { HowItWorksSection } from "@/components/pages/about/HowItWorksSection";
import { MeetDeveloperSection } from "@/components/pages/about/MeetDeveloperSection";
import { EnhancedFeatureShowcase } from "@/components/pages/about/EnhancedFeatureShowcase";
import { AboutFeatures } from "@/components/pages/about/AboutFeatures";
import { CustomRulesSection } from "@/components/pages/about/CustomRulesSection";
import { SECTION_IDS } from "./constants";

export const AboutSection: React.FC = () => {
  return (
    <section
      id={SECTION_IDS.ABOUT}
      className="bg-background relative min-h-screen overflow-hidden"
    >
      <AnimatedBackground />

      <div className="pt-12 sm:pt-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative z-10 space-y-12 sm:space-y-16 lg:space-y-20 xl:space-y-24">
            {/* Enhanced Hero Section */}
            <div>
              <HeroSection
                title="Code Guardian Enterprise"
                subtitle="Advanced Security Analysis Platform for Modern Development Teams"
                description="Enterprise-grade static code analysis platform powered by artificial intelligence. Delivers comprehensive security assessments, vulnerability detection, and compliance reporting for mission-critical applications. Trusted by development teams worldwide for maintaining secure, high-quality codebases."
                titleId="about-hero-title"
              >
                <div className="space-y-8 sm:space-y-10">
                  <VersionInfo />
                  <StatsGrid />
                </div>
              </HeroSection>
            </div>

            {/* Enhanced Information Sections */}
            <div className="space-y-16 sm:space-y-20">
              <div id={SECTION_IDS.GETTING_STARTED}>
                <DetailedInfo />
              </div>

              <div id={SECTION_IDS.FEATURES}>
                <EnhancedFeatureShowcase />
              </div>

              <div id={SECTION_IDS.EXAMPLES}>
                <HowToUseSection />
              </div>

              <div id={SECTION_IDS.API_REFERENCE}>
                <HowItWorksSection />
              </div>
            </div>

            <div id={SECTION_IDS.TECH_STACK}>
              <AboutFeatures />
            </div>

            {/* Enhanced Bottom Sections */}
            <div className="space-y-16 sm:space-y-20">
              <div id={SECTION_IDS.CUSTOM_RULES}>
                <CustomRulesSection />
              </div>

              <div id={SECTION_IDS.UPDATES}>
                <SupportedToolsSection />
              </div>

              <div id={SECTION_IDS.ABOUT_SECTION}>
                <MeetDeveloperSection />
              </div>

              <div id={SECTION_IDS.FAQ}>
                <CallToActionSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
