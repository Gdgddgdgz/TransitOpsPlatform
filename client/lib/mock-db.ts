import type {
  Vehicle,
  Driver,
  Trip,
  MaintenanceLog,
  FuelLog,
  Expense,
} from "./types";

export const vehicles: Vehicle[] = [
  { id: "v1", registrationNumber: "MH-12-AB-4521", model: "Tata Van-05", type: "Van", maxLoadCapacity: 500, odometer: 48210, acquisitionCost: 1250000, status: "On Trip", region: "West" },
  { id: "v2", registrationNumber: "MH-14-CD-7788", model: "Ashok Leyland Dost", type: "Mini Truck", maxLoadCapacity: 1500, odometer: 91234, acquisitionCost: 1850000, status: "Available", region: "West" },
  { id: "v3", registrationNumber: "KA-05-EF-1190", model: "Eicher Pro 2049", type: "Truck", maxLoadCapacity: 4900, odometer: 132400, acquisitionCost: 3200000, status: "In Shop", region: "South" },
  { id: "v4", registrationNumber: "DL-03-GH-3342", model: "Mahindra Bolero Pik-Up", type: "Pickup", maxLoadCapacity: 900, odometer: 22110, acquisitionCost: 980000, status: "Available", region: "North" },
  { id: "v5", registrationNumber: "TN-09-IJ-9021", model: "Tata Ace Gold", type: "Mini Truck", maxLoadCapacity: 750, odometer: 65500, acquisitionCost: 750000, status: "On Trip", region: "South" },
  { id: "v6", registrationNumber: "GJ-01-KL-5567", model: "Force Traveller", type: "Van", maxLoadCapacity: 1200, odometer: 108900, acquisitionCost: 1650000, status: "Retired", region: "West" },
  { id: "v7", registrationNumber: "UP-32-MN-6634", model: "Eicher Pro 3015", type: "Truck", maxLoadCapacity: 5500, odometer: 34200, acquisitionCost: 3650000, status: "Available", region: "North" },
  { id: "v8", registrationNumber: "MH-01-OP-8845", model: "Tata Van-05", type: "Van", maxLoadCapacity: 500, odometer: 15600, acquisitionCost: 1250000, status: "In Shop", region: "West" },
];

export const drivers: Driver[] = [
  { id: "d1", name: "Alex Fernandes", licenseNumber: "MH-DL-0421001", licenseCategory: "LMV-TR", licenseExpiry: "2027-03-14", contactNumber: "+91 98200 11122", safetyScore: 92, status: "On Trip" },
  { id: "d2", name: "Priya Nair", licenseNumber: "KA-DL-0921445", licenseCategory: "HMV", licenseExpiry: "2026-08-02", contactNumber: "+91 90080 22233", safetyScore: 88, status: "Available" },
  { id: "d3", name: "Ramesh Yadav", licenseNumber: "DL-DL-0221873", licenseCategory: "HMV", licenseExpiry: "2026-07-25", contactNumber: "+91 99110 33344", safetyScore: 74, status: "Available" },
  { id: "d4", name: "Simran Kaur", licenseNumber: "GJ-DL-0621230", licenseCategory: "LMV-TR", licenseExpiry: "2025-12-30", contactNumber: "+91 97250 44455", safetyScore: 65, status: "Suspended" },
  { id: "d5", name: "Vijay Kumar", licenseNumber: "TN-DL-0721556", licenseCategory: "HMV", licenseExpiry: "2027-01-19", contactNumber: "+91 98430 55566", safetyScore: 95, status: "On Trip" },
  { id: "d6", name: "Farhan Sheikh", licenseNumber: "UP-DL-0821991", licenseCategory: "LMV-TR", licenseExpiry: "2026-09-11", contactNumber: "+91 96500 66677", safetyScore: 81, status: "Off Duty" },
  { id: "d7", name: "Anita Desai", licenseNumber: "MH-DL-0521678", licenseCategory: "HMV", licenseExpiry: "2026-07-30", contactNumber: "+91 93200 77788", safetyScore: 90, status: "Available" },
];

