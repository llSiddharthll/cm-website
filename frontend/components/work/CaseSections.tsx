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
    <>
      {sections.map((s, i) => {
        const label = s.discipline || KIND_LABEL[s.kind] || "Work";
        const bg = i % 2 === 0 ? "bg-dark" : "bg-dark-2";

        return (
          <section key={i} className={`${bg} section`}>
            <div className="shell">
              {/* section header */}
              <div className="grid12 items-end gap-y-4">
                <Reveal className="col-span-12 md:col-span-8">
                  <Eyebrow index={String(i + 1).padStart(2, "0")} invert>
                    {label}
                  </Eyebrow>
                  {s.title && (
                    <h2 className="display mt-6 max-w-3xl text-[length:var(--text-h2)] leading-[1.05] text-on-ink">
                      {s.title}
                    </h2>
                  )}
                </Reveal>
                {s.intro && (
                  <Reveal
                    as="span"
                    delay={0.1}
                    className="col-span-12 block max-w-md text-on-ink-2 md:col-span-4 md:text-right"
                  >
                    {s.intro}
                  </Reveal>
                )}
              </div>

              {/* block */}
              <div className="mt-12">
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
                  <div className="grid12">
                    <div className="col-span-12 lg:col-span-8">
                      <StatsGraph stats={s.stats} />
                    </div>
                  </div>
                ) : null}

                {s.kind === "seo" ? <SeoBlock keywords={s.keywords} stats={s.stats} /> : null}

                {s.kind === "content" && s.body?.length ? (
                  <div className="grid12">
                    <div className="col-span-12 space-y-6 md:col-span-8 md:col-start-3">
                      {s.body.map((p, j) => (
                        <Reveal as="span" key={j} delay={j * 0.06} className="block text-[length:var(--text-lead)] leading-relaxed text-on-ink-2">
                          {p}
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ) : null}

                {s.kind === "quote" && s.quote ? (
                  <Reveal>
                    <figure className="grid12">
                      <blockquote className="display-tight col-span-12 text-[length:var(--text-h2)] leading-[1.15] text-on-ink md:col-span-10 md:col-start-2">
                        <span className="text-orange">&ldquo;</span>
                        {s.quote}
                        <span className="text-orange">&rdquo;</span>
                      </blockquote>
                      {s.author && (
                        <figcaption className="mono col-span-12 mt-6 text-on-ink-3 md:col-start-2">
                          — {s.author}
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
