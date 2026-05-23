"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateAppointmentStatus } from "@/actions/appointments/update-appointment-status";

interface Props {
  appointmentId: string;

  status: string;
}

export function StatusCell({
  appointmentId,
  status,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  function getStatusColor(
    value: string
  ) {
    switch (value) {
      case "pending":
        return "bg-gray-500/20 text-gray-300";

      case "ready_for_collection":
        return "bg-green-600/20 text-green-400";

      case "collected":
        return "bg-emerald-500/20 text-emerald-300";

      case "cancelled":
        return "bg-red-500/20 text-red-300";

      default:
        return "";
    }
  }

  async function handleChange(
    value: string
  ) {
    startTransition(async () => {
      const result =
        await updateAppointmentStatus(
          appointmentId,
          value
        );

      if (!result.success) {
        toast.error(
          result.error ||
            "Failed to update status"
        );

        return;
      }

      toast.success(
        "Status updated"
      );
    });
  }

  return (
    <Select
      defaultValue={status}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger
        className={`
         
          border-0
          ${getStatusColor(status)}
        `}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent
        className="
          border-white/10
          bg-[#09090b]
        "
      >
        <SelectItem value="pending">
          Pending
        </SelectItem>

        <SelectItem value="ready_for_collection">
          Ready For Collection
        </SelectItem>

        <SelectItem value="collected">
          Collected
        </SelectItem>

        <SelectItem value="cancelled">
          Cancelled
        </SelectItem>
      </SelectContent>
    </Select>
  );
}