interface Product {
  name: string;
  quantity: number;
}

interface Props {
  products: Product[];
}

export function TopProducts({
  products,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#09090b]/70 p-6">
      <h3 className="mb-6 text-lg font-semibold">
        Top Selling Products
      </h3>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between"
          >
            <span>
              {product.name}
            </span>

            <span className="font-semibold">
              {product.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}