import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { mockVehicles } from "@/features/vehicles/mockData";
import { getExpensesByCarId } from "@/features/expenses/mockData";

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
  const carsWithExpenses = mockVehicles.filter(
    (vehicle) => getExpensesByCarId(vehicle.id).length > 0
  );

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] ring-1 ring-white/8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">Cost Tracking</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#FF8A00] sm:text-4xl">
            Expenses
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Review maintenance, repairs, and appearance-related spending across all vehicles.
          </p>
        </div>

        <Link
          to="/app/expenses/new"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#506caa] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(80,108,170,0.25)] transition hover:brightness-95"
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </Link>
      </section>

      <section className="space-y-4">
        {carsWithExpenses.map((vehicle) => {
          const expenses = getExpensesByCarId(vehicle.id);
          const total = expenses.reduce((sum, item) => sum + item.amount, 0);

          return (
            <div
              key={vehicle.id}
              className="rounded-[22px] border border-white/10 bg-[#506caa] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[18px] font-extrabold text-[#111827]">
                    {vehicle.year} {vehicle.vehicleName}
                  </div>
                  <div className="mt-1 text-sm text-[#0b1220]/75">
                    Total: {formatCurrency(total)}
                  </div>
                </div>

                <Link
                  to={`/app/expenses/new?carId=${vehicle.id}`}
                  className="inline-flex rounded-xl border border-white/70 bg-white px-4 py-2 text-sm font-bold text-[#111827] transition hover:bg-[#f3f4f6]"
                >
                  Add for this vehicle
                </Link>
              </div>

              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex flex-col gap-4 rounded-[18px] border border-[#E5E7EB] bg-white p-4 lg:flex-row lg:items-start lg:justify-between"
                  >
                    <div>
                      <div className="text-sm font-extrabold text-[#111827]">
                        {expense.note}
                      </div>
                      <div className="mt-1 text-xs text-[#6b7280]">
                        {CATEGORY_LABEL[expense.category]} • {formatDate(expense.expenseDate)}
                      </div>
                      {expense.mileage ? (
                        <div className="mt-1 text-xs text-[#6b7280]">
                          Mileage: {expense.mileage.toLocaleString()} km
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col items-start gap-3 lg:items-end">
                      <div className="text-sm font-extrabold text-[#111827]">
                        {formatCurrency(expense.amount)}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/app/expenses/new?carId=${vehicle.id}`}
                          className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-bold text-[#111827] transition hover:bg-[#f9fafb]"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-bold text-[#111827] transition hover:bg-[#fef2f2]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}