import React from "react";
import { Upload, Sparkles } from "lucide-react";

interface FileUploadAreaProps {
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInput,
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 sm:p-8 lg:p-12 ${
        isDragOver
          ? "scale-[1.02] border-primary bg-muted/50 dark:bg-blue-950/20"
          : "border-border hover:border-primary hover:bg-muted/50 dark:hover:border-primary/50/50"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      aria-label="File upload area. Drag and drop a zip file here or click to browse files"
    >
      <div
        className="absolute inset-0 bg-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      ></div>
      <div className="relative z-10">
        <div className="mb-4 transition-transform duration-300 group-hover:scale-110 sm:mb-6">
          <Upload
            className="mx-auto h-12 w-12 text-muted-foreground transition-colors duration-300 group-hover:text-primary sm:h-16 sm:w-16"
            aria-hidden="true"
          />
        </div>
        <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:mb-4 sm:text-xl lg:text-2xl dark:text-white dark:group-hover:text-primary">
          Drop your .zip file here
        </h3>
        <div className="mb-4 flex items-center justify-center gap-4 sm:mb-6">
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"
            aria-hidden="true"
          ></div>
          <span className="text-sm font-medium text-muted-foreground sm:text-base">
            or
          </span>
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"
            aria-hidden="true"
          ></div>
        </div>
        <div className="space-y-4">
          <label
            htmlFor="file-upload"
            className="focus-ring inline-flex transform cursor-pointer items-center rounded-lg border-0 bg-primary px-6 py-2 text-base font-semibold text-white shadow-lg transition-all duration-300  hover:bg-primary/90 hover:shadow-xl sm:px-8 sm:py-3 sm:text-lg"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                document.getElementById("file-upload")?.click();
              }
            }}
          >
            <Sparkles
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
            />
            Browse Files
          </label>
          <p className="text-xs text-muted-foreground">
            Or drag and drop your zip file anywhere in this area
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".zip,application/zip,application/x-zip-compressed"
          className="sr-only"
          onChange={onFileInput}
          aria-label="Choose zip file to upload"
        />
        <div className="mt-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground sm:mt-6 sm:p-4 sm:text-sm dark:bg-slate-700/50">
          <div className="space-y-1">
            <p>
              <strong>Maximum file size:</strong> 50MB
            </p>
            <p>
              <strong>Supported languages:</strong> Python, JavaScript,
              TypeScript, React, Node.js
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
