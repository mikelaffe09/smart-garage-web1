import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const catalog: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "Yaris", "RAV4"],
  Jeep: ["Cherokee", "Grand Cherokee", "Wrangler", "Compass"],
  BMW: ["X5", "X3", "320i", "520i"],
  Mercedes: ["C300", "E300", "GLE 350", "A200"],
};

const years = Array.from({ length: 30 }, (_, index) => String(2026 - index));

export function AddVehiclePage() {
  const navigate = useNavigate();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const modelOptions = useMemo(() => {
    return make ? catalog[make] ?? [] : [];
  }, [make]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!make || !model || !year || !mileage) {
      window.alert("Fill in make, model, year, and mileage first.");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      navigate("/app/vehicles");
    }, 500);
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">
          Add Vehicle
        </h2>
        <p className="mt-2 text-sm leading-7 text-white/75">
          Add your car to manage reminders, expenses, and AI mechanic support.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6"
      >
        <div className="mb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0B1220]/80">
            Vehicle Info
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Make
            </label>
            <select
              value={make}
              onChange={(event) => {
                setMake(event.target.value);
                setModel("");
              }}
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
            >
              <option value="">Select make...</option>
              {Object.keys(catalog).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Model
            </label>
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
            >
              <option value="">{make ? "Select model..." : "Select make first"}</option>
              {modelOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Year
            </label>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
            >
              <option value="">Select year...</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
              Mileage (km)
            </label>
            <input
              type="text"
              value={mileage}
              onChange={(event) => setMileage(event.target.value.replace(/[^\d]/g, ""))}
              placeholder="142000"
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/app/vehicles")}
            className="h-12 flex-1 rounded-2xl border border-white/70 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Save Vehicle"}
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-[#dbeafe]">
          Tip: catalog-matched vehicles will later support vehicle-specific AI answers.
        </div>
      </form>
    </div>
  );
}