"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

import { navigationLinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden md:flex
        w-72 flex-col
        border-r border-white/10
        bg-black/20
        backdrop-blur-2xl
      "
    >
      {/* LOGO */}
      <div className="border-b border-white/10 p-6">
        <h1 className="text-xl font-semibold tracking-tight">
          Ibrahim Design
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Tailoring ERP Platform
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2 p-4">
        {navigationLinks.map((link) => {
          const isActive = pathname === link.href;

          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                `
                relative flex items-center gap-3
                rounded-2xl px-4 py-3
                text-sm font-medium
                transition-all duration-300
                `,
                isActive
                  ? "text-white"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              {/* ACTIVE BACKGROUND */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="
                    absolute inset-0
                    rounded-2xl
                    bg-white/10
                    border border-white/10
                  "
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <div className="relative z-10 flex items-center gap-3">
                <Icon size={18} />
                {link.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-white/10 p-4">
        <button
          className="
            flex w-full items-center gap-3
            rounded-2xl px-4 py-3
            text-sm text-muted-foreground
            transition hover:bg-white/5 hover:text-white
          "
        >
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
}