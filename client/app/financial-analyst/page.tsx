import FinancialAnalystLayout from "@/features/financial-analyst/shared/components/FinancialAnalystLayout";
import DashboardView from "@/features/financial-analyst/dashboard/views/DashboardView";

export default function Page() {
  return (
    <FinancialAnalystLayout>
      <DashboardView />
    </FinancialAnalystLayout>
  );
}
