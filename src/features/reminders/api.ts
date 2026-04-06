import { apiFetch } from "@/shared/api/client";

export type ReminderStatus = "Upcoming" | "Overdue" | "Completed";

export type ReminderItem = {
  id: string;
  carId: string;
  title: string;
  notes?: string | null;
  dueDate?: string | null;
  dueMileage?: number | null;
  isCompleted: boolean;
  completedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  status: ReminderStatus;
};

export type SaveReminderInput = {
  carId: string;
  title: string;
  notes?: string;
  dueDate?: string | null;
  dueMileage?: number | null;
};

function deriveStatus(
  isCompleted: boolean,
  dueDate?: string | null
): ReminderStatus {
  if (isCompleted) return "Completed";

  if (dueDate) {
    const due = new Date(dueDate);
    const now = new Date();

    if (!Number.isNaN(due.getTime()) && due.getTime() < now.getTime()) {
      return "Overdue";
    }
  }

  return "Upcoming";
}

function normalizeReminder(item: any): ReminderItem {
  const dueDate = item?.dueDate ? String(item.dueDate) : null;
  const isCompleted = Boolean(item?.isCompleted);

  return {
    id: String(item?.id ?? ""),
    carId: String(item?.carId ?? ""),
    title: String(item?.title ?? ""),
    notes: item?.notes ?? null,
    dueDate,
    dueMileage:
      typeof item?.dueMileage === "number"
        ? item.dueMileage
        : item?.dueMileage != null
        ? Number(item.dueMileage)
        : null,
    isCompleted,
    completedAt: item?.completedAt ?? null,
    createdAt: item?.createdAt ?? null,
    updatedAt: item?.updatedAt ?? null,
    status: deriveStatus(isCompleted, dueDate),
  };
}

export async function listReminders() {
  const result = await apiFetch<any[]>("/api/reminders");
  return Array.isArray(result) ? result.map(normalizeReminder) : [];
}

export async function listRemindersByCarId(carId: string) {
  const all = await listReminders();
  return all.filter((item) => String(item.carId) === String(carId));
}

export async function createReminder(input: SaveReminderInput) {
  return apiFetch<unknown>("/api/reminders", {
    method: "POST",
    body: {
      carId: input.carId,
      title: input.title.trim(),
      notes: input.notes?.trim() || null,
      dueDate: input.dueDate || null,
      dueMileage: input.dueMileage ?? null,
    },
  });
}

export async function updateReminder(
  id: string,
  input: Partial<SaveReminderInput> & { isCompleted?: boolean }
) {
  return apiFetch<unknown>(`/api/reminders/${id}`, {
    method: "PUT",
    body: {
      title: input.title,
      notes: input.notes,
      dueDate: input.dueDate,
      dueMileage: input.dueMileage,
      isCompleted: input.isCompleted,
    },
  });
}

export async function deleteReminder(id: string) {
  return apiFetch<unknown>(`/api/reminders/${id}`, {
    method: "DELETE",
  });
}

export async function completeReminder(id: string) {
  return apiFetch<unknown>(`/api/reminders/${id}/complete`, {
    method: "POST",
  });
}