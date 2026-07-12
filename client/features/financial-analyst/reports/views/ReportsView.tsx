"use client";

import { Download } from "lucide-react";
import { getVehicleReportRows, toCsv } from "../data/data";
import ReportTable from "../components/ReportTable";

export default function ReportsView() {
  const rows = getVehicleReportRows();

  function handleExport() {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transitops-financial-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalRevenue = rows.reduce((s, r) => s + r.revenue, 0);
  const totalCost = rows.reduce((s, r) => s + r.opCost, 0);
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
