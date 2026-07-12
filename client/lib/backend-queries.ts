"use client";

import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import type {
  AppUser,
  DriverStatus,
  ExpenseCategory,
  FinancialDashboard,
  MaintenanceStatus,
  TripStatus,
  Vehicle,
  VehicleStatus,
} from "./types";
import { useApi } from "./api";

function normalizeVehicleStatus(value?: string): VehicleStatus {
  switch (value?.toUpperCase()) {
    case "AVAILABLE": return "Available";
    case "ON_TRIP": return "On Trip";
    case "IN_SHOP": return "In Shop";
    case "RETIRED": return "Retired";
    default: return "Available";
  }
}

function normalizeTripStatus(value?: string): TripStatus {
  switch (value?.toUpperCase()) {
    case "DRAFT": return "Draft";
    case "DISPATCHED": return "Dispatched";
    case "COMPLETED": return "Completed";
    case "CANCELLED": return "Cancelled";
    default: return "Draft";
  }
}

function normalizeDriverStatus(value?: string): DriverStatus {
  switch (value?.toUpperCase()) {
    case "AVAILABLE": return "Available";
    case "ON_TRIP": return "On Trip";
    case "OFF_DUTY": return "Off Duty";
    case "SUSPENDED": return "Suspended";
    default: return "Available";
  }
}

function normalizeMaintenanceStatus(value?: string): MaintenanceStatus {
  switch (value?.toUpperCase()) {
    case "OPEN": return "Open";
    case "CLOSED": return "Closed";
    default: return "Open";
  }
}

// Maps schema enum values to display-friendly strings for expense categories
function normalizeExpenseCategory(value?: string): ExpenseCategory {
  switch (value?.toUpperCase()) {
    case "TOLL": return "Toll";
    case "REPAIR": return "Repair";
    case "INSURANCE": return "Insurance";
    case "MAINTENANCE": return "Maintenance";
    case "PARKING": return "Parking";
    case "FINE": return "Fine";
    case "OTHER": return "Other";
    default: {
      if (!value) return "Other";
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return capitalized as ExpenseCategory;
    }
  }
}

function toNumber(value: unknown) {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? num : 0;
}

// ─── Current User ────────────────────────────────────────────────────────────

export function useCurrentUser() {
  const api = useApi();
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: AppUser }>("/me");
      return response.data;
    },
  });
}

// ─── Admin: Org Users ─────────────────────────────────────────────────────────

export function useOrgUsers() {
  const api = useApi();
  return useQuery({
    queryKey: ["org-users"],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: AppUser[] }>("/admin/users");
      return response.data ?? [];
    },
  });
}

// ─── Vehicles ─────────────────────────────────────────────────────────────────

export function useVehicles() {
  const api = useApi();
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>("/fleet/vehicles");
      return (response.data || []).map((vehicle: any): Vehicle => ({
        id: vehicle.id,
        registrationNumber: vehicle.registrationNumber,
        model: vehicle.model ?? "N/A",
        type: vehicle.type ?? "N/A",
        maxLoadCapacity: toNumber(vehicle.maxLoadCapacity),
        odometer: toNumber(vehicle.odometer),
        acquisitionCost: toNumber(vehicle.acquisitionCost),
        status: normalizeVehicleStatus(vehicle.status),
        region: vehicle.region ?? "Unknown",
      }));
    },
  });
}

export function useCreateVehicle() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>("/fleet/vehicles", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useUpdateVehicle() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: Record<string, unknown>) => {
      const response = await api.put<{ data: any }>(`/fleet/vehicles/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useDeleteVehicle() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.del(`/fleet/vehicles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

// ─── Maintenance Logs ─────────────────────────────────────────────────────────

export function useMaintenanceLogs() {
  const api = useApi();
  return useQuery({
    queryKey: ["maintenance-logs"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>("/fleet/maintenance");
      return (response.data || []).map((log: any) => ({
        id: log.id,
        vehicleId: log.vehicleId,
        title: log.title ?? "Maintenance",
        description: log.description ?? "",
        cost: toNumber(log.cost),
        status: normalizeMaintenanceStatus(log.status),
        openedAt: log.openedAt ? new Date(log.openedAt).toISOString() : "",
        closedAt: log.closedAt ? new Date(log.closedAt).toISOString() : undefined,
        vehicle: log.vehicle
          ? {
              id: log.vehicle.id,
              registrationNumber: log.vehicle.registrationNumber,
              model: log.vehicle.model ?? "N/A",
              type: log.vehicle.type ?? "N/A",
            }
          : undefined,
      }));
    },
  });
}

export function useCreateMaintenanceLog() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>("/fleet/maintenance", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-logs"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useCloseMaintenanceLog() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<{ data: any }>(`/fleet/maintenance/${id}/close`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-logs"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

// ─── Drivers ─────────────────────────────────────────────────────────────────

export function useDrivers() {
  const api = useApi();
  return useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>("/safety/drivers");
      return (response.data || []).map((driver: any) => ({
        id: driver.id,
        name: driver.user?.name || driver.name || "Unknown",
        licenseNumber: driver.licenseNumber ?? "",
        licenseCategory: driver.licenseCategory ?? "",
        licenseExpiry: driver.licenseExpiry
          ? new Date(driver.licenseExpiry).toISOString()
          : "",
        contactNumber: driver.contactNumber ?? "",
        safetyScore: toNumber(driver.safetyScore),
        status: normalizeDriverStatus(driver.status),
        userId: driver.userId,
      }));
    },
  });
}

