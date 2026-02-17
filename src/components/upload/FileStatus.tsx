import React from "react";
import { FileCode, X, CheckCircle, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
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
      <div className="border-border bg-muted/30 flex flex-col items-start justify-between gap-4 rounded-xl border-2 p-4 sm:flex-row sm:items-center sm:p-6 dark:border-slate-600 dark:from-slate-800 dark:to-slate-700">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <div className="bg-primary flex-shrink-0 rounded-xl p-2 shadow-lg sm:p-3">
            <FileCode className="h-6 w-6 text-white sm:h-8 sm:w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-foreground truncate text-base font-bold sm:text-lg dark:text-white"
              title={selectedFile.name}
            >
              {selectedFile.name}
            </p>
            <p className="text-muted-foreground text-sm">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemoveFile}
          className="focus-ring flex-shrink-0 rounded-lg text-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30"
          disabled={isUploading || isAnalyzing}
          aria-label="Remove selected file"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {isUploading && (
        <div className="animate-fade-in relative overflow-hidden rounded-2xl border border-teal-200/70 bg-gradient-to-br from-teal-50 via-white to-slate-50 p-4 sm:p-6 dark:border-teal-900/60 dark:from-slate-900 dark:via-slate-950 dark:to-teal-950/40">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.18),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.2),_transparent_60%)]"
            aria-hidden="true"
          ></div>
          <div className="relative space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton
                  variant="avatar"
                  width={40}
                  height={40}
                  className="bg-teal-200/70 dark:bg-teal-900/70"
                />
                <div className="space-y-2">
                  <Skeleton
                    variant="text"
                    width={140}
                    height={14}
                    className="bg-teal-200/70 dark:bg-teal-900/70"
                  />
                  <Skeleton
                    variant="text"
                    width={90}
                    height={12}
                    className="bg-slate-200 dark:bg-slate-800"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton
                  variant="text"
                  width={52}
                  height={12}
                  className="bg-slate-200 dark:bg-slate-800"
                />
                <span className="font-mono text-sm text-teal-700 dark:text-teal-300">
                  {uploadProgress}%
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Progress
                value={uploadProgress}
                className="h-3 w-full bg-teal-100/80 sm:h-4 dark:bg-teal-900/60"
              />
              <div className="flex items-center justify-between">
                <Skeleton
                  variant="text"
                  width="35%"
                  height={10}
                  className="bg-slate-200 dark:bg-slate-800"
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  height={10}
                  className="bg-slate-200 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="animate-fade-in relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6 dark:border-purple-800/80 dark:from-purple-950/40 dark:via-slate-950 dark:to-pink-950/40">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.2),_transparent_60%)]"
            aria-hidden="true"
          ></div>
          <div className="relative space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Skeleton
                    variant="avatar"
                    width={40}
                    height={40}
                    className="bg-purple-200/70 dark:bg-purple-900/70"
                  />
                  <Sparkles
                    className="absolute -top-1 -right-1 h-4 w-4 text-purple-500 dark:text-purple-300"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-2">
                  <Skeleton
                    variant="text"
                    width={180}
                    height={14}
                    className="bg-purple-200/70 dark:bg-purple-900/70"
                  />
                  <Skeleton
                    variant="text"
                    width={120}
                    height={12}
                    className="bg-slate-200 dark:bg-slate-800"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {analysisProgress && analysisProgress.phaseNumber > 0 && (
                  <span className="rounded-full border border-purple-400 bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-md dark:border-purple-400 dark:bg-purple-500">
                    Step {analysisProgress.phaseNumber}/
                    {analysisProgress.totalPhases}
                  </span>
                )}
                <span className="rounded-lg bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700 dark:bg-purple-800/50 dark:text-purple-200">
                  {analysisProgress?.phase || "Extracting & scanning"}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton
                  variant="text"
                  width="80%"
                  height={10}
                  className="bg-slate-200 dark:bg-slate-800"
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={10}
                  className="bg-slate-200 dark:bg-slate-800"
                />
              </div>
              <div className="space-y-2">
                <Skeleton
                  variant="text"
                  width="70%"
                  height={10}
                  className="bg-slate-200 dark:bg-slate-800"
                />
                <Skeleton
                  variant="text"
                  width="50%"
                  height={10}
                  className="bg-slate-200 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="relative">
              <Progress
                value={analysisProgress?.percentComplete ?? 0}
                className="h-3 w-full overflow-hidden rounded-full bg-purple-200 sm:h-4 dark:bg-purple-800"
              />
              {analysisProgress && analysisProgress.percentComplete > 0 && (
                <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs font-bold text-purple-900 drop-shadow-sm dark:text-white">
                  {Math.round(analysisProgress.percentComplete)}%
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed font-medium text-purple-600 sm:text-sm dark:text-purple-300">
                Extracting files from ZIP • Running security pattern matching •
                Analyzing code quality • Detecting vulnerabilities
              </p>
              {analysisProgress &&
                analysisProgress.estimatedTimeRemaining > 0 && (
                  <div className="flex items-center gap-2 rounded-full border border-purple-400/50 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-xs font-bold whitespace-nowrap text-white shadow-lg dark:from-purple-500 dark:to-pink-500">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>
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
        <Alert className="animate-bounce-in border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 dark:border-emerald-800 dark:from-emerald-950/30 dark:to-green-950/30">
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <AlertDescription className="font-semibold text-emerald-800 dark:text-emerald-200">
            File uploaded and analyzed successfully! You'll be automatically
            redirected to the results.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
