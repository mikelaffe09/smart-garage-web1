export type Vehicle = {
  id: string;
  vehicleName: string;
  year: number;
  mileage: number;
  vehicleKey?: string;
  imageUrl?: string | null;
};

export type ReminderStatus = "Upcoming" | "Overdue" | "Completed";

export type VehicleReminder = {
  id: string;
  vehicleId: string;
  title: string;
  dueDate: string;
  status: ReminderStatus;
};

export type VehicleExpenseSummary = {
  total: number;
  count: number;
};