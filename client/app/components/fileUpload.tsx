"use client";

import { useRef, useState, ChangeEvent, DragEvent } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  RefreshCw,
} from "lucide-react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const FileUploadComponent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setStatus("error");
      setErrorMessage("Only PDF files allowed");
      return;
    }

    setSelectedFile(file);
    setStatus("uploading");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("http://localhost:8000/upload/pdf", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(`Upload failed (${res.status})`);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && status !== "uploading") uploadFile(file);
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
        accept="application/pdf"
        className="hidden"
      />

      {status === "idle" ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-6 rounded-xl border border-dashed cursor-pointer transition-colors ${
            isDragging
              ? "border-zinc-400 bg-zinc-100 dark:bg-zinc-800/40"
              : "border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900/40"
          }`}
        >
          <UploadCloud className="w-6 h-6 text-zinc-500 dark:text-zinc-400 mb-2 transition-colors" />
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">
            Upload PDF{" "}
            <span className="text-zinc-500 font-normal">or drop file</span>
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors">
              <FileText className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200 truncate transition-colors">
                {selectedFile?.name}
              </p>

              <div className="flex items-center gap-1.5 text-xs font-mono mt-0.5">
                {status === "uploading" && (
                  <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1 transition-colors">
                    <Loader2 className="w-3 h-3 animate-spin" /> Ingesting...
                  </span>
                )}
                {status === "success" && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 transition-colors">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                )}
                {status === "error" && (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 transition-colors">
                    <AlertCircle className="w-3 h-3" /> {errorMessage}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              {status === "error" && (
                <button
                  onClick={() => selectedFile && uploadFile(selectedFile)}
                  className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Retry"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
              {status !== "uploading" && (
                <button
                  onClick={handleReset}
                  className="p-1 text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 w-full h-1 bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors">
            {status === "uploading" && (
              <div className="h-full bg-zinc-500 dark:bg-zinc-400 w-1/2 animate-[pulse_1.5s_ease-in-out_infinite]" />
            )}
            {status === "success" && (
              <div className="h-full bg-emerald-500 w-full" />
            )}
            {status === "error" && (
              <div className="h-full bg-rose-500 w-full" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
