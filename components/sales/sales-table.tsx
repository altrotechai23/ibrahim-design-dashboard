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

import { Sale } from "@/types/sale";

import { PaymentBadge } from "./payment-badge";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

interface Props {
  data: Sale[];
}

function getRowColor(
  status: string
) {
  switch (status) {
    case "paid":
      return `
        bg-emerald-500/[0.04]
        hover:bg-emerald-500/[0.08]
      `;

    case "pending":
      return `
        bg-orange-500/[0.04]
        hover:bg-orange-500/[0.08]
      `;

    default:
      return `
        hover:bg-white/[0.03]
      `;
  }
}

const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "item_name",

    header: "Item",

    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {row.original.item_name}
        </p>

        <p
          className="
            text-xs
            text-muted-foreground
          "
        >
          Qty:{" "}
          {row.original.quantity}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "client_name",

    header: "Client",

    cell: ({ row }) => (
      <div>
        <p>
          {row.original.client_name ||
            "-"}
        </p>

        <p
          className="
            text-xs
            text-muted-foreground
          "
        >
          {row.original.client_phone}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "unit_price",

    header: "Unit Price",

    cell: ({ row }) => (
      <span>
        R {row.original.unit_price}
      </span>
    ),
  },

  {
    accessorKey: "total_amount",

    header: "Total",

    cell: ({ row }) => (
      <span className="font-medium">
        R {row.original.total_amount}
      </span>
    ),
  },

  {
    accessorKey: "payment_status",

    header: "Payment Status",

    cell: ({ row }) => (
      <PaymentBadge
        status={
          row.original.payment_status
        }
      />
    ),
  },
  {
    accessorKey: "payment_type",

    header: "Payment Type",

    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.payment_type}
      </span>
    ),
  },

  {
    accessorKey: "created_at",

    header: "Created",

    cell: ({ row }) => (
      <span
        className="
          text-sm
          text-muted-foreground
        "
      >
        {new Date(
          row.original.created_at
        ).toLocaleDateString()}
      </span>
    ),
  },
];

export function SalesTable({
  data,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("sales-realtime")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sales",
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

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel:
      getCoreRowModel(),
  });

  if (!data.length) {
    return (
      <div
        className="
          flex h-100
          items-center
          justify-center

          rounded-3xl
          border border-dashed
          border-white/10
        "
      >
        <div className="text-center">
          <p
            className="
              text-lg font-medium text-white
            "
          >
            No sales yet for today
          </p>

          <p
            className="
              mt-2 text-sm
              text-muted-foreground
            "
          >
            Create your first sale.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl

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
                className="
                  border-white/10
                "
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
          {table
            .getRowModel()
            .rows.map((row) => (
              <TableRow
                key={row.id}
                className={`
                  border-white/5
                  transition-all
                  duration-300

                  ${getRowColor(
                    row.original
                      .payment_status
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
            ))}
        </TableBody>
      </Table>
    </div>
  );
}