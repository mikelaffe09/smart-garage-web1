import type { Vehicle, VehicleExpenseSummary, VehicleReminder } from "@/features/vehicles/types";

export const mockVehicles: Vehicle[] = [
  {
    id: "car-1",
    vehicleName: "Toyota Corolla",
    year: 2020,
    mileage: 84215,
    vehicleKey: "toyota_corolla_2020",
    imageUrl: null,
  },
  {
    id: "car-2",
    vehicleName: "Jeep Grand Cherokee",
    year: 2018,
    mileage: 126430,
    vehicleKey: "jeep_grand_cherokee_2018",
    imageUrl: null,
  },
  {
    id: "car-3",
    vehicleName: "BMW X5",
    year: 2022,
    mileage: 31800,
    vehicleKey: "",
    imageUrl: null,
  },
];

export const mockReminders: VehicleReminder[] = [
  {
    id: "rem-1",
    vehicleId: "car-1",
    title: "Oil Change",
    dueDate: "2026-04-14",
    status: "Upcoming",
  },
  {
    id: "rem-2",
    vehicleId: "car-1",
    title: "Brake Inspection",
    dueDate: "2026-03-02",
    status: "Overdue",
  },
  {
    id: "rem-3",
    vehicleId: "car-2",
    title: "Tire Rotation",
    dueDate: "2026-05-10",
    status: "Upcoming",
  },
  {
    id: "rem-4",
    vehicleId: "car-2",
    title: "Battery Check",
    dueDate: "2026-02-08",
    status: "Completed",
  },
  {
    id: "rem-5",
    vehicleId: "car-3",
    title: "Coolant Flush",
    dueDate: "2026-04-28",
    status: "Upcoming",
  },
];

const expenseSummaryMap: Record<string, VehicleExpenseSummary> = {
  "car-1": { total: 1420.5, count: 6 },
  "car-2": { total: 3285.99, count: 11 },
  "car-3": { total: 490.0, count: 2 },
};

export function getMockVehicleById(carId: string) {
  return mockVehicles.find((vehicle) => vehicle.id === carId) ?? null;
}

export function getMockVehicleReminders(carId: string) {
  return mockReminders.filter((reminder) => reminder.vehicleId === carId);
}

export function getMockExpenseSummary(carId: string): VehicleExpenseSummary {
  return expenseSummaryMap[carId] ?? { total: 0, count: 0 };
}