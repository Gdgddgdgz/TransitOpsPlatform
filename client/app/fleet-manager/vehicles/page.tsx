import FleetManagerLayout from "@/features/fleet-manager/shared/components/FleetManagerLayout";
import VehiclesView from "@/features/fleet-manager/vehicles/views/VehiclesView";

export default function Page() {
  return (
    <FleetManagerLayout>
      <VehiclesView />
    </FleetManagerLayout>
  );
}
