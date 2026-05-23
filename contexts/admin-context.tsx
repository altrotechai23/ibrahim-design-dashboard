"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

export interface Admin {
  id: string;
  name: string;
  phone_number: string;
  role: "owner" | "manager" | "staff";
}

interface AdminContextType {
  admin: Admin | null;
  setAdmin: (
    admin: Admin | null
  ) => void;
}

const AdminContext =
  createContext<AdminContextType>({
    admin: null,
    setAdmin: () => {},
  });

export function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [admin, setAdmin] =
    useState<Admin | null>(null);

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}