"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Mail, Database, Image as ImageIcon, ArrowRight } from "lucide-react";
import type { Overview } from "@/lib/admin/types";
import * as api from "@/lib/admin/api";
import { useAdmin } from "./provider";
import { Card, Spinner, Badge } from "./ui";
import { Icon } from "./Icon";

export function Dashboard() {
  const { user } = useAdmin();
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOverview().then(setData).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex h-64 items-center justify-center"><Spinner /></div>;
  if (!data) return <p className="text-sm text-zinc-500">Couldn’t load the dashboard.</p>;

  const stats = [
    { label: "New leads", value: data.totals.newLeads, icon: Inbox, href: "/admin/leads", accent: true },
    { label: "Total leads", value: data.totals.leads, icon: Inbox, href: "/admin/leads" },
    { label: "Subscribers", value: data.totals.subscribers, icon: Mail, href: "/admin/subscribers" },
    { label: "Content entries", value: data.totals.contentEntries, icon: Database, href: undefined },
    { label: "Media files", value: data.totals.media, icon: ImageIcon, href: "/admin/media" },
  ];

  const contentCollections = data.collections.filter((c) => c.slug !== "leads" && c.slug !== "subscribers");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
        </h1>
        <p className="mt-1 text-sm text-zinc-500">Here’s what’s happening across the site.</p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((s) => {
          const inner = (
            <Card className={`p-4 transition-shadow hover:shadow-sm ${s.accent ? "ring-1 ring-orange/30" : ""}`}>
              <div className="flex items-center justify-between">
                <s.icon className={`size-4 ${s.accent ? "text-orange" : "text-zinc-400"}`} />
                {s.href && <ArrowRight className="size-3.5 text-zinc-300" />}
              </div>
              <p className="mt-3 text-2xl font-semibold text-zinc-900">{s.value}</p>
              <p className="text-xs text-zinc-500">{s.label}</p>
            </Card>
          );
          return s.href ? <Link key={s.label} href={s.href}>{inner}</Link> : <div key={s.label}>{inner}</div>;
        })}
      </div>

      {/* recent leads */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900">Recent leads</h2>
          <Link href="/admin/leads" className="text-xs font-medium text-orange hover:underline">View all</Link>
        </div>
        <Card className="overflow-hidden">
          {data.recentLeads.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-zinc-500">No leads yet — they’ll show up here when the contact form is used.</p>
          ) : (
            <table className="w-full text-sm">
              <tbody className="divide-y divide-zinc-100">
                {data.recentLeads.map((l) => (
                  <tr key={l._id}>
                    <td className="px-4 py-3 font-medium text-zinc-800">{String(l.name ?? "—")}</td>
                    <td className="px-4 py-3 text-zinc-500">{String(l.email ?? "")}</td>
                    <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell">{String(l.service ?? l.company ?? "")}</td>
                    <td className="px-4 py-3"><Badge tone={String(l.status ?? "new")}>{String(l.status ?? "new")}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>

      {/* content overview */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Content</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {contentCollections.map((c) => (
            <Link key={c.slug} href={`/admin/${c.slug}`}>
              <Card className="flex items-center gap-3 p-3 transition-shadow hover:shadow-sm">
                <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
                  <Icon name={c.icon} className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-800">{c.pluralName}</p>
                  <p className="text-xs text-zinc-400">{c.count} {c.kind === "singleton" ? "" : c.count === 1 ? "item" : "items"}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
