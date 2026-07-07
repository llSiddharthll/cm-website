"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Magnetic } from "@/components/fx/Magnetic";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const inputCls =
  "w-full bg-dark-2 border border-line-invert px-4 py-3 text-on-ink placeholder:text-on-ink-3 focus:border-orange focus:outline-none transition-colors";
const labelCls = "label text-on-ink-3 mb-2 block";

const OPEN = "Open application";

export function ApplicationForm({
  roles,
  initialRole,
}: {
  roles: string[];
  initialRole?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const role = get("role") || OPEN;
    const application = {
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      role,
      portfolio: get("portfolio"),
      linkedin: get("linkedin"),
      resume: get("resume"),
      message: get("message"),
      source: "careers-apply",
    };

    // No backend configured → succeed gracefully (demo mode).
    if (!API) {
      setStatus("done");
      return;
    }

    const post = (path: string, body: unknown) =>
      fetch(`${API}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    try {
      let res = await post("/api/intake/apply", application);
      // Backend not yet updated with the /apply route → fall back to the
      // contact inbox so no application is ever lost.
      if (res.status === 404) {
        res = await post("/api/intake/contact", {
          name: application.name,
          email: application.email,
          phone: application.phone,
          company: role,
          service: role,
          message: [
            application.message,
            application.portfolio && `Portfolio: ${application.portfolio}`,
            application.linkedin && `LinkedIn: ${application.linkedin}`,
            application.resume && `Resume: ${application.resume}`,
          ]
            .filter(Boolean)
            .join("\n"),
          source: `Application — ${role}`,
        });
      }
      if (!res.ok)
        throw new Error((await res.json().catch(() => ({}))).error || "Failed to send");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 border border-line-invert bg-dark-2 p-8 md:p-12"
      >
        <Check className="size-10 text-orange" strokeWidth={2} />
        <p className="display text-[length:var(--text-h3)] text-on-ink">
          Application received — thank you.
        </p>
        <p className="max-w-md text-on-ink-2">
          We read every application ourselves. If there&rsquo;s a fit, we&rsquo;ll
          reach out within a few days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="af-name" className={labelCls}>
          Full name <span className="text-orange" aria-hidden="true">*</span>
        </label>
        <input id="af-name" name="name" type="text" required placeholder="Your name" className={inputCls} />
      </div>
      <div>
        <label htmlFor="af-email" className={labelCls}>
          Email <span className="text-orange" aria-hidden="true">*</span>
        </label>
        <input id="af-email" name="email" type="email" required placeholder="you@email.com" className={inputCls} />
      </div>
      <div>
        <label htmlFor="af-phone" className={labelCls}>
          Phone
        </label>
        <input id="af-phone" name="phone" type="tel" placeholder="+91 …" className={inputCls} />
      </div>
      <div>
        <label htmlFor="af-role" className={labelCls}>
          Role
        </label>
        <select id="af-role" name="role" defaultValue={initialRole || OPEN} className={inputCls}>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
          <option value={OPEN}>{OPEN}</option>
        </select>
      </div>
      <div>
        <label htmlFor="af-portfolio" className={labelCls}>
          Portfolio / website
        </label>
        <input id="af-portfolio" name="portfolio" type="url" placeholder="https://…" className={inputCls} />
      </div>
      <div>
        <label htmlFor="af-linkedin" className={labelCls}>
          LinkedIn
        </label>
        <input id="af-linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="af-resume" className={labelCls}>
          Resume / CV link
        </label>
        <input
          id="af-resume"
          name="resume"
          type="url"
          placeholder="Link to your resume (Google Drive, Dropbox, PDF URL…)"
          className={inputCls}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="af-message" className={labelCls}>
          Why Creative Monk? <span className="text-orange" aria-hidden="true">*</span>
        </label>
        <textarea
          id="af-message"
          name="message"
          rows={5}
          required
          placeholder="A few lines on what you'd build here and why you're a fit…"
          className={inputCls}
        />
      </div>
      <div className="flex items-center gap-4 sm:col-span-2">
        <Magnetic>
          <button
            type="submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
            className="flex h-13 items-center justify-center gap-2 bg-orange px-7 text-on-orange transition-colors hover:bg-orange-press disabled:opacity-60"
          >
            {status === "loading" && <Loader2 className="size-4 animate-spin" />}
            {status === "loading" ? "Sending…" : "Submit application"}
          </button>
        </Magnetic>
        {status === "error" && (
          <span role="alert" className="mono text-sm text-red-400">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
