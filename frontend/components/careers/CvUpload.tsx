"use client";

import { useRef, useState } from "react";
import { Loader2, UploadCloud, Check, FileText, X } from "lucide-react";

/**
 * One-click CV upload. The file is POSTed to /api/intake/upload, which stores
 * it in the studio's own Google Drive (owner-authorized) and returns a
 * shareable link. No Google sign-in for the applicant — a single click.
 */
const API = "https://34-172-180-194.nip.io".replace(/\/$/, "");
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx";
const OK_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type State = "idle" | "uploading" | "done" | "error";

export function CvUpload({
  onUploaded,
}: {
  onUploaded: (url: string, filename: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);

  function upload(file: File) {
    setError("");
    if (!OK_TYPES.has(file.type) && !/\.(pdf|docx?)$/i.test(file.name)) {
      setState("error");
      setError("Please choose a PDF or Word document.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setState("error");
      setError("File must be under 10 MB.");
      return;
    }
    setState("uploading");
    setProgress(0);
    const body = new FormData();
    body.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API}/api/intake/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        setName(data.name || file.name);
        setState("done");
        onUploaded(data.url, data.name || file.name);
      } else {
        setState("error");
        setError(
          (() => {
            try {
              return JSON.parse(xhr.responseText).error || "Upload failed.";
            } catch {
              return "Upload failed.";
            }
          })(),
        );
      }
    };
    xhr.onerror = () => {
      setState("error");
      setError("Network error during upload.");
    };
    xhr.send(body);
  }

  const busy = state === "uploading";

  const reset = () => {
    setState("idle");
    setName("");
    setProgress(0);
    setError("");
    onUploaded("", "");
  };

  return (
    <div className="mb-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />

      {state === "done" ? (
        <div className="flex items-center gap-4 rounded-lg border border-orange/40 bg-orange/[0.06] px-5 py-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange text-on-orange">
            <Check className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-on-ink">
              <FileText className="size-4 shrink-0 text-on-ink-3" />
              <span className="truncate">{name}</span>
            </span>
            <span className="mono block text-xs text-on-ink-3">
              Uploaded · link added below
            </span>
          </span>
          <button
            type="button"
            onClick={reset}
            aria-label="Remove"
            className="grid size-8 shrink-0 place-items-center rounded-full text-on-ink-3 transition-colors hover:bg-on-ink/10 hover:text-on-ink"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !busy && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (!busy && f) upload(f);
          }}
          disabled={busy}
          className={`flex w-full items-center gap-4 rounded-lg border border-dashed px-5 py-4 text-left transition-colors disabled:cursor-not-allowed ${
            drag ? "border-orange bg-orange/[0.06]" : "border-line-invert bg-dark-2 hover:border-orange/60"
          }`}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange/10 text-orange">
            {busy ? <Loader2 className="size-5 animate-spin" /> : <UploadCloud className="size-5" />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-on-ink">
              {busy ? `Uploading… ${progress}%` : "Drag & drop your CV, or click to upload"}
            </span>
            <span className="mono block text-xs text-on-ink-3">PDF or Word · up to 10 MB</span>
            {busy && (
              <span className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-on-ink/10">
                <span
                  className="block h-full bg-orange transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </span>
            )}
          </span>
        </button>
      )}

      {error && (
        <span role="alert" className="mono mt-2 block text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