export const trips: Trip[] = [
  { id: "t1", tripNumber: "TRP-1001", vehicleId: "v1", driverId: "d1", source: "Pune", destination: "Mumbai", cargoWeight: 450, plannedDistance: 150, actualDistance: 156, startOdometer: 48050, endOdometer: undefined, revenue: 18500, status: "Dispatched", plannedStart: "2026-07-12T06:00:00", plannedEnd: "2026-07-12T12:00:00", dispatchedAt: "2026-07-12T06:05:00" },
  { id: "t2", tripNumber: "TRP-1000", vehicleId: "v2", driverId: "d2", source: "Mumbai", destination: "Nashik", cargoWeight: 1200, plannedDistance: 170, actualDistance: 175, startOdometer: 90900, endOdometer: 91234, revenue: 21000, status: "Completed", plannedStart: "2026-07-10T05:00:00", plannedEnd: "2026-07-10T11:00:00", dispatchedAt: "2026-07-10T05:10:00", completedAt: "2026-07-10T11:20:00" },
  { id: "t3", tripNumber: "TRP-0999", vehicleId: "v5", driverId: "d5", source: "Chennai", destination: "Bengaluru", cargoWeight: 700, plannedDistance: 350, actualDistance: undefined, startOdometer: 65500, endOdometer: undefined, revenue: 32000, status: "Dispatched", plannedStart: "2026-07-12T04:00:00", plannedEnd: "2026-07-12T14:00:00", dispatchedAt: "2026-07-12T04:15:00" },
  { id: "t4", tripNumber: "TRP-0998", vehicleId: "v4", driverId: "d3", source: "Delhi", destination: "Jaipur", cargoWeight: 850, plannedDistance: 280, status: "Draft", revenue: 26500, plannedStart: "2026-07-13T05:00:00", plannedEnd: "2026-07-13T13:00:00" },
  { id: "t5", tripNumber: "TRP-0997", vehicleId: "v7", driverId: "d7", source: "Lucknow", destination: "Kanpur", cargoWeight: 3200, plannedDistance: 90, actualDistance: 92, startOdometer: 34000, endOdometer: 34200, revenue: 14200, status: "Completed", plannedStart: "2026-07-09T07:00:00", plannedEnd: "2026-07-09T10:00:00", dispatchedAt: "2026-07-09T07:05:00", completedAt: "2026-07-09T10:40:00" },
  { id: "t6", tripNumber: "TRP-0996", vehicleId: "v6", driverId: "d6", source: "Ahmedabad", destination: "Surat", cargoWeight: 900, plannedDistance: 260, status: "Cancelled", revenue: 0, plannedStart: "2026-07-08T06:00:00", plannedEnd: "2026-07-08T12:00:00" },
];

export const maintenanceLogs: MaintenanceLog[] = [
  { id: "m1", vehicleId: "v3", title: "Engine overhaul", description: "Full engine service after 130,000 km", cost: 42000, status: "Open", openedAt: "2026-07-08" },
  { id: "m2", vehicleId: "v8", title: "Brake pad replacement", description: "Front and rear brake pads worn out", cost: 6500, status: "Open", openedAt: "2026-07-11" },
  { id: "m3", vehicleId: "v2", title: "Oil change", description: "Routine 10,000 km service", cost: 3200, status: "Closed", openedAt: "2026-06-20", closedAt: "2026-06-21" },
  { id: "m4", vehicleId: "v1", title: "Tyre rotation", description: "Rotate and balance all tyres", cost: 2100, status: "Closed", openedAt: "2026-06-15", closedAt: "2026-06-15" },
  { id: "m5", vehicleId: "v6", title: "Transmission failure", description: "Vehicle retired after major failure", cost: 58000, status: "Closed", openedAt: "2026-05-02", closedAt: "2026-05-20" },
];

