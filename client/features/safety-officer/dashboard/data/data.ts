import { drivers, daysUntil } from "@/lib/mock-db";

export function getSafetyStats() {
  const total = drivers.length;
  const onDuty = drivers.filter((d) => d.status === "On Trip").length;
  const suspended = drivers.filter((d) => d.status === "Suspended").length;
  const expiringSoon = drivers.filter((d) => {
    const days = daysUntil(d.licenseExpiry);
    return days <= 30 && days >= 0;
  }).length;
  const expired = drivers.filter((d) => daysUntil(d.licenseExpiry) < 0).length;
  const avgSafetyScore = total === 0 ? 0 : Math.round(drivers.reduce((s, d) => s + d.safetyScore, 0) / total);
  return { total, onDuty, suspended, expiringSoon, expired, avgSafetyScore };
}

export function getExpiringLicenses() {
  return drivers
    .map((d) => ({ ...d, daysLeft: daysUntil(d.licenseExpiry) }))
    .filter((d) => d.daysLeft <= 45)
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

export function getLowestSafetyScores() {
  return [...drivers].sort((a, b) => a.safetyScore - b.safetyScore).slice(0, 5);
}
