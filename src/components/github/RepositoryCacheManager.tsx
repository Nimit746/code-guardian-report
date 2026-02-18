/**
 * Repository Cache Manager Component
 * Displays cache statistics and provides management controls
 */

import { useState } from "react";
import { useRepositoryCache } from "@/hooks/useRepositoryCache";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Database,
  Trash2,
  RefreshCw,
  HardDrive,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";

export function RepositoryCacheManager() {
  const {
    stats,
    isLoading,
    error,
    loadStats,
    clearCache,
    cleanup,
    listCachedRepositories,
    getCacheHitRate,
    formatBytes,
  } = useRepositoryCache();

  const [repositories, setRepositories] = useState<any[]>([]);
  const [showRepositories, setShowRepositories] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);

  const handleClearCache = async () => {
    if (!confirm("Are you sure you want to clear all cached repositories?")) {
      return;
    }

    setIsClearing(true);
    const success = await clearCache();
    setIsClearing(false);

    if (success) {
      setShowRepositories(false);
      setRepositories([]);
    }
  };

  const handleCleanup = async () => {
    setIsCleaning(true);
    await cleanup();
    setIsCleaning(false);
  };

  const handleShowRepositories = async () => {
    if (!showRepositories) {
      const repos = await listCachedRepositories();
      setRepositories(repos);
    }
    setShowRepositories(!showRepositories);
  };

  const hitRate = getCacheHitRate();
  const totalRequests = stats.hits + stats.misses;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Repository Cache
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Repository Cache
        </CardTitle>
        <CardDescription>
          Cache statistics and management for downloaded repositories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Cache Statistics Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <HardDrive className="h-4 w-4" />
              Cached Repos
            </div>
            <div className="text-2xl font-bold">{stats.totalEntries}</div>
            <div className="text-muted-foreground text-xs">
              {formatBytes(stats.totalSize)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Hit Rate
            </div>
            <div className="text-2xl font-bold">{hitRate.toFixed(1)}%</div>
            <div className="text-muted-foreground text-xs">
              {stats.hits} / {totalRequests} requests
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4" />
              Cache Hits
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.hits}
            </div>
            <div className="text-muted-foreground text-xs">
              Served from cache
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4" />
              Cache Misses
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats.misses}
            </div>
            <div className="text-muted-foreground text-xs">
              Downloaded fresh
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        {stats.evictions > 0 && (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>
              {stats.evictions} entries evicted due to space constraints
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={loadStats}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Stats
          </Button>

          <Button
            onClick={handleCleanup}
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isCleaning}
          >
            <Trash2 className="h-4 w-4" />
            {isCleaning ? "Cleaning..." : "Remove Expired"}
          </Button>

          <Button
            onClick={handleShowRepositories}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Database className="h-4 w-4" />
            {showRepositories ? "Hide" : "Show"} Cached Repos
          </Button>

          <Button
            onClick={handleClearCache}
            variant="destructive"
            size="sm"
            className="gap-2"
            disabled={isClearing || stats.totalEntries === 0}
          >
            <Trash2 className="h-4 w-4" />
            {isClearing ? "Clearing..." : "Clear All"}
          </Button>
        </div>

        {/* Repository List */}
        {showRepositories && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Cached Repositories</h4>
            {repositories.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No repositories in cache
              </p>
            ) : (
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {repositories.map((repo) => {
                  const age = Date.now() - repo.timestamp;
                  const ageMinutes = Math.floor(age / 1000 / 60);
                  const ageHours = Math.floor(ageMinutes / 60);
                  const ageDays = Math.floor(ageHours / 24);

                  let ageDisplay = "";
                  if (ageDays > 0) {
                    ageDisplay = `${ageDays}d ago`;
                  } else if (ageHours > 0) {
                    ageDisplay = `${ageHours}h ago`;
                  } else {
                    ageDisplay = `${ageMinutes}m ago`;
                  }

                  return (
                    <div
                      key={repo.key}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          {repo.owner}/{repo.repo}
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <Badge variant="secondary" className="text-xs">
                            {repo.branch}
                          </Badge>
                          <span>{formatBytes(repo.size)}</span>
                          <span>•</span>
                          <span>Accessed {repo.accessCount}x</span>
                          <span>•</span>
                          <span>{ageDisplay}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Performance Insights */}
        {totalRequests > 0 && (
          <div className="border-t pt-4">
            <h4 className="mb-2 text-sm font-semibold">Performance Insights</h4>
            <div className="text-muted-foreground space-y-1 text-sm">
              {hitRate >= 50 && (
                <p className="text-green-600 dark:text-green-400">
                  ✓ Excellent cache performance - reducing GitHub API calls by{" "}
                  {hitRate.toFixed(0)}%
                </p>
              )}
              {hitRate < 50 && hitRate > 0 && (
                <p className="text-amber-600 dark:text-amber-400">
                  ⚠ Moderate cache performance - consider analyzing the same
                  repositories more frequently
                </p>
              )}
              {stats.totalSize > 400 * 1024 * 1024 && (
                <p className="text-amber-600 dark:text-amber-400">
                  ⚠ Cache size is large ({formatBytes(stats.totalSize)}) -
                  consider clearing old entries
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
