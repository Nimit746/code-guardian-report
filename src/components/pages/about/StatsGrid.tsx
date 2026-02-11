import React, { useEffect, useRef, useState, useMemo } from "react";
import { getTotalFilesAnalyzed } from "@/services/analysisTracker";
import { Users, FileCode, Shield, Award } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface StatsGridProps {
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ className = "" }) => {
  const [animatedValues, setAnimatedValues] = useState<string[]>([
    "0",
    "0",
    "0",
    "0",
  ]);
  const gridRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = useMemo(() => {
    const totalFiles = getTotalFilesAnalyzed();
    return [
      {
        icon: <Users className="h-5 w-5" />,
        label: "Enterprise Clients",
        value: "25,000+",
      },
      {
        icon: <FileCode className="h-5 w-5" />,
        label: "Code Files Analyzed",
        value: totalFiles.toLocaleString(),
      },
      {
        icon: <Shield className="h-5 w-5" />,
        label: "Security Issues Detected",
        value: "150,000+",
      },
      {
        icon: <Award className="h-5 w-5" />,
        label: "Programming Languages",
        value: "20+",
      },
    ];
  }, []);

  // Initialize animated values after component mounts
  useEffect(() => {
    setAnimatedValues([
      "25000",
      getTotalFilesAnalyzed().toString(),
      "150000",
      "20",
    ]);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              const targetValue = parseFloat(stat.value.replace(/,/g, ""));
              let current = 0;
              const increment = targetValue / 100;

              const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                  current = targetValue;
                  clearInterval(timer);
                }

                setAnimatedValues((prev) => {
                  const newValues = [...prev];
                  newValues[index] = Math.floor(current).toLocaleString();
                  return newValues;
                });
              }, 20);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentGrid = gridRef.current;
    if (currentGrid) {
      observer.observe(currentGrid);
    }

    return () => {
      if (currentGrid) {
        observer.unobserve(currentGrid);
      }
    };
  }, [stats]);

  return (
    <div
      ref={gridRef}
      className={`mx-auto grid max-w-6xl grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8 ${className}`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stat-card-enhanced group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md lg:p-8 dark:border-slate-700 dark:bg-slate-900"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {/* Enhanced Gradient Border Effect */}
          <div className="animated-border absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

          {/* Multiple Floating Orbs for Depth - Made darker for light mode visibility */}
          <div className="absolute -top-6 -right-6 hidden h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 blur-2xl transition-transform duration-700 group-hover:scale-150 dark:from-blue-500/30 dark:to-pink-500/30"></div>
          <div className="delay-2s absolute -bottom-4 -left-4 hidden h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-xl transition-transform duration-500 group-hover:scale-125 dark:from-emerald-500/25 dark:to-teal-500/25"></div>

          <div className="relative z-10 text-center">
            {/* Enhanced Icon Container - Stronger contrast */}
            <div className="text-primary dark:text-primary mb-6 flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-12">
              <div className="rounded-2xl bg-slate-100 p-4 shadow-sm transition-all duration-700 group-hover:bg-slate-200 group-hover:shadow-md dark:bg-white/10 dark:group-hover:bg-white/20">
                <div className="text-primary dark:text-primary-foreground text-lg">
                  {stat.icon}
                </div>
              </div>
            </div>

            {/* Enhanced Value Display - Solid text color for readability */}
            <div className="mb-3 text-4xl font-bold text-slate-900 transition-transform duration-500 group-hover:scale-110 lg:text-5xl dark:text-white">
              {animatedValues[index]}
            </div>

            {/* Enhanced Label - Darker text */}
            <div className="text-sm font-semibold tracking-wide text-slate-600 transition-colors duration-300 group-hover:text-slate-900 lg:text-base dark:text-slate-400 dark:group-hover:text-slate-200">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
