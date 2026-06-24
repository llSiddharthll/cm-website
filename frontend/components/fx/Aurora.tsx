import { cn } from "@/lib/utils";

/**
 * Aurora UI — large, heavily-blurred orange/amber blobs drifting behind a dark
 * surface. Decorative only (aria-hidden), GPU-friendly (transform/opacity),
 * and frozen under prefers-reduced-motion.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="cm-aur cm-aur-1" />
      <span className="cm-aur cm-aur-2" />
      <span className="cm-aur cm-aur-3" />
      <style>{`
        .cm-aur {
          position: absolute;
          display: block;
          border-radius: 9999px;
          filter: blur(72px);
          will-change: transform;
        }
        .cm-aur-1 {
          width: 42vw; height: 42vw; left: -8%; top: -12%;
          background: radial-gradient(circle, var(--color-orange) 0%, transparent 68%);
          opacity: 0.45;
          animation: cm-aur-a 19s ease-in-out infinite alternate;
        }
        .cm-aur-2 {
          width: 36vw; height: 36vw; right: -6%; top: 18%;
          background: radial-gradient(circle, #ff7a18 0%, transparent 70%);
          opacity: 0.30;
          animation: cm-aur-b 23s ease-in-out infinite alternate;
        }
        .cm-aur-3 {
          width: 34vw; height: 34vw; left: 28%; bottom: -16%;
          background: radial-gradient(circle, #b45309 0%, transparent 72%);
          opacity: 0.35;
          animation: cm-aur-c 27s ease-in-out infinite alternate;
        }
        @keyframes cm-aur-a { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(12%,16%,0) scale(1.18); } }
        @keyframes cm-aur-b { from { transform: translate3d(0,0,0) scale(1.05); } to { transform: translate3d(-14%,10%,0) scale(0.9); } }
        @keyframes cm-aur-c { from { transform: translate3d(0,0,0) scale(0.95); } to { transform: translate3d(10%,-12%,0) scale(1.2); } }
        @media (prefers-reduced-motion: reduce) { .cm-aur { animation: none !important; } }
      `}</style>
    </div>
  );
}
