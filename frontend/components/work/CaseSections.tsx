import { Paperclip, ArrowUpRight } from "lucide-react";
import type { CaseSection } from "@/lib/cms";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Gallery } from "./blocks/Gallery";
import { ScreenshotScroll } from "./blocks/ScreenshotScroll";
import { StatsGraph } from "./blocks/StatsGraph";
import { SeoBlock } from "./blocks/SeoBlock";

const KIND_LABEL: Record<string, string> = {
  gallery: "Creatives",
  website: "Development",
  marketing: "Marketing",
  seo: "SEO",
  content: "Content",
  quote: "In their words",
};

export function CaseSections({
  sections,
  client,
}: {
  sections: CaseSection[];
  client: string;
}) {
  if (!sections.length) return null;

  return (
    <section className="bg-dark text-on-ink">
      <div className="shell space-y-20 py-[clamp(4rem,9vh,7rem)] md:space-y-28">
        {sections.map((s, i) => {
          const label = s.category || KIND_LABEL[s.kind] || "Work";
          const heading = s.title || s.discipline;
          const isQuote = s.kind === "quote";

          return (
            <article key={i} className="border-t border-line-invert pt-8 md:pt-10">
              {/* compact header — heading + intro close together */}
              {!isQuote && (
                <div className="grid12 items-end gap-y-3">
                  <Reveal className="col-span-12 md:col-span-7">
                    <Eyebrow index={String(i + 1).padStart(2, "0")} invert>
                      {label}
                    </Eyebrow>
                    {heading && (
                      <h2 className="display mt-4 text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                        {heading}
                      </h2>
                    )}
                  </Reveal>
                  {s.intro && (
                    <Reveal
                      as="span"
                      delay={0.08}
                      className="col-span-12 block max-w-md text-on-ink-2 md:col-span-4 md:col-start-9 md:pb-1.5 md:text-right"
                    >
                      {s.intro}
                    </Reveal>
                  )}
                </div>
              )}

              {/* block */}
              <div className={isQuote ? "" : "mt-9"}>
                {s.kind === "gallery" && s.images?.length ? (
                  <Reveal y={30}>
                    <Gallery images={s.images} />
                  </Reveal>
                ) : null}

                {s.kind === "website" ? (
                  <Reveal y={30}>
                    <ScreenshotScroll screenshot={s.screenshot} url={s.url} title={client} />
                  </Reveal>
                ) : null}

                {s.kind === "marketing" && s.stats?.length ? (
                  <StatsGraph stats={s.stats} />
                ) : null}

                {s.kind === "seo" ? <SeoBlock keywords={s.keywords} stats={s.stats} /> : null}

                {s.kind === "content" && s.body?.length ? (
                  <div className="grid12">
                    <div className="col-span-12 space-y-5 md:col-span-8">
                      {s.body.map((p, j) => (
                        <Reveal
                          as="span"
                          key={j}
                          delay={j * 0.06}
                          className="block text-[length:var(--text-lead)] leading-relaxed text-on-ink-2"
                        >
                          {p}
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ) : null}

                {isQuote && s.quote ? (
                  <Reveal>
                    <figure className="grid12">
                      <blockquote className="display-tight col-span-12 text-[length:var(--text-h2)] leading-[1.12] text-on-ink md:col-span-10">
                        <span className="text-orange">&ldquo;</span>
                        {s.quote}
                        <span className="text-orange">&rdquo;</span>
                      </blockquote>
                      {s.author && (
                        <figcaption className="mono col-span-12 mt-6 text-on-ink-3">
                          — {s.author}
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                ) : null}
              </div>

              {/* attachments */}
              {s.attachments?.length ? (
                <Reveal className="mt-7">
                  <div className="flex flex-wrap gap-3">
                    {s.attachments.map((a, j) => (
                      <a
                        key={j}
                        href={a.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mono inline-flex items-center gap-2 rounded-full border border-line-invert px-4 py-2 text-on-ink-2 transition-colors hover:border-orange/50 hover:text-orange"
                      >
                        <Paperclip className="size-3.5" /> {a.label || "Attachment"}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
