import DriverLayout from "@/features/driver/shared/components/DriverLayout";
import FuelLogsView from "@/features/driver/fuel-logs/views/FuelLogsView";

export default function Page() {
  return (
    <DriverLayout>
      <FuelLogsView />
    </DriverLayout>
  );
}
