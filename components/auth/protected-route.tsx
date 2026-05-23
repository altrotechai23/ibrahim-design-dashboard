"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAdmin } from "@/contexts/admin-context";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { admin, setAdmin } =
    useAdmin();

  useEffect(() => {
    const stored =
      localStorage.getItem("admin");

    if (stored) {
      setAdmin(JSON.parse(stored));
    } else {
      router.replace("/login");
    }
  }, [router, setAdmin]);

  if (!admin) {
    return null;
  }

  return <>{children}</>;
}