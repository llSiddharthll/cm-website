"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ImagePlus, Loader2, Trash2, Upload, X } from "lucide-react";
import * as api from "@/lib/admin/api";
import type { MediaAsset } from "@/lib/admin/types";
import { Button } from "./ui";

export function MediaPicker({
  value,
  onChange,
  kind = "image",
}: {
  value: string;
  onChange: (url: string) => void;
  kind?: "image" | "video";
}) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const asset = await api.uploadMedia(file);
      onChange(asset.url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
        {value ? (
          kind === "video" ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={value} className="size-full object-cover" muted />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          )
        ) : (
          <div className="flex size-full items-center justify-center text-zinc-300">
            <ImagePlus className="size-6" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input ref={fileRef} type="file" accept={kind === "video" ? "video/*" : "image/*"} hidden onChange={onFile} />
        <Button type="button" size="sm" variant="outline" onClick={() => fileRef.current?.click()} loading={uploading}>
          {!uploading && <Upload className="size-3.5" />} Upload
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(true)}>
          Library
        </Button>
        {value && (
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}>
            <Trash2 className="size-3.5" /> Clear
          </Button>
        )}
      </div>

      <LibraryDialog
        open={open}
        onOpenChange={setOpen}
        kind={kind}
        onPick={(url) => {
          onChange(url);
          setOpen(false);
        }}
      />
    </div>
  );
}

function LibraryDialog({
  open,
  onOpenChange,
  kind,
  onPick,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  kind: "image" | "video";
  onPick: (url: string) => void;
}) {
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    api
      .listMedia()
      .then((all) => setItems(all.filter((a) => (kind === "video" ? a.resource_type === "video" : a.resource_type !== "video"))))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [open, kind]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-zinc-900/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[111] w-[min(48rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-zinc-900">Media library</Dialog.Title>
            <Dialog.Close className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-zinc-400" />
            </div>
          ) : items.length === 0 ? (
            <p className="flex h-48 items-center justify-center text-sm text-zinc-500">
              No uploads yet — use the Upload button.
            </p>
          ) : (
            <div className="grid max-h-[60vh] grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4">
              {items.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onPick(a.url)}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-200 hover:border-orange"
                >
                  {a.resource_type === "video" ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={a.url} className="size-full object-cover" muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.url} alt={a.original_filename || ""} className="size-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
