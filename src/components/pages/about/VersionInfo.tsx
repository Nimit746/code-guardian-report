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
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 dark:bg-primary rounded-xl p-2">
            <Code2 className="text-primary h-5 w-5 dark:text-white" />
          </div>
          <div>
            <span className="dark:text-muted-foreground block text-sm font-medium text-slate-500">
              Version
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {APP_VERSION}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Tech Stack */}
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <span className="dark:text-foreground/80 text-sm font-semibold text-slate-700">
            Built with
          </span>
          <div className="flex items-center gap-3">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="group rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`${tech.color} transition-transform duration-300 group-hover:scale-125`}
                  >
                    {tech.icon}
                  </span>
                  <span className="text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white">
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
