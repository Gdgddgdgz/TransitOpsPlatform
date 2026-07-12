import DriverLayout from "@/features/driver/shared/components/DriverLayout";
import TripsView from "@/features/driver/trips/views/TripsView";

export default function Page() {
  return (
    <DriverLayout>
      <TripsView />
    </DriverLayout>
  );
}
