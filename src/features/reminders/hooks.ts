import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import {
  completeReminder,
  createReminder,
  deleteReminder,
  listReminders,
  listRemindersByCarId,
  type ReminderItem,
} from "@/features/reminders/api";
import {
  getMockVehicleReminders,
  mockReminders,
} from "@/features/vehicles/mockData";

function normalizeMockReminder(
  reminder: (typeof mockReminders)[number]
): ReminderItem {
  return {
    id: reminder.id,
    carId: reminder.vehicleId,
    title: reminder.title,
    notes: null,
    dueDate: reminder.dueDate,
    dueMileage: null,
    isCompleted: reminder.status === "Completed",
    completedAt: reminder.status === "Completed" ? reminder.dueDate : null,
    createdAt: null,
    updatedAt: null,
    status: reminder.status,
  };
}

export function useReminders() {
  return useQuery<ReminderItem[]>({
    queryKey: ["reminders", env.dataMode],
    queryFn: async () => {
      return env.dataMode === "live"
        ? await listReminders()
        : mockReminders.map(normalizeMockReminder);
    },
  });
}

export function useVehicleReminders(carId: string) {
  return useQuery<ReminderItem[]>({
    queryKey: ["reminders", "vehicle", carId, env.dataMode],
    enabled: Boolean(carId),
    queryFn: async () => {
      return env.dataMode === "live"
        ? await listRemindersByCarId(carId)
        : getMockVehicleReminders(carId).map(normalizeMockReminder);
    },
  });
}

export function useCreateReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReminder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}

export function useDeleteReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReminder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}

export function useCompleteReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeReminder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}