import { FormEvent, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateVehicle } from "@/features/vehicles/hooks";
import {
  listVehicleMakes,
  listVehicleModels,
  listVehicleYears,
  resolveVehicleDoc,
} from "@/features/vehicles/api";
import { useToast } from "@/shared/toast/useToast";
import { useMaintenanceRecommendations } from "@/features/maintenance/hooks";
import { MaintenanceSetupModal } from "@/features/maintenance/components/MaintenanceSetupModal";

type CreatedVehicleForSetup = {
  id: string;
  vehicleName: string;
  year: number;
};

export function AddVehiclePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const createVehicleMutation = useCreateVehicle();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const [createdVehicle, setCreatedVehicle] =
    useState<CreatedVehicleForSetup | null>(null);
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);

  const makesQuery = useQuery({
    queryKey: ["vehicle-makes"],
    queryFn: listVehicleMakes,
    staleTime: 5 * 60 * 1000,
  });

  const modelsQuery = useQuery({
    queryKey: ["vehicle-models", make],
    queryFn: () => listVehicleModels(make),
    enabled: Boolean(make),
    staleTime: 5 * 60 * 1000,
  });

  const yearsQuery = useQuery({
    queryKey: ["vehicle-years", make, model],
    queryFn: () => listVehicleYears(make, model),
    enabled: Boolean(make && model),
    staleTime: 5 * 60 * 1000,
  });

  const selectedYearNumber = year ? Number(year) : 0;

  const resolvedVehicleDocQuery = useQuery({
    queryKey: ["resolve-vehicle-doc", make, model, selectedYearNumber],
    queryFn: () => resolveVehicleDoc(make, model, selectedYearNumber),
    enabled: Boolean(make && model && selectedYearNumber),
    staleTime: 5 * 60 * 1000,
  });

  const maintenanceRecommendationsQuery = useMaintenanceRecommendations(
    createdVehicle?.id
  );

  const makes: string[] = useMemo(() => {
    return Array.isArray(makesQuery.data) ? makesQuery.data : [];
  }, [makesQuery.data]);

  const models: string[] = useMemo(() => {
    return Array.isArray(modelsQuery.data) ? modelsQuery.data : [];
  }, [modelsQuery.data]);

  const years: number[] = useMemo(() => {
    return Array.isArray(yearsQuery.data) ? yearsQuery.data : [];
  }, [yearsQuery.data]);

  const resolvedVehicleDoc = resolvedVehicleDocQuery.data ?? null;

  useEffect(() => {
    setModel("");
    setYear("");
  }, [make]);

  useEffect(() => {
    setYear("");
  }, [model]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!make || !model || !year || !mileage) {
      showToast({
        title: "Missing fields",
        description: "Please complete all required vehicle fields.",
        variant: "error",
      });
      return;
    }

    if (!resolvedVehicleDoc?.vehicleKey) {
      showToast({
        title: "Vehicle catalog issue",
        description:
          "This vehicle could not be matched to the supported catalog. Please select a supported make, model, and year.",
        variant: "error",
      });
      return;
    }

    try {
      const created = await createVehicleMutation.mutateAsync({
        vehicleName: `${make} ${model}`,
        year: Number(year),
        mileage: Number(mileage),
        vehicleKey: resolvedVehicleDoc.vehicleKey,
      });

      const createdId = String(created?.id ?? "");
      const createdVehicleName = String(
        created?.vehicleName ?? `${make} ${model}`
      );
      const createdYear = Number(created?.year ?? year);

      if (!createdId) {
        showToast({
          title: "Vehicle created",
          description:
            "The vehicle was saved, but the maintenance setup flow could not be opened.",
          variant: "success",
        });

        navigate("/app/vehicles");
        return;
      }

      setCreatedVehicle({
        id: createdId,
        vehicleName: createdVehicleName,
        year: createdYear,
      });

      setMaintenanceModalOpen(true);

      showToast({
        title: "Vehicle created",
        description:
          "Your vehicle was added successfully. Review the recommended maintenance next.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Failed to add vehicle",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    }
  }

  function handleDismissMaintenanceSetup() {
    if (createdVehicle?.id) {
      navigate(`/app/vehicles/${createdVehicle.id}`);
      return;
    }

    navigate("/app/vehicles");
  }

  const isCatalogLoading =
    makesQuery.isLoading || modelsQuery.isLoading || yearsQuery.isLoading;

  const canSubmit =
    Boolean(make) &&
    Boolean(model) &&
    Boolean(year) &&
    Boolean(mileage) &&
    Boolean(resolvedVehicleDoc?.vehicleKey);

  return (
    <>
      <div className="space-y-5 pb-20 lg:pb-0">
        <div className="flex items-center gap-3">
          <Link
            to="/app/vehicles"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Back to vehicles"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">
              Smart Garage
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Add Vehicle
            </h1>
          </div>
        </div>

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
          ) : makes.length === 0 ? (
            <div className="rounded-2xl bg-white/10 p-4 text-sm text-white">
              No vehicle catalog data was found. Fix the backend catalog before
              using this page.
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#0B1220]">
                    Make
                  </label>
                  <select
                    value={make}
                    onChange={(event) => setMake(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]"
                  >
                    <option value="">Select make...</option>
                    {makes.map((item: string) => (
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
                    disabled={!make || modelsQuery.isLoading}
                    className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] disabled:cursor-not-allowed disabled:bg-white/70"
                  >
                    <option value="">Select model...</option>
                    {models.map((item: string) => (
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
                    disabled={!make || !model || yearsQuery.isLoading}
                    className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] disabled:cursor-not-allowed disabled:bg-white/70"
                  >
                    <option value="">Select year...</option>
                    {years.map((item: number) => (
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
                    onChange={(event) =>
                      setMileage(event.target.value.replace(/[^\d]/g, ""))
                    }
                    placeholder="e.g. 125000"
                    className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
                  />
                </div>
              </div>

              {resolvedVehicleDoc?.vehicleKey ? (
                <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/85">
                  Catalog-supported vehicle detected. The AI and proper
                  maintenance setup will be matched to this vehicle.
                </div>
              ) : make && model && year ? (
                <div className="mt-4 rounded-2xl bg-[#fff7ed] px-4 py-3 text-sm text-[#7c2d12] ring-1 ring-[#fed7aa]">
                  This exact vehicle is not matched to the supported catalog yet.
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
                  disabled={
                    createVehicleMutation.isPending ||
                    isCatalogLoading ||
                    resolvedVehicleDocQuery.isFetching ||
                    !canSubmit
                  }
                  className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {createVehicleMutation.isPending ? "Saving..." : "Save Vehicle"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      <MaintenanceSetupModal
        open={maintenanceModalOpen}
        vehicleName={
          createdVehicle
            ? `${createdVehicle.year} ${createdVehicle.vehicleName}`
            : "your vehicle"
        }
        recommendations={
          maintenanceRecommendationsQuery.data?.recommendations ?? []
        }
        isLoading={maintenanceRecommendationsQuery.isLoading}
        onDismiss={handleDismissMaintenanceSetup}
        remindersHref={
          createdVehicle
            ? `/app/reminders/new?carId=${createdVehicle.id}`
            : "/app/reminders"
        }
      />
    </>
  );
}