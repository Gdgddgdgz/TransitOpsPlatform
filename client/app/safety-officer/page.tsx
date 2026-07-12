import SafetyOfficerLayout from "@/features/safety-officer/shared/components/SafetyOfficerLayout";
import DashboardView from "@/features/safety-officer/dashboard/views/DashboardView";

export default function Page() {
  return (
    <SafetyOfficerLayout>
      <DashboardView />
    </SafetyOfficerLayout>
  );
}
