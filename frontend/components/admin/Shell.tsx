"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Images, LogOut, Menu, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "./provider";
import { Icon } from "./Icon";

function navGroups(collections: ReturnType<typeof useAdmin>["collections"]) {
  const order: string[] = [];
  const map: Record<string, typeof collections> = {};
  for (const c of collections) {
    if (!map[c.group]) {
      map[c.group] = [];
      order.push(c.group);
    }
    map[c.group].push(c);
  }
  return order.map((g) => ({ group: g, items: map[g] }));
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { collections, user, logout } = useAdmin();
  const pathname = usePathname();
  const groups = navGroups(collections);

  const link = (href: string, active: boolean, children: React.ReactNode) => (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
        active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
      )}
    >
      {children}
    </Link>
  );

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="flex items-center gap-2.5 px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.png" alt="" className="size-7" />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Creative Monk</p>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">Studio admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        <div className="space-y-0.5">
          {link("/admin", pathname === "/admin", (<><LayoutDashboard className="size-4" /> Dashboard</>))}
          {link("/admin/media", pathname === "/admin/media", (<><Images className="size-4" /> Media</>))}
        </div>

        {groups.map(({ group, items }) => (
          <div key={group}>
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{group}</p>
            <div className="space-y-0.5">
              {items.map((c) =>
                link(`/admin/${c.slug}`, pathname === `/admin/${c.slug}`, (
                  <>
                    <Icon name={c.icon} className="size-4" />
                    <span className="truncate">{c.pluralName}</span>
                  </>
                )),
              )}
            </div>
          </div>
        ))}
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
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* desktop rail */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-zinc-900/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        {/* topbar (mobile) */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100" aria-label="Open menu">
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
