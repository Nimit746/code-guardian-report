import React from "react";
import { UploadCloud, Sliders, MessageSquare, BarChart3 } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysisResults } from "@/hooks/useAnalysis";

interface TabNavigationProps {
  currentTab: string;
  analysisResults: AnalysisResults | null;
  isRedirecting?: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  currentTab,
  analysisResults,
  isRedirecting = false,
}) => {
  const tabClass =
    "relative z-10 flex min-w-[48px] flex-shrink-0 items-center justify-center gap-0 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm sm:min-w-[110px] sm:gap-2 sm:px-5";

  return (
    <TabsList
      className="mb-4 flex w-full gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1 sm:mb-6 sm:justify-center sm:gap-1"
      role="tablist"
      aria-label="Main navigation tabs"
    >
      <TabsTrigger
        value="upload"
        className={tabClass}
        role="tab"
        aria-controls="upload-panel"
        aria-selected={currentTab === "upload"}
        aria-label="Upload Code"
      >
        <UploadCloud className="mr-0 h-4 w-4 sm:mr-1.5" aria-hidden="true" />
        <span className="hidden whitespace-nowrap sm:inline">Upload Code</span>
      </TabsTrigger>

      <TabsTrigger
        value="ai-config"
        className={tabClass}
        role="tab"
        aria-controls="ai-config-panel"
        aria-selected={currentTab === "ai-config"}
        aria-label="AI Config"
      >
        <Sliders className="mr-0 h-4 w-4 sm:mr-1.5" aria-hidden="true" />
        <span className="hidden whitespace-nowrap sm:inline">AI Config</span>
      </TabsTrigger>

      <TabsTrigger
        value="prompts"
        className={tabClass}
        role="tab"
        aria-controls="prompts-panel"
        aria-selected={currentTab === "prompts"}
        aria-label="Prompts"
      >
        <MessageSquare className="mr-0 h-4 w-4 sm:mr-1.5" aria-hidden="true" />
        <span className="hidden whitespace-nowrap sm:inline">Prompts</span>
      </TabsTrigger>

      <TabsTrigger
        value="results"
        className={`${tabClass} ${
          isRedirecting ? "animate-pulse" : ""
        }`}
        disabled={!analysisResults}
        role="tab"
        aria-controls="results-panel"
        aria-selected={currentTab === "results"}
        aria-disabled={!analysisResults}
        aria-label="Results"
      >
        <BarChart3 className="mr-0 h-4 w-4 sm:mr-1.5" aria-hidden="true" />
        <span className="hidden whitespace-nowrap sm:inline">
          {isRedirecting ? "Loading..." : "Results"}
        </span>
      </TabsTrigger>
    </TabsList>
  );
};
