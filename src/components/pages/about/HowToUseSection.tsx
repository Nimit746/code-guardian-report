import { useState } from "react";
import {
  Upload,
  Play,
  Download,
  Wand2,
  Shield,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Code2,
  Eye,
  Lightbulb,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const HowToUseSection = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: "SEQ-01",
      title: "Input_Ingestion",
      icon: <Upload className="h-5 w-5" />,
      description: "Initialize codebase transmission sequence",
      details: [
        "Drag & drop mechanism enabled",
        "Directory structure preservation",
        "Multi-language parser active",
        "100MB input buffer limit",
        "Batch processing capable",
      ],
      supportedFormats: [
        "JS/TS",
        "Python",
        "Java",
        "C#",
        "PHP",
        "Go",
        "Rust",
        "HTML/CSS",
      ],
      tips: [
        "Config files optimize analysis path",
        "Dependency manisfests recommended",
        "Full project context preferred",
      ],
    },
    {
      id: "SEQ-02",
      title: "Analysis_Engine",
      icon: <Cpu className="h-5 w-5" />,
      description: "Execute static analysis & security heuristics",
      details: [
        "Real-time vulnerability detection",
        "Code quality metrics extraction",
        "Performance bottleneck isolation",
        "Dependency auditing",
        "OWASP compliance check",
      ],
      analysisTypes: [
        {
          name: "SEC_SCAN",
          time: "30-60s",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "QUAL_CHECK",
          time: "15-30s",
          icon: <Code2 className="h-4 w-4" />,
        },
        {
          name: "PERF_AUDIT",
          time: "20-45s",
          icon: <Activity className="h-4 w-4" />,
        },
      ],
      tips: [
        "Processing time scales with input size",
        "Async execution enabled",
        "Background processing active",
      ],
    },
    {
      id: "SEQ-03",
      title: "Diagnostic_Output",
      icon: <Eye className="h-5 w-5" />,
      description: "Review system findings and severity classification",
      details: [
        "Data visualization dashboard",
        "Severity stratification",
        "Source code correlation",
        "Remediation vectors",
        "Fix implementation guides",
      ],
      severityLevels: [
        {
          level: "CRITICAL",
          color: "bg-red-500",
          description: "Immediate system threat",
        },
        {
          level: "HIGH",
          color: "bg-orange-500",
          description: "Priority remediation required",
        },
        {
          level: "MEDIUM",
          color: "bg-yellow-500",
          description: "Standard optimization needed",
        },
        {
          level: "LOW",
          color: "bg-muted",
          description: "Code style divergence",
        },
      ],
      tips: [
        "Prioritize CRITICAL vectors",
        "Filter by issue category",
        "Deep-dive via issue expansion",
      ],
    },
    {
      id: "SEQ-04",
      title: "AI_Remediation",
      icon: <Wand2 className="h-5 w-5" />,
      description: "Generate automated patch prompts",
      details: [
        "Context-aware prompt generation",
        "IDE integration ready",
        "Multi-template support",
        "Logic path optimization",
        "Security hardening patterns",
      ],
      promptTypes: [
        "VULN_PATCH",
        "QUAL_FIX",
        "PERF_OPT",
        "BUG_HUNT",
        "API_SEC",
        "DEP_CHK",
      ],
      tips: [
        "Use patch prompts for quick fixes",
        "Chain prompts for complex refactors",
        "Verify output in staging",
      ],
    },
    {
      id: "SEQ-05",
      title: "Report_Export",
      icon: <Download className="h-5 w-5" />,
      description: "Generate compliance documentation",
      details: [
        "Executive PDF summary",
        "Raw CSV dataset",
        "JSON structure export",
        "Team share links",
        "Custom templates",
      ],
      exportFormats: [
        { format: "PDF", description: "Stakeholder Brief" },
        { format: "CSV", description: "Data Archival" },
        { format: "JSON", description: "Pipeline Integration" },
        { format: "HTML", description: "Web View" },
      ],
      tips: [
        "PDF for compliance records",
        "JSON for CI/CD gating",
        "CSV for metric tracking",
      ],
    },
  ];

  const quickStartGuide = [
    "Navigate to Main Console",
    "Initiate File Upload Protocol",
    "Await Analysis Completion",
    "Review Diagnostic Dashboard",
    "Execute Remediation Prompts",
    "Export Final Report",
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col gap-12 md:flex-row lg:gap-24">
          {/* Left Column: Navigation & Quick Start */}
          <div className="space-y-8 md:w-1/3">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Terminal className="text-primary h-5 w-5" />
                <span className="text-primary font-mono text-xs tracking-widest uppercase">
                  Operational_Protocol
                </span>
              </div>
              <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight uppercase lg:text-4xl">
                Execution Sequence
              </h2>
              <p className="text-muted-foreground mb-8 text-sm">
                Standard operating procedures for code analysis and remediation
                workflow.
              </p>
            </div>

            {/* Steps Navigation */}
            <div className="space-y-1">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "flex w-full items-center gap-4 border-l-2 px-4 py-3 text-left transition-all",
                    activeStep === index
                      ? "bg-primary/5 border-primary text-primary"
                      : "hover:bg-muted/10 text-muted-foreground hover:text-foreground border-transparent"
                  )}
                >
                  <span className="font-mono text-xs opacity-50">
                    {step.id}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-sm tracking-wider uppercase",
                      activeStep === index ? "font-bold" : "font-medium"
                    )}
                  >
                    {step.title}
                  </span>
                  {activeStep === index && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </button>
              ))}
            </div>

            {/* Quick Start Panel */}
            <div className="border-border bg-background/50 group relative overflow-hidden border p-6 backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-2 opacity-50">
                <Play className="text-primary/10 h-12 w-12" />
              </div>

              <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase">
                <CheckCircle2 className="text-primary h-4 w-4" />
                Quick_Start_Guide
              </h3>

              <div className="relative z-10 space-y-3">
                {quickStartGuide.map((step, index) => (
                  <div
                    key={index}
                    className="group/item flex items-start gap-3"
                  >
                    <span className="text-primary/70 bg-primary/10 mt-0.5 rounded-sm px-1.5 py-0.5 font-mono text-[10px]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground group-hover/item:text-foreground text-xs transition-colors">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Step Details */}
          <div className="md:w-2/3">
            <div className="border-border bg-background relative h-full border p-1">
              {/* Corner accents */}
              <div className="border-primary absolute -top-[1px] -left-[1px] h-4 w-4 border-t border-l" />
              <div className="border-primary absolute -right-[1px] -bottom-[1px] h-4 w-4 border-r border-b" />

              {/* Inner Container */}
              <div className="bg-muted/10 flex h-full flex-col p-6 md:p-8">
                {/* Header */}
                <div className="border-border/50 mb-8 flex items-center gap-4 border-b pb-6">
                  <div className="bg-primary/10 border-primary/20 border p-3">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <div className="text-primary mb-1 font-mono text-xs">
                      Step_Sequence: {steps[activeStep].id}
                    </div>
                    <h3 className="font-mono text-2xl font-bold tracking-tight uppercase">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Primary Details */}
                  <div>
                    <h4 className="text-muted-foreground mb-4 font-mono text-xs font-bold tracking-wider uppercase">
                      Process_Execution
                    </h4>
                    <ul className="space-y-3">
                      {steps[activeStep].details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-primary mt-1.5 h-1.5 w-1.5 rounded-sm" />
                          <span className="text-foreground/80 text-sm">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic Secondary Content */}
                  <div className="space-y-6">
                    {steps[activeStep].supportedFormats && (
                      <div>
                        <h4 className="text-muted-foreground mb-3 font-mono text-xs font-bold tracking-wider uppercase">
                          Compatible_Formats
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {steps[activeStep].supportedFormats.map((format) => (
                            <span
                              key={format}
                              className="bg-background border-border text-muted-foreground border px-2 py-1 font-mono text-[10px] uppercase"
                            >
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {steps[activeStep].analysisTypes && (
                      <div>
                        <h4 className="text-muted-foreground mb-3 font-mono text-xs font-bold tracking-wider uppercase">
                          Ops_Metrics
                        </h4>
                        <div className="space-y-2">
                          {steps[activeStep].analysisTypes.map((type) => (
                            <div
                              key={type.name}
                              className="bg-background border-border/50 flex items-center justify-between border p-2"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-primary">
                                  {type.icon}
                                </span>
                                <span className="font-mono text-[10px] uppercase">
                                  {type.name}
                                </span>
                              </div>
                              <span className="text-muted-foreground font-mono text-[10px]">
                                {type.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {steps[activeStep].severityLevels && (
                      <div>
                        <h4 className="text-muted-foreground mb-3 font-mono text-xs font-bold tracking-wider uppercase">
                          Threat_Levels
                        </h4>
                        <div className="space-y-1">
                          {steps[activeStep].severityLevels.map((severity) => (
                            <div
                              key={severity.level}
                              className="flex items-center gap-3 text-xs"
                            >
                              <div
                                className={`h-2 w-2 ${severity.color} rounded-sm`}
                              />
                              <span className="w-16 font-mono font-bold">
                                {severity.level}
                              </span>
                              <span className="text-muted-foreground truncate">
                                {severity.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {steps[activeStep].promptTypes && (
                      <div>
                        <h4 className="text-muted-foreground mb-3 font-mono text-xs font-bold tracking-wider uppercase">
                          Prompt_Modules
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {steps[activeStep].promptTypes.map((type) => (
                            <div
                              key={type}
                              className="border-border/60 flex items-center gap-2 border border-dashed p-1.5"
                            >
                              <Wand2 className="text-muted-foreground h-3 w-3" />
                              <span className="text-muted-foreground font-mono text-[10px]">
                                {type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {steps[activeStep].exportFormats && (
                      <div>
                        <h4 className="text-muted-foreground mb-3 font-mono text-xs font-bold tracking-wider uppercase">
                          Output_Streams
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {steps[activeStep].exportFormats.map((format) => (
                            <div
                              key={format.format}
                              className="bg-background border-border border p-2"
                            >
                              <span className="block font-mono text-[10px] font-bold">
                                {format.format}
                              </span>
                              <span className="text-muted-foreground block truncate text-[10px]">
                                {format.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pro Tips / Footer */}
                <div className="border-border/50 mt-auto border-t pt-6">
                  <div className="border border-amber-500/20 bg-amber-500/5 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-amber-500 uppercase">
                      <Lightbulb className="h-3 w-3" />
                      Optimized_Heuristics
                    </h4>
                    <ul className="space-y-1">
                      {steps[activeStep].tips.map((tip, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground flex items-center gap-2 text-xs"
                        >
                          <span className="text-amber-500/50">::</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile Nav Controls (only visible on small screens usually, but kept for accessibility) */}
                <div className="mt-6 flex justify-between md:hidden">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="border-border border px-4 py-2 font-mono text-xs uppercase disabled:opacity-50"
                  >
                    <ChevronLeft className="mr-1 inline h-4 w-4" /> Prev
                  </button>
                  <button
                    onClick={() =>
                      setActiveStep(Math.min(steps.length - 1, activeStep + 1))
                    }
                    disabled={activeStep === steps.length - 1}
                    className="bg-primary text-primary-foreground px-4 py-2 font-mono text-xs uppercase"
                  >
                    Next <ChevronRight className="ml-1 inline h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HowToUseSection };
