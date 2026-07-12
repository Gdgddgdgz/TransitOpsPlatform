// Core domain types derived from the TransitOps ER model

export type VehicleStatus = "Available" | "On Trip" | "In Shop" | "Retired";
export type DriverStatus = "Available" | "On Trip" | "Off Duty" | "Suspended";
export type TripStatus = "Draft" | "Dispatched" | "Completed" | "Cancelled";
export type MaintenanceStatus = "Open" | "In Progress" | "Closed";
export type ExpenseCategory = "Toll" | "Maintenance" | "Parking" | "Fine" | "Other";
export type Role = "fleet-manager" | "driver" | "safety-officer" | "financial-analyst";

export interface Organization {
  id: string;
  name: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string;
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
  region: string;
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
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  tripId?: string;
  liters: number;
  cost: number;
  fuelDate: string;
}

export interface Expense {
  id: string;
  vehicleId: string;
  tripId?: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  expenseDate: string;
}