export function useCreateDriver() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>("/safety/drivers", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useUpdateDriver() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: Record<string, unknown>) => {
      const response = await api.put<{ data: any }>(`/safety/drivers/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useDeleteDriver() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.del(`/safety/drivers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

// ─── Trips ────────────────────────────────────────────────────────────────────

export function useTrips() {
  const api = useApi();
  return useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>("/driver/trips");
      return (response.data || []).map((trip: any) => ({
        id: trip.id,
        tripNumber: trip.tripNumber,
        vehicleId: trip.vehicleId,
        driverId: trip.driverId,
        source: trip.source ?? "N/A",
        destination: trip.destination ?? "N/A",
        cargoWeight: toNumber(trip.cargoWeight),
        plannedDistance: toNumber(trip.plannedDistance),
        actualDistance: trip.actualDistance != null ? toNumber(trip.actualDistance) : undefined,
        revenue: toNumber(trip.revenue),
        status: normalizeTripStatus(trip.status),
        plannedStart: trip.plannedStart ?? "",
        plannedEnd: trip.plannedEnd ?? "",
        dispatchedAt: trip.dispatchedAt ?? undefined,
        completedAt: trip.completedAt ?? undefined,
        vehicle: trip.vehicle
          ? {
              id: trip.vehicle.id,
              registrationNumber: trip.vehicle.registrationNumber,
              model: trip.vehicle.model ?? "N/A",
              type: trip.vehicle.type ?? "N/A",
            }
          : undefined,
        driver: trip.driver
          ? {
              id: trip.driver.id,
              name: trip.driver.user?.name || trip.driver.name || "Unknown",
            }
          : undefined,
      }));
    },
  });
}

export function useCreateTrip() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>("/driver/trips", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}

export function useDispatchTrip() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<{ data: any }>(`/driver/trips/${id}/dispatch`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useCompleteTrip() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: { id: string; actualDistance: number; endOdometer: number }) => {
      const response = await api.post<{ data: any }>(`/driver/trips/${id}/complete`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useCancelTrip() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<{ data: any }>(`/driver/trips/${id}/cancel`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

// ─── Recent Trips (Fleet Dashboard) ───────────────────────────────────────────

export function useRecentTrips(limit = 5) {
  const api = useApi();
  return useQuery({
    queryKey: ["recent-trips", limit],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>(`/fleet/recent-trips?limit=${limit}`);
      return (response.data || []).map((trip: any) => ({
        id: trip.id,
        tripNumber: trip.tripNumber,
        vehicleId: trip.vehicleId,
        driverId: trip.driverId,
        source: trip.source ?? "N/A",
        destination: trip.destination ?? "N/A",
        status: normalizeTripStatus(trip.status),
        vehicle: trip.vehicle
          ? {
              id: trip.vehicle.id,
              registrationNumber: trip.vehicle.registrationNumber,
              model: trip.vehicle.model ?? "N/A",
              type: trip.vehicle.type ?? "N/A",
            }
          : undefined,
        driver: trip.driver
          ? {
              id: trip.driver.id,
              name: trip.driver.user?.name || trip.driver.name || "Unknown",
            }
          : undefined,
      }));
    },
  });
}

// ─── Fuel Logs ────────────────────────────────────────────────────────────────

export function useFuelLogs() {
  const api = useApi();
  return useQuery({
    queryKey: ["fuel-logs"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>("/financial/fuel");
      return (response.data || []).map((log: any) => ({
        id: log.id,
        vehicleId: log.vehicleId,
        tripId: log.tripId ?? undefined,
        liters: toNumber(log.liters),
        cost: toNumber(log.cost),
        fuelDate: log.fuelDate
          ? new Date(log.fuelDate).toISOString().split("T")[0]
          : "",
        vehicle: log.vehicle
          ? { id: log.vehicle.id, registrationNumber: log.vehicle.registrationNumber }
          : undefined,
      }));
    },
  });
}

export function useCreateFuelLog() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>("/financial/fuel", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuel-logs"] });
    },
  });
}

