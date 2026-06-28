"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Maximize2, ArrowUpRight, Globe } from "lucide-react";
import type { Portfolio } from "@/lib/cms";
import { EASE, DUR } from "@/lib/motion";
import { useInfiniteList } from "@/lib/useInfiniteList";
import { Tilt } from "@/components/fx/Tilt";
import { LoadMore } from "@/components/ui/LoadMore";
import { ScreenshotScroll } from "@/components/work/blocks/ScreenshotScroll";

export function PortfolioGallery({ items }: { items: Portfolio[] }) {
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))],
    [items],
  );
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Portfolio | null>(null);

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);
  const { visible, hasMore, shown, total, sentinelRef } = useInfiniteList(filtered, {
    step: 12,
    resetKey: filter,
  });

  return (
    <>
      {/* filter bar */}
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => {
          const on = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`mono rounded-full border px-4 py-1.5 text-[length:var(--text-mono)] uppercase tracking-wider transition-colors ${
                on
                  ? "border-orange bg-orange text-dark"
                  : "border-line-invert text-on-ink-2 hover:border-orange/50 hover:text-orange"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* grid */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((it, i) => {
            const wide = i % 5 === 0;
            const isWeb = it.category === "Website";
            return (
              <motion.div
                key={`${it.title}-${i}`}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: DUR.medium, ease: EASE.outQuart }}
                className={wide ? "col-span-2" : ""}
              >
                {isWeb && it.screenshot ? (
                  <figure className="overflow-hidden rounded-lg border border-line-invert-2 bg-dark-2 p-2">
                    <ScreenshotScroll screenshot={it.screenshot} url={it.url} title={it.client || it.title} />
                    <figcaption className="flex items-center justify-between gap-3 px-2 py-3">
                      <span className="label text-on-ink">{it.title}</span>
                      {it.client && <span className="mono text-on-ink-3">{it.client}</span>}
                    </figcaption>
                  </figure>
                ) : (
                  <Tilt max={5}>
                    <button
                      onClick={() => setOpen(it)}
                      aria-label={`Open ${it.title}`}
                      className={`group relative block w-full overflow-hidden rounded-lg border border-line-invert-2 bg-dark-3 ${
                        wide ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    >
                      {it.image && (
                        <Image
                          src={it.image}
                          alt={`${it.title}${it.client ? ` — ${it.client}` : ""}`}
                          fill
                          sizes={wide ? "(min-width:1024px) 62vw, 92vw" : "(min-width:1024px) 31vw, 46vw"}
                          className="object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                      )}
                      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-dark/85 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex items-center justify-between">
                          <span className="mono rounded-full bg-dark/70 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-on-ink backdrop-blur">
                            {isWeb && <Globe className="mr-1 inline size-3" />}
                            {it.category}
                          </span>
                          <Maximize2 className="size-4 text-orange" />
                        </div>
                        <div>
                          <p className="label text-on-ink">{it.title}</p>
                          {it.client && <p className="mono text-on-ink-3">{it.client}</p>}
                        </div>
                      </div>
                    </button>
                  </Tilt>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <LoadMore
        sentinelRef={sentinelRef}
        hasMore={hasMore}
        shown={shown}
        total={total}
        noun="pieces"
      />

      {/* lightbox */}
      <Dialog.Root open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-dark/90 backdrop-blur-md" />
          <Dialog.Content className="fixed inset-0 z-[201] flex flex-col items-center justify-center p-4 outline-none sm:p-10">
            <Dialog.Title className="sr-only">{open?.title}</Dialog.Title>
            <Dialog.Close
              className="absolute right-4 top-4 rounded-full bg-dark-2 p-2.5 text-on-ink-2 transition-colors hover:text-orange"
              aria-label="Close"
            >
              <X className="size-5" />
            </Dialog.Close>
            {open?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={open.image}
                alt={open.title}
                className="max-h-[78vh] w-auto rounded-lg object-contain"
              />
            )}
            <div className="mono mt-5 flex items-center gap-4 text-on-ink-3">
              <span className="text-on-ink">{open?.title}</span>
              {open?.client && <span>· {open.client}</span>}
              <span>· {open?.category}</span>
              {open?.url && (
                <a
                  href={open.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-orange hover:underline"
                >
                  Visit <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
