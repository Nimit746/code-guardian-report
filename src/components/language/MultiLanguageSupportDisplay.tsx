/**
 * Multi-Language Support Display Component
 * Shows comprehensive language support information and statistics
 */

import React from "react";
import {
  Code2,
  Shield,
  FileCode,
  Terminal,
  Zap,
  Globe,
  Database,
  AlertTriangle,
  Server,
} from "lucide-react";
import { multiLanguageSecurityAnalyzer } from "@/services/analysis/MultiLanguageSecurityAnalyzer";

interface LanguageStats {
  language: string;
  fileCount: number;
  lineCount: number;
  percentage: number;
  securityIssues: number;
  ruleCount: number;
}

interface MultiLanguageSupportDisplayProps {
  languageStats?: LanguageStats[];
  totalFiles?: number;
  totalLines?: number;
  showFeatures?: boolean;
}

const SUPPORTED_LANGUAGES = [
  {
    name: "JavaScript",
    iconLabel: "JS",
    extensions: [".js", ".jsx", ".mjs", ".cjs"],
    color: "text-yellow-500",
    ecosystem: "Web_Module",
  },
  {
    name: "TypeScript",
    iconLabel: "TS",
    extensions: [".ts", ".tsx", ".d.ts"],
    color: "text-blue-500",
    ecosystem: "Typed_Web_Module",
  },
  {
    name: "Python",
    iconLabel: "PY",
    extensions: [".py", ".pyw", ".pyi"],
    color: "text-green-500",
    ecosystem: "Data_Science_Core",
  },
  {
    name: "Java",
    iconLabel: "JAVA",
    extensions: [".java"],
    color: "text-red-500",
    ecosystem: "Enterprise_Backend",
  },
  {
    name: "C++",
    iconLabel: "C++",
    extensions: [".cpp", ".cxx", ".cc", ".hpp"],
    color: "text-purple-500",
    ecosystem: "High_Performance_Sys",
  },
  {
    name: "C",
    iconLabel: "C",
    extensions: [".c", ".h"],
    color: "text-slate-500",
    ecosystem: "Embedded_Systems",
  },
  {
    name: "Go",
    iconLabel: "GO",
    extensions: [".go"],
    color: "text-cyan-500",
    ecosystem: "Cloud_Native",
  },
  {
    name: "Rust",
    iconLabel: "RS",
    extensions: [".rs"],
    color: "text-orange-500",
    ecosystem: "Memory_Safe_Sys",
  },
  {
    name: "PHP",
    iconLabel: "PHP",
    extensions: [".php", ".phtml"],
    color: "text-indigo-500",
    ecosystem: "Server_Side_Script",
  },
  {
    name: "C#",
    iconLabel: "C#",
    extensions: [".cs", ".csx"],
    color: "text-violet-500",
    ecosystem: "Net_Framework",
  },
  {
    name: "Ruby",
    iconLabel: "RB",
    extensions: [".rb", ".rake"],
    color: "text-red-600",
    ecosystem: "Web_Framework",
  },
  {
    name: "Swift",
    iconLabel: "SW",
    extensions: [".swift"],
    color: "text-orange-400",
    ecosystem: "Apple_Ecosystem",
  },
  {
    name: "Kotlin",
    iconLabel: "KT",
    extensions: [".kt", ".kts"],
    color: "text-purple-400",
    ecosystem: "Android_Core",
  },
];

