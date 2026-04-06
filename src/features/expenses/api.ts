import { apiFetch } from "@/shared/api/client";
import type { ExpenseItem, ExpenseCategory } from "@/features/expenses/types";

export type SaveExpenseInput = {
  carId: string;
  amount: number;
  category: ExpenseCategory;
  expenseDate: string;
  mileage: number;
  note: string;
  currency?: string;
};

function normalizeExpense(item: any): ExpenseItem {
  return {
    id: String(item?.id ?? ""),
    carId: String(item?.carId ?? ""),
    note: String(item?.note ?? ""),
    amount: Number(item?.amount ?? 0),
    category: String(item?.category ?? "ROUTINE") as ExpenseCategory,
    expenseDate: String(item?.expenseDate ?? "").slice(0, 10),
    mileage:
      typeof item?.mileage === "number"
        ? item.mileage
        : item?.mileage != null
        ? Number(item.mileage)
        : null,
  };
}

export async function listExpenses() {
  const result = await apiFetch<any[]>("/api/expenses");
  return Array.isArray(result) ? result.map(normalizeExpense) : [];
}

export async function listExpensesByCarId(carId: string) {
  const result = await apiFetch<any[]>(`/api/expenses?carId=${encodeURIComponent(carId)}`);
  return Array.isArray(result) ? result.map(normalizeExpense) : [];
}

export async function getExpenseTotalByCarId(carId: string) {
  const result = await apiFetch<number>(`/api/expenses/total?carId=${encodeURIComponent(carId)}`);
  return Number(result) || 0;
}

export async function createExpense(input: SaveExpenseInput) {
  return apiFetch<unknown>("/api/expenses", {
    method: "POST",
    body: {
      carId: input.carId,
      category: input.category,
      amount: Number(input.amount),
      currency: input.currency || "USD",
      note: input.note.trim(),
      expenseDate: input.expenseDate,
      mileage: Number(input.mileage),
    },
  });
}

export async function updateExpense(id: string, input: Partial<SaveExpenseInput>) {
  return apiFetch<unknown>(`/api/expenses/${id}`, {
    method: "PUT",
    body: {
      category: input.category,
      amount: input.amount,
      currency: input.currency,
      note: input.note,
      expenseDate: input.expenseDate,
      mileage: input.mileage,
    },
  });
}

export async function deleteExpense(id: string) {
  return apiFetch<unknown>(`/api/expenses/${id}`, {
    method: "DELETE",
  });
}