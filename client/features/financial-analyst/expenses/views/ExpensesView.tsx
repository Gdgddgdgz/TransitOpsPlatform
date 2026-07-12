import { getExpenseRows, getExpenseTotals } from "../data/data";
import ExpenseTable from "../components/ExpenseTable";
import CategorySummary from "../components/CategorySummary";

export default function ExpensesView() {
  const rows = getExpenseRows();
  const totals = getExpenseTotals();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Expenses</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Total tracked expenses: <span className="text-foreground font-medium">₹{totals.total.toLocaleString()}</span>
        </p>
      </div>

      <CategorySummary byCategory={totals.byCategory} />
      <ExpenseTable rows={rows} />
    </div>
  );
}
