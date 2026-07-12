import { Receipt } from "lucide-react";
import type { Expense, Vehicle } from "@/lib/types";

type Row = Expense & { vehicle?: Vehicle };

const CATEGORY_COLOR: Record<string, string> = {
  Toll: "text-brand-violet",
  Maintenance: "text-brand-amber",
  Parking: "text-brand-cyan",
  Fine: "text-destructive",
  Other: "text-brand-pink",
};

export default function ExpenseTable({ rows }: { rows: Row[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-2 font-medium">
                    <Receipt className="h-3.5 w-3.5 text-muted-foreground" /> {e.description}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{e.vehicle?.registrationNumber}</td>
                <td className="px-5 py-3.5">
                  <span className={`font-medium ${CATEGORY_COLOR[e.category] ?? ""}`}>{e.category}</span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{e.expenseDate}</td>
                <td className="px-5 py-3.5 font-medium">₹{e.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
