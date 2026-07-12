import { drivers as allDrivers, daysUntil } from "@/lib/mock-db";

export const drivers = allDrivers;
export const DRIVER_STATUSES = ["Available", "On Trip", "Off Duty", "Suspended"] as const;
export const LICENSE_CATEGORIES = Array.from(new Set(allDrivers.map((d) => d.licenseCategory)));

export function withExpiry() {
  return allDrivers.map((d) => ({ ...d, daysLeft: daysUntil(d.licenseExpiry) }));
}
