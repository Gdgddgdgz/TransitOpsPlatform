// Status -> tailwind color classes, shared across Fleet Manager pages
export const STATUS_BADGES: Record<string, string> = {
  Available: "bg-brand-lime/15 text-brand-lime border-brand-lime/30",
  "On Trip": "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  "In Shop": "bg-brand-amber/15 text-brand-amber border-brand-amber/30",
  Retired: "bg-muted text-muted-foreground border-border",
  "Off Duty": "bg-muted text-muted-foreground border-border",
  Suspended: "bg-destructive/15 text-destructive border-destructive/30",
  Draft: "bg-muted text-muted-foreground border-border",
  Dispatched: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  Completed: "bg-brand-lime/15 text-brand-lime border-brand-lime/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
  Open: "bg-brand-amber/15 text-brand-amber border-brand-amber/30",
  "In Progress": "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  Closed: "bg-brand-lime/15 text-brand-lime border-brand-lime/30",
};

export function badgeClass(status: string) {
  return STATUS_BADGES[status] ?? "bg-muted text-muted-foreground border-border";
}
