import { DRIVER_STATUSES, LICENSE_CATEGORIES } from "../data/data";

interface Props {
  query: string;
  status: string;
  category: string;
  onQueryChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

export default function DriverFilters(props: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <input
        value={props.query}
        onChange={(e) => props.onQueryChange(e.target.value)}
        placeholder="Search by name or license number..."
        className="flex-1 min-w-[220px] rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <select
        value={props.status}
        onChange={(e) => props.onStatusChange(e.target.value)}
        className="rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">All Statuses</option>
        {DRIVER_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={props.category}
        onChange={(e) => props.onCategoryChange(e.target.value)}
        className="rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">All Categories</option>
        {LICENSE_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
