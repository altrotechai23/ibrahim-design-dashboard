"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Drawer } from "vaul";
import { Menu } from "lucide-react";

import { navigationLinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button
          className="
            rounded-2xl border border-white/10
            bg-white/5 p-3
            md:hidden
          "
        >
          <Menu size={18} />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

        <Drawer.Content
          className="
            fixed left-0 top-0 bottom-0 z-50
            w-72 bg-[#09090b]
            border-r border-white/10
            p-6
          "
        >
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              Ibrahim Design
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Admin Platform
            </p>
          </div>

          <nav className="space-y-2">
            {navigationLinks.map((link) => {
              const Icon = link.icon;

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    `
                    flex items-center gap-3
                    rounded-2xl px-4 py-3
                    text-sm font-medium transition
                    `,
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}