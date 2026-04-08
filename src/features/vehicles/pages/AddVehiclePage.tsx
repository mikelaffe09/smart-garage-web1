import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateVehicle,
  useResolvedVehicleDoc,
  useVehicleMakes,
  useVehicleModels,
  useVehicleYears,
} from "@/features/vehicles/hooks";
import { useToast } from "@/shared/toast/useToast";

export function AddVehiclePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const createVehicleMutation = useCreateVehicle();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const makesQuery = useVehicleMakes();
  const modelsQuery = useVehicleModels(make);
  const yearsQuery = useVehicleYears(make, model);
  const resolvedQuery = useResolvedVehicleDoc(make, model, year);

  const makes = useMemo(() => makesQuery.data ?? [], [makesQuery.data]);
  const models = useMemo(() => modelsQuery.data ?? [], [modelsQuery.data]);
  const years = useMemo(() => yearsQuery.data ?? [], [yearsQuery.data]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!make || !model || !year || !mileage) {
      showToast({
        title: "Missing fields",
        description: "Fill in make, model, year, and mileage first.",
        variant: "error",
      });
      return;
    }

    const resolved = resolvedQuery.data;

    if (!resolved?.vehicleKey) {
      showToast({
        title: "Unsupported vehicle",
        description:
          "The selected make, model, and year could not be resolved from the vehicle catalog.",
        variant: "error",
      });
      return;
    }

    try {
      const created = await createVehicleMutation.mutateAsync({
        vehicleKey: resolved.vehicleKey,
        vehicleName: `${make} ${model}`.trim(),
        year: Number(year),
        mileage: Number(mileage),
        imageUrl: null,
      });

      showToast({
        title: "Vehicle added",
        description: `${created.year} ${created.vehicleName} was added successfully.`,
        variant: "success",
      });

      navigate(`/app/vehicles/${created.id}`);
    } catch (error) {
      showToast({
        title: "Failed to create vehicle",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    }
  }

  const showCatalogProblem =
    !makesQuery.isLoading &&
    !makesQuery.isError &&
    (makesQuery.data ?? []).length === 0;

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
        {makesQuery.isLoading ? (
          <div className="rounded-2xl bg-white/10 p-4 text-sm text-white">
            Loading vehicle catalog...
          </div>
        ) : makesQuery.isError ? (
          <div className="rounded-2xl bg-red-100 p-4 text-sm text-red-700">
            Failed to load vehicle catalog.
          </div>
        ) : showCatalogProblem ? (
          <div className="rounded-2xl bg-white/10 p-4 text-sm text-white">
            No vehicle catalog data was found. The backend vehicle catalog endpoint returned no makes.
          </div>
        ) : (
          <>
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
                  disabled={!make || modelsQuery.isLoading}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] disabled:opacity-60"
                >
                  <option value="">
                    {!make
                      ? "Select make first"
                      : modelsQuery.isLoading
                      ? "Loading models..."
                      : "Select model..."}
                  </option>
                  {models.map((item) => (
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
                  disabled={!model || yearsQuery.isLoading}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] disabled:opacity-60"
                >
                  <option value="">
                    {!model
                      ? "Select model first"
                      : yearsQuery.isLoading
                      ? "Loading years..."
                      : "Select year..."}
                  </option>
                  {years.map((item) => (
                    <option key={item} value={String(item)}>
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
                  onChange={(event) =>
                    setMileage(event.target.value.replace(/[^\d]/g, ""))
                  }
                  placeholder="142000"
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
                />
              </div>
            </div>

            {year && resolvedQuery.isLoading ? (
              <div className="mt-4 text-sm text-[#eaf2ff]">
                Resolving vehicle key...
              </div>
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
          </>
        )}
      </form>
    </div>
  );
}