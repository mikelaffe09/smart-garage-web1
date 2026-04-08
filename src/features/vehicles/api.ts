import { apiFetch } from "@/shared/api/client";
import type { Vehicle } from "@/features/vehicles/types";

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

export type ResolvedVehicleDoc = {
  vehicleKey: string;
  yearStart: number;
  yearEnd: number;
} | null;

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

  const body: Record<string, unknown> = {};

  if (input.vehicleKey !== undefined) {
    body.vehicleKey = input.vehicleKey?.trim() ?? "";
  }

  if (input.vehicleName !== undefined) {
    body.vehicleName = input.vehicleName.trim();
  }

  if (input.year !== undefined) {
    body.year = Number(input.year);
  }

  if (input.mileage !== undefined) {
    body.mileage = Number(input.mileage);
  }

  if (input.imageUrl !== undefined) {
    body.imageUrl = input.imageUrl ?? null;
  }

  return apiFetch<Vehicle>(`/api/garage/cars/${carId}`, {
    method: "PUT",
    body,
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

export async function listVehicleMakes() {
  return apiFetch<string[]>("/api/VehicleDocs/makes");
}

export async function listVehicleModels(make: string) {
  if (!make.trim()) {
    return [];
  }

  const search = new URLSearchParams({ make: make.trim() }).toString();
  return apiFetch<string[]>(`/api/VehicleDocs/models?${search}`);
}

export async function listVehicleYears(make: string, model: string) {
  if (!make.trim() || !model.trim()) {
    return [];
  }

  const search = new URLSearchParams({
    make: make.trim(),
    model: model.trim(),
  }).toString();

  return apiFetch<number[]>(`/api/VehicleDocs/years?${search}`);
}

export async function resolveVehicleDoc(
  make: string,
  model: string,
  year: number
) {
  if (!make.trim() || !model.trim() || !Number(year)) {
    return null;
  }

  const search = new URLSearchParams({
    make: make.trim(),
    model: model.trim(),
    year: String(Number(year)),
  }).toString();

  return apiFetch<ResolvedVehicleDoc>(`/api/VehicleDocs/resolve?${search}`);
}