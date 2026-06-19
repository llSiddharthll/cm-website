"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/agency";
import { EASE, DUR } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FAQ({
  faqs = FAQS,
}: {
  faqs?: readonly { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-dark text-on-ink section">
      <div className="shell">
        <div className="grid12">
          <header className="col-span-12 flex flex-col gap-5 md:col-span-10 md:col-start-2">
            <Eyebrow index="09" invert>
              Questions
            </Eyebrow>
            <h2 className="display text-[length:var(--text-h2)] text-on-ink">
              Good to know.
            </h2>
            <p className="max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
              The questions founders ask us most — answered straight, before
              you book the call.
            </p>
          </header>
        </div>

        <div className="mt-12 grid12">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.q}
                  className="border-t border-line-invert last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`display text-[length:var(--text-h3)] transition-colors duration-300 ${
                        isOpen ? "text-orange" : "text-on-ink"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: DUR.small, ease: EASE.outQuart }}
                      className={`flex size-7 shrink-0 items-center justify-center border border-line-invert transition-colors duration-300 ${
                        isOpen ? "text-orange" : "text-on-ink-2"
                      }`}
                    >
                      <Plus className="size-4" strokeWidth={1.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: DUR.medium, ease: EASE.outQuart },
                          opacity: { duration: DUR.small },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-6 text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
