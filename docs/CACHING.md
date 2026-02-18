# Repository Caching Implementation

This document describes the repository caching system implemented in Code Guardian to improve performance when analyzing frequently accessed GitHub repositories.

## Overview

The caching system operates at two levels:

1. **Server-Side Cache** (API Route) - In-memory cache for the download API
2. **Client-Side Cache** (IndexedDB) - Browser-based persistent cache

## Features

### Core Capabilities

- ✅ **Dual-Layer Caching**: Server and client-side caching for optimal performance
- ✅ **TTL Management**: Automatic expiration of cached entries (default: 24 hours)
- ✅ **LRU Eviction**: Least Recently Used eviction when cache is full
- ✅ **Smart Storage**: Only caches reasonably-sized repositories
- ✅ **Statistics Tracking**: Hit rate, miss rate, and eviction metrics
- ✅ **Cache Validation**: ETag-based validation for freshness checks
- ✅ **Automatic Cleanup**: Periodic removal of expired entries

### Performance Benefits

- **Reduced API Calls**: Cached repositories don't count against GitHub API rate limits
- **Faster Downloads**: No network latency for cached repositories
- **Better UX**: Near-instant loading for frequently analyzed repositories
- **Bandwidth Savings**: Eliminates redundant downloads

## Architecture

### Server-Side Cache (API Route)

**Location**: `app/api/github/download/route.ts`

**Storage**: In-memory Map (process memory)

**Configuration**:

```typescript
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 500 * 1024 * 1024; // 500MB
const MAX_CACHE_ENTRIES = 50; // Maximum 50 repositories
```

**Features**:

- Automatic cache hit/miss detection
- LRU eviction when limits are reached
- X-Cache headers in responses (HIT/MISS)
- Cache age tracking
- Skips caching for very large repositories (>50MB)

**Cache Headers**:

```
X-Cache: HIT|MISS
X-Cache-Age: <seconds since cached>
```

### Client-Side Cache (IndexedDB)

**Location**: `src/services/storage/repositoryCacheService.ts`

**Storage**: IndexedDB (browser persistent storage)

**Configuration**:

```typescript
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours
const DEFAULT_MAX_SIZE = 500 * 1024 * 1024; // 500MB
const DEFAULT_MAX_ENTRIES = 50; // Maximum 50 repositories
```

**Database Schema**:

```typescript
interface CachedRepository {
  key: string; // Cache key: owner/repo@branch
  owner: string; // Repository owner
  repo: string; // Repository name
  branch: string; // Branch name
  data: Blob; // Zip file data
  size: number; // Size in bytes
  timestamp: number; // Creation timestamp
  expiresAt: number; // Expiration timestamp
  accessCount: number; // Number of times accessed
  lastAccessed: number; // Last access timestamp
  etag?: string; // ETag for validation
  commitSha?: string; // Commit SHA for validation
}
```

**Indexes**:

- `owner` - Find all repos by owner
- `repo` - Find all repos by name
- `expiresAt` - Quick cleanup of expired entries
- `lastAccessed` - LRU eviction
- `accessCount` - Usage statistics

## Usage

### Basic Usage (Automatic)

The caching is **automatically enabled** when downloading repositories. No code changes needed:

```typescript
import { githubRepositoryService } from "@/services/githubRepositoryService";

// First download - fetches from GitHub and caches
const file = await githubRepositoryService.downloadRepositoryAsZip(
  "owner",
  "repo",
  "main",
  (progress, message) => console.log(progress, message)
);

// Second download - served from cache (instant!)
const file2 = await githubRepositoryService.downloadRepositoryAsZip(
  "owner",
  "repo",
  "main",
  (progress, message) => console.log(progress, message)
);
```

### Bypass Cache

To force a fresh download and bypass the cache:

```typescript
const file = await githubRepositoryService.downloadRepositoryAsZip(
  "owner",
  "repo",
  "main",
  onProgress,
  true // bypassCache = true
);
```

### Using the Cache Manager Hook

```typescript
import { useRepositoryCache } from "@/hooks/useRepositoryCache";

function MyComponent() {
  const {
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
  } = useRepositoryCache();

  // Display cache statistics
  console.log(`Cache hit rate: ${getCacheHitRate()}%`);
  console.log(`Total cached: ${formatBytes(stats.totalSize)}`);
  console.log(`Cached repositories: ${stats.totalEntries}`);

  // Clear all cache
  const handleClear = async () => {
    await clearCache();
  };

  // Delete specific repository
  const handleDelete = async () => {
    await deleteRepository("owner", "repo", "main");
  };

  // Clean up expired entries
  const handleCleanup = async () => {
    const deletedCount = await cleanup();
    console.log(`Deleted ${deletedCount} expired entries`);
  };

  return (
    <div>
      <h2>Cache Stats</h2>
      <p>Hit Rate: {getCacheHitRate()}%</p>
      <p>Cached: {stats.totalEntries} repos ({formatBytes(stats.totalSize)})</p>
      <button onClick={handleClear}>Clear Cache</button>
    </div>
  );
}
```

### Using the Cache Manager Component

```typescript
import { RepositoryCacheManager } from "@/components/github/RepositoryCacheManager";

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <RepositoryCacheManager />
    </div>
  );
}
```

## API Reference

### RepositoryCacheService

#### Methods

##### `init(): Promise<void>`

