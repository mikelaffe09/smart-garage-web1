import type { ExpenseItem } from "@/features/expenses/types";

export const mockExpenses: ExpenseItem[] = [
  {
    id: "exp-1",
    carId: "car-1",
    note: "Oil and filter change",
    amount: 95,
    category: "ROUTINE",
    expenseDate: "2026-03-11",
    mileage: 83500,
  },
  {
    id: "exp-2",
    carId: "car-1",
    note: "Front brake pads",
    amount: 220,
    category: "MAJOR",
    expenseDate: "2026-02-18",
    mileage: 82100,
  },
  {
    id: "exp-3",
    carId: "car-2",
    note: "Battery replacement",
    amount: 180,
    category: "MAJOR",
    expenseDate: "2026-03-08",
    mileage: 125800,
  },
  {
    id: "exp-4",
    carId: "car-2",
    note: "Interior detailing",
    amount: 75,
    category: "APPEARANCE",
    expenseDate: "2026-01-26",
    mileage: 124900,
  },
  {
    id: "exp-5",
    carId: "car-3",
    note: "Tire rotation",
    amount: 40,
    category: "ROUTINE",
    expenseDate: "2026-03-19",
    mileage: 31120,
  },
  {
    id: "exp-6",
    carId: "car-3",
    note: "Ceramic coating touch-up",
    amount: 375,
    category: "APPEARANCE",
    expenseDate: "2026-02-02",
    mileage: 30200,
  },
];

export function getExpensesByCarId(carId: string) {
  return mockExpenses
    .filter((item) => item.carId === carId)
    .sort((a, b) => {
      const da = new Date(a.expenseDate).getTime();
      const db = new Date(b.expenseDate).getTime();
      return db - da;
    });
}