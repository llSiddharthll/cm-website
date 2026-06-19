import type { Collection, Entry, MediaAsset, Overview, AdminUser } from "./types";

export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

const TOKEN_KEY = "cm_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  if (!API_BASE) throw new ApiError(0, "NEXT_PUBLIC_API_URL is not configured");
  const token = getToken();
  const headers = new Headers(opts.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (opts.body && !(opts.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(`${API_BASE}/api${path}`, { ...opts, headers });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, (data as { error?: string }).error || res.statusText);
  }
  return data as T;
}

/* ── auth ── */
export async function login(email: string, password: string) {
  const data = await request<{ token: string; user: AdminUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data;
}
export const me = () => request<{ user: AdminUser }>("/auth/me");

/* ── schema ── */
export const getSchema = () => request<{ collections: Collection[] }>("/schema");

/* ── overview ── */
export const getOverview = () => request<Overview>("/overview");

/* ── content ── */
export function listEntries(
  collection: string,
  params: Record<string, string> = {},
): Promise<Entry[]> {
  const qs = new URLSearchParams({ status: "all", ...params }).toString();
  return request<Entry[]>(`/content/${collection}?${qs}`);
}
export const getSingleton = (collection: string) =>
  request<Entry | null>(`/content/${collection}`);
export const getEntry = (collection: string, id: string) =>
  request<Entry>(`/content/${collection}/${id}`);

export const createEntry = (collection: string, data: Record<string, unknown>, status = "published") =>
  request<Entry>(`/content/${collection}`, {
    method: "POST",
    body: JSON.stringify({ data, status }),
  });

export const updateEntry = (
  collection: string,
  id: string,
  data: Record<string, unknown>,
  status?: string,
) =>
  request<Entry>(`/content/${collection}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ data, status }),
  });

export const updateSingleton = (collection: string, data: Record<string, unknown>) =>
  request<Entry>(`/content/${collection}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
  });

export const deleteEntry = (collection: string, id: string) =>
  request<{ ok: boolean }>(`/content/${collection}/${id}`, { method: "DELETE" });

export const reorderEntries = (collection: string, ids: string[]) =>
  request<{ ok: boolean }>(`/content/${collection}/reorder`, {
    method: "POST",
    body: JSON.stringify({ ids }),
  });

/* ── media ── */
export const listMedia = () => request<MediaAsset[]>("/media");
export async function uploadMedia(file: File): Promise<MediaAsset> {
  const fd = new FormData();
  fd.append("file", file);
  return request<MediaAsset>("/media/upload", { method: "POST", body: fd });
}
export const deleteMedia = (id: string) =>
  request<{ ok: boolean }>(`/media/${id}`, { method: "DELETE" });
