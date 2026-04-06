import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import { createVehicle, deleteVehicle, getVehicleById, listVehicleCatalog, listVehicles } from "@/features/vehicles/api";
import { getMockVehicleById, mockVehicles } from "@/features/vehicles/mockData";
import type { CreateVehicleInput } from "@/features/vehicles/api";

const mockCatalog = [
  { id: "1", make: "Toyota", model: "Corolla", yearStart: 2015, yearEnd: 2026, vehicleKey: "toyota_corolla" },
  { id: "2", make: "Toyota", model: "Camry", yearStart: 2015, yearEnd: 2026, vehicleKey: "toyota_camry" },
  { id: "3", make: "Jeep", model: "Grand Cherokee", yearStart: 2014, yearEnd: 2026, vehicleKey: "jeep_grand_cherokee" },
  { id: "4", make: "BMW", model: "X5", yearStart: 2016, yearEnd: 2026, vehicleKey: "bmw_x5" },
];

export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles", env.dataMode],
    queryFn: async () => {
      return env.dataMode === "live" ? listVehicles() : mockVehicles;
    },
  });
}

export function useVehicle(carId: string) {
  return useQuery({
    queryKey: ["vehicle", carId, env.dataMode],
    enabled: Boolean(carId),
    queryFn: async () => {
      if (env.dataMode === "live") {
        return getVehicleById(carId);
      }

      return getMockVehicleById(carId);
    },
  });
}

export function useVehicleCatalog() {
  return useQuery({
    queryKey: ["vehicle-catalog", env.dataMode],
    queryFn: async () => {
      return env.dataMode === "live" ? listVehicleCatalog() : mockCatalog;
    },
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateVehicleInput) => createVehicle(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      await queryClient.invalidateQueries({ queryKey: ["vehicle-catalog"] });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: string) => deleteVehicle(carId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}