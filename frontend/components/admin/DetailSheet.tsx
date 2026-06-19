"use client";

import { Pencil } from "lucide-react";
import type { Collection, Entry, Field } from "@/lib/admin/types";
import { Sheet } from "./Sheet";
import { Badge, Button } from "./ui";

function FieldValue({ field, value }: { field: Field; value: unknown }) {
  if (value === undefined || value === null || value === "")
    return <span className="text-sm text-zinc-400">—</span>;

  switch (field.type) {
    case "boolean":
      return <Badge tone={value ? "won" : "default"}>{value ? "Yes" : "No"}</Badge>;
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={String(value)} alt="" className="mt-1 h-28 w-auto rounded-lg border border-zinc-200 object-cover" />;
    case "video":
      // eslint-disable-next-line jsx-a11y/media-has-caption
      return <video src={String(value)} className="mt-1 h-28 w-auto rounded-lg border border-zinc-200" controls />;
    case "tags":
      return (
        <div className="flex flex-wrap gap-1.5">
          {(value as string[]).map((t, i) => (
            <Badge key={i}>{t}</Badge>
          ))}
        </div>
      );
    case "paragraphs":
      return (
        <div className="space-y-2">
          {(value as string[]).map((p, i) => (
            <p key={i} className="text-sm text-zinc-600">{p}</p>
          ))}
        </div>
      );
    case "object":
      return (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-sm text-zinc-700">
          {(field.fields ?? []).map((sub) => (
            <div key={sub.name} className="flex gap-2">
              <span className="text-zinc-400">{sub.label}:</span>
              <span>{String((value as Record<string, unknown>)?.[sub.name] ?? "—")}</span>
            </div>
          ))}
        </div>
      );
    case "objectList":
      return (
        <div className="space-y-1.5">
          {(value as Record<string, unknown>[]).map((row, i) => (
            <div key={i} className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-600">
              {(field.fields ?? []).map((sub) => String(row?.[sub.name] ?? "")).filter(Boolean).join(" · ")}
            </div>
          ))}
        </div>
      );
    default:
      return <span className="text-sm text-zinc-700">{String(value)}</span>;
  }
}

export function DetailSheet({
  collection,
  entry,
  open,
  onOpenChange,
  onEdit,
}: {
  collection: Collection;
  entry: Entry | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onEdit: () => void;
}) {
  const title = entry ? String(entry[collection.titleField || "name"] ?? collection.name) : "";
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={entry?._status ? undefined : collection.name}
      width="max-w-lg"
      footer={
        <Button onClick={onEdit}>
          <Pencil className="size-4" /> Edit
        </Button>
      }
    >
      {entry && (
        <dl className="space-y-4">
          {entry._status && (
            <div className="flex items-center gap-2">
              <Badge tone={entry._status}>{entry._status}</Badge>
            </div>
          )}
          {collection.fields.map((field) => (
            <div key={field.name}>
              <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">{field.label}</dt>
              <dd>
                <FieldValue field={field} value={entry[field.name]} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Sheet>
  );
}
