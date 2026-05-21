import { getProducts } from "@/actions/products/get-products";

import { ProductsTable } from "@/components/products/products-table";

import { CreateProductModal } from "@/components/products/create-product-modal";

export default async function ProductsPage() {
  const products =
    await getProducts();

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
              text-4xl font-bold
              tracking-tight
            "
          >
            Products
          </h1>

          <p className="text-muted-foreground">
            Manage tailoring inventory.
          </p>
        </div>

        <CreateProductModal />
      </div>

      <ProductsTable
        data={products}
      />
    </div>
  );
}