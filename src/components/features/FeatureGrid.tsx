import React from "react";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
  benefits?: string[];
  comingSoon?: boolean;
}

interface FeatureGridProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  className?: string;
  columns?: "auto" | 2 | 3 | 4;
  variant?: "default" | "modern" | "minimal" | "industrial";
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  title,
  subtitle,
  className = "",
  columns = "auto",
  variant = "industrial",
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  return (
    <section className={cn("relative py-12 md:py-24", className)}>
      {/* Section Header */}
      {title && (
        <div className="container mx-auto mb-16 px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Terminal className="text-primary h-4 w-4" />
            <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase">
              System_Capabilities
            </span>
          </div>
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight uppercase md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Features Grid */}
      <div className={`grid ${getGridCols()} container mx-auto gap-6 px-4`}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={cn(
                "bg-background relative h-full overflow-hidden border transition-all duration-300",
                variant === "industrial"
                  ? "border-border hover:border-primary/50"
                  : "border-border/50 rounded-xl shadow-lg"
              )}
            >
              {variant === "industrial" && (
                <>
                  <div className="bg-muted/10 border-border/50 group-hover:bg-primary/10 group-hover:border-primary/50 absolute top-0 right-0 h-8 w-8 border-b border-l transition-colors" />
                  <div className="border-border group-hover:border-primary absolute bottom-0 left-0 h-2 w-2 border-t border-r transition-colors" />
                </>
              )}

              {/* Coming Soon Badge */}
              {feature.comingSoon && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-primary/10 border-primary/20 text-primary flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
                    <Sparkles className="h-3 w-3" />
                    <span>Planned_Update</span>
                  </div>
                </div>
              )}

              <div className="flex h-full flex-col p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div
                    className={cn(
                      "border p-3 transition-colors",
                      variant === "industrial"
                        ? "bg-muted/10 border-border group-hover:border-primary/50 group-hover:bg-primary/5 text-primary"
                        : "bg-primary/10 text-primary rounded-lg"
                    )}
                  >
                    {feature.icon}
                  </div>
                  {variant !== "industrial" && (
                    <ArrowUpRight className="text-muted-foreground h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                  {variant === "industrial" && (
                    <span className="text-muted-foreground font-mono text-[10px] uppercase opacity-50 transition-opacity group-hover:opacity-100">
                      MOD_{String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <h3
                  className={cn(
                    "mb-3 text-xl font-bold transition-colors",
                    variant === "industrial"
                      ? "group-hover:text-primary font-mono tracking-tight uppercase"
                      : ""
                  )}
                >
                  {feature.title}
                </h3>

                <p className="text-muted-foreground mb-6 flex-grow text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                {feature.benefits && (
                  <div className="border-border/50 mt-auto border-t pt-6">
                    <div className="grid grid-cols-1 gap-2">
                      {feature.benefits.slice(0, 4).map((benefit, bIdx) => (
                        <div
                          key={bIdx}
                          className="text-muted-foreground flex items-center gap-2 text-xs"
                        >
                          <div className="bg-primary h-1 w-1 rounded-none" />
                          <span className="font-mono uppercase">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
