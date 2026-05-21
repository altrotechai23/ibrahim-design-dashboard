"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { createService } from "@/actions/services/create-service";

export function CreateServiceModal() {
  const [name, setName] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  async function handleCreate() {
    startTransition(async () => {
      try {
        await createService(name);

        setName("");
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="
            rounded-2xl
            bg-blue-600
            hover:bg-blue-500
          "
        >
          + New Service
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          border-white/10
          bg-[#09090b]
        "
      >
        <DialogHeader>
          <DialogTitle>
            Create Service
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Service name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              border-white/10
              bg-white/5
            "
          />

          <Button
            disabled={isPending}
            onClick={handleCreate}
            className="
              w-full rounded-2xl
              bg-blue-600
              hover:bg-blue-500
            "
          >
            {isPending
              ? "Creating..."
              : "Create Service"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}