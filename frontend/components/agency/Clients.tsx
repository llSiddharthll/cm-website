import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/fx/Aurora";
import type { Client } from "@/lib/cms";

export function Clients({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-dark-2 section text-on-ink">
      <Aurora className="opacity-30" />
      <div className="shell relative z-10">
        <div className="grid12 items-end gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <Eyebrow index="06" invert>
                Clients
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-tight mt-6 text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                Trusted across the Tricity
                <br />— and beyond.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="col-span-12 md:col-span-4 md:text-right">
            <p className="max-w-sm text-on-ink-2 md:ml-auto">
              {clients.length}+ brands across 10+ sectors — built and run under one
              roof.
            </p>
          </Reveal>
        </div>

        {/* logo wall */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-invert bg-line-invert sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((c, i) => (
            <Reveal as="div" key={c.name} delay={(i % 8) * 0.04}>
              <div className="group flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-2 bg-dark-2 p-5 text-center transition-colors duration-300 hover:bg-dark">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-12 w-auto object-contain opacity-90 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
                  />
                ) : (
                  <span className="display text-[clamp(1rem,1.5vw,1.45rem)] leading-tight text-on-ink transition-colors duration-300 group-hover:text-orange">
                    {c.name}
                  </span>
                )}
                <span className="mono text-[length:var(--text-mono)] text-on-ink-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {c.sector}
                </span>
              </div>
            </Reveal>
          ))}

          {/* closing CTA tile — completes the grid (clients + 1 = multiple of 2/3/4) */}
          <Reveal as="div" delay={0.1}>
            <Link
              href="/contact"
              className="group flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-1.5 bg-orange/10 p-5 text-center transition-colors duration-300 hover:bg-orange"
            >
              <span className="display inline-flex items-center gap-1 text-[clamp(1rem,1.5vw,1.45rem)] leading-tight text-orange transition-colors duration-300 group-hover:text-dark">
                Your brand next
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="mono text-[length:var(--text-mono)] text-orange/70 transition-colors duration-300 group-hover:text-dark/70">
                Start a project
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
