"use client";

import * as RSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputClass } from "./ui";

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select…",
  className,
  allowClear,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  allowClear?: boolean;
}) {
  return (
    <RSelect.Root value={value || undefined} onValueChange={onValueChange}>
      <RSelect.Trigger
        className={cn(inputClass, "flex items-center justify-between gap-2 text-left", className)}
      >
        <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon>
          <ChevronDown className="size-4 text-zinc-500" />
        </RSelect.Icon>
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          sideOffset={4}
          className="z-[120] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg"
        >
          <RSelect.Viewport className="p-1">
            {allowClear && (
              <Item value="__all__" label="All" />
            )}
            {options.map((o) => (
              <Item key={o.value} value={o.value} label={o.label} />
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
}

function Item({ value, label }: { value: string; label: string }) {
  return (
    <RSelect.Item
      value={value}
      className="relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-3 text-sm text-zinc-300 outline-none data-[highlighted]:bg-zinc-800 data-[state=checked]:font-medium data-[state=checked]:text-orange"
    >
      <RSelect.ItemIndicator className="absolute left-2">
        <Check className="size-4" />
      </RSelect.ItemIndicator>
      <RSelect.ItemText>{label}</RSelect.ItemText>
    </RSelect.Item>
  );
}
