import React from "react";
import { Progress } from "@/components/ui/progress";
import { FileCode, TrendingUp } from "lucide-react";

interface ProgressBarProps {
    currentFile: string | null;
    filesProcessed: number;
    totalFiles: number;
    percentComplete: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    currentFile,
    filesProcessed,
    totalFiles,
    percentComplete,
}) => {
    const filesRemaining = totalFiles - filesProcessed;

    return (
        <div className="space-y-3">
            {/* File Progress Stats */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-primary h-4 w-4" />
                    <span className="font-mono text-sm font-semibold text-white">
                        {filesProcessed} / {totalFiles} files analyzed
                    </span>
                </div>
                {filesRemaining > 0 && (
                    <span className="border-primary/30 bg-primary/10 text-primary rounded border px-3 py-1 font-mono text-xs font-bold">
                        {filesRemaining} remaining
                    </span>
                )}
            </div>

            {/* Progress Bar */}
            <div className="relative">
                <Progress
                    value={percentComplete}
                    className="h-3 w-full overflow-hidden rounded-full bg-white/10"
                />
                <span className="absolute top-1/2 right-2 -translate-y-1/2 font-mono text-xs font-bold text-white drop-shadow-sm">
                    {Math.round(percentComplete)}%
                </span>
            </div>

            {/* Current File Being Analyzed */}
            {currentFile && (
                <div className="border-primary/20 bg-primary/5 flex items-start gap-2 rounded-lg border p-2.5">
                    <FileCode className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs font-medium text-slate-400">
                            Currently analyzing:
                        </p>
                        <p
                            className="text-primary truncate font-mono text-sm font-semibold"
                            title={currentFile}
                        >
                            {currentFile}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
