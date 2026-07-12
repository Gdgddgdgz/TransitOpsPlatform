import { fuelLogs, maintenanceLogs, expenses, trips, vehicles, vehicleROI } from "@/lib/mock-db";

export function getFinancialStats() {
  const fuelCost = fuelLogs.reduce((s, f) => s + f.cost, 0);
  const maintenanceCost = maintenanceLogs.reduce((s, m) => s + m.cost, 0);
  const otherExpenses = expenses.filter((e) => e.category !== "Maintenance").reduce((s, e) => s + e.amount, 0);
  const totalRevenue = trips.filter((t) => t.status === "Completed").reduce((s, t) => s + t.revenue, 0);
  const totalOpCost = fuelCost + maintenanceCost + otherExpenses;
  const avgROI = vehicles.reduce((s, v) => s + vehicleROI(v.id), 0) / vehicles.length;

  return { fuelCost, maintenanceCost, otherExpenses, totalRevenue, totalOpCost, avgROI };
}

export function getCostBreakdown() {
  const fuelCost = fuelLogs.reduce((s, f) => s + f.cost, 0);
  const maintenanceCost = maintenanceLogs.reduce((s, m) => s + m.cost, 0);
  const tolls = expenses.filter((e) => e.category === "Toll").reduce((s, e) => s + e.amount, 0);
  const fines = expenses.filter((e) => e.category === "Fine").reduce((s, e) => s + e.amount, 0);
  const other = expenses.filter((e) => !["Toll", "Fine", "Maintenance"].includes(e.category)).reduce((s, e) => s + e.amount, 0);

  return [
    { label: "Fuel", value: fuelCost, color: "var(--color-brand-cyan)" },
    { label: "Maintenance", value: maintenanceCost, color: "var(--color-brand-amber)" },
    { label: "Tolls", value: tolls, color: "var(--color-brand-violet)" },
    { label: "Fines", value: fines, color: "var(--color-destructive)" },
    { label: "Other", value: other, color: "var(--color-brand-pink)" },
  ].filter((d) => d.value > 0);
}
