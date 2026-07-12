import FleetManagerLayout from "@/features/fleet-manager/shared/components/FleetManagerLayout";
import DashboardView from "@/features/fleet-manager/dashboard/views/DashboardView";

export default function Page() {
  return (
    <FleetManagerLayout>
      <DashboardView />
    </FleetManagerLayout>
  );
}
