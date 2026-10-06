"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  ApplicationForm,
  type ApplyStatus,
} from "@/components/careers/ApplicationForm";

export type RoleFact = {
  kind: "team" | "type" | "location" | "experience" | "salary";
  label: string;
  value: string;
};

const FACT_ICON = {
  team: Users,
  type: Briefcase,
  location: MapPin,
  experience: Clock,
  salary: Wallet,
};

const FORM_ID = "role-dialog-apply";

/**
 * A role in a dialog over /careers, rendered by the intercepting route
 * app/careers/@modal/(.)[slug]. Fixed header (title, tabs) and footer (the
 * primary action) with only the middle scrolling; a bottom sheet on phones.
 * A direct visit to /careers/[slug] still gets the full page.
 */
export function RoleModal({
  title,
  team,
  summary,
  facts,
  details,
  roles,
  slug,
  applyUrl,
  email,
}: {
  title: string;
  team?: string;
  summary?: string;
  facts: RoleFact[];
  details: React.ReactNode;
  roles: { slug?: string; title: string }[];
  slug: string;
  applyUrl?: string;
  email: string;
}) {
  const router = useRouter();
  const reduce = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"details" | "apply">("details");
  const [status, setStatus] = useState<ApplyStatus>("idle");
  // Mount the form on first visit to Apply, then keep it mounted so a
  // half-filled form survives a look back at the details.
  const [applyMounted, setApplyMounted] = useState(false);
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
    };
  }, [close]);

  const show = (v: "details" | "apply") => {
    if (v === "apply") setApplyMounted(true);
    setView(v);
    bodyRef.current?.scrollTo({ top: 0 });
  };

  const glance = facts.filter((f) => f.kind !== "team");
  const footnote = [
    facts.find((f) => f.kind === "type")?.value,
    facts.find((f) => f.kind === "salary")?.value,
  ]
    .filter(Boolean)
    .join(" · ");

  const primary =
    "group label inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 bg-orange px-5 text-on-orange transition-colors hover:bg-orange-press disabled:cursor-wait disabled:opacity-70";

  const tabs = [
    { id: "details" as const, label: "Role details" },
    ...(applyUrl ? [] : [{ id: "apply" as const, label: "Apply" }]),
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6 lg:p-10">
      <motion.button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 cursor-default bg-dark/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-dialog-title"
        tabIndex={-1}
        data-lenis-prevent
        className="relative flex h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-2xl border border-line-invert-2 bg-dark-2 text-on-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] outline-none sm:h-[min(88dvh,900px)] sm:rounded-2xl"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE.outQuart }}
      >
        {/* ── Fixed header ── */}
        <header className="shrink-0 border-b border-line-invert px-5 pt-4 sm:px-8 sm:pt-6">
          {/* grab handle on the phone sheet */}
          <span
            aria-hidden
            className="mx-auto mb-3 block h-1 w-10 rounded-full bg-on-ink/20 sm:hidden"
          />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {team && <span className="mono block text-orange">{team}</span>}
              <h2
                id="role-dialog-title"
                className="display-tight mt-1.5 text-[clamp(1.45rem,1.05rem+1.7vw,2.4rem)] leading-[1.02] text-on-ink"
              >
                {title}
                <span className="text-orange">.</span>
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {/* Plain <a>: a client-side Link would be intercepted back into this dialog. */}
              <a
                href={`/careers/${slug}`}
                className="label hidden items-center gap-1.5 rounded-full px-3 py-2 text-on-ink-3 transition-colors hover:text-orange sm:inline-flex"
              >
                Full page
                <ArrowUpRight className="size-3.5" />
              </a>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex size-10 items-center justify-center rounded-full border border-line-invert text-on-ink-2 transition-colors hover:border-orange/60 hover:text-on-ink"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div role="tablist" aria-label="Role" className="mt-5 flex gap-6">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={view === t.id}
                onClick={() => show(t.id)}
                className={cn(
                  "label relative -mb-px border-b-2 pb-3 transition-colors",
                  view === t.id
                    ? "border-orange text-on-ink"
                    : "border-transparent text-on-ink-3 hover:text-on-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {/* ── Scrolling body ── */}
        <div
          ref={bodyRef}
          className="scrollbar-orange min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <div
            className={cn(
              "grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12",
              view !== "details" && "hidden",
            )}
          >
            {/* At a glance: first on phones, sticky sidebar on desktop */}
            <aside className="lg:order-2">
              <div className="rounded-xl border border-line-invert bg-dark p-5 lg:sticky lg:top-0">
                <span className="label text-on-ink-3">At a glance</span>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-1">
                  {glance.map((f) => {
                    const Icon = FACT_ICON[f.kind];
                    return (
                      <div key={f.kind} className="flex items-start gap-3">
                        <Icon className="mt-0.5 size-4 shrink-0 text-orange" />
                        <div className="min-w-0">
                          <dt className="mono text-[length:var(--text-mono)] text-on-ink-3">
                            {f.label}
                          </dt>
                          <dd className="mt-0.5 text-sm text-on-ink">
                            {f.value}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(`Question about ${title}`)}`}
                  className="mt-5 flex items-center gap-2 border-t border-line-invert pt-4 text-sm text-on-ink-2 transition-colors hover:text-orange"
                >
                  <Mail className="size-4 text-orange" />
                  Questions? {email}
                </a>
              </div>
            </aside>

            <div className="min-w-0 lg:order-1">
              {summary && (
                <p className="mb-7 max-w-2xl text-[clamp(1.05rem,0.98rem+0.35vw,1.25rem)] leading-snug text-on-ink">
                  {summary}
                </p>
              )}
              <div className="max-w-2xl">{details}</div>
            </div>
          </div>

          {applyMounted && (
            <div
              className={cn(
                "mx-auto w-full max-w-3xl px-5 py-7 sm:px-8 sm:py-9",
                view !== "apply" && "hidden",
              )}
            >
              {status !== "done" && (
                <div className="mb-8">
                  <h3 className="display text-[length:var(--text-h3)] leading-tight text-on-ink">
                    Apply for {title}
                  </h3>
                  <p className="mt-2 text-on-ink-2">
                    A few details and your CV. We read every application
                    ourselves.
                  </p>
                </div>
              )}
              <ApplicationForm
                roles={roles}
                defaultRole={slug}
                formId={FORM_ID}
                hideSubmit
                onStatusChange={setStatus}
              />
            </div>
          )}
        </div>

        {/* ── Fixed footer: the primary action is always in reach ── */}
        <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-line-invert bg-dark-2 px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:px-8">
          {view === "details" ? (
            <>
              <span className="mono hidden min-w-0 truncate text-on-ink-3 sm:block">
                {footnote}
              </span>
              {applyUrl ? (
                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(primary, "w-full sm:w-auto")}
                >
                  Apply for this role
                  <ArrowUpRight className="size-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => show("apply")}
                  className={cn(primary, "w-full sm:w-auto")}
                >
                  Apply for this role
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              )}
            </>
          ) : status === "done" ? (
            <>
              <span className="mono hidden text-on-ink-3 sm:block">
                Application sent
              </span>
              <button
                type="button"
                onClick={close}
                className={cn(primary, "w-full sm:w-auto")}
              >
                Back to open roles
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => show("details")}
                className="label inline-flex shrink-0 items-center gap-2 text-on-ink-2 transition-colors hover:text-on-ink"
              >
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Role details</span>
                <span className="sm:hidden">Back</span>
              </button>
              <button
                type="submit"
                form={FORM_ID}
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className={primary}
              >
                {status === "loading" && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {status === "loading" ? "Sending…" : "Submit application"}
              </button>
            </>
          )}
        </footer>
      </motion.div>
    </div>
  );
}
