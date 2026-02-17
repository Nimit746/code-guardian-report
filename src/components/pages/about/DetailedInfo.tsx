import React from "react";
import {
  Shield,
  Brain,
  Lock,
  FileText,
  Users,
  Globe,
  Code,
  Zap,
  Bug,
  Database,
  CheckCircle,
  Star,
  Rocket,
  Terminal,
} from "lucide-react";

export const DetailedInfo: React.FC = () => {
  const capabilities = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "VULN_DETECTION",
      description:
        "Comprehensive scanning for OWASP Top 10 vulnerabilities, SQL injection, XSS, authentication bypass, and more security threats.",
      id: "SEC-01",
    },
    {
      icon: <Bug className="h-5 w-5" />,
      title: "ERROR_TRACING",
      description:
        "Identify runtime errors, null pointer exceptions, memory leaks, race conditions, and logic errors before they impact users.",
      id: "ERR-02",
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "QUALITY_METRICS",
      description:
        "Assess maintainability, complexity, technical debt, code smells, and adherence to coding standards and best practices.",
      id: "QUAL-03",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "PERFORMANCE_OPT",
      description:
        "Detect performance bottlenecks, inefficient algorithms, slow database queries, and resource usage issues.",
      id: "PERF-04",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "DEPENDENCY_SCAN",
      description:
        "Scan package dependencies for known vulnerabilities, outdated versions, and security advisories.",
      id: "DEP-05",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI_REMEDIATION",
      description:
        "Get custom AI prompts tailored to your specific issues, ready to use with Cursor, Windsurf, or GitHub Copilot.",
      id: "AI-06",
    },
  ];

  const features = [
    {
      icon: <Lock className="h-4 w-4" />,
      text: "OWASP TOP 10 & CWE DETECTION",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      text: "PDF / CSV / JSON REPORTING",
    },
    {
      icon: <Code className="h-4 w-4" />,
      text: "15+ LANGUAGE SUPPORT",
    },
    {
      icon: <Brain className="h-4 w-4" />,
      text: "AI FIX GENERATION",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      text: "REAL-TIME ANALYSIS",
    },
    {
      icon: <Users className="h-4 w-4" />,
      text: "TEAM COLLABORATION",
    },
    {
      icon: <Globe className="h-4 w-4" />,
      text: "WEB PLATFORM / NO INSTALL",
    },
    {
      icon: <CheckCircle className="h-4 w-4" />,
      text: "FREE TIER ACCESS",
    },
  ];

  return (
    <section className="bg-background border-border relative overflow-hidden border-b py-20">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Terminal className="h-96 w-96" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-mono text-3xl font-bold tracking-tight uppercase md:text-4xl">
              Platform_Overview{" "}
              <span className="text-primary animate-pulse">▐</span>
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl font-mono text-sm leading-relaxed md:text-base">
              Code Guardian is a next-generation AI-powered security analysis
              platform that combines advanced static analysis with cutting-edge
              AI insights.
            </p>

            <div className="mb-12 flex flex-wrap justify-center gap-4">
              <div className="border-primary/30 bg-primary/5 hover:bg-primary/10 flex cursor-default items-center gap-2 border px-4 py-2 transition-colors">
                <CheckCircle className="text-primary h-4 w-4" />
                <span className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
                  Free Access
                </span>
              </div>
              <div className="border-primary/30 bg-primary/5 hover:bg-primary/10 flex cursor-default items-center gap-2 border px-4 py-2 transition-colors">
                <Star className="text-primary h-4 w-4" />
                <span className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
                  AI Core
                </span>
              </div>
              <div className="border-primary/30 bg-primary/5 hover:bg-primary/10 flex cursor-default items-center gap-2 border px-4 py-2 transition-colors">
                <Globe className="text-primary h-4 w-4" />
                <span className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
                  Global Scale
                </span>
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                className="group border-border bg-card hover:border-primary/50 hover:bg-muted/5 relative overflow-hidden border p-6 transition-all duration-300"
              >
                <div className="bg-muted text-muted-foreground absolute top-0 right-0 px-2 py-1 font-mono text-[10px] opacity-50">
                  {cap.id}
                </div>

                <div className="text-primary mb-4 origin-left transition-transform duration-300 group-hover:scale-110">
                  {cap.icon}
                </div>

                <h3 className="group-hover:text-primary mb-2 font-mono text-sm font-bold tracking-wider uppercase transition-colors">
                  {cap.title}
                </h3>

                <p className="text-muted-foreground font-mono text-xs leading-relaxed">
                  {cap.description}
                </p>

                <div className="bg-primary absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full" />
              </div>
            ))}
          </div>

          <div className="border-border bg-background relative border p-8">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%,rgba(0,0,0,0.02))] bg-[length:4px_4px]" />

            <h3 className="text-foreground border-border relative mb-6 inline-block border-b pb-2 font-mono text-lg font-bold tracking-wider uppercase">
              System Specifications
            </h3>

            <div className="relative grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="group flex items-center gap-3">
                  <div className="bg-primary/40 group-hover:bg-primary h-1 w-1 transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground font-mono text-xs tracking-tight uppercase transition-colors">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-border relative mt-8 border-t border-dashed pt-6">
              <h4 className="text-foreground mb-4 flex items-center gap-2 font-mono text-sm font-bold uppercase">
                <Rocket className="text-primary h-4 w-4" />
                Operational_Advantages
              </h4>
              <ul className="text-muted-foreground space-y-2 font-mono text-xs">
                <li className="flex gap-2">
                  <span className="text-primary">&gt;</span> AI_INTEGRATION:
                  Custom prompts for major coding assistants
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">&gt;</span> INSTANT_DEPLOY:
                  Zero-setup web architecture
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">&gt;</span> FULL_SPECTRUM:
                  Security, quality, performance in one pass
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">&gt;</span> ACTIONABLE_DATA:
                  Specific fix implementations provided
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
