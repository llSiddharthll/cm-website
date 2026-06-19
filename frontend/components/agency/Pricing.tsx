import { Check } from "lucide-react";
import { PRICING } from "@/lib/agency";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  return (
    <section id="pricing" className="bg-dark-2 text-on-ink section">
      <div className="shell">
        <div className="grid12 items-end gap-y-8">
          <div className="col-span-12 md:col-span-8">
            <Eyebrow index="07" invert>
              Plans
            </Eyebrow>
            <h2 className="display mt-6 text-[length:var(--text-h2)] text-on-ink">
              Engagements that fit.
            </h2>
          </div>
          <p className="col-span-12 self-end text-on-ink-2 md:col-span-4">
            Start where you are, scale when you&rsquo;re ready. Every plan is a
            partnership, not a package — built to compound into something you own.
          </p>
        </div>

        <div className="grid12 mt-12 gap-y-6">
          {PRICING.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              as="div"
              className="col-span-12 md:col-span-4"
            >
              <div
                className={`flex h-full flex-col border p-8 ${
                  t.featured
                    ? "border-orange bg-dark-3"
                    : "border-line-invert-2 bg-dark"
                }`}
              >
                {t.featured && (
                  <span className="mono self-start bg-orange px-2.5 py-1 uppercase text-on-orange">
                    Most popular
                  </span>
                )}

                <h3
                  className={`display text-[length:var(--text-h3)] text-on-ink ${
                    t.featured ? "mt-5" : ""
                  }`}
                >
                  {t.name}
                </h3>
                <p className="mt-2 text-sm text-on-ink-2">{t.tag}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="display text-[length:var(--text-h2)] text-on-ink">
                    {t.price}
                  </span>
                  <span className="mono text-on-ink-3">{t.cadence}</span>
                </div>

                <div className="my-7 border-t border-line-invert" />

                <ul className="flex-1 space-y-3">
                  {t.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-on-ink-2">
                      <Check className="size-4 shrink-0 text-orange mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#contact"
                  variant={t.featured ? "primary" : "invert"}
                  size="md"
                  className="mt-8 w-full"
                >
                  Get started
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
