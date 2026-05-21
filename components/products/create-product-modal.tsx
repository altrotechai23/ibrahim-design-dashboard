"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { productSchema } from "@/lib/validations/product";

import { createProduct } from "@/actions/products/create-product";

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

type ProductFormValues = z.infer<
  typeof productSchema
>;

export function CreateProductModal() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const form =
    useForm<ProductFormValues>({
      resolver: zodResolver(
        productSchema
      ),

      defaultValues: {
        name: "",
        category: "",
        price: 0,
        stockQuantity: 0,
        sku: "",
        lowStockThreshold: 5,
      },
    });

  async function onSubmit(
    values: ProductFormValues
  ) {
    try {
      setLoading(true);

      const result =
        await createProduct(values);

      if (!result.success) {
        toast.error(
          result.error ||
            "Failed to create product"
        );

        return;
      }

      toast.success(
        "Product created successfully"
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
          + New Product
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          border border-white/10
          bg-[#09090b]/95
          backdrop-blur-2xl
          sm:max-w-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Create Product
          </DialogTitle>

          <DialogDescription>
            Add a new tailoring product.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="mt-6 space-y-6"
          >
            <div
              className="
                grid gap-6
                md:grid-cols-2
              "
            >
              {/* PRODUCT NAME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Classic Suit"
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

              {/* CATEGORY */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Tailoring"
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

              {/* PRICE */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={String(
                          field.value ?? ""
                        )}
                        onChange={(e) =>
                          field.onChange(
                            Number(
                              e.target.value
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

              {/* STOCK QUANTITY */}
              <FormField
                control={form.control}
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Stock Quantity
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={String(
                          field.value ?? ""
                        )}
                        onChange={(e) =>
                          field.onChange(
                            Number(
                              e.target.value
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

              {/* SKU */}
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      SKU
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="SUIT-001"
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

              {/* LOW STOCK THRESHOLD */}
              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Low Stock Alert
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5"
                        value={String(
                          field.value ?? ""
                        )}
                        onChange={(e) =>
                          field.onChange(
                            Number(
                              e.target.value
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
                ? "Creating..."
                : "Create Product"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}