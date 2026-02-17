import { Button } from "@/components/ui/button";
import {
  Users,
  ExternalLink,
  Code2,
  ShieldAlert,
  Crown,
  User,
  Zap,
  Star,
  Globe,
  Hash,
  Cpu,
  Activity,
  Brain,
} from "lucide-react";
import { openUrlInNewTab } from "./utils";

const MeetDeveloperSection = () => {
  const teamMembers = [
    {
      name: "Aditya Kumar Tiwari",
      role: "Team_Lead // Security_Arch",
      id: "OP-01",
      icon: <Crown className="h-4 w-4" />,
      description:
        "Lead operative specializing in security architecture and vulnerability heuristics.",
      expertise: ["Leadership", "Pen_Testing", "Sec_Arch", "Vuln_Analysis"],
    },
    {
      name: "Mohammad Ehshan",
      role: "Backend_Ops // API_Core",
      id: "OP-02",
      icon: <Code2 className="h-4 w-4" />,
      description:
        "Server-side infrastructure and API throughput optimization specialist.",
      expertise: ["Backend_Sys", "API_Design", "DB_Schema", "Node.js"],
    },
    {
      name: "Vishupal Goyal",
      role: "Frontend_Ops // UI_UX",
      id: "OP-03",
      icon: <User className="h-4 w-4" />,
      description:
        "Interface architecture and user experience protocol designer.",
      expertise: ["React_Core", "UI_Protocol", "UX_Flow", "Responsive_Grid"],
    },
    {
      name: "Aayush Tonk",
      role: "Full_Stack // Sys_Admin",
      id: "OP-04",
      icon: <Zap className="h-4 w-4" />,
      description: "Full-stack integration and system performance architect.",
      expertise: ["Sys_Design", "DevOps", "Perf_Opt", "Analysis"],
    },
    {
      name: "Muneer Ali",
      role: "Dev_Ops // QA_Testing",
      id: "OP-05",
      icon: <Star className="h-4 w-4" />,
      description:
        "Quality assurance and code integrity verification specialist.",
      expertise: ["Code_Review", "Unit_Test", "Documentation", "Integ_Test"],
    },
  ];

  const technologies = [
    "React_19x",
    "TypeScript_5x",
    "Next.js_15x",
    "Tailwind_4x",
    "LLM_Integ",
    "Recharts_3x",
    "Radix_UI",
    "Node.js",
    "Web_Crypto",
    "IndexedDB",
    "WASM",
  ];

  return (
    <section className="border-border bg-background relative overflow-hidden border-t py-24">
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 right-0 p-12 opacity-5">
        <Users className="h-96 w-96" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Hash className="text-primary h-4 w-4" />
              <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase">
                Personnel_Data
              </span>
            </div>
            <h2 className="mb-6 font-mono text-3xl font-bold tracking-tight uppercase md:text-5xl">
              Command Unit: Team Blitz
            </h2>
            <div className="mb-8 flex justify-center">
              <div className="bg-muted/10 border-border flex items-center gap-4 border px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs uppercase">
                  Status: ACTIVE
                </span>
                <span className="bg-border h-3 w-[1px]" />
                <span className="text-primary font-mono text-xs uppercase">
                  Clearance: Lvl_5
                </span>
              </div>
            </div>

            {/* Team Blitz Link */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-mono text-xs tracking-wider uppercase"
                onClick={() =>
                  openUrlInNewTab("https://teamblitz.netlify.app/")
                }
              >
                <Globe className="mr-2 h-4 w-4" />
                Access_Team_Portal
                <ExternalLink className="icon-xs ml-2 h-3 w-3 opacity-50" />
              </Button>
            </div>
          </div>

          {/* Team Grid */}
          <div className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative">
                {/* Card Body */}
                <div className="border-border bg-background/50 hover:bg-muted/10 relative h-full overflow-hidden border p-6 transition-colors">
                  {/* Hover Corner Access */}
                  <div className="bg-primary/10 border-primary/20 absolute top-0 right-0 flex h-8 w-8 items-center justify-center border-b border-l opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="text-primary h-4 w-4" />
                  </div>

                  <div className="mb-4 flex items-start justify-between">
                    <div className="border-border bg-background border p-2">
                      {member.icon}
                    </div>
                    <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                      ID: {member.id}
                    </span>
                  </div>

                  <h3 className="group-hover:text-primary mb-1 font-mono text-lg font-bold tracking-tight uppercase transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-primary/80 mb-4 font-mono text-xs uppercase">
                    {member.role}
                  </div>

                  <p className="text-muted-foreground mb-6 line-clamp-2 text-sm">
                    {member.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="border-border bg-muted/20 text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px] uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Matrix */}
          <div className="border-border bg-muted/5 relative border">
            <div className="bg-primary text-primary-foreground absolute top-0 left-0 px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase">
              System_Architecture_V3.3.0
            </div>

            <div className="p-8 pt-12">
              <div className="grid gap-12 md:grid-cols-2">
                {/* Tech Specs */}
                <div>
                  <h4 className="text-foreground mb-6 flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase">
                    <Cpu className="h-4 w-4" />
                    Tech_Integ_Matrix
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <div
                        key={tech}
                        className="bg-background border-border flex items-center gap-2 border px-3 py-1.5"
                      >
                        <div className="bg-primary h-1.5 w-1.5 rounded-none" />
                        <span className="text-muted-foreground font-mono text-xs uppercase">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* USP Data */}
                <div>
                  <h4 className="text-foreground mb-6 flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase">
                    <ShieldAlert className="h-4 w-4" />
                    Mission_Critical_Caps
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 border-primary/20 mt-0.5 border p-1.5">
                        <Activity className="text-primary h-3 w-3" />
                      </div>
                      <div>
                        <h5 className="text-foreground font-mono text-xs font-bold uppercase">
                          Persistent_Intel
                        </h5>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Cross-session storage with indexed heuristics.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 border-primary/20 mt-0.5 border p-1.5">
                        <Brain className="text-primary h-3 w-3" />
                      </div>
                      <div>
                        <h5 className="text-foreground font-mono text-xs font-bold uppercase">
                          Neural_Coupling
                        </h5>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Direct LLM context injection for patch synthesis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { MeetDeveloperSection };
