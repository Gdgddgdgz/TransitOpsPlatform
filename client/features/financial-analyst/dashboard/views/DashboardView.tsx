"use client";

import { IndianRupee, Fuel, Wrench, TrendingUp } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { getFinancialStats, getCostBreakdown } from "../data/data";
import CostBreakdown from "../components/CostBreakdown";
import RoiRanking from "../components/RoiRanking";

export default function DashboardView() {
  const stats = getFinancialStats();
  const breakdown = getCostBreakdown();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Financial Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Revenue, operational cost and fleet profitability.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={IndianRupee} accent="var(--color-brand-lime)" />
        <StatCard label="Fuel Cost" value={`₹${stats.fuelCost.toLocaleString()}`} icon={Fuel} accent="var(--color-brand-cyan)" />
        <StatCard label="Maintenance Cost" value={`₹${stats.maintenanceCost.toLocaleString()}`} icon={Wrench} accent="var(--color-brand-amber)" />
        <StatCard
          label="Avg Vehicle ROI"
          value={`${stats.avgROI.toFixed(1)}%`}
          icon={TrendingUp}
          accent="var(--color-brand-violet)"
          trend={stats.avgROI > 0 ? "Profitable" : "Loss"}
          trendDirection={stats.avgROI > 0 ? "up" : "down"}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <CostBreakdown data={breakdown} />
        <RoiRanking />
      </div>
    </div>
  );
}
