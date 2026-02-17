"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigation } from "@/lib/navigation-context";
import { AnimatedBackground } from "@/components/pages/about/AnimatedBackground";
import {
  Github,
  Shield,
  Activity,
  GitBranch,
  BarChart3,
  ArrowLeft,
  FileCode,
  Lock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RepositoryAnalysisGrid } from "@/components/github/RepositoryAnalysisGrid";
import { AnalysisHistorySection } from "@/components/github/AnalysisHistorySection";
import { SecurityAnalyticsSection } from "@/components/github/SecurityAnalyticsSection";
import { RepositoryActivityAnalytics } from "@/components/github/RepositoryActivityAnalytics";
import { RepositoryComparisonTool } from "@/components/github/RepositoryComparisonTool";
import { CodeQualityAnalytics } from "@/components/github/CodeQualityAnalytics";
import { VulnerabilityPatternAnalytics } from "@/components/github/VulnerabilityPatternAnalytics";
import { useGitHubRepositories } from "@/hooks/useGitHubRepositories";
import GitHubUsernameInput from "@/components/github/GitHubUsernameInput";
import GitHubRepositoryPermissionModal from "@/components/github/GitHubRepositoryPermissionModal";
import GitHubRepositoryList from "@/components/github/GitHubRepositoryList";
import { toast } from "sonner";
import { logger } from "@/utils/logger";
import { isValidGitHubUsername } from "@/utils/githubValidation";
import { AnalysisResults } from "@/hooks/useAnalysis";
import { cn } from "@/lib/utils";
import { GitHubProfileHeader } from "@/components/github/GitHubProfileHeader";
import { GitHubNavigationTabs } from "@/components/github/GitHubNavigationTabs";
import { Skeleton } from "@/components/ui/skeleton";

const EnhancedSecurityResults = lazy(() =>
  import("@/components/analysis/EnhancedSecurityResults").then((m) => ({
    default: m.EnhancedSecurityResults,
  }))
);

