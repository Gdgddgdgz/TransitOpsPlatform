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
    a.download = "transitops-fleet-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Fuel efficiency, operational cost and ROI = (Revenue − (Maintenance + Fuel)) / Acquisition Cost
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
