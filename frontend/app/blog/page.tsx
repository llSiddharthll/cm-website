import type { Metadata } from "next";
import { getPosts } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { PageHero } from "@/components/agency/PageHero";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on digital marketing, SEO, Google Ads, social media and growth — from the Creative Monk studio in Chandigarh.",
};

export default async function BlogPage() {
  const POSTS = await getPosts();

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 04"
          kicker="Journal"
          titleLines={["Notes from", "the studio"]}
          lede="Practical guides on digital marketing, SEO, Google Ads, social media and growth — short reads that compound into something you own."
          meta={`${POSTS.length} articles`}
        />

        {/* ── Posts list ── */}
        <section className="bg-dark pb-[var(--section-pad)]">
          <div className="shell">
            <BlogIndex posts={POSTS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
