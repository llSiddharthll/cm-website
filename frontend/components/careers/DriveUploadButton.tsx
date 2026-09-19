"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, UploadCloud, Check } from "lucide-react";

/**
 * "Upload CV to Google Drive" — the applicant uploads their CV into THEIR OWN
 * Google Drive via the Google Picker (drive.file scope), we flip it to
 * "anyone with the link can view", and hand the shareable link back to the
 * form. No file ever touches our storage.
 *
 * Enabled only when both public creds are set (else the form just uses the
 * plain "paste a link" field):
 *   NEXT_PUBLIC_GOOGLE_CLIENT_ID   — OAuth 2.0 Web client id
 *   NEXT_PUBLIC_GOOGLE_API_KEY     — API key (Picker API enabled)
 *   NEXT_PUBLIC_GOOGLE_APP_ID      — (optional) GCP project number
 */
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
// API key + project number are provisioned; only the OAuth Client ID (console-
// only) is still needed to enable the applicant's-own-Drive path.
const API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyALdKlFVrT3zPMmL5CMxh82H_Sgw8zREFQ";
const APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID || "596691896133";
const SCOPE = "https://www.googleapis.com/auth/drive.file";

export const driveUploadEnabled = Boolean(CLIENT_ID && API_KEY);

/* eslint-disable @typescript-eslint/no-explicit-any */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

export function DriveUploadButton({
  onUploaded,
}: {
  onUploaded: (url: string, filename: string) => void;
}) {
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [doneName, setDoneName] = useState("");
  const [error, setError] = useState("");
  const tokenRef = useRef<string>("");
  const tokenClientRef = useRef<any>(null);

  useEffect(() => {
    if (!driveUploadEnabled) return;
    let alive = true;
    (async () => {
      try {
        await Promise.all([
          loadScript("https://accounts.google.com/gsi/client"),
          loadScript("https://apis.google.com/js/api.js"),
        ]);
        await new Promise<void>((res) => (window as any).gapi.load("picker", res));
        if (!alive) return;
        tokenClientRef.current = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPE,
          callback: () => {},
        });
        setReady(true);
      } catch {
        if (alive) setError("Couldn't load Google Drive uploader.");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const openPicker = useCallback(() => {
    const g = (window as any).google;
    const view = new g.picker.DocsUploadView().setIncludeFolders(false);
    const builder = new g.picker.PickerBuilder()
      .setOAuthToken(tokenRef.current)
      .setDeveloperKey(API_KEY)
      .addView(view)
      .setTitle("Upload your CV")
      .setCallback(async (data: any) => {
        if (data.action === g.picker.Action.CANCEL) {
          setBusy(false);
          return;
        }
        if (data.action !== g.picker.Action.PICKED) return;
        try {
          const doc = data.docs[0];
          const id = doc.id;
          // make it viewable by anyone with the link
          await fetch(`https://www.googleapis.com/drive/v3/files/${id}/permissions`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenRef.current}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "reader", type: "anyone" }),
          });
          const meta = await fetch(
            `https://www.googleapis.com/drive/v3/files/${id}?fields=webViewLink,name`,
            { headers: { Authorization: `Bearer ${tokenRef.current}` } },
          ).then((r) => r.json());
          const url = meta.webViewLink || doc.url || "";
          const name = meta.name || doc.name || "CV";
          setDoneName(name);
          onUploaded(url, name);
        } catch {
          setError("Upload finished but sharing the link failed — paste it below instead.");
        } finally {
          setBusy(false);
        }
      })
      .build();
    if (APP_ID) builder.setAppId?.(APP_ID);
    builder.setVisible?.(true);
  }, [onUploaded]);

  const start = useCallback(() => {
    setError("");
    setBusy(true);
    const tc = tokenClientRef.current;
    tc.callback = (resp: any) => {
      if (resp.error) {
        setBusy(false);
        setError("Google sign-in was cancelled.");
        return;
      }
      tokenRef.current = resp.access_token;
      openPicker();
    };
    tc.requestAccessToken({ prompt: tokenRef.current ? "" : "consent" });
  }, [openPicker]);

  if (!driveUploadEnabled) return null;

  const title = doneName
    ? `Uploaded — ${doneName}`
    : busy
      ? "Uploading to your Drive…"
      : !ready
        ? "Loading Google Drive…"
        : "Upload your CV to Google Drive";
  const sub = doneName
    ? "Shared “anyone with the link” · link filled in below"
    : "Signs into your Google, uploads to your Drive, shares it view-only, and fills the link below";

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={start}
        disabled={!ready || busy}
        className="group/up flex w-full items-center gap-4 rounded-lg border border-dashed border-line-invert bg-dark-2 px-5 py-4 text-left transition-colors hover:border-orange disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full ${
            doneName ? "bg-orange text-on-orange" : "bg-orange/10 text-orange"
          }`}
        >
          {busy ? (
            <Loader2 className="size-5 animate-spin" />
          ) : doneName ? (
            <Check className="size-5" />
          ) : (
            <UploadCloud className="size-5" />
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-on-ink">{title}</span>
          <span className="mono block truncate text-xs text-on-ink-3">{sub}</span>
        </span>
      </button>
      {error && (
        <span role="alert" className="mono mt-2 block text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
