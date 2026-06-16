import { Star } from "lucide-react";
import { REVIEWS, REVIEW_SUMMARY } from "@/lib/agency";
import { IMG } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Reviews() {
  return (
    <section className="bg-dark text-on-ink section">
      <div className="shell">
        {/* Header */}
        <div className="grid12">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow index="08" invert>
              Clients
            </Eyebrow>
            <h2 className="display mt-5 text-[length:var(--text-h2)] text-on-ink">
              Loved by founders.
            </h2>
          </div>

          <div className="col-span-12 mt-8 md:col-span-4 md:col-start-9 md:mt-0">
            <div className="display text-[length:var(--text-h2)] leading-none text-orange">
              {REVIEW_SUMMARY.rating}
            </div>
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 text-orange fill-orange" aria-hidden />
              ))}
            </div>
            <p className="mono mt-3 text-on-ink-3">
              {REVIEW_SUMMARY.count} reviews · {REVIEW_SUMMARY.platforms}
            </p>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid12 mt-[clamp(2.5rem,5vw,4.5rem)] gap-y-[var(--col-gap)]">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.name}
              as="div"
              delay={i * 0.06}
              className="col-span-12 md:col-span-4"
            >
              <article className="flex h-full flex-col bg-dark-2 border border-line-invert-2 p-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.round(r.rating) }).map((_, s) => (
                    <Star
                      key={s}
                      className="size-4 text-orange fill-orange"
                      aria-hidden
                    />
                  ))}
                </div>

                <p className="mt-5 flex-1 text-[length:var(--text-body)] text-on-ink">
                  {r.quote}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={IMG.avatars[i % IMG.avatars.length]}
                    alt=""
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-on-ink">{r.name}</div>
                    <div className="mono text-on-ink-3">{r.role}</div>
                  </div>
                </div>

                <div className="mono mt-3 border-t border-line-invert pt-3 text-on-ink-3">
                  {r.service}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
