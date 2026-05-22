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
  low_stock_threshold: number;
  sku: string | null;
  created_by: string | null;
}

interface Props {
  data: Product[];
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",

    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {row.original.name}
        </p>

        {row.original.stock_quantity <=
          row.original.low_stock_threshold && (
          <span
            className="
              mt-1 inline-flex
              rounded-full
              bg-red-500/10
              px-2 py-1
              text-xs
              text-red-400
            "
          >
            Low Stock
          </span>
        )}
      </div>
    ),
  },

  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "price",
    header: "Price",

    cell: ({ row }) => (
      <span className="font-medium">
        R{" "}
        {Number(
          row.original.price
        ).toFixed(2)}
      </span>
    ),
  },

  {
    accessorKey: "stock_quantity",
    header: "Stock",

    cell: ({ row }) => (
      <span
        className={
          row.original.stock_quantity <=
          row.original.low_stock_threshold
            ? "text-red-400 font-medium"
            : ""
        }
      >
        {row.original.stock_quantity}
      </span>
    ),
  },

  {
    accessorKey: "sku",
    header: "SKU",

    cell: ({ row }) => (
      <span>
        {row.original.sku || "-"}
      </span>
    ),
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

  if (!data.length) {
  return (
    <div
      className="
        flex h-[400px]
        items-center
        justify-center
        rounded-3xl
        border border-dashed
        border-white/10
      "
    >
      <div className="text-center">
        <p className="text-lg font-medium">
          No products yet
        </p>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          Create your first product.
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