const SECURITY_FEATURES = [
  {
    title: "CODE_INJECTION_DETECT",
    description: "Identifies eval(), exec(), and dynamic code vectors.",
    languages: ["All"],
    icon: Shield,
  },
  {
    title: "SQL_INJECTION_PREVENT",
    description: "Detects unsafe query construction patterns.",
    languages: ["JavaScript", "Python", "Java", "PHP", "Go", "C#"],
    icon: Database,
  },
  {
    title: "XSS_VULN_SCAN",
    description: "Finds DOM manipulation and HTML injection risks.",
    languages: ["JavaScript", "TypeScript", "PHP"],
    icon: Globe,
  },
  {
    title: "BUFFER_OVERFLOW_W",
    description: "Identifies unsafe memory operations.",
    languages: ["C", "C++"],
    icon: AlertTriangle,
  },
  {
    title: "CMD_INJECTION_CHK",
    description: "Detects unsafe system command execution.",
    languages: ["Python", "PHP", "Go", "Java"],
    icon: Terminal,
  },
  {
    title: "DESERIALIZATION_FLAW",
    description: "Identifies insecure object deserialization.",
    languages: ["Java", "Python", "C#", "PHP"],
    icon: Server,
  },
  {
    title: "MACRO_WEAKNESS_CHK",
    description: "Detects weak encryption algorithms/keys.",
    languages: ["Java", "C#", "Go"],
    icon: Shield,
  },
  {
    title: "MEMORY_SAFETY_ANALYSIS",
    description: "Unsafe code blocks and pointer operations.",
    languages: ["Rust", "C++", "C"],
    icon: Zap,
  },
];

export const MultiLanguageSupportDisplay: React.FC<
  MultiLanguageSupportDisplayProps
