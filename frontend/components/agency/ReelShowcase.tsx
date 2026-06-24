"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/fx/Aurora";
import { Magnetic } from "@/components/fx/Magnetic";

export function ReelShowcase({
  src = "/video/reel1.mp4",
  poster = "/video/reel1-poster.jpg",
}: {
  src?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // autoplay (muted) only while in view; pause when out
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      io.disconnect();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  }

  return (
    <section className="relative isolate overflow-hidden bg-dark section text-on-ink">
      <Aurora className="opacity-40" />
      <div className="shell relative z-10 grid12 items-center gap-y-12">
        {/* copy */}
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <Eyebrow index="07" invert>
              Motion / Reels
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-tight mt-6 text-[length:var(--text-h1)] leading-[1.0] text-on-ink">
              Turning vision
              <br />
              <span className="text-orange">into visuals.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-snug text-on-ink-2">
              Concept, camera and cut — short-form built end-to-end in-house. The
              kind of scroll-stopping motion that travels across feeds and earns
              the save.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[length:var(--text-mono)] mono uppercase tracking-wider text-on-ink-3">
              <li>Concept &amp; script</li>
              <li>Production</li>
              <li>Edit &amp; sound</li>
              <li>Publish</li>
            </ul>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-medium text-dark transition-transform hover:scale-[1.02]"
                >
                  Make a reel
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-on-ink/20 px-6 py-3 text-sm font-medium text-on-ink transition-colors hover:border-orange/50 hover:text-orange"
                >
                  See the work
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* phone-frame reel */}
        <div className="col-span-12 flex justify-center lg:col-span-5 lg:col-start-8">
          <Reveal>
            <div className="group relative w-[clamp(15rem,78vw,19rem)]">
              {/* glow */}
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-orange/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-on-ink/10 bg-dark-2 shadow-2xl">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  ref={ref}
                  src={src}
                  poster={poster}
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  className="size-full object-cover"
                />
                {/* gradient + status */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="mono inline-flex items-center gap-1.5 rounded-full bg-dark/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-on-ink backdrop-blur">
                    <span className="size-1.5 animate-pulse rounded-full bg-orange" />
                    Reel
                  </span>
                </div>
                {!playing && (
                  <div className="pointer-events-none absolute inset-0 grid place-items-center bg-dark/30">
                    <Play className="size-12 fill-on-ink/90 text-on-ink/90" />
                  </div>
                )}
                {/* sound toggle */}
                <button
                  onClick={toggleSound}
                  aria-label={muted ? "Unmute reel" : "Mute reel"}
                  className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-dark/70 text-on-ink backdrop-blur transition-colors hover:bg-orange hover:text-dark"
                >
                  {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                </button>
              </div>
              <p className="mono mt-4 text-center text-[length:var(--text-mono)] text-on-ink-3">
                Shot, directed &amp; edited in-house
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
