import { TrendingUp, Search } from "lucide-react";

type Stat = { label: string; value: string; suffix?: string };

export function SeoBlock({ keywords, stats }: { keywords?: string[]; stats?: Stat[] }) {
  const kws = (keywords || []).filter(Boolean);
  const ms = (stats || []).filter((s) => s.value);
  return (
    <div className="grid12 gap-y-12">
      {ms.length > 0 && (
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-invert bg-line-invert sm:grid-cols-3">
            {ms.map((s, i) => (
              <div key={i} className="bg-dark-2 p-6">
                <div className="flex items-center gap-1.5 text-orange">
                  <TrendingUp className="size-4" />
                  <span className="display text-[length:var(--text-h2)] leading-none text-on-ink">{s.value}</span>
                </div>
                <span className="label mt-3 block text-on-ink-3">
                  {s.label}
                  {s.suffix ? ` ${s.suffix}` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {kws.length > 0 && (
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="mb-4 flex items-center gap-2 text-on-ink-3">
            <Search className="size-4" />
            <span className="label">Ranking keywords</span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {kws.map((k, i) => (
              <li
                key={i}
                className="mono inline-flex items-center gap-1.5 rounded-full border border-line-invert bg-dark px-3 py-1.5 text-[length:var(--text-mono)] text-on-ink-2"
              >
                <span className="size-1.5 rounded-full bg-orange" />
                {k}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
