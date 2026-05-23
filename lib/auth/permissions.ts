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

export function canAccessRoute(role: Role,path: string) {
  return permissions[role].filter(
      (allowedPath) =>
        allowedPath !== "/dashboard"
    )
    .some(
      (allowedPath) =>
        path === allowedPath ||
        path.startsWith(
          `${allowedPath}/`
        )
    );
}