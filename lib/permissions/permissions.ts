import { AdminRole } from "@/constants/navigation";

export const rolePermissions = {
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

export function canAccessRoute(
  role: AdminRole,
  pathname: string
) {
  // dashboard home is always allowed
  if (pathname === "/dashboard") {
    return true;
  }

  const allowedRoutes =
    rolePermissions[role].filter(
      (route) => route !== "/dashboard"
    );

  return allowedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );
}