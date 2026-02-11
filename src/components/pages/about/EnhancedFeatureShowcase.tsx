import React, { useState } from "react";
import {
  Shield,
  Brain,
  Zap,
  Database,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  gradient: string;
}

export const EnhancedFeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>("security");

  const features: Feature[] = [
    {
      id: "security",
      icon: <Shield className="h-6 w-6" />,
      title: "Advanced Security Analysis",
      description:
        "Comprehensive vulnerability detection using OWASP standards and real-time threat intelligence.",
      benefits: [
        "OWASP Top 10 Coverage",
        "CVE Database Integration",
        "Zero-day Detection",
        "Compliance Reporting",
      ],
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: "ai",
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description:
        "Next-generation AI with GPT-4 and Claude integration for intelligent code recommendations.",
      benefits: [
        "Smart Fix Suggestions",
        "Contextual Analysis",
        "Auto-generated Prompts",
        "Learning Algorithms",
      ],
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: "performance",
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimization",
      description:
        "Lightning-fast processing with real-time analytics and comprehensive performance tracking.",
      benefits: [
        "Real-time Processing",
        "Performance Metrics",
        "Bundle Analysis",
        "Optimization Insights",
      ],
      color: "amber",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      id: "storage",
      icon: <Database className="h-6 w-6" />,
      title: "Persistent Storage",
      description:
        "Advanced results storage with cross-tab synchronization and intelligent history management.",
      benefits: [
        "Persistent Results",
        "Cross-tab Sync",
        "Data Compression",
        "Export Capabilities",
      ],
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
    },
  ];

  const activeFeatureData =
    features.find((f) => f.id === activeFeature) || features[0];

  return (
    <section className="bg-muted/30 relative overflow-hidden py-20 dark:bg-transparent">
      {/* Enhanced Background Elements - Made more subtle for light mode */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 hidden h-64 w-64 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10"></div>
        <div className="delay-2s absolute right-1/4 bottom-1/4 hidden h-48 w-48 rounded-full bg-emerald-500/5 blur-2xl dark:bg-emerald-500/10"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Enhanced Header */}
          <div className="mb-16 text-center">
            <div className="border-border bg-card hover:border-border/80 dark:bg-card/50 mx-auto mb-8 max-w-4xl rounded-xl border p-8 shadow-sm transition-all duration-200 hover:shadow-md">
              <h3 className="text-foreground mb-6 text-4xl font-bold sm:text-5xl">
                Code Guardian <span className="text-primary">Pro</span>
              </h3>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Discover the powerful features that make Code Guardian the
                ultimate security analysis platform
              </p>
            </div>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Enhanced Feature Tabs */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={feature.id}
                  className={`cursor-pointer rounded-xl border p-6 transition-all duration-700 ${
                    activeFeature === feature.id
                      ? "border-primary bg-card ring-primary dark:bg-card/80 shadow-lg ring-1"
                      : "border-border bg-card hover:border-muted-foreground/30 dark:bg-card/40 shadow-sm hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start gap-6">
                      {/* Enhanced Icon Container */}
                      <div
                        className={`relative rounded-2xl p-4 shadow-md transition-all duration-500 ${
                          activeFeature === feature.id
                            ? `bg-gradient-to-r ${feature.gradient} scale-110 rotate-3 text-white`
                            : "bg-muted text-muted-foreground dark:bg-muted/20"
                        }`}
                      >
                        {feature.icon}
                        {activeFeature === feature.id && (
                          <div className="absolute inset-0 animate-pulse rounded-2xl bg-white/20"></div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h4
                          className={`mb-3 text-xl font-bold transition-all duration-500 ${
                            activeFeature === feature.id
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Enhanced Arrow */}
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${
                          activeFeature === feature.id
                            ? "bg-primary text-primary-foreground scale-110"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Active Feature Details */}
            <div className="relative lg:sticky lg:top-8">
              <Card className="border-border bg-card hover:border-border/80 dark:bg-card/50 overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md">
                {/* Enhanced Background Decoration */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${activeFeatureData.gradient} opacity-5 dark:opacity-10`}
                ></div>
                <div className="absolute top-0 right-0 hidden h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-3xl"></div>
                <div className="delay-2s absolute bottom-0 left-0 hidden h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/25 blur-2xl"></div>

                {/* Particle System */}
                <div className="particle-system">
                  <div
                    className="particle"
                    style={{ left: "10%", animationDelay: "0s" }}
                  ></div>
                  <div
                    className="particle"
                    style={{ left: "90%", animationDelay: "3s" }}
                  ></div>
                  <div
                    className="particle"
                    style={{ left: "50%", animationDelay: "6s" }}
                  ></div>
                </div>

                <CardContent className="relative z-10 p-10">
                  {/* Enhanced Header */}
                  <div className="mb-8 flex items-center gap-6">
                    <div
                      className={`rounded-3xl bg-gradient-to-r p-5 ${activeFeatureData.gradient} animate-pulse text-white shadow-xl`}
                    >
                      <div className="text-2xl">{activeFeatureData.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-foreground mb-2 text-3xl font-bold">
                        {activeFeatureData.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        <span className="text-muted-foreground font-medium">
                          AI-Powered Analysis
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <div className="border-border bg-muted/30 dark:bg-muted/10 mb-8 rounded-xl border p-6 shadow-sm">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {activeFeatureData.description}
                    </p>
                  </div>

                  {/* Enhanced Benefits Section */}
                  <div className="space-y-6">
                    <h5 className="text-foreground flex items-center gap-3 text-xl font-bold">
                      <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-500/20">
                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      Key Benefits
                    </h5>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {activeFeatureData.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="group border-border bg-card hover:border-border/80 dark:bg-card/40 rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`h-3 w-3 rounded-full bg-gradient-to-r ${activeFeatureData.gradient}`}
                            ></div>
                            <span className="text-muted-foreground group-hover:text-foreground font-medium transition-colors duration-300">
                              {benefit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
