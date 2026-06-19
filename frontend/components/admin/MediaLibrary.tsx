"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import type { MediaAsset } from "@/lib/admin/types";
import * as api from "@/lib/admin/api";
import { Button, Card, Spinner } from "./ui";

export function MediaLibrary() {
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function load() {
    setLoading(true);
    api.listMedia().then(setItems).catch(() => {}).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const f of files) await api.uploadMedia(f);
      toast.success(`Uploaded ${files.length} file${files.length > 1 ? "s" : ""}`);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function del(asset: MediaAsset) {
    if (!confirm("Delete this asset from Cloudinary? This cannot be undone.")) return;
    try {
      await api.deleteMedia(asset.id);
      setItems((prev) => prev.filter((a) => a.id !== asset.id));
      toast.success("Asset deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-zinc-100">Media</h1>
          <p className="mt-1 text-sm text-zinc-400">Images and video stored on Cloudinary.</p>
        </div>
        <input ref={fileRef} type="file" accept="image/*,video/*" multiple hidden onChange={onFiles} />
        <Button onClick={() => fileRef.current?.click()} loading={uploading}>
          {!uploading && <Upload className="size-4" />} Upload
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 flex h-48 items-center justify-center"><Spinner /></div>
      ) : items.length === 0 ? (
        <Card className="mt-6 flex h-48 items-center justify-center text-sm text-zinc-400">
          No media yet — upload images to use them across the site.
        </Card>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((a) => (
            <Card key={a.id} className="group overflow-hidden">
              <div className="relative aspect-square bg-zinc-800">
                {a.resource_type === "video" ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video src={a.url} className="size-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.url} alt={a.original_filename || ""} className="size-full object-cover" />
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-1 bg-gradient-to-t from-zinc-950/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => copy(a.url)} className="rounded-md bg-white/90 p-1.5 text-zinc-700 hover:bg-white" aria-label="Copy URL">
                    {copied === a.url ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                  </button>
                  <button onClick={() => del(a)} className="rounded-md bg-white/90 p-1.5 text-red-600 hover:bg-white" aria-label="Delete">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <p className="truncate px-2 py-1.5 text-xs text-zinc-400">{a.original_filename || a.public_id}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
