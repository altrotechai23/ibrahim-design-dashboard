"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon?: React.ReactNode;
}

export function KpiCard({
  title,
  value,
  change,
  positive = true,
  icon,
}: KpiCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        glass-card rounded-3xl p-6
        relative overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0 opacity-30
          bg-gradient-to-br from-blue-500/10 to-purple-500/5
          pointer-events-none
        "
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p
              className="
                text-sm uppercase tracking-widest
                text-muted-foreground
              "
            >
              {title}
            </p>

            <h3 className="mt-4 text-4xl font-semibold tracking-tight">
              {value}
            </h3>
          </div>

          {icon && (
            <div
              className="
                rounded-2xl bg-white/5 p-3
                border border-white/10
              "
            >
              {icon}
            </div>
          )}
        </div>

        <div
          className={cn(
            "mt-6 flex items-center gap-2 text-sm font-medium",
            positive
              ? "text-emerald-400"
              : "text-rose-400"
          )}
        >
          {positive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          <span>{change}</span>
        </div>
      </div>
    </motion.div>
  );
}