import { apiFetch } from "@/shared/api/client";
import type {
  BulkMaintenanceRecordsInput,
  MaintenanceRecommendation,
  MaintenanceRecommendationsResponse,
  MaintenanceRecordInput,
  MaintenanceStatusItem,
  UpdateMaintenanceRecommendationInput,
} from "@/features/maintenance/types";

function normalizeRecommendation(item: any): MaintenanceRecommendation {
  return {
    recommendationId: String(item?.recommendationId ?? ""),
    maintenanceCode: String(item?.maintenanceCode ?? ""),
    maintenanceName: String(item?.maintenanceName ?? ""),
    intervalKm: Number(item?.intervalKm ?? 0),
    isCustom: Boolean(item?.isCustom),
  };
}

function normalizeMaintenanceStatusItem(item: any): MaintenanceStatusItem {
  return {
    type: String(item?.type ?? ""),
    intervalKm: Number(item?.intervalKm ?? 0),
    lastServiceMileage:
      item?.lastServiceMileage == null ? null : Number(item.lastServiceMileage),
    nextDueMileage:
      item?.nextDueMileage == null ? null : Number(item.nextDueMileage),
    remainingKm: item?.remainingKm == null ? null : Number(item.remainingKm),
  };
}

export async function getMaintenanceRecommendations(
  carId: string
): Promise<MaintenanceRecommendationsResponse> {
  const result = await apiFetch<any>(
    `/api/Garage/cars/${carId}/maintenance-recommendations`
  );

  const recommendations = Array.isArray(result?.recommendations)
    ? result.recommendations.map(normalizeRecommendation)
    : [];

  return { recommendations };
}

export async function updateMaintenanceRecommendation(
  carId: string,
  recommendationId: string,
  input: UpdateMaintenanceRecommendationInput
) {
  return apiFetch<unknown>(
    `/api/Garage/cars/${carId}/maintenance-recommendations/${recommendationId}`,
    {
      method: "PATCH",
      body: {
        intervalKm: Number(input.intervalKm),
      },
    }
  );
}

export async function getMaintenanceStatus(
  carId: string
): Promise<MaintenanceStatusItem[]> {
  const result = await apiFetch<any[]>(`/api/Garage/cars/${carId}/maintenance`);

  return Array.isArray(result) ? result.map(normalizeMaintenanceStatusItem) : [];
}

export async function createMaintenanceRecord(
  carId: string,
  input: MaintenanceRecordInput
) {
  return apiFetch<unknown>(`/api/Garage/cars/${carId}/maintenance-record`, {
    method: "POST",
    body: {
      maintenanceCode: input.maintenanceCode,
      mileage: Number(input.mileage),
    },
  });
}

export async function updateMaintenanceRecords(
  carId: string,
  input: BulkMaintenanceRecordsInput
) {
  return apiFetch<unknown>(`/api/Garage/cars/${carId}/maintenance-records`, {
    method: "PATCH",
    body: {
      records: input.records.map((record) => ({
        maintenanceCode: record.maintenanceCode,
        mileage: Number(record.mileage),
      })),
    },
  });
}