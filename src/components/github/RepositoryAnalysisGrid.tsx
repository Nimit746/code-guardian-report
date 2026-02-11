import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GitBranch,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Plus,
  TrendingUp,
  Search,
  Shield,
  Code,
  Calendar,
} from "lucide-react";
import { GitHubAnalysisStorageService } from "@/services/storage/GitHubAnalysisStorageService";
import { githubRepositoryService } from "@/services/githubRepositoryService";
import { EnhancedAnalysisEngine } from "@/services/enhancedAnalysisEngine";
import { toast } from "sonner";
import { logger } from "@/utils/logger";
import { cn } from "@/lib/utils";

interface Repository {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  url: string;
  lastAnalyzed: Date;
  securityScore: number;
  issuesFound: number;
  criticalIssues: number;
  language: string;
  stars: number;
  forks: number;
}

interface LiveGitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  private: boolean;
}

interface RepositoryAnalysisGridProps {
  userId: string;
  liveRepositories?: LiveGitHubRepository[];
  onAnalyzeRepository?: (repoUrl: string, repoName: string) => Promise<void>;
  isLoadingLive?: boolean;
}

export const RepositoryAnalysisGrid: React.FC<RepositoryAnalysisGridProps> = ({
  userId,
  liveRepositories = [],
  onAnalyzeRepository,
  isLoadingLive = false,
}) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "critical" | "recent" | "github"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingRepoId, setAnalyzingRepoId] = useState<string | null>(null);

  useEffect(() => {
    loadRepositories();
  }, [userId]);

  const loadRepositories = async () => {
    setLoading(true);
    try {
      const storageService = new GitHubAnalysisStorageService();
      const repos = await storageService.getUserRepositories(userId);
      setRepositories(repos);
    } catch (error) {
      logger.error("Error loading repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeNewRepo = async () => {
    if (!repoUrl.trim()) {
      toast.error("Please enter a GitHub repository URL");
      return;
    }

    if (!repoUrl.startsWith("https://github.com/")) {
      toast.error(
        "Please enter a valid GitHub URL (https://github.com/owner/repo)"
      );
      return;
    }

    setIsAnalyzing(true);
    const progressToastId = toast.loading("Preparing to analyze repository...");

    try {
      const repoInfo = githubRepositoryService.parseGitHubUrl(repoUrl);
      if (!repoInfo) {
        throw new Error("Invalid GitHub repository URL");
      }

      let branch = repoInfo.branch;
      if (!branch) {
        try {
          toast.loading("Checking repository details...", {
            id: progressToastId,
          });
          const details = await githubRepositoryService.getRepositoryInfo(
            repoInfo.owner,
            repoInfo.repo
          );
          branch = details.defaultBranch;
        } catch {
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
            setTimeout(
              () => toast.loading(message, { id: progressToastId }),
              0
            );
          }
        }
      );

      toast.loading("Analyzing code...", { id: progressToastId });

      const analysisEngine = new EnhancedAnalysisEngine();
      const results = await analysisEngine.analyzeCodebase(zipFile);

      toast.loading("Saving analysis results...", { id: progressToastId });

      const storageService = new GitHubAnalysisStorageService();
      await storageService.storeRepositoryAnalysis(userId, {
        name: repoInfo.repo,
        fullName: `${repoInfo.owner}/${repoInfo.repo}`,
        description: `Analysis of ${repoInfo.owner}/${repoInfo.repo}`,
        url: repoUrl,
        securityScore: results.summary.securityScore / 10,
        issuesFound: results.issues.length,
        criticalIssues: results.summary.criticalIssues,
        language:
          typeof results.languageDetection?.primaryLanguage === "string"
            ? results.languageDetection.primaryLanguage
            : results.languageDetection?.primaryLanguage?.name || "Unknown",
        stars: 0,
        forks: 0,
        duration: parseFloat(results.analysisTime) || 0,
      });

      // Store full analysis results
      const { firebaseAnalysisStorage } =
        await import("@/services/storage/firebaseAnalysisStorage");
      firebaseAnalysisStorage.setUserId(userId);
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

      toast.success(
        `Analysis complete! Found ${results.issues.length} issues.`,
        {
          id: progressToastId,
          duration: 4000,
        }
      );

      setRepoUrl("");
      await loadRepositories();
    } catch (error: any) {
      toast.error(`Analysis failed: ${error.message}`, { id: progressToastId });
      logger.error("Repository analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReanalyze = async (repo: Repository) => {
    setAnalyzingRepoId(repo.id);
    const progressToastId = toast.loading(`Re-analyzing ${repo.name}...`);

    try {
      const repoInfo = githubRepositoryService.parseGitHubUrl(repo.url);
      if (!repoInfo) {
        throw new Error("Invalid repository URL");
      }

      let branch = "main";
      try {
        const details = await githubRepositoryService.getRepositoryInfo(
          repoInfo.owner,
          repoInfo.repo
        );
        branch = details.defaultBranch;
      } catch {
        // Keep default
      }

      const zipFile = await githubRepositoryService.downloadRepositoryAsZip(
        repoInfo.owner,
        repoInfo.repo,
        branch,
        (progress, message) => {
          if (progress === 100 || progress % 25 === 0) {
            toast.loading(message, { id: progressToastId });
          }
        }
      );

      toast.loading("Analyzing code...", { id: progressToastId });

      const analysisEngine = new EnhancedAnalysisEngine();
      const results = await analysisEngine.analyzeCodebase(zipFile);

      const storageService = new GitHubAnalysisStorageService();
      await storageService.storeRepositoryAnalysis(userId, {
        name: repo.name,
        fullName: repo.fullName,
        description: repo.description,
        url: repo.url,
        securityScore: results.summary.securityScore / 10,
        issuesFound: results.issues.length,
        criticalIssues: results.summary.criticalIssues,
        language:
          typeof results.languageDetection?.primaryLanguage === "string"
            ? results.languageDetection.primaryLanguage
            : results.languageDetection?.primaryLanguage?.name || repo.language,
        stars: repo.stars,
        forks: repo.forks,
        duration: parseFloat(results.analysisTime) || 0,
      });

      // Store full analysis results
      const { firebaseAnalysisStorage } =
        await import("@/services/storage/firebaseAnalysisStorage");
      firebaseAnalysisStorage.setUserId(userId);
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

      toast.success(
        `Re-analysis complete! Found ${results.issues.length} issues.`,
        {
          id: progressToastId,
          duration: 4000,
        }
      );

      await loadRepositories();
    } catch (error: any) {
      toast.error(`Re-analysis failed: ${error.message}`, {
        id: progressToastId,
      });
      logger.error("Repository re-analysis failed:", error);
    } finally {
      setAnalyzingRepoId(null);
    }
  };

  const getSecurityBadge = (score: number) => {
    if (score >= 8) {
      return (
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:border-emerald-900/30 dark:bg-emerald-900/20 dark:text-emerald-400">
          <CheckCircle className="h-3.5 w-3.5" />
          Excellent
        </div>
      );
    } else if (score >= 6) {
      return (
        <div className="flex items-center gap-1.5 rounded-full border border-yellow-100 bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600 dark:border-yellow-900/30 dark:bg-yellow-900/20 dark:text-yellow-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          Good
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
          <XCircle className="h-3.5 w-3.5" />
          Needs Attention
        </div>
      );
    }
  };

  // Filter analyzed repositories
  const filteredRepositories = repositories.filter((repo) => {
    // Apply search filter first
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        repo.name.toLowerCase().includes(query) ||
        repo.fullName.toLowerCase().includes(query) ||
        (repo.description?.toLowerCase().includes(query) ?? false);
      if (!matchesSearch) return false;
    }

    if (filter === "github") return false; // Don't show analyzed repos in github filter
    if (filter === "critical") return repo.criticalIssues > 0;
    if (filter === "recent") {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return repo.lastAnalyzed > dayAgo;
    }
    return true;
  });

  // Filter live GitHub repositories
  const filteredLiveRepos = liveRepositories.filter((repo) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        repo.name.toLowerCase().includes(query) ||
        repo.full_name.toLowerCase().includes(query) ||
        (repo.description?.toLowerCase().includes(query) ?? false);
      if (!matchesSearch) return false;
    }
    return filter === "all" || filter === "github";
  });

  // Check if a live repo has already been analyzed
  const isRepoAnalyzed = (liveRepo: LiveGitHubRepository) => {
    return repositories.some(
      (r) => r.fullName.toLowerCase() === liveRepo.full_name.toLowerCase()
    );
  };

  const showLiveRepos = filter === "all" || filter === "github";
  const isLoading = loading || isLoadingLive;

  if (isLoading && repositories.length === 0 && liveRepositories.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border-border p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="bg-muted mb-2 h-5 w-40 animate-pulse rounded"></div>
                <div className="bg-muted h-4 w-56 animate-pulse rounded"></div>
              </div>
              <div className="bg-muted h-8 w-8 animate-pulse rounded-full"></div>
            </div>
            <div className="bg-muted mb-4 h-16 w-full animate-pulse rounded"></div>
            <div className="flex gap-2">
              <div className="bg-muted h-8 w-24 animate-pulse rounded"></div>
              <div className="bg-muted h-8 w-24 animate-pulse rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* New Repository Input */}
      <div className="group relative">
        <div className="bg-primary absolute -inset-0.5 rounded-2xl opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
        <Card className="border-border bg-card relative p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="w-full flex-1">
              <h3 className="text-foreground mb-2 flex items-center gap-2 text-lg font-semibold">
                <Plus className="text-primary dark:text-primary h-5 w-5" />
                Analyze New Repository
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Enter a public GitHub repository URL to scan for security
                vulnerabilities and code quality issues.
              </p>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <GitBranch className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
                  <Input
                    type="url"
                    placeholder="https://github.com/owner/repository"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      !isAnalyzing &&
                      handleAnalyzeNewRepo()
                    }
                    disabled={isAnalyzing}
                    className="border-border bg-muted focus:ring-primary h-11 pl-10 transition-all focus:ring-2"
                  />
                </div>
                <Button
                  onClick={handleAnalyzeNewRepo}
                  disabled={isAnalyzing || !repoUrl.trim()}
                  className="bg-primary shadow-primary/10 hover:bg-primary/90 h-11 px-6 font-medium text-white shadow-lg transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-muted hidden h-24 w-px md:block" />

            <div className="flex gap-8 px-4">
              <div className="text-center">
                <div className="text-foreground text-2xl font-bold">
                  {repositories.length}
                </div>
                <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Analyzed
                </div>
              </div>
              <div className="text-center">
                <div className="text-foreground text-2xl font-bold">
                  {repositories.reduce((acc, r) => acc + r.issuesFound, 0)}
                </div>
                <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Issues
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="bg-muted p-1/50 flex flex-wrap gap-2 rounded-lg">
          {[
            {
              id: "all",
              label: "All Repositories",
              count: repositories.length + liveRepositories.length,
            },
            {
              id: "github",
              label: "GitHub Repos",
              count: liveRepositories.length,
            },
            { id: "critical", label: "Critical Issues" },
            { id: "recent", label: "Recently Analyzed" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() =>
                setFilter(f.id as "all" | "github" | "critical" | "recent")
              }
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                filter === f.id
                  ? "bg-card text-foreground dark:bg-muted dark:text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
              {f.count !== undefined && f.count > 0 && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs",
                    filter === f.id
                      ? "bg-muted text-foreground/80 dark:bg-muted/50 dark:text-foreground"
                      : "bg-muted/50 text-muted-foreground dark:bg-muted/30"
                  )}
                >
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border h-9 w-64 bg-transparent pl-9"
          />
        </div>
      </div>

      {/* Live GitHub Repositories Section */}
      {showLiveRepos && filteredLiveRepos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Code className="text-muted-foreground h-5 w-5" />
            <h3 className="text-foreground text-lg font-semibold">
              Your GitHub Repositories
            </h3>
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              {filteredLiveRepos.length} repos
            </span>
            {isLoadingLive && (
              <RefreshCw className="text-muted-foreground h-4 w-4 animate-spin" />
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLiveRepos
              .slice(0, filter === "github" ? undefined : 6)
              .map((repo) => {
                const analyzed = isRepoAnalyzed(repo);
                return (
                  <Card
                    key={repo.id}
                    className={cn(
                      "group border-border overflow-hidden p-4 transition-all duration-300 hover:shadow-lg",
                      analyzed &&
                        "border-emerald-200 dark:border-emerald-800/50"
                    )}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-foreground truncate font-semibold">
                          {repo.name}
                        </h4>
                        <p className="text-muted-foreground truncate text-xs">
                          {repo.full_name}
                        </p>
                      </div>
                      {analyzed && (
                        <div className="ml-2 flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <CheckCircle className="h-3 w-3" />
                          Analyzed
                        </div>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                      {repo.description || "No description provided."}
                    </p>

                    <div className="text-muted-foreground mb-3 flex items-center gap-4 text-xs">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="bg-muted h-2.5 w-2.5 rounded-full" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={analyzed ? "outline" : "default"}
                        className={cn(
                          "flex-1",
                          !analyzed && "bg-primary hover:bg-primary/90"
                        )}
                        onClick={() =>
                          onAnalyzeRepository?.(repo.html_url, repo.name)
                        }
                        disabled={
                          isAnalyzing && analyzingRepoId === String(repo.id)
                        }
                      >
                        {isAnalyzing && analyzingRepoId === String(repo.id) ? (
                          <>
                            <RefreshCw className="mr-1.5 h-3 w-3 animate-spin" />
                            Analyzing...
                          </>
                        ) : analyzed ? (
                          <>
                            <RefreshCw className="mr-1.5 h-3 w-3" />
                            Re-analyze
                          </>
                        ) : (
                          <>
                            <Shield className="mr-1.5 h-3 w-3" />
                            Analyze
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="px-2"
                        onClick={() => window.open(repo.html_url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </div>

          {filter === "all" && filteredLiveRepos.length > 6 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setFilter("github")}
                className="text-muted-foreground"
              >
                View all {filteredLiveRepos.length} repositories
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Analyzed Repository Grid */}
      {filter !== "github" && (
        <>
          {filteredRepositories.length > 0 && (
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-500" />
              <h3 className="text-foreground text-lg font-semibold dark:text-white">
                Analyzed Repositories
              </h3>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                {filteredRepositories.length} repos
              </span>
            </div>
          )}

          {filteredRepositories.length === 0 &&
          filteredLiveRepos.length === 0 ? (
            <Card className="border-border bg-muted/50 text-center/50 border-2 border-dashed p-16">
              <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <GitBranch className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                No repositories found
              </h3>
              <p className="text-muted-foreground mx-auto max-w-md">
                {searchQuery
                  ? "No repositories match your search."
                  : filter === "all"
                    ? "You haven't analyzed any repositories yet. Start by entering a GitHub URL above."
                    : "No repositories match the selected filter."}
              </p>
            </Card>
          ) : filteredRepositories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRepositories.map((repo) => (
                <Card
                  key={repo.id}
                  className="group border-border hover:border-border dark:hover:border-border overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="mr-4 min-w-0 flex-1">
                        <h3 className="text-foreground group-hover:text-primary truncate text-lg font-semibold transition-colors">
                          {repo.name}
                        </h3>
                        <p className="text-muted-foreground truncate text-sm">
                          {repo.fullName}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {getSecurityBadge(repo.securityScore)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 line-clamp-2 h-10 text-sm">
                      {repo.description || "No description provided."}
                    </p>

                    {/* Metrics Grid */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="bg-muted p-3/50 rounded-lg">
                        <div className="text-muted-foreground mb-1 text-xs">
                          Issues
                        </div>
                        <div className="text-foreground flex items-center gap-2 font-semibold">
                          <AlertTriangle className="text-muted-foreground h-4 w-4" />
                          {repo.issuesFound}
                        </div>
                      </div>
                      <div className="bg-muted p-3/50 rounded-lg">
                        <div className="text-muted-foreground mb-1 text-xs">
                          Score
                        </div>
                        <div className="text-foreground flex items-center gap-2 font-semibold">
                          <Shield className="h-4 w-4 text-emerald-500" />
                          {repo.securityScore}/10
                        </div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="text-muted-foreground mb-6 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Code className="h-3 w-3" />
                          {repo.language}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(repo.lastAnalyzed).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 border-t border-slate-100 pt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-muted flex-1"
                        onClick={() =>
                          window.open(repo.url, "_blank", "noopener,noreferrer")
                        }
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-muted dark:text-primary flex-1 dark:hover:bg-teal-900/20"
                        onClick={() => handleReanalyze(repo)}
                        disabled={analyzingRepoId === repo.id}
                      >
                        <RefreshCw
                          className={cn(
                            "mr-2 h-4 w-4",
                            analyzingRepoId === repo.id && "animate-spin"
                          )}
                        />
                        Re-Analyze
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
