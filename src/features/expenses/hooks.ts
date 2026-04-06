import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import {
  createExpense,
  deleteExpense,
  listExpenses,
  listExpensesByCarId,
} from "@/features/expenses/api";
import { getExpensesByCarId, mockExpenses } from "@/features/expenses/mockData";
import type { ExpenseItem } from "@/features/expenses/types";

export function useExpenses() {
  return useQuery<ExpenseItem[]>({
    queryKey: ["expenses", env.dataMode],
    queryFn: async () => {
      return env.dataMode === "live" ? await listExpenses() : mockExpenses;
    },
  });
}

export function useVehicleExpenses(carId: string) {
  return useQuery<ExpenseItem[]>({
    queryKey: ["expenses", "vehicle", carId, env.dataMode],
    enabled: Boolean(carId),
    queryFn: async () => {
      return env.dataMode === "live"
        ? await listExpensesByCarId(carId)
        : getExpensesByCarId(carId);
    },
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}