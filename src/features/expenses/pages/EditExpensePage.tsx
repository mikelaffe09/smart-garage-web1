import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useVehicles } from "@/features/vehicles/hooks";
import { useExpenses, useUpdateExpense } from "@/features/expenses/hooks";
import { useToast } from "@/shared/toast/useToast";
import type { ExpenseCategory } from "@/features/expenses/types";

const CATEGORIES: { label: string; value: ExpenseCategory }[] = [
  { label: "Routine Maintenance", value: "ROUTINE" },
  { label: "Major Repair", value: "MAJOR" },
  { label: "Appearance & Upgrades", value: "APPEARANCE" },
];

export function EditExpensePage() {
  const { expenseId = "" } = useParams();
  const navigate = useNavigate();

  const expensesQuery = useExpenses();
  const vehiclesQuery = useVehicles();
  const updateExpenseMutation = useUpdateExpense();
  const { showToast } = useToast();

  const expenses = expensesQuery.data ?? [];
  const vehicles = vehiclesQuery.data ?? [];

  const expense =
    expenses.find((item) => String(item.id) === String(expenseId)) ?? null;

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("ROUTINE");
  const [mileage, setMileage] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  useEffect(() => {
    if (!expense) return;

    setNote(expense.note ?? "");
    setAmount(String(expense.amount ?? ""));
    setCategory(expense.category);
    setMileage(expense.mileage ? String(expense.mileage) : "");
    setExpenseDate(
      expense.expenseDate ? String(expense.expenseDate).slice(0, 10) : ""
    );
  }, [expense]);

  const vehicle = useMemo(() => {
    if (!expense) return null;
    return vehicles.find((item) => String(item.id) === String(expense.carId)) ?? null;
  }, [vehicles, expense]);

  if (!expensesQuery.isLoading && !expense) {
    return <Navigate to="/app/expenses" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!expense || !note.trim() || !amount.trim() || !mileage.trim() || !expenseDate) {
      showToast({
        title: "Missing fields",
        description: "Fill in note, amount, mileage, and expense date first.",
        variant: "error",
      });
      return;
    }

    try {
      await updateExpenseMutation.mutateAsync({
        id: String(expense.id),
        input: {
          category,
          amount: Number(amount),
          currency: "USD",
          note: note.trim(),
          expenseDate,
          mileage: Number(mileage),
        },
      });

      showToast({
        title: "Expense updated",
        description: "Your expense changes were saved successfully.",
        variant: "success",
      });

      navigate("/app/expenses");
    } catch (error) {
      showToast({
        title: "Failed to update expense",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    }
  }

  if (expensesQuery.isLoading || vehiclesQuery.isLoading) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
        Loading expense...
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">
          Edit Expense
        </h2>
        <p className="mt-2 text-sm leading-7 text-white/75">
          Update this expense entry.
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
              onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
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
              onChange={(event) => setMileage(event.target.value.replace(/[^\d]/g, ""))}
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
            disabled={updateExpenseMutation.isPending}
            className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
          >
            {updateExpenseMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}