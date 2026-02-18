/**
 * Repository Cache Service
 * Provides intelligent caching for frequently downloaded GitHub repositories
 *
 * Features:
 * - IndexedDB storage for large repository archives
 * - TTL-based cache invalidation
 * - LRU eviction for space management
 * - Cache statistics and monitoring
 * - Automatic cleanup of expired entries
 */

import { logger } from "@/utils/logger";

export interface CachedRepository {
  key: string;
  owner: string;
  repo: string;
  branch: string;
  data: Blob;
  size: number;
  timestamp: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
  etag?: string;
  commitSha?: string;
}

export interface CacheStats {
  totalEntries: number;
  totalSize: number;
  hits: number;
  misses: number;
  evictions: number;
  oldestEntry?: number;
  newestEntry?: number;
}

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 24 hours)
  maxSize?: number; // Maximum cache size in bytes (default: 500MB)
  maxEntries?: number; // Maximum number of cached repositories (default: 50)
}

class RepositoryCacheService {
  private readonly DB_NAME = "CodeGuardianRepoCache";
  private readonly DB_VERSION = 1;
  private readonly STORE_NAME = "repositories";
  private readonly STATS_STORE_NAME = "cacheStats";

  private db: IDBDatabase | null = null;
  private initialized = false;

  // Default configuration
  private readonly DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly DEFAULT_MAX_SIZE = 500 * 1024 * 1024; // 500MB
  private readonly DEFAULT_MAX_ENTRIES = 50;

