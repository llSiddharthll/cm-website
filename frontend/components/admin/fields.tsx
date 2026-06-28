"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import type { Field } from "@/lib/admin/types";
import { Button, Input, Label, Textarea, inputClass } from "./ui";
import { Select } from "./Select";
import { Switch } from "./Switch";
import { MediaPicker } from "./MediaPicker";
import { cn } from "@/lib/utils";

type Val = unknown;
type OnChange = (v: Val) => void;

/* ── Chips input (tags) ── */
function TagsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const tags = Array.isArray(value) ? value : [];
  const add = () => {
    const t = draft.trim();
    if (t) onChange([...tags, t]);
    setDraft("");
  };
  return (
    <div className={cn(inputClass, "flex flex-wrap items-center gap-1.5 py-1.5")}>
      {tags.map((t, i) => (
        <span key={i} className="inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
          {t}
          <button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))} className="text-zinc-500 hover:text-red-500">
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && tags.length) {
            onChange(tags.slice(0, -1));
          }
        }}
        onBlur={add}
        placeholder="Type and press Enter…"
        className="min-w-[8rem] flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </div>
  );
}

/* ── Multi-select (toggle chips from defined options) ── */
function MultiSelectInput({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const sel = Array.isArray(value) ? value : [];
  // include any already-selected values that aren't in the option list
  const all = [...options, ...sel.filter((s) => !options.includes(s))];
  const toggle = (o: string) => onChange(sel.includes(o) ? sel.filter((x) => x !== o) : [...sel, o]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {all.map((o) => {
        const on = sel.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            aria-pressed={on}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              on
                ? "border-orange/50 bg-orange/15 text-orange"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ── Paragraphs (list of textareas) ── */
function ParagraphsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const items = Array.isArray(value) ? value : [];
  const set = (i: number, v: string) => onChange(items.map((p, j) => (j === i ? v : p)));
  return (
    <div className="space-y-2">
      {items.map((p, i) => (
        <div key={i} className="flex items-start gap-2">
          <Textarea value={p} onChange={(e) => set(i, e.target.value)} className="min-h-[64px]" />
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
        <Plus className="size-3.5" /> Add paragraph
      </Button>
    </div>
  );
}

/* ── Object (fixed sub-fields) ── */
function ObjectInput({ field, value, onChange }: { field: Field; value: Record<string, unknown>; onChange: OnChange }) {
  const obj = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  return (
    <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-800/50 p-3">
      {(field.fields ?? []).map((sub) => (
        <FieldInput
          key={sub.name}
          field={sub}
          value={obj[sub.name]}
          onChange={(v) => onChange({ ...obj, [sub.name]: v })}
        />
      ))}
    </div>
  );
}

/* ── Object list (repeatable rows) ── */
function ObjectListInput({ field, value, onChange }: { field: Field; value: Record<string, unknown>[]; onChange: OnChange }) {
  const rows = Array.isArray(value) ? value : [];
  const setRow = (i: number, v: Record<string, unknown>) => onChange(rows.map((r, j) => (j === i ? v : r)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} className="rounded p-1 text-zinc-500 hover:bg-zinc-700" aria-label="Move up">
                <GripVertical className="size-3.5" />
              </button>
              <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="rounded p-1 text-zinc-500 hover:bg-red-100 hover:text-red-500" aria-label="Remove">
                <X className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(field.fields ?? []).map((sub) => (
              <FieldInput
                key={sub.name}
                field={sub}
                value={(row as Record<string, unknown>)?.[sub.name]}
                onChange={(v) => setRow(i, { ...(row as Record<string, unknown>), [sub.name]: v })}
              />
            ))}
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...rows, {}])}>
        <Plus className="size-3.5" /> Add item
      </Button>
    </div>
  );
}

export function FieldInput({ field, value, onChange }: { field: Field; value: Val; onChange: OnChange }) {
  const id = `f-${field.name}`;
  const control = (() => {
    switch (field.type) {
      case "textarea":
        return <Textarea id={id} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
      case "number":
        return (
          <Input
            id={id}
            type="number"
            value={value === undefined || value === null ? "" : (value as number)}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        );
      case "boolean":
        return <Switch id={id} checked={Boolean(value)} onCheckedChange={onChange} />;
      case "date":
        return <Input id={id} type="date" value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />;
      case "select":
        return (
          <Select
            value={(value as string) ?? ""}
            onValueChange={onChange}
            options={(field.options ?? []).map((o) => ({ value: o, label: o }))}
            placeholder={field.placeholder || "Select…"}
          />
        );
      case "multiselect":
        return <MultiSelectInput options={field.options ?? []} value={value as string[]} onChange={onChange} />;
      case "tags":
        return <TagsInput value={value as string[]} onChange={onChange} />;
      case "paragraphs":
        return <ParagraphsInput value={value as string[]} onChange={onChange} />;
      case "image":
        return <MediaPicker value={(value as string) ?? ""} onChange={onChange} kind="image" />;
      case "video":
        return <MediaPicker value={(value as string) ?? ""} onChange={onChange} kind="video" />;
      case "object":
        return <ObjectInput field={field} value={value as Record<string, unknown>} onChange={onChange} />;
      case "objectList":
        return <ObjectListInput field={field} value={value as Record<string, unknown>[]} onChange={onChange} />;
      default:
        return <Input id={id} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
    }
  })();

  if (field.type === "boolean") {
    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <Label htmlFor={id} required={field.required}>{field.label}</Label>
          {field.help && <p className="mt-0.5 text-xs text-zinc-500">{field.help}</p>}
        </div>
        {control}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} required={field.required}>{field.label}</Label>
      {control}
      {field.help && <p className="text-xs text-zinc-500">{field.help}</p>}
    </div>
  );
}
