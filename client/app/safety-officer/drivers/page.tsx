import SafetyOfficerLayout from "@/features/safety-officer/shared/components/SafetyOfficerLayout";
import DriversView from "@/features/safety-officer/drivers/views/DriversView";

export default function Page() {
  return (
    <SafetyOfficerLayout>
      <DriversView />
    </SafetyOfficerLayout>
  );
}
