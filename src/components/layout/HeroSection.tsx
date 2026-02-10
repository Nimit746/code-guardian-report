import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  variant?: "default" | "minimal" | "gradient" | "ultra";
  className?: string;
  titleId?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  children,
  className = "",
  titleId = "hero-title",
}) => {
  return (
    <section
      className={`relative py-20 sm:py-28 md:py-32 lg:py-40 ${className}`}
      aria-labelledby={titleId}
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h1
            id={titleId}
            className="font-display text-center text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {title}
          </h1>
        )}

        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}

        {children && <div className="mt-10 sm:mt-12">{children}</div>}
      </div>
    </section>
  );
};
