import { Link } from "react-router-dom";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useVehicles } from "@/features/vehicles/hooks";
import {
  useCompleteReminder,
  useDeleteReminder,
  useReminders,
} from "@/features/reminders/hooks";

function formatDate(input: string | null | undefined) {
  if (!input) return "No date";

  const date = new Date(input);

  if (Number.isNaN(date.getTime())) {
    return input;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getStatusClasses(status: string) {
  if (status === "Overdue") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (status === "Completed") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}

export function RemindersPage() {
  const remindersQuery = useReminders();
  const vehiclesQuery = useVehicles();
  const deleteReminderMutation = useDeleteReminder();
  const completeReminderMutation = useCompleteReminder();

  const reminders = remindersQuery.data ?? [];
  const vehicles = vehiclesQuery.data ?? [];

  const vehicleMap = useMemo(() => {
    return new Map(vehicles.map((vehicle) => [String(vehicle.id), vehicle]));
  }, [vehicles]);

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(`Delete reminder "${title}"?`);
    if (!confirmed) return;

    try {
      await deleteReminderMutation.mutateAsync(id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete reminder.";
      window.alert(message);
    }
  }

  async function handleComplete(id: string) {
    try {
      await completeReminderMutation.mutateAsync(id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to complete reminder.";
      window.alert(message);
    }
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] ring-1 ring-white/8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            Maintenance
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#FF8A00] sm:text-4xl">
            Reminders
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Stay ahead of service intervals, overdue jobs, and upcoming
            maintenance.
          </p>
        </div>

        <Link
          to="/app/reminders/new"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#506caa] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(80,108,170,0.25)] transition hover:brightness-95"
        >
          <Plus className="h-4 w-4" />
          Add Reminder
        </Link>
      </section>

      {remindersQuery.isLoading ? (
        <div className="rounded-[22px] border border-white/10 bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
          Loading reminders...
        </div>
      ) : remindersQuery.isError ? (
        <div className="rounded-[22px] border border-red-200 bg-red-50 p-5 text-red-700 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          Failed to load reminders.
        </div>
      ) : reminders.length === 0 ? (
        <div className="rounded-[22px] border border-dashed border-white/20 bg-[#0f2236] p-6 text-white/75">
          No reminders yet. Add your first reminder to get started.
        </div>
      ) : (
        <section className="space-y-4">
          {reminders.map((reminder) => {
            const vehicle = vehicleMap.get(String(reminder.carId));

            return (
              <div
                key={reminder.id}
                className="rounded-[22px] border border-white/10 bg-[#506caa] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-[18px] font-extrabold text-[#111827]">
                      {reminder.title}
                    </div>
                    <div className="mt-1 text-sm text-[#0b1220]/75">
                      {vehicle
                        ? `${vehicle.year} ${vehicle.vehicleName}`
                        : "Unknown vehicle"}
                    </div>
                    <div className="mt-3 text-sm text-[#0b1220]/75">
                      Due: {formatDate(reminder.dueDate)}
                    </div>
                    {reminder.dueMileage ? (
                      <div className="mt-1 text-sm text-[#0b1220]/75">
                        Due mileage:{" "}
                        {Number(reminder.dueMileage).toLocaleString()} km
                      </div>
                    ) : null}
                    {reminder.notes ? (
                      <div className="mt-2 text-sm text-[#0b1220]/70">
                        {reminder.notes}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <div
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${getStatusClasses(
                        reminder.status
                      )}`}
                    >
                      {reminder.status}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {!reminder.isCompleted ? (
                        <button
                          type="button"
                          onClick={() => handleComplete(reminder.id)}
                          disabled={completeReminderMutation.isPending}
                          className="inline-flex rounded-xl border border-white/70 bg-white px-4 py-2 text-sm font-bold text-[#111827] transition hover:bg-[#f3f4f6] disabled:opacity-70"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Complete
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(reminder.id, reminder.title)
                        }
                        disabled={deleteReminderMutation.isPending}
                        className="inline-flex rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-bold text-[#111827] transition hover:bg-[#fef2f2] disabled:opacity-70"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}