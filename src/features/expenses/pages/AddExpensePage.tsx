import { FormEvent, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVehicles } from "@/features/vehicles/hooks";
import { useCreateExpense } from "@/features/expenses/hooks";
import type { ExpenseCategory } from "@/features/expenses/types";

const CATEGORIES: { label: string; value: ExpenseCategory }[] = [
  { label: "Routine Maintenance", value: "ROUTINE" },
  { label: "Major Repair", value: "MAJOR" },
  { label: "Appearance & Upgrades", value: "APPEARANCE" },
];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function AddExpensePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const vehiclesQuery = useVehicles();
  const createExpenseMutation = useCreateExpense();

  const vehicles = vehiclesQuery.data ?? [];
  const initialCarId = searchParams.get("carId") ?? "";

  const [carId, setCarId] = useState(initialCarId);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("ROUTINE");
  const [mileage, setMileage] = useState("");
  const [expenseDate, setExpenseDate] = useState(todayIso());

  const selectedVehicle = useMemo(() => {
    return vehicles.find((vehicle) => String(vehicle.id) === String(carId)) ?? null;
  }, [vehicles, carId]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!carId || !note.trim() || !amount.trim() || !mileage.trim() || !expenseDate) {
      window.alert("Select a vehicle and fill in note, amount, mileage, and date.");
      return;
    }

    try {
      await createExpenseMutation.mutateAsync({
        carId,
        category,
        amount: Number(amount),
        currency: "USD",
        note: note.trim(),
        expenseDate,
        mileage: Number(mileage),
      });

      navigate("/app/expenses");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create expense.";
      window.alert(message);
    }
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">
          Add Expense
        </h2>
        <p className="mt-2 text-sm leading-7 text-white/75">
          Log maintenance, repair, or upgrade costs.
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
            You need at least one vehicle before adding an expense.
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
                    Selected: {selectedVehicle.year} {selectedVehicle.vehicleName}
                  </div>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
                  Note
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="e.g. Oil and filter change"
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
                  Amount
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value.replace(/[^\d.]/g, ""))
                  }
                  placeholder="e.g. 120"
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as ExpenseCategory)}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
                  Expense Date
                </label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(event) => setExpenseDate(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
                  Mileage
                </label>
                <input
                  type="text"
                  value={mileage}
                  onChange={(event) =>
                    setMileage(event.target.value.replace(/[^\d]/g, ""))
                  }
                  placeholder="e.g. 142000"
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/app/expenses")}
                className="h-12 flex-1 rounded-2xl border border-white/70 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={createExpenseMutation.isPending}
                className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
              >
                {createExpenseMutation.isPending ? "Saving..." : "Save Expense"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}