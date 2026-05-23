"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
          }),
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        alert(
          "Invalid credentials"
        );
        return;
      }

      localStorage.setItem(
        "admin",
        JSON.stringify(result.admin)
      );

      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        bg-black
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-3xl
          border border-white/10
          bg-[#09090b]
          p-8
        "
      >
        <h1 className="mb-6 text-3xl font-bold">
          Admin Login
        </h1>

        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
          />

          <Button
            className="w-full"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}