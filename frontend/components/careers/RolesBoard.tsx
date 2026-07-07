"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type Role, roleSlug } from "@/lib/agency";
import { EASE, DUR } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "All teams";

function Chip({ icon: Icon, children }: { icon?: typeof MapPin; children: React.ReactNode }) {
  return (
    <span className="mono inline-flex items-center gap-1.5 border border-line-invert px-2.5 py-1 text-on-ink-2">
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {children}
    </span>
  );
}

export function RolesBoard({ roles }: { roles: Role[] }) {
  const teams = useMemo(
    () => [ALL, ...Array.from(new Set(roles.map((r) => r.team).filter(Boolean)))],
    [roles],
  );
  const [team, setTeam] = useState(ALL);
  const shown = team === ALL ? roles : roles.filter((r) => r.team === team);

  return (
    <>
      {/* team filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {teams.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTeam(t)}
            aria-pressed={team === t}
            className={cn(
              "label rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-200",
              team === t
                ? "border-orange bg-orange text-on-orange"
                : "border-line-invert text-on-ink-2 hover:border-on-ink-3 hover:text-on-ink",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((role, i) => (
            <motion.div
              layout
              key={roleSlug(role)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: DUR.medium, ease: EASE.outQuart, delay: i * 0.04 }}
            >
              <Link
                href={`/careers/${roleSlug(role)}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50 md:p-8"
              >
                {/* accent glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-orange/0 blur-2xl transition-colors duration-500 group-hover:bg-orange/20"
                />
                <div className="flex items-center justify-between">
                  <span className="label text-orange">{role.team}</span>
                  <span className="mono text-on-ink-3">{role.type}</span>
                </div>

                <h3 className="display mt-5 text-[length:var(--text-h3)] leading-[1.05] text-on-ink transition-colors duration-200 group-hover:text-orange">
                  {role.title}
                </h3>
                {role.summary && (
                  <p className="mt-3 flex-1 leading-snug text-on-ink-2">{role.summary}</p>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {role.location && <Chip icon={MapPin}>{role.location}</Chip>}
                  {role.experience && <Chip icon={Clock}>{role.experience}</Chip>}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-line-invert pt-5">
                  {role.salary ? (
                    <span className="display text-[length:var(--text-h3)] leading-none text-orange">
                      {role.salary}
                    </span>
                  ) : (
                    <span className="mono text-on-ink-3">Competitive</span>
                  )}
                  <span className="label inline-flex items-center gap-1.5 text-on-ink transition-colors duration-200 group-hover:text-orange">
                    View role
                    <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
