"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { AdminProvider, useAdmin } from "./provider";
import { AdminShell } from "./Shell";
import { Spinner } from "./ui";

function FullSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">
      <Spinner className="size-6" />
    </div>
  );
}

function Gate({ children }: { children: React.ReactNode }) {
  const { ready, user } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!ready) return;
    if (!user && !isLogin) router.replace("/admin/login");
    if (user && isLogin) router.replace("/admin");
  }, [ready, user, isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (!ready || !user) return <FullSpinner />;
  return <AdminShell>{children}</AdminShell>;
}

export function AdminGate({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <Gate>{children}</Gate>
      <Toaster position="top-right" richColors />
    </AdminProvider>
  );
}
