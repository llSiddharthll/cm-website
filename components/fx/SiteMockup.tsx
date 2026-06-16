import type { CaseStudy } from "@/lib/content";

/**
 * A tall, flat "website screenshot" built from a case's data — a stand-in for a
 * real long-scroll capture. Lives inside the BottomSheet's scroll area. Swap the
 * whole block for <img src="/work/<id>-full.png"/> when real screenshots exist.
 */
export function SiteMockup({ c }: { c: CaseStudy }) {
  const domain = c.client.toLowerCase().replace(/[^a-z]/g, "") + ".com";
  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-paper">
      {/* fake browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="mono ml-4 truncate text-ink-3">{domain}</span>
      </div>

      {/* captured page */}
      <div className="bg-paper">
        {/* site header */}
        <div className="flex items-center justify-between px-8 py-5">
          <span className="display text-sm font-extrabold text-ink">
            {c.client}
          </span>
          <span className="hidden gap-6 sm:flex">
            {["Home", "Work", "About", "Contact"].map((n) => (
              <span key={n} className="label text-ink-3">
                {n}
              </span>
            ))}
          </span>
          <span className="size-6 bg-orange" aria-hidden />
        </div>

        {/* hero */}
        <div className="border-y border-line px-8 py-14">
          <span className="label text-orange">{c.category[0]}</span>
          <p className="display-tight mt-4 max-w-[16ch] text-[clamp(2rem,5vw,4rem)] text-ink">
            {c.title}
            <span className="ml-1 inline-block size-[0.5em] translate-y-[0.05em] bg-orange align-baseline" />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="flex h-11 items-center bg-ink px-5 text-sm text-on-ink">
              Get started
            </span>
            <span className="flex h-11 items-center border border-ink/25 px-5 text-sm text-ink">
              Learn more
            </span>
          </div>
        </div>

        {/* big media block */}
        <div className="grid grid-cols-3 gap-1 bg-line p-1">
          <div className="col-span-2 aspect-[16/10] bg-ink-block" />
          <div className="flex flex-col gap-1">
            <div className="flex-1 bg-orange" />
            <div className="flex-1 bg-paper-3" />
          </div>
        </div>

        {/* feature row */}
        <div className="grid grid-cols-1 gap-8 px-8 py-14 sm:grid-cols-3">
          {[c.metric, { value: c.year, label: "launched" }, { value: c.category.length + "+", label: "workstreams" }].map(
            (m, i) => (
              <div key={i} className="border-t border-ink pt-4">
                <span className="display block text-3xl text-ink">{m.value}</span>
                <span className="label mt-2 block text-ink-3">{m.label}</span>
              </div>
            ),
          )}
        </div>

        {/* text section */}
        <div className="border-t border-line px-8 py-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
            <span className="label sm:col-span-3 text-ink-3">Overview</span>
            <p className="display text-[length:var(--text-h3)] leading-[1.2] text-ink-3 sm:col-span-9">
              {c.result}{" "}
              <span className="text-ink">Built to compound, long after launch.</span>
            </p>
          </div>
        </div>

        {/* gallery grid */}
        <div className="grid grid-cols-2 gap-1 bg-line p-1 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square ${i % 4 === 0 ? "bg-orange" : "bg-ink-block"}`}
            />
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between bg-ink-block px-8 py-10 text-on-ink">
          <span className="display text-lg font-extrabold">{c.client}</span>
          <span className="label text-on-ink-2">© {c.year}</span>
        </div>
      </div>
    </div>
  );
}
