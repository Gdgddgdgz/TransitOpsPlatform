// Core domain types derived from the TransitOps schema

export type VehicleStatus = "Available" | "On Trip" | "In Shop" | "Retired";
export type DriverStatus = "Available" | "On Trip" | "Off Duty" | "Suspended";
export type TripStatus = "Draft" | "Dispatched" | "Completed" | "Cancelled";
// Schema only has OPEN | CLOSED — "In Progress" does not exist
export type MaintenanceStatus = "Open" | "Closed";
// Schema: TOLL | REPAIR | INSURANCE | OTHER
export type ExpenseCategory = "Toll" | "Repair" | "Insurance" | "Other" | "Maintenance" | "Parking" | "Fine";
export type Role = "FLEET_MANAGER" | "DISPATCHER" | "DRIVER" | "SAFETY_OFFICER" | "FINANCIAL_ANALYST" | "ADMIN";

export interface Organization {
  id: string;
  clerkOrgId: string;
  name: string;
}

export interface AppUser {
  id: string;
  clerkUserId?: string;
  organizationId?: string;
  name: string;
  email: string;
  role: Role;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  avatarColor?: string;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
  type: string;
  maxLoadCapacity: number; // kg
  odometer: number; // km
  acquisitionCost: number;
  status: VehicleStatus;
  region?: string;
}

export interface VehicleMetric extends Vehicle {
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalRevenue: number;
  totalOpCost: number;
  roi: number;
}

export interface FinancialDashboard {
  trips: Trip[];
  vehicleMetrics: VehicleMetric[];
  totals: {
    totalRevenue: number;
    totalFuelCost: number;
    totalMaintenanceCost: number;
    avgROI: number;
  };
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiry: string; // ISO date
  contactNumber: string;
  safetyScore: number; // 0-100
  status: DriverStatus;
}

export interface Trip {
  id: string;
  tripNumber: string;
  vehicleId: string;
  driverId: string;
  source: string;
  destination: string;
  cargoWeight: number;
  plannedDistance: number;
  actualDistance?: number;
  startOdometer?: number;
  endOdometer?: number;
  revenue: number;
  status: TripStatus;
  plannedStart: string;
  plannedEnd: string;
  dispatchedAt?: string;
  completedAt?: string;
  vehicle?: { id: string; registrationNumber: string; model: string; type: string };
  driver?: { id: string; name: string };
}

export interface MaintenanceLog {
  id: string;
  vehicleId: string;
  title: string;
  description: string;
  cost: number;
  status: MaintenanceStatus;
  openedAt: string;
  closedAt?: string;
  vehicle?: { id: string; registrationNumber: string; model: string; type: string };
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  tripId?: string;
  liters: number;
  cost: number;
  fuelDate: string;
  vehicle?: { id: string; registrationNumber: string };
}

export interface Expense {
  id: string;
  vehicleId?: string;
  tripId?: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  expenseDate: string;
  vehicle?: { id: string; registrationNumber: string };
}
