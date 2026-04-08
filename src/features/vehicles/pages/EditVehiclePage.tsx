import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useResolvedVehicleDoc,
  useUpdateVehicle,
  useVehicle,
  useVehicleMakes,
  useVehicleModels,
  useVehicleYears,
} from "@/features/vehicles/hooks";
import { useToast } from "@/shared/toast/useToast";

function splitVehicleName(vehicleName: string) {
  const parts = String(vehicleName || "").trim().split(" ").filter(Boolean);

  if (parts.length <= 1) {
    return {
      make: parts[0] || "",
      model: "",
    };
  }

  return {
    make: parts[0],
    model: parts.slice(1).join(" "),
  };
}

function withCurrentStringOption(options: string[], current: string) {
  if (!current) return options;
  return options.includes(current) ? options : [current, ...options];
}

function withCurrentYearOption(options: number[], current: string) {
  const currentYear = Number(current);
  if (!currentYear) return options;
  return options.includes(currentYear) ? options : [currentYear, ...options];
}

export function EditVehiclePage() {
  const { carId = "" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const vehicleQuery = useVehicle(carId);
  const updateVehicleMutation = useUpdateVehicle();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const makesQuery = useVehicleMakes();
  const modelsQuery = useVehicleModels(make);
  const yearsQuery = useVehicleYears(make, model);
  const resolvedQuery = useResolvedVehicleDoc(make, model, year);

  const vehicle = vehicleQuery.data;

  useEffect(() => {
    if (!vehicle) return;

    const parsed = splitVehicleName(vehicle.vehicleName);

    setMake(parsed.make);
    setModel(parsed.model);
    setYear(String(vehicle.year ?? ""));
    setMileage(String(vehicle.mileage ?? ""));
  }, [vehicle]);

  const makeOptions = useMemo(
    () => withCurrentStringOption(makesQuery.data ?? [], make),
    [makesQuery.data, make]
  );

  const modelOptions = useMemo(
    () => withCurrentStringOption(modelsQuery.data ?? [], model),
    [modelsQuery.data, model]
  );

  const yearOptions = useMemo(
    () => withCurrentYearOption(yearsQuery.data ?? [], year),
    [yearsQuery.data, year]
  );

  if (!vehicleQuery.isLoading && !vehicle) {
    return <Navigate to="/app/vehicles" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!vehicle || !make || !model || !year || !mileage) {
      showToast({
        title: "Missing fields",
        description: "Fill in make, model, year, and mileage first.",
        variant: "error",
      });
      return;
    }

    try {
      const resolved = resolvedQuery.data;

      await updateVehicleMutation.mutateAsync({
        carId: String(vehicle.id),
        input: {
          vehicleKey: resolved?.vehicleKey ?? "",
          vehicleName: `${make} ${model}`.trim(),
          year: Number(year),
          mileage: Number(mileage),
          imageUrl: vehicle.imageUrl ?? null,
        },
      });

      showToast({
        title: "Vehicle updated",
        description: "Your vehicle changes were saved successfully.",
        variant: "success",
      });

      navigate(`/app/vehicles/${vehicle.id}`);
    } catch (error) {
      showToast({
        title: "Failed to update vehicle",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    }
  }

  if (vehicleQuery.isLoading || makesQuery.isLoading) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
        Loading vehicle...
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">
          Edit Vehicle
        </h2>
        <p className="mt-2 text-sm leading-7 text-white/75">
          Update the vehicle details for this car.
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
              {makeOptions.map((item) => (
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
              {yearOptions.map((item) => (
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
            onClick={() => navigate(`/app/vehicles/${carId}`)}
            className="h-12 flex-1 rounded-2xl border border-white/70 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateVehicleMutation.isPending}
            className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
          >
            {updateVehicleMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}