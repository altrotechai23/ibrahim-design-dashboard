"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAdmin } from "@/contexts/admin-context";
import { canAccessRoute } from "@/lib/permissions/permissions";


export function RoleGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  const { admin } = useAdmin();

  useEffect(() => {
    if (!admin) return;

    const allowed =
      canAccessRoute(
        admin.role,
        pathname
      );

    if (!allowed) {
      router.replace("/dashboard");
    }
  }, [
    admin,
    pathname,
    router,
  ]);

  if (!admin) {
    return null;
  }

  const allowed =
    canAccessRoute(
      admin.role,
      pathname
    );

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}