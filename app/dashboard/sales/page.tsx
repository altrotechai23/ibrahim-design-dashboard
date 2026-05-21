import { CreateSaleModal } from "@/components/sales/create-sale-modal";

import { SalesTable } from "@/components/sales/sales-table";

import { getSales } from "@/actions/sales/get-sales";
import { getProducts } from "@/actions/products/get-products";

export default async function SalesPage() {
  const sales = await getSales();
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div
        className="
          flex items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl font-semibold
            "
          >
            Sales
          </h1>

          <p
            className="
              mt-2 text-muted-foreground
            "
          >
            Manage shop sales
          </p>
        </div>

        <CreateSaleModal products={products} />
      </div>

      <SalesTable data={sales} />
    </div>
  );
}