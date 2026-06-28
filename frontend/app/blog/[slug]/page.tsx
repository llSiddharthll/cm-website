import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPosts, getPost, getSite, getServicesGrid } from "@/lib/cms";
import { Prose } from "@/components/ui/Prose";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

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
  return { title: post.title, description: post.excerpt };
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
  const next = POSTS[(index + 1) % POSTS.length];
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

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Article header ── */}
        <section className="bg-dark section pt-[clamp(8rem,18vh,12rem)]">
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

            <Reveal
              delay={0.05}
              className="mono mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-on-ink-3"
            >
              <span className="text-orange">{post.category}</span>
              <span aria-hidden className="opacity-40">
                ·
              </span>
              <span>{formattedDate}</span>
              <span aria-hidden className="opacity-40">
                ·
              </span>
              <span>{post.read}</span>
            </Reveal>

            <h1 className="display-tight mt-6 max-w-[16ch] text-[length:var(--text-h2)] text-on-ink">
              <RevealLines lines={[post.title]} />
              <span
                aria-hidden
                className="ml-[0.1em] inline-block aspect-square w-[0.4em] bg-orange align-baseline"
              />
            </h1>
          </div>
        </section>

        {/* ── Article body ── */}
        <section className="bg-dark section pt-0">
          <div className="shell">
            <div className="mx-auto max-w-2xl border-t border-line-invert pt-10">
              <Reveal y={20}>
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
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Next article ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <Link
              href={`/blog/${next.slug}`}
              className="group/next grid12 items-end gap-y-4 border-t border-line-invert pt-8"
            >
              <div className="col-span-9">
                <span className="label text-on-ink-3">Next article</span>
                <p className="display mt-3 text-[length:var(--text-h2)] leading-[1.05] text-on-ink transition-colors duration-200 group-hover/next:text-orange">
                  {next.title}
                </p>
              </div>
              <ArrowRight className="col-span-3 size-10 justify-self-end text-on-ink-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/next:translate-x-2 group-hover/next:text-orange" />
            </Link>
          </div>
        </section>

        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
