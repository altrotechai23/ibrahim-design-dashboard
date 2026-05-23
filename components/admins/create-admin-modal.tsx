"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createAdmin } from "@/actions/admins/create-admin";

import { toast } from "sonner";

export function CreateAdminModal() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [role, setRole] =
    useState("staff");

  const [loading, setLoading] =
    useState(false);

  async function handleCreate() {
    try {
      setLoading(true);

      const result =
        await createAdmin({
          name,
          phone_number:
            phoneNumber,
          role:
            role as
              | "owner"
              | "manager"
              | "staff",
        });

      if (!result.success) {
        toast.error(
          result.error
        );

        return;
      }

      toast.success(
        "Admin created"
      );

      setName("");
      setPhoneNumber("");
      setRole("staff");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          + New Admin
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Admin
          </DialogTitle>
        </DialogHeader>

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
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(
                e.target.value
              )
            }
          />

          <Select
            value={role}
            onValueChange={
              setRole
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="owner">
                Owner
              </SelectItem>

              <SelectItem value="manager">
                Manager
              </SelectItem>

              <SelectItem value="staff">
                Staff
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={
              handleCreate
            }
            disabled={
              loading
            }
            className="w-full"
          >
            {loading
              ? "Creating..."
              : "Create Admin"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}