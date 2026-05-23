import { ProtectedRoute } from "@/components/auth/protected-route";
import { CommandMenu } from "@/components/layout/command-menu";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { AdminProvider } from "@/contexts/admin-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
        <ProtectedRoute>
          <div className="flex min-h-screen bg-background">
          <Sidebar />

          <main className="flex-1 overflow-hidden">
            <Topbar />
            <CommandMenu />
            <div className="dashboard-padding">
              {children}
            </div>
          </main>
        </div>
       </ProtectedRoute>
      
    </AdminProvider>
  );
}