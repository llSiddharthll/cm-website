"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/lib/content";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/agency";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/fx/Magnetic";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export function Header({ dark = true }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [categories, setCategories] = useState<ServiceCategory[]>(
    SERVICE_CATEGORIES as unknown as ServiceCategory[],
  );

  // Hydrate the mega-menu from the API (falls back to bundled categories).
  useEffect(() => {
    if (!API) return;
    let alive = true;
    fetch(`${API}/api/content/service_categories`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && Array.isArray(d) && d.length) setCategories(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  const closeTimer = useRef<number | null>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.3,
  });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Reset the mobile accordion whenever the overlay closes.
  useEffect(() => {
    if (!open) setMobileServices(false);
  }, [open]);

  // Escape closes whichever menu is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServices(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openServices = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setServices(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServices(false), 120);
  };

  const solid = scrolled || services;

  return (
    <>
      <header
        onMouseLeave={scheduleClose}
        onBlur={(e) => {
          // close when focus leaves the header entirely (keyboard path)
          if (!e.currentTarget.contains(e.relatedTarget as Node | null))
            scheduleClose();
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solid
            ? dark
              ? "bg-dark/90 shadow-[0_1px_0_0_var(--color-line-invert)] backdrop-blur-xl"
              : "bg-paper/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-18">
          <Link href="/" aria-label="Creative Monk — home" onMouseEnter={scheduleClose}>
            <Logo invert={dark} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex lg:gap-9">
            {NAV.map((item) => {
              const isServices = item.label === "Services";
              return (
                <div
                  key={item.label}
                  onMouseEnter={isServices ? openServices : scheduleClose}
                  onFocus={isServices ? openServices : undefined}
                  className="flex items-center"
                >
                  <Link
                    href={item.href}
                    aria-haspopup={isServices || undefined}
                    aria-expanded={isServices ? services : undefined}
                    aria-controls={isServices ? "services-menu" : undefined}
                    className={cn(
                      "label group/nav relative inline-flex items-center gap-1 py-1 transition-colors",
                      dark ? "text-on-ink-2 hover:text-on-ink" : "text-ink-2 hover:text-ink",
                      isServices && services && "text-orange",
                    )}
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:w-full" />
                  </Link>
                </div>
              );
            })}
            <ThemeToggle />
            <Magnetic strength={0.5}>
              <Link
                href="/contact"
                onMouseEnter={scheduleClose}
                className="group/cta label flex h-9 items-center gap-1.5 bg-orange px-4 text-on-orange transition-colors duration-200 hover:bg-orange-press"
              >
                Free strategy call
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Link>
            </Magnetic>
          </nav>

          {/* Mobile: theme + menu */}
          <div className="flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex size-10 items-center justify-center"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute left-0 top-0 h-0.5 w-6 transition-all duration-300", dark ? "bg-on-ink" : "bg-ink", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-0.5 w-6 transition-all duration-300", dark ? "bg-on-ink" : "bg-ink", open && "bottom-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Services mega-menu ── */}
        <AnimatePresence>
          {services && (
            <motion.div
              id="services-menu"
              role="region"
              aria-label="Services"
              onMouseEnter={openServices}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: EASE.outQuart }}
              className="hidden border-t border-line-invert bg-dark/95 backdrop-blur-xl md:block"
            >
              <div className="shell grid12 gap-x-8 gap-y-10 py-10">
                {categories.map((cat) => (
                  <div key={cat.slug} className="col-span-3">
                    <Link
                      href={`/services/${cat.slug}`}
                      onClick={() => setServices(false)}
                      className="group/cat flex items-baseline gap-2"
                    >
                      <span className="mono text-orange">{cat.index}</span>
                      <span className="display text-[length:var(--text-h3)] text-on-ink transition-colors group-hover/cat:text-orange">
                        {cat.name}
                      </span>
                    </Link>
                    <p className="label mt-1 text-on-ink-3">{cat.tagline}</p>
                    <ul className="mt-5 space-y-2.5">
                      {cat.items.map((it) => (
                        <li key={it.slug}>
                          <Link
                            href={`/services/${cat.slug}/${it.slug}`}
                            onClick={() => setServices(false)}
                            className="text-sm text-on-ink-2 transition-colors hover:text-orange"
                          >
                            {it.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-line-invert">
                <div className="shell flex items-center justify-between py-4">
                  <span className="mono text-on-ink-3">
                    Five disciplines · one studio
                  </span>
                  <Link
                    href="/services"
                    onClick={() => setServices(false)}
                    className="group label inline-flex items-center gap-1.5 text-on-ink transition-colors hover:text-orange"
                  >
                    All services
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* scroll-progress bar — pinned to the nav bar, not the growing header box */}
        {!reduce && (
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className={cn(
              "absolute inset-x-0 top-16 h-0.5 origin-left bg-orange md:top-18",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              "fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto px-[var(--gutter)] py-24 md:hidden",
              dark ? "bg-dark" : "bg-paper",
            )}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE.inOutQuart }}
          >
            <nav className="flex flex-col">
              {NAV.map((item, i) => {
                const isServices = item.label === "Services";
                return (
                  <motion.div
                    key={item.label}
                    initial={reduce ? false : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: reduce ? 0 : 0.1 + i * 0.05, ease: EASE.outQuart }}
                    className={dark ? "border-t border-line-invert" : "border-t border-line"}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "display flex items-center gap-3 py-4 text-3xl font-extrabold",
                          dark ? "text-on-ink" : "text-ink",
                        )}
                      >
                        <span className="mono text-orange">0{i + 1}</span>
                        {item.label}
                      </Link>
                      {isServices && (
                        <button
                          onClick={() => setMobileServices((v) => !v)}
                          aria-label="Toggle services"
                          aria-expanded={mobileServices}
                          className="mono px-3 text-2xl text-orange"
                        >
                          {mobileServices ? "–" : "+"}
                        </button>
                      )}
                    </div>
                    {isServices && mobileServices && (
                      <ul className="mb-4 ml-9 space-y-2">
                        {categories.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              href={`/services/${cat.slug}`}
                              onClick={() => setOpen(false)}
                              className="mono text-on-ink-2 transition-colors hover:text-orange"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                );
              })}
            </nav>
            <div className={cn("mono mt-10 flex flex-col gap-1", dark ? "text-on-ink-3" : "text-ink-3")}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
