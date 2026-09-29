"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingButton } from "@/components/booking/BookingButton";

/**
 * Sticky in-page navigation for long service pages. Sits under the fixed
 * header, highlights the section in view and scrolls the active chip into
 * view on narrow screens.
 */
export function SectionNav({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    // A section counts as current once its top passes ~35% down the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const chip = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-16 z-30 border-y border-line-invert bg-dark/85 backdrop-blur-xl md:top-18">
      <div className="shell flex h-12 items-center gap-6">
        <span className="mono hidden shrink-0 text-on-ink-3 lg:block">{title}</span>
        <ul
          ref={listRef}
          className="-mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1 [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it) => (
            <li key={it.id} data-id={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "label block whitespace-nowrap rounded-full px-3 py-1.5 transition-colors",
                  active === it.id
                    ? "bg-orange/15 text-orange"
                    : "text-on-ink-3 hover:text-on-ink",
                )}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <BookingButton className="group label hidden h-8 shrink-0 cursor-pointer items-center gap-1.5 bg-orange px-3.5 text-on-orange transition-colors hover:bg-orange-press sm:inline-flex">
          Book a call
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </BookingButton>
      </div>
    </div>
  );
}
