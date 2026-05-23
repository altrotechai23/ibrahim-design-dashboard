"use server";

import { supabase } from "@/lib/supabase/client";
import { Appointment } from "@/types/appointment";

export async function getAppointments(): Promise<Appointment[]> {
  // GET APPOINTMENTS
  const {
    data: appointments,
    error: appointmentsError,
  } = await supabase
    .from("appointments")
    .select(`
      id,
      client_name,
      phone,
      email,
      fitting_date,
      collection_date,
      total_amount,
      deposit,
      due_balance,
      payment_method,
      collection_status,
      created_at,
      service_id,
      created_by
    `)
    .order("created_at", {
      ascending: false,
    });

  if (appointmentsError) {
    console.error(appointmentsError);
    return [];
  }

  // GET SERVICES
  const {
    data: services,
    error: servicesError,
  } = await supabase
    .from("services")
    .select(`
      id,
      name
    `);

  if (servicesError) {
    console.error(servicesError);
    return [];
  }

  // MERGE MANUALLY
  const normalizedAppointments: Appointment[] =
    appointments.map((appointment) => {
      const matchedService =
        services.find(
          (service) =>
            service.id ===
            appointment.service_id
        ) || null;

      return {
        ...appointment,
         payment_method:(appointment.payment_method ?? "cash") as "cash" | "card",
        service: matchedService,
      };
    });
    console.log(normalizedAppointments)
  return normalizedAppointments;
}