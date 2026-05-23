"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { useAdmin } from "@/contexts/admin-context";

export function LogoutButton() {
  const router = useRouter();

  const { setAdmin } = useAdmin();

  function logout() {
    localStorage.removeItem("admin");

    setAdmin(null);

    router.replace("/login");
  }

  return (
    <button
      onClick={logout}
      className="
        flex w-full items-center gap-3
        rounded-2xl px-4 py-3
        text-sm text-muted-foreground
        transition-all duration-300
        hover:bg-red-500/10
        hover:text-red-400
      "
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}