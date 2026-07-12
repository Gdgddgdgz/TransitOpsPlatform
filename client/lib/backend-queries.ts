"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DriverStatus, MaintenanceStatus, TripStatus, Vehicle, VehicleStatus } from "./types";
import { useApi } from "./api";

function normalizeStatus(value?: string): VehicleStatus | TripStatus | DriverStatus | string {
  const normalized = value?.toUpperCase();
  switch (normalized) {
    case "AVAILABLE":
      return "Available";
    case "ON_TRIP":
      return "On Trip";
    case "IN_SHOP":
      return "In Shop";
    case "RETIRED":
      return "Retired";
    case "DRAFT":
      return "Draft";
    case "DISPATCHED":
      return "Dispatched";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    case "OPEN":
      return "Open";
    case "CLOSED":
      return "Closed";
    default:
      return value ?? "Unknown";
  }
}

function toNumber(value: unknown) {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? num : 0;
}

export function useCurrentUser() {
  const api = useApi();

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await api.get<{ data: any }>('/me');
      return response.data;
    },
  });
}

export function useVehicles() {
  const api = useApi();

  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>('/fleet/vehicles');
      return (response.data || []).map((vehicle: any): Vehicle => ({
        id: vehicle.id,
        registrationNumber: vehicle.registrationNumber,
        model: vehicle.model ?? "N/A",
        type: vehicle.type ?? "N/A",
        maxLoadCapacity: toNumber(vehicle.maxLoadCapacity),
        odometer: toNumber(vehicle.odometer),
        acquisitionCost: toNumber(vehicle.acquisitionCost),
        status: (normalizeStatus(vehicle.status) as VehicleStatus) || "Available",
        region: vehicle.region ?? "N/A",
      }));
    },
  });
}

export function useDrivers() {
  const api = useApi();

  return useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>('/safety/drivers');
      return (response.data || []).map((driver: any) => ({
        id: driver.id,
        name: driver.user?.name || driver.name || "Unknown",
        licenseNumber: driver.licenseNumber ?? "",
        licenseCategory: driver.licenseCategory ?? "",
        licenseExpiry: driver.licenseExpiry ? new Date(driver.licenseExpiry).toISOString() : "",
        contactNumber: driver.contactNumber ?? "",
        safetyScore: toNumber(driver.safetyScore),
        status: normalizeStatus(driver.status) as DriverStatus,
      }));
    },
  });
}

export function useTrips() {
  const api = useApi();

  return useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>('/driver/trips');
      return (response.data || []).map((trip: any) => ({
        id: trip.id,
        tripNumber: trip.tripNumber,
        vehicleId: trip.vehicleId,
        driverId: trip.driverId,
        source: trip.source ?? "N/A",
        destination: trip.destination ?? "N/A",
        cargoWeight: toNumber(trip.cargoWeight),
        plannedDistance: toNumber(trip.plannedDistance),
        actualDistance: toNumber(trip.actualDistance),
        revenue: toNumber(trip.revenue),
        status: normalizeStatus(trip.status) as TripStatus,
        plannedStart: trip.plannedStart ?? "",
        plannedEnd: trip.plannedEnd ?? "",
        vehicle: trip.vehicle ? {
          id: trip.vehicle.id,
          registrationNumber: trip.vehicle.registrationNumber,
          model: trip.vehicle.model ?? "N/A",
          type: trip.vehicle.type ?? "N/A",
        } : undefined,
        driver: trip.driver ? {
          id: trip.driver.id,
          name: trip.driver.user?.name || trip.driver.name || "Unknown",
        } : undefined,
      }));
    },
  });
}

export function useFuelLogs() {
  const api = useApi();

  return useQuery({
    queryKey: ["fuel-logs"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>('/financial/fuel');
      return (response.data || []).map((log: any) => ({
        id: log.id,
        vehicleId: log.vehicleId,
        tripId: log.tripId,
        liters: toNumber(log.liters),
        cost: toNumber(log.cost),
        fuelDate: log.fuelDate ? new Date(log.fuelDate).toISOString().split("T")[0] : "",
        vehicle: log.vehicle ? {
          id: log.vehicle.id,
          registrationNumber: log.vehicle.registrationNumber,
        } : undefined,
      }));
    },
  });
}

export function useExpenses() {
  const api = useApi();

  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>('/financial/expenses');
      return (response.data || []).map((expense: any) => ({
        id: expense.id,
        vehicleId: expense.vehicleId,
        tripId: expense.tripId,
        category: expense.category ?? "Other",
        amount: toNumber(expense.amount),
        description: expense.description ?? "",
        expenseDate: expense.expenseDate ? new Date(expense.expenseDate).toISOString().split("T")[0] : "",
        vehicle: expense.vehicle ? {
          id: expense.vehicle.id,
          registrationNumber: expense.vehicle.registrationNumber,
        } : undefined,
      }));
    },
  });
}

export function useMaintenanceLogs() {
  const api = useApi();

  return useQuery({
    queryKey: ["maintenance-logs"],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>('/fleet/maintenance');
      return (response.data || []).map((log: any) => ({
        id: log.id,
        vehicleId: log.vehicleId,
        title: log.title ?? "Maintenance",
        description: log.description ?? "",
        cost: toNumber(log.cost),
        status: normalizeStatus(log.status) as MaintenanceStatus,
        openedAt: log.openedAt ? new Date(log.openedAt).toISOString() : "",
        vehicle: log.vehicle ? {
          id: log.vehicle.id,
          registrationNumber: log.vehicle.registrationNumber,
          model: log.vehicle.model ?? "N/A",
          type: log.vehicle.type ?? "N/A",
        } : undefined,
      }));
    },
  });
}

export function useReportMetrics() {
  const api = useApi();

  return useQuery({
    queryKey: ["report-metrics"],
    queryFn: async () => {
      const response = await api.get<{ data: any }>('/financial/reports');
      return response.data;
    },
  });
}

export function useCreateVehicle() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>('/fleet/vehicles', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useCreateTrip() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>('/driver/trips', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}

export function useCreateFuelLog() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post<{ data: any }>('/financial/fuel', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuel-logs"] });
    },
  });
}
