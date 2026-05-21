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

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  sku: string | null;
}

interface Props {
  data: Product[];
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },

  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "price",
    header: "Price",

    cell: ({ row }) => (
      <span>
        R {row.original.price}
      </span>
    ),
  },

  {
    accessorKey: "stock_quantity",
    header: "Stock",
  },

  {
    accessorKey: "sku",
    header: "SKU",
  },
];

export function ProductsTable({
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
        backdrop-blur-xl
      "
    >
      <Table>
        <TableHeader>
          {table
            .getHeaderGroups()
            .map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
              <TableRow key={row.id}>
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