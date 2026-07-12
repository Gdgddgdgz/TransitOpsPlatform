import FleetManagerLayout from "@/features/fleet-manager/shared/components/FleetManagerLayout";
import MaintenanceView from "@/features/fleet-manager/maintenance/views/MaintenanceView";

export default function Page() {
  return (
    <FleetManagerLayout>
      <MaintenanceView />
    </FleetManagerLayout>
  );
}
