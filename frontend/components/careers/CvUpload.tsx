"use client";

import { useRef, useState } from "react";
import { Loader2, UploadCloud, Check } from "lucide-react";

/**
 * Direct CV upload — posts the file to the public /api/intake/upload endpoint
 * (stored on Cloudinary) and hands the resulting URL back to the form. Used as
 * the default uploader; the Google-Drive path is an optional alternative.
 */
const API = "https://34-172-180-194.nip.io".replace(/\/$/, "");
const ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function CvUpload({
  onUploaded,
}: {
  onUploaded: (url: string, name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10 MB.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API}/api/intake/upload`, { method: "POST", body: fd });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({}))).error || "Upload failed";
        throw new Error(msg);
      }
      const { url } = await res.json();
      setName(file.name);
      onUploaded(url, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="mb-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={handle}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-2 border border-line-invert bg-dark px-4 py-2.5 text-sm text-on-ink transition-colors hover:border-orange disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="size-4 animate-spin" />
        ) : name ? (
          <Check className="size-4 text-orange" />
        ) : (
          <UploadCloud className="size-4 text-orange" />
        )}
        {name ? `Uploaded: ${name}` : busy ? "Uploading…" : "Upload CV (PDF / Word)"}
      </button>
      {error && <span className="mono ml-3 text-sm text-red-400">{error}</span>}
      <p className="mono mt-2 text-xs text-on-ink-3">
        PDF or Word, up to 10 MB — we&rsquo;ll fill the link below automatically.
      </p>
    </div>
  );
}
