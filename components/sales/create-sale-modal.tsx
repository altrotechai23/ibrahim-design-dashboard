"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { saleSchema } from "@/lib/validations/sale";
import { createSale } from "@/actions/sales/create-sale";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SaleFormValues = z.infer<
  typeof saleSchema
>;

interface Product {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
}

interface Props {
  products: Product[];
}

export function CreateSaleModal({
  products,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(
      saleSchema
    ),

    defaultValues: {
      itemName: "",
      quantity: 1,
      unitPrice: 0,

      clientName: "",
      clientPhone: "",
      clientAddress: "",

      paymentStatus: "paid",

      paymentType: "card",

      createdBy: "Unknown",
    },
  });

  const selectedProduct = products.find((product) => product.name === form.watch("itemName"));

  const quantity = Number(form.watch("quantity") || 0);

  const unitPrice = Number(form.watch("unitPrice") || 0);

  const totalAmount = useMemo(() => {
    return quantity * unitPrice;
  }, [quantity, unitPrice]);

  async function onSubmit(
    values: SaleFormValues
  ) {
    try {
      setLoading(true);
      const result = await createSale(values);
      if (!result.success) {
        toast.error(
          result.error ||
            "Failed to create sale"
        );

        return;
      }

      toast.success(
        "Sale created successfully"
      );

      form.reset();

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="
            rounded-2xl
            bg-blue-600
            hover:bg-blue-500
          "
        >
          + New Sale
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          border-white/10
          bg-[#09090b]/95
          backdrop-blur-2xl
          sm:max-w-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Create Sale
          </DialogTitle>

          <DialogDescription>
            Create a new store sale.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="
              mt-6
              space-y-6
            "
          >
            <div
              className="
                grid gap-6
                md:grid-cols-2
              "
            >
              {/* PRODUCT */}
              {/* PRODUCT */}
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product
                    </FormLabel>

                    <Select
                      value={selectedProduct?.id || ""}
                      onValueChange={(productId) => {
                        const product = products.find(
                          (item) => item.id === productId
                        );

                        if (!product) return;

                        field.onChange(product.name);

                        form.setValue(
                          "unitPrice",
                          Number(product.price),
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="
                            border-white/10
                            bg-white/5
                          "
                        >
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent
                        className="
                          border-white/10
                          bg-[#09090b]
                        "
                      >
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id}
                          >
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* QUANTITY */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantity
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        value={String(
                          field.value ??
                            ""
                        )}
                        onChange={(
                          e
                        ) =>
                          field.onChange(
                            Number(
                              e.target
                                .value
                            )
                          )
                        }
                        className="
                          border-white/10
                          bg-white/5
                        "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* UNIT PRICE */}
              {/* UNIT PRICE */}
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Unit Price
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="Enter selling price"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            Number(e.target.value)
                          )
                        }
                        className="
                          border-white/10
                          bg-white/5
                        "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PAYMENT STATUS */}
              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Payment Status
                    </FormLabel>

                    <Select
                      value={
                        field.value
                      }
                      onValueChange={
                        field.onChange
                      }
                    >
                      <FormControl>
                        <SelectTrigger
                          className="
                            border-white/10
                            bg-white/5
                          "
                        >
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent
                        className="
                          border-white/10
                          bg-[#09090b]
                        "
                      >
                        <SelectItem value="paid">
                          Paid
                        </SelectItem>

                        <SelectItem value="pending">
                          Pending
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PAYMENT TYPE */}
              <FormField
  control={form.control}
  name="paymentType"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Payment Type
      </FormLabel>

      <Select
        value={field.value}
        onValueChange={field.onChange}
      >
        <FormControl>
          <SelectTrigger className=" border-white/10 bg-white/5">
            <SelectValue />
          </SelectTrigger>
        </FormControl>

        <SelectContent className=" border-white/10 bg-[#09090b]">
          <SelectItem value="cash">
            Cash
          </SelectItem>

          <SelectItem value="card">
            Card
          </SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>

              {/* CLIENT NAME */}
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Client Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="
                          border-white/10
                          bg-white/5
                        "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CLIENT PHONE */}
              <FormField
                control={form.control}
                name="clientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Client Phone
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="+27821234567"
                        {...field}
                        className="
                          border-white/10
                          bg-white/5
                        "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedProduct && (
              <div
                className="
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  p-4
                "
              >
                Available Stock:{" "}
                <span className="font-semibold">
                  {
                    selectedProduct.stock_quantity
                  }
                </span>
              </div>
            )}

            <FormField
              control={form.control}
              name="clientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Client Address
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Client address"
                      {...field}
                      className="
                        border-white/10
                        bg-white/5
                      "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-6
              "
            >
              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                Total Amount
              </p>

              <h2
                className="
                  mt-2
                  text-4xl
                  font-semibold
                "
              >
                R {totalAmount}
              </h2>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-2xl
                bg-blue-600
                hover:bg-blue-500
              "
            >
              {loading
                ? "Creating Sale..."
                : "Create Sale"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}