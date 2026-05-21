import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status:
    | "pending"
    | "ready_for_collection"
    | "collected"
    | "cancelled"
    | "active"
    | "suspended";
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    pending:
      "bg-zinc-500/15 text-zinc-300 border-zinc-500/20",

    ready_for_collection:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",

    collected:
      "bg-lime-500/15 text-lime-300 border-lime-500/20",

    cancelled:
      "bg-rose-500/15 text-rose-300 border-rose-500/20",

    active:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",

    suspended:
      "bg-rose-500/15 text-rose-300 border-rose-500/20",
  };

  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium capitalize",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}