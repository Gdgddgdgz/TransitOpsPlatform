import { drivers, daysUntil } from "@/lib/mock-db";

export function getComplianceRows() {
  return drivers
    .map((d) => ({ ...d, daysLeft: daysUntil(d.licenseExpiry) }))
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

export function getComplianceSummary() {
  const rows = getComplianceRows();
  return {
    expired: rows.filter((r) => r.daysLeft < 0).length,
    critical: rows.filter((r) => r.daysLeft >= 0 && r.daysLeft <= 30).length,
    upcoming: rows.filter((r) => r.daysLeft > 30 && r.daysLeft <= 90).length,
    suspended: rows.filter((r) => r.status === "Suspended").length,
  };
}
