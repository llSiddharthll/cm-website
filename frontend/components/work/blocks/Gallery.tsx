"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type Img = { image: string; caption?: string };

export function Gallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const valid = images.filter((x) => x.image);
  if (!valid.length) return null;

  const show = (idx: number) => {
    setI(idx);
    setOpen(true);
  };
  const prev = () => setI((v) => (v - 1 + valid.length) % valid.length);
  const next = () => setI((v) => (v + 1) % valid.length);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {valid.map((img, idx) => (
          <button
            key={idx}
            onClick={() => show(idx)}
            aria-label={`Open image ${idx + 1}${img.caption ? `: ${img.caption}` : ""}`}
            className={`group relative overflow-hidden rounded-lg bg-dark-2 ${
              idx % 5 === 0 ? "col-span-2 aspect-[16/10] md:aspect-[16/9]" : "aspect-square"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.image}
              alt={img.caption || ""}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-dark/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {img.caption ? (
                <span className="mono text-[length:var(--text-mono)] text-on-ink">{img.caption}</span>
              ) : (
                <span />
              )}
              <Maximize2 className="size-4 shrink-0 text-orange" />
            </div>
          </button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-dark/90 backdrop-blur-md" />
          <Dialog.Content className="fixed inset-0 z-[201] flex flex-col items-center justify-center p-4 outline-none sm:p-10">
            <Dialog.Title className="sr-only">Gallery image {i + 1}</Dialog.Title>
            <Dialog.Close className="absolute right-4 top-4 rounded-full bg-dark-2 p-2.5 text-on-ink-2 transition-colors hover:text-orange" aria-label="Close">
              <X className="size-5" />
            </Dialog.Close>

            <div className="flex max-h-[80vh] w-full max-w-5xl items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={valid[i].image} alt={valid[i].caption || ""} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            </div>

            <div className="mt-5 flex items-center gap-6">
              <button onClick={prev} className="rounded-full bg-dark-2 p-3 text-on-ink-2 transition-colors hover:text-orange" aria-label="Previous">
                <ChevronLeft className="size-5" />
              </button>
              <span className="mono text-on-ink-3">
                {String(i + 1).padStart(2, "0")} / {String(valid.length).padStart(2, "0")}
                {valid[i].caption ? ` · ${valid[i].caption}` : ""}
              </span>
              <button onClick={next} className="rounded-full bg-dark-2 p-3 text-on-ink-2 transition-colors hover:text-orange" aria-label="Next">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
