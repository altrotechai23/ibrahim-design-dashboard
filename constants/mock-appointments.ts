import { Appointment } from "@/types/appointment";

export const appointments: Appointment[] = [
  {
    id: "APT-001",
    clientName: "Amahle Dlamini",
    phone: "+27821234567",
    service: "African Dress",
    fittingDate: "2026-05-20",
    deposit: 1200,
    dueBalance: 800,
    status: "ready",
  },
  {
    id: "APT-002",
    clientName: "Sipho Nkosi",
    phone: "+27831234567",
    service: "Suit Alteration",
    fittingDate: "2026-05-22",
    deposit: 500,
    dueBalance: 350,
    status: "pending",
  },
  {
    id: "APT-003",
    clientName: "Fatima Hassan",
    phone: "+27791234567",
    service: "Evening Gown",
    fittingDate: "2026-05-25",
    deposit: 2400,
    dueBalance: 1200,
    status: "collected",
  },
];