/**
 * A tall, light, CSS-rendered landing page that reads like a real website
 * screenshot — used inside ScreenshotScroll when no real screenshot is uploaded.
 * Pure markup (no images), so it always renders crisply.
 */
export function MockSitePage({ title = "Brand" }: { title?: string }) {
  const bar = (w: string, c = "bg-zinc-200") => (
    <span className={`block h-2.5 rounded-full ${c}`} style={{ width: w }} />
  );
  return (
    <div className="bg-white text-zinc-900">
      {/* nav */}
      <div className="flex items-center justify-between px-10 py-5">
        <span className="text-sm font-bold tracking-tight">{title}</span>
        <div className="hidden items-center gap-6 sm:flex">
          {["Work", "About", "Services", "Contact"].map((l) => (
            <span key={l} className="text-xs text-zinc-400">{l}</span>
          ))}
          <span className="rounded-full bg-orange px-3 py-1.5 text-[10px] font-semibold text-white">Get started</span>
        </div>
      </div>

      {/* hero */}
      <div className="grid grid-cols-1 items-center gap-8 px-10 py-16 md:grid-cols-2">
        <div className="space-y-5">
          <span className="inline-block rounded-full bg-orange/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange">New season</span>
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight">Make it<br />unmistakable.</h2>
          <div className="space-y-2">{bar("100%")}{bar("80%")}{bar("60%")}</div>
          <div className="flex gap-3 pt-2">
            <span className="rounded-lg bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white">Shop now</span>
            <span className="rounded-lg border border-zinc-200 px-5 py-2.5 text-xs font-semibold text-zinc-700">Learn more</span>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-orange/80 via-orange to-amber-500" />
      </div>

      {/* logo strip */}
      <div className="flex items-center justify-between border-y border-zinc-100 px-10 py-6">
        {[...Array(5)].map((_, i) => <span key={i} className="h-4 w-20 rounded bg-zinc-100" />)}
      </div>

      {/* features */}
      <div className="grid grid-cols-1 gap-6 px-10 py-16 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-zinc-100 p-6">
            <span className="block size-9 rounded-xl bg-orange/10" />
            {bar("70%", "bg-zinc-300")}{bar("100%")}{bar("90%")}{bar("50%")}
          </div>
        ))}
      </div>

      {/* image + text */}
      <div className="grid grid-cols-1 items-center gap-8 bg-zinc-50 px-10 py-16 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-gradient-to-tr from-zinc-200 to-zinc-100" />
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange">Our craft</span>
          <h3 className="text-2xl font-bold tracking-tight">Built to last, designed to convert.</h3>
          <div className="space-y-2">{bar("100%")}{bar("95%")}{bar("85%")}{bar("70%")}</div>
        </div>
      </div>

      {/* gallery */}
      <div className="grid grid-cols-2 gap-4 px-10 py-16 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`aspect-[4/5] rounded-xl ${i % 3 === 0 ? "bg-orange/15" : "bg-zinc-100"}`} />
        ))}
      </div>

      {/* stats band */}
      <div className="grid grid-cols-3 gap-6 bg-zinc-900 px-10 py-14 text-white">
        {["4.1×", "+212%", "98"].map((v, i) => (
          <div key={i} className="space-y-2">
            <span className="block text-3xl font-extrabold text-orange">{v}</span>
            {bar("80%", "bg-zinc-700")}
          </div>
        ))}
      </div>

      {/* cta */}
      <div className="space-y-5 px-10 py-20 text-center">
        <h3 className="text-3xl font-extrabold tracking-tight">Ready when you are.</h3>
        <div className="mx-auto max-w-sm space-y-2">{bar("100%")}{bar("70%")}</div>
        <span className="inline-block rounded-lg bg-orange px-6 py-3 text-xs font-semibold text-white">Book a call</span>
      </div>

      {/* footer */}
      <div className="grid grid-cols-4 gap-6 border-t border-zinc-100 px-10 py-12">
        {[...Array(4)].map((_, col) => (
          <div key={col} className="space-y-2.5">
            <span className="block h-2 w-16 rounded bg-zinc-300" />
            {[...Array(4)].map((_, r) => <span key={r} className="block h-2 w-12 rounded bg-zinc-100" />)}
          </div>
        ))}
      </div>
    </div>
  );
}
