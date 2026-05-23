import { getAdmins } from "@/actions/admins/get-admins";

import { AdminsTable } from "@/components/admins/admins-table";

import { CreateAdminModal } from "@/components/admins/create-admin-modal";

export default async function AdminsPage() {
  const admins =
    await getAdmins();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Admins
          </h1>

          <p className="text-muted-foreground">
            Manage system users
          </p>
        </div>

        <CreateAdminModal />
      </div>

      <AdminsTable
        data={admins}
      />
    </div>
  );
}