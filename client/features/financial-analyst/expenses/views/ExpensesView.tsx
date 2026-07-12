"use client";

import { useMemo } from "react";
import { useExpenses } from "@/lib/backend-queries";
import ExpenseTable from "../components/ExpenseTable";
import CategorySummary from "../components/CategorySummary";

export default function ExpensesView() {
  const { data: rows = [] } = useExpenses();
  const totals = useMemo(() => {
    const total = rows.reduce((sum, row) => sum + row.amount, 0);
    const byCategory = Array.from(new Set(rows.map((row) => row.category))).map((category) => ({
      category,
      total: rows.filter((row) => row.category === category).reduce((sum, row) => sum + row.amount, 0),
    }));
    return { total, byCategory };
  }, [rows]);

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
