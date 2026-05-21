"use server";

import { supabase } from "@/lib/supabase/client";
import { sendSMS } from "@/lib/twilio/send-sms";

interface CreateAppointmentInput {
  clientName: string;
  phone: string;
  email?: string;
  serviceId: string;
  fittingDate: string;
  collectionDate?: string;
  totalAmount: number;
  deposit: number;
}

export async function createAppointment(
  data: CreateAppointmentInput
) {
  try {
    const dueBalance =
      data.totalAmount - data.deposit;

   

    // CREATE APPOINTMENT
    const { data: appointment, error } =
      await supabase.from("appointments").insert({
          client_name: data.clientName,
          phone: data.phone,
          email: data.email || null,
          service_id: data.serviceId,
          fitting_date: data.fittingDate,
          collection_date: data.collectionDate || null,
          total_amount: data.totalAmount,
          deposit: data.deposit,
          due_balance: dueBalance,
        })
        .select()
        .single();

    if (error) {
      throw error;
    }
    
    const accountSid = await sendSMS({
        to:
            process.env.IBRAHIM_PHONE_NUMBER!,

        body: `
        New Appointment Created

        Client: ${data.clientName}

        Service: ${data.serviceId}

        Deposit: R${data.deposit}

        Total: R${data.totalAmount}
        `,
    });

    console.log('Altrono message sent with status : ');

    console.log(accountSid.success);
    // CREATE LOG
    await supabase
      .from("audit_logs")
      .insert({
        action: "CREATE",
        table_name: "appointments",
        record_id: appointment.id,
        description: `Created appointment for ${data.clientName}`,
      });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to create appointment",
    };
  }
}