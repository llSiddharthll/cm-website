"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check, Loader2 } from "lucide-react";
import { SITE } from "@/lib/content";
import { SERVICES_12 } from "@/lib/agency";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const inputCls =
  "w-full bg-dark-2 border border-line-invert px-4 py-3 text-on-ink placeholder:text-on-ink-3 focus:border-orange focus:outline-none transition-colors";
const labelCls = "label text-on-ink-3 mb-2 block";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

type ContactSite = {
  email: string;
  phone: string;
  phoneHref: string;
  address: string;
  socials: readonly { label: string; href: string }[];
};

export function ContactForm({
  site = SITE,
  services = SERVICES_12,
}: {
  site?: ContactSite;
  services?: readonly { title: string }[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      company: String(fd.get("company") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
      source: "website-contact",
    };

    // No backend configured → succeed gracefully (demo mode).
    if (!API) {
      setStatus("done");
      return;
    }
    try {
      const res = await fetch(`${API}/api/intake/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Failed to send");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="bg-dark text-on-ink section">
      <div className="shell">
        <div className="grid12 gap-y-14">
          {/* LEFT — pitch + details */}
          <Reveal className="col-span-12 md:col-span-4">
            <Eyebrow index="11" invert>
              Contact
            </Eyebrow>
            <h2 className="display mt-6 text-[length:var(--text-h2)] text-on-ink">
              Start a project.
            </h2>
            <p className="mt-5 max-w-md text-on-ink-2">
              Tell us where you want to grow. We&rsquo;ll come back with a clear,
              honest next step — not a hard sell.
            </p>

            <dl className="mt-10 flex flex-col gap-6">
              <div>
                <dt className={labelCls}>Email</dt>
                <dd className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-orange" strokeWidth={2} />
                  <a
                    href={`mailto:${site.email}`}
                    className="text-on-ink hover:text-orange transition-colors"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={labelCls}>Phone</dt>
                <dd className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-orange" strokeWidth={2} />
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="text-on-ink hover:text-orange transition-colors"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={labelCls}>Studio</dt>
                <dd className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-orange"
                    strokeWidth={2}
                  />
                  <span className="text-on-ink-2">{site.address}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line-invert pt-6">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-on-ink-2 hover:text-orange transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>

          {/* RIGHT — form / success */}
          <Reveal
            delay={0.1}
            className="col-span-12 md:col-span-7 md:col-start-6"
          >
            {status === "done" ? (
              <div className="flex flex-col items-start gap-5 border border-line-invert bg-dark-2 p-8 md:p-12">
                <Check className="size-10 text-orange" strokeWidth={2} />
                <p className="display text-[length:var(--text-h3)] text-on-ink">
                  Thanks — we&rsquo;ll be in touch within one business day.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mono text-on-ink-2 hover:text-orange transition-colors"
                >
                  or email us directly at {site.email}
                </a>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="cf-name" className={labelCls}>
                    Name
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cf-phone" className={labelCls}>
                    Phone
                  </label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 …"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cf-company" className={labelCls}>
                    Company
                  </label>
                  <input
                    id="cf-company"
                    name="company"
                    type="text"
                    placeholder="Company name"
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cf-service" className={labelCls}>
                    Service
                  </label>
                  <select
                    id="cf-service"
                    name="service"
                    defaultValue=""
                    className={inputCls}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cf-message" className={labelCls}>
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project…"
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex h-13 items-center justify-center gap-2 bg-orange px-7 text-on-orange hover:bg-orange-press transition-colors disabled:opacity-60"
                  >
                    {status === "loading" && <Loader2 className="size-4 animate-spin" />}
                    {status === "loading" ? "Sending…" : "Send message"}
                  </button>
                  {status === "error" && (
                    <span className="mono text-sm text-red-400">{error}</span>
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
