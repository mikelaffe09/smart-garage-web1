import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateVehicle, useVehicleCatalog } from "@/features/vehicles/hooks";

const fallbackCatalog = {
  Toyota: ["Corolla", "Camry", "Yaris", "RAV4"],
  Jeep: ["Cherokee", "Grand Cherokee", "Wrangler", "Compass"],
  BMW: ["X5", "X3", "320i", "520i"],
  Mercedes: ["C300", "E300", "GLE 350", "A200"],
};

export function AddVehiclePage() {
  const navigate = useNavigate();
  const catalogQuery = useVehicleCatalog();
  const createVehicleMutation = useCreateVehicle();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const catalogRows = catalogQuery.data ?? [];

  const makes = useMemo(() => {
    if (catalogRows.length > 0) {
      return [...new Set(catalogRows.map((item) => item.make))];
    }

    return Object.keys(fallbackCatalog);
  }, [catalogRows]);

  const modelOptions = useMemo(() => {
    if (!make) return [];

    if (catalogRows.length > 0) {
      return [...new Set(catalogRows.filter((item) => item.make === make).map((item) => item.model))];
    }

    return fallbackCatalog[make as keyof typeof fallbackCatalog] ?? [];
  }, [make, catalogRows]);

  const yearOptions = useMemo(() => {
    if (!make || !model) return [];

    if (catalogRows.length > 0) {
      const matchingRows = catalogRows.filter(
        (item) => item.make === make && item.model === model
      );

      const years = new Set<number>();

      matchingRows.forEach((row) => {
        for (let y = row.yearEnd; y >= row.yearStart; y -= 1) {
          years.add(y);
        }
      });

      return Array.from(years).sort((a, b) => b - a).map(String);
    }

    return Array.from({ length: 30 }, (_, index) => String(2026 - index));
  }, [make, model, catalogRows]);

  const selectedCatalogRow = useMemo(() => {
    const yearNumber = Number(year);
    if (!make || !model || !yearNumber || catalogRows.length === 0) return null;

    return (
      catalogRows.find(
        (item) =>
          item.make === make &&
          item.model === model &&
          yearNumber >= item.yearStart &&
          yearNumber <= item.yearEnd
      ) ?? null
    );
  }, [make, model, year, catalogRows]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!make || !model || !year || !mileage) {
      window.alert("Fill in make, model, year, and mileage first.");
      return;
    }

    try {
      const created = await createVehicleMutation.mutateAsync({
        vehicleKey: selectedCatalogRow?.vehicleKey || "",
        vehicleName: `${make} ${model}`.trim(),
        year: Number(year),
        mileage: Number(mileage),
        imageUrl: null,
      });

      navigate(`/app/vehicles/${created.id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create vehicle.";
      window.alert(message);
    }
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
                setYear("");
              }}
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
            >
              <option value="">Select make...</option>
              {makes.map((item) => (
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
              onChange={(event) => {
                setModel(event.target.value);
                setYear("");
              }}
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
              <option value="">{model ? "Select year..." : "Select model first"}</option>
              {yearOptions.map((item) => (
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

        {createVehicleMutation.isPending ? (
          <div className="mt-4 text-sm text-[#eaf2ff]">Saving vehicle...</div>
        ) : null}

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
            disabled={createVehicleMutation.isPending}
            className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
          >
            {createVehicleMutation.isPending ? "Saving..." : "Save Vehicle"}
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-[#dbeafe]">
          Catalog-supported vehicles will get proper vehicle-specific AI support.
        </div>
      </form>
    </div>
  );
}