"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import { useAdmin } from "@/components/admin/provider";
import { Input, Label, Button } from "@/components/admin/ui";

export default function LoginPage() {
  const { login, configured } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="Creative Monk" className="size-10" />
          <h1 className="mt-4 text-lg font-semibold text-white">Creative Monk Studio</h1>
          <p className="text-sm text-zinc-500">Sign in to manage the site</p>
        </div>

        {!configured && (
          <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>
              <code>NEXT_PUBLIC_API_URL</code> is not set. Point it at the deployed API
              to enable the admin.
            </span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-zinc-300">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@thecreativemonk.in"
              className="border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-zinc-300">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-600"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full justify-center" loading={loading} disabled={!configured}>
            {!loading && "Sign in"}
            {loading && <Loader2 className="size-4 animate-spin" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
