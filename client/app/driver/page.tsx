import DriverLayout from "@/features/driver/shared/components/DriverLayout";
import DashboardView from "@/features/driver/dashboard/views/DashboardView";

export default function Page() {
  return (
    <DriverLayout>
      <DashboardView />
    </DriverLayout>
  );
}
