export type Role =
  | "owner"
  | "manager"
  | "staff";

export const permissions = {
  owner: [
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/sales",
    "/dashboard/products",
    "/dashboard/analytics",
    "/dashboard/admins",
    "/dashboard/logs",
  ],

  manager: [
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/sales",
  ],

  staff: [
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/sales",
  ],
};

export function canAccess(
  role: Role,
  path: string
) {
  return permissions[role].includes(
    path
  );
}