"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Appointment } from "@/types/appointment";
import { StatusCell } from "@/components/appointments/status-cell";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";


interface Props {
  data: Appointment[];
}

const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "client_name",

    header: "Client",

    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {row.original.client_name}
        </p>

        <p className="text-xs text-muted-foreground">
          {row.original.phone}
        </p>
      </div>
    ),
  },

  {
  accessorKey: "service.name",
    header: "Service",
    cell: ({ row }) => (
      <span>
        {row.original.service?.name || "-"}
      </span>
    ),
  },

  {
    accessorKey: "fitting_date",

    header: "Fitting Date",

    cell: ({ row }) => (
      <span>
        {row.original.fitting_date}
      </span>
    ),
  },

  {
    accessorKey: "deposit",

    header: "Deposit",

    cell: ({ row }) => (
      <span>
        R {row.original.deposit}
      </span>
    ),
  },
  {
    accessorKey: "payment_method",

    header: "Payment Method",

    cell: ({ row }) => {
      const method =
        row.original.payment_method;

      return (
        <span
          className={`
            rounded-full px-3 py-1
            text-xs font-medium

            ${
              method === "cash"
                ? "bg-green-500/15 text-green-400"
                : "bg-blue-500/15 text-blue-400"
            }
          `}
        >
          {method === "cash"
            ? "Cash"
            : "Card"}
        </span>
      );
    },
  },

  {
    accessorKey: "due_balance",

    header: "Due Balance",

    cell: ({ row }) => (
      <span className="font-medium">
        R {row.original.due_balance}
      </span>
    ),
  },

  {
  accessorKey: "collection_status",

  header: "Status",

  cell: ({ row }) => (
    <StatusCell
      appointmentId={row.original.id}
      status={
        row.original.collection_status
      }
    />
  ),
},
];

export function AppointmentsTable({
  data,
}: Props) {

  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("appointments-realtime")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments",
        },
        () => {
          router.refresh();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);


  function getRowColor(
  status: string
) {
  switch (status) {
    case "pending":
      return `
        bg-white/[0.02]
        hover:bg-white/[0.04]
      `;

    case "ready_for_collection":
      return `
        bg-green-500/10
        hover:bg-green-500/20
      `;

    case "collected":
      return `
        bg-emerald-500/10
        hover:bg-emerald-500/20
      `;

    case "cancelled":
      return `
        bg-red-500/10
        hover:bg-red-500/20
      `;

    default:
      return `
        hover:bg-white/[0.03]
      `;
  }
}


  const table = useReactTable({
    data,
    columns,

    getCoreRowModel:
      getCoreRowModel(),
  });

  if (!data.length) {
    return (
      <div  className="flex h-400 items-center justify-center  rounded-3xl border  border-dashed border-white/10">
        <div className="text-center">
          <p className="text-lg font-medium">
            No appointments yet
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first appointment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden rounded-3xl
        border border-white/10
        bg-[#09090b]/70
        backdrop-blur-xl
      "
    >
      <Table>
        <TableHeader>
          {table
            .getHeaderGroups()
            .map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-white/10"
              >
                {headerGroup.headers.map(
                  (header) => (
                    <TableHead
                      key={header.id}
                    >
                      {flexRender(
                        header.column
                          .columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  )
                )}
              </TableRow>
            ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(
            (row) => (
              <TableRow
                  key={row.id}
                  className={`
                    border-white/5
                    transition-all
                    duration-300

                    ${getRowColor(
                      row.original.collection_status
                    )}
                  `}
                >
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <TableCell
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column
                          .columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}