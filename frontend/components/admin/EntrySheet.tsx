"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Collection, Entry, Field } from "@/lib/admin/types";
import * as api from "@/lib/admin/api";
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

  useEffect(() => {
    if (open) {
      setValues(initialValues(collection, entry));
      setStatus((entry?._status as string) || "published");
    }
  }, [open, collection, entry]);

  const isSingleton = collection.kind === "singleton";
  const isNew = !entry && !isSingleton;

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
        {collection.fields.map((field) => (
          <FieldInput
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(v) => setValues((prev) => ({ ...prev, [field.name]: v }))}
          />
        ))}
      </div>
    </Sheet>
  );
}
