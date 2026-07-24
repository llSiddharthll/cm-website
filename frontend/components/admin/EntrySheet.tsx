"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { Collection, Entry, Field } from "@/lib/admin/types";
import * as api from "@/lib/admin/api";
import { slugify, slugifyInput } from "@/lib/admin/slug";
import { Sheet } from "./Sheet";
import { Button } from "./ui";
import { Select } from "./Select";
import { FieldInput } from "./fields";

function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "tags":
    case "paragraphs":
    case "objectList":
      return [];
    case "boolean":
      return false;
    case "object":
      return {};
    default:
      return field.default ?? "";
  }
}

function initialValues(collection: Collection, entry: Entry | null): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of collection.fields) {
    const v = entry?.[f.name];
    out[f.name] = v !== undefined ? v : emptyValue(f);
  }
  return out;
}

export function EntrySheet({
  collection,
  entry,
  open,
  onOpenChange,
  onSaved,
}: {
  collection: Collection;
  entry: Entry | null; // null → create
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [status, setStatus] = useState("published");
  const [saving, setSaving] = useState(false);

  const isSingleton = collection.kind === "singleton";
  const isNew = !entry && !isSingleton;

  // The title field that slugs derive from, and the top-level slug fields.
  const sourceName = collection.titleField;
  const slugFields = useMemo(
    () =>
      collection.fields
        .filter((f) => f.type === "slug" && f.name !== sourceName)
        .map((f) => f.name),
    [collection, sourceName],
  );

  // Which slug fields are still auto-following the title. A slug stops
  // following the moment it's edited by hand (or already holds a custom value),
  // so we never silently rewrite an established, published URL.
  const autoSlug = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) return;
    const init = initialValues(collection, entry);
    setValues(init);
    setStatus((entry?._status as string) || "published");
    const src = sourceName ? slugify(init[sourceName]) : "";
    autoSlug.current = Object.fromEntries(
      slugFields.map((name) => {
        const current = String(init[name] ?? "");
        // Follow when empty, brand new, or still in sync with the title.
        return [name, current === "" || (isNew && current === "") || current === src];
      }),
    );
  }, [open, collection, entry, sourceName, slugFields, isNew]);

  /** Update a field, keeping any auto-following slug fields in sync live. */
  function handleChange(field: Field, v: unknown) {
    setValues((prev) => {
      const next = { ...prev, [field.name]: v };

      if (field.name === sourceName) {
        const s = slugify(v);
        for (const name of slugFields) {
          if (autoSlug.current[name]) next[name] = s;
        }
      } else if (field.type === "slug") {
        const typed = slugifyInput(String(v ?? ""));
        next[field.name] = typed;
        // Clearing a slug re-arms auto-follow; otherwise it's now manual.
        autoSlug.current[field.name] = typed === "";
      }

      return next;
    });
  }

  async function save() {
    setSaving(true);
    try {
      if (isSingleton) {
        await api.updateSingleton(collection.slug, values);
      } else if (entry) {
        await api.updateEntry(collection.slug, entry._id, values, status);
      } else {
        await api.createEntry(collection.slug, values, status);
      }
      toast.success(isSingleton ? `${collection.name} saved` : isNew ? `${collection.name} created` : `${collection.name} updated`);
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const title = isSingleton
    ? `Edit ${collection.name}`
    : isNew
      ? `New ${collection.name.toLowerCase()}`
      : `Edit ${collection.name.toLowerCase()}`;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={collection.description}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={save} loading={saving}>{isSingleton ? "Save changes" : isNew ? "Create" : "Save"}</Button>
        </>
      }
    >
      <div className="space-y-5">
        {!isSingleton && (
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Status</label>
            <Select
              value={status}
              onValueChange={setStatus}
              options={[
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
              ]}
            />
          </div>
        )}
        {collection.fields.map((field) => {
          const f =
            field.type === "slug" && field.name !== sourceName
              ? {
                  ...field,
                  help: [field.help, "Auto-fills from the title as you type — edit to set a custom slug, or clear it to resume auto-fill."]
                    .filter(Boolean)
                    .join(" "),
                }
              : field;
          return (
            <FieldInput
              key={field.name}
              field={f}
              value={values[field.name]}
              onChange={(v) => handleChange(field, v)}
            />
          );
        })}
      </div>
    </Sheet>
  );
}
