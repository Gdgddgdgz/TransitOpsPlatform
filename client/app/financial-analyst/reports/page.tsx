import FinancialAnalystLayout from "@/features/financial-analyst/shared/components/FinancialAnalystLayout";
import ReportsView from "@/features/financial-analyst/reports/views/ReportsView";

export default function Page() {
  return (
    <FinancialAnalystLayout>
      <ReportsView />
    </FinancialAnalystLayout>
  );
}
