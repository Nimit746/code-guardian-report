import React from "react";
import { Code2, Cpu, Layers, Zap, Terminal } from "lucide-react";
import { APP_VERSION } from "@/utils/version";

const VersionInfoComponent: React.FC = () => {
  const techStack = [
    {
      name: "React",
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      name: "TypeScript",
      icon: <Layers className="h-4 w-4" />,
    },
    {
      name: "Next.js",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      name: "Tailwind",
      icon: <Cpu className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
      {/* Version Badge */}
      <div className="group border-primary/20 bg-background/50 hover:border-primary/50 relative overflow-hidden border px-6 py-4 transition-colors">
        <div className="bg-primary/20 group-hover:bg-primary absolute top-0 left-0 h-full w-1 transition-colors" />

        <div className="flex items-center gap-4">
          <div className="bg-primary/10 border-primary/20 border p-2">
            <Terminal className="text-primary h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="text-muted-foreground block font-mono text-[10px] font-medium tracking-widest uppercase">
              System_Version
            </span>
            <span className="text-foreground font-mono text-lg font-bold">
              v{APP_VERSION}
            </span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="border-border bg-background/50 flex flex-col items-center gap-4 border px-6 py-4 sm:flex-row">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Architecture //
        </span>
        <div className="flex items-center gap-2">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="group border-border bg-muted/20 hover:border-primary/50 hover:bg-primary/5 relative cursor-default border px-3 py-1.5 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  {tech.icon}
                </span>
                <span className="text-muted-foreground group-hover:text-foreground font-mono text-xs font-medium uppercase">
                  {tech.name}
                </span>
              </div>

              {/* Corner accent on hover */}
              <div className="border-primary absolute top-0 right-0 h-1.5 w-1.5 border-t border-r opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VersionInfo = React.memo(VersionInfoComponent);
