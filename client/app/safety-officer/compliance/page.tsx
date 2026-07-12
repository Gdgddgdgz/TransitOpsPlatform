import SafetyOfficerLayout from "@/features/safety-officer/shared/components/SafetyOfficerLayout";
import ComplianceView from "@/features/safety-officer/compliance/views/ComplianceView";

export default function Page() {
  return (
    <SafetyOfficerLayout>
      <ComplianceView />
    </SafetyOfficerLayout>
  );
}
