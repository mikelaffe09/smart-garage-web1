export type ExpenseCategory = "ROUTINE" | "MAJOR" | "APPEARANCE";

export type ExpenseItem = {
  id: string;
  carId: string;
  note: string;
  amount: number;
  category: ExpenseCategory;
  expenseDate: string;
  mileage?: number | null;
};