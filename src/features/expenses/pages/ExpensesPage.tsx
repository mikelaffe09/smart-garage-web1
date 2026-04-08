import { Link } from "react-router-dom";
import {
  ChevronRight,
  DollarSign,
  Pencil,
  Plus,
  ReceiptText,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";
import { useVehicles } from "@/features/vehicles/hooks";
import { useDeleteExpense, useExpenses } from "@/features/expenses/hooks";
import type { ExpenseItem } from "@/features/expenses/types";
import { PageIntro, StateCard } from "@/shared/ui/page";

const CATEGORY_LABEL = {
  ROUTINE: "Routine Maintenance",
  MAJOR: "Major Repair",
  APPEARANCE: "Appearance & Upgrades",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(input: string) {
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

export function ExpensesPage() {
  const vehiclesQuery = useVehicles();
  const expensesQuery = useExpenses();
  const deleteExpenseMutation = useDeleteExpense();

  const vehicles = vehiclesQuery.data ?? [];
  const expenses: ExpenseItem[] = expensesQuery.data ?? [];

  const grouped = useMemo(() => {
    const byCar = new Map<string, ExpenseItem[]>();

    expenses.forEach((expense: ExpenseItem) => {
      const key = String(expense.carId);
      const existing = byCar.get(key) ?? [];
      existing.push(expense);
      byCar.set(key, existing);
    });

    return Array.from(byCar.entries()).map(([carId, items]) => {
      const vehicle =
        vehicles.find((vehicle) => String(vehicle.id) === String(carId)) ?? null;

      const total = items.reduce(
        (sum: number, item: ExpenseItem) => sum + Number(item.amount || 0),
        0
      );

      return {
        carId,
        vehicle,
        total,
        items: items.sort((a, b) => {
          const da = new Date(a.expenseDate).getTime();
          const db = new Date(b.expenseDate).getTime();
          return db - da;
        }),
      };
    });
  }, [expenses, vehicles]);

  async function handleDelete(id: string, note: string) {
    const confirmed = window.confirm(`Delete expense "${note}"?`);
    if (!confirmed) return;

    try {
      await deleteExpenseMutation.mutateAsync(id);
    } catch {
      // handled by mutation state / existing UX
    }
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageIntro
        eyebrow="Cost Tracking"
        title="Expenses"
        description="Review maintenance, repairs, and appearance-related spending across all vehicles."
        action={
          <Link
            to="/app/expenses/new"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#506caa] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(80,108,170,0.25)] transition hover:brightness-95"
          >
            <Plus className="h-4 w-4" />
            Add Expense
          </Link>
        }
      />

      {expensesQuery.isLoading || vehiclesQuery.isLoading ? (
        <StateCard variant="loading" description="Loading your expenses..." />
      ) : expensesQuery.isError ? (
        <StateCard
          variant="error"
          title="Failed to load expenses"
          description="Your expense data could not be loaded right now."
        />
      ) : grouped.length === 0 ? (
        <StateCard
          variant="empty"
          title="No expenses yet"
          description="Add your first expense to start tracking vehicle costs."
        />
      ) : (
        <section className="space-y-5">
          {grouped.map((group) => (
            <div
              key={group.carId}
              className="rounded-[26px] border border-white/10 bg-[#506caa] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.16)] sm:p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-[#FF8A00] shadow-sm">
                      <ReceiptText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-[24px] font-extrabold leading-tight text-[#111827]">
                        {group.vehicle
                          ? `${group.vehicle.year} ${group.vehicle.vehicleName}`
                          : "Unknown vehicle"}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#0b1220]/70">
                        {group.items.length} expense{group.items.length === 1 ? "" : "s"} logged
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-white/70">
                      <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#6b7280]">
                        <DollarSign className="h-4 w-4 text-[#FF8A00]" />
                        Total spent
                      </div>
                      <div className="mt-1 text-[22px] font-extrabold text-[#111827]">
                        {formatCurrency(group.total)}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#10253d] px-4 py-3 text-white shadow-sm ring-1 ring-white/10">
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/55">
                        Vehicle dashboard
                      </div>
                      <Link
                        to={group.vehicle ? `/app/vehicles/${group.vehicle.id}` : "/app/vehicles"}
                        className="mt-1 inline-flex items-center gap-2 text-sm font-extrabold text-white transition hover:text-[#FF8A00]"
                      >
                        Open vehicle
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <div className="rounded-2xl bg-white/85 px-4 py-3 shadow-sm ring-1 ring-white/70">
                      <Link
                        to={`/app/expenses/new?carId=${group.carId}`}
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#fff7ed] px-4 text-sm font-bold text-[#111827] ring-1 ring-[#fed7aa] shadow-sm transition hover:bg-[#ffedd5]"
                      >
                        <span className="text-[#111827]">Add for this vehicle</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {group.items.map((expense: ExpenseItem) => (
                  <div
                    key={expense.id}
                    className="flex flex-col gap-4 rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-sm lg:flex-row lg:items-start lg:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-extrabold text-[#111827]">
                          {expense.note}
                        </h4>

                        <div className="inline-flex rounded-full bg-[#f8fafc] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#475569] ring-1 ring-[#e5e7eb]">
                          {CATEGORY_LABEL[expense.category]}
                        </div>
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
                          <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#6b7280]">
                            Date
                          </div>
                          <div className="mt-1 text-sm font-bold text-[#111827]">
                            {formatDate(expense.expenseDate)}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
                          <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#6b7280]">
                            Mileage
                          </div>
                          <div className="mt-1 text-sm font-bold text-[#111827]">
                            {expense.mileage
                              ? `${Number(expense.mileage).toLocaleString()} km`
                              : "Not set"}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-[#fff7ed] px-4 py-3 ring-1 ring-[#fed7aa]">
                          <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#9a3412]">
                            Amount
                          </div>
                          <div className="mt-1 text-lg font-extrabold text-[#111827]">
                            {formatCurrency(expense.amount)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-[200px] lg:shrink-0">
                      <div className="rounded-[22px] bg-[#10253d] p-3 ring-1 ring-white/10">
                        <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/45">
                          Actions
                        </div>

                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/app/expenses/${expense.id}/edit`}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#111827] ring-1 ring-[#e5e7eb] transition hover:bg-[#f3f4f6]"
                          >
                            <Pencil className="h-4 w-4 text-[#111827]" />
                            <span className="text-[#111827]">Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(expense.id, expense.note)}
                            disabled={deleteExpenseMutation.isPending}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#111827] ring-1 ring-red-200 transition hover:bg-[#fef2f2] disabled:opacity-70"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}