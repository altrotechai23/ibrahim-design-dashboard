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

import { Button } from "@/components/ui/button";
import { deleteAdmin } from "@/actions/admins/delete-admin";
import { toast } from "sonner";

interface Admin {
  id: string;
  name: string;
  phone_number: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface Props {
  data: Admin[];
}

function DeleteButton({
  id,
}: {
  id: string;
}) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this admin?"
    );

    if (!confirmed) return;

    const result =
      await deleteAdmin(id);

    if (!result.success) {
      toast.error(
        result.error ||
          "Failed to delete admin"
      );

      return;
    }

    toast.success(
      "Admin deleted"
    );
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}

const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },

  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "is_active",
    header: "Status",

    cell: ({ row }) =>
      row.original.is_active
        ? "Active"
        : "Inactive",
  },

  {
    accessorKey: "created_at",
    header: "Created",

    cell: ({ row }) =>
      new Date(
        row.original.created_at
      ).toLocaleDateString(),
  },

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => (
      <DeleteButton
        id={row.original.id}
      />
    ),
  },
];

export function AdminsTable({
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
            .map((group) => (
              <TableRow
                key={group.id}
              >
                {group.headers.map(
                  (header) => (
                    <TableHead
                      key={
                        header.id
                      }
                    >
                      {flexRender(
                        header.column
                          .columnDef
                          .header,
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
                      key={
                        cell.id
                      }
                    >
                      {flexRender(
                        cell.column
                          .columnDef
                          .cell,
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