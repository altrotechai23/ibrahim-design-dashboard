"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem(
      "admin"
    );

    router.push("/login");
  }

  return (
    <Button
      variant="outline"
      onClick={logout}
    >
      Logout
    </Button>
  );
}