export const GitHubAnalysisPage: React.FC = () => {
  const { user, userProfile, isGitHubUser, signInWithGithub } = useAuth();
  const { navigateTo: _navigateTo } = useNavigation();
  const [selectedTab, setSelectedTab] = useState<
    | "overview"
    | "repositories"
    | "history"
    | "analytics"
    | "comparison"
    | "quality"
    | "patterns"
    | "results"
  >(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("github_selected_tab")
        : null;
    return (
      (stored as
        | "overview"
        | "repositories"
        | "history"
        | "analytics"
        | "comparison"
        | "quality"
        | "patterns"
        | "results") || "overview"
    );
  });
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showGitHubRepos, setShowGitHubRepos] = useState(true);
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);
  const [analyzedRepoName, setAnalyzedRepoName] = useState<string>("");

  // Wrapper to persist tab selection to localStorage
  const handleTabChange = (tab: typeof selectedTab) => {
    setSelectedTab(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem("github_selected_tab", tab);
    }
  };

  const [dashboardStats, setDashboardStats] = useState({
    repoCount: 0,
    avgScore: 0,
    totalIssues: 0,
    loading: true,
  });

  useEffect(() => {
    const loadDashboardStats = async () => {
      if (!user?.uid) return;

      try {
        const { GitHubAnalysisStorageService } =
          await import("@/services/storage/GitHubAnalysisStorageService");
        const storageService = new GitHubAnalysisStorageService();

        const [repos, trends] = await Promise.all([
          storageService.getUserRepositories(user.uid),
          storageService.getSecurityTrends(user.uid),
        ]);

        setDashboardStats({
          repoCount: repos.length,
          avgScore: trends.stats.averageScore,
          totalIssues: trends.stats.totalIssues,
          loading: false,
        });
      } catch (error) {
        logger.error("Failed to load dashboard stats:", error);
        setDashboardStats((prev) => ({ ...prev, loading: false }));
      }
    };

    loadDashboardStats();
  }, [user?.uid, selectedTab]);

  const {
    repositories,
    loading: reposLoading,
    error: reposError,
    hasGitHubAccount,
    permissionGranted,
    permissionDenied,
    grantPermission,
    denyPermission,
    setManualUsername,
    githubUser,
    refreshRepositories,
  } = useGitHubRepositories({
    email: userProfile?.email || null,
    enabled: !!user,
  });

  useEffect(() => {
    if (reposError) {
      toast.error(reposError, {
        duration: 6000,
        description: "Please try again or check your internet connection",
      });
    }
  }, [reposError]);

  useEffect(() => {
    const autoFetchGitHubData = async () => {
      if (!isGitHubUser) return;

      const username =
        userProfile?.githubUsername ||
        userProfile?.githubMetadata?.login ||
        null;

      if (!username) {
        return;
      }

      if (!isValidGitHubUsername(username)) {
        const storedUsername = localStorage.getItem("github_username");
        if (storedUsername === username) {
          localStorage.removeItem("github_username");
          localStorage.removeItem("github_repo_permission");
        }
        return;
      }

      const storedUsername = localStorage.getItem("github_username");
      if (storedUsername !== username) {
        localStorage.setItem("github_username", username);
        localStorage.setItem("github_repo_permission", "granted");
        const success = await setManualUsername(username);
        if (success) {
          logger.debug("Auto-fetched GitHub data for:", username);
        }
      } else if (repositories.length === 0 && !reposLoading) {
        refreshRepositories?.();
      }
    };

    autoFetchGitHubData();
  }, [
    isGitHubUser,
    userProfile?.githubUsername,
    userProfile?.githubMetadata?.login,
    setManualUsername,
    repositories.length,
    reposLoading,
    refreshRepositories,
  ]);

  const nonGithubConnected = !isGitHubUser;
  const githubAvatarUrl = nonGithubConnected
    ? githubUser?.avatar_url || null
    : userProfile?.githubMetadata?.avatarUrl || user?.photoURL || null;
  const githubDisplayName = nonGithubConnected
    ? githubUser?.name || githubUser?.login || null
    : userProfile?.displayName ||
      userProfile?.githubMetadata?.login ||
      user?.displayName ||
      null;
  const githubUsername = nonGithubConnected
    ? githubUser?.login || null
    : userProfile?.githubUsername || userProfile?.githubMetadata?.login || null;
  const totalGitHubRepos = nonGithubConnected
    ? githubUser?.public_repos || 0
    : userProfile?.githubMetadata?.publicRepos || 0;
  const isLoadingProfile = !githubUsername && isGitHubUser;

  useEffect(() => {
    if (
      !isGitHubUser &&
      hasGitHubAccount &&
      !permissionGranted &&
      !permissionDenied &&
      user
    ) {
      const timer = setTimeout(() => setShowPermissionModal(true), 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [
    hasGitHubAccount,
    permissionGranted,
    permissionDenied,
    isGitHubUser,
    user,
  ]);

  useEffect(() => {
    if (
      !isGitHubUser &&
      !hasGitHubAccount &&
      !permissionGranted &&
      !permissionDenied &&
      user &&
      userProfile?.email
    ) {
      const hasAskedForUsername = localStorage.getItem("github_username_asked");
      if (!hasAskedForUsername) {
        const timer = setTimeout(() => {
          setShowUsernameInput(true);
          localStorage.setItem("github_username_asked", "true");
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  }, [
    hasGitHubAccount,
    permissionGranted,
    permissionDenied,
    isGitHubUser,
    user,
    userProfile?.email,
  ]);

  const handleAllowGitHubAccess = async () => {
    localStorage.setItem("github_selected_tab", "analytics");
    setShowPermissionModal(false);
    const t = toast.loading("Fetching your repositories...");
    await grantPermission();
    toast.success("GitHub repositories loaded successfully!", { id: t });
    setShowGitHubRepos(true);
  };

  const handleDenyGitHubAccess = () => {
    setShowPermissionModal(false);
    denyPermission();
    toast.info("You can enable this later from settings.");
  };

  const handleManualUsernameSuccess = async (username: string) => {
    localStorage.setItem("github_selected_tab", "analytics");
    setShowUsernameInput(false);
    const t = toast.loading("Fetching your repositories...");
    await setManualUsername(username);
    toast.success("GitHub repositories loaded successfully!", { id: t });
    setShowGitHubRepos(true);
  };

  const handleSkipUsernameInput = () => {
    setShowUsernameInput(false);
    localStorage.setItem("github_repo_permission", "denied");
    toast.info("You can connect your GitHub account later.");
  };

  const openConnectGitHubPrompt = () => {
    if (hasGitHubAccount && !permissionDenied) {
      setShowPermissionModal(true);
    } else {
      setShowUsernameInput(true);
    }
  };

  const handleAnalyzeRepository = async (
    repoUrl: string,
    _repoName: string
  ) => {
    try {
      const { githubRepositoryService } =
        await import("@/services/githubRepositoryService");
      const { EnhancedAnalysisEngine } =
        await import("@/services/enhancedAnalysisEngine");
      const { GitHubAnalysisStorageService } =
        await import("@/services/storage/GitHubAnalysisStorageService");
      const { firebaseAnalysisStorage } =
        await import("@/services/storage/firebaseAnalysisStorage");

      const repoInfo = githubRepositoryService.parseGitHubUrl(repoUrl);
      if (!repoInfo) {
        toast.error("Invalid GitHub repository URL");
        return;
      }

      const progressToastId = toast.loading(
        "Preparing to analyze repository..."
      );

      try {
        let branch = repoInfo.branch;
        let repoDetails: {
          name?: string;
          fullName?: string;
          description?: string;
          defaultBranch?: string;
          default_branch?: string;
          size?: number;
          language?: string;
          stars?: number;
          forks?: number;
          openIssues?: number;
          private?: boolean;
          createdAt?: string;
          updatedAt?: string;
        } | null = null;
        if (!branch) {
          try {
            toast.loading("Checking repository details...", {
              id: progressToastId,
            });
            repoDetails = await githubRepositoryService.getRepositoryInfo(
              repoInfo.owner,
              repoInfo.repo
            );
            branch = repoDetails?.defaultBranch || repoDetails?.default_branch;
          } catch (err) {
            logger.warn("Failed to fetch repo info, defaulting to main", err);
            branch = "main";
          }
        }

        let lastUpdate = 0;
        let lastMessage = "";
        const zipFile = await githubRepositoryService.downloadRepositoryAsZip(
          repoInfo.owner,
          repoInfo.repo,
          branch || "main",
          (progress, message) => {
            const now = Date.now();
            if (
              (now - lastUpdate > 500 || progress === 100) &&
              message !== lastMessage
            ) {
              lastMessage = message;
              lastUpdate = now;
              setTimeout(() => {
                toast.loading(message, { id: progressToastId });
              }, 0);
            }
          }
        );

        toast.loading("Analyzing code...", { id: progressToastId });

        const analysisEngine = new EnhancedAnalysisEngine();
        const results = await analysisEngine.analyzeCodebase(zipFile);

        toast.loading("Saving analysis results...", { id: progressToastId });

        if (user?.uid) {
          const storageService = new GitHubAnalysisStorageService();
          await storageService.storeRepositoryAnalysis(user.uid, {
            name: repoInfo.repo,
            fullName: `${repoInfo.owner}/${repoInfo.repo}`,
            description:
              repoDetails?.description ||
              `Analysis of ${repoInfo.owner}/${repoInfo.repo}`,
            url: repoUrl,
            securityScore: results.summary.securityScore / 10,
            issuesFound: results.issues.length,
            criticalIssues: results.summary.criticalIssues,
            language:
              typeof results.languageDetection?.primaryLanguage === "string"
                ? results.languageDetection.primaryLanguage
                : results.languageDetection?.primaryLanguage?.name || "Unknown",
            stars: repoDetails?.stars || 0,
            forks: repoDetails?.forks || 0,
            duration: Number.parseFloat(results.analysisTime) || 0,
          });

          firebaseAnalysisStorage.setUserId(user.uid);
          const fileForStorage = new File(
            [zipFile],
            `${repoInfo.owner}-${repoInfo.repo}.zip`,
            { type: "application/zip" }
          );
          await firebaseAnalysisStorage.storeAnalysisResults(
            results,
            fileForStorage,
            [`github-${repoInfo.owner}-${repoInfo.repo}`],
            false
          );
        }

        toast.success(
          `Analysis complete! Found ${results.issues.length} issues.`,
          {
            id: progressToastId,
            duration: 4000,
          }
        );

        setAnalysisResults(results);
        setAnalyzedRepoName(`${repoInfo.owner}/${repoInfo.repo}`);
        setSelectedTab("results");
        localStorage.setItem("github_selected_tab", "results");
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        toast.error(`Analysis failed: ${errMsg}`, {
          id: progressToastId,
        });
        logger.error("Repository analysis failed:", error);
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to analyze repository: ${errMsg}`);
      logger.error("Error in handleAnalyzeRepository:", error);
    }
  };

  if (!user) {
    return (
      <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-4">
        {}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
          <div className="bg-muted/10 dark:bg-muted/10 absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full blur-[100px]" />
          <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-500/10" />
        </div>

        <Card className="bg-card/80 ring-border dark:ring-border w-full max-w-4xl overflow-hidden border-0 p-0 shadow-2xl ring-1 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg dark:from-white dark:to-slate-300">
                <Github className="h-8 w-8 text-white" />
              </div>

              <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl dark:text-white">
                GitHub Analysis
              </h1>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Connect your GitHub account to unlock advanced security
                insights, repository tracking, and automated code analysis.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={signInWithGithub}
                  size="lg"
                  className="h-12 w-full bg-[#24292F] text-base text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#24292F]/90 hover:shadow-xl dark:bg-white dark:text-[#24292F] dark:hover:bg-white/90"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Continue with GitHub
                </Button>

                {!user && (
                  <p className="text-muted-foreground text-center text-sm">
                    Don't have an account?{" "}
                    <a
                      href="https://github.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="border-border bg-muted/50 flex flex-col justify-center border-l p-8 md:p-12">
              <h3 className="text-foreground mb-6 flex items-center gap-2 font-semibold dark:text-white">
                <Shield className="text-primary h-5 w-5" />
                Premium Features
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: BarChart3,
                    title: "Deep Analysis",
                    desc: "Comprehensive security scanning and code quality metrics",
                    color: "text-primary",
                  },
                  {
                    icon: Activity,
                    title: "Real-time Tracking",
                    desc: "Monitor repository health and vulnerability patterns",
                    color: "text-primary",
                  },
                  {
                    icon: Lock,
                    title: "Security First",
                    desc: "Identify critical issues before they become threats",
                    color: "text-muted-foreground",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className={cn(
                        "bg-background dark:bg-muted flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm",
                        feature.color
                      )}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 bg-transparent">
        <GitHubRepositoryPermissionModal
          isOpen={showPermissionModal}
          email={userProfile?.email || ""}
          onAllow={handleAllowGitHubAccess}
          onDeny={handleDenyGitHubAccess}
          onClose={() => setShowPermissionModal(false)}
        />

        <GitHubUsernameInput
          isOpen={showUsernameInput}
          email={userProfile?.email || ""}
          onSuccess={handleManualUsernameSuccess}
          onSkip={handleSkipUsernameInput}
          onClose={() => setShowUsernameInput(false)}
        />

        {/* Hero Section */}
        <div className="border-border bg-background relative overflow-hidden border-b">
          <div className="bg-muted/50 absolute inset-0" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
            <GitHubProfileHeader
              githubAvatarUrl={githubAvatarUrl}
              githubDisplayName={githubDisplayName}
              githubUsername={githubUsername}
              totalGitHubRepos={totalGitHubRepos}
              isLoadingProfile={isLoadingProfile}
              dashboardStats={dashboardStats}
              openConnectGitHubPrompt={openConnectGitHubPrompt}
            />

            <GitHubNavigationTabs
              selectedTab={selectedTab}
              setSelectedTab={handleTabChange}
              analysisResults={analysisResults}
            />
          </div>
        </div>

        {}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {}
          {repositories.length > 0 && (
            <div className="mb-8">
              <Card className="border-border p-4 shadow-sm sm:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                      <Github className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-foreground text-lg font-semibold dark:text-white">
                        Your GitHub Repositories
                      </h2>
                      <p className="text-muted-foreground text-sm break-words">
                        Select a repository to analyze ({repositories.length}{" "}
                        repos)
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refreshRepositories?.()}
                      disabled={reposLoading}
                      className="w-full sm:w-auto"
                    >
                      {reposLoading ? "Loading..." : "Refresh"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGitHubRepos(!showGitHubRepos)}
                      className="w-full sm:w-auto"
                    >
                      {showGitHubRepos ? "Hide List" : "Show List"}
                    </Button>
                  </div>
                </div>
                {showGitHubRepos && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <GitHubRepositoryList
                      repositories={repositories}
                      onAnalyzeRepository={handleAnalyzeRepository}
                      loading={reposLoading}
                    />
                  </div>
                )}
              </Card>
            </div>
          )}

          {}
          {repositories.length === 0 &&
            !reposLoading &&
            !isGitHubUser &&
            !permissionGranted && (
              <div className="mb-8">
                <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50 p-8 text-center dark:border-purple-800/50 dark:bg-purple-900/10">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Github className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-foreground mb-2 text-xl font-semibold dark:text-white">
                    Connect Your GitHub Account
                  </h3>
                  <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                    Link your GitHub username to automatically load your
                    repositories for security analysis. Your public repos will
                    be available for scanning.
                  </p>
                  <Button
                    onClick={openConnectGitHubPrompt}
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Connect GitHub
                  </Button>
                </Card>
              </div>
            )}

          {}
          {reposLoading && repositories.length === 0 && (
            <div className="mb-8">
              <Card className="relative overflow-hidden border border-purple-200/70 bg-gradient-to-br from-purple-50 via-white to-slate-50 p-6 sm:p-8 dark:border-purple-900/60 dark:from-purple-950/40 dark:via-slate-950 dark:to-slate-900/60">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.2),_transparent_60%)]"
                  aria-hidden="true"
                ></div>
                <div className="relative space-y-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Skeleton
                      variant="avatar"
                      width={64}
                      height={64}
                      className="bg-purple-200/70 dark:bg-purple-900/70"
                    />
                    <div className="space-y-2">
                      <Skeleton
                        variant="text"
                        width={220}
                        height={16}
                        className="bg-purple-200/70 dark:bg-purple-900/70"
                      />
                      <Skeleton
                        variant="text"
                        width={160}
                        height={12}
                        className="bg-slate-200 dark:bg-slate-800"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={`repo-skeleton-${index}`}
                        className="border-border/60 rounded-xl border bg-white/70 p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60"
                      >
                        <div className="flex items-start gap-3">
                          <Skeleton
                            variant="avatar"
                            width={36}
                            height={36}
                            className="bg-slate-200 dark:bg-slate-800"
                          />
                          <div className="flex-1 space-y-2">
                            <Skeleton
                              variant="text"
                              width="70%"
                              height={12}
                              className="bg-slate-200 dark:bg-slate-800"
                            />
                            <Skeleton
                              variant="text"
                              width="90%"
                              height={10}
                              className="bg-slate-200 dark:bg-slate-800"
                            />
                            <Skeleton
                              variant="text"
                              width="60%"
                              height={10}
                              className="bg-slate-200 dark:bg-slate-800"
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Skeleton
                            variant="text"
                            width={90}
                            height={10}
                            className="bg-slate-200 dark:bg-slate-800"
                          />
                          <Skeleton
                            variant="button"
                            width={70}
                            height={28}
                            className="bg-slate-200 dark:bg-slate-800"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="space-y-6">
            {selectedTab === "overview" && (
              <div className="animate-in fade-in space-y-8 duration-500">
                <SecurityAnalyticsSection userId={user.uid} />
                <RepositoryActivityAnalytics userId={user.uid} />
              </div>
            )}

            {selectedTab === "repositories" && (
              <div className="animate-in fade-in duration-500">
                <RepositoryAnalysisGrid
                  userId={user.uid}
                  liveRepositories={repositories}
                  onAnalyzeRepository={handleAnalyzeRepository}
                  isLoadingLive={reposLoading}
                />
              </div>
            )}

            {selectedTab === "history" && (
              <div className="animate-in fade-in duration-500">
                <AnalysisHistorySection userId={user.uid} />
              </div>
            )}

            {selectedTab === "analytics" && (
              <div className="animate-in fade-in space-y-8 duration-500">
                <SecurityAnalyticsSection userId={user.uid} detailed />
                <RepositoryActivityAnalytics userId={user.uid} detailed />
              </div>
            )}

            {selectedTab === "comparison" && (
              <div className="animate-in fade-in duration-500">
                <RepositoryComparisonTool userId={user.uid} />
              </div>
            )}

            {selectedTab === "quality" && (
              <div className="animate-in fade-in duration-500">
                <CodeQualityAnalytics userId={user.uid} />
              </div>
            )}

            {selectedTab === "patterns" && (
              <div className="animate-in fade-in duration-500">
                <VulnerabilityPatternAnalytics userId={user.uid} />
              </div>
            )}

            {selectedTab === "results" && analysisResults && (
              <div className="animate-in fade-in space-y-6 duration-500">
                {}
                <Card className="border-border relative overflow-hidden p-4 shadow-sm sm:p-6">
                  <div className="pointer-events-none absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />

                  <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 sm:h-16 sm:w-16">
                        <FileCode className="h-8 w-8 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-foreground mb-1 text-xl font-bold sm:text-2xl dark:text-white">
                          Analysis Results
                        </h2>
                        <div className="text-muted-foreground flex min-w-0 items-center gap-2">
                          <GitBranch className="h-4 w-4" />
                          <span className="truncate">{analyzedRepoName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
                      <div className="text-left sm:text-right">
                        <div className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
                          {analysisResults.summary.securityScore}
                          <span className="text-muted-foreground text-xl font-medium">
                            /100
                          </span>
                        </div>
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          Security Score
                        </div>
                      </div>
                      <div className="bg-muted hidden h-12 w-px sm:block dark:bg-slate-700" />
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAnalysisResults(null);
                          setAnalyzedRepoName("");
                          setSelectedTab("overview");
                        }}
                        className="hover:bg-muted w-full sm:w-auto"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    </div>
                  </div>

                  {}
                  <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
                    {[
                      {
                        label: "Critical",
                        value: analysisResults.summary.criticalIssues,
                        color: "red",
                      },
                      {
                        label: "High",
                        value: analysisResults.summary.highIssues,
                        color: "orange",
                      },
                      {
                        label: "Medium",
                        value: analysisResults.summary.mediumIssues,
                        color: "yellow",
                      },
                      {
                        label: "Low",
                        value: analysisResults.summary.lowIssues,
                        color: "blue",
                      },
                      {
                        label: "Files",
                        value: analysisResults.totalFiles,
                        color: "slate",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-xl border p-4 transition-all",
                          stat.color === "red" &&
                            "border-red-100 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10",
                          stat.color === "orange" &&
                            "border-orange-100 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-900/10",
                          stat.color === "yellow" &&
                            "border-yellow-100 bg-yellow-50 dark:border-yellow-900/30 dark:bg-yellow-900/10",
                          stat.color === "blue" &&
                            "bg-muted border-blue-100 dark:border-blue-900/30 dark:bg-teal-900/10",
                          stat.color === "slate" &&
                            "bg-muted/50 border-slate-100"
                        )}
                      >
                        <div
                          className={cn(
                            "mb-1 text-2xl font-bold",
                            stat.color === "red" &&
                              "text-red-600 dark:text-red-400",
                            stat.color === "orange" &&
                              "text-orange-600 dark:text-orange-400",
                            stat.color === "yellow" &&
                              "text-yellow-600 dark:text-yellow-400",
                            stat.color === "blue" &&
                              "text-primary dark:text-primary",
                            stat.color === "slate" && "text-muted-foreground"
                          )}
                        >
                          {stat.value}
                        </div>
                        <div
                          className={cn(
                            "text-xs font-semibold tracking-wider uppercase",
                            stat.color === "red" &&
                              "text-red-700 dark:text-red-300",
                            stat.color === "orange" &&
                              "text-orange-700 dark:text-orange-300",
                            stat.color === "yellow" &&
                              "text-yellow-700 dark:text-yellow-300",
                            stat.color === "blue" &&
                              "text-teal-600 dark:text-teal-300",
                            stat.color === "slate" && "text-muted-foreground"
                          )}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {}
                <Suspense
                  fallback={
                    <div className="flex flex-col items-center justify-center py-12">
                      <Skeleton className="mb-4 h-12 w-12 rounded-full" />
                      <Skeleton className="h-4 w-48" />
                      <p className="text-muted-foreground mt-2">
                        Loading detailed analysis...
                      </p>
                    </div>
                  }
                >
                  <EnhancedSecurityResults results={analysisResults} />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
