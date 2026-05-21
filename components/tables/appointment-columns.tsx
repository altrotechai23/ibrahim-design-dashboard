"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Appointment } from "@/types/appointment";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => {
        return (
            <button
            onClick={() =>
                column.toggleSorting(
                column.getIsSorted() === "asc"
                )
            }
            className="flex items-center gap-2"
            >
            Client

            <ArrowUpDown size={14} />
            </button>
        );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "fittingDate",
    header: ({ column }) => {
        return (
            <button
            onClick={() =>
                column.toggleSorting(
                column.getIsSorted() === "asc"
                )
            }
            className="flex items-center gap-2"
            >
            Fitting Date

            <ArrowUpDown size={14} />
            </button>
        );
    },
  },
  {
    accessorKey: "deposit",
    header: "Deposit",
    cell: ({ row }) => {
      return `R ${row.original.deposit}`;
    },
  },
  {
    accessorKey: "dueBalance",
    header: "Due",
    cell: ({ row }) => {
      return `R ${row.original.due_balance}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <StatusBadge
          status={row.original.collection_status}
        />
      );
    },
  },
  {
  id: "actions",

  cell: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
              rounded-xl border border-white/10
              bg-white/5 p-2
              transition hover:bg-white/10
            "
          >
            <MoreHorizontal size={16} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="
            border-white/10 bg-[#09090b]
            text-white
          "
        >
          <DropdownMenuItem>
            Edit Appointment
          </DropdownMenuItem>

          <DropdownMenuItem>
            Update Status
          </DropdownMenuItem>

          <DropdownMenuItem className="text-rose-400">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
},
];