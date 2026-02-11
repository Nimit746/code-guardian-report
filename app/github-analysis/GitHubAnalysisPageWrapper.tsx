"use client";

import dynamic from "next/dynamic";

const GitHubAnalysisPageClient = dynamic(
  () => import("./GitHubAnalysisPageClient"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-border border-t-primary h-10 w-10 animate-spin rounded-full border-4" />
          <p className="text-muted-foreground text-sm">
            Loading GitHub Analysis...
          </p>
        </div>
      </div>
    ),
  }
);

export default function GitHubAnalysisPageWrapper() {
  return <GitHubAnalysisPageClient />;
}
