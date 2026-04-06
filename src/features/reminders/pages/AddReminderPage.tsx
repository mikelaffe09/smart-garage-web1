import { FormEvent, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVehicles } from "@/features/vehicles/hooks";
import { useCreateReminder } from "@/features/reminders/hooks";

export function AddReminderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const vehiclesQuery = useVehicles();
  const createReminderMutation = useCreateReminder();

  const vehicles = vehiclesQuery.data ?? [];
  const initialCarId = searchParams.get("carId") ?? "";

  const [carId, setCarId] = useState(initialCarId);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueMileage, setDueMileage] = useState("");

  const selectedVehicle = useMemo(() => {
    return (
      vehicles.find((vehicle) => String(vehicle.id) === String(carId)) ?? null
    );
  }, [vehicles, carId]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!carId || !title.trim()) {
      window.alert("Select a vehicle and enter a title first.");
      return;
    }

    try {
      await createReminderMutation.mutateAsync({
        carId,
        title: title.trim(),
        notes: notes.trim(),
        dueDate: dueDate || null,
        dueMileage: dueMileage ? Number(dueMileage) : null,
      });

      navigate("/app/reminders");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create reminder.";
      window.alert(message);
    }
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">
          Add Reminder
        </h2>
        <p className="mt-2 text-sm leading-7 text-white/75">
          Set a maintenance reminder for a vehicle.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6"
      >
        {vehiclesQuery.isLoading ? (
          <div className="text-sm text-[#eaf2ff]">Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div className="rounded-2xl bg-white/10 p-4 text-sm text-white">
            You need at least one vehicle before adding a reminder.
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
                  Vehicle
                </label>
                <select
                  value={carId}
                  onChange={(event) => setCarId(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
                >
                  <option value="">Select vehicle...</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.vehicleName}
                    </option>
                  ))}
                </select>

                {selectedVehicle ? (
                  <div className="mt-2 text-xs text-[#eaf2ff]">
                    Selected: {selectedVehicle.year}{" "}
                    {selectedVehicle.vehicleName}
                  </div>
                ) : null}
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
                  placeholder="Anything you want to remember..."
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
                disabled={createReminderMutation.isPending}
                className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
              >
                {createReminderMutation.isPending ? "Saving..." : "Save Reminder"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}