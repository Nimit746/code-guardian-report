"use client";

import React from "react";
import {
  HelpCircle,
  BookOpen,
  Mail,
  Github,
  ExternalLink,
  Shield,
  Settings,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { AnimatedBackground } from "@/components/pages/about/AnimatedBackground";

interface HelpPageProps {
  className?: string;
}

export const HelpPage: React.FC<HelpPageProps> = ({ className = "" }) => {
  const helpSections = [
    {
      title: "Getting Started",
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        {
          title: "Quick Start Guide",
          description: "Learn how to upload and analyze your first code file",
          link: "#quick-start",
        },
        {
          title: "Supported Languages",
          description: "See which programming languages are supported",
          link: "#languages",
        },
        {
          title: "File Upload Guidelines",
          description: "Best practices for uploading code files",
          link: "#upload-guidelines",
        },
      ],
    },
    {
      title: "Analysis Features",
      icon: <Shield className="h-5 w-5" />,
      items: [
        {
          title: "Security Analysis",
          description: "Understanding security vulnerabilities and fixes",
          link: "#security-analysis",
        },
        {
          title: "AI Configuration",
          description: "How to configure AI services for analysis",
          link: "#ai-config",
        },
        {
          title: "Custom Prompts",
          description: "Creating custom analysis prompts",
          link: "#custom-prompts",
        },
      ],
    },
    {
      title: "Results & Reports",
      icon: <BarChart3 className="h-5 w-5" />,
      items: [
        {
          title: "Understanding Results",
          description: "How to interpret analysis results",
          link: "#understanding-results",
        },
        {
          title: "Export Options",
          description: "Exporting analysis reports in different formats",
          link: "#export-options",
        },
        {
          title: "Analytics Dashboard",
          description: "Using the comprehensive analytics view",
          link: "#analytics-dashboard",
        },
      ],
    },
    {
      title: "Troubleshooting",
      icon: <Settings className="h-5 w-5" />,
      items: [
        {
          title: "Common Issues",
          description: "Solutions to frequently encountered problems",
          link: "#common-issues",
        },
        {
          title: "API Configuration",
          description: "Setting up OpenAI and Anthropic API keys",
          link: "#api-config",
        },
        {
          title: "Performance Tips",
          description: "Optimizing analysis performance",
          link: "#performance-tips",
        },
      ],
    },
  ];

  const supportOptions = [
    {
      title: "Documentation",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Comprehensive guides and API reference",
      link: "https://github.com/Xenonesis/code-guardian-report",
      external: true,
    },
    {
      title: "GitHub Issues",
      icon: <Github className="h-5 w-5" />,
      description: "Report bugs and request features",
      link: "https://github.com/Xenonesis/code-guardian-report/issues",
      external: true,
    },
    {
      title: "Email Support",
      icon: <Mail className="h-5 w-5" />,
      description: "Get help via email",
      link: "mailto:itisaddy7@gmail.com",
      external: true,
    },
  ];

  return (
    <div
      className={`bg-background relative min-h-screen overflow-hidden ${className}`}
    >
      <AnimatedBackground />
      <div className="relative z-10 pt-16">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
                <HelpCircle className="text-primary dark:text-primary h-8 w-8" />
              </div>
              <h1 className="text-foreground mb-4 text-4xl font-bold">
                Help & Documentation
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
                Everything you need to know about using Code Guardian for secure
                code analysis
              </p>
            </div>

            {/* Help Sections */}
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              {helpSections.map((section, index) => (
                <div
                  key={index}
                  className="border-border/50 bg-card/80 backdrop-blur-sm/50/80 rounded-xl border p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-teal-100 p-2 dark:bg-teal-900/30">
                      {section.icon}
                    </div>
                    <h3 className="text-foreground text-lg font-semibold">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="group">
                        <a
                          href={item.link}
                          className="hover:bg-muted block rounded-lg p-3 transition-colors duration-200 dark:hover:bg-slate-700/50"
                        >
                          <h4 className="text-foreground group-hover:text-primary dark:group-hover:text-primary font-medium transition-colors duration-200 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {item.description}
                          </p>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Support Options */}
            <div className="border-border/50 bg-card/80 backdrop-blur-sm/50/80 rounded-xl border p-8">
              <h2 className="text-foreground mb-6 text-center text-2xl font-bold">
                Need More Help?
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {supportOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.link}
                    target={option.external ? "_blank" : undefined}
                    rel={option.external ? "noopener noreferrer" : undefined}
                    className="group bg-muted hover:border-border hover:bg-muted block rounded-lg border border-transparent p-6 transition-all duration-200 dark:bg-slate-700/50 dark:hover:border-slate-600 dark:hover:bg-slate-600/50"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-teal-100 p-2 dark:bg-teal-900/30">
                        {option.icon}
                      </div>
                      {option.external && (
                        <ExternalLink className="text-muted-foreground group-hover:text-primary dark:group-hover:text-primary h-4 w-4 transition-colors duration-200" />
                      )}
                    </div>
                    <h3 className="text-foreground group-hover:text-primary dark:group-hover:text-primary font-semibold transition-colors duration-200 dark:text-white">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {option.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="border-border bg-muted dark:border-border mt-12 rounded-xl border p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Quick Tips
              </h3>
              <div className="text-foreground/80 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <div className="bg-muted mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>
                    Use the sidebar navigation to quickly switch between
                    different analysis features
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-muted mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>
                    Configure your AI API keys in the AI Configuration tab for
                    enhanced analysis
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-muted mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>
                    Export your analysis results to share with your team or for
                    record keeping
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-muted mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>
                    Use custom prompts to tailor the analysis to your specific
                    security requirements
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
