import { ArrowRight, Bot, CalendarClock, CarFront, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import type { Vehicle } from "@/features/vehicles/types";
import { useVehicleExpenses } from "@/features/expenses/hooks";
import { useVehicleReminders } from "@/features/reminders/hooks";

function formatMileage(value: number | null | undefined) {
  return `${Number(value || 0).toLocaleString()} km`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const remindersQuery = useVehicleReminders(String(vehicle.id));
  const expensesQuery = useVehicleExpenses(String(vehicle.id));

  const reminders = remindersQuery.data ?? [];
  const expenses = expensesQuery.data ?? [];

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const hasAiSupport = Boolean(
    vehicle.vehicleKey &&
      String(vehicle.vehicleKey).trim() !== "" &&
      vehicle.vehicleKey !== "generic"
  );

  return (
    <Link
      to={`/app/vehicles/${vehicle.id}`}
      className="group block rounded-[26px] border border-white/10 bg-white p-5 text-[#111827] shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#FF8A00]">
              <CarFront className="h-5 w-5" />
            </div>

            <div className="inline-flex rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em]">
              {vehicle.year}
            </div>
          </div>

          <h3 className="truncate text-[22px] font-extrabold leading-tight text-[#111827]">
            {vehicle.vehicleName}
          </h3>

          <p className="mt-2 text-sm text-[#6b7280]">
            Mileage: <span className="font-semibold text-[#374151]">{formatMileage(vehicle.mileage)}</span>
          </p>
        </div>

        <div className="shrink-0">
          <div
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em]",
              hasAiSupport
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
            ].join(" ")}
          >
            <Bot className="h-3.5 w-3.5" />
            {hasAiSupport ? "AI Ready" : "Custom"}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#6b7280]">
            <CalendarClock className="h-4 w-4 text-[#FF8A00]" />
            Reminders
          </div>
          <div className="mt-2 text-lg font-extrabold text-[#111827]">
            {remindersQuery.isLoading ? "—" : reminders.length}
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#6b7280]">
            <DollarSign className="h-4 w-4 text-[#FF8A00]" />
            Expenses
          </div>
          <div className="mt-2 text-lg font-extrabold text-[#111827]">
            {expensesQuery.isLoading ? "—" : formatCurrency(totalExpenses)}
          </div>
        </div>

        <div className="rounded-2xl bg-[#10253d] px-4 py-3 text-white ring-1 ring-white/8">
          <div className="text-xs font-extrabold uppercase tracking-[0.08em] text-white/55">
            Dashboard
          </div>
          <div className="mt-2 flex items-center justify-between text-sm font-extrabold">
            <span>Open vehicle</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}