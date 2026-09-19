"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

const pill =
  "mono inline-flex items-center gap-2 rounded-full border border-line-invert px-3.5 py-2 text-xs text-on-ink-2 transition-colors hover:border-orange hover:text-on-ink";

export function ShareRow({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://thecreativemonk.in${path}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const ln = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  return (
    <div className="mt-14 flex flex-wrap items-center gap-2.5 border-t border-line-invert pt-8">
      <span className="label mr-1 text-on-ink-3">Share</span>
      <button type="button" onClick={copy} className={pill}>
        {copied ? <Check className="size-3.5 text-orange" /> : <Link2 className="size-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a href={x} target="_blank" rel="noopener noreferrer" className={pill}>
        X
      </a>
      <a href={ln} target="_blank" rel="noopener noreferrer" className={pill}>
        LinkedIn
      </a>
      <a href={wa} target="_blank" rel="noopener noreferrer" className={pill}>
        WhatsApp
      </a>
    </div>
  );
}
