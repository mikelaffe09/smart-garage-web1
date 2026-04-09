export type MaintenanceRecommendation = {
  recommendationId: string;
  maintenanceCode: string;
  maintenanceName: string;
  intervalKm: number;
  isCustom: boolean;
};

export type MaintenanceRecommendationsResponse = {
  recommendations: MaintenanceRecommendation[];
};

export type UpdateMaintenanceRecommendationInput = {
  intervalKm: number;
};

export type MaintenanceStatusItem = {
  type: string;
  intervalKm: number;
  lastServiceMileage: number | null;
  nextDueMileage: number | null;
  remainingKm: number | null;
};

export type MaintenanceRecordInput = {
  maintenanceCode: string;
  mileage: number;
};

export type BulkMaintenanceRecordsInput = {
  records: MaintenanceRecordInput[];
};