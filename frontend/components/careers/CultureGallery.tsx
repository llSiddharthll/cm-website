"use client";

/**
 * Two rows of studio/culture imagery drifting in opposite directions — pauses
 * on hover, frozen under prefers-reduced-motion. Decorative (aria-hidden).
 * Plain <img> because the sources are already Cloudinary-optimised.
 */
export function CultureGallery({ images }: { images: string[] }) {
  if (!images.length) return null;
  const mid = Math.ceil(images.length / 2);
  const rowA = images.slice(0, mid);
  const rowB = images.slice(mid).length >= 3 ? images.slice(mid) : images;

  const Row = ({ items, reverse }: { items: string[]; reverse?: boolean }) => (
    <div className="flex w-max gap-4 will-change-transform" data-reverse={reverse ? "" : undefined}>
      {[...items, ...items].map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="h-48 w-72 shrink-0 rounded-xl border border-line-invert-2 bg-dark-2 object-cover md:h-64 md:w-[24rem]"
        />
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="relative flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
    >
      <div className="cm-cg-track">
        <Row items={rowA} />
      </div>
      <div className="cm-cg-track cm-cg-rev">
        <Row items={rowB} reverse />
      </div>
      <style>{`
        .cm-cg-track { display: flex; animation: cm-cg 46s linear infinite; }
        .cm-cg-rev { animation-direction: reverse; animation-duration: 58s; }
        .cm-cg-track:hover { animation-play-state: paused; }
        @keyframes cm-cg { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .cm-cg-track { animation: none; } }
      `}</style>
    </div>
  );
}
