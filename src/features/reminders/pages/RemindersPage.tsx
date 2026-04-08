import { Link } from "react-router-dom";
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";
import { useVehicles } from "@/features/vehicles/hooks";
import {
  useCompleteReminder,
  useDeleteReminder,
  useReminders,
} from "@/features/reminders/hooks";
import { PageIntro, StateCard } from "@/shared/ui/page";

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
    return "bg-red-50 text-red-700 ring-1 ring-red-200";
  }

  if (status === "Completed") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  }

  return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
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
    } catch {
      // handled by mutation state / existing UX
    }
  }

  async function handleComplete(id: string) {
    try {
      await completeReminderMutation.mutateAsync(id);
    } catch {
      // handled by mutation state / existing UX
    }
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageIntro
        eyebrow="Maintenance"
        title="Reminders"
        description="Stay ahead of service intervals, overdue jobs, and upcoming maintenance."
        action={
          <Link
            to="/app/reminders/new"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#506caa] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(80,108,170,0.25)] transition hover:brightness-95"
          >
            <Plus className="h-4 w-4" />
            Add Reminder
          </Link>
        }
      />

      {remindersQuery.isLoading || vehiclesQuery.isLoading ? (
        <StateCard variant="loading" description="Loading your reminders..." />
      ) : remindersQuery.isError ? (
        <StateCard
          variant="error"
          title="Failed to load reminders"
          description="Your reminder data could not be loaded right now."
        />
      ) : reminders.length === 0 ? (
        <StateCard
          variant="empty"
          title="No reminders yet"
          description="Add your first reminder to stay ahead of vehicle maintenance."
        />
      ) : (
        <section className="space-y-4">
          {reminders.map((reminder) => {
            const vehicle = vehicleMap.get(String(reminder.carId));

            return (
              <div
                key={reminder.id}
                className="rounded-[26px] border border-white/10 bg-[#506caa] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.16)] sm:p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-[#FF8A00] shadow-sm">
                        <CalendarClock className="h-5 w-5" />
                      </div>

                      <h3 className="text-[22px] font-extrabold leading-tight text-[#111827]">
                        {reminder.title}
                      </h3>

                      <div
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ${getStatusClasses(
                          reminder.status
                        )}`}
                      >
                        {reminder.status}
                      </div>
                    </div>

                    <div className="mt-3 text-sm font-semibold text-[#0b1220]/80">
                      {vehicle
                        ? `${vehicle.year} ${vehicle.vehicleName}`
                        : "Unknown vehicle"}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-2xl bg-white/85 px-4 py-3 shadow-sm ring-1 ring-white/70">
                        <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#6b7280]">
                          Due date
                        </div>
                        <div className="mt-1 text-sm font-bold text-[#111827]">
                          {formatDate(reminder.dueDate)}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/85 px-4 py-3 shadow-sm ring-1 ring-white/70">
                        <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#6b7280]">
                          Due mileage
                        </div>
                        <div className="mt-1 text-sm font-bold text-[#111827]">
                          {reminder.dueMileage
                            ? `${Number(reminder.dueMileage).toLocaleString()} km`
                            : "Not set"}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#10253d] px-4 py-3 text-white shadow-sm ring-1 ring-white/10">
                        <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/55">
                          Vehicle dashboard
                        </div>
                        <Link
                          to={vehicle ? `/app/vehicles/${vehicle.id}` : "/app/vehicles"}
                          className="mt-1 inline-flex items-center gap-2 text-sm font-extrabold text-white transition hover:text-[#FF8A00]"
                        >
                          Open vehicle
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {reminder.notes ? (
                      <div className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm leading-7 text-[#374151] shadow-sm ring-1 ring-white/70">
                        {reminder.notes}
                      </div>
                    ) : null}
                  </div>

                  <div className="xl:w-[220px] xl:shrink-0">
                    <div className="rounded-[22px] bg-[#10253d] p-3 ring-1 ring-white/10">
                      <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/45">
                        Actions
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link
                          to={`/app/reminders/${reminder.id}/edit`}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#111827] ring-1 ring-[#e5e7eb] transition hover:bg-[#f3f4f6]"
                        >
                          <Pencil className="h-4 w-4 text-[#111827]" />
                          <span className="text-[#111827]">Edit</span>
                        </Link>

                        {!reminder.isCompleted ? (
                          <button
                            type="button"
                            onClick={() => handleComplete(reminder.id)}
                            disabled={completeReminderMutation.isPending}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#fff7ed] px-4 text-sm font-bold text-[#111827] ring-1 ring-[#fed7aa] transition hover:bg-[#ffedd5] disabled:opacity-70"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Complete
                          </button>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => handleDelete(reminder.id, reminder.title)}
                          disabled={deleteReminderMutation.isPending}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#111827] ring-1 ring-red-200 transition hover:bg-[#fef2f2] disabled:opacity-70"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
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