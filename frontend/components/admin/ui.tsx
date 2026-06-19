"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Button ── */
type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "icon";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-orange text-on-orange hover:bg-orange-press",
  secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
  outline: "border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800",
  ghost: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};
const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  icon: "h-9 w-9 justify-center",
};

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
  }
>(function Button(
  { className, variant = "primary", size = "md", loading, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40 disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
});

/* ── Input / Textarea ── */
export const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 disabled:bg-zinc-800";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(inputClass, className)} {...props} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(inputClass, "min-h-[88px] resize-y", className)} {...props} />;
});

/* ── Label ── */
export function Label({
  children,
  required,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("block text-sm font-medium text-zinc-300", className)}>
      {children}
      {required && <span className="ml-0.5 text-orange">*</span>}
    </label>
  );
}

/* ── Badge ── */
const BADGE: Record<string, string> = {
  new: "bg-orange/20 text-orange",
  contacted: "bg-blue-500/15 text-blue-300",
  qualified: "bg-violet-500/15 text-violet-300",
  won: "bg-emerald-500/15 text-emerald-300",
  lost: "bg-zinc-700 text-zinc-300",
  published: "bg-emerald-500/15 text-emerald-300",
  draft: "bg-amber-500/15 text-amber-300",
  default: "bg-zinc-800 text-zinc-300",
};
export function Badge({ children, tone }: { children: React.ReactNode; tone?: string }) {
  const cls = (tone && BADGE[tone]) || BADGE.default;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", cls)}>
      {children}
    </span>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("size-5 animate-spin text-zinc-500", className)} />;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900", className)}>{children}</div>
  );
}