  private options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: options.ttl || this.DEFAULT_TTL,
      maxSize: options.maxSize || this.DEFAULT_MAX_SIZE,
      maxEntries: options.maxEntries || this.DEFAULT_MAX_ENTRIES,
    };
  }

  /**
   * Initialize the IndexedDB database
   */
  async init(): Promise<void> {
    if (this.initialized) return;

    // Guard for server-side rendering
    if (typeof indexedDB === "undefined") {
      logger.warn("IndexedDB not available, cache will be disabled");
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        logger.error("Failed to open cache database:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.initialized = true;
        logger.info("Repository cache initialized");

        // Start periodic cleanup
        this.startPeriodicCleanup();
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create repositories store
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, {
            keyPath: "key",
          });
          store.createIndex("owner", "owner", { unique: false });
          store.createIndex("repo", "repo", { unique: false });
          store.createIndex("expiresAt", "expiresAt", { unique: false });
          store.createIndex("lastAccessed", "lastAccessed", { unique: false });
          store.createIndex("accessCount", "accessCount", { unique: false });
        }

        // Create stats store
        if (!db.objectStoreNames.contains(this.STATS_STORE_NAME)) {
          db.createObjectStore(this.STATS_STORE_NAME, { keyPath: "id" });
        }
      };
    });
  }

  /**
   * Generate cache key for a repository
   */
  private generateCacheKey(
    owner: string,
    repo: string,
    branch: string
  ): string {
    return `${owner}/${repo}@${branch}`.toLowerCase();
  }

  /**
   * Check if cache is initialized
   */
  private ensureInitialized(): void {
    if (!this.initialized || !this.db) {
      throw new Error("Cache not initialized. Call init() first.");
    }
  }

  /**
   * Get cached repository
   */
  async get(
    owner: string,
    repo: string,
    branch: string
  ): Promise<CachedRepository | null> {
    try {
      this.ensureInitialized();
      const key = this.generateCacheKey(owner, repo, branch);

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(
          [this.STORE_NAME],
          "readwrite"
        );
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.get(key);

        request.onsuccess = async () => {
          const cached = request.result as CachedRepository | undefined;

          if (!cached) {
            await this.incrementStats("misses");
            resolve(null);
            return;
          }

          // Check if expired
          if (Date.now() > cached.expiresAt) {
            logger.info(`Cache expired for ${key}`);
            await this.delete(owner, repo, branch);
            await this.incrementStats("misses");
            resolve(null);
            return;
          }

          // Update access metadata
          cached.accessCount++;
          cached.lastAccessed = Date.now();
          store.put(cached);

          await this.incrementStats("hits");
          logger.info(
            `Cache hit for ${key} (accessed ${cached.accessCount} times)`
          );
          resolve(cached);
        };

        request.onerror = () => {
          logger.error("Error retrieving from cache:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache get error:", error);
      return null;
    }
  }

  /**
   * Store repository in cache
   */
  async set(
    owner: string,
    repo: string,
    branch: string,
    data: Blob,
    metadata?: { etag?: string; commitSha?: string }
  ): Promise<void> {
    try {
      this.ensureInitialized();
      const key = this.generateCacheKey(owner, repo, branch);
      const now = Date.now();

      const cached: CachedRepository = {
        key,
        owner,
        repo,
        branch,
        data,
        size: data.size,
        timestamp: now,
        expiresAt: now + this.options.ttl,
        accessCount: 0,
        lastAccessed: now,
        etag: metadata?.etag,
        commitSha: metadata?.commitSha,
      };

      // Check if we need to evict entries
      await this.evictIfNeeded(cached.size);

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(
          [this.STORE_NAME],
          "readwrite"
        );
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.put(cached);

        request.onsuccess = () => {
          logger.info(
            `Cached repository ${key} (${this.formatBytes(cached.size)})`
          );
          resolve();
        };

        request.onerror = () => {
          logger.error("Error storing in cache:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache set error:", error);
      throw error;
    }
  }

  /**
   * Delete cached repository
   */
  async delete(owner: string, repo: string, branch: string): Promise<void> {
    try {
      this.ensureInitialized();
      const key = this.generateCacheKey(owner, repo, branch);

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(
          [this.STORE_NAME],
          "readwrite"
        );
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.delete(key);

        request.onsuccess = () => {
          logger.info(`Deleted cached repository ${key}`);
          resolve();
        };

        request.onerror = () => {
          logger.error("Error deleting from cache:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache delete error:", error);
    }
  }

  /**
   * Clear all cached repositories
   */
  async clear(): Promise<void> {
    try {
      this.ensureInitialized();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(
          [this.STORE_NAME],
          "readwrite"
        );
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
          logger.info("Cache cleared");
          resolve();
        };

        request.onerror = () => {
          logger.error("Error clearing cache:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache clear error:", error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<CacheStats> {
    try {
      this.ensureInitialized();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(
          [this.STORE_NAME, this.STATS_STORE_NAME],
          "readonly"
        );
        const repoStore = transaction.objectStore(this.STORE_NAME);
        const statsStore = transaction.objectStore(this.STATS_STORE_NAME);

        const getAllRequest = repoStore.getAll();
        const statsRequest = statsStore.get("global");

        getAllRequest.onsuccess = () => {
          const repos = getAllRequest.result as CachedRepository[];

          const stats: CacheStats = {
            totalEntries: repos.length,
            totalSize: repos.reduce((sum, repo) => sum + repo.size, 0),
            hits: 0,
            misses: 0,
            evictions: 0,
          };

          if (repos.length > 0) {
            stats.oldestEntry = Math.min(...repos.map((r) => r.timestamp));
            stats.newestEntry = Math.max(...repos.map((r) => r.timestamp));
          }

          statsRequest.onsuccess = () => {
            const globalStats = statsRequest.result;
            if (globalStats) {
              stats.hits = globalStats.hits || 0;
              stats.misses = globalStats.misses || 0;
              stats.evictions = globalStats.evictions || 0;
            }
            resolve(stats);
          };

          statsRequest.onerror = () => {
            // Return stats without hit/miss info if stats store fails
            resolve(stats);
          };
        };

        getAllRequest.onerror = () => {
          reject(getAllRequest.error);
        };
      });
    } catch (error) {
      logger.error("Error getting cache stats:", error);
      return {
        totalEntries: 0,
        totalSize: 0,
        hits: 0,
        misses: 0,
        evictions: 0,
      };
    }
  }

  /**
   * Get all cached repositories metadata (without blob data)
   */
  async list(): Promise<Omit<CachedRepository, "data">[]> {
    try {
      this.ensureInitialized();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.STORE_NAME], "readonly");
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          const repos = request.result as CachedRepository[];
          // Remove blob data to avoid memory issues
          const metadata = repos.map(({ data: _data, ...rest }) => rest);
          resolve(metadata);
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Error listing cache:", error);
      return [];
    }
  }

  /**
   * Evict least recently used entries if needed
   */
  private async evictIfNeeded(newEntrySize: number): Promise<void> {
    const stats = await this.getStats();

    // Check if we need to evict based on size or count
    const needsEviction =
      stats.totalSize + newEntrySize > this.options.maxSize ||
      stats.totalEntries >= this.options.maxEntries;

    if (!needsEviction) return;

    logger.info("Cache eviction needed");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORE_NAME], "readwrite");
      const store = transaction.objectStore(this.STORE_NAME);
      const index = store.index("lastAccessed");
      const request = index.openCursor();

      const toDelete: string[] = [];
      let freedSpace = 0;

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const repo = cursor.value as CachedRepository;

          // Delete oldest entries until we have enough space
          if (
            stats.totalSize + newEntrySize - freedSpace >
              this.options.maxSize ||
            stats.totalEntries - toDelete.length >= this.options.maxEntries
          ) {
            toDelete.push(repo.key);
            freedSpace += repo.size;
            cursor.continue();
          } else {
            // We've freed enough space
            this.performEviction(toDelete).then(() => resolve());
          }
        } else {
          // Reached end of cursor
          if (toDelete.length > 0) {
            this.performEviction(toDelete).then(() => resolve());
          } else {
            resolve();
          }
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Perform actual eviction of entries
   */
  private async performEviction(keys: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORE_NAME], "readwrite");
      const store = transaction.objectStore(this.STORE_NAME);

      keys.forEach((key) => {
        store.delete(key);
      });

      transaction.oncomplete = async () => {
        await this.incrementStats("evictions", keys.length);
        logger.info(`Evicted ${keys.length} cache entries`);
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  }

  /**
   * Remove expired entries
   */
  async cleanup(): Promise<number> {
    try {
      this.ensureInitialized();
      const now = Date.now();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(
          [this.STORE_NAME],
          "readwrite"
        );
        const store = transaction.objectStore(this.STORE_NAME);
        const index = store.index("expiresAt");

        // Get all entries that have expired
        const range = IDBKeyRange.upperBound(now);
        const request = index.openCursor(range);

        let deletedCount = 0;

        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            cursor.delete();
            deletedCount++;
            cursor.continue();
          } else {
            if (deletedCount > 0) {
              logger.info(`Cleaned up ${deletedCount} expired cache entries`);
            }
            resolve(deletedCount);
          }
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Error during cache cleanup:", error);
      return 0;
    }
  }

  /**
   * Start periodic cleanup of expired entries
   */
  private startPeriodicCleanup(): void {
    // Run cleanup every hour
    const cleanupInterval = 60 * 60 * 1000;

    setInterval(() => {
      this.cleanup().catch((error) => {
        logger.error("Periodic cleanup failed:", error);
      });
    }, cleanupInterval);

    // Also run cleanup on initialization
    this.cleanup().catch((error) => {
      logger.error("Initial cleanup failed:", error);
    });
  }

  /**
   * Increment statistics counters
   */
  private async incrementStats(
    counter: "hits" | "misses" | "evictions",
    amount: number = 1
  ): Promise<void> {
    try {
      if (!this.db) return;

      return new Promise((resolve) => {
        const transaction = this.db!.transaction(
          [this.STATS_STORE_NAME],
          "readwrite"
        );
        const store = transaction.objectStore(this.STATS_STORE_NAME);
        const request = store.get("global");

        request.onsuccess = () => {
          const stats = request.result || {
            id: "global",
            hits: 0,
            misses: 0,
            evictions: 0,
          };
          stats[counter] = (stats[counter] || 0) + amount;
          store.put(stats);
          resolve();
        };

        request.onerror = () => {
          // Don't fail the main operation if stats update fails
          resolve();
        };
      });
    } catch (_error) {
      // Silently fail stats updates
    }
  }

  /**
   * Format bytes to human readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  /**
   * Check if a repository exists in cache (without fetching data)
   */
  async has(owner: string, repo: string, branch: string): Promise<boolean> {
    try {
      this.ensureInitialized();
      const key = this.generateCacheKey(owner, repo, branch);

      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.STORE_NAME], "readonly");
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.getKey(key);

        request.onsuccess = () => {
          resolve(request.result !== undefined);
        };

        request.onerror = () => {
          resolve(false);
        };
      });
    } catch (_error) {
      return false;
    }
  }
}

// Create singleton instance
export const repositoryCacheService = new RepositoryCacheService();

// Export class for custom instances
export { RepositoryCacheService };
