import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Section = { h: string; p: string[] };

export function LegalDoc({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <section className="section pt-[clamp(7rem,16vh,10rem)]">
      <div className="shell max-w-3xl">
        <Reveal>
          <Eyebrow invert>Legal</Eyebrow>
          <h1 className="display-tight mt-6 text-[length:var(--text-h1)] leading-[1.02] text-on-ink">
            {title}
          </h1>
          <p className="mono mt-4 text-[length:var(--text-mono)] text-on-ink-3">
            Last updated: {updated}
          </p>
        </Reveal>

        <div className="mt-14 space-y-12">
          {sections.map((s) => (
            <Reveal as="div" key={s.h}>
              <h2 className="display text-[length:var(--text-h3)] text-on-ink">{s.h}</h2>
              <div className="mt-4 space-y-3">
                {s.p.map((para, i) => (
                  <p key={i} className="max-w-prose leading-relaxed text-on-ink-2">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
