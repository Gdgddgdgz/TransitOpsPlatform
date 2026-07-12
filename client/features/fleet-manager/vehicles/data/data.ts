import { vehicles as allVehicles } from "@/lib/mock-db";
import type { Vehicle } from "@/lib/types";

export type { Vehicle };
export const vehicles = allVehicles;

export const VEHICLE_TYPES = Array.from(new Set(allVehicles.map((v) => v.type)));
export const VEHICLE_STATUSES = ["Available", "On Trip", "In Shop", "Retired"] as const;
export const VEHICLE_REGIONS = Array.from(new Set(allVehicles.map((v) => v.region)));
