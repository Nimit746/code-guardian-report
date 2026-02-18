/**
 * React Hook for Repository Cache Management
 * Provides easy access to cache statistics and management functions
 */

import { useState, useEffect, useCallback } from "react";
import {
  repositoryCacheService,
  CacheStats,
} from "@/services/storage/repositoryCacheService";
import { logger } from "@/utils/logger";

export function useRepositoryCache() {
  const [stats, setStats] = useState<CacheStats>({
    totalEntries: 0,
    totalSize: 0,
    hits: 0,
    misses: 0,
    evictions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load cache statistics
   */
  const loadStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await repositoryCacheService.init();
      const cacheStats = await repositoryCacheService.getStats();
      setStats(cacheStats);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load cache stats";
      logger.error("Error loading cache stats:", err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear all cached repositories
   */
  const clearCache = useCallback(async () => {
    try {
      setError(null);
      await repositoryCacheService.clear();
      await loadStats();
      logger.info("Cache cleared successfully");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to clear cache";
      logger.error("Error clearing cache:", err);
      setError(message);
      return false;
    }
  }, [loadStats]);

  /**
   * Delete a specific cached repository
   */
  const deleteRepository = useCallback(
    async (owner: string, repo: string, branch: string) => {
      try {
        setError(null);
        await repositoryCacheService.delete(owner, repo, branch);
        await loadStats();
        logger.info(`Deleted cached repository ${owner}/${repo}@${branch}`);
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete repository";
        logger.error("Error deleting repository:", err);
        setError(message);
        return false;
      }
    },
    [loadStats]
  );

  /**
   * Run cache cleanup (remove expired entries)
   */
  const cleanup = useCallback(async () => {
    try {
      setError(null);
      const deletedCount = await repositoryCacheService.cleanup();
      await loadStats();
      logger.info(`Cleaned up ${deletedCount} expired entries`);
      return deletedCount;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to cleanup cache";
      logger.error("Error during cleanup:", err);
      setError(message);
      return 0;
    }
  }, [loadStats]);

  /**
   * Get list of all cached repositories
   */
  const listCachedRepositories = useCallback(async () => {
    try {
      setError(null);
      const list = await repositoryCacheService.list();
      return list;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to list repositories";
      logger.error("Error listing repositories:", err);
      setError(message);
      return [];
    }
  }, []);

  /**
   * Calculate cache hit rate
   */
  const getCacheHitRate = useCallback(() => {
    const total = stats.hits + stats.misses;
    if (total === 0) return 0;
    return (stats.hits / total) * 100;
  }, [stats]);

  /**
   * Format bytes to human readable string
   */
  const formatBytes = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }, []);

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    isLoading,
    error,
    loadStats,
    clearCache,
    deleteRepository,
    cleanup,
    listCachedRepositories,
    getCacheHitRate,
    formatBytes,
  };
}
