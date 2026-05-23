"use server";

import { revalidatePath } from "next/cache";

import { supabase } from "@/lib/supabase/client";
import { sendSMS } from "@/lib/twilio/send-sms";
import { useAdmin } from "@/contexts/admin-context";

interface CreateAppointmentInput {
  clientName: string;
  phone: string;
  email?: string;
  serviceId: string;
  fittingDate: string;
  collectionDate?: string;
  totalAmount: number;
  deposit: number;
  createdBy: string;

  paymentMethod: "cash" | "card";
}

export async function createAppointment(
  data: CreateAppointmentInput
) {
  try {
    const dueBalance =
      data.totalAmount - data.deposit;

    // CREATE APPOINTMENT
    const {
      data: appointment,
      error,
    } = await supabase.from("appointments").insert({
          client_name: data.clientName,
          phone: data.phone,
          email: data.email || null,
          service_id: data.serviceId,
          fitting_date: data.fittingDate,
          collection_date: data.collectionDate || null,
          total_amount: data.totalAmount,
          deposit: data.deposit,
          due_balance: dueBalance,
          payment_method: data.paymentMethod,
          created_by: data.createdBy
        })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const smsResult = await sendSMS({
      to:
        process.env
          .IBRAHIM_PHONE_NUMBER!,

      body: `
          New Appointment Created

          Client: ${data.clientName}

          Service: ${data.serviceId}

          Payment Method: ${data.paymentMethod}

          Deposit: R${data.deposit}

          Total: R${data.totalAmount}
          
          Added by : ${data.createdBy}
      `,
    });

    console.log(
      "Altrono message sent with status:"
    );

    console.log(smsResult.success);

    // AUDIT LOG
    await supabase
      .from("audit_logs")
      .insert({
        action: "CREATE",
        table_name: "appointments",
        record_id: appointment.id,

        description: `
Created appointment for ${data.clientName}
using ${data.paymentMethod}
        `,
      });

    revalidatePath(
      "/dashboard/appointments"
    );

    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Failed to create appointment",
    };
  }
}