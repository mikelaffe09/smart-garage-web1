import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, GaugeCircle, Wrench } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVehicleById } from "@/features/vehicles/api";
import {
  useMaintenanceRecommendations,
  useUpdateMaintenanceRecommendation,
} from "@/features/maintenance/hooks";
import { useToast } from "@/shared/toast/useToast";

type DraftIntervals = Record<string, string>;

function formatKm(value: number) {
  return `${value.toLocaleString()} km`;
}

export function EditVehicleMaintenancePage() {
  const navigate = useNavigate();
  const { carId = "" } = useParams();
  const { showToast } = useToast();

  const vehicleQuery = useQuery({
    queryKey: ["vehicle", carId],
    queryFn: () => getVehicleById(carId),
    enabled: Boolean(carId),
  });

  const recommendationsQuery = useMaintenanceRecommendations(carId || undefined);
  const updateRecommendationMutation = useUpdateMaintenanceRecommendation();

  const recommendations = recommendationsQuery.data?.recommendations ?? [];

  const [draftIntervals, setDraftIntervals] = useState<DraftIntervals>({});

  useEffect(() => {
    if (recommendations.length === 0) return;

    const nextDrafts: DraftIntervals = {};
    for (const item of recommendations) {
      nextDrafts[item.recommendationId] = String(item.intervalKm);
    }

    setDraftIntervals(nextDrafts);
  }, [recommendations]);

  const selectedVehicle = vehicleQuery.data ?? null;

  const hasChanges = useMemo(() => {
    if (recommendations.length === 0) return false;

    return recommendations.some((item) => {
      const currentValue = Number(draftIntervals[item.recommendationId] ?? 0);
      return currentValue !== Number(item.intervalKm);
    });
  }, [draftIntervals, recommendations]);

  async function handleSave() {
    if (!carId || recommendations.length === 0) return;

    const changedItems = recommendations.filter((item) => {
      const currentValue = Number(draftIntervals[item.recommendationId] ?? 0);
      return currentValue !== Number(item.intervalKm);
    });

    if (changedItems.length === 0) {
      showToast({
        title: "Nothing to save",
        description: "You have not changed any maintenance interval yet.",
        variant: "error",
      });
      return;
    }

    const hasInvalidValue = changedItems.some((item) => {
      const value = Number(draftIntervals[item.recommendationId] ?? 0);
      return !Number.isFinite(value) || value <= 0;
    });

    if (hasInvalidValue) {
      showToast({
        title: "Invalid interval",
        description: "Every edited maintenance interval must be greater than 0.",
        variant: "error",
      });
      return;
    }

    try {
      for (const item of changedItems) {
        const intervalKm = Number(draftIntervals[item.recommendationId]);

        await updateRecommendationMutation.mutateAsync({
          carId,
          recommendationId: item.recommendationId,
          input: { intervalKm },
        });
      }

      showToast({
        title: "Maintenance updated",
        description:
          "The recommended maintenance intervals were saved successfully.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Failed to update maintenance",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    }
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div className="flex items-center gap-3">
        <Link
          to={carId ? `/app/vehicles/${carId}` : "/app/vehicles"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Back to vehicle dashboard"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>

        <div>
          <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">
            Smart Garage
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Proper Maintenance
          </h1>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[#10253d] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">
              <Wrench className="h-4 w-4 text-[#FF8A00]" />
              Vehicle-specific intervals
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#FF8A00]">
              Edit recommended maintenance
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/75">
              Adjust the recommended mileage intervals for this vehicle. These
              values are what Smart Garage will show as the proper maintenance
              reference for reminders and future maintenance views.
            </p>

            {selectedVehicle ? (
              <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/85">
                Vehicle: {selectedVehicle.year} {selectedVehicle.vehicleName}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                navigate(carId ? `/app/vehicles/${carId}` : "/app/vehicles")
              }
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/5"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={updateRecommendationMutation.isPending || !hasChanges}
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#111827] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {updateRecommendationMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {recommendationsQuery.isLoading ? (
        <div className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6">
          Loading maintenance recommendations...
        </div>
      ) : recommendations.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6">
          No maintenance recommendations were found for this vehicle.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((item) => {
            const currentValue = draftIntervals[item.recommendationId] ?? "";
            const originalValue = Number(item.intervalKm);
            const isChanged = Number(currentValue || 0) !== originalValue;

            return (
              <div
                key={item.recommendationId}
                className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0B1220]">
                      {item.maintenanceCode.replace(/_/g, " ")}
                    </div>
                    <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                      {item.maintenanceName}
                    </h3>
                  </div>

                  {item.isCustom ? (
                    <span className="shrink-0 rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#9a3412] ring-1 ring-[#fed7aa]">
                      Custom
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white">
                      Default
                    </span>
                  )}
                </div>

                <div className="mt-5 rounded-[22px] border border-white/70 bg-white p-4 text-[#111827]">
                  <div className="flex items-center gap-3">
                    <GaugeCircle className="h-5 w-5 text-[#FF8A00]" />
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                        Current interval
                      </div>
                      <div className="text-lg font-extrabold">
                        {formatKm(originalValue)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                      New interval (km)
                    </label>
                    <input
                      type="text"
                      value={currentValue}
                      onChange={(event) =>
                        setDraftIntervals((prev) => ({
                          ...prev,
                          [item.recommendationId]: event.target.value.replace(
                            /[^\d]/g,
                            ""
                          ),
                        }))
                      }
                      placeholder="e.g. 10000"
                      className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
                    />
                  </div>

                  {isChanged ? (
                    <div className="mt-3 rounded-2xl bg-[#fff7ed] px-4 py-3 text-sm text-[#9a3412] ring-1 ring-[#fed7aa]">
                      This interval will be updated from {formatKm(originalValue)}{" "}
                      to {formatKm(Number(currentValue || 0))}.
                    </div>
                  ) : (
                    <div className="mt-3 rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm text-[#475569] ring-1 ring-[#e5e7eb]">
                      No change yet.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}