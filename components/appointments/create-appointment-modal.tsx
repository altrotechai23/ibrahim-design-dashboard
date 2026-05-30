"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
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

import { appointmentSchema } from "@/lib/validations/appointment";



import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/actions/appointments/create-appointment";
import { useAdmin } from "@/contexts/admin-context";

type AppointmentFormValues = z.infer<
  typeof appointmentSchema
>;

interface Props {
  services: {
    id: string;
    name: string;
  }[];
}

export function CreateAppointmentModal({ services,}: Props) {
  const router = useRouter();
  const { admin } = useAdmin();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(appointmentSchema),

    defaultValues: {
      clientName: "",
      email: "",
      phone: "",
      serviceId: "",
      fittingDate: "",
      deposit: 0,
      totalAmount: 0,
      paymentMethod: "cash",
      collectionDate: "",
      createdBy: admin?.id
    },
  });

  const deposit = Number(form.watch("deposit") || 0);

  const totalAmount = Number(form.watch("totalAmount") || 0);

  const dueBalance = useMemo(() => {
    return totalAmount - deposit;
  }, [deposit, totalAmount]);

  async function onSubmit(
    values: AppointmentFormValues
  ) {
    try {
      setLoading(true);

      const result =
        await createAppointment(values);

      if (!result.success) {
        toast.error(
          result.error ||
            "Something went wrong"
        );

        return;
      }

      toast.success(
        "Appointment created successfully"
      );

      form.reset();

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to create appointment"
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
            rounded-2xl bg-blue-600
            hover:bg-blue-500
          "
        >
          + New Appointment
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
            Create Appointment
          </DialogTitle>
          <DialogDescription>
            Create a new fitting appointment
            for a client.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
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

              {/* PHONE */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="+12025550123"
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

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="client@email.com"
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

              {/* SERVICE */}
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Service Type
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="
                            border-white/10
                            bg-white/5
                          "
                        >
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent
                        className="
                          border-white/10
                          bg-[#09090b]
                        "
                      >
                        {services.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={service.id}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* FITTING DATE */}
              <FormField
                control={form.control}
                name="fittingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Fitting Date
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="date"
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
              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Total Amount
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        value={String(field.value ?? "")}
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

              {/* DEPOSIT */}
              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Deposit
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        value={String(field.value ?? "")}
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
              {/* PAYMENT METHOD */}
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Payment Method
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="
                            border-white/10
                            bg-white/5
                          "
                        >
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent
                        className="
                          border-white/10
                          bg-[#09090b]
                        "
                      >
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

              {/* DUE BALANCE */}
              <div>
                <p className="mb-2 text-sm font-medium">
                  Due Balance
                </p>

                <div
                  className="
                    flex h-10 items-center rounded-md
                    border border-white/10
                    bg-white/5 px-3
                    text-sm
                  "
                >
                  R {dueBalance}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="
                w-full rounded-2xl
                bg-blue-600 hover:bg-blue-500
              "
            >
              {loading
                ? "Creating Appointment..."
                : "Create Appointment"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}