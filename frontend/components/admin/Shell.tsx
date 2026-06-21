"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Images, LogOut, Menu, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "./provider";
import { Icon } from "./Icon";
import type { Collection } from "@/lib/admin/types";

/** Content collections grouped by the page they belong to (in display order). */
const PAGE_GROUPS: { label: string; slugs: string[] }[] = [
  { label: "Home", slugs: ["home_hero", "stats", "tools", "certs", "marquee"] },
  { label: "Services", slugs: ["services", "service_categories", "service_pages", "services_grid", "process", "pricing"] },
  { label: "Work", slugs: ["cases", "reels", "video_projects"] },
  { label: "Blog", slugs: ["posts"] },
  { label: "About", slugs: ["story", "team", "values", "industries", "awards"] },
  { label: "Careers", slugs: ["roles", "benefits"] },
  { label: "Reviews & FAQ", slugs: ["reviews", "faqs"] },
  { label: "Global", slugs: ["site", "footer_groups", "locations", "review_summary"] },
];
const INBOX_SLUGS = ["leads", "subscribers"];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { collections, collectionsBySlug, user, logout } = useAdmin();
  const pathname = usePathname();
  const activeSlug = pathname.startsWith("/admin/") ? pathname.split("/")[2] : "";

  const groups = useMemo(() => {
    const used = new Set<string>();
    const g = PAGE_GROUPS.map((pg) => {
      const items = pg.slugs
        .map((s) => collectionsBySlug[s])
        .filter(Boolean) as Collection[];
      items.forEach((c) => used.add(c.slug));
      return { label: pg.label, items };
    }).filter((x) => x.items.length > 0);
    const leftovers = collections.filter(
      (c) => !used.has(c.slug) && !INBOX_SLUGS.includes(c.slug),
    );
    if (leftovers.length) g.push({ label: "More", items: leftovers });
    return g;
  }, [collections, collectionsBySlug]);

  const inboxItems = INBOX_SLUGS.map((s) => collectionsBySlug[s]).filter(Boolean) as Collection[];

  const activeGroup = useMemo(
    () => groups.find((g) => g.items.some((c) => c.slug === activeSlug))?.label ?? null,
    [groups, activeSlug],
  );

  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (activeGroup) setOpen((o) => (o[activeGroup] ? o : { ...o, [activeGroup]: true }));
  }, [activeGroup]);

  const topLink = (href: string, active: boolean, icon: React.ReactNode, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
        active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
      )}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <div className="flex h-full flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex items-center gap-2.5 px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.png" alt="" className="size-7" />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Creative Monk</p>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">Studio admin</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="space-y-0.5">
          {topLink("/admin", pathname === "/admin", <LayoutDashboard className="size-4" />, "Dashboard")}
          {topLink("/admin/media", pathname === "/admin/media", <Images className="size-4" />, "Media")}
        </div>

        {inboxItems.length > 0 && (
          <div className="mt-5">
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Inbox</p>
            <div className="space-y-0.5">
              {inboxItems.map((c) =>
                topLink(`/admin/${c.slug}`, activeSlug === c.slug, <Icon name={c.icon} className="size-4" />, c.pluralName),
              )}
            </div>
          </div>
        )}

        <div className="mt-5">
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Content</p>
          <div className="space-y-0.5">
            {groups.map((g) => {
              const isOpen = open[g.label] ?? false;
              const hasActive = g.label === activeGroup;
              return (
                <div key={g.label}>
                  <button
                    onClick={() => setOpen((o) => ({ ...o, [g.label]: !isOpen }))}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                      hasActive ? "text-white" : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100",
                    )}
                  >
                    <span>{g.label}</span>
                    <ChevronDown
                      className={cn("size-4 shrink-0 text-zinc-500 transition-transform", isOpen && "rotate-180")}
                    />
                  </button>
                  {isOpen && (
                    <div className="mb-1 ml-4 space-y-0.5 border-l border-zinc-800 pl-1">
                      {g.items.map((c) => {
                        const active = activeSlug === c.slug;
                        return (
                          <Link
                            key={c.slug}
                            href={`/admin/${c.slug}`}
                            onClick={onNavigate}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                              active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
                            )}
                          >
                            <Icon name={c.icon} className="size-3.5 shrink-0 opacity-70" />
                            <span className="truncate">{c.pluralName}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="border-t border-zinc-800 p-3">
        <a href="/" target="_blank" rel="noreferrer" className="mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100">
          <ExternalLink className="size-4" /> View site
        </a>
        <button onClick={logout} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100">
          <LogOut className="size-4" /> Sign out
        </button>
        {user && <p className="px-3 pt-2 text-xs text-zinc-600">{user.email}</p>}
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* desktop rail */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        {/* topbar (mobile) */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900" aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" className="size-6" />
          <span className="font-semibold">Admin</span>
        </header>

        <main className="px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
