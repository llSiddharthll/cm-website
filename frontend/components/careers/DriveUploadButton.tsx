"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, UploadCloud, Check, FileText, X } from "lucide-react";

/**
 * CV upload straight into the applicant's OWN Google Drive — no Google Picker,
 * a fully custom drag-&-drop dropzone. Flow: GIS token (drive.file) → multipart
 * upload to Drive → set "anyone with the link → reader" → return webViewLink.
 * Nothing touches our storage.
 *
 * Needs an OAuth Web client id (the API key is not required for direct upload):
 *   NEXT_PUBLIC_GOOGLE_CLIENT_ID
 */
const CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "596691896133-j8m3lvk14qohvlgbefhchcauiiv5foj5.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/drive.file";
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx";
const OK_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const driveUploadEnabled = Boolean(CLIENT_ID);

/* eslint-disable @typescript-eslint/no-explicit-any */
function loadGis(): Promise<void> {
  return new Promise((resolve, reject) => {
    const src = "https://accounts.google.com/gsi/client";
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("gis"));
    document.body.appendChild(s);
  });
}

type State = "idle" | "auth" | "uploading" | "done" | "error";

export function DriveUploadButton({
  onUploaded,
}: {
  onUploaded: (url: string, filename: string) => void;
}) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const tokenRef = useRef("");
  const tokenClientRef = useRef<any>(null);
  const pendingRef = useRef<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!driveUploadEnabled) return;
    let alive = true;
    loadGis()
      .then(() => {
        if (!alive) return;
        tokenClientRef.current = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPE,
          callback: (resp: any) => {
            if (resp.error || !resp.access_token) {
              setState("error");
              setError("Google sign-in was cancelled.");
              return;
            }
            tokenRef.current = resp.access_token;
            const f = pendingRef.current;
            if (f) void doUpload(f, resp.access_token);
          },
        });
        setReady(true);
      })
      .catch(() => alive && setError("Couldn't load Google sign-in."));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doUpload = useCallback(
    async (file: File, token: string) => {
      setState("uploading");
      setProgress(0);
      try {
        const link = await new Promise<{ url: string; name: string }>((resolve, reject) => {
          const meta = { name: file.name, mimeType: file.type || "application/octet-stream" };
          const body = new FormData();
          body.append(
            "metadata",
            new Blob([JSON.stringify(meta)], { type: "application/json" }),
          );
          body.append("file", file);
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink,name",
          );
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
          };
          xhr.onload = async () => {
            if (xhr.status < 200 || xhr.status >= 300)
              return reject(new Error("Upload failed"));
            const data = JSON.parse(xhr.responseText);
            // share: anyone with the link can view
            await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}/permissions`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
              body: JSON.stringify({ role: "reader", type: "anyone" }),
            });
            resolve({ url: data.webViewLink, name: data.name });
          };
          xhr.onerror = () => reject(new Error("Network error during upload"));
          xhr.send(body);
        });
        setName(link.name);
        setState("done");
        onUploaded(link.url, link.name);
      } catch (err) {
        setState("error");
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        pendingRef.current = null;
      }
    },
    [onUploaded],
  );

  const begin = useCallback(
    (file?: File | null) => {
      if (!file) return;
      setError("");
      if (!OK_TYPES.has(file.type) && !/\.(pdf|docx?|)$/i.test(file.name)) {
        setState("error");
        setError("Please choose a PDF or Word document.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setState("error");
        setError("File must be under 10 MB.");
        return;
      }
      if (tokenRef.current) {
        void doUpload(file, tokenRef.current);
      } else {
        pendingRef.current = file;
        setState("auth");
        tokenClientRef.current?.requestAccessToken({ prompt: "consent" });
      }
    },
    [doUpload],
  );

  if (!driveUploadEnabled) return null;

  const busy = state === "auth" || state === "uploading";
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
        onChange={(e) => begin(e.target.files?.[0])}
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
              Uploaded to your Drive · shared “anyone with the link”
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
          onClick={() => ready && !busy && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            if (!busy) begin(e.dataTransfer.files?.[0]);
          }}
          disabled={!ready || busy}
          className={`flex w-full items-center gap-4 rounded-lg border border-dashed px-5 py-4 text-left transition-colors disabled:cursor-not-allowed ${
            drag
              ? "border-orange bg-orange/[0.06]"
              : "border-line-invert bg-dark-2 hover:border-orange/60"
          }`}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange/10 text-orange">
            {busy ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <UploadCloud className="size-5" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-on-ink">
              {state === "auth"
                ? "Waiting for Google sign-in…"
                : state === "uploading"
                  ? `Uploading to your Drive… ${progress}%`
                  : ready
                    ? "Drag & drop your CV, or click to browse"
                    : "Loading Google Drive…"}
            </span>
            <span className="mono block text-xs text-on-ink-3">
              PDF or Word · up to 10 MB · saved to your own Drive, shared view-only
            </span>
            {state === "uploading" && (
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
