"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { SERVICES, type Service } from "@/lib/content";
import { EASE, DUR } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Services — an expanding editorial table.
 * Each discipline sits on a hairline rule: mono index · oversized title.
 * The active row tints to orange, nudges right and reveals blurb + capability
 * chips. First row opens by default so the table reads as a live document.
 */
export function Services() {
  const [active, setActive] = useState<string | null>(SERVICES[0]?.id ?? null);

  return (
    <section id="services" className="bg-paper section">
      <div className="shell">
        {/* ── Intro: heading left, lede pinned right — asymmetric ── */}
        <div className="grid12 items-end gap-y-10">
          <div className="col-span-6 md:col-span-7">
            <Reveal>
              <Eyebrow index="02">What we do</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-7 text-[length:var(--text-h2)] text-ink">
                Four disciplines.
                <br />
                <span className="text-orange">One</span> studio.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="text-[length:var(--text-lead)] leading-snug text-ink-2">
              Strategy, design, code and content under one roof — so the craft
              stays consistent from the first pixel to the last post.
            </p>
          </Reveal>
        </div>

        {/* ── The table ── */}
        <ul className="mt-[clamp(3rem,6vw,5.5rem)] border-b border-line">
          {SERVICES.map((service, i) => (
            <Reveal as="li" key={service.id} delay={0.05 + i * 0.07}>
              <ServiceRow
                service={service}
                isActive={active === service.id}
                onActivate={() => setActive(service.id)}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  isActive,
  onActivate,
}: {
  service: Service;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      className="group border-t border-line"
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
    >
      <button
        type="button"
        aria-expanded={isActive}
        aria-controls={`service-detail-${service.id}`}
        onClick={onActivate}
        className="block w-full cursor-pointer text-left"
      >
        {/* Header row on the grid: index · title · orange marker */}
        <div className="grid12 items-baseline gap-y-3 py-[clamp(1.3rem,2.4vw,2.4rem)]">
          <span
            className={`mono col-span-1 self-start pt-[0.45em] transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isActive ? "text-orange" : "text-ink-3"
            }`}
          >
            {service.index}
          </span>

          <motion.h3
            animate={{ x: isActive ? 16 : 0 }}
            transition={{ duration: DUR.small, ease: EASE.outQuart }}
            className={`display col-span-5 col-start-2 text-[length:var(--text-h3)] leading-[1.04] transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isActive ? "text-orange" : "text-ink"
            }`}
          >
            {service.title}
          </motion.h3>

          {/* Right cluster: capability count · orange sweep · expand indicator */}
          <span className="col-span-6 hidden items-center gap-5 self-center md:col-span-4 md:col-start-9 md:flex">
            <span className="mono shrink-0 text-ink-3">
              {String(service.capabilities.length).padStart(2, "0")} services
            </span>
            <span className="block h-px flex-1 bg-line">
              <motion.span
                className="block h-px w-full origin-right bg-orange"
                initial={false}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: DUR.small, ease: EASE.outQuart }}
              />
            </span>
            <motion.span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center border border-line"
              animate={{
                rotate: isActive ? 45 : 0,
                borderColor: isActive
                  ? "var(--color-orange)"
                  : "var(--color-line)",
              }}
              transition={{ duration: DUR.small, ease: EASE.outQuart }}
            >
              <Plus
                className={isActive ? "size-4 text-orange" : "size-4 text-ink-3"}
                strokeWidth={2}
              />
            </motion.span>
          </span>
        </div>
      </button>

      {/* Detail: blurb + capability chips — animate height/opacity */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={`service-detail-${service.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: DUR.medium, ease: EASE.outQuart },
              opacity: { duration: DUR.small, ease: EASE.outQuart },
            }}
            className="overflow-hidden"
          >
            <div className="grid12 gap-y-9 pb-[clamp(2rem,3.5vw,3rem)]">
              {/* blurb + representative outcome */}
              <div className="col-span-6 md:col-span-4 md:col-start-2">
                <p className="max-w-md text-[length:var(--text-body)] text-ink-2">
                  {service.blurb}
                </p>
                <div className="mt-7 flex items-baseline gap-3 border-t border-ink pt-4">
                  <span className="display text-[length:var(--text-h3)] leading-none text-orange">
                    {service.outcome.value}
                  </span>
                  <span className="label text-ink-3">
                    {service.outcome.label}
                  </span>
                </div>
              </div>

              {/* capabilities */}
              <div className="col-span-3 md:col-span-3 md:col-start-6">
                <span className="label mb-4 block text-ink-3">Capabilities</span>
                <ul className="flex flex-wrap content-start gap-2">
                  {service.capabilities.map((cap, c) => (
                    <motion.li
                      key={cap}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: DUR.small,
                        ease: EASE.outQuart,
                        delay: 0.08 + c * 0.03,
                      }}
                      className="mono border border-line px-2.5 py-1 text-ink-2"
                    >
                      {cap}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* deliverables — what you get */}
              <div className="col-span-3 md:col-span-3 md:col-start-10">
                <span className="label mb-4 block text-ink-3">You get</span>
                <ul>
                  {service.deliverables.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: DUR.small,
                        ease: EASE.outQuart,
                        delay: 0.12 + i * 0.05,
                      }}
                      className="flex items-baseline gap-3 border-t border-line py-2.5 text-[length:var(--text-body)] text-ink"
                    >
                      <span className="mono shrink-0 text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
