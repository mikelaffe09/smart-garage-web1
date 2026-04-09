import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMaintenanceRecord,
  getMaintenanceRecommendations,
  getMaintenanceStatus,
  updateMaintenanceRecommendation,
  updateMaintenanceRecords,
} from "@/features/maintenance/api";
import type {
  BulkMaintenanceRecordsInput,
  MaintenanceRecordInput,
  UpdateMaintenanceRecommendationInput,
} from "@/features/maintenance/types";

export function useMaintenanceRecommendations(carId?: string) {
  return useQuery({
    queryKey: ["maintenance-recommendations", carId],
    queryFn: () => getMaintenanceRecommendations(String(carId)),
    enabled: Boolean(carId),
  });
}

export function useMaintenanceStatus(carId?: string) {
  return useQuery({
    queryKey: ["maintenance-status", carId],
    queryFn: () => getMaintenanceStatus(String(carId)),
    enabled: Boolean(carId),
  });
}

export function useUpdateMaintenanceRecommendation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      carId,
      recommendationId,
      input,
    }: {
      carId: string;
      recommendationId: string;
      input: UpdateMaintenanceRecommendationInput;
    }) =>
      updateMaintenanceRecommendation(carId, recommendationId, input),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["maintenance-recommendations", variables.carId],
      });

      queryClient.invalidateQueries({
        queryKey: ["maintenance-status", variables.carId],
      });
    },
  });
}

export function useCreateMaintenanceRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      carId,
      input,
    }: {
      carId: string;
      input: MaintenanceRecordInput;
    }) => createMaintenanceRecord(carId, input),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["maintenance-status", variables.carId],
      });

      queryClient.invalidateQueries({
        queryKey: ["maintenance-recommendations", variables.carId],
      });
    },
  });
}

export function useUpdateMaintenanceRecords() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      carId,
      input,
    }: {
      carId: string;
      input: BulkMaintenanceRecordsInput;
    }) => updateMaintenanceRecords(carId, input),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["maintenance-status", variables.carId],
      });

      queryClient.invalidateQueries({
        queryKey: ["maintenance-recommendations", variables.carId],
      });
    },
  });
}