"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const pages = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    name: "Admins",
    href: "/dashboard/admins",
  },
  {
    name: "Audit Logs",
    href: "/dashboard/logs",
  },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && e.metaKey) ||
        (e.key === "k" && e.ctrlKey)
      ) {
        e.preventDefault();

        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () =>
      document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search anything..." />

      <CommandList>
        <CommandEmpty>
          No results found.
        </CommandEmpty>

        <CommandGroup heading="Navigation">
          {pages.map((page) => (
            <CommandItem
              key={page.href}
              value={page.name}
              onSelect={() => {
                router.push(page.href);

                setOpen(false);
              }}
            >
              {page.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}