export const fuelLogs: FuelLog[] = [
  { id: "f1", vehicleId: "v1", tripId: "t1", liters: 32, cost: 3520, fuelDate: "2026-07-12" },
  { id: "f2", vehicleId: "v2", tripId: "t2", liters: 40, cost: 4400, fuelDate: "2026-07-10" },
  { id: "f3", vehicleId: "v5", tripId: "t3", liters: 55, cost: 6050, fuelDate: "2026-07-12" },
  { id: "f4", vehicleId: "v7", tripId: "t5", liters: 22, cost: 2420, fuelDate: "2026-07-09" },
  { id: "f5", vehicleId: "v3", liters: 60, cost: 6600, fuelDate: "2026-07-01" },
  { id: "f6", vehicleId: "v4", liters: 18, cost: 1980, fuelDate: "2026-07-05" },
];

export const expenses: Expense[] = [
  { id: "e1", vehicleId: "v1", tripId: "t1", category: "Toll", amount: 850, description: "Mumbai-Pune Expressway toll", expenseDate: "2026-07-12" },
  { id: "e2", vehicleId: "v2", tripId: "t2", category: "Toll", amount: 620, description: "Nashik highway toll", expenseDate: "2026-07-10" },
  { id: "e3", vehicleId: "v3", category: "Maintenance", amount: 42000, description: "Engine overhaul", expenseDate: "2026-07-08" },
  { id: "e4", vehicleId: "v5", tripId: "t3", category: "Parking", amount: 300, description: "Overnight parking Chennai depot", expenseDate: "2026-07-12" },
  { id: "e5", vehicleId: "v6", category: "Fine", amount: 1500, description: "Overloading fine", expenseDate: "2026-06-28" },
  { id: "e6", vehicleId: "v8", category: "Maintenance", amount: 6500, description: "Brake pad replacement", expenseDate: "2026-07-11" },
];

// ---- Derived helpers -------------------------------------------------

export function getVehicle(id: string) {
  return vehicles.find((v) => v.id === id);
}

export function getDriver(id: string) {
  return drivers.find((d) => d.id === id);
}

export function fuelCostForVehicle(vehicleId: string) {
  return fuelLogs.filter((f) => f.vehicleId === vehicleId).reduce((s, f) => s + f.cost, 0);
}

export function maintenanceCostForVehicle(vehicleId: string) {
  return maintenanceLogs.filter((m) => m.vehicleId === vehicleId).reduce((s, m) => s + m.cost, 0);
}

export function revenueForVehicle(vehicleId: string) {
  return trips.filter((t) => t.vehicleId === vehicleId && t.status === "Completed").reduce((s, t) => s + t.revenue, 0);
}

export function vehicleROI(vehicleId: string) {
  const v = getVehicle(vehicleId);
  if (!v || !v.acquisitionCost || v.acquisitionCost === 0) return 0;
  const revenue = revenueForVehicle(vehicleId);
  const cost = fuelCostForVehicle(vehicleId) + maintenanceCostForVehicle(vehicleId);
  return ((revenue - cost) / v.acquisitionCost) * 100;
}

export function fleetUtilization() {
  const active = vehicles.filter((v) => v.status !== "Retired").length;
  const onTrip = vehicles.filter((v) => v.status === "On Trip").length;
  return active === 0 ? 0 : Math.round((onTrip / active) * 100);
}

export function daysUntil(dateStr: string) {
  const target = new Date(dateStr);
  const targetUtc = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diff = targetUtc - todayUtc;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ---- Global State Notification System ----
export const listeners = new Set<() => void>();


export function notifyDataChanged() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      // ignore unmounted listeners errors
    }
  });
}

// ---- Mutators ----
export function addVehicle(v: Omit<Vehicle, "id">) {
  const newVehicle: Vehicle = {
    ...v,
    id: "v" + (vehicles.length + 1),
  };
  vehicles.push(newVehicle);
  notifyDataChanged();
  return newVehicle;
}

export function addDriver(d: Omit<Driver, "id">) {
  const newDriver: Driver = {
    ...d,
    id: "d" + (drivers.length + 1),
  };
  drivers.push(newDriver);
  notifyDataChanged();
  return newDriver;
}

