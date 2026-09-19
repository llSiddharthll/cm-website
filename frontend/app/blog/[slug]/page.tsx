import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPosts, getPost, getSite, getServicesGrid } from "@/lib/cms";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { stripHtml } from "@/lib/admin/html";
import { Prose } from "@/components/ui/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareRow } from "@/components/blog/ShareRow";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog" };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
    type: "article",
    publishedTime: new Date(post.date).toISOString(),
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const POSTS = await getPosts();
  const index = POSTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = POSTS[index];
  const related = [
    ...POSTS.filter((p) => p.slug !== slug && p.category === post.category),
    ...POSTS.filter((p) => p.slug !== slug && p.category !== post.category),
  ].slice(0, 3);
  const site = await getSite();

  // body may arrive as rich-text HTML (new) or a paragraph array (legacy data) — normalise.
  const bodyHtml = Array.isArray(post.body)
    ? (post.body as unknown as string[]).map((p) => `<p>${p}</p>`).join("")
    : (post.body ?? "");
  const servicesGrid = await getServicesGrid();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const cleanTitle = stripHtml(post.title);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: cleanTitle, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <ReadingProgress />
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Article header ── */}
        <section className="bg-dark pt-[clamp(8rem,18vh,12rem)] pb-10 md:pb-12">
          <div className="shell">
            <Reveal>
              <Link
                href="/blog"
                className="label group/back inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:-translate-x-1" />
                All articles
              </Link>
            </Reveal>

            <div className="mx-auto mt-8 max-w-3xl">
              <Reveal>
                <span className="mono inline-flex items-center gap-1.5 rounded-full border border-orange/40 bg-orange/[0.06] px-3 py-1 text-xs text-orange">
                  {post.category}
                </span>
              </Reveal>

              <h1 className="display-tight mt-6 text-[length:var(--text-h1)] leading-[0.98] text-on-ink">
                <RevealLines lines={[cleanTitle]} />
              </h1>

              {post.excerpt && (
                <Reveal
                  as="span"
                  delay={0.1}
                  className="mt-6 block text-[length:var(--text-lead)] leading-snug text-on-ink-2"
                >
                  {post.excerpt}
                </Reveal>
              )}

              <Reveal
                delay={0.14}
                className="mono mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-on-ink-3"
              >
                <span className="flex items-center gap-2 text-on-ink-2">
                  <span className="grid size-6 place-items-center rounded-full bg-orange text-[10px] font-bold text-on-orange">
                    CM
                  </span>
                  Creative Monk
                </span>
                <span aria-hidden className="opacity-40">·</span>
                <span>{formattedDate}</span>
                <span aria-hidden className="opacity-40">·</span>
                <span>{post.read}</span>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Cover image ── */}
        {post.cover && (
          <div className="shell">
            <div className="mx-auto max-w-4xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt={cleanTitle}
                className="aspect-[16/10] w-full rounded-2xl border border-line-invert-2 bg-dark-2 object-cover md:aspect-[2/1]"
              />
            </div>
          </div>
        )}

        {/* ── Article body ── */}
        <section className="bg-dark section pt-12 md:pt-16">
          <div className="shell">
            <div className="mx-auto max-w-2xl">
              {/* Article body renders immediately — a long body is taller than
                  the viewport, so a scroll-reveal threshold would never fire. */}
              {bodyHtml.trim() ? (
                <Prose html={bodyHtml} className="text-on-ink-2" />
              ) : (
                <div className="space-y-7">
                  <p className="text-[length:var(--text-lead)] leading-relaxed text-on-ink">
                    {post.excerpt}
                  </p>
                  {post.source && (
                    <a
                      href={post.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta label inline-flex items-center gap-1.5 bg-orange px-4 py-2.5 text-on-orange transition-colors duration-200 hover:bg-orange-press"
                    >
                      Read the full article
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                    </a>
                  )}
                </div>
              )}

              <ShareRow title={cleanTitle} path={`/blog/${post.slug}`} />
            </div>
          </div>
        </section>

        {/* ── More from the journal ── */}
        {related.length > 0 && (
          <section className="bg-dark-2 section">
            <div className="shell">
              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line-invert pt-10">
                <h2 className="display text-[length:var(--text-h3)] leading-tight text-on-ink">
                  More from the journal
                </h2>
                <Link
                  href="/blog"
                  className="label group/all inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
                >
                  All articles
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-1" />
                </Link>
              </div>

              <div className="mt-10 grid12 gap-y-[var(--col-gap)]">
                {related.map((p) => (
                  <div key={p.slug} className="col-span-12 sm:col-span-6 lg:col-span-4">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert-2 bg-dark transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50"
                    >
                      {p.cover ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-dark-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.cover}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] w-full bg-gradient-to-br from-dark-3 to-dark-2" />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <span className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3">
                          <span className="text-orange">{p.category}</span>
                          <span aria-hidden>·</span>
                          <span>{p.read}</span>
                        </span>
                        <h3 className="display mt-3 text-[length:var(--text-h3)] leading-[1.1] text-on-ink transition-colors duration-200 group-hover/card:text-orange">
                          {p.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
