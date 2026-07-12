import FinancialAnalystLayout from "@/features/financial-analyst/shared/components/FinancialAnalystLayout";
import ExpensesView from "@/features/financial-analyst/expenses/views/ExpensesView";

export default function Page() {
  return (
    <FinancialAnalystLayout>
      <ExpensesView />
    </FinancialAnalystLayout>
  );
}
