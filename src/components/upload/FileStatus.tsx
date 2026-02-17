import React from "react";
import { FileCode, X, CheckCircle, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AnalysisProgress } from "@/hooks/useFileUpload";

interface FileStatusProps {
  selectedFile: File;
  isUploading: boolean;
  isAnalyzing: boolean;
  uploadComplete: boolean;
  uploadProgress: number;
  onRemoveFile: () => void;
  analysisProgress?: AnalysisProgress;
}

const formatTimeRemaining = (seconds: number): string => {
  if (seconds <= 0) return "Almost done...";
  if (seconds < 1) return "Less than a second";
  if (seconds < 60) {
    const s = Math.ceil(seconds);
    return s === 1 ? "~1 second" : `~${s} seconds`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.ceil(seconds % 60);
  if (remainingSeconds === 0) {
    return minutes === 1 ? "~1 minute" : `~${minutes} minutes`;
  }
  return `~${minutes}m ${remainingSeconds}s`;
};

export const FileStatus: React.FC<FileStatusProps> = ({
  selectedFile,
  isUploading,
  isAnalyzing,
  uploadComplete,
  uploadProgress,
  onRemoveFile,
  analysisProgress,
}) => {
  return (
    <div className="animate-slide-up space-y-4 sm:space-y-6">
      <div className="border-primary/20 bg-muted/10 dark:border-primary/20 flex flex-col items-start justify-between gap-4 rounded-none border-2 p-4 sm:flex-row sm:items-center sm:p-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <div className="bg-primary flex-shrink-0 rounded-none p-2 shadow-sm sm:p-3">
            <FileCode className="text-primary-foreground h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-foreground truncate font-mono text-base font-bold tracking-wide uppercase sm:text-lg"
              title={selectedFile.name}
            >
              {selectedFile.name}
            </p>
            <p className="text-muted-foreground font-mono text-xs">
              FILE_SIZE: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemoveFile}
          className="focus-ring text-destructive hover:bg-destructive/10 hover:text-destructive flex-shrink-0 rounded-none"
          disabled={isUploading || isAnalyzing}
          aria-label="Remove selected file"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {isUploading && (
        <div className="animate-fade-in border-primary/30 bg-background relative overflow-hidden rounded-none border-2 p-4 sm:p-6">
          <div className="relative space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 border-primary/20 flex h-10 w-10 items-center justify-center border">
                  <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                </div>
                <div className="space-y-1">
                  <p className="text-primary font-mono text-xs tracking-wider uppercase">
                    Status: Uploading...
                  </p>
                  <p className="text-muted-foreground font-mono text-[10px]">
                    Transferring data packets
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-primary font-mono text-sm font-bold">
                  {uploadProgress}%
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Progress
                value={uploadProgress}
                className="bg-muted h-2 w-full rounded-none"
              />
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="animate-fade-in border-primary bg-background relative overflow-hidden rounded-none border-2 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] sm:p-6">
          <div className="relative space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="border-primary/20 bg-primary/5 relative border p-2">
                  <Sparkles
                    className="text-primary h-6 w-6 animate-pulse"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-primary font-mono text-sm font-bold tracking-wider uppercase">
                    System Analysis Active
                  </p>
                  <p className="text-muted-foreground font-mono text-xs">
                    Processing logic cores...
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {analysisProgress && analysisProgress.phaseNumber > 0 && (
                  <span className="border-primary bg-primary text-primary-foreground border px-3 py-1 font-mono text-xs font-bold tracking-wider uppercase">
                    Phase {analysisProgress.phaseNumber}/
                    {analysisProgress.totalPhases}
                  </span>
                )}
                <span className="border-border bg-muted text-muted-foreground border px-3 py-1 font-mono text-xs font-bold tracking-wider uppercase">
                  {analysisProgress?.phase || "In Progress"}
                </span>
              </div>
            </div>

            <div className="border-border relative border p-1">
              <Progress
                value={analysisProgress?.percentComplete ?? 0}
                className="bg-muted h-4 w-full rounded-none"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-foreground bg-background/50 px-1 font-mono text-[10px] font-bold">
                  {Math.round(analysisProgress?.percentComplete ?? 0)}% COMPLETE
                </span>
              </div>
            </div>

            <div className="border-border flex flex-col gap-2 border-t border-dashed pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground font-mono text-xs uppercase">
                &gt; Extracting files... &gt; Pattern match... &gt; Vuln scan...
              </p>
              {analysisProgress &&
                analysisProgress.estimatedTimeRemaining > 0 && (
                  <div className="text-primary flex items-center gap-2 font-mono text-xs font-bold tracking-wider uppercase">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>
                      ETA:{" "}
                      {formatTimeRemaining(
                        analysisProgress.estimatedTimeRemaining
                      )}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {uploadComplete && !isAnalyzing && (
        <Alert className="animate-bounce-in rounded-none border-2 border-green-500 bg-green-500/10 dark:border-green-500 dark:bg-green-500/10">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
          <AlertDescription className="font-mono text-xs font-bold tracking-wider text-green-800 uppercase dark:text-green-200">
            Upload Complete // Analysis Initiated
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
