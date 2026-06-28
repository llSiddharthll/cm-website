"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Post } from "@/lib/agency";
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
  const [featured, ...rest] = filtered;

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
              className="group flex h-full flex-col border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50 md:p-10"
            >
              {featured.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.cover}
                  alt=""
                  className="mb-7 aspect-[16/9] w-full rounded-lg bg-dark-3 object-cover md:aspect-[2.4/1]"
                />
              )}
              <Meta post={featured} />
              <h2 className="display mt-6 max-w-3xl text-[length:var(--text-h2)] leading-[0.95] text-on-ink transition-colors duration-200 group-hover:text-orange">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl flex-1 text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                {featured.excerpt}
              </p>
              <span className="label mt-8 inline-flex items-center gap-2 text-on-ink">
                Read
                <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </motion.div>
        )}

        {rest.map((p) => (
          <motion.div key={p.slug} variants={item} className="col-span-12 md:col-span-6">
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50"
            >
              {p.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.cover}
                  alt=""
                  className="mb-5 aspect-[16/10] w-full rounded-lg bg-dark-3 object-cover"
                />
              )}
              <Meta post={p} />
              <h3 className="display mt-5 text-[length:var(--text-h3)] leading-[1.05] text-on-ink transition-colors duration-200 group-hover:text-orange">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-on-ink-2">{p.excerpt}</p>
              <span className="label mt-6 inline-flex items-center gap-2 text-on-ink">
                Read
                <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