> = ({
  languageStats = [],
  totalFiles = 0,
  totalLines = 0,
  showFeatures = true,
}) => {
  const analyzer = multiLanguageSecurityAnalyzer;

  return (
    <div className="space-y-12 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="bg-primary/20 h-px w-12"></div>
          <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase">
            SYSTEM_CORES // LANGUAGE_SUPPORT
          </span>
          <div className="bg-primary/20 h-px w-12"></div>
        </div>
        <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          MULTI-LANGUAGE <span className="text-primary">ANALYSIS</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl font-mono text-sm tracking-wide uppercase">
          {">"} 10+ Programming languages supported. Unified security protocol.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="border-primary/20 bg-background/50 group hover:border-primary/50 relative overflow-hidden border p-6 transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-10 transition-opacity group-hover:opacity-20">
            <Code2 className="h-16 w-16" />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-primary/10 border-primary/20 border p-1.5">
              <Code2 className="text-primary h-4 w-4" />
            </div>
            <span className="text-muted-foreground font-mono text-xs font-bold uppercase">
              SUPPORTED_LANGUAGES
            </span>
          </div>
          <p className="text-foreground mt-4 font-mono text-4xl font-bold">
            {SUPPORTED_LANGUAGES.length}
          </p>
          <div className="bg-muted mt-2 h-1 w-full overflow-hidden">
            <div className="bg-primary h-full w-full animate-pulse"></div>
          </div>
        </div>

        <div className="border-primary/20 bg-background/50 group hover:border-primary/50 relative overflow-hidden border p-6 transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-10 transition-opacity group-hover:opacity-20">
            <Shield className="h-16 w-16" />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="border border-green-500/20 bg-green-500/10 p-1.5">
              <Shield className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-muted-foreground font-mono text-xs font-bold uppercase">
              SECURITY_RULES
            </span>
          </div>
          <p className="text-foreground mt-4 font-mono text-4xl font-bold">
            170+
          </p>
          <div className="bg-muted mt-2 h-1 w-full overflow-hidden">
            <div className="h-full w-[85%] bg-green-500"></div>
          </div>
        </div>

        <div className="border-primary/20 bg-background/50 group hover:border-primary/50 relative overflow-hidden border p-6 transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-10 transition-opacity group-hover:opacity-20">
            <FileCode className="h-16 w-16" />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="border border-purple-500/20 bg-purple-500/10 p-1.5">
              <FileCode className="h-4 w-4 text-purple-500" />
            </div>
            <span className="text-muted-foreground font-mono text-xs font-bold uppercase">
              FILES_ANALYZED
            </span>
          </div>
          <p className="text-foreground mt-4 font-mono text-4xl font-bold">
            {totalFiles}
          </p>
          <div className="text-muted-foreground mt-2 font-mono text-[10px]">
            LC: {totalLines.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Supported Languages Grid */}
      <div className="border-primary/20 mb-12 border bg-black/40 p-1">
        <div className="border-primary/10 bg-card/20 border p-6 md:p-8">
          <div className="border-primary/10 mb-6 flex items-center justify-between border-b pb-4">
            <h3 className="flex items-center gap-2 font-mono text-lg font-bold">
              <Terminal className="text-primary h-5 w-5" />
              TARGET_ENVIRONMENTS
            </h3>
            <div className="flex gap-1">
              <div className="bg-primary/50 h-2 w-2 rounded-none"></div>
              <div className="bg-primary/30 h-2 w-2 rounded-none"></div>
              <div className="bg-primary/10 h-2 w-2 rounded-none"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const ruleCount = analyzer.getRuleCountForLanguage(
                lang.name.toLowerCase() as any
              );
              const stats = languageStats.find(
                (s) => s.language.toLowerCase() === lang.name.toLowerCase()
              );

              return (
                <div
                  key={lang.name}
                  className="border-primary/10 hover:border-primary/40 bg-background/40 hover:bg-background/60 group border p-4 transition-all"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-lg font-bold ${lang.color}`}
                      >
                        {lang.iconLabel}
                      </span>
                      <div>
                        <h3 className="font-mono text-sm font-bold uppercase">
                          {lang.name}
                        </h3>
                        <p className="text-muted-foreground font-mono text-[10px] uppercase">
                          [{lang.ecosystem}]
                        </p>
                      </div>
                    </div>
                    {stats && (
                      <span className="bg-primary/10 text-primary border-primary/20 border px-1.5 py-0.5 font-mono text-[10px]">
                        {stats.fileCount} FILES
                      </span>
                    )}
                  </div>

                  <div className="border-primary/5 mt-4 space-y-2 border-t border-dashed pt-4">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase">
                      <span className="text-muted-foreground">
                        Ruleset_Version:
                      </span>
                      <span>v{ruleCount}.0</span>
                    </div>

                    {stats && (
                      <>
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase">
                          <span className="text-muted-foreground">
                            Coverage:
                          </span>
                          <span
                            className={
                              stats.percentage > 80
                                ? "text-green-500"
                                : "text-yellow-500"
                            }
                          >
                            {stats.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="bg-muted h-1 w-full overflow-hidden">
                          <div
                            className="bg-primary h-full"
                            style={{ width: `${stats.percentage}%` }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security Features */}
      {showFeatures && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="border-primary/20 bg-card/30 border p-6">
            <div className="border-primary/20 mb-6 flex items-center gap-2 border-b pb-4">
              <Shield className="text-primary h-5 w-5" />
              <h3 className="font-mono text-sm font-bold uppercase">
                Active_Defense_Protocols
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {SECURITY_FEATURES.slice(0, 4).map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group flex items-start gap-3 p-2 transition-colors hover:bg-white/5"
                  >
                    <Icon className="text-primary mt-1 h-4 w-4 opacity-70 group-hover:opacity-100" />
                    <div>
                      <h4 className="text-foreground mb-0.5 font-mono text-xs font-bold">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground font-mono text-[10px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-primary/20 bg-card/30 border p-6">
            <div className="border-primary/20 mb-6 flex items-center gap-2 border-b pb-4">
              <AlertTriangle className="text-primary h-5 w-5" />
              <h3 className="font-mono text-sm font-bold uppercase">
                Heuristic_Scanners
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {SECURITY_FEATURES.slice(4).map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group flex items-start gap-3 p-2 transition-colors hover:bg-white/5"
                  >
                    <Icon className="text-primary mt-1 h-4 w-4 opacity-70 group-hover:opacity-100" />
                    <div>
                      <h4 className="text-foreground mb-0.5 font-mono text-xs font-bold">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground font-mono text-[10px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLanguageSupportDisplay;
