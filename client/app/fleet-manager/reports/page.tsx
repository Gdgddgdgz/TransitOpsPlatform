import FleetManagerLayout from "@/features/fleet-manager/shared/components/FleetManagerLayout";
import ReportsView from "@/features/fleet-manager/reports/views/ReportsView";

export default function Page() {
  return (
    <FleetManagerLayout>
      <ReportsView />
    </FleetManagerLayout>
  );
}
