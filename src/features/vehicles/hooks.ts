import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import {
  createVehicle,
  deleteVehicle,
  getVehicleById,
  listVehicleMakes,
  listVehicleModels,
  listVehicleYears,
  listVehicles,
  resolveVehicleDoc,
  updateVehicle,
  type CreateVehicleInput,
  type UpdateVehicleInput,
} from "@/features/vehicles/api";
import { getMockVehicleById, mockVehicles } from "@/features/vehicles/mockData";

export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles", env.dataMode],
    queryFn: async () => {
      return env.dataMode === "live" ? await listVehicles() : mockVehicles;
    },
  });
}

export function useVehicle(carId: string) {
  return useQuery({
    queryKey: ["vehicle", carId, env.dataMode],
    enabled: Boolean(carId),
    queryFn: async () => {
      if (env.dataMode === "live") {
        return await getVehicleById(carId);
      }

      return getMockVehicleById(carId);
    },
  });
}

export function useVehicleMakes() {
  return useQuery({
    queryKey: ["vehicle-docs", "makes", env.dataMode],
    queryFn: async () => {
      return env.dataMode === "live" ? await listVehicleMakes() : [];
    },
  });
}

export function useVehicleModels(make: string) {
  return useQuery({
    queryKey: ["vehicle-docs", "models", make, env.dataMode],
    enabled: Boolean(make),
    queryFn: async () => {
      return env.dataMode === "live" ? await listVehicleModels(make) : [];
    },
  });
}

export function useVehicleYears(make: string, model: string) {
  return useQuery({
    queryKey: ["vehicle-docs", "years", make, model, env.dataMode],
    enabled: Boolean(make && model),
    queryFn: async () => {
      return env.dataMode === "live"
        ? await listVehicleYears(make, model)
        : [];
    },
  });
}

export function useResolvedVehicleDoc(
  make: string,
  model: string,
  year: string
) {
  return useQuery({
    queryKey: ["vehicle-docs", "resolve", make, model, year, env.dataMode],
    enabled: Boolean(make && model && year),
    queryFn: async () => {
      const yearNumber = Number(year);

      return env.dataMode === "live"
        ? await resolveVehicleDoc(make, model, yearNumber)
        : null;
    },
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateVehicleInput) => createVehicle(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      carId,
      input,
    }: {
      carId: string;
      input: UpdateVehicleInput;
    }) => updateVehicle(carId, input),
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      await queryClient.invalidateQueries({
        queryKey: ["vehicle", variables.carId],
      });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: string) => deleteVehicle(carId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      await queryClient.invalidateQueries({ queryKey: ["reminders"] });
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}