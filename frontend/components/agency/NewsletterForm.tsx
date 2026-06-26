"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    if (!API) {
      setLoading(false);
      setDone(true);
      return;
    }
    try {
      const res = await fetch(`${API}/api/intake/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      setError("Couldn't subscribe just now — please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="mt-7 flex max-w-xs items-center gap-2 border border-line-invert px-4 py-3 text-sm text-on-ink">
        <Check className="size-4 text-orange" /> You&rsquo;re on the list.
      </p>
    );
  }

  return (
    <>
    <form
      onSubmit={onSubmit}
      className="mt-7 flex max-w-xs items-center border border-line-invert focus-within:border-orange"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for the newsletter"
        aria-label="Email for the newsletter"
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-on-ink placeholder:text-on-ink-3 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        aria-label="Subscribe"
        className="flex h-11 w-11 shrink-0 items-center justify-center bg-orange text-on-orange transition-colors hover:bg-orange-press disabled:opacity-60"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
    {error && (
      <p role="alert" className="mono mt-2 max-w-xs text-xs text-red-400">
        {error}
      </p>
    )}
    </>
  );
}
