import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { FeatureGrid } from "@/components/features/FeatureGrid";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
  benefits?: string[];
}

interface AboutPageLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  className?: string;
  features?: Feature[];
  noContainer?: boolean;
}

export const AboutPageLayout: React.FC<AboutPageLayoutProps> = ({
  children,
  showNavigation = true,
  className = "",
  features,
  noContainer = false,
}) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {showNavigation && <Navigation />}

      <main className="relative z-10">
        {noContainer ? (
          children
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        )}
      </main>

      {/* Features Section (if needed) */}
      {features && features.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-16 lg:py-24">
          <FeatureGrid
            features={features}
            title="Comprehensive Security & Quality Analysis"
            subtitle="Everything you need to secure and optimize your codebase in one powerful platform"
            columns={4}
            variant="modern"
          />
        </section>
      )}
    </div>
  );
};

export default AboutPageLayout;
