"use client";

import { Bell, Search } from "lucide-react";
import { MobileSidebar } from "../dashboard/mobile-sidebar";
import { openCommandMenu } from "@/lib/command";
import { useAdmin } from "@/contexts/admin-context";

export function Topbar() {
  const { admin } = useAdmin();

  const initials =
    admin?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-white/10
        bg-background/70
        backdrop-blur-2xl
      "
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <MobileSidebar />

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Dashboard
            </h2>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <button
            onClick={openCommandMenu}
            className="
              hidden md:flex items-center gap-3
              rounded-2xl border border-white/10
              bg-white/5 px-4 py-2
              text-sm text-muted-foreground
              transition hover:bg-white/10
            "
          >
            <Search size={16} />

            Search clients, orders...

            <span
              className="
                rounded-md border border-white/10
                bg-white/5 px-2 py-0.5
                text-xs
              "
            >
              ⌘K
            </span>
          </button>

          {/* NOTIFICATIONS */}
          <button
            className="
              rounded-2xl border border-white/10
              bg-white/5 p-3
              transition hover:bg-white/10
            "
          >
            <Bell size={18} />
          </button>

          {/* USER */}
          <div
            className="
              flex items-center gap-3
              rounded-2xl border border-white/10
              bg-white/5 px-3 py-2
            "
          >
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full bg-blue-500/20
                text-sm font-semibold text-blue-300
              "
            >
              {initials}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium">
                {admin?.name || "Unknown User"}
              </p>

              <p className="text-xs text-muted-foreground capitalize">
                {admin?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}