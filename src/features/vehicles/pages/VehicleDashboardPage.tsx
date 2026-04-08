import { Bot, CalendarClock, DollarSign, Pencil, Trash2 } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ReminderPreviewCard } from "@/features/vehicles/components/ReminderPreviewCard";
import { useDeleteVehicle, useVehicle } from "@/features/vehicles/hooks";
import { useVehicleReminders } from "@/features/reminders/hooks";
import { useVehicleExpenses } from "@/features/expenses/hooks";
import type { ReminderItem } from "@/features/reminders/api";
import type { ExpenseItem } from "@/features/expenses/types";
import { StateCard } from "@/shared/ui/page";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function VehicleDashboardPage() {
  const { carId = "" } = useParams();
  const navigate = useNavigate();

  const vehicleQuery = useVehicle(carId);
  const remindersQuery = useVehicleReminders(carId);
  const expensesQuery = useVehicleExpenses(carId);
  const deleteVehicleMutation = useDeleteVehicle();

  const vehicle = vehicleQuery.data;
  const reminders: ReminderItem[] = remindersQuery.data ?? [];
  const expenses: ExpenseItem[] = expensesQuery.data ?? [];

  const totalExpenses = expenses.reduce(
    (sum: number, item: ExpenseItem) => sum + Number(item.amount || 0),
    0
  );

  if (!vehicleQuery.isLoading && !vehicle) {
    return <Navigate to="/app/vehicles" replace />;
  }

  async function handleDelete() {
    if (!vehicle) return;

    const confirmed = window.confirm(
      `Delete ${vehicle.year} ${vehicle.vehicleName}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteVehicleMutation.mutateAsync(String(vehicle.id));
      navigate("/app/vehicles", { replace: true });
    } catch {
      // handled elsewhere with toasts if added later
    }
  }

  if (vehicleQuery.isLoading || !vehicle) {
    return (
      <StateCard
        variant="loading"
        description="Loading vehicle dashboard..."
      />
    );
  }

  const hasAiSupport = Boolean(
    vehicle.vehicleKey &&
      String(vehicle.vehicleKey).trim() !== "" &&
      vehicle.vehicleKey !== "generic"
  );

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <section className="rounded-[28px] border border-white/10 bg-[#25324d] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] sm:p-6">
        <h2 className="text-[28px] font-extrabold tracking-tight text-[#FF8A00]">
          {vehicle.year} {vehicle.vehicleName}
        </h2>
        <p className="mt-2 text-sm text-[#e2e8f0]">
          Mileage: {Number(vehicle.mileage || 0).toLocaleString()} km
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/app/vehicles/${vehicle.id}/chat`}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95"
          >
            <Bot className="h-4 w-4" />
            Ask AI
          </Link>

          <Link
            to={`/app/vehicles/${vehicle.id}/edit`}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B1220] px-5 text-sm font-extrabold text-white transition hover:opacity-95"
          >
            <Pencil className="h-4 w-4" />
            Update
          </Link>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteVehicleMutation.isPending}
          className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/8 disabled:opacity-70"
        >
          <Trash2 className="h-4 w-4" />
          {deleteVehicleMutation.isPending ? "Deleting..." : "Delete Vehicle"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#dbeafe]">
          {hasAiSupport
            ? "This vehicle supports AI-backed answers using a real catalog match."
            : "This is a custom vehicle. Vehicle-specific AI support is not available for it yet."}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-[#e5e7eb] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
              Total Expenses
            </span>
            <DollarSign className="h-5 w-5 text-[#FF8A00]" />
          </div>

          <div className="mt-4 text-3xl font-extrabold">
            {expensesQuery.isLoading ? "—" : formatCurrency(totalExpenses)}
          </div>
          <div className="mt-2 text-sm text-[#374151]">
            {expenses.length} transaction{expenses.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#e5e7eb] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
              Reminders
            </span>
            <CalendarClock className="h-5 w-5 text-[#FF8A00]" />
          </div>

          <div className="mt-4 text-3xl font-extrabold">
            {remindersQuery.isLoading ? "—" : reminders.length}
          </div>
          <div className="mt-2 text-sm text-[#374151]">
            Open this vehicle’s reminders
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold">Upcoming / Overdue Reminders</h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              Quick view of this vehicle’s reminder status.
            </p>
          </div>

          <Link
            to="/app/reminders"
            className="rounded-xl bg-[#fff7ed] px-4 py-2 text-sm font-bold text-[#FF8A00] transition hover:bg-[#ffedd5]"
          >
            View all
          </Link>
        </div>

        {remindersQuery.isLoading ? (
          <StateCard
            variant="loading"
            description="Loading reminders for this vehicle..."
          />
        ) : remindersQuery.isError ? (
          <StateCard
            variant="error"
            title="Failed to load reminders"
            description="This vehicle’s reminders could not be loaded."
          />
        ) : reminders.length === 0 ? (
          <StateCard
            variant="empty"
            title="No reminders for this vehicle"
            description="Add a reminder to start tracking upcoming work."
          />
        ) : (
          <div className="space-y-3">
            {reminders.slice(0, 3).map((reminder: ReminderItem) => (
              <ReminderPreviewCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
        <h3 className="text-lg font-extrabold">Quick Actions</h3>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <Link
            to={`/app/expenses/new?carId=${vehicle.id}`}
            className="rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-4 text-sm font-extrabold transition hover:bg-[#e5e7eb]"
          >
            Add Expense
          </Link>

          <Link
            to={`/app/reminders/new?carId=${vehicle.id}`}
            className="rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-4 text-sm font-extrabold transition hover:bg-[#e5e7eb]"
          >
            Add Reminder
          </Link>

          <Link
            to={`/app/vehicles/${vehicle.id}/chat`}
            className="rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-4 text-sm font-extrabold transition hover:bg-[#e5e7eb]"
          >
            Open AI Chat
          </Link>

          <Link
            to={`/app/vehicles/${vehicle.id}/edit`}
            className="rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-4 text-sm font-extrabold transition hover:bg-[#e5e7eb]"
          >
            Edit Vehicle
          </Link>
        </div>
      </section>
    </div>
  );
}