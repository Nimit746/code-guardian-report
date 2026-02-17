import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface CardSkeletonProps {
  className?: string;
  header?: boolean;
  content?: boolean;
  footer?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className = "",
  header = true,
  content = true,
  footer = false,
  lines = 3,
}) => {
  return (
    <div
      className={cn("border-border bg-card rounded-xl border p-6", className)}
    >
      {header && (
        <div className="mb-4 flex items-center gap-4">
          <Skeleton variant="avatar" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={14} />
          </div>
        </div>
      )}

      {content && (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              width={i === lines - 1 ? "60%" : "100%"}
              height={16}
            />
          ))}
        </div>
      )}

      {footer && (
        <div className="mt-4 flex items-center justify-between">
          <Skeleton variant="button" width={80} height={32} />
          <Skeleton variant="button" width={60} height={32} />
        </div>
      )}
    </div>
  );
};

interface ChartSkeletonProps {
  className?: string;
  showLegend?: boolean;
}

export const ChartSkeleton: React.FC<ChartSkeletonProps> = ({
  className = "",
  showLegend = true,
}) => {
  return (
    <div
      className={cn("border-border bg-card rounded-xl border p-6", className)}
    >
      <div className="mb-4 flex items-center justify-between">
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton variant="text" width={60} height={14} />
      </div>

      <Skeleton variant="chart" height={200} className="mb-4 w-full" />

      {showLegend && (
        <div className="flex items-center justify-center gap-4">
          <Skeleton variant="text" width={60} height={12} />
          <Skeleton variant="text" width={60} height={12} />
          <Skeleton variant="text" width={60} height={12} />
        </div>
      )}
    </div>
  );
};

interface MetricCardSkeletonProps {
  className?: string;
}

export const MetricCardSkeleton: React.FC<MetricCardSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={cn("border-border bg-card rounded-xl border p-6", className)}
    >
      <div className="flex items-center gap-4">
        <Skeleton variant="avatar" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width={80} height={14} />
          <Skeleton variant="text" width={60} height={28} />
        </div>
      </div>
      <div className="mt-4">
        <Skeleton variant="text" width="40%" height={12} />
      </div>
    </div>
  );
};

interface InsightCardSkeletonProps {
  className?: string;
  showButton?: boolean;
}

export const InsightCardSkeleton: React.FC<InsightCardSkeletonProps> = ({
  className = "",
  showButton = true,
}) => {
  return (
    <div
      className={cn("border-border bg-card rounded-lg border p-4", className)}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" width={32} height={32} />
          <Skeleton variant="text" width={150} height={18} />
        </div>
        {showButton && <Skeleton variant="button" width={100} height={28} />}
      </div>

      <div className="space-y-3">
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="90%" height={14} />
        <Skeleton variant="text" width="95%" height={14} />
        <Skeleton variant="text" width="70%" height={14} />
      </div>

      <div className="mt-4">
        <Skeleton variant="text" width={120} height={12} />
      </div>
    </div>
  );
};

interface RepositoryCardSkeletonProps {
  className?: string;
}

export const RepositoryCardSkeleton: React.FC<RepositoryCardSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={cn("border-border bg-card rounded-xl border p-5", className)}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" width={36} height={36} />
          <div className="space-y-1">
            <Skeleton variant="text" width={140} height={18} />
            <Skeleton variant="text" width={100} height={12} />
          </div>
        </div>
        <Skeleton variant="button" width={80} height={28} />
      </div>

      <Skeleton variant="text" width="100%" height={14} className="mb-4" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton variant="text" width={50} height={14} />
          <Skeleton variant="text" width={50} height={14} />
          <Skeleton variant="text" width={50} height={14} />
        </div>
        <Skeleton variant="text" width={60} height={12} />
      </div>
    </div>
  );
};

interface TabContentSkeletonProps {
  className?: string;
  tabCount?: number;
}

export const TabContentSkeleton: React.FC<TabContentSkeletonProps> = ({
  className = "",
  tabCount = 4,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="border-border flex items-center gap-2 border-b pb-2">
        {Array.from({ length: tabCount }).map((_, i) => (
          <Skeleton key={i} variant="button" width={100} height={36} />
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton variant="text" width="40%" height={24} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    </div>
  );
};

interface ListSkeletonProps {
  className?: string;
  itemCount?: number;
  showAvatar?: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  className = "",
  itemCount = 5,
  showAvatar = true,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: itemCount }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-card flex items-center gap-3 rounded-lg border p-3"
        >
          {showAvatar && <Skeleton variant="avatar" width={40} height={40} />}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" height={16} />
            <Skeleton variant="text" width="40%" height={12} />
          </div>
          <Skeleton variant="button" width={60} height={28} />
        </div>
      ))}
    </div>
  );
};

export default {
  Card: CardSkeleton,
  Chart: ChartSkeleton,
  MetricCard: MetricCardSkeleton,
  InsightCard: InsightCardSkeleton,
  RepositoryCard: RepositoryCardSkeleton,
  TabContent: TabContentSkeleton,
  List: ListSkeleton,
};
