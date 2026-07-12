import { VEHICLE_TYPES, VEHICLE_STATUSES, VEHICLE_REGIONS } from "../data/data";

interface Props {
  type: string;
  status: string;
  region: string;
  query: string;
  onTypeChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onRegionChange: (v: string) => void;
  onQueryChange: (v: string) => void;
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export default function VehicleFilters(props: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <input
        value={props.query}
        onChange={(e) => props.onQueryChange(e.target.value)}
        placeholder="Search registration or model..."
        className="flex-1 min-w-[200px] rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <Select value={props.type} onChange={props.onTypeChange} options={VEHICLE_TYPES} placeholder="All Types" />
      <Select value={props.status} onChange={props.onStatusChange} options={[...VEHICLE_STATUSES]} placeholder="All Statuses" />
      <Select value={props.region} onChange={props.onRegionChange} options={VEHICLE_REGIONS} placeholder="All Regions" />
    </div>
  );
}
