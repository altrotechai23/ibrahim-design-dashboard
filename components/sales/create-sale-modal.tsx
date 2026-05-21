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

export function CreateSaleModal() {
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
    },
  });

  const quantity = Number(
    form.watch("quantity") || 0
  );

  const unitPrice = Number(
    form.watch("unitPrice") || 0
  );

  const totalAmount = useMemo(() => {
    return quantity * unitPrice;
  }, [quantity, unitPrice]);

  async function onSubmit(
    values: SaleFormValues
  ) {
    try {
      setLoading(true);

      const result =
        await createSale(values);

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
              mt-6 space-y-6
            "
          >
            <div
              className="
                grid gap-6
                md:grid-cols-2
              "
            >
              {/* ITEM NAME */}
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Item Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Suit"
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
                      onValueChange={
                        field.onChange
                      }
                      defaultValue={
                        field.value
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
                        placeholder="Optional"
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

            {/* CLIENT ADDRESS */}
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
                      placeholder="Optional"
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

            {/* TOTAL */}
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
                  mt-2 text-4xl
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
                w-full rounded-2xl
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