Initialize the cache database. Must be called before other operations.

##### `get(owner: string, repo: string, branch: string): Promise<CachedRepository | null>`

Retrieve a cached repository. Returns null if not found or expired.

##### `set(owner: string, repo: string, branch: string, data: Blob, metadata?: { etag?: string; commitSha?: string }): Promise<void>`

Store a repository in the cache.

##### `delete(owner: string, repo: string, branch: string): Promise<void>`

Delete a specific cached repository.

##### `clear(): Promise<void>`

Clear all cached repositories.

##### `getStats(): Promise<CacheStats>`

Get cache statistics including hits, misses, size, etc.

##### `list(): Promise<Omit<CachedRepository, "data">[]>`

List all cached repositories (without blob data).

##### `cleanup(): Promise<number>`

Remove expired entries. Returns the number of deleted entries.

##### `has(owner: string, repo: string, branch: string): Promise<boolean>`

Check if a repository exists in cache without fetching data.

## Cache Statistics

The cache tracks the following metrics:

- **Total Entries**: Number of cached repositories
- **Total Size**: Combined size of all cached data
- **Hits**: Number of successful cache retrievals
- **Misses**: Number of cache misses (had to download)
- **Evictions**: Number of entries evicted due to space constraints
- **Hit Rate**: Percentage of requests served from cache

### Example Stats Object

```typescript
{
  totalEntries: 12,
  totalSize: 45678901,  // ~43.5 MB
  hits: 156,
  misses: 23,
  evictions: 3,
  oldestEntry: 1708264800000,
  newestEntry: 1708351200000
}
```

## Cache Eviction Strategy

When cache limits are reached, the system uses **Least Recently Used (LRU)** eviction:

1. Entries are sorted by `lastAccessed` timestamp
2. Oldest accessed entries are removed first
3. Eviction continues until:
   - Total size is below `maxSize`, OR
   - Total entries is below `maxEntries`

## Performance Considerations

### Memory Usage

- **Server-Side**: Uses Node.js process memory. Cache persists only while server is running.
- **Client-Side**: Uses browser IndexedDB. Persists across sessions.

### Best Practices

1. **Monitor Cache Size**: Use the cache manager to track usage
2. **Periodic Cleanup**: Remove expired entries regularly
3. **Clear Old Data**: Clear cache if not used for extended periods
4. **Bypass When Needed**: Use `bypassCache` flag for critical updates

### Limitations

- **Not Distributed**: Server cache doesn't share across instances (use Redis for production)
- **No Validation**: Cache doesn't check if repository was updated (relies on TTL)
- **Storage Quota**: Client cache subject to browser storage limits

## Production Recommendations

For production deployments:

1. **Use Redis**: Replace in-memory cache with Redis for distributed caching
2. **Add ETag Validation**: Implement conditional requests to GitHub API
3. **Monitor Metrics**: Track cache hit rates and adjust TTL accordingly
4. **Configure Limits**: Adjust cache size based on available resources
5. **Implement Warming**: Pre-cache popular repositories
6. **Add Compression**: Consider compressing cached data

## Troubleshooting

### Cache Not Working

1. Check if IndexedDB is supported in browser
2. Verify cache initialization (check console logs)
3. Check browser storage quota
4. Clear cache and restart

### Low Hit Rate

1. Increase TTL if repositories change infrequently
2. Increase cache size to hold more repositories
3. Check if users are analyzing different repositories each time

### Storage Full

1. Run cleanup to remove expired entries
2. Clear cache manually
3. Reduce `maxSize` or `maxEntries`
4. Implement automatic cleanup on startup

## Future Enhancements

Potential improvements for the caching system:

- [ ] Smart cache invalidation based on GitHub webhooks
- [ ] ETag-based conditional requests
- [ ] Cache warming for popular repositories
- [ ] Compression for cached data
- [ ] Distributed cache with Redis
- [ ] Cache preloading for user's favorite repositories
- [ ] Analytics on cache effectiveness
- [ ] Cache sharing across tabs (BroadcastChannel)
- [ ] Incremental updates for repository changes

## Example Logs

### Cache Hit (Server)

```
[Cache HIT] facebook/react@main (age: 45min, size: 12.3 MB)
```

### Cache Miss (Server)

```
[Cache MISS] facebook/react@main - Fetching from GitHub...
[GitHub Proxy] Successfully downloaded 12934567 bytes
[Cache] Stored facebook/react@main (12.34 MB, total cached: 5 repos, 67.89 MB)
```

### Cache Eviction

```
[Cache] Evicted vuejs/core@main (8.76 MB)
[Cache] Evicted angular/angular@main (15.23 MB)
```

### Client-Side Logs

```
Repository cache initialized
Using cached repository facebook/react@main
Cached repository facebook/react@main for future use
```

## Testing

Run the cache tests:

```bash
npm test -- repositoryCache.test.ts
```

The test suite covers:

- Cache key generation
- Storage and retrieval
- Access count tracking
- Deletion
- Statistics
- Expiration
- Helper functions

## Summary

The repository caching implementation provides significant performance improvements for frequently accessed repositories while maintaining data freshness through TTL-based invalidation. The dual-layer approach (server + client) ensures optimal performance across different usage patterns.

For most use cases, the default configuration works well. Monitor cache statistics and adjust TTL/size limits as needed based on your usage patterns.
