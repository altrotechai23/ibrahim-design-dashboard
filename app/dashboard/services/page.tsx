import { CreateServiceModal } from "@/components/services/create-service-modal";

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">
          Services
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage tailoring services
        </p>
      </div>
      <CreateServiceModal />
    </div>
  );
}