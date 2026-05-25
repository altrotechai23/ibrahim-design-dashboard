"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { AuditLog } from "@/types/audit-log";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: AuditLog[];
}

const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "action",
    header: "Action",
  },

  {
    accessorKey: "table_name",
    header: "Table",
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "admin_name",
    header: "Admin",

    cell: ({ row }) => (
      <div>
        <p>
          {row.original.admin_name ||
            "System"}
        </p>

        <p className="text-xs text-muted-foreground">
          {row.original.admin_role}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "Date",

    cell: ({ row }) =>
      new Date(
        row.original.created_at
      ).toLocaleString(),
  },
];

export function AuditLogsTable({
  data,
}: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:
      getCoreRowModel(),
  });

  return (
    <div
      className="
        overflow-hidden rounded-3xl
        border border-white/10
        bg-[#09090b]/70
      "
    >
      <Table>
        <TableHeader>
          {table
            .getHeaderGroups()
            .map((group) => (
              <TableRow
                key={group.id}
              >
                {group.headers.map(
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