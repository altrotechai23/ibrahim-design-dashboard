import { StatusBadge } from "./status-badge";

const appointments = [
  {
    client: "Amahle Dlamini",
    service: "Alteration",
    phone: "+27821234567",
    amount: "R 1,200",
    status: "ready",
  },
  {
    client: "Sipho Nkosi",
    service: "Custom Suit",
    phone: "+27831234567",
    amount: "R 4,500",
    status: "pending",
  },
  {
    client: "Fatima Hassan",
    service: "Evening Gown",
    phone: "+27791234567",
    amount: "R 2,800",
    status: "collected",
  },
] as const;

export function RecentAppointments() {
  return (
    <div className="space-y-5">
      {appointments.map((appointment) => (
        <div
          key={appointment.client}
          className="
            flex items-start justify-between
            border-b border-white/5 pb-4
          "
        >
          <div>
            <h4 className="font-medium">
              {appointment.client}
            </h4>

            <p className="text-sm text-muted-foreground">
              {appointment.service}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {appointment.phone}
            </p>
          </div>

          <div className="text-right">
            {/* <StatusBadge status={appointment.status} /> */}

            <p className="mt-3 font-semibold">
              {appointment.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}