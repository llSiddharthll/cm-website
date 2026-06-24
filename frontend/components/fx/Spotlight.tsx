"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** A soft orange radial glow that follows the cursor inside the element. */
export function Spotlight({
  children,
  className,
  size = 420,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: -1, y: -1, on: false });

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setP({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setP((s) => ({ ...s, on: false }))}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: p.on ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${p.x}px ${p.y}px, rgba(244,118,32,0.18), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
