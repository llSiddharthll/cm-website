import { BENEFITS, CULTURE_STATS, RATINGS } from "@/lib/agency";
import { IMG } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Culture() {
  return (
    <section className="bg-dark-2 text-on-ink section">
      <div className="shell">
        <Reveal>
          <Eyebrow index="10" invert>
            Life at Creative Monk
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mt-5 text-[length:var(--text-h2)] text-on-ink">
            Calm people. Loud results.
          </h2>
        </Reveal>

        <div className="grid12 mt-12">
          {/* LEFT — image collage */}
          <Reveal className="col-span-12 md:col-span-6">
            <div className="grid grid-cols-2 gap-[var(--col-gap)]">
              <img
                src={IMG.culture[0]}
                alt="Creative Monk studio life"
                className="col-span-2 aspect-[16/10] w-full rounded-[var(--radius-sm)] border border-line-invert-2 object-cover"
              />
              {IMG.culture.slice(1, 3).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Creative Monk team"
                  className="aspect-square w-full rounded-[var(--radius-sm)] border border-line-invert-2 object-cover"
                />
              ))}
            </div>
          </Reveal>

          {/* RIGHT — stats, benefits, ratings */}
          <div className="col-span-12 mt-10 md:col-span-5 md:col-start-8 md:mt-0">
            <Reveal>
              <dl className="flex flex-wrap gap-x-12 gap-y-6">
                {CULTURE_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="display text-[length:var(--text-h2)] leading-none text-on-ink">
                      {s.value}
                      <span className="text-orange">{s.suffix}</span>
                    </dd>
                    <span className="label text-on-ink-3">{s.label}</span>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="mono border border-line-invert px-3 py-1.5 text-on-ink-2"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-3 gap-[var(--col-gap)]">
                {RATINGS.map((r) => (
                  <div
                    key={r.source}
                    className="bg-dark border border-line-invert-2 p-4"
                  >
                    <span className="label block text-on-ink-3">{r.source}</span>
                    <span className="display mt-1 block text-2xl text-orange">
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
