"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EASE, DUR, VIEWPORT } from "@/lib/motion";
import { SITE } from "@/lib/content";

/**
 * Contact — the dark finale.
 * Swiss bold-minimal: an oversized grotesk CTA closed by the orange-square
 * full-stop (mirroring the hero signature), two flat actions, and a hairline
 * contact ledger. Boldness spent on one line; quiet, precise everywhere else.
 */

const HEADLINE = ["Let's build", "something", "that compounds"];

const DETAILS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Phone", value: SITE.phone, href: `tel:${SITE.phoneHref}` },
  { label: "Studio", value: SITE.address, href: null },
  { label: "Located", value: SITE.city, href: null },
] as const;

export function Contact() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: VIEWPORT.once, amount: VIEWPORT.amount });

  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-ink-block text-on-ink"
    >
      <div className="shell">
        {/* ── Kicker ── */}
        <Reveal>
          <Eyebrow index="08" invert>
            Let&apos;s talk
          </Eyebrow>
        </Reveal>

        {/* ── The statement ── */}
        <div className="grid12 mt-10 md:mt-14">
          <h2
            ref={ref}
            className="display-tight col-span-6 text-[length:var(--text-h2)] text-on-ink md:col-span-11"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  animate={inView ? { y: "0%" } : { y: "115%" }}
                  transition={{
                    duration: DUR.xl,
                    ease: EASE.outQuart,
                    delay: i * 0.09,
                  }}
                >
                  {line}
                  {/* orange square full-stop — the single bold accent */}
                  {i === HEADLINE.length - 1 && (
                    <span
                      aria-hidden
                      className="ml-[0.14em] inline-block aspect-square w-[0.56em] translate-y-[0.02em] bg-orange align-baseline"
                    />
                  )}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* ── Supporting line + actions ── */}
        <div className="grid12 mt-12 items-end gap-y-10 md:mt-16">
          <Reveal delay={0.1} className="col-span-6 md:col-span-5">
            <p className="max-w-md text-[length:var(--text-lead)] leading-snug text-on-ink-2">
              Tell us where you want to be in twelve months. We&apos;ll show you
              the route — and build the engine that gets you there.
            </p>
          </Reveal>

          <Reveal
            delay={0.18}
            className="col-span-6 flex flex-wrap items-center gap-4 md:col-span-6 md:col-start-7 md:justify-end"
          >
            <Button href={`mailto:${SITE.email}`} variant="primary" size="lg">
              Start a project
            </Button>
            <Button href={SITE.whatsapp} variant="invert" size="lg">
              Chat on WhatsApp
            </Button>
          </Reveal>
        </div>

        {/* ── Contact ledger — hairline-divided cells ── */}
        <div className="grid12 mt-20 border-t border-line-invert pt-px md:mt-28">
          {DETAILS.map((item, i) => {
            const body = (
              <>
                <span className="label text-on-ink-2">{item.label}</span>
                <span className="mt-3 block text-[length:var(--text-body)] leading-snug text-on-ink transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cell:text-orange">
                  {item.value}
                </span>
              </>
            );

            const cellClass =
              "group/cell col-span-6 border-b border-line-invert py-6 md:col-span-3 md:border-b-0 md:border-l md:py-8 md:pl-6 md:[&:first-child]:border-l-0 md:[&:first-child]:pl-0";

            return (
              <Reveal key={item.label} delay={0.05 * i} className={cellClass}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="block">{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
