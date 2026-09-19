"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Post } from "@/lib/agency";
import { useInfiniteList } from "@/lib/useInfiniteList";
import { LoadMore } from "@/components/ui/LoadMore";
import { cn } from "@/lib/utils";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

function Meta({ post }: { post: Post }) {
  return (
    <span className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3">
      <span className="text-orange">{post.category}</span>
      <span aria-hidden>·</span>
      <span>{fmtDate(post.date)}</span>
      <span aria-hidden>·</span>
      <span>{post.read}</span>
    </span>
  );
}

export function BlogIndex({ posts }: { posts: Post[] }) {
  // newest article first (by article date, not insertion order)
  const sorted = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
    [posts],
  );
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(sorted.map((p) => p.category)))],
    [sorted],
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? sorted : sorted.filter((p) => p.category === active);
  const { visible, hasMore, shown, total, sentinelRef } = useInfiniteList(filtered, {
    step: 13,
    resetKey: active,
  });
  const [featured, ...rest] = visible;

  return (
    <>
      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={cn(
              "label rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-200",
              active === c
                ? "border-orange bg-orange text-on-orange"
                : "border-line-invert text-on-ink-2 hover:border-on-ink-3 hover:text-on-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid12 gap-y-[var(--col-gap)]"
      >
        {featured && (
          <motion.div variants={item} className="col-span-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50 md:grid-cols-2"
            >
              {/* image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-dark-3 md:aspect-auto md:min-h-[26rem]">
                {featured.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.cover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                )}
                {/* blend the image into the card */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-dark-2" />
                <span className="mono absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-on-ink/15 bg-dark/50 px-3 py-1.5 text-xs text-on-ink backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-orange" />
                  Featured
                </span>
              </div>
              {/* text */}
              <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                <Meta post={featured} />
                <h2 className="display text-[length:var(--text-h2)] leading-[0.95] text-on-ink transition-colors duration-200 group-hover:text-orange">
                  {featured.title}
                </h2>
                <p className="line-clamp-3 max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                  {featured.excerpt}
                </p>
                <span className="label inline-flex items-center gap-2 text-on-ink">
                  Read article
                  <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {rest.map((p) => (
          <motion.div key={p.slug} variants={item} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50"
            >
              {p.cover ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-dark-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-dark-3 to-dark-2" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <Meta post={p} />
                <h3 className="display mt-4 text-[length:var(--text-h3)] leading-[1.08] text-on-ink transition-colors duration-200 group-hover:text-orange">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-on-ink-2">{p.excerpt}</p>
                <span className="label mt-6 inline-flex items-center gap-2 text-on-ink">
                  Read
                  <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <LoadMore
        sentinelRef={sentinelRef}
        hasMore={hasMore}
        shown={shown}
        total={total}
        noun="articles"
      />
    </>
  );
}
