import React, { useState } from "react";
import {
  Shield,
  Brain,
  Zap,
  Database,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Terminal,
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  techSpec: string;
}

export const EnhancedFeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>("security");

  const features: Feature[] = [
    {
      id: "security",
      icon: <Shield className="h-5 w-5" />,
      title: "SECURITY_PROTOCOL",
      description:
        "Comprehensive vulnerability detection system using OWASP standards and real-time threat intelligence feeds.",
      benefits: [
        "OWASP TOP 10 SCAN",
        "CVE DB INTEGRATION",
        "ZERO-DAY DETECTION",
        "COMPLIANCE REPORT",
      ],
      techSpec: "SEC-LVL-5 // ENCRYPTED",
    },
    {
      id: "ai",
      icon: <Brain className="h-5 w-5" />,
      title: "NEURAL_ENGINE",
      description:
        "Next-generation AI core utilizing GPT-4 and Claude models for intelligent code interpretation and remediation.",
      benefits: [
        "AUTO-REMEDIATION",
        "CONTEXT AWARENESS",
        "PROMPT GENERATION",
        "HEURISTIC LEARNING",
      ],
      techSpec: "AI-CORE-V9 // ADAPTIVE",
    },
    {
      id: "performance",
      icon: <Zap className="h-5 w-5" />,
      title: "NATIVE_PERFORMANCE",
      description:
        "High-velocity processing engine with real-time analytics and millisecond-latency vulnerability scanning.",
      benefits: [
        "REAL-TIME PROCESS",
        "METRICS TRACKING",
        "BUNDLE ANALYSIS",
        "OPTIMIZATION",
      ],
      techSpec: "SPEED-OPT // TURBO",
    },
    {
      id: "storage",
      icon: <Database className="h-5 w-5" />,
      title: "DATA_PERSISTENCE",
      description:
        "Encrypted local storage subsystem with cross-tab synchronization and historic data retention protocols.",
      benefits: [
        "LOCAL ENCRYPTION",
        "SYNC PROTOCOL",
        "COMPRESSION ALGO",
        "EXPORT MODULE",
      ],
      techSpec: "STORE-VOL // PERSIST",
    },
  ];

  const activeFeatureData =
    features.find((f) => f.id === activeFeature) || features[0];

  return (
    <section className="bg-background border-border relative overflow-hidden border-y py-20">
      {/* Technical Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(180deg, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16">
            <div className="border-primary/20 bg-background/50 group relative overflow-hidden border p-6 md:p-8">
              <div className="bg-primary/50 absolute top-0 left-0 h-full w-1" />
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="text-primary h-5 w-5" />
                <span className="text-primary/70 font-mono text-xs tracking-widest uppercase">
                  System Capabilities
                </span>
              </div>
              <h3 className="mb-4 font-mono text-3xl font-bold tracking-tight uppercase md:text-4xl">
                Code Guardian{" "}
                <span className="text-primary animate-pulse">PRO_</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl font-mono text-sm leading-relaxed">
                {">"} INITIALIZING FEATURE SHOWCASE MODULE...
                <br />
                {">"} LOADING ADVANCED ANALYSIS SUBROUTINES...
              </p>

              {/* Scanline overlay */}
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
            </div>
          </div>

          <div className="border-border grid items-start gap-0 border lg:grid-cols-12">
            {/* Feature Selection Sidebar */}
            <div className="border-border bg-muted/5 border-r lg:col-span-5">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  className={`border-border group hover:bg-primary/5 relative w-full border-b p-6 text-left transition-all duration-200 ${
                    activeFeature === feature.id
                      ? "bg-primary/10 text-primary border-l-primary border-l-4"
                      : "text-muted-foreground hover:border-l-primary/50 border-l-4 border-l-transparent"
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`border p-2 ${activeFeature === feature.id ? "border-primary bg-primary/10" : "border-border bg-background"} transition-colors`}
                    >
                      {feature.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="truncate font-mono text-sm font-bold tracking-wider uppercase">
                          {feature.title}
                        </h4>
                        <span className="border-border border px-1 font-mono text-[10px] opacity-50">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="line-clamp-2 font-mono text-xs opacity-70">
                        {feature.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>

                  {activeFeature === feature.id && (
                    <div className="absolute top-1/2 right-4 -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Active Feature Details */}
            <div className="bg-background relative flex min-h-[500px] flex-col p-8 lg:col-span-7">
              {/* Background visual elements */}
              <div className="text-muted-foreground/30 absolute top-4 right-4 flex flex-col items-end gap-1 font-mono text-[10px]">
                <span>SYS_ID: {activeFeatureData.id.toUpperCase()}_0X82</span>
                <span>STATUS: ACTIVE</span>
                <span>UPTIME: 99.99%</span>
              </div>

              <div className="animate-in fade-in slide-in-from-right-4 flex-1 space-y-8 duration-300">
                <div className="space-y-4">
                  <div className="bg-primary/10 border-primary/20 text-primary inline-flex w-fit items-center gap-2 border px-3 py-1 font-mono text-xs tracking-wider uppercase">
                    <Sparkles className="h-3 w-3" />
                    {activeFeatureData.techSpec}
                  </div>

                  <h3 className="font-mono text-3xl font-bold tracking-tight uppercase">
                    {activeFeatureData.title}
                  </h3>

                  <div className="bg-primary h-px w-20" />

                  <p className="text-muted-foreground border-primary/20 max-w-xl border-l-2 py-2 pl-4 font-mono text-sm leading-relaxed">
                    {activeFeatureData.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h5 className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase">
                    <CheckCircle className="text-primary h-4 w-4" />
                    System Capabilities
                  </h5>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {activeFeatureData.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="border-border bg-muted/5 hover:bg-primary/5 hover:border-primary/30 group border p-3 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/50 group-hover:bg-primary h-1.5 w-1.5" />
                          <span className="text-muted-foreground group-hover:text-foreground font-mono text-xs uppercase transition-colors">
                            {benefit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative bottom bar */}
              <div className="border-border text-muted-foreground mt-8 flex items-center justify-between border-t pt-4 font-mono text-[10px]">
                <div className="flex gap-4">
                  <span>MEM: 48KB</span>
                  <span>CPU: 12%</span>
                </div>
                <div className="bg-muted relative h-2 w-24 overflow-hidden">
                  <div className="bg-primary/20 absolute inset-0 animate-pulse" />
                  <div className="bg-primary absolute top-0 left-0 h-full w-[60%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
