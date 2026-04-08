import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useVehicles } from "@/features/vehicles/hooks";
import { useReminders, useUpdateReminder } from "@/features/reminders/hooks";
import { useToast } from "@/shared/toast/useToast";

export function EditReminderPage() {
  const { reminderId = "" } = useParams();
  const navigate = useNavigate();

  const remindersQuery = useReminders();
  const vehiclesQuery = useVehicles();
  const updateReminderMutation = useUpdateReminder();
  const { showToast } = useToast();

  const reminders = remindersQuery.data ?? [];
  const vehicles = vehiclesQuery.data ?? [];

  const reminder =
    reminders.find((item) => String(item.id) === String(reminderId)) ?? null;

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueMileage, setDueMileage] = useState("");

  useEffect(() => {
    if (!reminder) return;

    setTitle(reminder.title ?? "");
    setNotes(reminder.notes ?? "");
    setDueDate(reminder.dueDate ? String(reminder.dueDate).slice(0, 10) : "");
    setDueMileage(reminder.dueMileage ? String(reminder.dueMileage) : "");
  }, [reminder]);

  const vehicle = useMemo(() => {
    if (!reminder) return null;
    return vehicles.find((item) => String(item.id) === String(reminder.carId)) ?? null;
  }, [vehicles, reminder]);

  if (!remindersQuery.isLoading && !reminder) {
    return <Navigate to="/app/reminders" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!reminder || !title.trim()) {
      showToast({
        title: "Missing fields",
        description: "Enter a title first.",
        variant: "error",
      });
      return;
    }

    try {
      await updateReminderMutation.mutateAsync({
        id: String(reminder.id),
        input: {
          title: title.trim(),
          notes: notes.trim(),
          dueDate: dueDate || null,
          dueMileage: dueMileage ? Number(dueMileage) : null,
          isCompleted: reminder.isCompleted,
        },
      });

      showToast({
        title: "Reminder updated",
        description: "Your reminder changes were saved successfully.",
        variant: "success",
      });

      navigate("/app/reminders");
    } catch (error) {
      showToast({
        title: "Failed to update reminder",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    }
  }

  if (remindersQuery.isLoading || vehiclesQuery.isLoading) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
        Loading reminder...
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">
          Edit Reminder
        </h2>
        <p className="mt-2 text-sm leading-7 text-white/75">
          Update this maintenance reminder.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Vehicle
            </label>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-medium text-[#111827]">
              {vehicle ? `${vehicle.year} ${vehicle.vehicleName}` : "Unknown vehicle"}
            </div>
            <div className="mt-2 text-xs text-[#eaf2ff]">
              Vehicle cannot be changed from the edit flow.
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Change oil"
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Due Mileage
            </label>
            <input
              type="text"
              value={dueMileage}
              onChange={(event) =>
                setDueMileage(event.target.value.replace(/[^\d]/g, ""))
              }
              placeholder="e.g. 150000"
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/app/reminders")}
            className="h-12 flex-1 rounded-2xl border border-white/70 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateReminderMutation.isPending}
            className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
          >
            {updateReminderMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}