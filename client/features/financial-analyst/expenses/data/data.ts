import { expenses, getVehicle } from "@/lib/mock-db";

export function getExpenseRows() {
  return expenses.map((e) => ({ ...e, vehicle: getVehicle(e.vehicleId) }));
}

export const EXPENSE_CATEGORIES = Array.from(new Set(expenses.map((e) => e.category)));

export function getExpenseTotals() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCategory = EXPENSE_CATEGORIES.map((c) => ({
    category: c,
    total: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0),
  }));
  return { total, byCategory };
}
