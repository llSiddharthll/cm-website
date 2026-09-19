import { readFile, writeFile } from "node:fs/promises";
import { env } from "../env";

/**
 * Uploads into the studio's OWN Google Drive using a one-time owner
 * authorization (offline refresh token, drive.file scope). Applicants never
 * touch Google, they just POST a file and we return a shareable link.
 */
const TOKEN_FILE = env.google.tokenFile;

export async function saveRefreshToken(token: string): Promise<void> {
  await writeFile(TOKEN_FILE, JSON.stringify({ refresh_token: token }), "utf8");
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    const parsed = JSON.parse(await readFile(TOKEN_FILE, "utf8")) as { refresh_token?: string };
    return parsed.refresh_token || null;
  } catch {
    return null;
  }
}

export async function driveConnected(): Promise<boolean> {
  return Boolean(await getRefreshToken());
}

async function accessToken(): Promise<string> {
  const refresh = await getRefreshToken();
  if (!refresh) throw new Error("Google Drive is not connected");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.google.clientId,
      client_secret: env.google.clientSecret,
      refresh_token: refresh,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function uploadToDrive(
  buffer: Buffer,
  filename: string,
  mimeType: string,
): Promise<{ url: string; name: string }> {
  const token = await accessToken();
  const metadata: Record<string, unknown> = { name: filename };
  if (env.google.folderId) metadata.parents = [env.google.folderId];

  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", new Blob([new Uint8Array(buffer)], { type: mimeType }));

  const up = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink,name",
    { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form },
  );
  if (!up.ok) throw new Error(`Drive upload failed: ${await up.text()}`);
  const file = (await up.json()) as { id: string; webViewLink: string; name: string };

  // Share: anyone with the link can view.
  await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}/permissions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ role: "reader", type: "anyone" }),
  });

  return { url: file.webViewLink, name: file.name };
}

/** Owner consent URL (offline access so we get a refresh token). */
export function consentUrl(): string {
  const params = new URLSearchParams({
    client_id: env.google.clientId,
    redirect_uri: env.google.redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/drive.file",
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/** Exchange the auth code for tokens; returns the refresh token. */
export async function exchangeCode(code: string): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.google.clientId,
      client_secret: env.google.clientSecret,
      code,
      redirect_uri: env.google.redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error(`Code exchange failed: ${await res.text()}`);
  const data = (await res.json()) as { refresh_token?: string };
  if (!data.refresh_token)
    throw new Error("No refresh token returned, revoke prior access and retry with prompt=consent.");
  return data.refresh_token;
}
