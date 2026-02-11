"use client";

// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";

import { logger } from "@/utils/logger";
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error("ErrorBoundary caught an error:", { error, errorInfo });

    // Log Firebase-specific errors
    if (
      error.message.includes("firebase") ||
      error.message.includes("firestore")
    ) {
      logger.warn("Firebase error caught by ErrorBoundary:", {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="bg-muted/50 flex min-h-screen items-center justify-center">
          <div className="bg-card w-full max-w-md rounded-lg p-6 shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <svg
                className="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-foreground mb-2 text-center text-xl font-semibold">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-4 text-center">
              We're experiencing some technical difficulties. Please try
              refreshing the page.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary/90 flex-1 rounded-md px-4 py-2 text-white transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() =>
                  this.setState({ hasError: false, error: undefined })
                }
                className="bg-muted text-foreground hover:bg-muted flex-1 rounded-md px-4 py-2 transition-colors"
              >
                Try Again
              </button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="bg-muted mt-4 rounded p-3 text-xs">
                <summary className="cursor-pointer font-medium">
                  Error Details
                </summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
