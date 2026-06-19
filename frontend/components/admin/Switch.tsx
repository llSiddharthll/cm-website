"use client";

import * as RSwitch from "@radix-ui/react-switch";

export function Switch({
  checked,
  onCheckedChange,
  id,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  id?: string;
}) {
  return (
    <RSwitch.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="relative h-6 w-11 shrink-0 rounded-full bg-zinc-300 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange/40 data-[state=checked]:bg-orange"
    >
      <RSwitch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
    </RSwitch.Root>
  );
}
