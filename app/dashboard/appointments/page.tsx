
import { AppointmentsTable } from "@/components/tables/appointments-table";
import { CreateAppointmentModal } from "@/components/appointments/create-appointment-modal";
import { getAppointments } from "@/actions/appointments/get-appointments";
import { getServices } from "@/actions/services/get-services";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
    const appointments = await getAppointments();
    const services = await getServices();

  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-semibold tracking-tight">
                Appointments
            </h1>

            <p className="mt-2 text-muted-foreground">
                Manage tailoring fittings and collections.
            </p>
            </div>

            <CreateAppointmentModal services={services} />
        </div>

        <AppointmentsTable data={appointments}  />
    </div>
  );
}