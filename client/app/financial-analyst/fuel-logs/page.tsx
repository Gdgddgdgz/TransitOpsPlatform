import FinancialAnalystLayout from "@/features/financial-analyst/shared/components/FinancialAnalystLayout";
import FuelLogsView from "@/features/financial-analyst/fuel-logs/views/FuelLogsView";

export default function Page() {
  return (
    <FinancialAnalystLayout>
      <FuelLogsView />
    </FinancialAnalystLayout>
  );
}
