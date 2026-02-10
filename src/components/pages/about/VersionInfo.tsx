import React from "react";
import { Code2, Cpu, Layers, Zap } from "lucide-react";
import { APP_VERSION } from "@/utils/version";

export const VersionInfo: React.FC = () => {
  const techStack = [
    {
      name: "React",
      icon: <Code2 className="h-4 w-4" />,
      color: "text-primary",
    },
    {
      name: "TypeScript",
      icon: <Layers className="h-4 w-4" />,
      color: "text-primary",
    },
    {
      name: "Next.js",
      icon: <Zap className="h-4 w-4" />,
      color: "text-black dark:text-white",
    },
    {
      name: "Tailwind",
      icon: <Cpu className="h-4 w-4" />,
      color: "text-primary",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-12">
      {/* Enhanced Version Badge */}
      <div className=" rounded-xl border border-border/50 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border/50/50/90">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary p-2">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="block text-sm font-medium text-muted-foreground">
              Version
            </span>
            <span className="gradient-text-animated text-lg font-bold">
              {APP_VERSION}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Tech Stack */}
      <div className=" rounded-xl border border-border/50 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border/50/50/90">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <span className="text-sm font-semibold text-foreground/80">
            Built with
          </span>
          <div className="flex items-center gap-3">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className=" glow-on-hover group rounded-lg border border-border/50 bg-white/50 px-3 py-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border/50 hover:bg-white/80/50/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`${tech.color} transition-transform duration-300 group-hover:scale-125`}
                  >
                    {tech.icon}
                  </span>
                  <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-foreground dark:text-slate-200 dark:group-hover:text-white">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
