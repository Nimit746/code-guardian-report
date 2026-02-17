import React, { useEffect, useRef, useState } from "react";
import {
  FileCode,
  X,
  CheckCircle,
  Clock,
  Activity,
  Cpu,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  if (seconds <= 0) return "CALC...";
  if (seconds < 1) return "< 1 SEC";
  if (seconds < 60) {
    const s = Math.ceil(seconds);
    return `${s} SEC`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.ceil(seconds % 60);
  if (remainingSeconds === 0) {
    return `${minutes} MIN`;
  }
  return `${minutes}M ${remainingSeconds}S`;
};

const TerminalLog = ({ active }: { active: boolean }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const logMessages = [
    "INITIALIZING_SCAN_PROTOCOLS...",
    "MOUNTING_VIRTUAL_VOLUMES...",
    "PARSING_BINARY_DATA...",
    "DETECTING_ENCRYPTION_LAYERS...",
    "ANALYZING_FILE_STRUCTURE...",
    "CHECKING_INTEGRITY_HASHES...",
    "LOADING_SECURITY_DEFINITIONS...",
    "EXECUTING_STATIC_ANALYSIS...",
    "SEARCHING_FOR_VULNERABILITIES...",
    "CROSS_REFERENCING_CPE_DATABASE...",
    "OPTIMIZING_REPORT_GENERATION...",
  ];

  useEffect(() => {
    if (!active) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < logMessages.length) {
        setLogs((prev) => [
          ...prev.slice(-4),
          `> ${logMessages[index]} ${Math.random() > 0.5 ? "[OK]" : ""}`,
        ]);
        index = (index + 1) % logMessages.length; // Loop for visual effect
      }
    }, 800);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative h-24 overflow-hidden border border-green-500/20 bg-black/90 p-2 font-mono text-[10px] text-green-500 shadow-inner">
      <div className="absolute top-0 right-0 p-1 opacity-50">
        <Activity className="h-3 w-3 animate-pulse" />
      </div>
      <div className="space-y-1" ref={scrollRef}>
        {logs.map((log, i) => (
          <div key={i} className="animate-fade-in truncate opacity-90">
            {log}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-full bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
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
    <div className="animate-slide-up w-full space-y-4">
      {/* Main File Card */}
      <div className="group bg-background border-primary/20 hover:border-primary/50 relative overflow-hidden border-2 p-4 transition-colors">
        {/* Decorative Corner Markers */}
        <div className="border-primary/40 absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2" />
        <div className="border-primary/40 absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2" />
        <div className="border-primary/40 absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2" />
        <div className="border-primary/40 absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative">
              <div className="bg-primary/10 relative z-10 p-3">
                <FileCode className="text-primary h-6 w-6" />
              </div>
              {/* Glitch Effect Layer */}
              <div className="bg-primary/20 absolute inset-0 animate-pulse blur-sm" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className="text-foreground group-hover:text-primary truncate font-mono text-sm font-bold tracking-wider uppercase transition-colors sm:text-base"
                  title={selectedFile.name}
                >
                  {selectedFile.name}
                </p>
                <span className="bg-muted text-muted-foreground px-1 py-0.5 font-mono text-[10px] uppercase">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <div className="text-muted-foreground mt-1 flex items-center gap-2 font-mono text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500/50" />
                <span>SECURE_ENCLAVE_READY</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            disabled={isUploading || isAnalyzing}
            className="hover:bg-destructive hover:text-destructive-foreground focus:ring-destructive rounded-none focus:ring-1"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">ABORT</span>
          </Button>
        </div>

        {/* Scan Line Animation Overlay */}
        {(isUploading || isAnalyzing) && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
            <div className="via-primary h-full w-full animate-[scan-line_3s_linear_infinite] bg-gradient-to-b from-transparent to-transparent" />
          </div>
        )}
      </div>

      {/* Upload Status Panel */}
      {isUploading && (
        <div className="border-primary/30 bg-primary/5 animate-in fade-in slide-in-from-top-2 border p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="text-primary h-4 w-4 animate-pulse" />
              <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase">
                Uplink Active // {uploadProgress}%
              </span>
            </div>
          </div>
          <div className="bg-primary/20 relative h-2 w-full overflow-hidden">
            <div
              className="bg-primary absolute top-0 left-0 h-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
            {/* Striped progress effect */}
            <div className="absolute inset-0 animate-[slide_1s_linear_infinite] bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_25%,rgba(0,0,0,0.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.1))] bg-[length:10px_10px]" />
          </div>
        </div>
      )}

      {/* Analysis Status Panel */}
      {isAnalyzing && (
        <div className="border-primary bg-background animate-in fade-in zoom-in-95 border p-1 shadow-lg">
          <div className="bg-primary/5 space-y-4 p-4">
            {/* Header */}
            <div className="border-primary/20 flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Cpu className="text-primary h-4 w-4 animate-[spin_3s_linear_infinite]" />
                <span className="text-primary font-mono text-sm font-bold tracking-widest uppercase">
                  Processing // Core Logic
                </span>
              </div>
              <div className="text-primary/80 font-mono text-xs">
                THREAD_ID:{" "}
                {Math.floor(Math.random() * 99999)
                  .toString()
                  .padStart(5, "0")}
              </div>
            </div>

            {/* Terminal Output */}
            <TerminalLog active={isAnalyzing} />

            {/* Progress Bar & Phase Info */}
            <div className="space-y-2">
              <div className="flex items-end justify-between font-mono text-xs">
                <span className="text-muted-foreground uppercase">
                  Phase: {analysisProgress?.phase || "INITIALIZING"}
                </span>
                <span className="text-primary font-bold">
                  {Math.round(analysisProgress?.percentComplete ?? 0)}%
                </span>
              </div>

              <div className="bg-muted border-border relative h-4 w-full border">
                <div
                  className="bg-primary relative h-full overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    width: `${analysisProgress?.percentComplete ?? 0}%`,
                  }}
                >
                  <div className="absolute inset-0 h-full w-full animate-[shimmer_2s_infinite] bg-white/20" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-muted-foreground flex items-center gap-2 font-mono text-[10px]">
                  <Clock className="h-3 w-3" />
                  <span>
                    EST:{" "}
                    {analysisProgress?.estimatedTimeRemaining
                      ? formatTimeRemaining(
                          analysisProgress.estimatedTimeRemaining
                        )
                      : "CALC..."}
                  </span>
                </div>
                {analysisProgress && (
                  <div className="bg-primary/10 text-primary px-2 py-0.5 font-mono text-[10px]">
                    PHASE {analysisProgress.phaseNumber}/
                    {analysisProgress.totalPhases}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {uploadComplete && !isAnalyzing && (
        <div className="animate-in slide-in-from-left-2 flex items-center gap-4 border-l-4 border-green-500 bg-green-500/10 p-4">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div className="space-y-1">
            <h4 className="font-mono text-sm font-bold tracking-wider text-green-700 uppercase dark:text-green-400">
              Sequence Complete
            </h4>
            <p className="font-mono text-xs text-green-600/80 dark:text-green-400/80">
              Artifact successfully uploaded to secure storage.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
