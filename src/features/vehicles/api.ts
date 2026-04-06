import { apiFetch } from "@/shared/api/client";
import type { Vehicle } from "@/features/vehicles/types";

export type VehicleCatalogRow = {
  id: string;
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  vehicleKey: string;
};

export type CreateVehicleInput = {
  vehicleKey?: string;
  vehicleName: string;
  year: number;
  mileage: number;
  imageUrl?: string | null;
};

export type UpdateVehicleInput = {
  vehicleKey?: string;
  vehicleName?: string;
  year?: number;
  mileage?: number;
  imageUrl?: string | null;
};

export async function listVehicles() {
  return apiFetch<Vehicle[]>("/api/garage/cars");
}

export async function getVehicleById(carId: string) {
  const vehicles = await listVehicles();
  return vehicles.find((vehicle) => String(vehicle.id) === String(carId)) ?? null;
}

export async function createVehicle(input: CreateVehicleInput) {
  return apiFetch<Vehicle>("/api/garage/cars", {
    method: "POST",
    body: {
      vehicleKey: input.vehicleKey?.trim() || "",
      vehicleName: input.vehicleName.trim(),
      year: Number(input.year),
      mileage: Number(input.mileage),
      imageUrl: input.imageUrl ?? null,
    },
  });
}

export async function updateVehicle(carId: string, input: UpdateVehicleInput) {
  if (!carId) {
    throw new Error("Missing car id");
  }

  return apiFetch<Vehicle>(`/api/garage/cars/${carId}`, {
    method: "PUT",
    body: {
      vehicleKey: input.vehicleKey?.trim() || "",
      vehicleName: input.vehicleName?.trim(),
      year: input.year,
      mileage: input.mileage,
      imageUrl: input.imageUrl ?? null,
    },
  });
}

export async function deleteVehicle(carId: string) {
  if (!carId) {
    throw new Error("Missing car id");
  }

  return apiFetch<unknown>(`/api/garage/cars/${carId}`, {
    method: "DELETE",
  });
}

export async function listVehicleCatalog() {
  return apiFetch<VehicleCatalogRow[]>("/api/vehicle-catalog");
}