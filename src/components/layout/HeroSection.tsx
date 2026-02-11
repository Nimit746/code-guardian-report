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
  variant = "minimal",
}) => {
  return (
    <section
      className={`relative overflow-hidden py-20 sm:py-28 md:py-32 lg:py-40 ${
        variant === "minimal" ? "border-border/40 border-b" : ""
      } ${className}`}
      aria-labelledby={titleId}
    >
      {variant === "gradient" && (
        <div className="from-primary/5 via-background to-background dark:from-primary/10 absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
      )}

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
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        )}

        {children && <div className="mt-10 sm:mt-12">{children}</div>}
      </div>
    </section>
  );
};
