import React from "react";
import {
  TrendingUp,
  GitBranch,
  Shield,
  Activity,
  BarChart3,
  Code2,
  AlertTriangle,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnalysisResults } from "@/hooks/useAnalysis";

export type TabId =
  | "overview"
  | "repositories"
  | "history"
  | "analytics"
  | "comparison"
  | "quality"
  | "patterns"
  | "results";

interface GitHubNavigationTabsProps {
  selectedTab: TabId;
  setSelectedTab: (tab: TabId) => void;
  analysisResults: AnalysisResults | null;
}

export const GitHubNavigationTabs: React.FC<GitHubNavigationTabsProps> = ({
  selectedTab,
  setSelectedTab,
  analysisResults,
}) => {
  const tabs = [
    { id: "overview", icon: TrendingUp, label: "Overview" },
    { id: "repositories", icon: GitBranch, label: "Repositories" },
    { id: "history", icon: Activity, label: "History" },
    { id: "analytics", icon: Shield, label: "Analytics" },
    { id: "comparison", icon: BarChart3, label: "Compare" },
    { id: "quality", icon: Code2, label: "Quality" },
    { id: "patterns", icon: AlertTriangle, label: "Patterns" },
  ];

  return (
    <div className="scrollbar-hide mt-12 flex items-center gap-1 overflow-x-auto border-b border-border pb-0">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as TabId)}
            className={cn(
              "group relative flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all",
              selectedTab === tab.id
                ? "border-primary bg-muted/50 text-primary dark:border-blue-400/30 dark:text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground/80 dark:hover:border-border/50 dark:hover:text-muted-foreground"
            )}
          >
            <tab.icon
              className={cn(
                "h-4 w-4 transition-colors",
                selectedTab === tab.id
                  ? "text-primary dark:text-primary"
                  : "text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-muted-foreground"
              )}
            />
            {tab.label}
          </button>
        ))}

        {analysisResults && (
          <>
            <div className="mx-2 my-auto h-6 w-px bg-muted dark:bg-slate-700" />
            <button
              onClick={() => setSelectedTab("results")}
              className={cn(
                "group relative flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all",
                selectedTab === "results"
                  ? "border-emerald-500 bg-emerald-50/50 text-emerald-600 dark:border-emerald-400 dark:bg-emerald-900/10 dark:text-emerald-400"
                  : "border-transparent text-muted-foreground hover:border-emerald-300 hover:bg-emerald-50/30 hover:text-emerald-700 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/10 dark:hover:text-emerald-300"
              )}
            >
              <FileCode
                className={cn(
                  "h-4 w-4 transition-colors",
                  selectedTab === "results"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground group-hover:text-emerald-500"
                )}
              />
              Results
              <span
                className={cn(
                  "ml-1 rounded px-1.5 py-0.5 text-[10px] font-bold",
                  selectedTab === "results"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
                )}
              >
                {analysisResults.issues.length}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
