import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CERTS } from "@/lib/agency";

/** Thin awards & certifications band. */
export function Certs({ certs = CERTS }: { certs?: readonly string[] }) {
  return (
    <section
      id="awards"
      className="border-y border-line-invert bg-dark py-[clamp(3rem,5vw,4.5rem)] text-on-ink"
    >
      <div className="shell">
        <Reveal>
          <Eyebrow index="—" invert>
            Recognised &amp; certified
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="mt-7 flex flex-wrap items-center gap-3">
            {certs.map((c, i) => (
              <li
                key={c}
                className={`flex items-center gap-2.5 border px-4 py-2.5 ${
                  i === 0
                    ? "border-orange/40 bg-orange/10"
                    : "border-line-invert"
                }`}
              >
                <span
                  className={`size-2 shrink-0 ${i === 0 ? "bg-orange" : "bg-on-ink-3"}`}
                  aria-hidden
                />
                <span
                  className={`mono ${i === 0 ? "text-on-ink" : "text-on-ink-2"}`}
                >
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
