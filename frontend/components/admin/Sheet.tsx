"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = "max-w-xl",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-zinc-900/40 backdrop-blur-sm data-[state=open]:animate-[fadeIn_.2s_ease]" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-[101] flex w-full flex-col bg-white shadow-2xl outline-none",
            "data-[state=open]:animate-[slideIn_.28s_cubic-bezier(0.16,1,0.3,1)]",
            width,
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-6 py-4">
            <div className="min-w-0">
              <Dialog.Title className="truncate text-base font-semibold text-zinc-900">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="mt-0.5 truncate text-sm text-zinc-500">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700">
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

          {footer && (
            <div className="flex items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50 px-6 py-4">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </Dialog.Root>
  );
}
