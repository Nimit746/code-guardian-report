/**
 * Custom Rules Section for About Page
 * Displays information about the custom rules engine feature
 * Industrial Design Variant
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  Target,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Terminal,
  Share2,
  Database,
} from "lucide-react";

const CustomRulesSectionComponent: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="bg-background/90 absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="bg-primary/20 h-px w-12"></div>
            <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase">
              SYS_MODULE_04 // POLICY_ENGINE
            </span>
            <div className="bg-primary/20 h-px w-12"></div>
          </div>
          <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight md:text-5xl">
            PROTOCOL <span className="text-primary">DEFINITION</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl font-mono text-lg">
            {">"} Initiate custom security directives. Enforce organizational
            policy through granular rule configuration.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-primary/20 bg-card/50 hover:border-primary/50 group relative overflow-hidden rounded-none border transition-all duration-300">
            <div className="translate-y--8 absolute top-0 right-0 h-16 w-16 translate-x-8 rotate-45 bg-gradient-to-b from-green-500/10 to-transparent"></div>
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center border border-green-500/20">
                <Code className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="font-mono text-xl">
                PATTERN_MATCHING
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-mono text-xs">
                Deploy comprehensive regex and AST-based scanning logic
                localized to project architecture.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 hover:border-primary/50 group relative overflow-hidden rounded-none border transition-all duration-300">
            <div className="bg-primary/10 translate-y--8 absolute top-0 right-0 h-16 w-16 translate-x-8 rotate-45 bg-gradient-to-b from-transparent to-transparent"></div>
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center border border-blue-500/20">
                <Target className="text-primary h-6 w-6" />
              </div>
              <CardTitle className="font-mono text-xl">
                GLOBAL_ENFORCEMENT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-mono text-xs">
                Synchronize security standards across all operational units.
                Mandate compliance via central directive.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 hover:border-primary/50 group relative overflow-hidden rounded-none border transition-all duration-300">
            <div className="translate-y--8 absolute top-0 right-0 h-16 w-16 translate-x-8 rotate-45 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center border border-purple-500/20">
                <Share2 className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle className="font-mono text-xl">
                SHARED_INTELLIGENCE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-mono text-xs">
                Export and import rule sets defined by community specialists and
                internal security teams.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Syntax Reference Terminal */}
          <Card className="border-primary/20 rounded-none border bg-black/40 backdrop-blur-sm">
            <CardHeader className="border-primary/10 border-b pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-mono text-lg">
                  <Terminal className="text-primary h-5 w-5" />
                  SYNTAX_DATABASE
                </CardTitle>
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-400">
                    TYPE: REGEX_SCAN
                  </span>
                  <span className="font-mono">ID: R-01</span>
                </div>
                <div className="border-primary/20 bg-muted/20 relative rounded-sm border p-3 font-mono text-xs">
                  <span className="text-green-500">{">"}</span> pattern:{" "}
                  <span className="text-orange-400">
                    api[_-]?key\s*=\s*["']([^"']+)["']
                  </span>
                  <div className="text-muted-foreground mt-2 border-t border-white/5 pt-2">
                    // Detect hardcoded API keys
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span className="font-mono text-purple-400">
                    TYPE: AST_QUERY
                  </span>
                  <span className="font-mono">ID: A-04</span>
                </div>
                <div className="border-primary/20 bg-muted/20 relative rounded-sm border p-3 font-mono text-xs">
                  <span className="text-green-500">{">"}</span> selector:{" "}
                  <span className="text-blue-400">
                    FunctionDeclaration[async=true]:not(:has(TryStatement))
                  </span>
                  <div className="text-muted-foreground mt-2 border-t border-white/5 pt-2">
                    // Flag unhandled async operations
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Advantages */}
          <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
            <div className="border-primary/10 bg-card/30 hover:border-primary/40 border p-4 transition-colors">
              <h4 className="text-foreground mb-2 flex items-center gap-2 font-mono text-sm font-bold">
                <ShieldCheck className="text-primary h-4 w-4" />
                SEC_COMPLIANCE
              </h4>
              <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                <li>{">"} PCI-DSS Verification</li>
                <li>{">"} HIPAA Data Controls</li>
                <li>{">"} GDPR Proto-Checks</li>
              </ul>
            </div>

            <div className="border-primary/10 bg-card/30 hover:border-primary/40 border p-4 transition-colors">
              <h4 className="text-foreground mb-2 flex items-center gap-2 font-mono text-sm font-bold">
                <CheckCircle2 className="text-primary h-4 w-4" />
                QA_STANDARDS
              </h4>
              <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                <li>{">"} Naming Conventions</li>
                <li>{">"} Doc-Block Requirements</li>
                <li>{">"} No-Console Production</li>
              </ul>
            </div>

            <div className="border-primary/10 bg-card/30 hover:border-primary/40 border p-4 transition-colors">
              <h4 className="text-foreground mb-2 flex items-center gap-2 font-mono text-sm font-bold">
                <Gauge className="text-primary h-4 w-4" />
                PERF_METRICS
              </h4>
              <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                <li>{">"} Memory Leak Detection</li>
                <li>{">"} Complexity Analysis</li>
                <li>{">"} Blocking Ops Check</li>
              </ul>
            </div>

            <div className="border-primary/10 bg-card/30 hover:border-primary/40 border p-4 transition-colors">
              <h4 className="text-foreground mb-2 flex items-center gap-2 font-mono text-sm font-bold">
                <Database className="text-primary h-4 w-4" />
                KNOWLEDGE_BASE
              </h4>
              <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                <li>{">"} Institutional Memory</li>
                <li>{">"} Auto-Onboarding</li>
                <li>{">"} Pattern Library</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CustomRulesSection = React.memo(CustomRulesSectionComponent);
