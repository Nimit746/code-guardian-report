// src/components/LoadingSpinner.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  message,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  const lineClasses = {
    sm: "h-3 w-24",
    md: "h-3 w-36",
    lg: "h-3 w-48",
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Skeleton className={`rounded-full ${sizeClasses[size]}`} />
      {message ? (
        <div className="mt-2 flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-sm">{message}</p>
          <Skeleton className={lineClasses[size]} />
        </div>
      ) : (
        <Skeleton className={`mt-2 ${lineClasses[size]}`} />
      )}
    </div>
  );
};

export default LoadingSpinner;
