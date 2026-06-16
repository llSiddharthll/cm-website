"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const RATIO: Record<string, string> = {
  "9/16": "aspect-[9/16]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
};

/**
 * Reel/work tile, Swiss-flat. No gradients or spinning textures — a disciplined
 * ink block with a mono index, a hairline frame, and a crisp orange-on-hover
 * reveal. If `src` is set it plays a real <video> on hover; otherwise the block
 * stands in. Drop a file in /public/reels and pass `src` to go live.
 */
export function ReelPlaceholder({
  title,
  category,
  index,
  ratio = "9/16",
  src,
  poster,
  className,
}: {
  title: string;
  category: string;
  index?: string;
  ratio?: "9/16" | "1/1" | "16/9";
  accent?: string;
  src?: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => videoRef.current?.play().catch(() => {});
  const onLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "group/reel relative w-full overflow-hidden border border-line bg-ink-block",
        RATIO[ratio],
        className,
      )}
    >
      {src ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 size-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <>
          {/* big ghost index — typographic, not decorative noise */}
          {index && (
            <span
              aria-hidden
              className="display pointer-events-none absolute -bottom-4 -right-2 select-none text-[8rem] font-black leading-none text-on-ink/[0.06]"
            >
              {index}
            </span>
          )}
          {/* orange wipe on hover */}
          <span
            aria-hidden
            className="absolute inset-0 origin-bottom scale-y-0 bg-orange transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/reel:scale-y-100"
          />
        </>
      )}

      {/* meta — top-left index/category, bottom title */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <span className="label text-on-ink/70 transition-colors duration-300 group-hover/reel:text-on-orange">
            {category}
          </span>
          <ArrowUpRight
            className="size-5 text-on-ink/60 transition-all duration-300 group-hover/reel:text-on-orange group-hover/reel:translate-x-0.5 group-hover/reel:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <p className="display text-lg font-bold leading-tight text-on-ink transition-colors duration-300 group-hover/reel:text-on-orange">
          {title}
        </p>
      </div>
    </div>
  );
}