// ─── Expenses ─────────────────────────────────────────────────────────────────

export function useExpenses() {
  const api = useApi();
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>("/financial/expenses");
      return (response.data || []).map((expense: any) => ({
        id: expense.id,
        vehicleId: expense.vehicleId ?? undefined,
        tripId: expense.tripId ?? undefined,
        category: normalizeExpenseCategory(expense.category),
        amount: toNumber(expense.amount),
        description: expense.description ?? "",
        expenseDate: expense.expenseDate
          ? new Date(expense.expenseDate).toISOString().split("T")[0]
          : "",
        vehicle: expense.vehicle
          ? { id: expense.vehicle.id, registrationNumber: expense.vehicle.registrationNumber }
          : undefined,
      }));
    },
  });
}

export function useCreateExpense() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>("/financial/expenses", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

// ─── Financial Dashboard ──────────────────────────────────────────────────────

export function useFinancialDashboard(): UseQueryResult<FinancialDashboard, Error> {
  const api = useApi();
  return useQuery<FinancialDashboard, Error>({
    queryKey: ["financial-dashboard"],
    queryFn: async () => {
      const response = await api.get<{ data: any }>("/financial/dashboard");
      const data = response.data ?? {};
      return {
        trips: (data.trips || []).map((trip: any) => ({
          id: trip.id,
          tripNumber: trip.tripNumber,
          vehicleId: trip.vehicleId,
          driverId: trip.driverId,
          source: trip.source ?? "N/A",
          destination: trip.destination ?? "N/A",
          cargoWeight: toNumber(trip.cargoWeight),
          plannedDistance: toNumber(trip.plannedDistance),
          actualDistance: trip.actualDistance != null ? toNumber(trip.actualDistance) : undefined,
          revenue: toNumber(trip.revenue),
          status: normalizeTripStatus(trip.status),
          plannedStart: trip.plannedStart ?? "",
          plannedEnd: trip.plannedEnd ?? "",
          dispatchedAt: trip.dispatchedAt ?? undefined,
          completedAt: trip.completedAt ?? undefined,
          vehicle: trip.vehicle
            ? {
                id: trip.vehicle.id,
                registrationNumber: trip.vehicle.registrationNumber,
                model: trip.vehicle.model ?? "N/A",
                type: trip.vehicle.type ?? "N/A",
              }
            : undefined,
          driver: trip.driver
            ? {
                id: trip.driver.id,
                name: trip.driver.user?.name || trip.driver.name || "Unknown",
              }
            : undefined,
        })),
        vehicleMetrics: (data.vehicleMetrics || []).map((v: any) => ({
          id: v.id,
          registrationNumber: v.registrationNumber,
          model: v.model ?? "N/A",
          type: v.type ?? "N/A",
          region: v.region ?? "Unknown",
          status: normalizeVehicleStatus(v.status),
          acquisitionCost: toNumber(v.acquisitionCost),
          totalFuelCost: toNumber(v.totalFuelCost),
          totalMaintenanceCost: toNumber(v.totalMaintenanceCost),
          totalRevenue: toNumber(v.totalRevenue),
          totalOpCost: toNumber(v.totalOpCost),
          roi: toNumber(v.roi),
        })),
        totals: {
          totalRevenue: toNumber(data.totals?.totalRevenue),
          totalFuelCost: toNumber(data.totals?.totalFuelCost),
          totalMaintenanceCost: toNumber(data.totals?.totalMaintenanceCost),
          avgROI: toNumber(data.totals?.avgROI),
        },
      };
    },
  });
}

// ─── Report Metrics ───────────────────────────────────────────────────────────

export function useReportMetrics() {
  const api = useApi();
  return useQuery({
    queryKey: ["report-metrics"],
    queryFn: async () => {
      const response = await api.get<{ data: any }>("/financial/reports");
      return response.data;
    },
  });
}
