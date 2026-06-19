"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as api from "@/lib/admin/api";
import type { AdminUser, Collection } from "@/lib/admin/types";

type AdminCtx = {
  ready: boolean;
  user: AdminUser | null;
  collections: Collection[];
  collectionsBySlug: Record<string, Collection>;
  configured: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AdminCtx | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);

  const loadSchema = useCallback(async () => {
    try {
      const { collections } = await api.getSchema();
      setCollections(collections);
    } catch {
      /* schema is public; ignore */
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      await loadSchema();
      const token = api.getToken();
      if (token) {
        try {
          const { user } = await api.me();
          if (alive) setUser(user);
        } catch {
          api.clearToken();
        }
      }
      if (alive) setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [loadSchema]);

  const login = useCallback(async (email: string, password: string) => {
    const { user } = await api.login(email, password);
    setUser(user);
    await loadSchema();
  }, [loadSchema]);

  const logout = useCallback(() => {
    api.clearToken();
    setUser(null);
  }, []);

  const collectionsBySlug = Object.fromEntries(collections.map((c) => [c.slug, c]));

  return (
    <Ctx.Provider
      value={{
        ready,
        user,
        collections,
        collectionsBySlug,
        configured: Boolean(api.API_BASE),
        login,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
