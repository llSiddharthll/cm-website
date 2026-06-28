"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import type { Collection, Entry, Field } from "@/lib/admin/types";
import * as api from "@/lib/admin/api";
import { Button, Badge, Input, Spinner, Card } from "./ui";
import { Select } from "./Select";
import { EntrySheet } from "./EntrySheet";
import { DetailSheet } from "./DetailSheet";

function cellValue(field: Field, value: unknown) {
  if (value === undefined || value === null || value === "")
    return <span className="text-zinc-600">—</span>;
  switch (field.type) {
    case "boolean":
      return <Badge tone={value ? "won" : "default"}>{value ? "Yes" : "No"}</Badge>;
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={String(value)} alt="" className="size-9 rounded object-cover" />;
    case "tags":
    case "multiselect":
      return (
        <div className="flex flex-wrap gap-1">
          {(value as string[]).slice(0, 3).map((t, i) => (
            <Badge key={i}>{t}</Badge>
          ))}
        </div>
      );
    case "select":
      return <Badge tone={String(value)}>{String(value)}</Badge>;
    default: {
      const s = String(value);
      return <span className="line-clamp-1 text-zinc-300">{s.length > 80 ? s.slice(0, 80) + "…" : s}</span>;
    }
  }
}

export function CollectionView({ collection }: { collection: Collection }) {
  const isSingleton = collection.kind === "singleton";
  const [all, setAll] = useState<Entry[]>([]);
  const [singleton, setSingleton] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortAsc, setSortAsc] = useState(true);

  const [editEntry, setEditEntry] = useState<Entry | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [detailEntry, setDetailEntry] = useState<Entry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const listColumns = collection.fields.filter((f) => f.listColumn);
  const filterFields = collection.fields.filter((f) => f.filterable);
  const titleField = collection.titleField || collection.fields[0]?.name;

  async function load() {
    setLoading(true);
    try {
      if (isSingleton) {
        setSingleton(await api.getSingleton(collection.slug));
      } else {
        setAll(await api.listEntries(collection.slug));
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setQ("");
    setFilters({});
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.slug]);

  const filterOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    for (const f of filterFields) {
      if (f.options) {
        opts[f.name] = f.options;
      } else {
        const set = new Set<string>();
        for (const e of all) {
          const v = e[f.name];
          if (Array.isArray(v)) v.forEach((x) => set.add(String(x)));
          else if (v) set.add(String(v));
        }
        opts[f.name] = [...set].sort();
      }
    }
    return opts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all]);

  const rows = useMemo(() => {
    let out = [...all];
    const needle = q.trim().toLowerCase();
    if (needle) out = out.filter((e) => JSON.stringify(e).toLowerCase().includes(needle));
    for (const [k, v] of Object.entries(filters)) {
      if (!v || v === "__all__") continue;
      out = out.filter((e) => {
        const f = e[k];
        if (Array.isArray(f)) return f.map(String).includes(v);
        return String(f ?? "") === v;
      });
    }
    if (titleField) {
      out.sort((a, b) => {
        const av = String(a[titleField] ?? "");
        const bv = String(b[titleField] ?? "");
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return out;
  }, [all, q, filters, sortAsc, titleField]);

  async function del(entry: Entry) {
    if (!confirm(`Delete this ${collection.name.toLowerCase()}? This cannot be undone.`)) return;
    try {
      await api.deleteEntry(collection.slug, entry._id);
      toast.success(`${collection.name} deleted`);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function openNew() {
    setEditEntry(null);
    setEditOpen(true);
  }
  function openEdit(entry: Entry) {
    setEditEntry(entry);
    setDetailOpen(false);
    setEditOpen(true);
  }
  function openDetail(entry: Entry) {
    setDetailEntry(entry);
    setDetailOpen(true);
  }

  /* ── Singleton view ── */
  if (isSingleton) {
    return (
      <div className="mx-auto max-w-3xl">
        <Header collection={collection} />
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Spinner /></div>
        ) : (
          <Card className="mt-6 p-6">
            <dl className="space-y-3">
              {collection.fields.slice(0, 6).map((f) => (
                <div key={f.name} className="flex gap-3 text-sm">
                  <dt className="w-40 shrink-0 text-zinc-500">{f.label}</dt>
                  <dd className="line-clamp-1 text-zinc-300">
                    {Array.isArray(singleton?.[f.name])
                      ? (singleton?.[f.name] as unknown[]).length + " items"
                      : String(singleton?.[f.name] ?? "—")}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <Button onClick={() => { setEditEntry(singleton); setEditOpen(true); }}>
                <Pencil className="size-4" /> Edit {collection.name.toLowerCase()}
              </Button>
            </div>
          </Card>
        )}
        <EntrySheet collection={collection} entry={singleton} open={editOpen} onOpenChange={setEditOpen} onSaved={load} />
      </div>
    );
  }

  /* ── Collection view ── */
  return (
    <div>
      <Header collection={collection} count={all.length} onNew={collection.intakeOnly ? undefined : openNew} />

      {/* toolbar */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[14rem] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${collection.pluralName.toLowerCase()}…`} className="pl-9" />
        </div>
        {filterFields.map((f) => (
          <div key={f.name} className="w-44">
            <Select
              value={filters[f.name] || "__all__"}
              onValueChange={(v) => setFilters((p) => ({ ...p, [f.name]: v }))}
              options={[{ value: "__all__", label: `All ${f.label.toLowerCase()}` }, ...(filterOptions[f.name] || []).map((o) => ({ value: o, label: o }))]}
            />
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setSortAsc((s) => !s)}>
          <ArrowUpDown className="size-3.5" /> {sortAsc ? "A–Z" : "Z–A"}
        </Button>
      </div>

      {/* table */}
      <Card className="mt-4 overflow-hidden">
        {loading ? (
          <div className="flex h-48 items-center justify-center"><Spinner /></div>
        ) : rows.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center gap-3 text-sm text-zinc-400">
            {all.length === 0 ? `No ${collection.pluralName.toLowerCase()} yet.` : "No matches."}
            {!collection.intakeOnly && all.length === 0 && (
              <Button size="sm" onClick={openNew}><Plus className="size-3.5" /> Add the first one</Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-500">
                  {listColumns.map((f) => (
                    <th key={f.name} className="px-4 py-3 font-medium">{f.label}</th>
                  ))}
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {rows.map((entry) => (
                  <tr
                    key={entry._id}
                    onClick={() => openDetail(entry)}
                    className="cursor-pointer transition-colors hover:bg-zinc-800"
                  >
                    {listColumns.map((f) => (
                      <td key={f.name} className="max-w-[20rem] px-4 py-3 align-middle">{cellValue(f, entry[f.name])}</td>
                    ))}
                    <td className="px-4 py-3"><Badge tone={entry._status}>{entry._status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" onClick={() => openEdit(entry)} aria-label="Edit"><Pencil className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => del(entry)} aria-label="Delete" className="hover:text-red-600"><Trash2 className="size-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <EntrySheet collection={collection} entry={editEntry} open={editOpen} onOpenChange={setEditOpen} onSaved={load} />
      <DetailSheet collection={collection} entry={detailEntry} open={detailOpen} onOpenChange={setDetailOpen} onEdit={() => detailEntry && openEdit(detailEntry)} />
    </div>
  );
}

function Header({ collection, count, onNew }: { collection: Collection; count?: number; onNew?: () => void }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">{collection.pluralName}</h1>
        {collection.description && <p className="mt-1 text-sm text-zinc-400">{collection.description}</p>}
        {count !== undefined && <p className="mt-1 text-xs text-zinc-500">{count} {count === 1 ? "item" : "items"}</p>}
      </div>
      {onNew && (
        <Button onClick={onNew}><Plus className="size-4" /> New {collection.name.toLowerCase()}</Button>
      )}
    </div>
  );
}
