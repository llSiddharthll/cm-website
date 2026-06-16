import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { POSTS } from "@/lib/agency";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { PageHero } from "@/components/agency/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays on brand, growth and craft from the Creative Monk studio — notes on owning your growth, not renting it.",
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 04"
          kicker="Journal"
          titleLines={["Notes from", "the studio"]}
          lede="Essays on brand, growth and craft — short reads on building things that compound instead of attention you have to keep renting."
          meta={`${POSTS.length} articles`}
        />

        {/* ── Posts list ── */}
        <section className="bg-dark pb-[var(--section-pad)]">
          <div className="shell">
            <Reveal className="grid12 gap-y-[var(--col-gap)]" y={36}>
              {/* Featured post */}
              <Link
                href={`/blog/${featured.slug}`}
                className="group col-span-12 flex flex-col border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50 md:p-10"
              >
                <span className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3">
                  <span className="text-orange">{featured.category}</span>
                  <span aria-hidden>·</span>
                  <span>{fmtDate(featured.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.read}</span>
                </span>
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

              {/* Remaining posts */}
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group col-span-12 flex h-full flex-col border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50 md:col-span-6"
                >
                  <span className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3">
                    <span className="text-orange">{p.category}</span>
                    <span aria-hidden>·</span>
                    <span>{fmtDate(p.date)}</span>
                    <span aria-hidden>·</span>
                    <span>{p.read}</span>
                  </span>
                  <h3 className="display mt-5 text-[length:var(--text-h3)] leading-[1.05] text-on-ink transition-colors duration-200 group-hover:text-orange">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-on-ink-2">
                    {p.excerpt}
                  </p>
                  <span className="label mt-6 inline-flex items-center gap-2 text-on-ink">
                    Read
                    <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
