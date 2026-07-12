"use client";

import { useMemo } from "react";
import { Download } from "lucide-react";
import { useReportMetrics } from "@/lib/backend-queries";
import ReportTable from "../components/ReportTable";

export default function ReportsView() {
  const { data: metrics } = useReportMetrics();

  const rows = useMemo(() => {
    const items = metrics?.vehicleMetrics ?? [];
    return items.map((item: any) => ({
      vehicle: {
        id: item.vehicleId,
        registrationNumber: item.registrationNumber,
        model: item.model,
      },
      distance: Number(item.totalDistance ?? 0),
      efficiency: Number(item.fuelEfficiency ?? 0),
      opCost: Number(item.totalOpCost ?? 0),
      revenue: Number(item.totalRevenue ?? 0),
      roi: Number(item.roi ?? 0),
    }));
  }, [metrics]);

  function handleExport() {
    const csv = rows.map((row: { vehicle: { registrationNumber: string }; distance: number; efficiency: number; opCost: number; revenue: number; roi: number }) => `${row.vehicle.registrationNumber},${row.distance},${row.efficiency},${row.opCost},${row.revenue},${row.roi}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transitops-financial-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalRevenue = rows.reduce((s: number, r: { revenue: number }) => s + r.revenue, 0);
  const totalCost = rows.reduce((s: number, r: { opCost: number }) => s + r.opCost, 0);
  const netProfit = totalRevenue - totalCost;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Net position: <span className={netProfit >= 0 ? "text-brand-lime font-medium" : "text-destructive font-medium"}>₹{netProfit.toLocaleString()}</span>{" "}
            (Revenue ₹{totalRevenue.toLocaleString()} − Cost ₹{totalCost.toLocaleString()})
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-secondary"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <ReportTable rows={rows} />
    </div>
  );
}
