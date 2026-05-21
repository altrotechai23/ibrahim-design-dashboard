"use server";

import { supabase } from "@/lib/supabase/client";

import { DashboardStats } from "@/types/dashboard";

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data, error } =
    await supabase
      .from("appointments")
      .select("*");

  if (error || !data) {
    console.error(error);

    return {
      totalAppointments: 0,
      pendingCollection: 0,
      readyForCollection: 0,
      revenueThisMonth: 0,
      outstandingBalance: 0,
      collectionRate: 0,
    };
  }

  const totalAppointments =
    data.length;

  const pendingCollection =
    data.filter(
      (a) =>
        a.collection_status ===
        "pending"
    ).length;

  const readyForCollection =
    data.filter(
      (a) =>
        a.collection_status ===
        "ready_for_collection"
    ).length;

  const revenueThisMonth =
    data.reduce(
      (acc, item) =>
        acc + Number(item.deposit || 0),
      0
    );

  const outstandingBalance =
    data.reduce(
      (acc, item) =>
        acc +
        Number(item.due_balance || 0),
      0
    );

  const collectedCount =
    data.filter(
      (a) =>
        a.collection_status ===
        "collected"
    ).length;

  const collectionRate =
    totalAppointments > 0
      ? Math.round(
          (collectedCount /
            totalAppointments) *
            100
        )
      : 0;

  return {
    totalAppointments,
    pendingCollection,
    readyForCollection,
    revenueThisMonth,
    outstandingBalance,
    collectionRate,
  };
}