export function addTrip(t: Omit<Trip, "id" | "tripNumber" | "status">) {
  const nextNum = 1001 + trips.length;
  const newTrip: Trip = {
    ...t,
    id: "t" + (trips.length + 1),
    tripNumber: `TRP-${nextNum}`,
    status: "Draft",
  };
  trips.push(newTrip);
  
  // Apply Business Rule: Dispatching changes vehicle and driver status to "On Trip" if status is Dispatch
  // Since new trips start as Draft, we don't automatically dispatch yet.
  
  notifyDataChanged();
  return newTrip;
}

export function dispatchTrip(tripId: string) {
  const t = trips.find(trip => trip.id === tripId);
  if (t && t.status === "Draft") {
    t.status = "Dispatched";
    t.dispatchedAt = new Date().toISOString();
    
    // Set vehicle and driver status to "On Trip"
    const v = vehicles.find(veh => veh.id === t.vehicleId);
    if (v) v.status = "On Trip";
    
    const d = drivers.find(drv => drv.id === t.driverId);
    if (d) d.status = "On Trip";
    
    notifyDataChanged();
  }
}

export function completeTrip(tripId: string, actualDistance: number, endOdometer: number, fuelLiters: number, fuelCost: number) {
  const t = trips.find(trip => trip.id === tripId);
  if (t && t.status === "Dispatched") {
    t.status = "Completed";
    t.completedAt = new Date().toISOString();
    t.actualDistance = actualDistance;
    t.endOdometer = endOdometer;
    
    // Set vehicle and driver status to "Available"
    const v = vehicles.find(veh => veh.id === t.vehicleId);
    if (v) {
      v.status = "Available";
      v.odometer = endOdometer;
    }
    
    const d = drivers.find(drv => drv.id === t.driverId);
    if (d) d.status = "Available";
    
    // Record fuel log if provided
    if (fuelLiters > 0) {
      fuelLogs.push({
        id: "f" + (fuelLogs.length + 1),
        vehicleId: t.vehicleId,
        tripId: t.id,
        liters: fuelLiters,
        cost: fuelCost,
        fuelDate: new Date().toISOString().split("T")[0],
      });
    }
    
    notifyDataChanged();
  }
}

export function cancelTrip(tripId: string) {
  const t = trips.find(trip => trip.id === tripId);
  if (t) {
    const oldStatus = t.status;
    t.status = "Cancelled";
    
    // Restores vehicle and driver back to Available if they were dispatched
    if (oldStatus === "Dispatched") {
      const v = vehicles.find(veh => veh.id === t.vehicleId);
      if (v) v.status = "Available";
      
      const d = drivers.find(drv => drv.id === t.driverId);
      if (d) d.status = "Available";
    }
    
    notifyDataChanged();
  }
}

export function addMaintenanceLog(m: Omit<MaintenanceLog, "id" | "status" | "openedAt">) {
  const newLog: MaintenanceLog = {
    ...m,
    id: "m" + (maintenanceLogs.length + 1),
    status: "Open",
    openedAt: new Date().toISOString().split("T")[0],
  };
  maintenanceLogs.push(newLog);
  
  // Business Rule: Adding vehicle to maintenance automatically switches status to "In Shop"
  const v = vehicles.find(veh => veh.id === m.vehicleId);
  if (v) v.status = "In Shop";
  
  notifyDataChanged();
  return newLog;
}

export function closeMaintenanceLog(logId: string) {
  const log = maintenanceLogs.find(m => m.id === logId);
  if (log && log.status === "Open") {
    log.status = "Closed";
    log.closedAt = new Date().toISOString().split("T")[0];
    
    // Business Rule: Restores vehicle status to Available (unless retired)
    const v = vehicles.find(veh => veh.id === log.vehicleId);
    if (v && v.status !== "Retired") {
      v.status = "Available";
    }
    
    notifyDataChanged();
  }
}

export function addFuelLog(f: Omit<FuelLog, "id">) {
  const newLog: FuelLog = {
    ...f,
    id: "f" + (fuelLogs.length + 1),
  };
  fuelLogs.push(newLog);
  notifyDataChanged();
  return newLog;
}

export function addExpense(e: Omit<Expense, "id">) {
  const newExpense: Expense = {
    ...e,
    id: "e" + (expenses.length + 1),
  };
  expenses.push(newExpense);
  notifyDataChanged();
  return newExpense;
}
