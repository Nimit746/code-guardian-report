"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  History,
  Filter,
  Download,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Bug,
  Shield,
  User,
  Database,
  Search,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  firebaseAnalysisStorage,
  type FirebaseAnalysisData,
} from "../services/storage/firebaseAnalysisStorage";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

import { logger } from "@/utils/logger";
interface HistoryPageProps {
  onAnalysisSelect?: (analysis: FirebaseAnalysisData) => void;
  onNavigateBack?: () => void;
}

export const HistoryPage = ({
  onAnalysisSelect,
  onNavigateBack,
}: HistoryPageProps) => {
  const { toast } = useToast();

  const [analysisHistory, setAnalysisHistory] = useState<
    FirebaseAnalysisData[]
  >([]);
  const [filteredHistory, setFilteredHistory] = useState<
    FirebaseAnalysisData[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "all" | "week" | "month" | "year"
  >("all");
  const [selectedSeverity, setSelectedSeverity] = useState<
    "all" | "critical" | "high" | "medium" | "low"
  >("all");
  const [analysisToDelete, setAnalysisToDelete] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  type UserStats = {
    totalAnalyses?: number;
    totalIssuesFound?: number;
    totalFilesAnalyzed?: number;
    averageSecurityScore?: number;
  };
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  const { user: currentUser } = useAuth();

  const loadAnalysisHistory = useCallback(async () => {
    if (!currentUser?.uid) {
      logger.debug("No user authenticated for history loading");
      return;
    }

    logger.debug("Loading analysis history for user:", currentUser.uid);
    setIsLoading(true);

    try {
      firebaseAnalysisStorage.setUserId(currentUser.uid);
      logger.debug("Firebase service user ID set");

      const history = await firebaseAnalysisStorage.getUserAnalysisHistory(
        currentUser.uid
      );
      logger.debug(`Retrieved history: ${history.length} analyses`);
      logger.debug("History data:", history);

      const deduplicatedHistory = history.filter((analysis, index, array) => {
        const firstOccurrence = array.findIndex(
          (item) =>
            item.fileName === analysis.fileName &&
            item.fileHash === analysis.fileHash
        );
        return index === firstOccurrence;
      });

      logger.debug(
        `Deduplicated history: ${deduplicatedHistory.length} unique analyses`
      );

      setAnalysisHistory(deduplicatedHistory);

      toast({
        title: "History Loaded",
        description: `Found ${deduplicatedHistory.length} unique analysis results.`,
      });

      if (deduplicatedHistory.length === 0) {
        logger.debug("No analysis history found for this user");
        toast({
          title: "No History Yet",
          description: "Upload and analyze some code to see your history here.",
        });
      }
    } catch (err) {
      logger.error("Error loading analysis history:", err);

      toast({
        title: "Failed to Load History",
        description: `Could not load your analysis history: ${err instanceof Error ? err.message : String(err)}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, toast]);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribe = firebaseAnalysisStorage.subscribe((data) => {
      setAnalysisHistory(data);
    });

    firebaseAnalysisStorage.setUserId(currentUser.uid);

    loadAnalysisHistory();

    loadUserStats();

    return () => {
      unsubscribe?.();
    };
  }, [currentUser?.uid]);

  useEffect(() => {
    filterHistory();
  }, [analysisHistory, searchTerm, selectedTimeRange, selectedSeverity]);

  const loadUserStats = async () => {
    if (!currentUser?.uid) return;

    try {
      const stats = await firebaseAnalysisStorage.getUserStats(currentUser.uid);
      setUserStats(stats);
    } catch (error) {
      logger.error("Error loading user stats:", error);
    }
  };

  const filterHistory = () => {
    let filtered = [...analysisHistory];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (analysis) =>
          analysis.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          analysis.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          analysis.results.issues?.some(
            (issue) =>
              issue.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
              issue.message?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedTimeRange !== "all") {
      const now = new Date();
      const timeRanges = {
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000,
      } as const;

      const cutoff = new Date(now.getTime() - timeRanges[selectedTimeRange]);
      filtered = filtered.filter((analysis) => {
        type FireTimestamp = { toDate?: () => Date; seconds?: number };
        const t = analysis.createdAt as
          | FireTimestamp
          | Date
          | string
          | number
          | null
          | undefined;
        let analysisDate: Date;
        if (t && typeof (t as FireTimestamp).toDate === "function") {
          analysisDate = (t as FireTimestamp).toDate!();
        } else if (t && typeof (t as FireTimestamp).seconds === "number") {
          analysisDate = new Date((t as FireTimestamp).seconds! * 1000);
        } else if (t instanceof Date) {
          analysisDate = t as Date;
        } else if (typeof t === "string" || typeof t === "number") {
          analysisDate = new Date(t);
        } else {
          analysisDate = new Date();
        }
        return analysisDate >= cutoff;
      });
    }

    if (selectedSeverity !== "all") {
      filtered = filtered.filter((analysis) =>
        analysis.results.issues?.some(
          (issue) => issue.severity.toLowerCase() === selectedSeverity
        )
      );
    }

    setFilteredHistory(filtered);
  };

  const confirmDelete = (analysisId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnalysisToDelete(analysisId);
    setIsDeleteOpen(true);
  };

  const executeDelete = async () => {
    if (!analysisToDelete) return;

    try {
      await firebaseAnalysisStorage.deleteAnalysisResults(analysisToDelete);
      setAnalysisHistory((prev) =>
        prev.filter((a) => a.id !== analysisToDelete)
      );

      toast({
        title: "Analysis Deleted",
        description: "Analysis has been permanently deleted.",
      });

      loadUserStats();
    } catch (error) {
      logger.error("Error deleting analysis:", error);
      toast({
        title: "Delete Failed",
        description: "Could not delete analysis.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteOpen(false);
      setAnalysisToDelete(null);
    }
  };

  const handleViewAnalysis = (
    analysis: FirebaseAnalysisData,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    if (onAnalysisSelect) {
      onAnalysisSelect(analysis);
    }

    toast({
      title: "Analysis Loaded",
      description: `Viewing results for ${analysis.fileName}`,
    });
  };

  const exportAnalysisHistory = () => {
    try {
      const exportData = {
        user: {
          id: currentUser?.uid,
          email: currentUser?.email,
          exportDate: new Date().toISOString(),
        },
        stats: userStats,
        analyses: filteredHistory.map((analysis) => ({
          ...analysis,
          createdAt: analysis.createdAt?.toDate
            ? analysis.createdAt.toDate().toISOString()
            : analysis.createdAt,
          updatedAt: analysis.updatedAt?.toDate
            ? analysis.updatedAt.toDate().toISOString()
            : analysis.updatedAt,
        })),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analysis-history-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: "Your analysis history has been exported.",
      });
    } catch {
      toast({
        title: "Export Failed",
        description: "Could not export analysis history.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: unknown) => {
    try {
      let date: Date;

      type FireTimestamp = { toDate?: () => Date; seconds?: number };
      const t = timestamp as
        | FireTimestamp
        | Date
        | string
        | number
        | null
        | undefined;

      if (!t || t === "") {
        return "N/A";
      }

      if (typeof (t as FireTimestamp).toDate === "function") {
        date = (t as FireTimestamp).toDate!();
      } else if (typeof (t as FireTimestamp).seconds === "number") {
        date = new Date((t as FireTimestamp).seconds! * 1000);
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else if (typeof t === "string" || typeof t === "number") {
        const parsed = new Date(t);

        if (isNaN(parsed.getTime())) {
          return "N/A";
        }
        date = parsed;
      } else {
        return "N/A";
      }

      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } catch (error) {
      logger.error("Error formatting date:", { error, timestamp });
      return "Invalid Date";
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              Please sign in to view your analysis history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onNavigateBack}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-muted relative min-h-screen overflow-hidden">
      {}

      <div className="relative z-10 container mx-auto space-y-6 px-4 py-8 sm:space-y-8 sm:py-12">
        {}
        <div className="mb-8">
          <div className="border-border bg-card rounded-lg border p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary rounded-md p-3 text-white shadow-sm">
                    <History className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
                      Analysis History
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                      Your personal security analysis results & statistics
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                {onNavigateBack && (
                  <Button
                    variant="outline"
                    onClick={onNavigateBack}
                    className="border-border text-foreground/80 hover:bg-muted w-full sm:w-auto"
                  >
                    Back to Home
                  </Button>
                )}
                <Button
                  onClick={exportAnalysisHistory}
                  className="bg-primary hover:bg-primary/90 w-full text-white shadow-sm sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export History
                </Button>
              </div>
            </div>
          </div>
        </div>

        {}
        {userStats && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                label: "Total Analyses",
                value: userStats.totalAnalyses || 0,
                icon: Database,
                gradient: "from-blue-500 to-cyan-500",
                glow: "blue",
              },
              {
                label: "Issues Found",
                value: userStats.totalIssuesFound || 0,
                icon: Bug,
                gradient: "from-amber-500 to-orange-500",
                glow: "amber",
              },
              {
                label: "Files Analyzed",
                value: userStats.totalFilesAnalyzed || 0,
                icon: FileText,
                gradient: "from-emerald-500 to-teal-500",
                glow: "emerald",
              },
              {
                label: "Avg Score",
                value: userStats.averageSecurityScore || "--",
                icon: Shield,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="border-border bg-card rounded-lg border p-4 shadow-sm sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted text-muted-foreground rounded-md p-2.5">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-foreground text-2xl font-bold dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {}
        <div className="border-border bg-card rounded-lg border p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Filter className="text-muted-foreground h-5 w-5" />
              <span className="text-foreground font-semibold dark:text-white">
                Filters & Search
              </span>
            </div>
            {(searchTerm ||
              selectedTimeRange !== "all" ||
              selectedSeverity !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTimeRange("all");
                  setSelectedSeverity("all");
                }}
                className="text-muted-foreground h-8 rounded-lg hover:bg-white/5 hover:text-white"
              >
                <X className="mr-2 h-3 w-3" />
                Clear Filters
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
            <div className="relative lg:col-span-4">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search by filename, tags, or issue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full pl-9"
              />
            </div>

            <div className="lg:col-span-3">
              <Select
                value={selectedTimeRange}
                onValueChange={(value) =>
                  setSelectedTimeRange(
                    value as "all" | "week" | "month" | "year"
                  )
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-3">
              <Select
                value={selectedSeverity}
                onValueChange={(value) =>
                  setSelectedSeverity(
                    value as "all" | "critical" | "high" | "medium" | "low"
                  )
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-2">
              <Button
                onClick={loadAnalysisHistory}
                className="bg-primary hover:bg-primary/90 h-10 w-full text-white"
              >
                <Filter className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {}
        <div className="border-border bg-card rounded-lg border shadow-sm">
          {}
          <div className="border-border border-b px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground flex items-center gap-3 text-xl font-bold dark:text-white">
                  <div className="bg-primary h-6 w-1.5 rounded-full" />
                  Your Analysis Results
                  <span className="bg-muted text-muted-foreground ml-2 rounded-full px-2.5 py-0.5 text-sm font-medium">
                    {filteredHistory.length}
                  </span>
                </h2>
                {filteredHistory.length !== analysisHistory.length && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    Showing {filteredHistory.length} of {analysisHistory.length}{" "}
                    analyses
                  </p>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="mt-4 h-4 w-48" />
                <span className="text-muted-foreground mt-2">
                  Loading your analysis history...
                </span>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="py-16 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-2xl" />
                  <div className="relative rounded-full border border-white/10 bg-white/5 p-6">
                    <History className="text-muted-foreground h-16 w-16" />
                  </div>
                </div>
                <h3 className="mt-6 mb-2 text-xl font-semibold text-white">
                  {analysisHistory.length === 0
                    ? "No Analysis History Yet"
                    : "No Results Found"}
                </h3>
                <p className="text-muted-foreground mx-auto max-w-md">
                  {analysisHistory.length === 0
                    ? "Start analyzing your code to see results here. Your analysis history will appear once you upload and scan some code."
                    : "Try adjusting your search filters to find what you're looking for."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="group border-border hover:bg-muted/50 cursor-pointer border-b p-6 last:border-0"
                    onClick={(e) => handleViewAnalysis(analysis, e)}
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 space-y-4">
                        {}
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-foreground text-lg font-bold dark:text-white">
                            {analysis.fileName}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              analysis.syncStatus === "synced"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {analysis.syncStatus}
                          </span>
                          {analysis.tags && analysis.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {analysis.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                          {[
                            {
                              icon: Calendar,
                              value: formatDate(analysis.createdAt),
                            },
                            {
                              icon: FileText,
                              value: `${analysis.results.totalFiles} files`,
                            },
                            {
                              icon: Bug,
                              value: `${analysis.results.issues?.length || 0} issues`,
                            },
                            {
                              icon: Shield,
                              value: `Score: ${analysis.results.summary?.securityScore || "--"}`,
                            },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="text-muted-foreground flex items-center gap-2 text-sm"
                            >
                              <item.icon className="text-muted-foreground h-4 w-4" />
                              <span>{item.value}</span>
                            </div>
                          ))}
                        </div>

                        {}
                        {analysis.results.issues &&
                          analysis.results.issues.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {["critical", "high", "medium", "low"].map(
                                (severity) => {
                                  const count =
                                    analysis.results.issues?.filter(
                                      (issue) =>
                                        issue.severity.toLowerCase() ===
                                        severity
                                    ).length || 0;

                                  if (count === 0) return null;

                                  const severityStyles: Record<string, string> =
                                    {
                                      critical:
                                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                                      high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
                                      medium:
                                        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                                      low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
                                    };

                                  return (
                                    <span
                                      key={severity}
                                      className={`rounded-md px-2.5 py-1 text-xs font-medium uppercase ${severityStyles[severity]}`}
                                    >
                                      {severity}: {count}
                                    </span>
                                  );
                                }
                              )}
                            </div>
                          )}
                      </div>

                      {}
                      <div className="flex items-center gap-2 lg:flex-col lg:gap-2">
                        <Button
                          onClick={(e) => handleViewAnalysis(analysis, e)}
                          className="bg-primary hover:bg-primary/90 w-full text-white"
                          size="sm"
                        >
                          <Eye className="mr-1.5 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          onClick={(e) => confirmDelete(analysis.id, e)}
                          variant="outline"
                          className="border-border text-foreground/80 w-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this analysis? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={executeDelete}>
                Delete Analysis
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
